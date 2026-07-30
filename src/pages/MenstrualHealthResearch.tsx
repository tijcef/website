import SimplePage from "@/components/site/SimplePage";
import Reveal from "@/components/site/Reveal";
import researchImg from "@/assets/research.jpg";
import { BookOpen, Droplets, GraduationCap, Users, Sparkles, Leaf, HeartPulse, Quote } from "lucide-react";

const observations = [
  {
    icon: Droplets,
    title: "Access to Menstrual Products",
    text: "Many adolescent girls report inconsistent or no access to sanitary pads, often relying on improvised materials, which may not be safe or hygienic.",
  },
  {
    icon: BookOpen,
    title: "Knowledge and Awareness",
    text: "A significant gap exists in menstrual health education, particularly among younger adolescents. Myths and misinformation continue to influence perceptions and practices.",
  },
  {
    icon: GraduationCap,
    title: "School Attendance & Participation",
    text: "Menstruation-related challenges contribute to absenteeism among girls, affecting their learning continuity and participation in school activities.",
  },
  {
    icon: Users,
    title: "WASH Facilities",
    text: "Many schools lack adequate water supply, private sanitation facilities, and disposal systems necessary for safe menstrual hygiene management.",
  },
];

const pillars = [
  {
    icon: HeartPulse,
    title: "Dignity",
    text: "Advancing menstrual health, wellbeing and respectful access to essential support.",
  },
  {
    icon: Sparkles,
    title: "Agency",
    text: "Equipping girls and young people to learn, lead and make informed decisions.",
  },
  {
    icon: Leaf,
    title: "Resilience",
    text: "Helping communities prepare, adapt and respond to environmental challenges.",
  },
  {
    icon: BookOpen,
    title: "Evidence",
    text: "Using research, impact measurement and learning to strengthen programmes.",
  },
];

const MenstrualHealthResearch = () => (
  <SimplePage
    eyebrow="Research · January 2026"
    title="State of Menstrual Health in Taraba and Adamawa States"
    subtitle="A contextual overview of menstrual health challenges, knowledge gaps, and access barriers affecting adolescent girls and women across selected communities."
    image={researchImg}
  >
    <div className="max-w-4xl mx-auto space-y-16">
      <Reveal>
        <section>
          <h2 className="font-display text-3xl mb-4">Introduction</h2>
          <p className="text-lg leading-relaxed text-foreground/90">
            The <strong>State of Menstrual Health in Taraba and Adamawa States</strong> provides a contextual overview of menstrual health challenges, knowledge gaps, and access barriers affecting adolescent girls and women in selected communities.
          </p>
          <p className="text-lg leading-relaxed text-foreground/90 mt-4">
            This document is part of TIJCEF's research-driven approach to understanding community needs and informing evidence-based interventions across health, gender equity, climate action, and community wellbeing.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section>
          <h2 className="font-display text-3xl mb-4">Research Context</h2>
          <p className="text-muted-foreground mb-4">
            Menstrual health remains a critical but under-addressed aspect of public health and gender equity in many rural and semi-urban communities in Taraba and Adamawa States. Key contributing factors include:
          </p>
          <ul className="space-y-2 text-foreground/90">
            {[
              "Limited access to affordable menstrual hygiene products",
              "Inadequate menstrual health education in schools and communities",
              "Cultural stigma and misinformation surrounding menstruation",
              "Insufficient WASH (Water, Sanitation, and Hygiene) facilities in schools",
            ].map((p) => (
              <li key={p} className="flex gap-3"><span className="text-accent mt-1">●</span><span>{p}</span></li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section>
          <h2 className="font-display text-3xl mb-8">Key Observations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {observations.map((o) => (
              <div key={o.title} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-elegant transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                    <o.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl">{o.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{o.text}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="p-8 md:p-10 rounded-2xl bg-secondary/40 border border-border">
          <h2 className="font-display text-3xl mb-6">Community Insights</h2>
          <p className="text-muted-foreground mb-4">Engagements in selected communities reveal that:</p>
          <ul className="space-y-3 text-foreground/90">
            {[
              "Menstruation is often discussed in silence",
              "Parents and guardians have limited structured knowledge to support girls",
              "Girls desire more information and dignity-based support systems",
              "Schools are seen as key entry points for change if adequately supported",
            ].map((i) => (
              <li key={i} className="flex gap-3"><span className="text-primary mt-1">–</span><span>{i}</span></li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section>
          <h2 className="font-display text-3xl mb-4">Implications for TIJCEF Programming</h2>
          <p className="text-muted-foreground mb-4">The findings from Taraba and Adamawa States inform TIJCEF's interventions in:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Menstrual health education and awareness programs",
              "Distribution of menstrual hygiene support materials",
              "School-based dignity and empowerment initiatives",
              "Community sensitization to reduce stigma",
              "Research-driven monitoring and evaluation frameworks",
            ].map((i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-border text-foreground/90">{i}</div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section>
          <h2 className="font-display text-3xl mb-6">Link to TIJCEF's Four Pillars</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="p-6 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-elegant">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-foreground/15 flex items-center justify-center">
                    <p.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display text-xl">{p.title}</h3>
                </div>
                <p className="text-sm text-primary-foreground/85 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="relative p-8 md:p-10 rounded-2xl bg-card border border-border">
          <Quote className="w-10 h-10 text-accent mb-4" />
          <h2 className="font-display text-3xl mb-4">Conclusion</h2>
          <p className="text-lg text-foreground/90 leading-relaxed">
            The state-level menstrual health landscape in Taraba and Adamawa highlights urgent gaps but also significant opportunities for impact. TIJCEF remains committed to using research as a foundation for designing interventions that restore dignity, improve access, and strengthen community systems for adolescent girls and women.
          </p>
          <div className="mt-6 text-sm text-muted-foreground">— Tijwun Care and Empowerment Foundation (TIJCEF)</div>
        </section>
      </Reveal>
    </div>
  </SimplePage>
);

export default MenstrualHealthResearch;
