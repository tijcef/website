import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SimplePage from "@/components/site/SimplePage";
import Reveal from "@/components/site/Reveal";
import { FileText, BookOpen, Image as ImageIcon, Newspaper, ArrowRight } from "lucide-react";
import researchImg from "@/assets/research.jpg";

const items = [
  { type: "Annual Report", icon: FileText, title: "TIJCEF 2025 Annual Report - Corrected Edition", date: "September 2026", desc: "A reconciled account of TIJCEF's programme framework, approved reach figures, learning and priorities.", href: "/TIJCEF_ANNUAL_REPORT_2025.pdf" },
  { type: "Media Kit", icon: Newspaper, title: "TIJCEF Media and Press Kit", date: "September 2026", desc: "Verified organisational profile, approved impact figures, programme areas, leadership and media contacts.", href: "/TIJCEF_PRESS_KIT.pdf" },
  { type: "Media Tracker", icon: Newspaper, title: "Media Coverage and Public Mentions", date: "Updated continuously", desc: "A reviewed record of independent coverage, official listings and public references to TIJCEF.", href: "/media-coverage", internal: true },
  { type: "Research", icon: BookOpen, title: "State of Menstrual Health in Taraba and Adamawa States", date: "January 2026", desc: "Contextual overview of access barriers, knowledge gaps and WASH challenges affecting adolescent girls.", href: "/resources/menstrual-health-taraba-adamawa", internal: true },
  { type: "Toolkit", icon: FileText, title: "Pad-A-Girl School Implementation Toolkit", date: "November 2025", desc: "An open guide for school and community menstrual health education.", href: "/resources/pad-a-girl-toolkit", internal: true },
  { type: "Blog", icon: BookOpen, title: "What we learned from 12 community circles", date: "September 2025", desc: "Field reflections from TIJCEF's community wellbeing conversations.", href: "/resources/community-circles", internal: true },
  { type: "Gallery", icon: ImageIcon, title: "Faces of Empowerment 2025", date: "August 2025", desc: "Portraits and stories from across TIJCEF programmes.", href: "/resources/faces-of-empowerment-2025", internal: true },
];

const Resources = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return (
  <SimplePage
    eyebrow="Resources"
    title="Reports, research, and stories from the field."
    subtitle="Open-access publications, toolkits, and media because evidence belongs to everyone."
    image={researchImg}
  >
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((r, i) => {
        const Wrapper: any = r.href ? ((r as any).internal ? Link : "a") : "div";
        const wrapperProps = r.href ? ((r as any).internal ? { to: r.href } : { href: r.href, target: "_blank", rel: "noopener noreferrer" }) : {};
        return (
        <Reveal key={r.title} delay={i * 70}>
          <Wrapper {...wrapperProps} className="block h-full">
            <article className="group p-7 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-elegant transition-all h-full flex flex-col cursor-pointer">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <r.icon className="w-5 h-5" />
                </div>
                <div className="text-xs uppercase tracking-wider text-accent font-semibold">{r.type}</div>
              </div>
              <h3 className="font-display text-xl mb-2 leading-tight group-hover:text-primary transition-colors">{r.title}</h3>
              <div className="text-xs text-muted-foreground mb-3">{r.date}</div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{r.desc}</p>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                {r.type === "Annual Report" || r.type === "Media Kit" ? "Open document" : r.href ? "Open resource" : "Read more"} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          </Wrapper>
        </Reveal>
        );
      })}
    </div>
    </SimplePage>
  );
};

export default Resources;
