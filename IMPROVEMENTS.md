# TIJCEF funding-readiness, publishing and accountability update

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
- Standardised all canonical, sitemap and social URLs on `https://www.tijcef.org`.
- Added build-time snapshots for fixed pages and live WordPress articles, categories and grants.
- Added real 404 handling to prevent soft-404 indexing problems.
- Redirected public WordPress content to its matching frontend URL and disabled duplicate backend sitemaps.
- Added a deploy-hook trigger so newly published WordPress content refreshes frontend snapshots and the sitemap.
- Preserved mobile-responsive layouts and accessible form labels/status messages.
- Replaced unsupported programme and donation claims with documented 2026 activities and cautious reporting language.
- Connected contact, volunteer, partnership and newsletter forms to moderated WordPress records.
- Added server-side Paystack verification and removed the hard-coded live public key.
- Restored the verified TIJCEF AdSense publisher configuration and `ads.txt`, with Auto Ads support and guarded manual placements that collapse when unconfigured.
- Kept Paystack loading limited to the point when a donor starts payment.
- Added safeguarding, complaints, donation/refund and website terms pages.
- Added an accessibility statement, reduced-motion support, stronger focus states and mobile-menu controls.
- Added an evidence-led Impact page with documented figures and measurement commitments.
- Reduced source images from approximately 18 MB to approximately 2 MB.
- Preserved Dignity, Agency, Resilience and Evidence while pairing them with plain-language programme areas so funders and communities understand what each pillar delivers.
- Centralised approved reach figures to prevent the homepage, impact page and public documents from drifting apart.
- Replaced contradictory annual-report and press-kit PDFs with corrected, version-controlled public editions.
- Added a partner due-diligence centre covering governance, safeguarding, evidence, stewardship and document access.
- Added a verified Media & Mentions page and a daily exact-name publication scan; automated findings stay in draft until an editor verifies and publishes them.
- Restricted public grant output and build-time grant indexing to records with a verified official application URL.
- Recorded each successfully verified Paystack reference once as a private donation record in WordPress.
- Added a public RSS feed and a sitemap entry for the media tracker.
- Limited advertising to editorial and opportunity sections while keeping ads away from donation, partnership and policy pages.
- Restored the five approved real TIJCEF programme photographs across the website and public documents, with an automated integrity check to prevent accidental replacement.

## Content and operational checks before launch

- Configure the dedicated WordPress backend at `studio.tijcef.org`.
- Install `wordpress-plugin/tijcef-core.zip`, then edit the generated `TIJCEF Primary` menu.
- Add current, source-verified grants in WordPress. Do not republish expired or unverified sample opportunities.
- Confirm the public address, phone number, social handles and donation account details.
- Retain the approved public figures (3,500+ cumulative; 1,200+ in 2026) only while supporting records remain available.
- Add real policy documents for safeguarding, complaints, financial controls and data retention as they are approved.
- Review Media Tracker drafts at least weekly; publish only mentions confirmed against the original source.

## Validation result

- Production build: passed
- Automated tests: passed
- Lint: passed with no findings
- Production sitemap: 53 valid, canonical, indexable route snapshots at the 2 September 2026 build
- Unknown routes: preserved as HTTP 404 responses by the included hosting rules
