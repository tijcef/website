import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist");
const SITE_URL = "https://www.tijcef.org";
const WP_URL = (process.env.VITE_WORDPRESS_URL || "https://studio.tijcef.org").replace(/\/$/, "");
const DEFAULT_IMAGE = `${SITE_URL}/og-logo.webp`;
const template = await readFile(path.join(DIST, "index.html"), "utf8");

const fixedRoutes = [
  ["/", "TIJCEF — Empowering Women and Youth in Nigeria", "TIJCEF advances menstrual dignity, youth agency, climate resilience and community-led evidence across Nigeria."],
  ["/about", "About TIJCEF | TIJCEF", "Meet the people, purpose, values and community-centred story behind Tijwun Care and Empowerment Foundation."],
  ["/pillars", "Dignity, Agency, Resilience and Evidence | TIJCEF", "Explore the four pillars that guide TIJCEF's work with women, adolescent girls and young people."],
  ["/programs", "Programmes and Projects | TIJCEF", "Explore TIJCEF's community-based health, education, climate resilience and research programmes in Nigeria."],
  ["/impact", "Impact and Learning | TIJCEF", "Explore TIJCEF's verified reach, 2026 programme evidence, measurement approach and accountability commitments."],
  ["/get-involved", "Volunteer and Partner with TIJCEF | TIJCEF", "Volunteer, partner or collaborate with TIJCEF to advance community-led change for women and youth."],
  ["/donate", "Donate to TIJCEF | TIJCEF", "Support TIJCEF's health, gender, climate and research programmes through a secure one-time donation."],
  ["/resources", "Reports, Research and Toolkits | TIJCEF", "Open-access TIJCEF reports, research, field learning, media coverage and implementation toolkits."],
  ["/resources/pad-a-girl-toolkit", "Pad-A-Girl School Toolkit | TIJCEF", "A practical TIJCEF toolkit for menstrual health education and dignity action in schools and communities."],
  ["/resources/community-circles", "Community Circles: Field Learning | TIJCEF", "Lessons from TIJCEF community wellbeing conversations with women, girls, youth and local leaders."],
  ["/resources/menstrual-health-taraba-adamawa", "Menstrual Health in Taraba and Adamawa | TIJCEF", "TIJCEF's contextual overview of menstrual health barriers, knowledge gaps and WASH challenges."],
  ["/resources/faces-of-empowerment-2025", "Faces of Empowerment 2025 | TIJCEF", "Portraits and stories from TIJCEF's community empowerment work in 2025."],
  ["/contact", "Contact TIJCEF | TIJCEF", "Contact TIJCEF about programmes, partnerships, volunteering, donations or media enquiries."],
  ["/grants", "TIJCEF Grant Hub", "A transparent opportunity discovery and readiness platform for Nigerian nonprofits, researchers and community organisations."],
  ["/grants/opportunities", "Funding Opportunities | TIJCEF Grant Hub", "Browse reviewed grants, scholarships, fellowships, jobs and internships from the TIJCEF Grant Hub."],
  ["/grants/grants", "Grants | TIJCEF Grant Hub", "Browse reviewed grant opportunities relevant to Nigerian nonprofits, researchers and community organisations."],
  ["/grants/scholarships", "Scholarships | TIJCEF Grant Hub", "Browse reviewed scholarship opportunities from the TIJCEF Grant Hub."],
  ["/grants/fellowships", "Fellowships | TIJCEF Grant Hub", "Browse reviewed fellowship opportunities from the TIJCEF Grant Hub."],
  ["/grants/jobs", "Jobs | TIJCEF Grant Hub", "Browse reviewed job opportunities from the TIJCEF Grant Hub."],
  ["/grants/internships", "Internships | TIJCEF Grant Hub", "Browse reviewed internship opportunities from the TIJCEF Grant Hub."],
  ["/grants/membership", "Grant Hub Access | TIJCEF", "Learn how organisations can use the TIJCEF Grant Hub responsibly."],
  ["/grants/about", "About the Grant Hub | TIJCEF", "Learn how TIJCEF reviews and publishes funding and development opportunities."],
  ["/privacy", "Privacy Notice | TIJCEF", "How TIJCEF collects, uses and protects personal information."],
  ["/transparency", "Transparency and Accountability | TIJCEF", "TIJCEF governance, safeguarding and accountability commitments."],
  ["/safeguarding", "Safeguarding and PSEA | TIJCEF", "TIJCEF's public safeguarding and protection commitment."],
  ["/complaints", "Complaints and Feedback | TIJCEF", "How community members, partners, volunteers and donors can submit feedback or a complaint to TIJCEF."],
  ["/donation-policy", "Donation and Refund Policy | TIJCEF", "TIJCEF donation processing, restrictions and refund policy."],
  ["/terms", "Website Terms of Use | TIJCEF", "Terms governing use of the TIJCEF website and Grant Hub."],
  ["/accessibility", "Accessibility Statement | TIJCEF", "TIJCEF's commitment to an inclusive and accessible website."],
];

