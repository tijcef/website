import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import { ArrowRight, CalendarDays, CheckCircle2, ExternalLink, Search, ShieldCheck, Sparkles } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";
import PageMeta from "@/components/site/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getGrants, type Grant } from "@/lib/wordpress";

const nav = [["/grants", "Overview"], ["/grants/opportunities", "Opportunities"], ["/grants/membership", "Membership"], ["/grants/about", "About"]];
const opportunityLabels: Record<string, string> = {
  all: "All Opportunities",
  grant: "Grants",
  scholarship: "Scholarships",
  fellowship: "Fellowships",
  job: "Jobs",
  internship: "Internships",
};

function Shell({ children }: { children: React.ReactNode }) {
  return <SiteLayout><div className="pt-24"><div className="border-b bg-white/90"><div className="container flex gap-1 overflow-x-auto py-3">{nav.map(([to, label]) => <NavLink key={to} to={to} end={to === "/grants"} className={({ isActive }) => `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${isActive ? "bg-secondary text-white" : "text-muted-foreground hover:bg-muted"}`}>{label}</NavLink>)}</div></div>{children}</div></SiteLayout>;
}

function Overview() {
  return <><PageMeta title="TIJCEF Grant Hub" description="A transparent grant discovery and readiness platform for Nigerian nonprofits, researchers and community organisations." /><section className="bg-secondary text-white"><div className="container grid gap-12 py-20 lg:grid-cols-2 lg:items-center"><div><div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest"><ShieldCheck className="h-4 w-4" /> Responsible opportunity discovery</div><h1 className="mt-5 text-5xl leading-tight md:text-7xl">Funding intelligence without the noise.</h1><p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">Discover reviewed opportunities, understand eligibility and strengthen your organisation before you apply.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="gold" size="lg"><Link to="/grants/opportunities">Browse opportunities</Link></Button><Button asChild size="lg" className="border border-white/25 bg-white/10"><Link to="/grants/membership">Membership</Link></Button></div></div><div className="grid gap-4 sm:grid-cols-2">{[["Reviewed", "Source and deadline checks"], ["Transparent", "Direct funder links"], ["Practical", "Readiness guidance"], ["Nigeria-first", "Locally relevant filters"]].map(([value, label]) => <div key={value} className="rounded-2xl border border-white/15 bg-white/10 p-6"><div className="font-display text-2xl">{value}</div><div className="mt-2 text-sm text-white/65">{label}</div></div>)}</div></div></section><section className="container py-20"><div className="grid gap-6 md:grid-cols-3">{[[Search,"Discover","Search opportunities relevant to your mission, geography and stage."],[CheckCircle2,"Check","Review eligibility, deadlines and source links before investing time."],[Sparkles,"Prepare","Use readiness guidance to improve stronger, compliant applications."]].map(([Icon,title,body]: any)=><article key={title} className="rounded-2xl border bg-card p-7 shadow-card"><Icon className="h-7 w-7 text-secondary"/><h2 className="mt-5 text-2xl">{title}</h2><p className="mt-3 text-muted-foreground">{body}</p></article>)}</div></section></>;
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
  return <section className="container py-14"><PageMeta title={`${heading} | TIJCEF Grant Hub`} description={`Search reviewed ${heading.toLowerCase()} from the TIJCEF Grant Hub.`} /><div className="max-w-3xl"><div className="text-xs font-bold uppercase tracking-widest text-secondary">Opportunity directory</div><h1 className="mt-3 text-5xl">{heading}</h1><p className="mt-4 text-muted-foreground">Always confirm requirements and deadlines on the funder's official page before applying.</p></div><div className="mt-8 flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/><Input value={query} onChange={(e)=>setQuery(e.target.value)} className="pl-9" placeholder={`Search ${heading.toLowerCase()}`}/></div><select value={sector} onChange={(e)=>setSector(e.target.value)} className="h-10 rounded-md border bg-background px-3">{sectors.map((s)=><option key={s}>{s}</option>)}</select></div>{loading && <p className="mt-10">Loading current opportunities…</p>}{error && <div className="mt-10 rounded-xl border border-accent bg-accent-soft p-5"><strong>Grant service not connected.</strong><p className="mt-1 text-sm">Set VITE_WORDPRESS_URL and activate the included TIJCEF Core plugin in WordPress. No invented opportunities are displayed.</p></div>}<div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((grant)=><article key={grant.id} className="flex flex-col rounded-2xl border bg-card p-6 shadow-card"><div className="flex items-center justify-between gap-3"><div className="flex flex-wrap gap-2"><span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{opportunityLabels[grant.opportunityType] || "Grant"}</span><span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{grant.sector}</span></div>{grant.verified && <span className="flex items-center gap-1 text-xs font-semibold text-primary"><ShieldCheck className="h-4 w-4"/>Reviewed</span>}</div><h2 className="mt-5 text-2xl">{grant.title}</h2><p className="mt-2 text-sm font-semibold text-muted-foreground">{grant.funder}</p><p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted-foreground">{grant.description}</p><div className="mt-auto pt-6"><div className="flex items-center gap-2 text-sm"><CalendarDays className="h-4 w-4"/>{grant.deadline || "Rolling / confirm with funder"}</div><Button asChild variant="outline" className="mt-4 w-full"><Link to={`/grants/opportunities/${grant.slug}`}>View details <ArrowRight className="ml-2 h-4 w-4"/></Link></Button></div></article>)}</div>{!loading && !error && filtered.length===0 && <p className="mt-10 rounded-xl border border-dashed p-10 text-center text-muted-foreground">No current {heading.toLowerCase()} match this search.</p>}</section>;
}

