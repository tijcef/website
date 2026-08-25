import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, HeartPulse, Sprout, Microscope, Sparkles, ShieldCheck, Globe2, Users, Award, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/site/SiteLayout";
import Counter from "@/components/site/Counter";
import Reveal from "@/components/site/Reveal";
import { getPostsByCategory, type WordPressPost } from "@/lib/wordpress";
import heroImg from "@/assets/hero-woman.jpg";
import girlsImg from "@/assets/girls-education.jpg";
import climateImg from "@/assets/climate-action.jpg";
import healthImg from "@/assets/health-dignity.jpg";
import researchImg from "@/assets/research.jpg";

const pillars = [
  { icon: HeartPulse, title: "Dignity", desc: "Protecting the health, wellbeing, and inherent dignity of women and girls.", img: healthImg, color: "from-primary to-primary-glow" },
  { icon: Sparkles, title: "Agency", desc: "Equipping women and girls to make informed choices, build livelihoods, and lead.", img: girlsImg, color: "from-secondary to-primary" },
  { icon: Sprout, title: "Resilience", desc: "Helping women and girls prepare, adapt, and recover from climate and economic shocks.", img: climateImg, color: "from-primary-glow to-accent" },
  { icon: Microscope, title: "Evidence", desc: "Using the voices and data of women and girls to improve programmes and policy.", img: researchImg, color: "from-secondary to-primary-glow" },
];

const stats = [
  { end: 3500, suffix: "+", label: "Cumulative people reached" },
  { end: 1200, suffix: "+", label: "People reached in 2026" },
  { end: 4, suffix: "", label: "Programme pillars" },
  { end: 3, suffix: "", label: "States" },
];

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

const loadLatestProgrammePosts = async () => {
  const results = await Promise.allSettled([
    getPostsByCategory("completed-projects"),
    getPostsByCategory("impact-stories"),
  ]);
  const successful = results.filter(
    (result): result is PromiseFulfilledResult<Awaited<ReturnType<typeof getPostsByCategory>>> =>
      result.status === "fulfilled"
  );

  if (successful.length === 0) {
    throw new Error("Latest programme updates are temporarily unavailable.");
  }

  const uniquePosts = new Map<number, WordPressPost>();
  successful.forEach((result) => {
    result.value.posts.forEach((post) => uniquePosts.set(post.id, post));
  });

  return Array.from(uniquePosts.values())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
};

