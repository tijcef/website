import { useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  { area: "Agency", status: "Delivered · 2026", title: "Youth Empowerment Seminar", img: healthImg, imgAlt: "Students displaying menstrual health materials during a TIJCEF school programme", location: "Zion Centre, Girei LGA, Adamawa State", desc: "Entrepreneurship, self-reliance and leadership learning for young people.", metric: "50 young people trained" },
  { area: "Agency", status: "Delivered · 2026", title: "Women's Leadership Empowerment", img: girlsImg, imgAlt: "A TIJCEF team member speaking during a community programme", location: "Taraba State", desc: "A focused programme supporting women's confidence, leadership and community participation.", metric: "45 women engaged" },
  { area: "Agency", status: "Recurring", title: "TIJCEF School Takeover", img: researchImg, imgAlt: "TIJCEF team members and partners during a programme learning meeting", location: "Community schools", desc: "A full-day education intervention in which TIJCEF staff and volunteers support learning, mentoring and aspiration building.", metric: "Scheduled twice yearly" },
  { area: "Resilience", status: "Delivered · April 2026", title: "Volunteer Capacity Training", img: climateImg, imgAlt: "Participants attending a TIJCEF community training", location: "Yola, Adamawa State", desc: "Practical preparation for volunteers supporting community development, responsible engagement and programme delivery.", metric: "Participation reported through programme records" },
  { area: "Dignity", status: "Delivered · 2023", title: "Katsina Orphanage Support Visit", img: healthImg, imgAlt: "Students displaying menstrual health materials during a TIJCEF school programme", location: "Katsina State", desc: "A care visit led by TIJCEF's Executive Director with donated items provided to children.", metric: "Material support delivered" },
  { area: "Evidence", status: "Ongoing", title: "Research, Monitoring and Learning", img: researchImg, imgAlt: "TIJCEF team members and partners during a programme learning meeting", location: "Across TIJCEF programmes", desc: "Proportionate data collection, geospatial analysis, reflection and reporting used to improve delivery and public accountability.", metric: "Outputs published after review" },
];

const Programs = () => {
 const [params] = useSearchParams();
 const [status,setStatus]=useState(params.get('status') || 'All');
 const [area,setArea]=useState('All'); const [state,setState]=useState('All'); const [year,setYear]=useState('All');
 const visible=programs.filter(p=>(status==='All'||(status==='Completed'?p.status.startsWith('Delivered'):p.status===status))&&(area==='All'||p.area===area)&&(state==='All'||p.location.includes(state))&&(year==='All'||p.status.includes(year)));
 return (
  <SimplePage
    eyebrow="Programmes & Projects"
    title="Our programmes and projects"
    subtitle="Explore our work by programme area, delivery status, location and year."
    image={climateImg}
  >
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Filter programmes">
     {[["Status",status,setStatus,["All","Ongoing","Recurring","Completed"]],["Programme area",area,setArea,["All","Dignity","Agency","Resilience","Evidence"]],["Location",state,setState,["All","Adamawa","Taraba","Katsina"]],["Year",year,setYear,["All","2026","2023"]]].map(([label,value,setter,options])=><label key={label as string} className="text-sm font-semibold">{label as string}<select className="mt-2 block w-full rounded-lg border bg-background p-3" value={value as string} onChange={e=>(setter as (v:string)=>void)(e.target.value)}>{(options as string[]).map(v=><option key={v}>{v}</option>)}</select></label>)}
    </div>
    <p role="status" className="mb-6 text-sm text-muted-foreground">{visible.length} projects match your filters.</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
      {visible.map((p, i) => (
        <Reveal key={p.title} delay={i * 80}>
          <article className="group rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.img} alt={p.imgAlt} loading="lazy" width={1200} height={900} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <span className="sr-only">Illustrative TIJCEF programme photograph; not verified as this event.</span>
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
              <p className="mt-2 text-xs text-muted-foreground">Illustrative TIJCEF programme photograph.</p>
              <details className="mt-5 border-t pt-4"><summary className="cursor-pointer font-semibold text-primary">View project details</summary><div className="mt-4 space-y-3 text-sm"><p><strong>Programme:</strong> {p.area}</p><p><strong>Location:</strong> {p.location}</p><p><strong>Status:</strong> {p.status}</p><p>{p.desc}</p><p><strong>Reported delivery:</strong> {p.metric}. Participation figures describe delivery, not measured long-term outcomes.</p><Link to="/impact" className="block underline">Read programme evidence and reporting approach</Link><Link to="/contact" className="block underline">Request project documentation</Link></div></details>
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
          <Link to="/get-involved#partner">Partner with TIJCEF <ArrowRight className="w-4 h-4" /></Link>
        </Button>
      </div>
    </Reveal>
  </SimplePage>
);
};

export default Programs;
