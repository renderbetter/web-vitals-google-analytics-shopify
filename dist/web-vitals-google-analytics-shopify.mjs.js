import {onLCP as $fH6RJ$onLCP, onCLS as $fH6RJ$onCLS, onFID as $fH6RJ$onFID, onINP as $fH6RJ$onINP, onTTFB as $fH6RJ$onTTFB} from "web-vitals";

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
var $0999c2e526fa4d23$var$isUAEnabled = function isUAEnabled() {
    return window.trekkie && window.trekkie.config && window.trekkie.config["Google Analytics"] && window.trekkie.config["Google Analytics"].trackingId && window.trekkie.config["Google Analytics"].trackingId.startsWith("UA-");
};
var $0999c2e526fa4d23$var$isGA4Enabled = function isGA4Enabled() {
    return window.trekkie && window.trekkie.config && window.trekkie.config["Google Gtag Pixel"];
};
var $0999c2e526fa4d23$var$round = function round(num, decimals) {
    return +(Math.round(+(num.toFixed(decimals) + "e+" + decimals)) + "e-" + decimals);
};
var $0999c2e526fa4d23$var$currentScript = document.currentScript;
var $0999c2e526fa4d23$var$sendMetricToGa = function sendMetricToGa(metric) {
    var attributes = ($0999c2e526fa4d23$var$currentScript === null || $0999c2e526fa4d23$var$currentScript === void 0 ? void 0 : $0999c2e526fa4d23$var$currentScript.dataset) || {};
    var shopifyTemplate = attributes.shopifyTemplate;
    var actionPrefix = attributes.eventActionPrefix || "Web Performance: ";
    var metricDecimalPlaces = Number(attributes.metricDecimalPlaces) || 3;
    var eventCategory = attributes.eventCategory || "Web Performance";
    var eventAction = "".concat(actionPrefix).concat(metric.name);
    var eventValue = metric.name !== "CLS" ? $0999c2e526fa4d23$var$round(metric.value / 1000, metricDecimalPlaces) : $0999c2e526fa4d23$var$round(metric.value, metricDecimalPlaces);
    var debug = "debug" in attributes;
    var debugLog = function(message, data) {
        if (debug) console.log("[web-vitals-google-analytics-shopify] ".concat(message), data);
    };
    debugLog("Collecting", metric);
    // UA data collection model: https://support.google.com/analytics/answer/11091422#universal-analytics
    // event fields: https://developers.google.com/analytics/devguides/collection/analyticsjs/events#event_fields
    var uaEventUsingAnalyticsJs = {
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
    var uaEventUsingGtagJs = {
        event_category: eventCategory,
        event_label: shopifyTemplate || null,
        value: eventValue,
        non_interaction: true,
        transport: "beacon"
    };
    // GA4 event model: https://developers.google.com/analytics/devguides/collection/ga4/events
    // https://support.google.com/analytics/answer/11091026#gtag-dual-tagging
    var ga4EventUsingGtagJs = {
        event_category: eventCategory,
        shopify_template: shopifyTemplate,
        value: eventValue
    };
    if ($0999c2e526fa4d23$var$isUAEnabled()) {
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
    } else if ($0999c2e526fa4d23$var$isGA4Enabled()) {
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
$fH6RJ$onLCP($0999c2e526fa4d23$var$sendMetricToGa);
$fH6RJ$onCLS($0999c2e526fa4d23$var$sendMetricToGa);
$fH6RJ$onFID($0999c2e526fa4d23$var$sendMetricToGa);
$fH6RJ$onINP($0999c2e526fa4d23$var$sendMetricToGa);
$fH6RJ$onTTFB($0999c2e526fa4d23$var$sendMetricToGa);


//# sourceMappingURL=web-vitals-google-analytics-shopify.mjs.js.map
