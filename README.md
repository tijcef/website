# TIJCEF Website

The complete Vite frontend for [tijcef.org](https://tijcef.org), including:

- Main TIJCEF nonprofit website
- TIJCEF Grant Hub at `/grants`, with grants, scholarships, fellowships, jobs and internships
- Backend-managed primary navigation with category and subcategory support
- Headless WordPress integration

## Local development

```sh
cp .env.example .env
npm install
npm run dev
```

Set `VITE_WORDPRESS_URL=https://studio.tijcef.org`. This dedicated WordPress installation must not be confused with the ClearFact CMS.

## WordPress

Install and activate `wordpress-plugin/tijcef-core.zip`. It adds Grant Opportunities, a backend-managed navigation endpoint, public form handling, payment verification, rate limiting and restricted CORS.

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

## Production

```sh
npm run lint
npm test
npm run build
```

Deploy `dist`. The included `_redirects` keeps client-side routes working on compatible static hosts. Add `VITE_WORDPRESS_URL` to the deployment environment before building.

## Safety and publishing

- Review safeguarding and sensitive locations before publishing.
- Grant listings must link directly to a funder's official page and be rechecked before publication.
- Never promise funding or charge an application fee through the directory.
