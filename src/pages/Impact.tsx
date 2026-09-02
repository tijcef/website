import { ArrowRight, BarChart3, BookOpenCheck, MapPinned, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Counter from "@/components/site/Counter";
import Reveal from "@/components/site/Reveal";
import SimplePage from "@/components/site/SimplePage";
import { Button } from "@/components/ui/button";
import researchImg from "@/assets/research.jpg";
import { approvedImpact } from "@/data/programmeAreas";

const headlineResults = [
  { value: approvedImpact.cumulativeReach, suffix: "+", label: "People reached cumulatively" },
  { value: approvedImpact.reach2026, suffix: "+", label: "People reached in 2026" },
  { value: approvedImpact.programmeAreas, suffix: "", label: "Programme areas" },
  { value: approvedImpact.statesWithActivities, suffix: "", label: "States with activities" },
];

const activityEvidence = [
  {
    title: "Menstrual dignity at Government Girls College",
    place: "Yola · February 2026",
    result: "Approximately 400 girls engaged",
    detail: "Health education and dignity support delivered through a school-based outreach.",
    source: "Activity register and programme documentation",
  },
  {
    title: "School outreach at Adroit International Academy",
    place: "Yola · 2026",
    result: "Approximately 200 learners engaged",
    detail: "Menstrual health and confidence-building engagement delivered with Lead the Girl Foundation.",
    source: "Partner and programme documentation",
  },
  {
    title: "Youth Empowerment Seminar",
    place: "Girei LGA · 2026",
    result: "50 young people trained",
    detail: "Entrepreneurial skills, self-reliance and leadership development at Zion Centre.",
    source: "Attendance and activity records",
  },
  {
    title: "Women’s Leadership Empowerment",
    place: "Taraba State · 2026",
    result: "45 women engaged",
    detail: "A focused programme supporting women’s leadership, participation and agency.",
    source: "Attendance and activity records",
  },
];

export default function Impact() {
  return (
    <SimplePage
      eyebrow="Impact and Learning"
      title="Evidence people can see. Learning communities can use."
      subtitle="We report approved reach figures, show how activities were documented and distinguish immediate delivery from longer-term change."
      metaDescription="Explore TIJCEF's verified reach, 2026 programme evidence, measurement approach and accountability commitments across Nigeria."
      image={researchImg}
    >
      <Reveal>
        <section aria-labelledby="impact-at-a-glance" className="mb-20">
          <div className="mb-10 max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Impact at a glance</div>
            <h2 id="impact-at-a-glance" className="mt-4 text-4xl md:text-5xl">Verified figures, presented with context.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Figures are drawn from TIJCEF programme records and reviewed before public reporting. They describe documented reach, not unique-person counts across every year or guaranteed long-term outcomes.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {headlineResults.map((item) => (
              <div key={item.label} className="rounded-2xl border bg-card p-7 shadow-card">
                <div className="font-display text-4xl text-primary">
                  <Counter end={item.value} suffix={item.suffix} />
                </div>
                <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <section aria-labelledby="recent-evidence" className="mb-20">
        <Reveal>
          <div className="mb-10 max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">2026 programme evidence</div>
            <h2 id="recent-evidence" className="mt-4 text-4xl md:text-5xl">Recent delivery snapshots.</h2>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {activityEvidence.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <article className="h-full rounded-2xl border bg-card p-7 shadow-card">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                  <MapPinned className="h-4 w-4" /> {item.place}
                </div>
                <h3 className="mt-4 text-2xl leading-tight">{item.title}</h3>
                <div className="mt-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {item.result}
                </div>
                <p className="mt-4 leading-relaxed text-muted-foreground">{item.detail}</p>
                <div className="mt-5 border-t pt-4 text-xs text-muted-foreground">
                  <strong className="text-foreground">Evidence source:</strong> {item.source}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="mb-20 rounded-3xl border bg-card p-8 shadow-card md:p-12" aria-labelledby="measurement-framework">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Measurement framework</div>
              <h2 id="measurement-framework" className="mt-4 text-4xl md:text-5xl">From activity to outcome.</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                TIJCEF uses a proportionate results chain for each project. Indicators and tools are agreed before delivery, then reviewed with partners and programme teams.
              </p>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {[
                ["1. Inputs", "People, partner contributions, materials and approved budgets."],
                ["2. Activities", "Sessions, outreach, training, service days and research tasks delivered."],
                ["3. Outputs", "Attendance, completion, materials distributed and evidence produced."],
                ["4. Outcomes", "Changes in knowledge, confidence, practice or community capacity measured where feasible."],
              ].map(([title, text]) => (
                <li key={title} className="rounded-2xl bg-muted/60 p-6">
                  <h3 className="text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mb-20 grid gap-6 lg:grid-cols-3" aria-label="TIJCEF impact standards">
          {[
            { icon: BarChart3, title: "Measure", text: "Use attendance, activity and feedback records suited to each programme." },
            { icon: BookOpenCheck, title: "Learn", text: "Review what worked, what changed and what should improve before the next cycle." },
            { icon: ShieldCheck, title: "Protect", text: "Report responsibly without exposing children, vulnerable people or sensitive locations." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-muted/60 p-8">
              <Icon className="h-7 w-7 text-primary" />
              <h2 className="mt-5 text-2xl">{title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </section>
      </Reveal>

      <Reveal>
        <section className="rounded-3xl gradient-primary p-10 text-primary-foreground md:p-14">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Accountability in action</div>
              <h2 className="mt-4 max-w-2xl text-3xl md:text-4xl">Read the evidence behind our public commitments.</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-primary-foreground/80">
                Our corrected annual report, safeguarding commitments, media tracker and transparency centre explain how TIJCEF manages programmes, risk, learning and public claims.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild variant="gold" size="lg">
                <a href="/TIJCEF_ANNUAL_REPORT_2025.pdf">Read the annual report <ArrowRight className="h-4 w-4" /></a>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/transparency">Transparency centre</Link>
              </Button>
              <Button asChild variant="heroOutline" size="lg">
                <Link to="/media-coverage">Media and mentions</Link>
              </Button>
            </div>
          </div>
        </section>
      </Reveal>
    </SimplePage>
  );
}
