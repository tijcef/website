import { Link } from "react-router-dom";
import { ArrowRight, HeartPulse, Sprout, Microscope, Sparkles, Quote, ShieldCheck, Globe2, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/site/SiteLayout";
import Counter from "@/components/site/Counter";
import Reveal from "@/components/site/Reveal";
import heroImg from "@/assets/hero-woman.jpg";
import girlsImg from "@/assets/girls-education.jpg";
import climateImg from "@/assets/climate-action.jpg";
import aminaImg from "@/assets/amina-sale.webp";
import healthImg from "@/assets/health-dignity.jpg";
import researchImg from "@/assets/research.jpg";

const pillars = [
  { icon: HeartPulse, title: "Dignity", desc: "Advancing menstrual health, adolescent wellbeing, and access to essential support.", img: healthImg, color: "from-primary to-primary-glow" },
  { icon: Sparkles, title: "Agency", desc: "Equipping girls and young people with education, confidence, and leadership skills.", img: girlsImg, color: "from-secondary to-primary" },
  { icon: Sprout, title: "Resilience", desc: "Enabling youth and communities to lead climate action and withstand environmental challenges.", img: climateImg, color: "from-primary-glow to-accent" },
  { icon: Microscope, title: "Evidence", desc: "Generating research, measuring impact, and advancing evidence-based advocacy.", img: researchImg, color: "from-secondary to-primary-glow" },
];

const stats = [
  { end: 8500, suffix: "+", label: "Cumulative people reached" },
  { end: 1200, suffix: "+", label: "People reached in 2026" },
  { end: 4, suffix: "", label: "Programme pillars" },
  { end: 3, suffix: "", label: "Operational states" },
];

const stories = [
  { quote: "Menstrual health education and dignity support were delivered at Government Girls College, Yola, engaging approximately 400 girls.", name: "Menstrual Health Outreach", role: "Yola · February 2026", img: girlsImg },
  { quote: "Entrepreneurial skills and self-reliance training were delivered to 50 young people at Zion Centre in Girei LGA.", name: "Youth Empowerment Seminar", role: "Adamawa · 2026", img: aminaImg },
  { quote: "TIJCEF's programme records report more than 1,200 people reached during 2026 across its community activities.", name: "2026 Programme Update", role: "Subject to annual reporting review", img: healthImg },
];

const Index = () => {
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
                Dignity · Agency · Resilience · Evidence
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight mb-7 text-balance">
                Advancing dignity.<br />
                Strengthening agency.<br />
                <span className="italic text-accent font-light">Building resilient communities.</span>
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl leading-relaxed mb-10">
                TIJCEF works with adolescent girls, women, young people and vulnerable communities across Nigeria to advance dignity, strengthen agency, build resilience and generate evidence for lasting change.
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
              Tijwun Care and Empowerment Foundation advances <strong className="text-primary font-semibold">dignity, agency, resilience, and evidence</strong> through community-based programs that put adolescent girls, women, and youth at the center of their own futures.
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
                We advance dignity, strengthen agency, build resilience, and generate evidence that transforms communities.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <Link to={`/pillars/${p.title.toLowerCase()}`} className="group block relative h-[420px] rounded-2xl overflow-hidden shadow-card hover:shadow-deep transition-all duration-700">
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
                { icon: ShieldCheck, title: "CAC Registered", desc: "Fully governed Nigerian nonprofit, accountable to community and law." },
                { icon: Globe2, title: "SDG Aligned", desc: "Programs mapped to Sustainable Development Goals 3, 5, 13 & 17." },
                { icon: Users, title: "Community-Led", desc: "Designed with not for the women and youth we serve." },
                { icon: Award, title: "Evidence-Driven", desc: "Programme decisions are informed by monitoring, research and documented learning." },
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
                    <img src={s.img} alt={s.name} loading="lazy" width={80} height={80} className="w-12 h-12 rounded-full object-cover" />
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
                Support TIJCEF's work across Dignity, Agency, Resilience and Evidence. Donations are recorded, acknowledged and applied under organisational financial controls.
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