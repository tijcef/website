import type { WordPressPost } from './wordpress';
// These supplied posts describe the same Yola STEM outreach. Show the newest
// report in Recent work while keeping the underlying publications available.
const sameOutreach = new Set([
 'stem-empowerment-400-girls-yola',
 'tijcef-promotes-stem-education-among-400-girls-in-yola',
 'gallery-tijcef-stem-empowerment-yola',
]);
export function uniqueRecentPosts(posts: WordPressPost[]) {
 const ids = new Set<number>();
 const titles = new Set<string>();
 const activities = new Set<string>();
 return [...posts].sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime()).filter(post=>{
  const title = post.title.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const activity = sameOutreach.has(post.slug) ? 'yola-stem-outreach' : post.slug;
  if(ids.has(post.id)||titles.has(title)||activities.has(activity)) return false;
  ids.add(post.id);titles.add(title);activities.add(activity);return true;
 });
}
