# TIJCEF backend-navigation and Grant Hub update

## Completed

- Removed TGIS from the header, footer, routes, resources, sitemap, policies, dependencies and backend plugin.
- Promoted Grant Hub to a main navigation menu with Grants, Scholarships, Fellowships, Jobs and Internships.
- Added hierarchical desktop and mobile dropdown navigation.
- Connected the primary navigation to the WordPress menu named `TIJCEF Primary`.
- Added a five-minute browser cache and an immediate built-in fallback so a slow backend does not block the header.
- Added dynamic category and article routes for WordPress-managed programmes, resources and impact stories.
- Added a WordPress companion plugin for Grant Hub opportunities, navigation, public forms and payment verification.
- Added an opportunity-type selector to the WordPress Grant Hub editor.
- Removed hard-coded grant claims from the public directory. Opportunities now come from WordPress and can carry a reviewed status.
- Added direct-funder-link and no-guarantee disclosures.
- Added privacy and transparency pages.
- Corrected dead footer links and replaced the external preview social image with a TIJCEF-hosted image.
- Expanded the sitemap and connected it from `robots.txt`.
- Added per-route title, description, canonical and social metadata for the new sections.
- Preserved mobile-responsive layouts and accessible form labels/status messages.
- Replaced unsupported programme and donation claims with documented 2026 activities and cautious reporting language.
- Connected contact, volunteer, partnership and newsletter forms to moderated WordPress records.
- Added server-side Paystack verification and removed the hard-coded live public key.
- Removed global AdSense and Paystack loading; Paystack now loads only when a donor starts payment.
- Added safeguarding, complaints, donation/refund and website terms pages.
- Reduced source images from approximately 18 MB to approximately 2 MB.

## Content and operational checks before launch

- Configure the dedicated WordPress backend at `studio.tijcef.org`.
- Install `wordpress-plugin/tijcef-core.zip`, then edit the generated `TIJCEF Primary` menu.
- Add current, source-verified grants in WordPress. Do not republish expired or unverified sample opportunities.
- Confirm the public address, phone number, social handles and donation account details.
- Replace any programme statistics that cannot be supported by signed reports or registers.
- Add real policy documents for safeguarding, complaints, financial controls and data retention as they are approved.

## Validation result

- Production build: passed
- Automated tests: passed
- Lint: passed with non-blocking Fast Refresh warnings in reusable UI component files
- Main and new client routes: returned HTTP 200 in production preview
