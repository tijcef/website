import {spawnSync} from 'node:child_process';
const offline=process.argv.includes('--offline');
function run(args){const result=spawnSync(process.execPath,args,{stdio:'inherit',env:process.env});if(result.error)throw result.error;if(result.status!==0)process.exit(result.status||1);}
if(!offline)run(['scripts/refresh-content.mjs']);
else console.warn('Offline build: using saved content. Do not use for automatic publishing.');
run(['node_modules/vite/bin/vite.js','build']);
run(['node_modules/vite/bin/vite.js','build','--ssr','src/prerender.tsx','--outDir','.prerender']);
run(['scripts/postbuild.mjs']);
run(['scripts/check-seo.mjs']);
run(['scripts/check-sharing.mjs']);
