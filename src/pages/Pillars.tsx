import SimplePage from "@/components/site/SimplePage";
import Reveal from "@/components/site/Reveal";
import { HeartPulse, Sparkles, Sprout, Microscope } from "lucide-react";
import healthImg from "@/assets/health-dignity.jpg";
import girlsImg from "@/assets/girls-education.jpg";
import climateImg from "@/assets/climate-action.jpg";
import researchImg from "@/assets/research.jpg";
import { programmeAreas } from "@/data/programmeAreas";

const pillarPresentation = {
  dignity: { icon: HeartPulse, img: healthImg, imgAlt: "Students displaying menstrual health materials during a TIJCEF school programme" },
  agency: { icon: Sparkles, img: girlsImg, imgAlt: "A TIJCEF team member speaking during a community programme" },
  resilience: { icon: Sprout, img: climateImg, imgAlt: "Participants attending a TIJCEF community training" },
  evidence: { icon: Microscope, img: researchImg, imgAlt: "TIJCEF team members and partners during a programme learning meeting" },
};

const pillars = programmeAreas.map((area) => ({
  ...area,
  ...pillarPresentation[area.slug],
}));

const Pillars = () => (
  <SimplePage
    eyebrow="Our Four Programme Areas"
    title="Plain language. Clear accountability."
    subtitle="Dignity, Agency, Resilience and Evidence remain TIJCEF's guiding framework. Each is paired with a clear programme area so communities, donors and partners can understand exactly what we deliver."
    image={girlsImg}
  >
    <div className="space-y-24">
      {pillars.map((p, i) => (
        <Reveal key={p.title}>
          <div id={p.slug} className={`scroll-mt-28 grid lg:grid-cols-2 gap-12 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <img src={p.img} alt={p.imgAlt} loading="lazy" width={1200} height={900} className="rounded-2xl shadow-elegant w-full aspect-[4/3] object-cover" />
            <div>
              <div className="w-14 h-14 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center mb-5">
                <p.icon className="w-7 h-7" />
              </div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{p.title}</div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">{p.name}</h2>
              <div className="space-y-5 text-foreground/80 leading-relaxed">
                <div>
                  <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">The Problem</div>
                  <p>{p.problem}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">Our Approach</div>
                  <p>{p.approach}</p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">Programme Activities</div>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {p.activities.map((prog) => (
                      <li key={prog} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {prog}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="inline-block px-4 py-2 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold">{p.sdgs}</div>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </SimplePage>
);

export default Pillars;
