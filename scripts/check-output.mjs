import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
const xml = await readFile('dist/sitemap.xml','utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(urls.length,new Set(urls).size);
for (const url of urls) {
 const path = new URL(url).pathname;
 assert.equal(new URL(url).origin,'https://www.tijcef.org');
 const file = path==='/'?'dist/index.html':`dist${path}/index.html`;
 const document = new JSDOM(await readFile(file,'utf8')).window.document;
 assert.equal(document.querySelectorAll('link[rel="canonical"]').length,1,file);
 assert.equal(document.querySelector('link[rel="canonical"]').href,url,file);
 assert.equal(document.querySelector('meta[property="og:url"]').content,url,file);
 assert.ok(!document.querySelector('meta[name="robots"]').content.includes('noindex'),file);
 assert.ok(document.querySelector('#root').textContent.trim().length>50,file);
 for (const element of document.querySelectorAll('[src],link[href]')) {
  const value=element.getAttribute('src')||element.getAttribute('href');
  if(value?.startsWith('/assets/')) await access(`dist${value}`);
  assert.ok(!value?.startsWith('/src/'),`Unbuilt asset: ${value}`);
 }
}
for(const path of ['thank-you','verify']){
 const doc = new JSDOM(await readFile(`dist/${path}/index.html`,'utf8')).window.document;
 assert.ok(doc.querySelector('meta[name="robots"]').content.includes('noindex'));
 assert.ok(!urls.includes(`https://www.tijcef.org/${path}`));
}
const redirects = await readFile('dist/_redirects','utf8');
assert.ok(redirects.includes('/about/index.html /about 301'));
assert.ok(redirects.includes('https://tijcef.org/* https://www.tijcef.org/:splat 301'));
console.log(`PASS: ${urls.length} sitemap pages have one matching canonical, matching social URL, visible text and available bundled assets; private pages excluded.`);
