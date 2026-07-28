import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { BarChart3, Building2, Database, Globe2, MapPinned, Send, ShieldCheck } from "lucide-react";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import SiteLayout from "@/components/site/SiteLayout";
import PageMeta from "@/components/site/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TGISMap, type MapReport } from "@/features/tgis/tgis-map";
import { getReports, submitPublicForm, type TgisReport } from "@/lib/wordpress";

const nav = [
  ["/tgis", "Overview"],
  ["/tgis/map", "Live map"],
  ["/tgis/insights", "Insights"],
  ["/tgis/organizations", "Partners"],
  ["/tgis/submit-report", "Submit report"],
];

function TgisShell({ children }: { children: React.ReactNode }) {
  return (
    <SiteLayout>
      <div className="pt-24">
        <div className="border-b bg-white/90">
          <div className="container flex gap-1 overflow-x-auto py-3">
            {nav.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === "/tgis"} className={({ isActive }) => `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${isActive ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted"}`}>
                {label}
              </NavLink>
            ))}
          </div>
        </div>
        {children}
      </div>
    </SiteLayout>
  );
}

function Overview() {
  return (
    <>
      <PageMeta title="TGIS Geospatial Intelligence" description="TIJCEF's community-centred geospatial intelligence platform for climate, health and development action in Nigeria." />
      <section className="gradient-primary text-white">
        <div className="container grid gap-12 py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest"><Globe2 className="h-4 w-4" /> TIJCEF Geospatial Intelligence System</div>
            <h1 className="text-balance text-5xl font-semibold leading-tight md:text-7xl">Location intelligence for communities that need to be seen.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">TGIS turns community observations into responsible, actionable evidence for climate resilience, public health and equitable development.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Button asChild variant="gold" size="lg"><Link to="/tgis/map">Explore the map</Link></Button><Button asChild size="lg" className="border border-white/25 bg-white/10 hover:bg-white/20"><Link to="/tgis/submit-report">Submit verified data</Link></Button></div>
          </div>
          <div className="glass rounded-3xl p-6 shadow-deep">
            <div className="grid grid-cols-2 gap-4">
              {[["Community-led", "Reporting"], ["Privacy-first", "Safeguards"], ["Open", "Evidence"], ["Nigeria", "Focused"]].map(([value, label]) => <div key={label} className="rounded-2xl bg-white/10 p-5"><div className="font-display text-2xl">{value}</div><div className="mt-1 text-sm text-white/65">{label}</div></div>)}
            </div>
          </div>
        </div>
      </section>
      <section className="container py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            [MapPinned, "Map local realities", "Document environmental, health and development observations with geographic context."],
            [Database, "Build trusted evidence", "Review, classify and publish community data with clear verification status."],
            [BarChart3, "Inform better action", "Turn field evidence into insights for programmes, research and partnerships."],
          ].map(([Icon, title, body]: any) => <article key={title} className="rounded-2xl border bg-card p-7 shadow-card"><Icon className="h-7 w-7 text-primary" /><h2 className="mt-5 text-2xl">{title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{body}</p></article>)}
        </div>
      </section>
    </>
  );
}

function MapPage() {
  const [reports, setReports] = useState<TgisReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    getReports().then(setReports).catch(() => setNotice("The verified map data service is temporarily unavailable. No demonstration locations are being shown.")).finally(() => setLoading(false));
  }, []);
  const mapped: MapReport[] = reports.map((r) => ({ ...r, id: String(r.id), description: r.description || null }));
  return <section className="container py-12"><PageMeta title="TGIS Map" description="Explore verified community and programme observations through the TIJCEF geospatial map." /><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><div className="text-xs font-bold uppercase tracking-widest text-primary">Geospatial explorer</div><h1 className="mt-2 text-4xl">Community evidence map</h1><p className="mt-2 text-muted-foreground">{loading ? "Loading verified observations…" : `${mapped.length} verified mapped observations`}</p></div><Button asChild><Link to="/tgis/submit-report"><Send className="mr-2 h-4 w-4" />Submit report</Link></Button></div>{notice && <div className="mb-4 rounded-lg border border-accent bg-accent-soft p-3 text-sm">{notice}</div>}{!loading && !notice && mapped.length === 0 ? <div className="grid min-h-[420px] place-items-center rounded-2xl border border-dashed bg-muted/30 p-8 text-center"><div><MapPinned className="mx-auto h-9 w-9 text-primary" /><h2 className="mt-4 text-2xl">No public observations yet</h2><p className="mt-2 max-w-md text-muted-foreground">Verified observations will appear after safeguarding and data-quality review.</p></div></div> : <div className="h-[65vh] min-h-[480px] overflow-hidden rounded-2xl border bg-muted shadow-card"><TGISMap reports={mapped} className="h-full w-full" /></div>}<p className="mt-3 text-xs text-muted-foreground">Public locations may be generalized to protect vulnerable people and sensitive sites.</p></section>;
}

