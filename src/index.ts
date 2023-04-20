/**!
 * Core Web Vitals in Google Analytics for Shopify
 * https://github.com/RenderBetter/web-vitals-google-analytics-shopify
 *
 * Copyright (c) Render Better.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as webVitals from 'web-vitals';
import type {Metric} from 'web-vitals';

type GoogleAnalyticsFunction = (...args: unknown[]) => void;

declare const window: Window & {
    ga?: GoogleAnalyticsFunction;
    gtag?: GoogleAnalyticsFunction;
    trekkie?: {
        config: {
            'Google Analytics': {
                trackingId: string;
            };
            'Google Gtag Pixel': {};
        };
    };
    dataLayer: [unknown[]];
};

window.dataLayer = window.dataLayer || [];

const isUAEnabled = function () {
    if (
        window.trekkie &&
        window.trekkie.config &&
        window.trekkie.config['Google Analytics'] &&
        window.trekkie.config['Google Analytics'].trackingId &&
        window.trekkie.config['Google Analytics'].trackingId.startsWith('UA-')
    ) {
        return true;
    }
    return false;
};

const isGA4Enabled = function () {
    if (window.trekkie && window.trekkie.config && window.trekkie.config['Google Gtag Pixel']) {
        return true;
    }
    return false;
};

const round = function (num: number, decimals: number) {
    return +(Math.round(+(num.toFixed(decimals) + 'e+' + decimals)) + 'e-' + decimals);
};

const currentScript = document.currentScript as HTMLScriptElement;

const sendMetricToGa = function (metric: {name: Metric['name']; value: Metric['value']}) {
    const attributes = currentScript?.dataset || {};

    const shopifyTemplate: string | undefined = attributes.shopifyTemplate;
    const actionPrefix = attributes.eventActionPrefix || 'Web Performance: ';
    const metricDecimalPlaces = Number(attributes.metricDecimalPlaces) || 3;

    const eventCategory = attributes.eventCategory || 'Web Performance';
    const eventAction = `${actionPrefix}${metric.name}`;
    const eventLabel = shopifyTemplate || null;
    const eventValue =
        metric.name !== 'CLS'
            ? round(metric.value / 1000, metricDecimalPlaces)
            : round(metric.value, metricDecimalPlaces);

    const sendToGa = window.ga || window.gtag || ((...args: unknown[]) => window.dataLayer.push(args));

    const debug = 'debug' in attributes;
    const debugLog = (message: string, data?: unknown) => {
        if (debug) {
            console.log(`[web-vitals-google-analytics-shopify] ${message}`, data);
        }
    };

    debugLog('Collecting', metric);

    if (isUAEnabled()) {
        // UA data collection model: https://support.google.com/analytics/answer/11091422#universal-analytics
        // event fields: https://developers.google.com/analytics/devguides/collection/analyticsjs/events#event_fields
        const evt = {
            eventCategory,
            eventAction, // LCP, CLS, FID, etc.
            eventLabel,
            eventValue,
            nonInteraction: true,
            transport: 'beacon',
        };
        sendToGa('send', 'event', evt);
        debugLog('Sent UA event', evt);
    } else if (isGA4Enabled()) {
        // GA 4 events: https://developers.google.com/analytics/devguides/migration/ua/analyticsjs-to-gtagjs
        const evt = {
            event_category: eventCategory,
            event_action: eventAction,
            event_label: eventLabel,
            value: eventValue,
            non_interaction: true,
            transport: 'beacon',
        };
        sendToGa('event', eventAction, evt);
        debugLog('Sent GA4 event', evt);
    }
};

webVitals.onLCP(sendMetricToGa);
webVitals.onCLS(sendMetricToGa);
webVitals.onFID(sendMetricToGa);
webVitals.onINP(sendMetricToGa);
webVitals.onTTFB(sendMetricToGa);

export {};
