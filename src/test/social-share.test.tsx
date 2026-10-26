import {afterEach,describe,expect,it,vi} from 'vitest';
import {act,cleanup,fireEvent,render,screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import SocialShare from '../components/site/SocialShare';
import {publicationUrl} from '../lib/share';
afterEach(()=>{cleanup();vi.restoreAllMocks();Object.defineProperty(navigator,'share',{configurable:true,value:undefined});Object.defineProperty(navigator,'clipboard',{configurable:true,value:undefined});});
describe('Publication sharing',()=>{
 it('always shares the public canonical URL without local hosts, tracking or fragments',()=>{
 expect(publicationUrl('http://192.168.43.251:8080/post/example/?utm_source=test#comments')).toBe('https://www.tijcef.org/post/example');
 render(<MemoryRouter initialEntries={['/post/example?utm_source=test#comments']}><SocialShare title="Girls & learning"/></MemoryRouter>);
 const whatsapp=new URL(screen.getByRole('link',{name:'Share on WhatsApp'}).getAttribute('href')!);
 expect(whatsapp.searchParams.get('text')).toBe('Girls & learning https://www.tijcef.org/post/example');
 expect(new URL(screen.getByRole('link',{name:'Share on Facebook'}).getAttribute('href')!).searchParams.get('u')).toBe('https://www.tijcef.org/post/example');
 });
 it('copies the opportunity URL and confirms successful copying',async()=>{
 const writeText=vi.fn().mockResolvedValue(undefined);Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText}});
 render(<MemoryRouter><SocialShare title="Grant" url="/grants/opportunities/example"/></MemoryRouter>);
 fireEvent.click(screen.getByRole('button',{name:'Copy Link'}));await screen.findByText('Link copied.');
 expect(writeText).toHaveBeenCalledWith('https://www.tijcef.org/grants/opportunities/example');
 });
 it('provides a selectable link when clipboard access fails',async()=>{
 render(<MemoryRouter initialEntries={['/post/example']}><SocialShare title="Example"/></MemoryRouter>);
 fireEvent.click(screen.getByRole('button',{name:'Copy Link'}));
 expect(await screen.findByRole('textbox',{name:'Publication link'})).toHaveValue('https://www.tijcef.org/post/example');
 });
 it('opens native sharing only on supported devices',async()=>{
 const share=vi.fn().mockResolvedValue(undefined);Object.defineProperty(navigator,'share',{configurable:true,value:share});
 render(<MemoryRouter initialEntries={['/post/example']}><SocialShare title="Example"/></MemoryRouter>);
 await act(async()=>{fireEvent.click(await screen.findByRole('button',{name:'More sharing options'}));});
 expect(share).toHaveBeenCalledWith({title:'Example',url:'https://www.tijcef.org/post/example'});
 });
});
