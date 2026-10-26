import { readFile, writeFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
const origin = (process.env.VITE_WORDPRESS_URL || 'https://studio.tijcef.org').replace(/\/$/,'');
const clean = value => {
 const dom = new JSDOM(`<body>${value || ''}</body>`);
 dom.window.document.querySelectorAll('script,style,iframe,object,embed,form,link,meta,base').forEach(e=>e.remove());
 dom.window.document.querySelectorAll('*').forEach(e=>{ for (const a of [...e.attributes]) if (/^on/i.test(a.name) || /^(?:javascript|data):/i.test(a.value)) e.removeAttribute(a.name); });
 return dom.window.document.body.innerHTML;
};
const esc = s => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const stored = JSON.parse(await readFile('content-snapshots.json','utf8'));
const snapshots = new Map(stored.map(row=>[row.path,row]));
for (const [endpoint,prefix] of [['posts','/post/'],['tijcef_grant','/grants/opportunities/']]) {
 try {
  const rows = [];
  for (let page=1;page<=100;page++) {
   const url = `${origin}/wp-json/wp/v2/${endpoint}?status=publish&per_page=100&page=${page}&_embed=wp:featuredmedia`;
   const response = await fetch(url,{ signal:AbortSignal.timeout(15000) });
   if (!response.ok) throw new Error(`HTTP ${response.status}`);
   const batch = await response.json();
   if (!Array.isArray(batch)) throw new Error('Expected published content array');
   rows.push(...batch); if(batch.length<100) break;
  }
  if (endpoint === 'posts') {
   const recent = rows.filter(row=>row.slug).map(row=>({
    id:row.id, slug:row.slug, title:new JSDOM(row.title.rendered).window.document.body.textContent,
    excerpt:new JSDOM(row.excerpt?.rendered || '').window.document.body.textContent.replace(/\s+/g,' ').trim(),
    content:'', date:row.date, modified:row.modified,
    featuredImage:row._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
    featuredImageAlt:row._embedded?.['wp:featuredmedia']?.[0]?.alt_text || '',
   }));
   await writeFile('recent-posts.json',JSON.stringify(recent,null,2));
  }
  // Replace this collection only after every fetched page succeeds.
  for (const key of snapshots.keys()) if(key.startsWith(prefix)) snapshots.delete(key);
  for (const row of rows) {
   if (endpoint === "tijcef_grant" && (!row.meta?.verified || !row.meta?.application_url)) continue;
   if (!row.slug || !row.title?.rendered || !row.content?.rendered) continue;
   const path = prefix + encodeURIComponent(row.slug);
   const title = new JSDOM(row.title.rendered).window.document.body.textContent;
   const description = new JSDOM(row.excerpt?.rendered || row.content.rendered).window.document.body.textContent.replace(/\s+/g,' ').trim().slice(0,180);
   snapshots.set(path,{path,source:`<html><head><title>${esc(title)} | TIJCEF</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="https://www.tijcef.org${path}"></head><body><div id="root"><main><h1>${esc(title)}</h1>${clean(row.content.rendered)}</main></div><noscript></noscript></body></html>`, modified:row.modified_gmt ? row.modified_gmt + 'Z' : undefined, fetchedAt:new Date().toISOString()});
  }
  console.log(`Refreshed ${endpoint}: ${rows.length} published records`);
 } catch(error) {
  console.warn(`CMS ${endpoint} refresh unavailable (${error.message}); retaining supplied content snapshots. Re-run refresh when CMS is reachable.`);
 }
}
await writeFile('content-snapshots.json',JSON.stringify([...snapshots.values()],null,2));
