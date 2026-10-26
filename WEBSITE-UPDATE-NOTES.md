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

## Social sharing update — 26 October 2026
- Facebook, WhatsApp, X and LinkedIn links at the top and bottom of articles and opportunity detail pages.
- Sharing always uses the clean permanent https://www.tijcef.org publication URL, including from local/private previews. Tracking parameters, fragments and local origins are excluded.
- Copy Link with visible confirmation; selectable manual-copy fallback when clipboard access is unavailable; native phone sharing where supported. Cancelling native sharing is harmless.
- Static publication HTML includes platform links before JavaScript runs.
- Saved publications stay available if the CMS request fails temporarily; a saved-content notice is shown. A server response confirming removal overrides the saved article. Opportunity readers are reminded to confirm current deadlines.
- Generated social metadata uses the publication's saved featured photo or first available content image. Eleven of the fifteen supplied publications have a photo; four use the TIJCEF logo because no publication photo was supplied. Future content refreshes retain featured-image metadata.
- Updated the leadership entries to the user's confirmed names and roles: Arch. Akipo Praise Mbutakto, Deputy Operations Officer; Engr. Nuhu D. Mamtso, General Secretary; Mrs. Bege J. Edan, Finance Officer; Emmanuel Sunday Tijwun, Founder & Executive Director.

Checks: TypeScript, production build and 27 automated tests passed, plus the SEO and sharing checks. Browser review confirmed article sharing and the manual-copy fallback. No social post was sent. Actual platform preview caches and phone share sheets still depend on the visitor's device and public deployment.

For new or edited WordPress publications, run `bun run refresh:content` followed by `bun run build`, `bun run check:seo` and `bun run check:sharing` before deployment. Configure the existing WordPress deployment hook to trigger that refresh-and-build workflow if automatic publication updates are desired. No production hook credentials were available here. Generic unpublished shells cannot supply a photo preview to social crawlers until the publication is included in the generated HTML.

Installation: back up the repository, then copy the contents of tijcef-complete into its root, preserving .git and private .env settings. Run the checks above and commit/push through the user's authenticated GitHub terminal. Updating the private review Site does not push to GitHub or replace www.tijcef.org. Existing www routing and backend plugin installation requirements still apply.

## Backend publishing audit — latest changes
The authoritative setup instructions are now in DEPLOYMENT-CHECKLIST.md. Normal builds refresh WordPress posts, opportunities and categories before rendering; fail if a required collection is unavailable; exclude empty categories from the sitemap; and validate the finished output. Newly created category routes now have generated pages and a fallback route.

TIJCEF Core 3.1.0 queues publishing requests until WordPress shutdown so metadata/media updates finish first, dispatches one request per save request without losing consecutive edits to the old minute throttle, records whether a hook request was accepted, and exposes that status to administrators under Tools → Frontend Publishing. This is code readiness, not verification that the live hook is configured.

Latest live-content build: 11 posts, 5 CMS opportunity records, 11 categories; 15 eligible publication pages have platform sharing and publication-specific preview images. Empty categories are noindex. Checks passed for 53 sitemap pages, 45 internal destinations, bundled assets, SEO and sharing. All 29 automated tests passed, including successful content refresh and failure preservation. The live production article still lacked the new share/preview HTML during the audit; deploy this package to the public domain and install the updated plugin.

No actual WordPress publication, real application or payment was submitted in this audit. Mail delivery, payment credentials, the live deploy-hook value and Vercel deployment configuration remain operational checks. Vercel account access was not connected. Public WordPress API/CORS availability is confirmed; it does not prove an end-to-end publication/rebuild cycle.

PHP syntax parsing passed for both included plugins. This does not replace execution testing within WordPress.
