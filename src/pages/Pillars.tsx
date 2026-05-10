import SimplePage from "@/components/site/SimplePage";
import Reveal from "@/components/site/Reveal";
import { HeartPulse, Sparkles, Sprout, Microscope } from "lucide-react";
import healthImg from "@/assets/health-dignity.jpg";
import girlsImg from "@/assets/girls-education.jpg";
import climateImg from "@/assets/climate-action.jpg";
import researchImg from "@/assets/research.jpg";

const pillars = [
  {
    icon: HeartPulse,
    title: "Health & Wellbeing",
    img: healthImg,
    problem: "Millions of women and youth in underserved Nigerian communities lack access to basic health information and preventive care.",
    solution: "Community-based health education, partnerships with local clinics, and outreach delivered in culturally relevant language.",
    programs: ["School health workshops", "Maternal wellbeing circles", "Adolescent health screenings", "Clean water awareness"],
    sdg: "SDG 3 — Good Health & Wellbeing",
  },
  {
    icon: Sparkles,
    title: "Gender Equality & Menstrual Dignity",
    img: girlsImg,
    problem: "Rural Nigerian communities face the sharpest edges of climate change, with the least resources to adapt.",
    solution: "Free menstrual products, dignity education, and advocacy for safe, stigma-free school environments.",
    programs: ["Pad distribution drives", "Girl ambassador program", "Teacher training", "Boys-as-allies workshops"],
    sdg: "SDG 5 — Gender Equality",
  },
  {
    icon: Sprout,
    title: "Climate Action & Environmental Sustainability",
    img: climateImg,
    problem: "Rural Nigerian communities face the sharpest edges of climate change — with the least resources to adapt.",
    solution: "Youth-led climate education, tree planting, and locally-led adaptation projects.",
    programs: ["Youth climate fellowships", "Community tree nurseries", "Clean cooking advocacy", "Climate literacy curriculum"],
    sdg: "SDG 13 — Climate Action",
  },
  {
    icon: Microscope,
    title: "Research, Monitoring & Evaluation",
    img: researchImg,
    problem: "Decisions about women and youth are too often made without their data, voices, or evidence.",
    solution: "Independent field research, published evaluations, and open data partnerships with academic institutions.",
    programs: ["Annual community health surveys", "Program impact studies", "Policy briefs", "Open data publications"],
    sdg: "SDG 17 — Partnerships",
  },
];

const Pillars = () => (
  <SimplePage
    eyebrow="Our Four Pillars"
    title="Where focus meets impact."
    subtitle="Four interconnected pillars guide every program, woven together to create durable change for women, girls, and youth."
    image={girlsImg}
  >
    <div className="space-y-24">
      {pillars.map((p, i) => (
        <Reveal key={p.title}>
          <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <img src={p.img} alt={p.title} loading="lazy" width={1200} height={900} className="rounded-2xl shadow-elegant w-full aspect-[4/3] object-cover" />
            <div>
              <div className="w-14 h-14 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center mb-5">
                <p.icon className="w-7 h-7" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">{p.title}</h2>
              <div className="space-y-5 text-foreground/80 leading-relaxed">
                <div>
                  <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">The Problem</div>
                  <p>{p.problem}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">Our Approach</div>
                  <p>{p.solution}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">Active Programs</div>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {p.programs.map((prog) => (
                      <li key={prog} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {prog}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="inline-block px-4 py-2 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold">{p.sdg}</div>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </SimplePage>
);

export default Pillars;
