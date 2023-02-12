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
const sendToGa: GoogleAnalyticsFunction = window.ga || ((...args: unknown[]) => window.dataLayer.push(args));

const isUAEnabled = function () {
    if (
        window.ga &&
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
    if (window.ga && window.trekkie && window.trekkie.config && window.trekkie.config['Google Gtag Pixel']) {
        return true;
    }
    return false;
};

const sendMetricToGa = function (metric: {name: Metric['name']; value: Metric['value']}) {
    const currentScript = document.currentScript as HTMLScriptElement;
    const attributes = currentScript?.dataset || {};

    const debug = attributes.debug === 'true';
    const shopifyTemplate: string | undefined = attributes.perfTemplate;
    const actionPrefix = attributes.perfActionPrefix || 'Web Vitals: ';

    const eventCategory = attributes.perfCategory || 'Web Vitals by Render Better';
    const eventAction = `${actionPrefix}${metric.name}`;
    const eventLabel = shopifyTemplate || null;

    if (debug) {
        console.log('[RB Analytics] Collecting', metric);
    }

    if (isUAEnabled()) {
        // UA data collection model: https://support.google.com/analytics/answer/11091422#universal-analytics
        // event fields: https://developers.google.com/analytics/devguides/collection/analyticsjs/events#event_fields
        const evt = {
            eventCategory,
            eventAction, // LCP, CLS, FID, etc.
            eventLabel,
            eventValue: metric.value < 0 ? Math.round(metric.value * 1000) : metric.value, // 3.5
            nonInteraction: true,
            transport: 'beacon',
        };
        sendToGa('send', 'event', evt);
    } else if (isGA4Enabled()) {
        // GA 4 events: https://developers.google.com/analytics/devguides/migration/ua/analyticsjs-to-gtagjs
        const evt = {
            event_category: eventCategory,
            event_action: eventAction,
            event_label: eventLabel,
            value: metric.value,
            non_interaction: true,
            transport: 'beacon',
        };
        sendToGa('event', eventAction, evt);
    }
};

webVitals.onLCP(sendMetricToGa);
webVitals.onCLS(sendMetricToGa);
webVitals.onFID(sendMetricToGa);
webVitals.onINP(sendMetricToGa);
webVitals.onTTFB(sendMetricToGa);

export {};
