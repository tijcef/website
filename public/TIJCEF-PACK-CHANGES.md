# TIJCEF indexing and AdSense pack — changes

This source is scoped to TIJCEF. It does not contain a ClearFact News
deployment or a ClearFact CMS rewrite.

## Included frontend correction

`index.html` now contains the TIJCEF AdSense verification script in the
initial HTML response:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8967021504063466" crossorigin="anonymous"></script>
```

This is important because loading the script only after a client-side route
change can cause AdSense to report the site as not found during verification.
The existing publisher meta tag and `public/ads.txt` record remain in place.

## Included Studio correction

`studio-host/.htaccess` is a separate server upload. It redirects public
Studio pages and sitemaps to `https://www.tijcef.org/`, but preserves
`/wp-admin`, `/wp-login.php`, `/wp-json`, WordPress assets and REST query
requests used by the frontend.

## Intentionally not hardcoded

Manual AdSense ad-unit IDs are not guessed. Add real TIJCEF slot IDs in the
hosting environment only after creating the units in the same AdSense account:

```text
VITE_ADSENSE_CONTENT_SLOT=your_real_content_slot_id
VITE_ADSENSE_DIRECTORY_SLOT=your_real_directory_slot_id
```

Until those values are real, manual `<ins>` units stay hidden. Auto Ads and
AdSense site verification use the publisher ID already present in this pack.

