import SimplePage from "@/components/site/SimplePage";
import Reveal from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import healthImg from "@/assets/health-dignity.jpg";
import girlsImg from "@/assets/girls-education.jpg";
import climateImg from "@/assets/climate-action.jpg";
import researchImg from "@/assets/research.jpg";

const programs = [
  { tag: "Active · 2026", title: "Pad-A-Girl Initiative", img: girlsImg, desc: "Distributing menstrual hygiene kits and dignity education to 5,000 girls across 30 schools.", metric: "3,200 girls reached" },
  { tag: "Active · 2026", title: "Green Futures Fellowship", img: climateImg, desc: "A 6-month youth climate leadership program training 120 young Nigerians in adaptation and advocacy.", metric: "120 fellows · 4 states" },
  { tag: "Active", title: "Community Wellbeing Circles", img: healthImg, desc: "Trusted spaces where women learn maternal health, nutrition, and mental wellbeing from local nurses.", metric: "1,000 trees planted" },
  { tag: "Research", title: "State of the Nigerian Girl 2025", img: researchImg, desc: "A landmark mixed-methods study on adolescent girls' health, education, and aspirations across 6 states.", metric: "1,800 respondents" },
  { tag: "Past", title: "Traba Tree Nursery Project", img: climateImg, desc: "Established three community-led nurseries producing 12,000 indigenous saplings annually.", metric: "12,000 trees planted" },
  { tag: "Past", title: "Teen Health Talks", img: girlsImg, desc: "Year-long after-school program covering puberty, consent, and life skills in 18 schools.", metric: "4,500 teens served" },
];

const Programs = () => (
  <SimplePage
    eyebrow="Programs & Projects"
    title="Programs designed with communities. Measured against outcomes."
    subtitle="Every initiative begins with listening and ends with published evidence."
    image={climateImg}
  >
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
      {programs.map((p, i) => (
        <Reveal key={p.title} delay={i * 80}>
          <article className="group rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.img} alt={p.title} loading="lazy" width={1200} height={900} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-7 flex-1 flex flex-col">
              <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-3">{p.tag}</div>
              <h3 className="font-display text-2xl mb-3 leading-tight">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{p.desc}</p>
              <div className="text-sm font-semibold text-primary pt-4 border-t border-border">{p.metric}</div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>

    <Reveal>
      <div className="rounded-2xl gradient-primary p-12 md:p-16 text-primary-foreground text-center">
        <h3 className="font-display text-3xl md:text-4xl mb-4 max-w-2xl mx-auto leading-tight">Want to fund a program?</h3>
        <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">Institutional partners, foundations, and CSR teams&nbsp; let's design measurable impact together.</p>
        <Button asChild variant="gold" size="lg">
          <Link to="/get-involved">Partner with TIJCEF <ArrowRight className="w-4 h-4" /></Link>
        </Button>
      </div>
    </Reveal>
  </SimplePage>
);

export default Programs;
