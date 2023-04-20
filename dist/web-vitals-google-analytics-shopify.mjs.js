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
    if (window.trekkie && window.trekkie.config && window.trekkie.config["Google Analytics"] && window.trekkie.config["Google Analytics"].trackingId && window.trekkie.config["Google Analytics"].trackingId.startsWith("UA-")) return true;
    return false;
};
var $0999c2e526fa4d23$var$isGA4Enabled = function isGA4Enabled() {
    if (window.trekkie && window.trekkie.config && window.trekkie.config["Google Gtag Pixel"]) return true;
    return false;
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
    var eventLabel = shopifyTemplate || null;
    var eventValue = metric.name !== "CLS" ? $0999c2e526fa4d23$var$round(metric.value / 1000, metricDecimalPlaces) : $0999c2e526fa4d23$var$round(metric.value, metricDecimalPlaces);
    var sendToGa = window.ga || window.gtag || function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        return window.dataLayer.push(args);
    };
    var debug = "debug" in attributes;
    var debugLog = function(message, data) {
        if (debug) console.log("[web-vitals-google-analytics-shopify] ".concat(message), data);
    };
    debugLog("Collecting", metric);
    if ($0999c2e526fa4d23$var$isUAEnabled()) {
        // UA data collection model: https://support.google.com/analytics/answer/11091422#universal-analytics
        // event fields: https://developers.google.com/analytics/devguides/collection/analyticsjs/events#event_fields
        var evt = {
            eventCategory: eventCategory,
            eventAction: eventAction,
            eventLabel: eventLabel,
            eventValue: eventValue,
            nonInteraction: true,
            transport: "beacon"
        };
        sendToGa("send", "event", evt);
        debugLog("Sent UA event", evt);
    } else if ($0999c2e526fa4d23$var$isGA4Enabled()) {
        // GA 4 events: https://developers.google.com/analytics/devguides/migration/ua/analyticsjs-to-gtagjs
        var evt1 = {
            event_category: eventCategory,
            event_action: eventAction,
            event_label: eventLabel,
            value: eventValue,
            non_interaction: true,
            transport: "beacon"
        };
        sendToGa("event", eventAction, evt1);
        debugLog("Sent GA4 event", evt1);
    }
};
$fH6RJ$onLCP($0999c2e526fa4d23$var$sendMetricToGa);
$fH6RJ$onCLS($0999c2e526fa4d23$var$sendMetricToGa);
$fH6RJ$onFID($0999c2e526fa4d23$var$sendMetricToGa);
$fH6RJ$onINP($0999c2e526fa4d23$var$sendMetricToGa);
$fH6RJ$onTTFB($0999c2e526fa4d23$var$sendMetricToGa);


//# sourceMappingURL=web-vitals-google-analytics-shopify.mjs.js.map
