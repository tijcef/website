# TIJCEF canonical and indexing repair — 7 October 2026

## What was found
The retrieved live homepage redirects tijcef.org to www.tijcef.org. The source already uses https://www.tijcef.org as its preferred domain. That choice is retained.

The supplied ZIP references scripts/postbuild.mjs but does not contain it. Its existing built pages include individual canonical tags, but rebuilding without a working generator would fail after Vite or leave only a generic homepage shell. This is a confirmed package flaw, not proof of the exact cause of Google's reported exclusions. The email provides no affected URLs or Google-selected canonical values.

## What changed
- Restored a repeatable build with full server-rendered HTML for fixed routes, using the site's actual React components and metadata.
- Every generated indexable page has a single self-referencing canonical on https://www.tijcef.org and a matching Open Graph URL.
- Added exact redirects for index.html and trailing-slash variants, and explicit routing to each corresponding HTML page. Retained real 404 handling for unknown URLs.
- Added the non-www redirect to Vercel configuration, alongside Apache and static-host rules.
- Preserved CMS-backed routes during rebuilding. A successful CMS refresh retrieved 11 current published articles and the opportunity collection, replacing article/opportunity summaries with full HTML. Opportunities are filtered using the same verified flag and application-link requirement as the public site. Existing category snapshots remain summaries; they load current listings in the browser. Do not treat old opportunity snapshots as current eligibility or deadlines.
- Generated the sitemap from actual output pages. Thank-you, document verification and 404 pages are excluded.
- Reveal content is visible before JavaScript runs, avoiding hidden initial text in the server-rendered output.
- Added generated RSS, production-output verification and a post-deployment HTTP audit.

## Deploy
This is not a live deployment. Use your current hosting provider; do not move DNS or hosting just to apply this patch.

1. Extract the project. Preserve your existing environment variables and secrets.
2. Run npm ci, npm run refresh:content, npm run typecheck, npm test, npm run build, and node scripts/check-output.mjs.
3. For static hosting or Apache, deploy the contents of dist, including assets, generated page directories, _redirects, _headers and .htaccess. For Vercel, deploy the source project with npm run build and output directory dist; keep vercel.json at the project root.
4. Ensure www.tijcef.org is the primary production domain. Redirect tijcef.org to www.tijcef.org permanently, retaining the path and query string. Apply HTTPS at your host/CDN. Do not leave a hosting rule redirecting www back to non-www.
5. Purge any CDN HTML cache. Remove any hosting-wide rewrite that sends every page to homepage index.html. Keep the generated per-page rewrites and a genuine 404.
6. Run node scripts/seo-live-check.mjs https://www.tijcef.org. Resolve every reported failure.
7. Check representative URLs /, /about, /programs and a /post/ URL in Search Console's URL Inspection > Test live URL. The canonical in the fetched HTML must exactly match the preferred URL. Also compare Google-selected canonical with user-declared canonical in the indexed report.
8. Submit https://www.tijcef.org/sitemap.xml. Remove obsolete sitemap submissions that contain non-www, index.html or trailing-slash duplicate entries.
9. Request indexing for a few important preferred URLs. Use Validate fix if offered, after the production checks pass. Redirected duplicate URLs can remain excluded normally; the target pages are the ones you want indexed.

## Limits and remaining checks
Google selects canonicals; tags and redirects are signals, not guarantees. If Google chooses another page even after this deployment, compare the two pages' content and internal links, and inspect the exact affected URL. Search Console's historical report updates after recrawling.

Only the live homepage redirect was verified through retrieval. This environment did not provide authenticated Search Console access or production hosting access. The build and local artifact checks do not prove live host redirect behavior. Host-generated auto slash redirects must be checked after deployment.

CMS refresh preserves supplied snapshots on connection failure and prints a warning. Rebuild after every successful CMS refresh or new content publication. Unknown new CMS URLs are not invented in the sitemap. The main fixed pages are rendered from the source; CMS-backed snapshots remain browser-updated when the API responds.

Reference: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls

Verification: TypeScript passed; 19 tests passed; production build and generated canonical/asset checks passed. CMS articles and opportunities were successfully refreshed during this repair.

## Recent work updates
The homepage now reads published TIJCEF WordPress posts from every category, newest first. Recent work uses the original rounded panels and circular photos. Repeated titles and duplicate reports of the supplied STEM outreach are suppressed, keeping the newest version. Six updates are displayed initially; Load more updates retrieves additional pages. The feed checks for fresh posts every 60 seconds while open and on returning to the browser tab.

The initial homepage includes six server-rendered cards from the latest successful CMS refresh. New posts can open through the post-shell fallback before the next build; after the page loads, the application reads the requested post and sets that post's own canonical metadata. Rebuild after publication to add new URLs to the static sitemap and refresh their initial HTML.

The document-verification route and WordPress verification plugin remain included. The package is dedicated to TIJCEF and studio.tijcef.org.

## Clickable partner cards
Legal & Governance links to /transparency; SDG & Local Alignment to /pillars; Safeguarding & Participation to /safeguarding; Evidence & Reporting to /impact. Each entire partner card is a keyboard-accessible link. Recent-work panels retain their original non-clickable presentation.
