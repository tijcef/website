import SimplePage from "@/components/site/SimplePage";
import Reveal from "@/components/site/Reveal";
import { Target, Eye, Heart, Shield, Quote } from "lucide-react";

import researchImg from "@/assets/research.jpg";
import heroWoman from "@/assets/founder.webp";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.webp";

const team = [
  {
    name: "Arch. Praise Akipo",
    role: "PSEA and AAP Focal Person",
    img: team1,
  },
  {
    name: "Engr. Nuhu D. Mamtso",
    role: "Operations Officer",
    img: team2,
  },
  {
    name: "Mrs. Bege J. Edan",
    role: "Finance Officer",
    img: team3,
  },
  {
    name: "Emmanuel Sunday Tijwun",
    role: "Founder and Executive Director",
    img: team4,
  },
];

const About = () => (
  <SimplePage
    eyebrow="About TIJCEF"
    title="Built for women. Driven by youth. Accountable to communities."
    subtitle="Tijwun Care and Empowerment Foundation is a Nigerian nonprofit advancing dignity, agency, resilience and evidence with women and young people—especially adolescent girls."
    image={researchImg}
  >
    {/* Our Story */}
    <div className="grid lg:grid-cols-2 gap-16 mb-24">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">
          Our Story
        </div>

        <h2 className="font-display text-3xl md:text-4xl mb-6 leading-tight">
          A foundation born from a simple conviction.
        </h2>

        <p className="text-foreground/80 leading-relaxed mb-4">
          TIJCEF was founded on the belief that lasting change in Nigeria
          begins by recognising the dignity, potential and leadership of
          adolescent girls, women and young people in underserved communities.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          What began as a series of school health visits has grown into a
          multidisciplinary foundation working through four connected pillars:
          Dignity, Agency, Resilience and Evidence. Through these pillars, we
          deliver menstrual health support, education and leadership
          opportunities, climate action initiatives, and research-driven
          community programmes.
        </p>
      </Reveal>

      <Reveal delay={150}>
        <img
          src={researchImg}
          alt="TIJCEF team conducting research and programme documentation"
          loading="lazy"
          width={1200}
          height={900}
          className="rounded-2xl shadow-elegant w-full h-full object-cover"
        />
      </Reveal>
    </div>

    {/* Vision and Mission */}
    <div className="grid md:grid-cols-2 gap-6 mb-24">
      {[
        {
          icon: Eye,
          title: "Vision",
          body: "A resilient Nigeria where women and young people especially adolescent girls—live with dignity, exercise agency, build resilience and use evidence to thrive and lead sustainable communities.",
        },
        {
          icon: Target,
          title: "Mission",
          body: "To work with women and young people especially adolescent girls to advance dignity through health and menstrual support, strengthen agency through education and leadership, build resilience through climate action and sustainable opportunities, and generate evidence through research, monitoring and learning.",
        },
      ].map((item, index) => (
        <Reveal key={item.title} delay={index * 120}>
          <div className="p-10 rounded-2xl bg-card border border-border shadow-card h-full">
            <div className="w-12 h-12 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center mb-5">
              <item.icon className="w-6 h-6" />
            </div>

            <h3 className="font-display text-2xl md:text-3xl mb-4">
              {item.title}
            </h3>

            <p className="text-foreground/75 leading-relaxed">
              {item.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>

    {/* Word from the Founder */}
    <div className="mb-24">
      <div className="rounded-3xl overflow-hidden bg-primary text-primary-foreground shadow-elegant">
        <div className="grid lg:grid-cols-5">
          <Reveal className="lg:col-span-2 relative min-h-[360px]">
            <img
              src={heroWoman}
              alt="Emmanuel Sunday Tijwun, Founder and Executive Director of TIJCEF"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-primary/40" />
          </Reveal>

          <Reveal
            delay={120}
            className="lg:col-span-3 p-10 md:p-14 relative"
          >
            <Quote
              className="w-10 h-10 text-accent mb-6"
              aria-hidden="true"
            />

            <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">
              Word from the Founder
            </div>

            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-6">
              Dignity, agency, resilience and evidence guide our work.
            </h2>

            <div className="space-y-4 text-primary-foreground/85 leading-relaxed">
              <p>
                TIJCEF exists to expand practical opportunities for women and
                young people, particularly adolescent girls facing barriers to
                health information, dignity, education and meaningful
                participation.
              </p>

              <p>
                Our work is guided by four connected pillars: Dignity, Agency,
                Resilience and Evidence. We advance menstrual health and
                wellbeing, strengthen education and leadership, support
                climate-conscious communities, and use research and monitoring
                to improve our programmes.
              </p>

              <p>
                We listen first, work with communities, document our activities
                and remain accountable for the results we report. If you
                believe that women and young people are central to Nigeria’s
                sustainable future, I invite you to walk with us.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-primary-foreground/20">
              <div className="font-display text-xl">
                Emmanuel Sunday Tijwun
              </div>

              <div className="text-xs uppercase tracking-[0.18em] text-accent mt-1">
                Founder &amp; Executive Director, TIJCEF
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>

    {/* Team */}
    <div className="mb-24">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">
          Our Team
        </div>

        <h2 className="font-display text-3xl md:text-4xl mb-12">
          Meet the people behind the mission.
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, index) => (
          <Reveal key={member.name} delay={index * 100}>
            <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-elegant transition-all">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={member.img}
                  alt={`${member.name}, ${member.role} at TIJCEF`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5">
                <div className="font-display text-lg">
                  {member.name}
                </div>

                <div className="text-xs uppercase tracking-[0.18em] text-accent mt-1">
                  {member.role}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>

    {/* Core Values */}
    <div>
      <Reveal>
        <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">
          Core Values
        </div>

        <h2 className="font-display text-3xl md:text-4xl mb-12">
          What guides every decision.
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          {
            icon: Heart,
            title: "Dignity",
            description:
              "Every person is treated with respect, safety and recognition of their inherent worth.",
          },
          {
            icon: Shield,
            title: "Integrity",
            description:
              "Honest reporting, responsible stewardship and clear accountability.",
          },
          {
            icon: Target,
            title: "Impact",
            description:
              "We monitor activities and improve programmes using available evidence.",
          },
          {
            icon: Eye,
            title: "Inclusion",
            description:
              "Programmes are designed with the communities we serve, ensuring that diverse voices are heard.",
          },
        ].map((value, index) => (
          <Reveal key={value.title} delay={index * 80}>
            <div className="p-7 rounded-2xl border border-border hover:border-primary/30 hover:shadow-card transition-all h-full">
              <value.icon className="w-7 h-7 text-accent mb-4" />

              <h4 className="font-display text-xl mb-2">
                {value.title}
              </h4>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </SimplePage>
);
export default About;