const noIndexRoutes = [
  ["/thank-you", "Thank You | TIJCEF", "Your TIJCEF submission has been received."],
];

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const stripHtml = (value = "") => String(value)
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/&#8217;|&rsquo;/gi, "’")
  .replace(/\s+/g, " ")
  .trim();

const safeJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

function upsertMeta(html, attribute, key, value) {
  const expression = new RegExp(`<meta\\s+[^>]*${attribute}=["']${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>`, "i");
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return expression.test(html) ? html.replace(expression, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function routeHtml({ route, title, description, image = DEFAULT_IMAGE, noIndex = false, type = "website", date, modified }) {
  const canonical = `${SITE_URL}${route === "/" ? "/" : route}`;
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = upsertMeta(html, "name", "description", description);
  html = upsertMeta(html, "name", "robots", noIndex ? "noindex,follow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
  html = upsertMeta(html, "property", "og:type", type);
  html = upsertMeta(html, "property", "og:title", title);
  html = upsertMeta(html, "property", "og:description", description);
  html = upsertMeta(html, "property", "og:url", canonical);
  html = upsertMeta(html, "property", "og:image", image || DEFAULT_IMAGE);
  html = upsertMeta(html, "property", "og:image:alt", `${title} — TIJCEF`);
  html = upsertMeta(html, "name", "twitter:title", title);
  html = upsertMeta(html, "name", "twitter:description", description);
  html = upsertMeta(html, "name", "twitter:image", image || DEFAULT_IMAGE);
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${canonical}" />`);

  const schema = type === "article"
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: stripHtml(title),
        description,
        url: canonical,
        image: image || DEFAULT_IMAGE,
        datePublished: date,
        dateModified: modified || date,
        author: { "@type": "Organization", name: "Tijwun Care and Empowerment Foundation" },
        publisher: { "@id": `${SITE_URL}/#organization` },
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        name: title,
        description,
        url: canonical,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      };
  html = html.replace("</head>", `    <script id="tijcef-prerender-schema" type="application/ld+json">${safeJson(schema)}</script>\n  </head>`);
  const fallback = `<main class="seo-fallback" style="max-width:760px;margin:0 auto;padding:8rem 1.5rem 4rem"><h1>${escapeHtml(stripHtml(title.replace(/\s*\|\s*TIJCEF.*$/i, "")))}</h1><p>${escapeHtml(description)}</p><p><a href="/">Tijwun Care and Empowerment Foundation</a></p></main>`;
  return html.replace('<div id="root"></div>', `<div id="root">${fallback}</div>`);
}

function safeOutputPath(route) {
  if (route === "/") return path.join(DIST, "index.html");
  const segments = route.split("/").filter(Boolean);
  if (!segments.length || segments.some((segment) => !/^[a-z0-9-]+$/i.test(segment))) return null;
  return path.join(DIST, ...segments, "index.html");
}

async function writeRoute(page) {
  const output = safeOutputPath(page.route);
  if (!output) return;
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, routeHtml(page), "utf8");
}

const sitemap = new Map();
for (const [route, title, description] of fixedRoutes) {
  await writeRoute({ route, title, description });
  sitemap.set(route, "");
}
for (const [route, title, description] of noIndexRoutes) {
  await writeRoute({ route, title, description, noIndex: true });
}

async function fetchCollection(endpoint) {
  const firstUrl = new URL(`${WP_URL}${endpoint}`);
  firstUrl.searchParams.set("per_page", "100");
  firstUrl.searchParams.set("page", "1");
  const firstResponse = await fetch(firstUrl, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(30000) });
  if (!firstResponse.ok) throw new Error(`${firstResponse.status} ${endpoint}`);
  const items = await firstResponse.json();
  const totalPages = Math.min(Number(firstResponse.headers.get("x-wp-totalpages") || 1), 50);
  for (let page = 2; page <= totalPages; page += 1) {
    const url = new URL(firstUrl);
    url.searchParams.set("page", String(page));
    const response = await fetch(url, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`${response.status} ${endpoint} page ${page}`);
    items.push(...await response.json());
  }
  return items;
}