const Index = () => {
  const [latestPosts, setLatestPosts] = useState<WordPressPost[]>([]);
  const [latestLoading, setLatestLoading] = useState(true);
  const [latestError, setLatestError] = useState("");

  useEffect(() => {
    let active = true;
    loadLatestProgrammePosts()
      .then((posts) => {
        if (active) setLatestPosts(posts);
      })
      .catch((reason) => {
        if (active) {
          setLatestError(reason instanceof Error ? reason.message : "Latest programme updates are temporarily unavailable.");
        }
      })
      .finally(() => {
        if (active) setLatestLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Young Nigerian woman representing TIJCEF's empowerment mission" className="w-full h-full object-cover animate-slow-zoom" width={1920} height={1080} />
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
        </div>

        <div className="container relative z-10 pb-24 pt-40 text-primary-foreground">
          <div className="max-w-4xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.18em] mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Women and Girls at the Centre
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl leading-[0.98] tracking-tight mb-7 text-balance">
                Advancing women’s dignity.<br />
                Strengthening girls’ agency.<br />
                <span className="italic text-accent font-light">Building resilient communities through evidence.</span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl leading-relaxed mb-10">
                TIJCEF works alongside adolescent girls, women and young female leaders across Nigeria protecting dignity, expanding agency, strengthening resilience and generating evidence that improves programmes and transforms lives.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="donate" size="xl">
                  <Link to="/donate">Donate Now <ArrowRight className="w-5 h-5" /></Link>
                </Button>
                <Button asChild variant="heroOutline" size="xl">
                  <Link to="/get-involved">Become a Partner</Link>
                </Button>
                <Button asChild variant="heroOutline" size="xl">
                  <Link to="/get-involved">Join as Volunteer</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stats overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 hidden md:block">
          <div className="container">
            <div className="glass-card rounded-t-2xl border-b-0 grid grid-cols-2 lg:grid-cols-4 divide-x divide-border/40">
              {stats.map((s, i) => (
                <div key={i} className="px-6 py-7 text-center">
                  <div className="font-display text-3xl lg:text-5xl text-primary leading-none mb-2">
                    <Counter end={s.end} suffix={s.suffix} />
                  </div>
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE STATS */}
      <section className="md:hidden py-12 bg-muted/40">
        <div className="container grid grid-cols-2 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-3xl text-primary"><Counter end={s.end} suffix={s.suffix} /></div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT / MISSION */}
      <section className="py-28 md:py-36">
        <div className="container grid lg:grid-cols-12 gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-5">Who We Are</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance mb-7">
              A Nigerian foundation,<br />a global standard of care.
            </h2>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-7">
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
              Tijwun Care and Empowerment Foundation advances <strong className="text-primary font-semibold">dignity, agency, resilience, and evidence</strong> through community-based programmes designed with women and girls, placing them at the centre of decisions that shape their futures.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Working from Jalingo with activities in Taraba, Adamawa and Lagos, we combine community delivery with careful monitoring and learning.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="default" size="lg">
                <Link to="/about">Our Story <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/TIJCEF_ANNUAL_REPORT_2025.pdf">Annual Report</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOUR PILLARS */}
      <section className="py-28 md:py-36 bg-muted/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full gradient-soft opacity-50" />
        <div className="container relative">
          <Reveal>
            <div className="max-w-3xl mb-20">
              <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-5">Our Four Pillars</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
                Four pillars. One purpose.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                We advance dignity, strengthen agency, build resilience, and generate evidence that transforms the lives of women and girls.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <Link to="/pillars" className="group block relative h-[420px] rounded-2xl overflow-hidden shadow-card hover:shadow-deep transition-all duration-700">
                  <img src={p.img} alt={p.title} loading="lazy" width={1200} height={900} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-primary-foreground">
                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-5">
                      <p.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl mb-3 leading-tight">{p.title}</h3>
                    <p className="text-primary-foreground/85 text-sm md:text-base leading-relaxed mb-4 max-w-md">{p.desc}</p>
                    <div className="inline-flex items-center gap-2 text-accent text-sm font-medium">
                      Explore pillar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SUPPORT */}
      <section className="py-28 md:py-36">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-5">Why Support TIJCEF</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-7 text-balance">
                Trusted. Transparent. Transformational.
              </h2>
              <p className="text-lg text-foreground/75 leading-relaxed">
                We are strengthening programme, financial and safeguarding controls because trust is the foundation of every partnership we build.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { icon: ShieldCheck, title: "CAC Registered", desc: "Fully governed Nigerian nonprofit, accountable to community and law.", to: "/transparency", action: "View registration and governance" },
                { icon: Globe2, title: "SDG Aligned", desc: "Programmes mapped to Sustainable Development Goals 3, 5, 13 & 17.", to: "/TIJCEF_ANNUAL_REPORT_2025.pdf", action: "Read the annual report", newTab: true },
                { icon: Users, title: "Community-Led", desc: "Designed with, not for, the women and girls we serve.", to: "/safeguarding", action: "Read our safeguarding commitment" },
                { icon: Award, title: "Evidence-Driven", desc: "Programme decisions are informed by monitoring, research and documented learning.", to: "/category/reports-publications", action: "View reports and publications" },
              ].map((b, i) => (
                <Reveal key={b.title} delay={i * 80}>
                  <Link
                    to={b.to}
                    target={b.newTab ? "_blank" : undefined}
                    rel={b.newTab ? "noopener noreferrer" : undefined}
                    aria-label={`${b.title}: ${b.action}`}
                    className="group block p-7 rounded-2xl bg-card border border-border shadow-card h-full hover:shadow-elegant hover:-translate-y-1 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <b.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-xl mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      {b.action}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="py-28 md:py-36 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/30 blur-3xl" />
        <div className="container relative">
          <Reveal>
            <div className="max-w-3xl mb-20">
              <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-5">Programme Snapshots</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
                Recent work, reported carefully.
              </h2>
            </div>
          </Reveal>
          {latestLoading && (
            <div className="grid gap-6 md:grid-cols-3" aria-label="Loading latest programme updates">
              {[0, 1, 2].map((item) => (
                <div key={item} className="h-80 animate-pulse rounded-2xl bg-primary-foreground/10" />
              ))}
            </div>
          )}

          {!latestLoading && latestError && (
            <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-8">
              <p className="text-primary-foreground/80">{latestError}</p>
            </div>
          )}

          {!latestLoading && !latestError && latestPosts.length === 0 && (
            <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-8">
              <p className="text-primary-foreground/80">New programme and impact stories will appear here when they are published.</p>
            </div>
          )}

          {!latestLoading && !latestError && latestPosts.length > 0 && (
            <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
              {latestPosts.map((post, i) => (
                <Reveal key={post.id} delay={i * 120}>
                  <Link
                    to={`/post/${post.slug}`}
                    aria-label={`Read ${post.title}`}
                    className="group glass flex h-full flex-col rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-primary-foreground/15 hover:shadow-deep"
                  >
                    <Quote className="mb-5 h-8 w-8 text-accent" />
                    <p className="mb-7 line-clamp-5 flex-1 font-display text-lg leading-snug lg:text-xl">
                      {post.excerpt || post.title}
                    </p>
                    <div className="flex items-center gap-3 border-t border-primary-foreground/15 pt-5">
                      <img
                        src={post.featuredImage || girlsImg}
                        alt=""
                        loading="lazy"
                        width={80}
                        height={80}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <div className="line-clamp-2 text-sm font-semibold">{post.title}</div>
                        {post.date && (
                          <div className="mt-1 text-xs text-primary-foreground/65">{formatDate(post.date)}</div>
                        )}
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-20 border-y border-border">
        <div className="container">
          <Reveal>
            <div className="text-center text-xs uppercase tracking-[0.22em] text-muted-foreground mb-10">
              In Partnership With
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-2xl mx-auto">
              {["Lead the Girl Foundation", "PSNAF"].map((p) => (
                <div key={p} className="text-center font-display text-lg text-muted-foreground/60 hover:text-primary transition-colors">
                  {p}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* DONATION CTA */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={girlsImg} alt="" loading="lazy" width={1200} height={900} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/50" />
        </div>
        <div className="container relative z-10 text-primary-foreground">
          <div className="max-w-3xl">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-5">Take Action Today</div>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] mb-8 text-balance">
                Your gift writes her next chapter.
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed mb-10 max-w-2xl">
                Support TIJCEF's Dignity, Agency, Resilience and Evidence programmes for women and girls. Donations are recorded, acknowledged and applied under organisational financial controls.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="donate" size="xl">
                  <Link to="/donate">Donate Now <ArrowRight className="w-5 h-5" /></Link>
                </Button>
                <Button asChild variant="heroOutline" size="xl">
                  <Link to="/get-involved">Other Ways to Give</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};
export default Index;