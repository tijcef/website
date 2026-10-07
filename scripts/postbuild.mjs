import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { render, staticPaths } from '../.prerender/prerender.js';
const origin = 'https://www.tijcef.org';
const template = await readFile('dist/index.html', 'utf8');
const escape = s => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const recentPosts = JSON.parse(await readFile('recent-posts.json','utf8'));
const indexable = [];
for (const path of [...staticPaths, '/404.html']) {
 const { html, meta } = render(path, recentPosts);
 if (!meta) throw new Error(`Missing page metadata: ${path}`);
 const noindex = meta.noIndex || ['/thank-you','/verify','/404.html'].includes(path);
 const title = meta.includeSiteName !== false && !meta.title.toLowerCase().includes('tijcef') ? `${meta.title} | TIJCEF` : meta.title;
 const canonical = `${origin}${path}`;
 let output = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`)
  .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(meta.description)}" />`)
  .replace(/<meta name="robots"[^>]*>/, `<meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}" />`)
  .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${escape(canonical)}" />`)
  .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${escape(canonical)}" />`)
  .replace(/<meta (property="og:title"|name="twitter:title")[^>]*>/g, (_,attr) => `<meta ${attr} content="${escape(title)}" />`)
  .replace(/<meta (property="og:description"|name="twitter:description")[^>]*>/g, (_,attr) => `<meta ${attr} content="${escape(meta.description)}" />`)
  .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);
 if (path === '/') output = output.replace('</head>', `<script id="tijcef-recent-posts" type="application/json">${JSON.stringify(recentPosts.slice(0,6)).replace(/</g,'\\u003c')}</script></head>`);
 const file = path === '/' ? 'dist/index.html' : path === '/404.html' ? 'dist/404.html' : `dist${path}/index.html`;
 await mkdir(file.slice(0,file.lastIndexOf('/')), { recursive:true });
 await writeFile(file, output);
 if (!noindex) indexable.push(canonical);
}
const snapshots = JSON.parse(await readFile('content-snapshots.json','utf8'));
for (const row of snapshots) {
 const path = row.path;
 if (!/^\/(post|category|grants\/opportunities)\/[a-zA-Z0-9%_-]+$/.test(path)) throw new Error(`Unsafe snapshot path: ${path}`);
 const source = row.source;
 const title = source.match(/<title>([\s\S]*?)<\/title>/)?.[1];
 const description = source.match(/<meta name="description" content="([^"]*)"/)?.[1] || '';
 const body = source.match(/<div id="root">([\s\S]*?)<\/div>\s*<noscript>/)?.[1];
 if (!body || !title) throw new Error(`Incomplete content snapshot: ${path}`);
 const canonical = `${origin}${path}`;
 const output = template.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${title}</title>`)
 .replace(/<meta name="description"[^>]*>/, () => `<meta name="description" content="${description}" />`)
 .replace(/<link rel="canonical"[^>]*>/, () => `<link rel="canonical" href="${canonical}" />`)
 .replace(/<meta property="og:url"[^>]*>/, () => `<meta property="og:url" content="${canonical}" />`)
 .replace(/<meta (property="og:title"|name="twitter:title")[^>]*>/g, (_,attr) => `<meta ${attr} content="${title}" />`)
 .replace(/<meta (property="og:description"|name="twitter:description")[^>]*>/g, (_,attr) => `<meta ${attr} content="${description}" />`)
 .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
 await mkdir(`dist${path}`,{recursive:true});
 await writeFile(`dist${path}/index.html`,output);
 indexable.push(canonical);
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map(url=>`<url><loc>${escape(url)}</loc></url>`).join('\n')}\n</urlset>\n`);
// CMS-backed /wp-json/wp/v2/posts and /wp-json/wp/v2/tijcef_grant URLs must
// be added only from a successful trusted fetch with matching generated HTML.
// Do not publish invented entries or homepage shells for unknown article URLs.
// Publisher authorization remains in public/ads.txt (f08c47fec0942fa0).
console.log(`Generated ${staticPaths.length} pages, 404.html and ${indexable.length} sitemap URLs.`);

const paths = [...staticPaths, ...snapshots.map(row => row.path)];
const redirects = ['https://tijcef.org/* https://www.tijcef.org/:splat 301', '/index.html / 301'];
for (const path of paths.filter(path => path !== '/')) {
 redirects.push(`${path}/index.html ${path} 301`, `${path}/ ${path} 301`, `${path} ${path}/index.html 200`);
}
redirects.push('/post/* /post-shell.html 200');
redirects.push('/404.html                 /404.html                    404', '/*                        /404.html                    404');
await writeFile('dist/_redirects', redirects.join('\n') + '\n');
await writeFile('public/_redirects', redirects.join('\n') + '\n');
await writeFile('public/sitemap.xml', await readFile('dist/sitemap.xml'));
await writeFile('dist/feed.xml', `<?xml version="1.0"?><rss version="2.0"><channel><title>TIJCEF Updates</title><link>${origin}/</link><description>TIJCEF community updates</description>${snapshots.filter(row=>row.path.startsWith('/post/')).map(row=>`<item><title>${escape(row.source.match(/<title>([\s\S]*?)<\/title>/)?.[1] || 'TIJCEF update')}</title><link>${origin}${row.path}</link><guid>${origin}${row.path}</guid></item>`).join('')}</channel></rss>`);

// New CMS posts remain reachable before the next static build; React renders
// their own title and canonical after loading the requested published post.
const shell = template.replace(/<link rel="canonical"[^>]*>/, '')
 .replace(/<meta property="og:url"[^>]*>/, '')
 .replace(/<title>[\s\S]*?<\/title>/, '<title>TIJCEF Update</title>');
await writeFile('dist/post-shell.html',shell);
const config = JSON.parse(await readFile('vercel.json','utf8'));
config.rewrites = config.rewrites.filter(row => row.source !== '/post/:slug' && !snapshots.some(s => s.path === row.source));
config.rewrites.push(...snapshots.map(row => ({source:row.path,destination:`${row.path}/index.html`})), {source:'/post/:slug',destination:'/post-shell.html'});
await writeFile('vercel.json',JSON.stringify(config,null,2)+'\n');