function Detail() {
  const { slug } = useParams();
  const { grants, loading, error } = useGrantData();
  const grant = grants.find((g) => g.slug === slug);
  if (loading) return <section className="container py-16">Loading opportunity…</section>;
  if (error || !grant) return <section className="container py-16"><h1 className="text-4xl">Opportunity unavailable</h1><p className="mt-3 text-muted-foreground">It may have closed or been removed during verification.</p><Button asChild className="mt-6"><Link to="/grants/opportunities">Return to opportunities</Link></Button></section>;
  return <article className="container max-w-4xl py-14"><PageMeta title={grant.title} description={grant.description.slice(0,155)}/><span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{grant.sector}</span><h1 className="mt-5 text-5xl">{grant.title}</h1><p className="mt-3 text-lg text-muted-foreground">{grant.funder}</p><div className="mt-8 grid gap-4 rounded-2xl border bg-card p-6 sm:grid-cols-3"><div><div className="text-xs uppercase text-muted-foreground">Deadline</div><div className="mt-1 font-semibold">{grant.deadline || "Confirm with funder"}</div></div><div><div className="text-xs uppercase text-muted-foreground">Funding</div><div className="mt-1 font-semibold">{grant.amount}</div></div><div><div className="text-xs uppercase text-muted-foreground">Geography</div><div className="mt-1 font-semibold">{grant.country}</div></div></div><p className="mt-8 whitespace-pre-line text-lg leading-relaxed">{grant.description}</p>{grant.applicationUrl && <Button asChild size="lg" className="mt-8"><a href={grant.applicationUrl} target="_blank" rel="noopener noreferrer">Visit official funder page <ExternalLink className="ml-2 h-4 w-4"/></a></Button>}<p className="mt-5 text-xs text-muted-foreground">TIJCEF does not charge application fees and does not guarantee funding. Verify all details with the funder.</p></article>;
}

function Membership() { return <section className="container py-16"><PageMeta title="Grant Hub Access" description="Learn how organisations can use TIJCEF Grant Hub responsibly."/><div className="max-w-3xl"><h1 className="text-5xl">Public access, responsible guidance</h1><p className="mt-5 text-lg text-muted-foreground">Opportunity browsing is public. TIJCEF may announce separate readiness clinics or capacity-development activities only after their scope, eligibility and costs have been formally approved.</p><Button asChild className="mt-8"><Link to="/contact">Contact the grants team</Link></Button></div></section>; }
function About() { return <section className="container py-16"><PageMeta title="About the Grant Hub" description="How TIJCEF reviews and publishes funding opportunities."/><div className="max-w-3xl"><h1 className="text-5xl">Built for trust</h1><p className="mt-5 text-lg leading-relaxed text-muted-foreground">TIJCEF Grant Hub helps Nigerian nonprofits, researchers and community organisations discover opportunities and improve readiness. Listings should include a direct source, review date and transparent verification status. We are not a funder unless a listing explicitly states otherwise.</p></div></section>; }

export default function GrantHub() { return <Shell><Routes><Route index element={<Overview/>}/><Route path="opportunities" element={<Opportunities/>}/><Route path="grants" element={<Opportunities opportunityType="grant"/>}/><Route path="scholarships" element={<Opportunities opportunityType="scholarship"/>}/><Route path="fellowships" element={<Opportunities opportunityType="fellowship"/>}/><Route path="jobs" element={<Opportunities opportunityType="job"/>}/><Route path="internships" element={<Opportunities opportunityType="internship"/>}/><Route path="opportunities/:slug" element={<Detail/>}/><Route path="membership" element={<Membership/>}/><Route path="about" element={<About/>}/><Route path="*" element={<Overview/>}/></Routes></Shell>; }
