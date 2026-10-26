import {expect,it} from 'vitest';
import {createServer} from 'node:http';
import {mkdtemp,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawn} from 'node:child_process';
async function runRefresh(fail:boolean){
 const folder=await mkdtemp(join(tmpdir(),'tijcef-refresh-'));
 const post={id:1,slug:'new-publication',title:{rendered:'New programme'},content:{rendered:'<p>Published details.</p><script>alert(1)</script>'},excerpt:{rendered:'Programme update'},categories:[2],date:'2026-10-26',modified_gmt:'2026-10-26T10:00:00',_embedded:{'wp:featuredmedia':[{source_url:'https://studio.tijcef.org/photo.jpg',alt_text:'Programme'}]}};
 const server=createServer((req,res)=>{
  res.setHeader('Content-Type','application/json');res.setHeader('X-WP-TotalPages','1');
  if(req.url?.includes('tijcef_grant')){res.statusCode=fail?503:200;res.end(JSON.stringify(fail?{message:'Unavailable'}:[]));}
  else if(req.url?.includes('categories'))res.end(JSON.stringify([{id:2,slug:'new-category',name:'New category'},{id:3,slug:'empty',name:'Empty'}]));
  else res.end(JSON.stringify([post]));
 });
 await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve));
 const address=server.address() as {port:number};
 await writeFile(join(folder,'recent-posts.json'),'["keep old posts"]');await writeFile(join(folder,'content-snapshots.json'),'["keep old pages"]');
 try{
  const code=await new Promise<number|null>((resolveCode,reject)=>{const child=spawn(process.execPath,[resolve('scripts/refresh-content.mjs')],{cwd:folder,env:{...process.env,VITE_WORDPRESS_URL:`http://127.0.0.1:${address.port}`},stdio:'ignore'});child.on('error',reject);child.on('close',resolveCode);});
  return {code,posts:JSON.parse(await readFile(join(folder,'recent-posts.json'),'utf8')),snapshots:JSON.parse(await readFile(join(folder,'content-snapshots.json'),'utf8'))};
 }finally{await new Promise<void>(resolve=>server.close(()=>resolve()));await rm(folder,{recursive:true,force:true});}
}
it('includes a newly published post, featured photo and new category in build inputs',async()=>{
 const result=await runRefresh(false);expect(result.code).toBe(0);
 expect(result.posts[0].featuredImage).toBe('https://studio.tijcef.org/photo.jpg');
 expect(result.snapshots.find((r:any)=>r.path==='/post/new-publication').source).not.toContain('<script>');
 expect(result.snapshots.find((r:any)=>r.path==='/category/new-category').source).toContain('/post/new-publication');
 expect(result.snapshots.find((r:any)=>r.path==='/category/empty').noIndex).toBe(true);
},10000);
it('fails the automatic refresh without replacing saved inputs when any CMS collection fails',async()=>{
 const result=await runRefresh(true);expect(result.code).toBe(1);
 expect(result.posts).toEqual(['keep old posts']);expect(result.snapshots).toEqual(['keep old pages']);
},10000);
