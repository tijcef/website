# TIJCEF deployment checklist

## Frontend

1. Copy `.env.example` to `.env` for local work.
2. Set these variables in the production deployment:

```text
VITE_WORDPRESS_URL=https://studio.tijcef.org
VITE_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

3. Run:

```text
bun install
bun run lint
bun run test
bun run build
```

4. Deploy the generated `dist` directory or allow the hosting platform to run the build.
5. Confirm that all client-side paths are redirected to `index.html`.

## WordPress at studio.tijcef.org

1. Upload and activate `wordpress-plugin/tijcef-core.zip`.
2. Open **Settings → Permalinks**, select **Post name**, and save.
3. Add the Paystack secret key to `wp-config.php`:

```php
define('TIJCEF_PAYSTACK_SECRET_KEY', 'your_paystack_secret_key');
```

4. Confirm these endpoints open:

```text
https://studio.tijcef.org/wp-json/wp/v2/tijcef_grant
https://studio.tijcef.org/wp-json/tijcef/v1/navigation
```

If either endpoint returns `rest_no_route` or a 404 response, the TIJCEF Core
plugin is not active. Activate it under **WordPress → Plugins**, then open
**Settings → Permalinks** and click **Save Changes** once.

5. Create a WordPress menu named **TIJCEF Primary**, then add pages, categories
   and subcategories in the exact order required on the public site.
6. Configure WordPress to send email reliably and verify the administrator email.
7. The TIJCEF Core plugin sends `noindex` directives for the backend because the
   public website is `tijcef.org`.

## Content checks

- Confirm the office address, telephone number, bank account and social links.
- Publish grant listings only after checking the official funder page and deadline.
- Keep programme figures aligned with approved reports and registers.
- Replace the media kit only after its impact figures are reconciled.

## Required public checks

- `/`
- `/about`
- `/programs`
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
