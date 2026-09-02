import { Link } from "react-router-dom";
import { ArrowRight, BookOpenCheck, FileCheck2, Scale, ShieldCheck } from "lucide-react";
import SimplePage from "@/components/site/SimplePage";
import Reveal from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import researchImage from "@/assets/research.jpg";

const standards = [
  {
    icon: Scale,
    title: "Governance and responsibility",
    text: "Named leadership, operations, finance and safeguarding responsibilities support oversight and separation of key programme functions.",
  },
  {
    icon: ShieldCheck,
    title: "Safeguarding and PSEA",
    text: "Zero tolerance for exploitation, abuse and harassment, with consent, responsible storytelling and confidential reporting expectations.",
  },
  {
    icon: BookOpenCheck,
    title: "Monitoring, evaluation and learning",
    text: "Programme records support public reach figures. TIJCEF distinguishes attendance and delivery outputs from longer-term outcomes.",
  },
  {
    icon: FileCheck2,
    title: "Financial stewardship",
    text: "Donations and partner funds are recorded, designated where accepted and applied to approved charitable and operational purposes.",
  },
];

const dueDiligence = [
  ["Public now", "Annual report, programme evidence, leadership, safeguarding, complaints, privacy, donation and website policies."],
  ["For verified partners", "Registration and constitutional documents, bank confirmation, detailed budgets, workplans and references, subject to appropriate checks."],
  ["Project-specific", "Results framework, safeguarding risk review, implementation schedule, reporting calendar and agreed evidence requirements."],
];

export default function Transparency() {
  return (
    <SimplePage
      eyebrow="Transparency and Due Diligence"
      title="Trust should be testable."
      subtitle="TIJCEF gives communities, donors and institutional partners a clear route to assess our legal identity, programme evidence, safeguards and stewardship commitments."
      metaDescription="Review TIJCEF governance, programme evidence, safeguarding, financial stewardship, complaints and due-diligence information."
      image={researchImage}
    >
      <Reveal>
        <section className="mb-20" aria-labelledby="accountability-standards">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Accountability standards</div>
            <h2 id="accountability-standards" className="mt-4 text-4xl md:text-5xl">What prospective partners can examine.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              TIJCEF is a registered Nigerian nonprofit. Public claims are expected to be supported by programme records, corrected when necessary and presented without turning reach figures into unsupported outcome claims.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {standards.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border bg-card p-7 shadow-card">
                <Icon className="h-7 w-7 text-primary" />
                <h3 className="mt-5 text-2xl">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mb-20 rounded-3xl bg-muted/60 p-8 md:p-12" aria-labelledby="due-diligence-pack">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Partner due diligence</div>
              <h2 id="due-diligence-pack" className="mt-4 text-4xl">Documents matched to the relationship.</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Sensitive organisational documents are shared only with legitimate prospective funders, regulators and implementation partners.
              </p>
            </div>
            <div className="space-y-4">
              {dueDiligence.map(([label, text]) => (
                <div key={label} className="rounded-2xl border bg-background p-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">{label}</div>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mb-20" aria-labelledby="public-documents">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Public documents and channels</div>
          <h2 id="public-documents" className="mt-4 text-4xl">Review before you partner.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Corrected 2025 Annual Report", "/TIJCEF_ANNUAL_REPORT_2025.pdf"],
              ["Media and Press Kit", "/TIJCEF_PRESS_KIT.pdf"],
              ["Impact and Learning", "/impact"],
              ["Safeguarding and PSEA", "/safeguarding"],
              ["Complaints and Feedback", "/complaints"],
              ["Donation and Refund Policy", "/donation-policy"],
            ].map(([label, href]) => (
              href.endsWith(".pdf") ? (
                <a key={label} href={href} className="group flex items-center justify-between rounded-xl border p-5 font-semibold hover:border-primary/40 hover:text-primary">
                  {label}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              ) : (
                <Link key={label} to={href} className="group flex items-center justify-between rounded-xl border p-5 font-semibold hover:border-primary/40 hover:text-primary">
                  {label}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="rounded-3xl gradient-primary p-10 text-primary-foreground md:p-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Institutional enquiry</div>
              <h2 className="mt-4 text-3xl md:text-4xl">Request a due-diligence conversation.</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-primary-foreground/80">
                Tell us the proposed partnership, geography, programme area, funding range and documents required. TIJCEF will respond through an authorised contact.
              </p>
            </div>
            <Button asChild variant="gold" size="lg">
              <Link to="/get-involved#partner">Contact the partnership team <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </section>
      </Reveal>
    </SimplePage>
  );
}
