# TIJCEF merge and quality review

## Completed

- Consolidated the main TIJCEF site, TGIS and Grant Hub under one Vite application.
- Added `/tgis` and `/grants` route families with shared TIJCEF navigation and branding.
- Replaced the two separate Supabase-oriented backends with one documented headless WordPress integration.
- Added a WordPress companion plugin for Grant Opportunity and TGIS Report content types.
- Added moderated TGIS report intake: pending-by-default publishing, validation, sanitisation, a honeypot, basic rate limiting and restricted CORS.
- Removed hard-coded grant claims from the public directory. Opportunities now come from WordPress and can carry a reviewed status.
- Added direct-funder-link and no-guarantee disclosures.
- Added privacy and transparency pages.
- Corrected dead footer links and replaced the external preview social image with a TIJCEF-hosted image.
- Expanded the sitemap and connected it from `robots.txt`.
- Added per-route title, description, canonical and social metadata for the new sections.
- Added route-level code splitting so the map does not slow the main website.
- Escaped map popup content and restricted popup image URLs.
- Preserved mobile-responsive layouts and accessible form labels/status messages.

## Content and operational checks before launch

- Configure a dedicated WordPress backend, recommended: `wp.tijcef.org`.
- Add current, source-verified grants in WordPress. Do not republish expired or unverified sample opportunities.
- Review every TGIS submission for safeguarding, accuracy and location sensitivity.
- Confirm the public address, phone number, social handles and donation account details.
- Replace any programme statistics that cannot be supported by signed reports or registers.
- Add real policy documents for safeguarding, complaints, financial controls and data retention as they are approved.

## Validation result

- Production build: passed
- Automated tests: passed
- Lint: passed with non-blocking Fast Refresh warnings in reusable UI component files
- Main and new client routes: returned HTTP 200 in production preview
