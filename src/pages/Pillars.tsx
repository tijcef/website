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
    title: "Dignity",
    img: healthImg,
    problem: "Too many adolescent girls and women still face barriers to menstrual health information, essential products, and respectful support.",
    solution: "We advance menstrual health, adolescent wellbeing, and access to essential support through practical, community-based care.",
    programs: ["Menstrual health education", "Dignity kit distribution", "Adolescent wellbeing sessions", "School health outreach"],
    sdg: "SDG 3 & 5 — Health and Gender Equality",
  },
  {
    icon: Sparkles,
    title: "Agency",
    img: girlsImg,
    problem: "Girls and young people are often excluded from the education, confidence, skills, and decisions that shape their futures.",
    solution: "We equip girls and young people to learn, lead, make informed choices, and participate meaningfully in their communities.",
    programs: ["Girls' leadership circles", "Life-skills education", "Mentoring and learning support", "Youth leadership development"],
    sdg: "SDG 4 & 5 — Education and Gender Equality",
  },
  {
    icon: Sprout,
    title: "Resilience",
    img: climateImg,
    problem: "Rural Nigerian communities face the sharpest edges of climate change — with the least resources to adapt.",
    solution: "We enable youth and communities to lead climate action, strengthen local preparedness, and withstand environmental challenges.",
    programs: ["Youth climate education", "Community environmental action", "Tree planting initiatives", "Climate resilience campaigns"],
    sdg: "SDG 13 — Climate Action",
  },
  {
    icon: Microscope,
    title: "Evidence",
    img: researchImg,
    problem: "Decisions about women and youth are too often made without their data, voices, or evidence.",
    solution: "We generate research, measure impact, document learning, and advance evidence-based advocacy.",
    programs: ["Community research", "Programme monitoring and evaluation", "Impact studies", "Policy briefs and publications"],
    sdg: "SDG 17 — Partnerships",
  },
];

const Pillars = () => (
  <SimplePage
    eyebrow="Our Four Pillars"
    title="Dignity. Agency. Resilience. Evidence."
    subtitle="Four pillars. One purpose: advancing dignity, strengthening agency, building resilience, and generating evidence that transforms communities."
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
