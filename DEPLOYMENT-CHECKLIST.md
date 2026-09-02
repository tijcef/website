# TIJCEF deployment checklist

## Frontend

1. Copy `.env.example` to `.env` for local work.
2. Set these variables in the production deployment:

```text
VITE_WORDPRESS_URL=https://studio.tijcef.org
VITE_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
VITE_ADSENSE_CLIENT=ca-pub-8967021504063466
VITE_ADSENSE_TEST_MODE=false
```

3. Run:

```text
npm ci
npm run lint
npm test
npm run build
```

4. Deploy the generated `dist` directory or allow the hosting platform to run the build.
5. Keep `vercel.json` at the project root. It maps valid pre-rendered routes and
   deliberately leaves unknown URLs as real HTTP 404 responses.
6. Confirm `https://tijcef.org/*` redirects to the canonical `www` hostname.
7. Submit `https://www.tijcef.org/sitemap.xml` in Google Search Console.
8. Open `https://www.tijcef.org/feed.xml` in a feed reader and confirm current posts appear.
9. Verify `https://www.tijcef.org/ads.txt` contains the TIJCEF publisher record.

## WordPress at studio.tijcef.org

1. Upload and activate `wordpress-plugin/tijcef-core.zip`.
2. Open **Settings → Permalinks**, select **Post name**, and save.
3. Add the Paystack secret key to `wp-config.php`:

```php
define('TIJCEF_PAYSTACK_SECRET_KEY', 'your_paystack_secret_key');
define('TIJCEF_VERCEL_DEPLOY_HOOK', 'your_vercel_deploy_hook');
```

4. Confirm these endpoints open:

```text
https://studio.tijcef.org/wp-json/wp/v2/tijcef_grant
https://studio.tijcef.org/wp-json/tijcef/v1/navigation
https://studio.tijcef.org/wp-json/tijcef/v1/coverage
```

If either endpoint returns `rest_no_route` or a 404 response, the TIJCEF Core
plugin is not active. Activate it under **WordPress → Plugins**, then open
**Settings → Permalinks** and click **Save Changes** once.

5. Create a WordPress menu named **TIJCEF Primary**, then add pages, categories
   and subcategories in the exact order required on the public site.
6. Configure WordPress to send email reliably and verify the administrator email.
7. The TIJCEF Core plugin sends `noindex` directives for the backend because the
   public website is `www.tijcef.org`.
8. Open **Media Tracker** and verify the daily scan is creating possible mentions as drafts. Confirm the original publisher, source URL and date before ticking **verified** and publishing.

## AdSense

1. Enable or tune Auto Ads in the TIJCEF AdSense account.
2. Use Google's Privacy & Messaging consent flow for relevant visitors.
3. Exclude donation, contact, get-involved, thank-you and policy pages from Auto Ads.
4. If using manual placements, set `VITE_ADSENSE_CONTENT_SLOT` and
   `VITE_ADSENSE_DIRECTORY_SLOT` to real slot IDs; unconfigured slots stay hidden.

## Content checks

- Confirm the office address, telephone number, bank account and social links.
- Publish grant listings only after checking the official funder page and deadline.
- Keep programme figures aligned with approved reports and registers.
- Keep the corrected annual report and press kit in place unless a later approved version has reconciled figures and document control.

## Required public checks

- `/`
- `/about`
- `/programs`
- `/impact`
- `/media-coverage`
- `/donate`
- `/contact`
- `/grants`
- `/grants/grants`
- `/grants/scholarships`
- `/grants/fellowships`
- `/grants/jobs`
- `/grants/internships`
- `/privacy`
- `/transparency`
- `/safeguarding`
- `/complaints`
- `/donation-policy`
- `/terms`
- `/accessibility`
