# TIJCEF Website

The complete Vite frontend for [tijcef.org](https://www.tijcef.org), including:

- Main TIJCEF nonprofit website
- TIJCEF Grant Hub at `/grants`, with grants, scholarships, fellowships, jobs and internships
- Backend-managed primary navigation with category and subcategory support
- Headless WordPress integration
- Route-specific SEO, structured data, XML sitemap and true 404 handling
- Accessible interaction patterns, public governance policies and an evidence-led impact page
- A verified media-coverage page backed by a daily, editor-reviewed publication tracker
- Privacy-conscious AdSense support that does not leave empty ad containers

## Local development

```sh
cp .env.example .env
npm install
npm run dev
```

Set `VITE_WORDPRESS_URL=https://studio.tijcef.org`. This dedicated WordPress installation must not be confused with the ClearFact CMS.

## WordPress

Install and activate `wordpress-plugin/tijcef-core.zip`. Version 3.0 adds Grant Opportunities, the Media Tracker, backend-managed navigation, public form handling, idempotent donation records, payment verification, rate limiting and restricted CORS.

Create a WordPress menu named **TIJCEF Primary**. Add pages, categories and
subcategories in the order they should appear on the website. The frontend
loads this hierarchy automatically and uses its built-in menu if WordPress is
temporarily unavailable.

If the new REST routes return a 404 response after activation, open
**Settings → Permalinks** in WordPress and click **Save Changes** once.

For Paystack donations, add the public key to the frontend deployment:

```text
VITE_PAYSTACK_PUBLIC_KEY=pk_live_your_public_key
```

Add the secret key only to `wp-config.php` on `studio.tijcef.org`:

```php
define('TIJCEF_PAYSTACK_SECRET_KEY', 'sk_live_your_secret_key');
```

Never put the Paystack secret key in Vite, Git or a public environment variable.

### Keep new WordPress content indexable

Create a Vercel deploy hook for the production branch, then add it only to
`wp-config.php` on `studio.tijcef.org`:

```php
define('TIJCEF_VERCEL_DEPLOY_HOOK', 'https://api.vercel.com/v1/integrations/deploy/your-hook');
```

The plugin requests a debounced rebuild after a post, verified media mention, grant, category or
navigation change. This refreshes the generated article pages and sitemap.

### Publication monitoring

TIJCEF Core runs a daily exact-name Google News RSS scan for `TIJCEF` and
`Tijwun Care and Empowerment Foundation`. Possible mentions are stored as
**drafts** under **WordPress → Media Tracker** and the administrator is emailed.
An editor must open the original source, confirm it refers to this organisation,
complete the metadata, tick the verification box and publish it. Only verified,
published records appear at `/media-coverage`; automation can never publish a
claim on its own.

## Production

```sh
npm run lint
npm test
npm run build
```

Deploy `dist`. The included `vercel.json` serves pre-rendered routes on Vercel,
keeps the `www` hostname canonical and returns a real 404 for unknown URLs.
`_redirects`, `_headers` and `.htaccess` provide equivalent rules for other
compatible static hosts. Add `VITE_WORDPRESS_URL` to the deployment environment
before building.

After deployment, submit `https://www.tijcef.org/sitemap.xml` in Google Search
Console and retire any non-`www` sitemap property or conflicting canonical.

## Responsible advertising

The existing TIJCEF AdSense publisher ID and `ads.txt` record are configured.
Auto Ads can be controlled from AdSense; optional manual content and directory
placements require the corresponding slot IDs:

```text
VITE_ADSENSE_CONTENT_SLOT=1234567890
VITE_ADSENSE_DIRECTORY_SLOT=1234567890
VITE_ADSENSE_TEST_MODE=false
```

In AdSense, enable Google's Privacy & Messaging consent flow for relevant
visitors. Exclude donation, contact, get-involved, thank-you, safeguarding,
complaints, privacy and other policy pages from Auto Ads. Keep ads clearly
separated from calls to donate or apply, and never make an ad look like a TIJCEF
endorsement.

The frontend loads advertising only in editorial, category and Grant Hub
sections. Configure the same page exclusions in AdSense because its script can
remain loaded after client-side navigation.

## Search and quality checks

Every production build generates:

- indexable snapshots for public programme, article, category and grant routes;
- one canonical `https://www.tijcef.org` URL per page;
- page-specific metadata and Schema.org markup;
- a live-content XML sitemap, RSS feed, `robots.txt`, `ads.txt` and `404.html`;
- `noindex` handling for empty, failed, thank-you and not-found pages.

Run `npm test`, `npm run lint` and `npm run build` before each release.

## Safety and publishing

- Review safeguarding and sensitive locations before publishing.
- Grant listings must link directly to a funder's official page and be rechecked before publication.
- Never promise funding or charge an application fee through the directory.
