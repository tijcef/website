import {afterEach,expect,it,vi} from 'vitest';
import {cleanup,render,screen} from '@testing-library/react';
import {MemoryRouter,Routes,Route} from 'react-router-dom';
import Post from '../pages/Post';
import {getPostBySlug} from '../lib/wordpress';
vi.mock('../lib/wordpress',()=>({getPostBySlug:vi.fn(),sanitizeWordPressHtml:(value:string)=>value}));
vi.mock('../components/site/SiteLayout',()=>({default:({children}:any)=><main>{children}</main>}));
afterEach(()=>{cleanup();document.getElementById('tijcef-publication-data')?.remove();vi.clearAllMocks();});
function seed(){const script=document.createElement('script');script.id='tijcef-publication-data';script.type='application/json';script.textContent=JSON.stringify({path:'/post/example',data:{id:1,slug:'example',title:'Saved community update',content:'<p>Saved programme details.</p>',excerpt:'Community work',date:'2026-10-01',modified:'2026-10-01',featuredImage:'',featuredImageAlt:''}});document.head.append(script);}
it('keeps saved content and public sharing links when the content service fails',async()=>{
 seed();vi.mocked(getPostBySlug).mockRejectedValue(new Error('Offline'));
 render(<MemoryRouter initialEntries={['/post/example']}><Routes><Route path='/post/:slug' element={<Post/>}/></Routes></MemoryRouter>);
 await screen.findByText(/Showing the saved publication/);
 expect(screen.getByText('Saved programme details.')).toBeInTheDocument();
 expect(screen.getAllByRole('link',{name:'Share on WhatsApp'})).toHaveLength(2);
 expect(screen.getAllByRole('link',{name:'Share on WhatsApp'})[0].getAttribute('href')).toContain(encodeURIComponent('https://www.tijcef.org/post/example'));
});
it('does not present a saved article as available after the server confirms removal',async()=>{
 seed();vi.mocked(getPostBySlug).mockResolvedValue(null);
 render(<MemoryRouter initialEntries={['/post/example']}><Routes><Route path='/post/:slug' element={<Post/>}/></Routes></MemoryRouter>);
 await screen.findByRole('heading',{name:'Update unavailable'});
 expect(screen.queryByText('Saved programme details.')).not.toBeInTheDocument();
});
