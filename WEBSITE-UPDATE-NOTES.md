# TIJCEF website — ad-free release

## Implemented
- Advertising loaders, ad placements, publisher metadata and ad configuration removed. ads.txt now declares that no advertising inventory is authorised.
- Existing branding, programme pages, memberships, partnerships, volunteering, donations, opportunity listings and downloads retained.
- Membership application and consent integrated with the existing inquiry endpoint. Failures retain the entered details for retry; success confirms receipt for review, not automatic approval.
- Corrected backend save/error handling and invalid/revoked document handling. Updated installable WordPress plugins are included.
- Page-specific structured data added to generated HTML; titles, descriptions, canonical URLs and social metadata preserved. Empty gallery description repaired.
- Sitemap lists canonical public pages only; confirmation, verification, 404 and generic dynamic shells are noindex. Existing www canonical preference retained.
- Dynamic article and opportunity fallback routes supplied for Apache, Netlify and Vercel. Generic shells stay noindex until real content is loaded.
- Delayed page loading no longer prevents partnership/volunteer section links from reaching their target.

## Verification
Run npm run typecheck, npm test, npm run build and npm run check:seo. The SEO check validates every sitemap page, one canonical and page-specific JSON-LD record, robots settings, required metadata, internal destinations and absence of advertising.

Live checks on 26 October 2026: www.tijcef.org homepage, robots and sitemap returned HTTP 200; the bare domain redirected to www; an unknown page returned HTTP 404. These checks refer to the existing live site, not installation of this release. CMS responses were intermittent, so all third-party opportunity links could not be verified. No real application, newsletter entry or payment was submitted. PHP execution was unavailable locally.

## Production installation
1. Back up the current website and WordPress plugins.
2. Upload the contents of dist to the existing public www.tijcef.org host using its normal deployment process. Upload .htaccess too if using Apache; retain the supplied Vercel or Netlify routing configuration for those hosts.
3. Update the included TIJCEF Core and Document Verification WordPress plugins through the administrator account. Private review publication does not install these plugins.
4. Keep valid payment credentials in the appropriate build environment and WordPress server configuration; never put a secret key in frontend code. No payment key was available in this task, so bank transfer remains the configured fallback.
5. Confirm form records, administrator notifications, mail delivery and payment verification on the actual production services.

## Google Search Console
After installing the release on the public domain, the verified owner should submit https://www.tijcef.org/sitemap.xml in https://search.google.com/search-console and inspect the homepage plus a few important programme/opportunity URLs. Use Request indexing where appropriate. Keep the existing ownership-verification DNS record or file during deployment. Do not invent verification tokens. No Search Console access or production-host deployment access was available in this task.

Google controls crawling and inclusion. A sitemap and valid metadata help discovery but do not guarantee indexing or ranking. The separate owner-private ChatGPT review Site requires login and is not the public domain to submit to Google.

## Details still requiring organisational confirmation
Registration number/current trustee roster, PSNAF's full name and partnership details, event-specific photographs and permissions, unique-person versus repeat-participation counts, and the relation between GGC STEM and menstrual-health event reports. No new identifiers, testimonials or outcomes have been invented.
