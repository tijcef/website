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
  { end: approvedImpact.cumulativeReach, suffix: "+", label: "Cumulative people reached" },
  { end: approvedImpact.reach2026, suffix: "+", label: "People reached in 2026" },
  { end: approvedImpact.programmeAreas, suffix: "", label: "Programme areas" },
  { end: approvedImpact.statesWithActivities, suffix: "", label: "States with recorded activities" },
];

const stories = [
  { quote: "Menstrual health education and dignity support were delivered at Government Girls College, Yola, engaging approximately 400 girls.", name: "Menstrual Health Outreach", role: "Yola · February 2026", img: girlsImg, imgAlt: "A TIJCEF team member speaking during a community programme" },
  { quote: "Entrepreneurial skills and self-reliance training were delivered to 50 young people at Zion Centre in Girei LGA.", name: "Youth Empowerment Seminar", role: "Adamawa · 2026", img: aminaImg, imgAlt: "A TIJCEF programme participant" },
  { quote: "TIJCEF's programme records report more than 1,200 people reached during 2026 across its community activities.", name: "2026 Programme Update", role: "Subject to annual reporting review", img: healthImg, imgAlt: "Students displaying menstrual health materials during a TIJCEF school programme" },
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
      <section className="relative min-h-screen flex items-end overflow-hidden">
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
              <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight mb-7 text-balance">
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
              Community delivery backed<br />by evidence and accountability.
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
      <section className="py-28 md:py-36 bg-muted/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full gradient-soft opacity-50" />
        <div className="container relative">
          <Reveal>
            <div className="max-w-3xl mb-20">
              <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-5">Our Four Programme Areas</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
                Clear programmes. One accountable mission.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                The Dignity, Agency, Resilience and Evidence framework is paired with plain-language programme areas so communities and partners can see exactly what TIJCEF does.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <Link to={`/pillars#${p.slug}`} className="group block relative h-[420px] rounded-2xl overflow-hidden shadow-card hover:shadow-deep transition-all duration-700">
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

      {/* WHY SUPPORT */}
      <section className="py-28 md:py-36">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-5">For Funders and Partners</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-7 text-balance">
                What partners can assess before funding.
              </h2>
              <p className="text-lg text-foreground/75 leading-relaxed">
                TIJCEF makes its programme evidence, governance commitments, safeguarding standards and reporting approach visible so prospective partners can conduct proportionate due diligence.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { icon: ShieldCheck, title: "Legal & Governance", desc: "A registered Nigerian nonprofit with named programme, finance, operations and safeguarding responsibilities." },
                { icon: Globe2, title: "SDG & Local Alignment", desc: "Programme areas are mapped to relevant SDGs and grounded in documented community priorities." },
                { icon: Users, title: "Safeguarding & Participation", desc: "Consent, responsible storytelling and community participation are built into programme delivery." },
                { icon: Award, title: "Evidence & Reporting", desc: "Reach figures are distinguished from outcomes, reviewed against programme records and reported with context." },
              ].map((b, i) => (
                <Reveal key={b.title} delay={i * 80}>
                  <div className="p-7 rounded-2xl bg-card border border-border shadow-card h-full hover:shadow-elegant hover:-translate-y-1 transition-all duration-500">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <b.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-xl mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
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
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {stories.map((s, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="glass rounded-2xl p-8 h-full flex flex-col">
                  <Quote className="w-8 h-8 text-accent mb-5" />
                  <p className="font-display text-lg lg:text-xl leading-snug mb-7 flex-1">{s.quote}</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-primary-foreground/15">
                    <img src={s.img} alt={s.imgAlt} loading="lazy" width={80} height={80} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-sm">{s.name}</div>
                      <div className="text-xs text-primary-foreground/65">{s.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
