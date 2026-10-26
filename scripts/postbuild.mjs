import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { renderShare, render, staticPaths } from '../.prerender/prerender.js';
const origin = 'https://www.tijcef.org';
const template = await readFile('dist/index.html', 'utf8');
const escape = s => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const recentPosts = JSON.parse(await readFile('recent-posts.json','utf8'));
const indexable = [];
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
function enrichPage(output, {canonical,title,description,type='website',image,modified}) {
 const socialImage = image ? new URL(image, origin).href : `${origin}/og-logo.webp`;
 const schema = {'@context':'https://schema.org','@type':type==='article'?'Article':'WebPage','@id':`${canonical}#${type==='article'?'article':'webpage'}`,url:canonical,name:title,description,image:socialImage,isPartOf:{'@id':`${origin}/#website`},publisher:{'@id':`${origin}/#organization`}};
 if(type==='article') {schema.headline=title; if(modified) schema.dateModified=modified;}
 return output.replace(/<meta property="og:type"[^>]*>/,`<meta property="og:type" content="${type}" />`)
 .replace(/<meta (property="og:image"|name="twitter:image")[^>]*>/g,(_,attr)=>`<meta ${attr} content="${escape(socialImage)}" />`)
 .replace(/<meta property="og:image:(width|height)"[^>]*>/g, match => socialImage === `${origin}/og-logo.webp` ? match : '')
 .replace(/<meta (property="og:image:alt"|name="twitter:image:alt")[^>]*>/g,(_,attr)=>`<meta ${attr} content="${escape(title)}" />`)
 .replace('</head>',`<script id="tijcef-prerender-schema" type="application/ld+json">${json(schema)}</script></head>`);
}

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
 output = enrichPage(output,{canonical,title,description:meta.description,type:meta.type || 'website',image:meta.image});
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
 const description = source.match(/<meta name="description" content="([^"]*)"/)?.[1] || title.replace(/ \| TIJCEF$/, "");
 let body = source.match(/<div id="root">([\s\S]*?)<\/div>\s*<noscript>/)?.[1];
 const refreshedShell = render('/', recentPosts).html;
 if (body) body = body.replace(/<header[\s\S]*?<\/header>/, () => refreshedShell.match(/<header[\s\S]*?<\/header>/)?.[0] || '').replace(/<footer[\s\S]*?<\/footer>/, () => refreshedShell.match(/<footer[\s\S]*?<\/footer>/)?.[0] || '');
 if (!body || !title) throw new Error(`Incomplete content snapshot: ${path}`);
 const canonical = `${origin}${path}`;
 const sourceDocument = new JSDOM(source).window.document;
 let publicationData;
 const plainTitle = sourceDocument.title.replace(/ \| TIJCEF$/, '');
 const savedPost = recentPosts.find(post => path === `/post/${post.slug}`);
 const sourceImage = sourceDocument.querySelector('meta[property="og:image"]')?.content;
 const candidateImage = row.featuredImage || savedPost?.featuredImage || (sourceImage && !/og-logo|tijcef-logo/.test(sourceImage) ? sourceImage : '') || sourceDocument.querySelector('main img[src], article img[src]')?.getAttribute('src');
 let image;
 if (candidateImage) { try { const parsed = new URL(candidateImage, origin); if (/^https?:$/.test(parsed.protocol)) image = parsed.href; } catch {} }
 if (!path.startsWith('/category/')) {
   const document = new JSDOM(`<div id="publication">${body}</div>`).window.document;
   const main = document.querySelector('main') || document.querySelector('article');
   if (!main) throw new Error(`Missing publication content: ${path}`);
   main.querySelectorAll('[data-publication-share]').forEach(node=>node.remove());
   const contentMain = main.cloneNode(true); contentMain.querySelector('h1')?.remove();
   const articleData = {id:savedPost?.id || 0,slug:path.split('/').pop(),title:plainTitle,excerpt:new JSDOM(description).window.document.body.textContent,content:contentMain.innerHTML,date:row.date || savedPost?.date || '',modified:row.modified || savedPost?.modified || '',featuredImage:image || '',featuredImageAlt:row.featuredImageAlt || savedPost?.featuredImageAlt || plainTitle};
   publicationData = {path,data:path.startsWith('/post/') ? articleData : {...articleData,description:articleData.excerpt,funder:row.funder || '',sector:row.sector || 'General',country:row.country || '',deadline:row.deadline || '',amount:row.amount || 'Confirm with funder',applicationUrl:row.applicationUrl || '',verified:row.verified === true,opportunityType:row.opportunityType || 'grant'}};

   const sharing = renderShare(plainTitle, path);
   const first = document.createElement('div'); first.className = 'my-6 border-t pt-5'; first.innerHTML = sharing;
   const last = first.cloneNode(true);
   const heading = main.querySelector('h1');
   if (heading) heading.after(first); else main.prepend(first);
   main.append(last);
   body = document.getElementById('publication').innerHTML;
 }
 let output = template.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${title}</title>`)
 .replace(/<meta name="description"[^>]*>/, () => `<meta name="description" content="${description}" />`)
 .replace(/<link rel="canonical"[^>]*>/, () => `<link rel="canonical" href="${canonical}" />`)
 .replace(/<meta property="og:url"[^>]*>/, () => `<meta property="og:url" content="${canonical}" />`)
 .replace(/<meta (property="og:title"|name="twitter:title")[^>]*>/g, (_,attr) => `<meta ${attr} content="${title}" />`)
 .replace(/<meta (property="og:description"|name="twitter:description")[^>]*>/g, (_,attr) => `<meta ${attr} content="${description}" />`)
 .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
 output = enrichPage(output,{canonical,title,description,type:path.startsWith('/category/')?'website':'article',image,modified:row.modified});
 if(row.noIndex) output = output.replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex,follow" />');
 if(publicationData) output = output.replace('</head>',`<script id="tijcef-publication-data" type="application/json">${json(publicationData)}</script></head>`);
 await mkdir(`dist${path}`,{recursive:true});
 await writeFile(`dist${path}/index.html`,output);
 if(!row.noIndex) indexable.push(canonical);
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map(url=>`<url><loc>${escape(url)}</loc></url>`).join('\n')}\n</urlset>\n`);
// CMS-backed /wp-json/wp/v2/posts and /wp-json/wp/v2/tijcef_grant URLs must
// be added only from a successful trusted fetch with matching generated HTML.
// Do not publish invented entries or homepage shells for unknown article URLs.
// Advertising is disabled across the foundation website.
console.log(`Generated ${staticPaths.length} pages, 404.html and ${indexable.length} sitemap URLs.`);

