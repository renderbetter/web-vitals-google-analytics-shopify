# Core Web Vitals in Google Analytics for Shopify

This script makes it incredibly simple to start tracking Core Web Vitals performance metrics in
Google Analytics!

Simply add this script to your theme and load it roughly above the closing `</body>` tag like so:

```liquid
<script src="{{ 'web-vitals-ga.js' | asset_url }}" data-perf-template="{{ template }}" defer></script>
```

## Data Attributes

The following data attributes can be used with the script:

| Attribute  | Description |
| ------------- | ------------- |
| `data-perf-template`  | Sets the Shopify template used (this will show up in the event label) |
| `data-perf-action-prefix`  | Sets the prefix in front of the event. Defaults to `Web Vitals: ` |
| `data-perf-category`  | Overrides the event category. Defaults to `Web Vitals by Render Better` |

## Made with ❤️ by the [Render Better](https://www.renderbetter.com) team

Render Better is on a mission to make the web faster and better! If you care about the open web and think site speed/web performance matters a lot, you are one of us. [Learn more about us here](https://www.renderbetter.com/about)!