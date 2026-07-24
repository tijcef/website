# TIJCEF Website

The complete Vite frontend for [tijcef.org](https://tijcef.org), including:

- Main TIJCEF nonprofit website
- TGIS at `/tgis`
- TIJCEF Grant Hub at `/grants`
- Headless WordPress integration

## Local development

```sh
cp .env.example .env
npm install
npm run dev
```

Set `VITE_WORDPRESS_URL` to the dedicated TIJCEF WordPress backend URL. The recommended backend is `https://wp.tijcef.org`; do not reuse the ClearFact CMS.

## WordPress

Install and activate the plugin in `wordpress-plugin/tijcef-core`. It adds Grant Opportunity and TGIS Report content types, public REST output, a moderated report intake endpoint, rate limiting and restricted CORS.

## Production

```sh
npm run lint
npm test
npm run build
```

Deploy `dist`. The included `_redirects` keeps client-side routes working on compatible static hosts. Add `VITE_WORDPRESS_URL` to the deployment environment before building.

## Safety and publishing

- TGIS public reports enter WordPress as pending.
- Review safeguarding and sensitive locations before publishing.
- Grant listings must link directly to a funder's official page and be rechecked before publication.
- Never promise funding or charge an application fee through the directory.
