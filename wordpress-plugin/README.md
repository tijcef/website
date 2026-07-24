# TIJCEF WordPress backend

1. Create a dedicated backend such as `wp.tijcef.org` (do not reuse the ClearFact CMS).
2. Install WordPress and enforce HTTPS.
3. Zip the `tijcef-core` folder, then upload and activate it under **Plugins → Add New**.
4. In the frontend deployment, set `VITE_WORDPRESS_URL=https://wp.tijcef.org`.
5. Add and publish reviewed **Grant Opportunities** and **TGIS Reports** in WordPress.

TGIS public submissions are saved as **Pending**, not automatically published. Review safeguarding, accuracy and location sensitivity before publication.
