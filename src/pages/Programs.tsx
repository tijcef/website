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
  { area: "Dignity", status: "Delivered · 2026", title: "Government Girls College Menstrual Health Outreach", img: girlsImg, imgAlt: "A TIJCEF team member speaking during a community programme", location: "Yola, Adamawa State", desc: "School-based menstrual health education and dignity support for adolescent girls.", metric: "Approximately 400 girls engaged" },
  { area: "Dignity", status: "Delivered · 2026", title: "Adroit International Academy Menstrual Empowerment", img: healthImg, imgAlt: "Students displaying menstrual health materials during a TIJCEF school programme", location: "Yola, Adamawa State", desc: "A joint menstrual health and confidence-building activity delivered with Lead the Girl Foundation.", metric: "Approximately 200 girls engaged" },
  { area: "Agency", status: "Delivered · 2026", title: "Youth Empowerment Seminar", img: healthImg, imgAlt: "Students displaying menstrual health materials during a TIJCEF school programme", location: "Zion Centre, Girei LGA", desc: "Entrepreneurship, self-reliance and leadership learning for young people.", metric: "50 young people trained" },
  { area: "Agency", status: "Delivered · 2026", title: "Women's Leadership Empowerment", img: girlsImg, imgAlt: "A TIJCEF team member speaking during a community programme", location: "Taraba State", desc: "A focused programme supporting women's confidence, leadership and community participation.", metric: "45 women engaged" },
  { area: "Agency", status: "Recurring", title: "TIJCEF School Takeover", img: researchImg, imgAlt: "TIJCEF team members and partners during a programme learning meeting", location: "Community schools", desc: "A full-day education intervention in which TIJCEF staff and volunteers support learning, mentoring and aspiration building.", metric: "Scheduled twice yearly" },
  { area: "Resilience", status: "Delivered · April 2026", title: "Volunteer Capacity Training", img: climateImg, imgAlt: "Participants attending a TIJCEF community training", location: "Yola, Adamawa State", desc: "Practical preparation for volunteers supporting community development, responsible engagement and programme delivery.", metric: "Participation reported through programme records" },
  { area: "Dignity", status: "Delivered · 2023", title: "Katsina Orphanage Support Visit", img: healthImg, imgAlt: "Students displaying menstrual health materials during a TIJCEF school programme", location: "Katsina State", desc: "A care visit led by TIJCEF's Executive Director with donated items provided to children.", metric: "Material support delivered" },
  { area: "Evidence", status: "Ongoing", title: "Research, Monitoring and Learning", img: researchImg, imgAlt: "TIJCEF team members and partners during a programme learning meeting", location: "Across TIJCEF programmes", desc: "Proportionate data collection, geospatial analysis, reflection and reporting used to improve delivery and public accountability.", metric: "Outputs published after review" },
];

const Programs = () => (
  <SimplePage
    eyebrow="Programmes & Projects"
    title="Documented delivery, organised by clear programme areas."
    subtitle="Each activity has one primary programme area, a delivery status and evidence appropriate to its scale. Reach figures are not presented as long-term outcomes."
    image={climateImg}
  >
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
      {programs.map((p, i) => (
        <Reveal key={p.title} delay={i * 80}>
          <article className="group rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.img} alt={p.imgAlt} loading="lazy" width={1200} height={900} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-7 flex-1 flex flex-col">
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider font-semibold mb-3">
                <span className="text-accent">{p.area}</span>
                <span className="text-muted-foreground">· {p.status}</span>
              </div>
              <h3 className="font-display text-2xl mb-3 leading-tight">{p.title}</h3>
              <div className="mb-3 text-xs font-semibold text-primary">{p.location}</div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{p.desc}</p>
              <div className="text-sm font-semibold text-primary pt-4 border-t border-border">{p.metric}</div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>

    <Reveal>
      <div className="rounded-2xl gradient-primary p-12 md:p-16 text-primary-foreground text-center">
        <h3 className="font-display text-3xl md:text-4xl mb-4 max-w-2xl mx-auto leading-tight">Looking for a credible implementation partner?</h3>
        <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">TIJCEF welcomes foundations, CSR teams, government, research institutions and nonprofit partners seeking community access, safeguarding, documented delivery and proportionate reporting.</p>
        <Button asChild variant="gold" size="lg">
          <Link to="/get-involved">Partner with TIJCEF <ArrowRight className="w-4 h-4" /></Link>
        </Button>
      </div>
    </Reveal>
  </SimplePage>
);

export default Programs;
