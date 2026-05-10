import SimplePage from "@/components/site/SimplePage";
import Reveal from "@/components/site/Reveal";
import { Download, BookOpen, Users, Sparkles, ShieldCheck, ClipboardList, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import healthImg from "@/assets/health-dignity.jpg";

const PDF_HREF = "/PAD-A-GIRL_TOOLKIT.pdf";

const purposes = [
  "Improve menstrual health education in schools",
  "Reduce stigma and misinformation around menstruation",
  "Support distribution of menstrual hygiene products where available",
  "Strengthen confidence and school attendance among adolescent girls",
  "Equip facilitators with simple, practical teaching tools",
];

const users = [
  "Teachers and school health educators",
  "Community facilitators",
  "NGO partners and volunteers",
  "School administrators",
  "Youth mentors",
];

const components = [
  {
    icon: BookOpen,
    title: "Menstrual Health Education",
    items: ["Basic understanding of menstruation", "Menstrual cycle awareness", "Hygiene practices during menstruation", "Breaking myths and stigma"],
  },
  {
    icon: Heart,
    title: "Dignity & Confidence Building",
    items: ["Promoting self-esteem among girls", "Addressing shame and cultural stigma", "Encouraging open conversations"],
  },
  {
    icon: Sparkles,
    title: "Hygiene & Product Use",
    items: ["Safe use of sanitary pads and alternatives", "Proper disposal methods", "Hygiene management in school settings"],
  },
  {
    icon: ShieldCheck,
    title: "School Support System",
    items: ["Creating safe spaces for girls", "Teacher sensitization", "Emergency support for girls during menstruation"],
  },
];

const steps = [
  { title: "School Engagement", desc: "Meet school leadership, identify focal teachers, and schedule sessions." },
  { title: "Sensitization Session", desc: "Introduce menstrual health basics and address stigma and myths." },
  { title: "Practical Training", desc: "Demonstrate hygiene practices and provide product usage guidance." },
  { title: "Distribution", desc: "Provide dignity kits — pads, soap, pants, and other essentials — where applicable." },
  { title: "Follow-up", desc: "Monitor attendance impact and gather feedback from girls and teachers." },
];

const outcomes = [
  "Improved menstrual health knowledge",
  "Reduced absenteeism among girls",
  "Increased confidence and participation in school",
  "Reduced stigma in school communities",
];

const PadAGirlToolkit = () => (
  <SimplePage
    eyebrow="Toolkit"
    title="Pad-A-Girl School Implementation Toolkit"
    subtitle="A practical guide for schools, facilitators, and partners delivering menstrual health education and dignity support to adolescent girls across Nigeria."
    image={healthImg}
  >
    {/* Download CTA */}
    <Reveal>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/85 text-primary-foreground p-8 md:p-12 mb-16 shadow-elegant">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-3">Free & open-source</div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-3">Download the full toolkit</h2>
            <p className="text-primary-foreground/85 leading-relaxed">PDF, suitable for print and field use. Share freely with your school, NGO, or community partners.</p>
          </div>
          <Button asChild size="lg" variant="secondary" className="shrink-0">
            <a href={PDF_HREF} target="_blank" rel="noopener noreferrer">
              <Download className="w-5 h-5" /> Download PDF
            </a>
          </Button>
        </div>
      </div>
    </Reveal>

    {/* Introduction */}
    <Reveal>
      <section className="mb-16 max-w-3xl">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold mb-3">Introduction</div>
        <h2 className="font-display text-3xl md:text-4xl mb-4 leading-tight">A structured approach to menstrual dignity in schools.</h2>
        <p className="text-muted-foreground leading-relaxed">
          The Pad-A-Girl School Implementation Toolkit provides a clear, practical framework for improving menstrual hygiene management (MHM), reducing stigma, and ensuring that no girl misses school due to a lack of menstrual products or information.
        </p>
      </section>
    </Reveal>

    {/* Purpose */}
    <Reveal>
      <section className="grid md:grid-cols-2 gap-10 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><ClipboardList className="w-5 h-5" /></div>
            <h2 className="font-display text-2xl">Purpose of the toolkit</h2>
          </div>
          <ul className="space-y-3">
            {purposes.map((p) => (
              <li key={p} className="flex gap-3 text-muted-foreground"><span className="text-accent font-bold">›</span>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Users className="w-5 h-5" /></div>
            <h2 className="font-display text-2xl">Who it's for</h2>
          </div>
          <ul className="space-y-3">
            {users.map((u) => (
              <li key={u} className="flex gap-3 text-muted-foreground"><span className="text-accent font-bold">›</span>{u}</li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>

    {/* Core components */}
    <Reveal>
      <section className="mb-16">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold mb-3">Core components</div>
        <h2 className="font-display text-3xl md:text-4xl mb-8 leading-tight">Four pillars of the program.</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {components.map((c) => (
            <article key={c.title} className="p-7 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-elegant transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><c.icon className="w-5 h-5" /></div>
                <h3 className="font-display text-xl">{c.title}</h3>
              </div>
              <ul className="space-y-2">
                {c.items.map((i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground"><span className="text-accent">›</span>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </Reveal>

    {/* Implementation approach */}
    <Reveal>
      <section className="mb-16">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold mb-3">Implementation approach</div>
        <h2 className="font-display text-3xl md:text-4xl mb-8 leading-tight">Five steps from engagement to follow-up.</h2>
        <ol className="space-y-5">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-5 p-6 rounded-2xl bg-card border border-border">
              <div className="shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground font-display text-lg flex items-center justify-center">{i + 1}</div>
              <div>
                <h3 className="font-display text-xl mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </Reveal>

    {/* Key messages + outcomes */}
    <Reveal>
      <section className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="p-8 rounded-2xl bg-secondary">
          <h3 className="font-display text-2xl mb-5">Key messages</h3>
          <ul className="space-y-4 text-foreground">
            <li className="border-l-2 border-accent pl-4">Menstruation is natural and not shameful.</li>
            <li className="border-l-2 border-accent pl-4">No girl should miss school because of her period.</li>
            <li className="border-l-2 border-accent pl-4">Dignity is a right, not a privilege.</li>
          </ul>
        </div>
        <div className="p-8 rounded-2xl bg-secondary">
          <h3 className="font-display text-2xl mb-5">Expected outcomes</h3>
          <ul className="space-y-3 text-muted-foreground">
            {outcomes.map((o) => (
              <li key={o} className="flex gap-2"><span className="text-accent">✓</span>{o}</li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>

    {/* Footer CTA */}
    <Reveal>
      <div className="text-center p-10 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <h2 className="font-display text-3xl md:text-4xl mb-3">Bring Pad-A-Girl to your school.</h2>
        <p className="text-primary-foreground/85 mb-6 max-w-xl mx-auto">Download the toolkit or get in touch to partner with TIJCEF on implementation in your community.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg" variant="secondary">
            <a href={PDF_HREF} target="_blank" rel="noopener noreferrer"><Download className="w-5 h-5" /> Download PDF</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
            <Link to="/contact">Partner with us <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </Reveal>
  </SimplePage>
);

export default PadAGirlToolkit;
