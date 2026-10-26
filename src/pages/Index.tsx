import RecentWork from "@/components/site/RecentWork";
import { Link } from "react-router-dom";
import { ArrowRight, HeartPulse, Sprout, Microscope, Sparkles, Quote, ShieldCheck, Globe2, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/site/SiteLayout";
import Counter from "@/components/site/Counter";
import Reveal from "@/components/site/Reveal";
import PageMeta from "@/components/site/PageMeta";
import heroImg from "@/assets/hero-woman.jpg";
import girlsImg from "@/assets/girls-education.jpg";
import climateImg from "@/assets/climate-action.jpg";
import aminaImg from "@/assets/amina-sale.webp";
import healthImg from "@/assets/health-dignity.jpg";
import researchImg from "@/assets/research.jpg";
import { activityStates, approvedImpact, programmeAreas } from "@/data/programmeAreas";

const pillarPresentation = {
  dignity: { icon: HeartPulse, img: healthImg, imgAlt: "Students displaying menstrual health materials during a TIJCEF school programme" },
  agency: { icon: Sparkles, img: girlsImg, imgAlt: "A TIJCEF team member speaking during a community programme" },
  resilience: { icon: Sprout, img: climateImg, imgAlt: "Participants attending a TIJCEF community training" },
  evidence: { icon: Microscope, img: researchImg, imgAlt: "TIJCEF team members and partners during a programme learning meeting" },
};

const pillars = programmeAreas.map((area) => ({
  ...area,
  ...pillarPresentation[area.slug],
}));

const stats = [
  { end: approvedImpact.cumulativeReach, suffix: "+", label: "Cumulative participant engagements" },
  { end: approvedImpact.reach2026, suffix: "+", label: "Participant engagements in 2026" },
  { end: approvedImpact.programmeAreas, suffix: "", label: "Programme areas" },
  { end: approvedImpact.statesWithActivities, suffix: "", label: "States with recorded activities" },
];

const Index = () => {
  return (
    <SiteLayout>
      <PageMeta
        title="TIJCEF — Community-Led Programmes for Women and Youth"
        description="TIJCEF works with women, girls and young people through health and WASH, education and leadership, climate resilience, and community research in Nigeria."
        includeSiteName={false}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://www.tijcef.org/#website",
          url: "https://www.tijcef.org/",
          name: "TIJCEF",
          alternateName: "Tijwun Care and Empowerment Foundation",
          publisher: { "@id": "https://www.tijcef.org/#organization" },
          inLanguage: "en-NG",
        }}
      />
      {/* HERO */}
      <section className="relative min-h-[78svh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Students participating in a TIJCEF school outreach" className="w-full h-full object-cover animate-slow-zoom" width={1855} height={848} fetchPriority="high" decoding="async" />
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
        </div>

        <div className="container relative z-10 pb-24 pt-40 text-primary-foreground">
          <div className="max-w-4xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs uppercase tracking-[0.18em] mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Community-led action · Evidence-informed delivery
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl leading-[0.95] tracking-tight mb-7 text-balance">
                Empowering women.<br />
                Uplifting youth.<br />
                <span className="italic text-accent font-light">Building resilient communities.</span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl leading-relaxed mb-10">
                TIJCEF works with women, adolescent girls and young people through health and WASH, education and leadership, climate resilience, and research that turns community evidence into action.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="donate" size="xl">
                  <Link to="/donate">Support Our Work <ArrowRight className="w-5 h-5" /></Link>
                </Button>
                <Button asChild variant="heroOutline" size="xl"><Link to="/impact">Explore Our Impact</Link></Button>
              </div>
            </Reveal>
          </div>
        </div>

      </section>
      <section className="border-b bg-muted/40 py-8" aria-label="Programme reach"><div className="container grid grid-cols-2 gap-6 lg:grid-cols-4">{stats.map(s=><div key={s.label} className="text-center"><div className="font-display text-3xl md:text-4xl text-primary"><Counter end={s.end} suffix={s.suffix}/></div><div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div></div>)}</div></section>
      <div className="container py-4 text-center text-xs text-muted-foreground">Reporting period: cumulative records and 2026 activities. Figures may include repeat participation. <Link className="underline" to="/impact">How we count and report</Link></div>
      {/* ABOUT / MISSION */}
      <section className="py-16 md:py-20">
        <div className="container grid lg:grid-cols-12 gap-16 items-center">
          <Reveal className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-5">Who We Are</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance mb-7">
              Working together for stronger communities.
            </h2>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-7">
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
              Tijwun Care and Empowerment Foundation advances <strong className="text-primary font-semibold">health and dignity, education and leadership, climate resilience, and community research</strong> with women, adolescent girls and young people at the centre of programme decisions.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Working from Jalingo with recorded activities in {activityStates.join(", ")}, we combine community delivery with monitoring, safeguarding, learning and public accountability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="default" size="lg">
                <Link to="/about">Our Story <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/TIJCEF_ANNUAL_REPORT_2025.pdf">Annual Report</a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link to="/impact">Explore Our Impact</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOUR PROGRAMME AREAS */}
      <section className="py-16 md:py-20 bg-muted/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full gradient-soft opacity-50" />
        <div className="container relative">
          <Reveal>
            <div className="max-w-3xl mb-10">
              <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-5">Our Four Programme Areas</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
                Clear programmes. One accountable mission.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Our four pillars guide practical support for women, girls and young people.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <Link to={`/pillars#${p.slug}`} className="group block relative min-h-[340px] rounded-2xl overflow-hidden shadow-card hover:shadow-deep transition-all duration-700">
                  <img src={p.img} alt={p.imgAlt} loading="lazy" width={1200} height={900} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-primary-foreground">
                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-5">
                      <p.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{p.title}</div>
                    <h3 className="font-display text-2xl md:text-3xl mb-3 leading-tight">{p.name}</h3>
                    <p className="text-primary-foreground/85 text-sm md:text-base leading-relaxed mb-4 max-w-md">{p.shortDescription}</p>
                    <div className="inline-flex items-center gap-2 text-accent text-sm font-medium">
                      Explore programme area <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16" aria-labelledby="featured-project"><div className="rounded-2xl bg-muted p-8 md:p-12"><p className="text-xs uppercase tracking-widest text-primary">Ongoing work · Across TIJCEF programmes</p><h2 id="featured-project" className="my-4 text-3xl md:text-4xl">Turning community evidence into action</h2><p className="max-w-2xl text-muted-foreground">Our research, monitoring and learning programme brings community feedback and programme records into planning. Partner with us on research, geospatial analysis and practical learning tools.</p><div className="mt-6 flex flex-wrap gap-4"><Button asChild><Link to="/programs?status=Ongoing">Explore ongoing work</Link></Button><Button asChild variant="outline"><Link to="/get-involved#partner">Discuss a partnership</Link></Button></div></div></section>
      {/* STORIES */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/30 blur-3xl" />
        <div className="container relative">
          <Reveal>
            <div className="max-w-3xl mb-10">
              <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-5">Latest TIJCEF Updates</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
                Latest from our communities
              </h2>
            </div>
          </Reveal>
          <RecentWork />
        </div>
      </section>

      {/* WHY SUPPORT */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-5">For Funders and Partners</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-7 text-balance">
                Why partner with TIJCEF?
              </h2>
              <p className="text-lg text-foreground/75 leading-relaxed">
                TIJCEF makes its programme evidence, governance commitments, safeguarding standards and reporting approach visible so prospective partners can conduct proportionate due diligence.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { icon: ShieldCheck, title: "Legal & Governance", to: "/transparency", desc: "A registered Nigerian nonprofit with named programme, finance, operations and safeguarding responsibilities." },
                { icon: Globe2, title: "SDG & Local Alignment", to: "/pillars", desc: "Programme areas are mapped to relevant SDGs and grounded in documented community priorities." },
                { icon: Users, title: "Safeguarding & Participation", to: "/safeguarding", desc: "Consent, responsible storytelling and community participation are built into programme delivery." },
                { icon: Award, title: "Evidence & Reporting", to: "/impact", desc: "Reach figures are distinguished from outcomes, reviewed against programme records and reported with context." },
              ].map((b, i) => (
                <Reveal key={b.title} delay={i * 80}>
                  <Link to={b.to} aria-label={`Read ${b.title}`} className="block p-7 rounded-2xl bg-card border border-border shadow-card h-full hover:shadow-elegant hover:-translate-y-1 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <b.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-xl mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12"><div className="rounded-2xl border p-8"><h2 className="text-3xl">Meet the people behind the programmes</h2><p className="mt-3 max-w-2xl text-muted-foreground">Explore our Faces of Empowerment collection and the community experiences behind our work.</p><Link className="mt-4 inline-block font-semibold text-primary underline" to="/resources/faces-of-empowerment-2025">Read community stories</Link></div></section>
      {/* PARTNERS */}
      <section className="py-20 border-y border-border">
        <div className="container">
          <Reveal>
            <div className="text-center text-xs uppercase tracking-[0.22em] text-muted-foreground mb-10">
              Programme collaborations
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-2xl mx-auto">
              {["Lead the Girl Foundation", "PSNAF"].map((p) => (
                <div key={p} className="text-center font-display text-lg text-muted-foreground/60 hover:text-primary transition-colors">
                  {p}<p className="mt-2 text-sm text-muted-foreground">{p === "Lead the Girl Foundation" ? "Collaborated on menstrual health and confidence-building outreach at Adroit International Academy, Yola." : "Contact our team for information about this collaboration."}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* DONATION CTA */}
      <section className="py-16 md:py-20 relative overflow-hidden">
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
                Support approved programmes in health and WASH, education and leadership, climate resilience, or research and advocacy. Donations are verified, recorded and managed under TIJCEF's published donor commitments.
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
