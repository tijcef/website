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
  { name: "Arch. Praise Akipo", role: "PSEA and AAP Focal Person", img: team1 },
  { name: "Engr. Nuhu D. Mamtso", role: "Operations Officer", img: team2 },
  { name: "Mrs. Bege J. Edan", role: "Finance Officer", img: team3 },
  { name: "Emmanuel Sunday Tijwun", role: "Founder and Executive Director", img: team4 },
];

const About = () => (
  <SimplePage
    eyebrow="About TIJCEF"
    title="Built for women. Driven by youth. Accountable to communities."
    subtitle="Tijwun Care and Empowerment Foundation is a Nigerian nonprofit working at the intersection of health, dignity, climate, and evidence."
    image={researchImg}
  >
    <div className="grid lg:grid-cols-2 gap-16 mb-24">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">Our Story</div>
        <h2 className="font-display text-3xl md:text-4xl mb-6 leading-tight">A foundation born from a simple conviction.</h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          TIJCEF was founded on the belief that lasting change in Nigeria begins where it has too often been ignored with adolescent girls, women, and young people in underserved communities.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          What began as a series of school health visits has grown into a multidisciplinary foundation delivering programs across health education, menstrual dignity, climate action, and applied community research.
        </p>
      </Reveal>
      <Reveal delay={150}>
        <img src={researchImg} alt="TIJCEF research team" loading="lazy" width={1200} height={900} className="rounded-2xl shadow-elegant w-full h-full object-cover" />
      </Reveal>
    </div>

    <div className="grid md:grid-cols-2 gap-6 mb-24">
      {[
        { icon: Eye, title: "Vision", body: "A resilient Nigeria where women and youth  especially adolescent girls  have access to health, climate knowledge, and opportunities to thrive and lead sustainable communities." },
        { icon: Target, title: "Mission", body: "To empower women and youth through community-based health education, menstrual dignity support, climate action initiatives, and research-driven programs that improve wellbeing, resilience, and future opportunities." },
      ].map((b, i) => (
        <Reveal key={b.title} delay={i * 120}>
          <div className="p-10 rounded-2xl bg-card border border-border shadow-card h-full">
            <div className="w-12 h-12 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center mb-5">
              <b.icon className="w-6 h-6" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl mb-4">{b.title}</h3>
            <p className="text-foreground/75 leading-relaxed">{b.body}</p>
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
              alt="Portrait of TIJCEF Founder"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-primary/40" />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-3 p-10 md:p-14 relative">
            <Quote className="w-10 h-10 text-accent mb-6" aria-hidden="true" />
            <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">
              Word from the Founder
            </div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-6">
              Dignity, evidence and community leadership guide our work.
            </h2>
            <div className="space-y-4 text-primary-foreground/85 leading-relaxed">
              <p>
                TIJCEF exists to expand practical opportunities for women and young people, particularly adolescent girls facing barriers to health information, dignity and participation.
              </p>
              <p>
                Our work spans health education, menstrual dignity, climate action and applied research. We listen first, document our activities and work to strengthen accountability as the organisation grows.
              </p>
              <p>
                If you believe, as we do, that women and youth are the architects of Nigeria's future, I invite you to walk with us.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-primary-foreground/20">
              <div className="font-display text-xl">Emmanuel Sunday Tijwun</div>
              <div className="text-xs uppercase tracking-[0.18em] text-accent mt-1">
                Founder & Executive Director, TIJCEF
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>

    {/* Team */}
    <div className="mb-24">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">Our Team</div>
        <h2 className="font-display text-3xl md:text-4xl mb-12">Meet the people behind the mission.</h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((m, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-elegant transition-all">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={m.img} alt={m.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <div className="font-display text-lg">{m.name}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-accent mt-1">{m.role}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>

    <div>
      <Reveal>
        <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">Core Values</div>
        <h2 className="font-display text-3xl md:text-4xl mb-12">What guides every decision.</h2>
      </Reveal>
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { icon: Heart, title: "Dignity", desc: "Every person served is met with respect and agency." },
          { icon: Shield, title: "Integrity", desc: "Honest reporting, responsible stewardship and clear accountability." },
          { icon: Target, title: "Impact", desc: "We monitor activities and improve programmes using available evidence." },
          { icon: Eye, title: "Inclusion", desc: "Programs designed with the communities we serve." },
        ].map((v, i) => (
          <Reveal key={v.title} delay={i * 80}>
            <div className="p-7 rounded-2xl border border-border hover:border-primary/30 hover:shadow-card transition-all">
              <v.icon className="w-7 h-7 text-accent mb-4" />
              <h4 className="font-display text-xl mb-2">{v.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </SimplePage>
);

export default About;
