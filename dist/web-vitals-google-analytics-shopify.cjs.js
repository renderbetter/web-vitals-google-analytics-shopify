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
    if (window.trekkie && window.trekkie.config && window.trekkie.config["Google Analytics"] && window.trekkie.config["Google Analytics"].trackingId && window.trekkie.config["Google Analytics"].trackingId.startsWith("UA-")) return true;
    return false;
};
const $da3609373111d77a$var$isGA4Enabled = function() {
    if (window.trekkie && window.trekkie.config && window.trekkie.config["Google Gtag Pixel"]) return true;
    return false;
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
    const eventLabel = shopifyTemplate || null;
    const eventValue = metric.name !== "CLS" ? $da3609373111d77a$var$round(metric.value / 1000, metricDecimalPlaces) : $da3609373111d77a$var$round(metric.value, metricDecimalPlaces);
    const sendToGa = window.ga || window.gtag || ((...args)=>window.dataLayer.push(args));
    const debug = "debug" in attributes;
    const debugLog = (message, data)=>{
        if (debug) console.log(`[web-vitals-google-analytics-shopify] ${message}`, data);
    };
    debugLog("Collecting", metric);
    if ($da3609373111d77a$var$isUAEnabled()) {
        // UA data collection model: https://support.google.com/analytics/answer/11091422#universal-analytics
        // event fields: https://developers.google.com/analytics/devguides/collection/analyticsjs/events#event_fields
        const evt = {
            eventCategory: eventCategory,
            eventAction: eventAction,
            eventLabel: eventLabel,
            eventValue: eventValue,
            nonInteraction: true,
            transport: "beacon"
        };
        sendToGa("send", "event", evt);
        debugLog("Sent UA event", evt);
    } else if ($da3609373111d77a$var$isGA4Enabled()) {
        // GA 4 events: https://developers.google.com/analytics/devguides/migration/ua/analyticsjs-to-gtagjs
        const evt = {
            event_category: eventCategory,
            event_action: eventAction,
            event_label: eventLabel,
            value: eventValue,
            non_interaction: true,
            transport: "beacon"
        };
        sendToGa("event", eventAction, evt);
        debugLog("Sent GA4 event", evt);
    }
};
$2vOCu$webvitals.onLCP($da3609373111d77a$var$sendMetricToGa);
$2vOCu$webvitals.onCLS($da3609373111d77a$var$sendMetricToGa);
$2vOCu$webvitals.onFID($da3609373111d77a$var$sendMetricToGa);
$2vOCu$webvitals.onINP($da3609373111d77a$var$sendMetricToGa);
$2vOCu$webvitals.onTTFB($da3609373111d77a$var$sendMetricToGa);


//# sourceMappingURL=web-vitals-google-analytics-shopify.cjs.js.map
