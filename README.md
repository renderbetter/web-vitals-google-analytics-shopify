# Core Web Vitals in Google Analytics for Shopify

This script makes it incredibly simple to start tracking Shopify Core Web Vitals and other web performance metrics in
Google Analytics!

Simply add this script to your theme and load it roughly above the closing `</body>` tag like so:

```liquid
<script
    src="//cdn.jsdelivr.net/npm/web-vitals-google-analytics-shopify/dist/web-vitals-google-analytics-shopify.min.js"
    data-shopify-template="{{ template }}" defer></script>
```

Learn more about how to use this script and how to optimize your site from this blog post about it here:

[Track Core Web Vitals in Google Analytics with a single line of code](https://www.renderbetter.com/guides/track-core-web-vitals-in-google-analytics-line-of-code)

## Data Attributes

The following data attributes can be used with the script:

| Attribute  | Description |
| ------------- | ------------- |
| `data-shopify-template`  | Sets the Shopify template used (this will show up in the event label) |
| `data-event-action-prefix`  | Sets the prefix in front of the event. Defaults to `Web Performance: ` |
| `data-event-category`  | Overrides the event category. Defaults to `Web Performance` |
| `data-metric-decimals-places`  | Sets the number of decimals places to report for metrics. Defaults to `3` |

## Made with ❤️ by the [Render Better](https://www.renderbetter.com) team

Render Better is on a mission to make the web faster and better! If you care about the open web and think site speed/web performance matters a lot, you are one of us. [Learn more about us here](https://www.renderbetter.com/about)!