try {
  const [categories, posts, grants] = await Promise.all([
    fetchCollection("/wp-json/wp/v2/categories?hide_empty=false&_fields=id,name,slug,count"),
    fetchCollection("/wp-json/wp/v2/posts?status=publish&orderby=modified&order=desc&_embed=wp:featuredmedia&_fields=id,slug,title,excerpt,date,modified,_embedded"),
    fetchCollection("/wp-json/wp/v2/tijcef_grant?status=publish&orderby=modified&order=desc&_embed=wp:featuredmedia&_fields=id,slug,title,excerpt,date,modified,_embedded"),
  ]);

  for (const category of categories) {
    if (!category?.slug) continue;
    const title = `${stripHtml(category.name)} | TIJCEF`;
    const description = `Latest TIJCEF programmes, resources and field updates from ${stripHtml(category.name)}.`;
    const route = `/category/${category.slug}`;
    await writeRoute({ route, title, description, noIndex: !category.count });
    if (category.count) sitemap.set(route, "");
  }

  for (const post of posts) {
    if (!post?.slug) continue;
    const title = `${stripHtml(post.title?.rendered)} | TIJCEF`;
    const description = stripHtml(post.excerpt?.rendered).slice(0, 170) || "A TIJCEF programme and community impact update.";
    const image = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || DEFAULT_IMAGE;
    const route = `/post/${post.slug}`;
    await writeRoute({ route, title, description, image, type: "article", date: post.date, modified: post.modified });
    sitemap.set(route, post.modified || post.date || "");
  }

  for (const grant of grants) {
    if (!grant?.slug) continue;
    const title = `${stripHtml(grant.title?.rendered)} | TIJCEF Grant Hub`;
    const description = stripHtml(grant.excerpt?.rendered).slice(0, 170) || "A reviewed opportunity from the TIJCEF Grant Hub.";
    const image = grant?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || DEFAULT_IMAGE;
    const route = `/grants/opportunities/${grant.slug}`;
    await writeRoute({ route, title, description, image, type: "article", date: grant.date, modified: grant.modified });
    sitemap.set(route, grant.modified || grant.date || "");
  }
} catch (error) {
  console.warn(`Dynamic SEO snapshots skipped: ${error instanceof Error ? error.message : error}`);
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Array.from(sitemap.entries()).map(([route, lastmod]) => `  <url><loc>${SITE_URL}${route === "/" ? "/" : route}</loc>${lastmod ? `<lastmod>${String(lastmod).slice(0, 10)}</lastmod>` : ""}</url>`).join("\n")}\n</urlset>\n`;
await writeFile(path.join(DIST, "sitemap.xml"), sitemapXml, "utf8");
await writeFile(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, "utf8");

const notFound = routeHtml({
  route: "/404",
  title: "Page Not Found | TIJCEF",
  description: "The requested TIJCEF page could not be found.",
  noIndex: true,
}).replace("</body>", '<script>document.title="Page Not Found | TIJCEF";</script></body>');
await writeFile(path.join(DIST, "404.html"), notFound, "utf8");

const adsenseClient = (
  process.env.VITE_ADSENSE_CLIENT || "ca-pub-8967021504063466"
).trim();
const publisherMatch = /^ca-(pub-\d{10,})$/.exec(adsenseClient);
if (publisherMatch) {
  await writeFile(path.join(DIST, "ads.txt"), `google.com, ${publisherMatch[1]}, DIRECT, f08c47fec0942fa0\n`, "utf8");
}

console.log(`Generated ${sitemap.size} indexable route snapshots.`);