const paths = [...staticPaths, ...snapshots.map(row => row.path)];
const redirects = ['https://tijcef.org/* https://www.tijcef.org/:splat 301', '/index.html / 301'];
for (const path of paths.filter(path => path !== '/')) {
 redirects.push(`${path}/index.html ${path} 301`, `${path}/ ${path} 301`, `${path} ${path}/index.html 200`);
}
redirects.push('/post/* /post-shell.html 200', '/grants/opportunities/* /opportunity-shell.html 200', '/category/* /category-shell.html 200');
redirects.push('/404.html                 /404.html                    404', '/*                        /404.html                    404');
await writeFile('dist/_redirects', redirects.join('\n') + '\n');
await writeFile('public/_redirects', redirects.join('\n') + '\n');
await writeFile('public/sitemap.xml', await readFile('dist/sitemap.xml'));
await writeFile('dist/feed.xml', `<?xml version="1.0"?><rss version="2.0"><channel><title>TIJCEF Updates</title><link>${origin}/</link><description>TIJCEF community updates</description>${snapshots.filter(row=>row.path.startsWith('/post/')).map(row=>`<item><title>${escape(row.source.match(/<title>([\s\S]*?)<\/title>/)?.[1] || 'TIJCEF update')}</title><link>${origin}${row.path}</link><guid>${origin}${row.path}</guid></item>`).join('')}</channel></rss>`);

// New CMS posts remain reachable before the next static build; React renders
// their own title and canonical after loading the requested published post.
const shell = template.replace(/<link rel="canonical"[^>]*>/, '')
 .replace(/<meta property="og:url"[^>]*>/, '')
 .replace(/<title>[\s\S]*?<\/title>/, '<title>TIJCEF Update</title>')
 .replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex,follow" />');
await writeFile('dist/post-shell.html',shell);
await writeFile('dist/opportunity-shell.html',shell.replace('<title>TIJCEF Update</title>','<title>TIJCEF Opportunity</title>'));
await writeFile('dist/category-shell.html',shell.replace('<title>TIJCEF Update</title>','<title>TIJCEF Publications</title>'));
const config = JSON.parse(await readFile('vercel.json','utf8'));
config.rewrites = config.rewrites.filter(row => row.source !== '/post/:slug' && row.source !== '/grants/opportunities/:slug' && row.source !== '/category/:slug' && !snapshots.some(s => s.path === row.source));
config.rewrites.push(...snapshots.map(row => ({source:row.path,destination:`${row.path}/index.html`})), {source:'/post/:slug',destination:'/post-shell.html'}, {source:'/grants/opportunities/:slug',destination:'/opportunity-shell.html'}, {source:'/category/:slug',destination:'/category-shell.html'});
await writeFile('vercel.json',JSON.stringify(config,null,2)+'\n');
