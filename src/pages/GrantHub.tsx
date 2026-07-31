import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import { ArrowRight, CalendarDays, CheckCircle2, ExternalLink, Search, ShieldCheck, Sparkles } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";
import PageMeta from "@/components/site/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getGrantBySlug, getGrants, type Grant } from "@/lib/wordpress";

const nav = [
  ["/grants", "Overview"],
  ["/grants/opportunities", "All Opportunities"],
  ["/grants/grants", "Grants"],
  ["/grants/scholarships", "Scholarships"],
  ["/grants/fellowships", "Fellowships"],
  ["/grants/jobs", "Jobs"],
  ["/grants/internships", "Internships"],
  ["/grants/membership", "Membership"],
  ["/grants/about", "About"],
];
const opportunityLabels: Record<string, string> = {
  all: "All Opportunities",
  grant: "Grants",
  scholarship: "Scholarships",
  fellowship: "Fellowships",
  job: "Jobs",
  internship: "Internships",
};

const opportunitySingularLabels: Record<string, string> = {
  grant: "Grant",
  scholarship: "Scholarship",
  fellowship: "Fellowship",
  job: "Job",
  internship: "Internship",
};

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

function Shell({ children }: { children: React.ReactNode }) {
  return <SiteLayout><div className="pt-24"><div className="border-b bg-white/90"><div className="container flex gap-1 overflow-x-auto py-3">{nav.map(([to, label]) => <NavLink key={to} to={to} end={to === "/grants"} className={({ isActive }) => `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${isActive ? "bg-secondary text-white" : "text-muted-foreground hover:bg-muted"}`}>{label}</NavLink>)}</div></div>{children}</div></SiteLayout>;
}

