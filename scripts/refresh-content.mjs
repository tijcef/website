import { readFile, writeFile, rename } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
const origin=(process.env.VITE_WORDPRESS_URL || 'https://studio.tijcef.org').replace(/\/$/,'');
const esc=value=>String(value||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const plain=value=>new JSDOM(String(value||'')).window.document.body.textContent.replace(/\s+/g,' ').trim();
const verified=value=>value===true||value===1||value==='1';
const safeUrl=value=>/^https?:\/\//i.test(String(value||''))?String(value):'';
const clean=value=>{
 const document=new JSDOM(`<body>${value||''}</body>`).window.document;
 document.querySelectorAll('script,style,iframe,object,embed,form,input,button,textarea,select,link,meta,base').forEach(e=>e.remove());
 document.querySelectorAll('*').forEach(e=>{for(const a of [...e.attributes])if(/^on/i.test(a.name)||a.name==='style'||/^(?:javascript|data):/i.test(a.value))e.removeAttribute(a.name);});
 return document.body.innerHTML;
};
async function collection(endpoint){
 const rows=[];
 for(let page=1;page<=100;page++){
  const type=endpoint==='categories'?'':'&status=publish&_embed=wp:featuredmedia';
  const response=await fetch(`${origin}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}${type}`,{signal:AbortSignal.timeout(20000)});
  if(!response.ok)throw Error(`${endpoint}: HTTP ${response.status}`);
  const batch=await response.json();if(!Array.isArray(batch))throw Error(`${endpoint}: Invalid collection`);
  rows.push(...batch);
  const pages=Number(response.headers.get('X-WP-TotalPages'));
  if((pages>0&&page>=pages)||batch.length<100)return rows;
 }
 throw Error(`${endpoint}: Pagination limit reached`);
}
try{
 const [posts,grants,categories]=await Promise.all([collection('posts'),collection('tijcef_grant'),collection('categories')]);
 const recent=posts.filter(r=>r.slug).map(r=>({id:r.id,slug:r.slug,title:plain(r.title?.rendered),excerpt:plain(r.excerpt?.rendered),content:'',date:r.date,modified:r.modified,featuredImage:safeUrl(r._embedded?.['wp:featuredmedia']?.[0]?.source_url),featuredImageAlt:r._embedded?.['wp:featuredmedia']?.[0]?.alt_text||plain(r.title?.rendered)}));
 const snapshots=[];
 for(const [rows,prefix] of [[posts,'/post/'],[grants,'/grants/opportunities/']])for(const row of rows){
  if(prefix.includes('grants')&&(!verified(row.meta?.verified)||!safeUrl(row.meta?.application_url)))continue;
  if(!row.slug||!row.title?.rendered||!row.content?.rendered)continue;
  const path=prefix+encodeURIComponent(row.slug);const title=plain(row.title.rendered);const description=plain(row.excerpt?.rendered||row.content.rendered).slice(0,180)||title;
  const image=safeUrl(row._embedded?.['wp:featuredmedia']?.[0]?.source_url);
  const meta=row.meta||{};
  snapshots.push({path,featuredImage:image,featuredImageAlt:row._embedded?.['wp:featuredmedia']?.[0]?.alt_text||title,date:row.date,modified:row.modified_gmt?row.modified_gmt+'Z':undefined,verified:verified(meta.verified),applicationUrl:safeUrl(meta.application_url),funder:meta.funder||'',sector:meta.sector||'',country:meta.country||'',deadline:meta.deadline||'',amount:meta.amount||'',opportunityType:meta.opportunity_type||'grant',source:`<html><head><title>${esc(title)} | TIJCEF</title><meta name="description" content="${esc(description)}"></head><body><div id="root"><main><h1>${esc(title)}</h1>${clean(row.content.rendered)}</main></div><noscript></noscript></body></html>`});
 }
 for(const category of categories){
  if(!category.slug)continue;
  const members=posts.filter(post=>post.categories?.includes(category.id));
  const path='/category/'+encodeURIComponent(category.slug);const title=plain(category.name);
  const items=members.map(post=>`<article><h2><a href="/post/${encodeURIComponent(post.slug)}">${esc(plain(post.title?.rendered))}</a></h2><p>${esc(plain(post.excerpt?.rendered))}</p></article>`).join('');
  snapshots.push({path,noIndex:members.length===0,source:`<html><head><title>${esc(title)} | TIJCEF</title><meta name="description" content="${esc('Latest TIJCEF publications from '+title+'.')}"></head><body><div id="root"><main><h1>${esc(title)}</h1>${items||'<p>No publications in this section yet.</p>'}</main></div><noscript></noscript></body></html>`});
 }
 // Commit complete collections only after every required CMS request succeeds.
 await writeFile('recent-posts.json.pending',JSON.stringify(recent,null,2));
 await writeFile('content-snapshots.json.pending',JSON.stringify(snapshots,null,2));
 await rename('recent-posts.json.pending','recent-posts.json');
 await rename('content-snapshots.json.pending','content-snapshots.json');
 console.log(`CMS refresh complete: ${posts.length} posts, ${grants.length} opportunities, ${categories.length} categories.`);
}catch(error){console.error(`CMS refresh failed: ${error.message}. Saved snapshots were retained.`);process.exitCode=1;}
