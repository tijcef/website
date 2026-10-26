import {readFile, access} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
const origin='https://www.tijcef.org';
const sitemap=new JSDOM(await readFile('dist/sitemap.xml','utf8'),{contentType:'text/xml'});
const urls=[...sitemap.window.document.querySelectorAll('loc')].map(x=>x.textContent);
if(new Set(urls).size!==urls.length)throw Error('Duplicate sitemap URLs');
let destinations=new Set();
for(const url of urls){
 const u=new URL(url);if(u.origin!==origin||u.search||u.hash)throw Error(`Noncanonical sitemap URL: ${url}`);
 const file=u.pathname==='/'?'dist/index.html':`dist${u.pathname}/index.html`;
 const html=await readFile(file,'utf8'); const doc=new JSDOM(html).window.document;
 if(doc.querySelectorAll('link[rel="canonical"]').length!==1||doc.querySelector('link[rel="canonical"]').href!==url)throw Error(`Canonical mismatch: ${url}`);
 if(/noindex/i.test(doc.querySelector('meta[name="robots"]')?.content||''))throw Error(`Noindex in sitemap: ${url}`);
 if(!doc.title||!doc.querySelector('meta[name="description"]')?.content||!doc.querySelector('main'))throw Error(`Missing metadata/content: ${url}`);
 if(doc.querySelectorAll('#tijcef-prerender-schema').length!==1)throw Error(`Missing page schema: ${url}`);
 for(const schema of doc.querySelectorAll('script[type="application/ld+json"]'))JSON.parse(schema.textContent);
 if(/googlesyndication|google-adsense-account|adsbygoogle/i.test(html))throw Error(`Advertising in ${url}`);
 for(const a of doc.querySelectorAll('a[href]')){const target=new URL(a.getAttribute('href'),url);if(target.origin===origin)destinations.add(target.pathname);}
}
for(const path of destinations){
 if(path.startsWith('/post/'))continue;
 try {await access(path==='/'?'dist/index.html':`dist${path}`);}catch{await access(`dist${path}/index.html`);}
}
for(const path of ['thank-you/index.html','verify/index.html','404.html','post-shell.html','opportunity-shell.html']){
 const html=await readFile(`dist/${path}`,'utf8');const doc=new JSDOM(html).window.document;
 if(!doc.querySelector('meta[name="robots"]')?.content.includes('noindex'))throw Error(`Missing noindex: ${path}`);
 if(urls.includes(`${origin}/${path.replace('/index.html','')}`))throw Error(`Excluded page in sitemap: ${path}`);
}
console.log(`SEO checks passed: ${urls.length} sitemap pages, ${destinations.size} internal destinations, valid JSON-LD and no advertising.`);