function Overview() {
  const hubLinks = [
    ["/grants/opportunities", "All Opportunities", "Browse every current opportunity published in the hub."],
    ["/grants/grants", "Grants", "Find funding opportunities for nonprofits and community projects."],
    ["/grants/scholarships", "Scholarships", "Explore education and study-funding opportunities."],
    ["/grants/fellowships", "Fellowships", "Discover leadership, professional and research programmes."],
    ["/grants/jobs", "Jobs", "View current employment opportunities from trusted sources."],
    ["/grants/internships", "Internships", "Find practical learning and early-career opportunities."],
  ];

  return (
    <>
      <PageMeta
        title="TIJCEF Grant Hub"
        description="A transparent grant discovery and readiness platform for Nigerian nonprofits, researchers and community organisations."
      />

      <section className="bg-secondary text-white">
        <div className="container grid gap-12 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="h-4 w-4" /> TIJCEF Grant Hub
            </div>
            <h1 className="mt-5 text-5xl leading-tight md:text-7xl">
              Funding opportunities without the noise.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Discover grants, scholarships, fellowships, jobs and internships relevant to Nigerians and Nigerian organisations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <Link to="/grants/opportunities">Browse all opportunities</Link>
              </Button>
              <Button asChild size="lg" className="border border-white/25 bg-white/10">
                <Link to="/grants/about">How the hub works</Link>
              </Button>
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-2xl text-white">Explore the Grant Hub</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {hubLinks.map(([to, title, description]) => (
                <Link
                  key={to}
                  to={to}
                  className="group rounded-2xl border border-white/15 bg-white/10 p-6 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/15"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-display text-2xl">{title}</div>
                    <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-white/70">{description}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            [Search, "Discover", "Search opportunities relevant to your mission, geography and stage."],
            [CheckCircle2, "Check", "Review eligibility, deadlines and source links before investing time."],
            [Sparkles, "Prepare", "Use readiness guidance to build stronger, compliant applications."],
          ].map(([Icon, title, body]: any) => (
            <article key={title} className="rounded-2xl border bg-card p-7 shadow-card">
              <Icon className="h-7 w-7 text-secondary" />
              <h2 className="mt-5 text-2xl">{title}</h2>
              <p className="mt-3 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function useGrantData() {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { getGrants().then(setGrants).catch((e) => setError(e.message)).finally(() => setLoading(false)); }, []);
  return { grants, loading, error };
}

function Opportunities({ opportunityType = "all" }: { opportunityType?: string }) {
  const { grants, loading, error } = useGrantData();
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("All");
  const sectors = useMemo(() => ["All", ...Array.from(new Set(grants.map((g) => g.sector)))], [grants]);
  const filtered = grants.filter(
    (g) =>
      (opportunityType === "all" || g.opportunityType === opportunityType) &&
      (sector === "All" || g.sector === sector) &&
      `${g.title} ${g.funder} ${g.description}`.toLowerCase().includes(query.toLowerCase())
  );
  const heading = opportunityLabels[opportunityType] || "Opportunities";
  return (
    <section className="container py-14">
      <PageMeta
        title={`${heading} | TIJCEF Grant Hub`}
        description={`Search reviewed ${heading.toLowerCase()} from the TIJCEF Grant Hub.`}
      />
      <div className="max-w-3xl">
        <div className="text-xs font-bold uppercase tracking-widest text-secondary">Opportunity directory</div>
        <h1 className="mt-3 text-5xl">{heading}</h1>
        <p className="mt-4 text-muted-foreground">
          Open each listing for complete eligibility, funding details and the official application link.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-9"
            placeholder={`Search ${heading.toLowerCase()}`}
          />
        </div>
        <select
          value={sector}
          onChange={(event) => setSector(event.target.value)}
          className="h-10 rounded-md border bg-background px-3"
          aria-label="Filter by sector"
        >
          {sectors.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>

      {loading && <p className="mt-10">Loading current opportunities…</p>}
      {error && (
        <div className="mt-10 rounded-xl border border-accent bg-accent-soft p-5">
          <strong>Opportunity service is temporarily unavailable.</strong>
          <p className="mt-1 text-sm">Please try again shortly.</p>
        </div>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((grant) => (
          <article
            key={grant.id}
            className="group flex overflow-hidden rounded-2xl border bg-card shadow-card transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="flex w-full flex-col">
              <Link
                to={`/grants/opportunities/${grant.slug}`}
                className="block aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary to-secondary"
                aria-label={`Read ${grant.title}`}
              >
                {grant.featuredImage && (
                  <img
                    src={grant.featuredImage}
                    alt={grant.featuredImageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                      {opportunitySingularLabels[grant.opportunityType] || "Opportunity"}
                    </span>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                      {grant.sector}
                    </span>
                  </div>
                  {grant.verified && (
                    <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-primary">
                      <ShieldCheck className="h-4 w-4" /> Reviewed
                    </span>
                  )}
                </div>
                <h2 className="mt-5 text-2xl leading-tight">
                  <Link
                    to={`/grants/opportunities/${grant.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {grant.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm font-semibold text-muted-foreground">{grant.funder}</p>
                {grant.description && (
                  <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                    {grant.description}
                  </p>
                )}
                <div className="mt-auto pt-6">
                  <div className="grid gap-3 rounded-xl bg-muted/60 p-4 text-sm sm:grid-cols-2">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">Deadline</div>
                      <div className="mt-1 font-semibold">{grant.deadline || "Confirm with funder"}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">Funding</div>
                      <div className="mt-1 font-semibold">{grant.amount}</div>
                    </div>
                  </div>
                  <Button asChild className="mt-4 w-full">
                    <Link to={`/grants/opportunities/${grant.slug}`}>
                      Read full opportunity <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  {grant.applicationUrl && (
                    <a
                      href={grant.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      Official application page <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!loading && !error && filtered.length === 0 && (
        <p className="mt-10 rounded-xl border border-dashed p-10 text-center text-muted-foreground">
          No current {heading.toLowerCase()} match this search.
        </p>
      )}
    </section>
  );
}

function Detail() {
  const { slug } = useParams();
  const [grant, setGrant] = useState<Grant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getGrantBySlug(slug || "")
      .then((result) => {
        if (!active) return;
        if (!result) {
          setError("This opportunity may have closed or been removed.");
          return;
        }
        setGrant(result);
      })
      .catch((reason) => {
        if (active) {
          setError(reason instanceof Error ? reason.message : "This opportunity is unavailable.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <section className="container min-h-[60vh] py-16" aria-label="Loading opportunity">
        <div className="h-5 w-40 animate-pulse rounded bg-muted" />
        <div className="mt-6 h-16 max-w-3xl animate-pulse rounded bg-muted" />
        <div className="mt-10 aspect-[16/8] animate-pulse rounded-2xl bg-muted" />
      </section>
    );
  }

  if (error || !grant) {
    return (
      <section className="container min-h-[60vh] py-16">
        <h1 className="text-4xl">Opportunity unavailable</h1>
        <p className="mt-3 text-muted-foreground">{error}</p>
        <Button asChild className="mt-6">
          <Link to="/grants/opportunities">Return to opportunities</Link>
        </Button>
      </section>
    );
  }

  return (
    <article className="pb-20">
      <PageMeta
        title={grant.title}
        description={grant.description.slice(0, 155)}
        image={grant.featuredImage || undefined}
      />
      <header className="container max-w-5xl py-14">
        <Link
          to="/grants/opportunities"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          ← All opportunities
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
            {opportunitySingularLabels[grant.opportunityType] || "Opportunity"}
          </span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{grant.sector}</span>
          {grant.verified && (
            <span className="flex items-center gap-1 text-xs font-semibold text-primary">
              <ShieldCheck className="h-4 w-4" /> Reviewed against the official source
            </span>
          )}
        </div>
        <h1 className="mt-5 text-5xl leading-tight md:text-7xl">{grant.title}</h1>
        <p className="mt-4 text-lg font-semibold text-muted-foreground">{grant.funder}</p>
        {grant.excerpt && (
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">{grant.excerpt}</p>
        )}
        {grant.date && (
          <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" /> Published {formatDate(grant.date)}
          </div>
        )}
      </header>

      {grant.featuredImage ? (
        <div className="container max-w-6xl">
          <img
            src={grant.featuredImage}
            alt={grant.featuredImageAlt}
            className="max-h-[680px] w-full rounded-2xl object-cover shadow-elegant"
          />
        </div>
      ) : (
        <div className="container max-w-6xl">
          <div className="aspect-[16/7] rounded-2xl bg-gradient-to-br from-primary to-secondary" />
        </div>
      )}

      <div className="container mt-10 max-w-4xl">
        <div className="grid gap-5 rounded-2xl border bg-card p-6 shadow-card sm:grid-cols-3">
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Deadline</div>
            <div className="mt-1 font-semibold">{grant.deadline || "Confirm with funder"}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Funding or benefit</div>
            <div className="mt-1 font-semibold">{grant.amount}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Eligibility geography</div>
            <div className="mt-1 font-semibold">{grant.country}</div>
          </div>
          {grant.applicationUrl && (
            <div className="border-t pt-5 sm:col-span-3">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href={grant.applicationUrl} target="_blank" rel="noopener noreferrer">
                  Apply on the official website <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <a
                href={grant.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block break-all text-xs text-primary underline underline-offset-2"
              >
                {grant.applicationUrl}
              </a>
            </div>
          )}
        </div>
      </div>

      {grant.content ? (
        <div
          className="wp-content prose prose-lg mx-auto mt-12 max-w-3xl px-6 prose-headings:font-display prose-a:text-primary prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: grant.content }}
        />
      ) : (
        <p className="mx-auto mt-12 max-w-3xl whitespace-pre-line px-6 text-lg leading-relaxed">
          {grant.description}
        </p>
      )}

      <aside className="container mt-12 max-w-4xl rounded-2xl bg-secondary p-8 text-white">
        <h2 className="text-3xl">Ready to apply?</h2>
        <p className="mt-3 max-w-2xl text-white/75">
          Read the eligibility requirements carefully and submit only through the funder’s official website.
        </p>
        {grant.applicationUrl && (
          <Button asChild variant="gold" size="lg" className="mt-6">
            <a href={grant.applicationUrl} target="_blank" rel="noopener noreferrer">
              Open official application <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
        <p className="mt-5 text-xs text-white/65">
          TIJCEF does not charge application fees and does not guarantee funding.
        </p>
      </aside>
    </article>
  );
}

function Membership() { return <section className="container py-16"><PageMeta title="Grant Hub Access" description="Learn how organisations can use TIJCEF Grant Hub responsibly."/><div className="max-w-3xl"><h1 className="text-5xl">Public access, responsible guidance</h1><p className="mt-5 text-lg text-muted-foreground">Opportunity browsing is public. TIJCEF may announce separate readiness clinics or capacity-development activities only after their scope, eligibility and costs have been formally approved.</p><Button asChild className="mt-8"><Link to="/contact">Contact the grants team</Link></Button></div></section>; }
function About() { return <section className="container py-16"><PageMeta title="About the Grant Hub" description="How TIJCEF reviews and publishes funding opportunities."/><div className="max-w-3xl"><h1 className="text-5xl">Built for trust</h1><p className="mt-5 text-lg leading-relaxed text-muted-foreground">TIJCEF Grant Hub helps Nigerian nonprofits, researchers and community organisations discover opportunities and improve readiness. Listings should include a direct source, review date and transparent verification status. We are not a funder unless a listing explicitly states otherwise.</p></div></section>; }

export default function GrantHub() { return <Shell><Routes><Route index element={<Overview/>}/><Route path="opportunities" element={<Opportunities/>}/><Route path="grants" element={<Opportunities opportunityType="grant"/>}/><Route path="scholarships" element={<Opportunities opportunityType="scholarship"/>}/><Route path="fellowships" element={<Opportunities opportunityType="fellowship"/>}/><Route path="jobs" element={<Opportunities opportunityType="job"/>}/><Route path="internships" element={<Opportunities opportunityType="internship"/>}/><Route path="opportunities/:slug" element={<Detail/>}/><Route path="membership" element={<Membership/>}/><Route path="about" element={<About/>}/><Route path="*" element={<Overview/>}/></Routes></Shell>; }