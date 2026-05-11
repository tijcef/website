import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SimplePage from "@/components/site/SimplePage";
import Reveal from "@/components/site/Reveal";
import { FileText, BookOpen, Image as ImageIcon, Newspaper, ArrowRight, GraduationCap, Globe2 } from "lucide-react";
import researchImg from "@/assets/research.jpg";

const featured = [
  {
    id: "journal",
    type: "TIJCEF Journal",
    icon: GraduationCap,
    title: "TIJCEF Journal of Community Development and Innovation",
    desc: "Our peer-reviewed open-access journal publishing original research on community development, innovation, adolescent health, menstrual dignity, and climate resilience across Nigeria and beyond.",
    cta: "Browse the Journal",
    href: "https://journal.tijcef.org",
  },
  {
    id: "tgis",
    type: "TGIS",
    icon: Globe2,
    title: "TIJCEF Geospatial Intelligence System (TGIS)",
    desc: "An interactive geospatial platform tracking program reach, community partners, climate indicators, and impact data across every state where TIJCEF operates.",
    cta: "Explore TGIS",
    href: "https://tgis.tijcef.org",
  },
];

const items = [
  { type: "Press Kit", icon: FileText, title: "TIJCEF Media & Press Kit", date: "May 2026", desc: "Logo, founder bio, mission, impact highlights, and media contact for journalists and partners.", href: "/TIJCEF_PRESS_KIT.pdf" },
  { type: "Annual Report", icon: FileText, title: "TIJCEF 2025 Annual Report", date: "March 2026", desc: "Our full year in review\u00A0 programs, finances, evaluations, and the road ahead.", href: "/TIJCEF_ANNUAL_REPORT_2025.pdf" },
  { type: "Research", icon: BookOpen, title: "State of Menstrual Health in Taraba and Adamawa States", date: "January 2026", desc: "Contextual overview of access barriers, knowledge gaps, and WASH challenges affecting adolescent girls.", href: "/resources/menstrual-health-taraba-adamawa", internal: true },
  { type: "Toolkit", icon: FileText, title: "Pad-A-Girl School Implementation Toolkit", date: "November 2025", desc: "Free, open-source guide for schools and partners.", href: "/resources/pad-a-girl-toolkit", internal: true },
  { type: "Press", icon: Newspaper, title: "Vanguard: Humanitarian Advocate Champions Grassroots Empowerment for Women & Youth", date: "February 2026", desc: "Vanguard Nigeria features TIJCEF's grassroots work empowering women and youth across Nigeria.", href: "https://www.vanguardngr.com/2026/02/humanitarian-advocate-champions-grassroots-empowerment-for-women-youth-in-nigeria/" },
  { type: "Press", icon: Newspaper, title: "The Sun: Tijwun's Role in Promoting Women, Youth & Community Empowerment", date: "2025", desc: "The Sun Nigeria spotlights Emmanuel Sunday and TIJCEF's contributions to community empowerment.", href: "https://thesun.ng/emmanuel-sunday-tijwuns-role-in-promoting-women-youth-community-empowerment-in-nigeria/" },
  { type: "Press", icon: Newspaper, title: "Independent: TIJCEF in Collaboration with Lead the Girl Child Foundation", date: "2025", desc: "Independent Nigeria covers our partnership advancing girl-child education and dignity.", href: "https://independent.ng/tijwun-care-and-empowerment-foundation-in-collaboration-with-lead-the-girl-child-foundation/" },
  { type: "Press", icon: Newspaper, title: "UN SDG Partnerships: Tijwun Care and Empowerment Foundation (TIJCEF)", date: "2025", desc: "TIJCEF is featured on the United Nations SDG Partnerships Platform for our contributions to the Sustainable Development Goals.", href: "https://sdgs.un.org/partnerships/tijwun-care-and-empowerment-foundation-tijcef" },
  { type: "Directory", icon: Globe2, title: "NNNGO: Listed Among Nigeria's Thematic Nonprofits", date: "2025", desc: "TIJCEF is recognized in the Nigerian Network of NGOs directory by thematic areas.", href: "https://nnngo.org/directory-by-thematic-areas/" },
  { type: "Directory", icon: FileText, title: "GovTribe: TIJCEF Vendor Profile", date: "2025", desc: "Our official vendor profile on GovTribe's federal contracting and grants intelligence platform.", href: "https://govtribe.com/vendors/tijwun-care-and-empowerment-foundation-stgv7" },
  { type: "Blog", icon: BookOpen, title: "What we learned from 12 community circles", date: "September 2025", desc: "Field reflections from our community wellbeing program.", href: "/resources/community-circles", internal: true },
  { type: "Gallery", icon: ImageIcon, title: "Faces of Empowerment 2025", date: "August 2025", desc: "Portraits and stories from across our programs.", href: "/resources/faces-of-empowerment-2025", internal: true },
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
    {/* Featured: Journal & TGIS */}
    <div className="grid md:grid-cols-2 gap-6 mb-14">
      {featured.map((f, i) => (
        <Reveal key={f.id} delay={i * 100}>
          <article
            id={f.id}
            className="group relative p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-elegant overflow-hidden h-full flex flex-col scroll-mt-24"
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-primary-foreground/15 flex items-center justify-center">
                <f.icon className="w-5 h-5 text-accent" />
              </div>
              <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">{f.type}</div>
            </div>
            <h3 className="relative font-display text-2xl md:text-3xl leading-tight mb-4">{f.title}</h3>
            <p className="relative text-sm md:text-base text-primary-foreground/85 leading-relaxed mb-6 flex-1">{f.desc}</p>
            <a
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
            >
              {f.cta} <ArrowRight className="w-4 h-4" />
            </a>
          </article>
        </Reveal>
      ))}
    </div>

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
                {r.href ? "Read article" : "Read more"} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
