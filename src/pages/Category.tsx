import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";
import PageMeta from "@/components/site/PageMeta";
import { Button } from "@/components/ui/button";
import AdSlot from "@/components/site/AdSlot";
import {
  getPostsByCategory,
  type WordPressPost,
} from "@/lib/wordpress";

const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : new Intl.DateTimeFormat("en-NG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
};

export default function Category() {
  const { slug = "" } = useParams();
  const [name, setName] = useState("");
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getPostsByCategory(slug)
      .then((result) => {
        if (!active) return;
        setName(result.categoryName);
        setPosts(result.posts);
      })
      .catch((reason) => {
        if (active) setError(reason instanceof Error ? reason.message : "This section is unavailable.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  const title = name || slug.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

  return (
    <SiteLayout>
      <PageMeta
        title={title}
        description={`Latest TIJCEF programmes, resources and field updates from ${title}.`}
        noIndex={!loading && (Boolean(error) || posts.length === 0)}
      />
      <section className="border-b bg-muted/50 pb-14 pt-32">
        <div className="container">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">TIJCEF Section</div>
          <h1 className="mt-3 text-5xl md:text-6xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Programmes, evidence and stories published directly by the TIJCEF team.
          </p>
        </div>
      </section>

      <section className="container py-16">
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading posts">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-80 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-accent/60 bg-accent-soft p-8">
            <h2 className="text-2xl">This section is reconnecting</h2>
            <p className="mt-2 text-muted-foreground">{error}</p>
            <Button type="button" className="mt-6" onClick={() => window.location.reload()}>
              Try again
            </Button>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="rounded-2xl border border-dashed p-12 text-center">
            <h2 className="text-3xl">New updates are coming</h2>
            <p className="mt-3 text-muted-foreground">
              This category is active, but no public content has been added yet.
            </p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <><div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="group overflow-hidden rounded-2xl border bg-card shadow-card">
                {post.featuredImage ? (
                  <Link to={`/post/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={post.featuredImage}
                      alt={post.featuredImageAlt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                ) : (
                  <div className="aspect-[16/10] bg-gradient-to-br from-primary to-secondary" />
                )}
                <div className="p-6">
                  {post.date && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      {formatDate(post.date)}
                    </div>
                  )}
                  <h2 className="mt-3 text-2xl leading-tight">
                    <Link to={`/post/${post.slug}`} className="transition-colors hover:text-primary">
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>}
                  <Link to={`/post/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div><AdSlot placement="directory" /></>
        )}
      </section>
    </SiteLayout>
  );
}
