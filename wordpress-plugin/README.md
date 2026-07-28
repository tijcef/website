# TIJCEF WordPress backend

1. Use the dedicated backend at `studio.tijcef.org` (do not reuse the ClearFact CMS).
2. Install WordPress and enforce HTTPS.
3. Zip the `tijcef-core` folder, then upload and activate it under **Plugins → Add New**.
4. In the frontend deployment, set `VITE_WORDPRESS_URL=https://studio.tijcef.org`.
5. Add and publish reviewed **Grant Opportunities** and **TGIS Reports** in WordPress.

TGIS public submissions are saved as **Pending**, not automatically published. Review safeguarding, accuracy and location sensitivity before publication.

For verified Paystack recording, add the secret key to WordPress `wp-config.php`:

```php
define('TIJCEF_PAYSTACK_SECRET_KEY', 'sk_live_your_secret_key');
```

The secret key must never appear in the frontend repository.
