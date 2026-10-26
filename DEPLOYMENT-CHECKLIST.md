# TIJCEF: publish in WordPress, display on the frontend

## Production frontend

- Repository: tijcef/website, production branch main.
- In Vercel, use build command `bun run build` or `node scripts/build-website.mjs` and output directory `dist`. The included vercel.json sets the same build workflow.
- Set VITE_WORDPRESS_URL=https://studio.tijcef.org in the build environment. Set a valid VITE_PAYSTACK_PUBLIC_KEY only if enabling online donations. Never put payment secret keys in frontend configuration.
- Every normal build first refreshes all published articles, reviewed opportunities with valid application links, and categories from WordPress. It generates the frontend, sitemap, social-preview metadata and sharing links, and then validates them.
- If a required backend collection cannot be fetched, the normal build fails instead of deploying an incomplete content snapshot. The previous successful deployment stays available. Fix the backend/network issue and redeploy.
- `bun run build:offline` is for local development using saved content, not for automatic publishing.
- The website remains ad-free.

## WordPress setup

1. Install/update the included TIJCEF Core 3.1.0 ZIP and Document Verification ZIP.
2. In the Vercel project connected to tijcef/website, create a production deploy hook for main under Settings → Git → Deploy Hooks.
3. Store that secret deploy-hook URL in wp-config.php using the existing TIJCEF_VERCEL_DEPLOY_HOOK constant. Keep it private; do not commit it to GitHub or paste it into public messages.
4. Open WordPress Tools → Frontend Publishing. Confirm the hook says Configured.
5. Publish or update a real article with its featured image and category. The plugin queues one rebuild request after the whole save request completes, so content, featured images and metadata are saved first. Consecutive publishing requests are not suppressed by the former one-minute throttle.
6. Return to Tools → Frontend Publishing. `request_accepted` means the hosting platform accepted a request, not that the build is finished. Confirm successful production deployment in Vercel.
7. Open the article's public URL and confirm its title, photograph, content, sharing links, preview metadata and sitemap entry.
8. For opportunities, complete the opportunity fields, provide an official HTTP(S) application URL, tick the editorial verification box and publish. Unverified listings or listings without valid application URLs are intentionally excluded.
9. Test unpublishing and deletion using a suitable disposable editorial draft/test item only when authorised; the next successful build removes withdrawn public snapshots.

## Search, forms and payments

- Submit https://www.tijcef.org/sitemap.xml in the verified Google Search Console property. Google controls crawling/indexing; valid metadata does not guarantee ranking or inclusion.
- Keep backend pages noindex, and index the canonical www frontend. Empty categories, confirmation pages, verification pages and generic content shells are noindex.
- Form endpoints are available, but check real record storage, administrator notifications and email delivery through your own authorised test workflow.
- Configure the backend payment secret separately and verify payments through Paystack. Bank transfer remains the fallback when no public payment key is configured. This audit did not make a payment or submit a real application.
- Articles, category feeds and opportunity listings are backend-driven. Leadership details and other fixed page text remain maintained in the frontend source.

## Checks completed on 26 October 2026

Live WordPress REST index, post/photo endpoint, opportunity endpoint, frontend sitemap and robots file responded. Required inquiry, newsletter, payment-verification and document-verification routes were registered. CORS allowed https://www.tijcef.org. The initial CMS refresh fetched 11 posts, 5 opportunity records and 11 categories. Editorial filtering determines which opportunity records are displayed.

Two provider destinations returned HTTP 200. Two returned HTTP 403/406 and need manual verification; these responses alone do not establish that the links are broken. No destinations were replaced with guessed alternatives.

The currently public article HTML lacked the new static share/photo-preview markers, so the production domain was not serving the latest package during the audit. Neither the WordPress deploy-hook constant, mail configuration nor Vercel deployment settings were accessible through the read-only checks. PHP execution was unavailable locally. These operational items remain unverified until account access or administrator checks are provided.

PHP syntax parsing passed for both included plugins. This does not replace execution testing within WordPress.
