import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
const rows=JSON.parse(await readFile('content-snapshots.json','utf8'));
const recent=JSON.parse(await readFile('recent-posts.json','utf8'));
let pages=0,photos=0;
for(const row of rows){
 if(!/^\/(post|grants\/opportunities)\//.test(row.path))continue;
 const doc=new JSDOM(await readFile(`dist${row.path}/index.html`,'utf8')).window.document;
 const canonical=`https://www.tijcef.org${row.path}`;
 const groups=doc.querySelectorAll('[data-publication-share]');
 if(groups.length!==2)throw Error(`Expected top and bottom sharing: ${row.path}`);
 for(const group of groups){
  for(const name of ['Facebook','WhatsApp','X','LinkedIn']){
   const link=group.querySelector(`[aria-label="Share on ${name}"]`);
   if(!link)throw Error(`Missing ${name}: ${row.path}`);
   const destination=new URL(link.href);const shared=destination.searchParams.get(name==='Facebook'?'u':name==='WhatsApp'?'text':'url');
   if(!shared?.includes(canonical))throw Error(`Wrong URL: ${row.path}`);
  }
 }
 const image=doc.querySelector('meta[property="og:image"]')?.content;
 if(image!==doc.querySelector('meta[name="twitter:image"]')?.content)throw Error(`Preview mismatch: ${row.path}`);
 const source=new JSDOM(row.source).window.document;
 const post=recent.find(post=>row.path===`/post/${post.slug}`);
 const expected=row.featuredImage || post?.featuredImage;
 if(expected&&image!==new URL(expected,'https://www.tijcef.org').href)throw Error(`Featured photo not used: ${row.path}`);
 if(image&&!image.endsWith('/og-logo.webp'))photos++;
 pages++;
}
console.log(`Sharing checks passed: ${pages} publications, top/bottom platform links, ${photos} publication photographs and branded fallback elsewhere.`);
