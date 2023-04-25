var $2vOCu$webvitals = require("web-vitals");

/**!
 * Core Web Vitals in Google Analytics for Shopify
 * https://github.com/RenderBetter/web-vitals-google-analytics-shopify
 *
 * Copyright (c) Render Better.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 
window.dataLayer = window.dataLayer || [];
const $da3609373111d77a$var$isUAEnabled = function() {
    return window.trekkie && window.trekkie.config && window.trekkie.config["Google Analytics"] && window.trekkie.config["Google Analytics"].trackingId && window.trekkie.config["Google Analytics"].trackingId.startsWith("UA-");
};
const $da3609373111d77a$var$isGA4Enabled = function() {
    return window.trekkie && window.trekkie.config && window.trekkie.config["Google Gtag Pixel"];
};
const $da3609373111d77a$var$round = function(num, decimals) {
    return +(Math.round(+(num.toFixed(decimals) + "e+" + decimals)) + "e-" + decimals);
};
const $da3609373111d77a$var$currentScript = document.currentScript;
const $da3609373111d77a$var$sendMetricToGa = function(metric) {
    const attributes = $da3609373111d77a$var$currentScript?.dataset || {};
    const shopifyTemplate = attributes.shopifyTemplate;
    const actionPrefix = attributes.eventActionPrefix || "Web Performance: ";
    const metricDecimalPlaces = Number(attributes.metricDecimalPlaces) || 3;
    const eventCategory = attributes.eventCategory || "Web Performance";
    const eventAction = `${actionPrefix}${metric.name}`;
    const eventValue = metric.name !== "CLS" ? $da3609373111d77a$var$round(metric.value / 1000, metricDecimalPlaces) : $da3609373111d77a$var$round(metric.value, metricDecimalPlaces);
    const debug = "debug" in attributes;
    const debugLog = (message, data)=>{
        if (debug) console.log(`[web-vitals-google-analytics-shopify] ${message}`, data);
    };
    debugLog("Collecting", metric);
    // UA data collection model: https://support.google.com/analytics/answer/11091422#universal-analytics
    // event fields: https://developers.google.com/analytics/devguides/collection/analyticsjs/events#event_fields
    const uaEventUsingAnalyticsJs = {
        hitType: "event",
        eventCategory: eventCategory,
        eventAction: eventAction,
        eventLabel: shopifyTemplate || null,
        eventValue: Math.round(Number(eventValue) * 1000),
        nonInteraction: true,
        transport: "beacon"
    };
    // GTag event model: https://developers.google.com/analytics/devguides/collection/gtagjs/events
    // https://developers.google.com/analytics/devguides/migration/ua/analyticsjs-to-gtagjs
    const uaEventUsingGtagJs = {
        event_category: eventCategory,
        event_label: shopifyTemplate || null,
        value: eventValue,
        non_interaction: true,
        transport: "beacon"
    };
    // GA4 event model: https://developers.google.com/analytics/devguides/collection/ga4/events
    // https://support.google.com/analytics/answer/11091026#gtag-dual-tagging
    const ga4EventUsingGtagJs = {
        event_category: eventCategory,
        shopify_template: shopifyTemplate,
        value: eventValue
    };
    if ($da3609373111d77a$var$isUAEnabled()) {
        // Send UA event
        if (window.gtag) {
            // Send UA event using gtag function
            window.gtag("event", eventAction, uaEventUsingGtagJs);
            debugLog("Sent UA event using gtag function", uaEventUsingGtagJs);
        } else if (window.ga) {
            // Send UA event using analytics.js
            window.ga("send", uaEventUsingAnalyticsJs);
            debugLog("Sent UA event using ga function", uaEventUsingAnalyticsJs);
        } else {
            // Push UA event to dataLayer and assume analytics.js data collection model
            window.dataLayer.push([
                "event",
                uaEventUsingAnalyticsJs
            ]);
            debugLog("Pushed UA event analytics.js event into dataLayer", uaEventUsingGtagJs);
        }
    } else if ($da3609373111d77a$var$isGA4Enabled()) {
        // Send GA4 event
        if (window.gtag) {
            // Send GA4 event using gtag function
            window.gtag("event", eventAction, ga4EventUsingGtagJs);
            debugLog("Sent GA4 event using gtag function", ga4EventUsingGtagJs);
        } else {
            // Push GA4 event to dataLayer and assume gtag.js data collection model
            window.dataLayer.push([
                "event",
                ga4EventUsingGtagJs
            ]);
            debugLog("Pushed GA4 event gtag.js event into dataLayer", ga4EventUsingGtagJs);
        }
    } else if (window.gtag) {
        // Assume a UA model and send UA event using gtag function
        // GA4 will convert the fields: https://support.google.com/analytics/answer/11091026#gtag-dual-tagging
        window.gtag("event", eventAction, uaEventUsingGtagJs);
        debugLog("Sent UA event using gtag function (unknown GA installation)", uaEventUsingGtagJs);
    } else {
        // Assume a UA model and push UA event into dataLayer
        // GA4 will convert the fields: https://support.google.com/analytics/answer/11091026#gtag-dual-tagging
        window.dataLayer.push([
            "event",
            uaEventUsingAnalyticsJs
        ]);
        debugLog("Pushed UA event gtag.js event into dataLayer (unknown GA installation)", uaEventUsingGtagJs);
    }
};
$2vOCu$webvitals.onLCP($da3609373111d77a$var$sendMetricToGa);
$2vOCu$webvitals.onCLS($da3609373111d77a$var$sendMetricToGa);
$2vOCu$webvitals.onFID($da3609373111d77a$var$sendMetricToGa);
$2vOCu$webvitals.onINP($da3609373111d77a$var$sendMetricToGa);
$2vOCu$webvitals.onTTFB($da3609373111d77a$var$sendMetricToGa);


//# sourceMappingURL=web-vitals-google-analytics-shopify.cjs.js.map
