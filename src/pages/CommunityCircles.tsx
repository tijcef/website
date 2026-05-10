import SimplePage from "@/components/site/SimplePage";
import Reveal from "@/components/site/Reveal";
import researchImg from "@/assets/research.jpg";
import { Users, Heart, Sparkles, Leaf, HandHeart, Quote } from "lucide-react";

const insights = [
  {
    icon: Heart,
    title: "Menstrual Health & Dignity",
    points: [
      "Many adolescent girls still lack access to affordable menstrual products.",
      "Stigma and silence remain major barriers to open discussion.",
      "School attendance is affected during menstruation in some communities.",
    ],
  },
  {
    icon: Sparkles,
    title: "Gender Equity & Empowerment",
    points: [
      "Girls expressed a desire for more confidence-building opportunities.",
      "Limited access to mentorship and life-skills training was highlighted.",
      "Community norms still influence girls' participation in decision-making.",
    ],
  },
  {
    icon: Leaf,
    title: "Climate Action & Environment",
    points: [
      "Communities recognize environmental changes but lack structured knowledge.",
      "Waste management practices are limited in many areas.",
      "Youth showed strong interest in participating in environmental action.",
    ],
  },
  {
    icon: HandHeart,
    title: "Community Wellbeing & Systems",
    points: [
      "There is strong trust in community-based interventions.",
      "Local leaders play a key role in shaping acceptance of programs.",
      "More sustained engagement is needed for long-term impact.",
    ],
  },
];

const lessons = [
  "Listening directly to communities improves program relevance.",
  "Integrated solutions are more effective than single-issue approaches.",
  "Trust and consistency are critical for impact.",
  "Youth and women are eager to participate when given safe spaces.",
];

const implications = [
  "Health — especially menstrual dignity",
  "Gender equity and empowerment programs",
  "Climate action initiatives",
  "Research-driven community interventions",
];

const CommunityCircles = () => (
  <SimplePage
    eyebrow="Field Reflections · September 2025"
    title="What we learned from 12 community circles."
    subtitle="Field reflections from TIJCEF's community wellbeing program — listening to women, girls, youth, and elders across local settings."
    image={researchImg}
  >
    <div className="max-w-4xl mx-auto space-y-16">
      {/* Intro */}
      <Reveal>
        <div className="prose prose-lg max-w-none text-foreground/90">
          <p className="text-lg leading-relaxed">
            Over the course of our community engagement work, <strong>TIJCEF facilitated 12 community circles</strong> across different local settings to better understand lived experiences around health, gender, climate, and community wellbeing.
          </p>
          <p className="text-lg leading-relaxed">
            These circles created safe spaces for dialogue, reflection, and shared learning with women, girls, youth, and community members.
          </p>
        </div>
      </Reveal>

      {/* Purpose */}
      <Reveal>
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="font-display text-3xl">Purpose of the Community Circles</h2>
          </div>
          <p className="text-muted-foreground mb-4">The community circles aimed to:</p>
          <ul className="space-y-2 text-foreground/90">
            {[
              "Listen directly to community needs and challenges",
              "Understand barriers to menstrual health and dignity",
              "Explore perceptions around gender equity and empowerment",
              "Learn community views on climate and environmental issues",
              "Strengthen participatory, research-driven programming",
            ].map((p) => (
              <li key={p} className="flex gap-3">
                <span className="text-accent mt-1">●</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* Key insights */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl mb-8">Key Insights from the 12 Circles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {insights.map((it) => (
              <div key={it.title} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-elegant transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                    <it.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl">{it.title}</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  {it.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-primary mt-1">–</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* What we learned */}
      <Reveal>
        <section className="p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-elegant">
          <h2 className="font-display text-3xl mb-6">What We Learned</h2>
          <p className="text-primary-foreground/85 mb-6">From these 12 community circles, TIJCEF learned that:</p>
          <ul className="space-y-3">
            {lessons.map((l) => (
              <li key={l} className="flex gap-3">
                <span className="text-accent font-bold">✓</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* Implications */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl mb-6">Implications for TIJCEF's Work</h2>
          <p className="text-muted-foreground mb-4">These insights continue to shape TIJCEF's approach across:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {implications.map((i) => (
              <div key={i} className="p-4 rounded-xl bg-secondary/40 border border-border text-foreground/90">
                {i}
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Conclusion */}
      <Reveal>
        <section className="relative p-8 md:p-10 rounded-2xl bg-card border border-border">
          <Quote className="w-10 h-10 text-accent mb-4" />
          <h2 className="font-display text-3xl mb-4">Conclusion</h2>
          <p className="text-lg text-foreground/90 leading-relaxed mb-3">
            The 12 community circles reaffirmed TIJCEF's belief that <strong>sustainable change begins with listening</strong>.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            By centering community voices, we continue to design programs that are responsive, inclusive, and impactful.
          </p>
          <div className="mt-6 text-sm text-muted-foreground">— Tijwun Care and Empowerment Foundation (TIJCEF)</div>
        </section>
      </Reveal>
    </div>
  </SimplePage>
);

export default CommunityCircles;
