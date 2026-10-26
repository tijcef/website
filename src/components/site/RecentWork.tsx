import savedPosts from "../../../recent-posts.json";
import { createContext, useContext } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { uniqueRecentPosts } from '@/lib/recent-posts';
import { Button } from '@/components/ui/button';
import { getLatestPosts, type WordPressPost } from '@/lib/wordpress';
import fallbackImage from '@/assets/health-dignity.jpg';
function seededPosts(): WordPressPost[] {
  if (typeof document === 'undefined') return [];
  try { return JSON.parse(document.getElementById('tijcef-recent-posts')?.textContent || '[]'); }
  catch { return []; }
}
export const RecentPostsContext = createContext<WordPressPost[]>(seededPosts().length ? seededPosts() : savedPosts);
export default function RecentWork() {
  const seed = useContext(RecentPostsContext).slice(0, 6);
  const query = useInfiniteQuery({
    queryKey: ['tijcef-recent-work'],
    queryFn: ({ pageParam }) => getLatestPosts(pageParam, 6),
    initialPageParam: 1,
    getNextPageParam: (last, pages) => last.length === 6 ? pages.length + 1 : undefined,
    initialData: seed.length ? { pages: [seed], pageParams: [1] } : undefined,
    initialDataUpdatedAt: 0,
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
    retry: 1,
  });
  const posts = uniqueRecentPosts(query.data?.pages.flat() || []).slice(0, 3);
  return <>
    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
      {posts.map(post => <article key={post.id} className="glass rounded-2xl p-8 h-full flex flex-col">
        
        <p className="font-display text-lg lg:text-xl leading-snug mb-7 flex-1 line-clamp-5">{post.excerpt}</p>
        <div className="flex items-center gap-3 pt-5 border-t border-primary-foreground/15">
          <img src={post.featuredImage || fallbackImage} alt={post.featuredImageAlt || ''} loading="lazy" width={80} height={80} className="w-12 h-12 rounded-full object-cover shrink-0" />
          <div>
            <h3 className="font-semibold text-sm"><Link className="underline-offset-4 hover:underline focus-visible:underline" to={`/post/${post.slug}`}>{post.title}</Link></h3>
            <time dateTime={post.date} className="text-xs text-primary-foreground/65">{new Date(post.date).toLocaleDateString('en-NG', {day:'numeric',month:'long',year:'numeric'})}</time>
          </div>
        </div>
      </article>)}
    </div>
    {query.isPending && <p role="status">Loading recent work…</p>}
    {query.isError && <div className="mt-6" role="status"><p>{posts.length ? 'Showing saved updates. New updates could not be loaded.' : 'Recent updates could not be loaded.'}</p><Button variant="secondary" className="mt-3" onClick={() => query.refetch()}>Try again</Button></div>}
    {!query.isPending && !query.isError && !posts.length && <p>No updates have been published yet.</p>}
    <div className="mt-8 text-center"><Button asChild variant="secondary"><Link to="/category/impact-stories">More community stories</Link></Button></div>
  </>;
}
