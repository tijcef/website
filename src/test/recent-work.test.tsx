import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RecentWork, { RecentPostsContext } from '../components/site/RecentWork';
import { getLatestPosts } from '../lib/wordpress';
vi.mock('../lib/wordpress', () => ({ getLatestPosts: vi.fn() }));
const post = (id:number,date:string) => ({id, slug:`update-${id}`, title:`TIJCEF Update ${id}`, excerpt:'A community update', content:'', date, modified:date, featuredImage:'', featuredImageAlt:''});
afterEach(()=>{cleanup();vi.clearAllMocks();});
describe('Recent TIJCEF work',()=>{
 it('shows newest updates first inside rounded windows with circular images',async()=>{
  vi.mocked(getLatestPosts).mockResolvedValue([post(1,'2026-09-01'),post(2,'2026-10-07')]);
  render(<QueryClientProvider client={new QueryClient({defaultOptions:{queries:{retry:false}}})}><RecentPostsContext.Provider value={[]}><MemoryRouter><RecentWork/></MemoryRouter></RecentPostsContext.Provider></QueryClientProvider>);
  await screen.findByRole('heading',{name:'TIJCEF Update 2'});
  expect(screen.getAllByRole('heading')[0]).toHaveTextContent('TIJCEF Update 2');
  expect(screen.getByRole('heading',{name:'TIJCEF Update 2'}).closest('article')).toHaveClass('rounded-2xl');
  expect(document.querySelector('article img')).toHaveClass('rounded-full');
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
 });
 it('loads older updates after the first full page without repeating cards',async()=>{
  const first=Array.from({length:6},(_,i)=>post(i+1,`2026-10-0${7-i}`));
  vi.mocked(getLatestPosts).mockImplementation(async(page)=>page===1?first:[post(7,'2026-09-01')]);
  render(<QueryClientProvider client={new QueryClient({defaultOptions:{queries:{retry:false}}})}><RecentPostsContext.Provider value={[]}><MemoryRouter><RecentWork/></MemoryRouter></RecentPostsContext.Provider></QueryClientProvider>);
  fireEvent.click(await screen.findByRole('button',{name:'Load more updates'}));
  await screen.findByRole('heading',{name:'TIJCEF Update 7'});
  await waitFor(()=>expect(screen.getAllByRole('heading')).toHaveLength(7));
  expect(screen.queryByRole('button',{name:'Load more updates'})).not.toBeInTheDocument();
 });
});

import { uniqueRecentPosts } from '../lib/recent-posts';
it('removes repeated titles and reports about the same STEM outreach, retaining the newest',()=>{
 const latest={...post(1,'2026-10-07'),slug:'tijcef-promotes-stem-education-among-400-girls-in-yola'};
 const repeated={...post(2,'2026-09-01'),slug:'stem-empowerment-400-girls-yola'};
 const identicalTitle={...post(3,'2026-08-01'),title:latest.title};
 expect(uniqueRecentPosts([repeated,identicalTitle,latest])).toEqual([latest]);
});
