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
  { tag: "Delivered · 2026", title: "Menstrual Health Outreach", img: girlsImg, desc: "Menstrual health education and dignity support delivered at Government Girls College, Yola.", metric: "Approximately 400 girls engaged" },
  { tag: "Delivered · 2026", title: "Youth Empowerment Seminar", img: healthImg, desc: "Entrepreneurial skills and self-reliance training delivered at Zion Centre in Girei LGA, Adamawa State.", metric: "50 young people trained" },
  { tag: "Ongoing", title: "Pad-A-Girl Initiative", img: girlsImg, desc: "School and community-based menstrual dignity education with hygiene support for adolescent girls.", metric: "Delivery figures reported after verification" },
  { tag: "Ongoing", title: "STEM and Education Outreach", img: researchImg, desc: "Practical learning and encouragement designed to improve young people's participation in science and technology.", metric: "Programme records guide reporting" },
  { tag: "Ongoing", title: "Climate Action and Awareness", img: climateImg, desc: "Community education and youth engagement focused on environmental responsibility and resilience.", metric: "Activities reported through MEL review" },
  { tag: "Ongoing", title: "Research and Learning", img: researchImg, desc: "Applied research, monitoring and learning that strengthen programme design and public knowledge.", metric: "Evidence published when reviewed" },
];

const Programs = () => (
  <SimplePage
    eyebrow="Programs & Projects"
    title="Programs designed with communities. Measured against outcomes."
    subtitle="Every initiative begins with listening and is reported against available programme records."
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