function Insights() {
  return <section className="container py-16"><PageMeta title="TGIS Insights" description="Responsible geospatial insight from TIJCEF programmes and verified community reporting." /><div className="max-w-3xl"><div className="text-xs font-bold uppercase tracking-widest text-primary">Evidence to action</div><h1 className="mt-3 text-5xl">Insights grounded in verified field data</h1><p className="mt-5 text-lg leading-relaxed text-muted-foreground">This section will publish reviewed thematic briefs across health, gender, climate and research. No unverified community submission is presented as an official finding.</p></div><div className="mt-12 grid gap-6 md:grid-cols-3">{["Climate resilience", "Health access", "Community development"].map((title) => <article key={title} className="rounded-2xl border bg-card p-7"><ShieldCheck className="h-6 w-6 text-primary" /><h2 className="mt-4 text-2xl">{title}</h2><p className="mt-2 text-muted-foreground">Reviewed indicators, methods and programme learning will appear here as datasets are approved.</p></article>)}</div></section>;
}

function Organizations() {
  return <section className="container py-16"><PageMeta title="TGIS Partners" description="Partner with TIJCEF to strengthen responsible community geospatial intelligence." /><Building2 className="h-9 w-9 text-primary" /><h1 className="mt-5 max-w-3xl text-5xl">Build better evidence with TIJCEF</h1><p className="mt-5 max-w-2xl text-lg text-muted-foreground">We welcome responsible collaboration with communities, universities, civil-society organisations, government institutions and development partners.</p><Button asChild className="mt-8"><Link to="/contact">Discuss a partnership</Link></Button></section>;
}

function SubmitReport() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setStatus("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try { await submitPublicForm("reports", data); setStatus("Thank you. Your report was received for safeguarding and verification review."); form.reset(); }
    catch (error) { setStatus(error instanceof Error ? error.message : "Submission failed."); }
    finally { setBusy(false); }
  }
  return <section className="container py-14"><PageMeta title="Submit a TGIS Report" description="Submit a community observation to TIJCEF for safeguarding and verification review." /><div className="mx-auto max-w-2xl"><div className="text-xs font-bold uppercase tracking-widest text-primary">Community reporting</div><h1 className="mt-3 text-5xl">Submit an observation</h1><p className="mt-4 text-muted-foreground">Do not submit names, exact locations or photographs that could expose a child or vulnerable person. Every submission is reviewed before publication.</p><form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl border bg-card p-7 shadow-card"><input name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true"/><label className="block text-sm font-semibold">Report title<Input name="title" required maxLength={160} className="mt-2" /></label><label className="block text-sm font-semibold">Description<Textarea name="description" required maxLength={3000} className="mt-2 min-h-32" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-semibold">Category<select name="category" className="mt-2 h-10 w-full rounded-md border bg-background px-3"><option>Climate</option><option>Health</option><option>Gender</option><option>Infrastructure</option><option>Community development</option></select></label><label className="block text-sm font-semibold">State<Input name="state" required className="mt-2" /></label></div><label className="block text-sm font-semibold">Contact email<Input name="email" type="email" required className="mt-2" /></label><label className="flex gap-3 text-sm text-muted-foreground"><input type="checkbox" required className="mt-1" />I confirm that this report is accurate to the best of my knowledge and contains no identifying information about vulnerable people.</label><Button type="submit" disabled={busy}>{busy ? "Submitting…" : "Submit for review"}</Button>{status && <p role="status" className="rounded-lg bg-muted p-3 text-sm">{status}</p>}</form></div></section>;
}

export default function TGIS() {
  return <TgisShell><Routes><Route index element={<Overview />} /><Route path="map" element={<MapPage />} /><Route path="insights" element={<Insights />} /><Route path="organizations" element={<Organizations />} /><Route path="submit-report" element={<SubmitReport />} /><Route path="*" element={<Overview />} /></Routes></TgisShell>;
}
