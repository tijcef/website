import SimplePage from "@/components/site/SimplePage";
import Reveal from "@/components/site/Reveal";
import { Heart, Users, Handshake, UserPlus, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { submitPublicForm } from "@/lib/wordpress";
import healthImg from "@/assets/health-dignity.jpg";

const partnerSchema = z.object({
  organization: z.string().trim().min(1, "Organization is required").max(150),
  contactName: z.string().trim().min(1, "Contact name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  partnershipType: z.string().trim().max(100).optional().or(z.literal("")),
  programmeArea: z.string().trim().max(120).optional().or(z.literal("")),
  geography: z.string().trim().max(150).optional().or(z.literal("")),
  fundingRange: z.string().trim().max(100).optional().or(z.literal("")),
  timeline: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Please share a brief message").max(2000),
  website: z.literal("").optional(),
});

const ways = [
  { icon: Heart, title: "Donate", desc: "Support approved programmes through a one-time gift.", cta: "Give now", to: "/donate", variant: "donate" as const },
  { icon: Handshake, title: "Partner", desc: "Foundations, CSR teams, and institutions building lasting impact.", cta: "Partner with us", to: "#partner", variant: "default" as const },
  { icon: UserPlus, title: "Volunteer", desc: "Lend your skills—in the field, online or behind the scenes.", cta: "Apply to volunteer", to: "#volunteer", variant: "secondary" as const },
  { icon: Users, title: "Join Our Network", desc: "Connect with TIJCEF as a community advocate or institutional collaborator.", cta: "Contact TIJCEF", to: "/contact", variant: "outline" as const },
];

const GetInvolved = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [volunteerSubmitting, setVolunteerSubmitting] = useState(false);
  const [partner, setPartner] = useState({
    organization: "",
    contactName: "",
    email: "",
    phone: "",
    partnershipType: "",
    programmeArea: "",
    geography: "",
    fundingRange: "",
    timeline: "",
    message: "",
    website: "",
  });

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const result = partnerSchema.safeParse(partner);
    if (!result.success) {
      const first = result.error.issues[0];
      toast({ title: "Please review the form", description: first.message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await submitPublicForm("inquiries", { kind: "partnership", ...result.data });
      setPartner({ organization: "", contactName: "", email: "", phone: "", partnershipType: "", programmeArea: "", geography: "", fundingRange: "", timeline: "", message: "", website: "" });
      navigate("/thank-you?type=partnership");
    } catch (error) {
      toast({ title: "Submission failed", description: error instanceof Error ? error.message : "Please try again.", variant: "destructive" });
      setSubmitting(false);
    }
  };

  const handleVolunteerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (volunteerSubmitting) return;
    const form = e.currentTarget;
    setVolunteerSubmitting(true);
    try {
      await submitPublicForm("inquiries", { kind: "volunteer", ...Object.fromEntries(new FormData(form)) });
      form.reset();
      navigate("/thank-you?type=volunteer");
    } catch (error) {
      toast({ title: "Submission failed", description: error instanceof Error ? error.message : "Please try again.", variant: "destructive" });
      setVolunteerSubmitting(false);
    }
  };

  return (
    <SimplePage
      eyebrow="Get Involved"
      title="Choose a clear route to support or partner."
      subtitle="Donate, volunteer or begin an institutional conversation with the information our team needs to respond responsibly."
      image={healthImg}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {ways.map((w, i) => (
          <Reveal key={w.title} delay={i * 80}>
            <div className="p-8 rounded-2xl bg-card border border-border h-full flex flex-col shadow-card hover:shadow-elegant transition-all">
              <div className="w-12 h-12 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center mb-5">
                <w.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl mb-3">{w.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{w.desc}</p>
              <Button asChild variant={w.variant} size="sm">
                <Link to={w.to}>{w.cta} <ArrowRight className="w-4 h-4" /></Link>
              </Button>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-24" id="volunteer">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">Volunteer Application</div>
          <h2 className="font-display text-4xl md:text-5xl mb-5 leading-tight">Bring your skills to the work.</h2>
          <p className="text-foreground/75 leading-relaxed mb-6">
            We welcome health professionals, educators, environmental practitioners, designers, writers, researchers and field volunteers whose skills match an approved TIJCEF activity.
          </p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><span className="text-accent">✓</span>Flexible commitment—remote or field-based</li>
            <li className="flex gap-2"><span className="text-accent">✓</span> Training and mentorship provided</li>
            <li className="flex gap-2"><span className="text-accent">✓</span>Letters of service after verified completion; references considered case by case</li>
          </ul>
        </Reveal>
        <Reveal delay={150}>
          <form onSubmit={handleVolunteerSubmit} className="p-8 md:p-10 rounded-2xl bg-muted/50 border border-border space-y-4">
            <input name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input name="firstName" aria-label="First name" placeholder="First name" required maxLength={100} />
              <Input name="lastName" aria-label="Last name" placeholder="Last name" required maxLength={100} />
            </div>
            <Input name="email" aria-label="Email address" type="email" placeholder="Email address" required maxLength={255} />
            <Input name="location" aria-label="Location" placeholder="Location (City, State)" maxLength={150} />
            <Input name="expertise" aria-label="Area of expertise" placeholder="Area of expertise" maxLength={150} />
            <Textarea name="message" aria-label="Reason for volunteering" placeholder="Why do you want to volunteer with TIJCEF?" rows={4} required maxLength={2000} />
            <Button type="submit" variant="default" size="lg" className="w-full" disabled={volunteerSubmitting}>{volunteerSubmitting ? "Submitting…" : "Submit Application"} <ArrowRight className="w-4 h-4" /></Button>
          </form>
        </Reveal>
      </div>

      <Reveal>
        <div id="partner" className="rounded-2xl gradient-primary p-10 md:p-16 text-primary-foreground mb-12">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">Partnership Inquiry</div>
            <h3 className="font-display text-3xl md:text-4xl leading-tight mb-3">Ready to build something measurable together?</h3>
            <p className="text-primary-foreground/80">Foundations, CSR programmes, government, academic and nonprofit collaborators: share the proposed programme, geography, funding range and timeline for an informed response.</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <form onSubmit={handlePartnerSubmit} className="p-8 md:p-10 rounded-2xl bg-card border border-border shadow-card space-y-4 max-w-3xl mx-auto">
          <fieldset disabled={submitting} className="space-y-4 disabled:opacity-70">
            <input aria-hidden="true" tabIndex={-1} autoComplete="off" className="hidden" value={partner.website} onChange={(e) => setPartner({ ...partner, website: e.target.value })} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                aria-label="Organisation name"
                placeholder="Organization name"
                value={partner.organization}
                onChange={(e) => setPartner({ ...partner, organization: e.target.value })}
                required
                maxLength={150}
              />
              <Input
                aria-label="Contact person"
                placeholder="Contact person"
                value={partner.contactName}
                onChange={(e) => setPartner({ ...partner, contactName: e.target.value })}
                required
                maxLength={100}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                aria-label="Work email"
                type="email"
                placeholder="Work email"
                value={partner.email}
                onChange={(e) => setPartner({ ...partner, email: e.target.value })}
                required
                maxLength={255}
              />
              <Input
                aria-label="Phone number"
                type="tel"
                placeholder="Phone (optional)"
                value={partner.phone}
                onChange={(e) => setPartner({ ...partner, phone: e.target.value })}
                maxLength={30}
              />
            </div>
            <select
              aria-label="Type of partnership"
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm disabled:cursor-not-allowed"
              value={partner.partnershipType}
              onChange={(e) => setPartner({ ...partner, partnershipType: e.target.value })}
            >
              <option value="">Type of partnership</option>
              <option>Foundation / Grant</option>
              <option>Corporate / CSR</option>
              <option>Government</option>
              <option>Academic / Research</option>
              <option>NGO / Implementing partner</option>
              <option>Other</option>
            </select>
            <div className="grid sm:grid-cols-2 gap-4">
              <select
                aria-label="Programme area"
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm disabled:cursor-not-allowed"
                value={partner.programmeArea}
                onChange={(e) => setPartner({ ...partner, programmeArea: e.target.value })}
              >
                <option value="">Programme area</option>
                <option>Health, Menstrual Dignity & WASH</option>
                <option>Education, Skills & Leadership</option>
                <option>Climate Action & Stronger Communities</option>
                <option>Research, Learning & Advocacy</option>
                <option>Multi-area partnership</option>
              </select>
              <Input
                aria-label="Proposed geography"
                placeholder="Proposed geography"
                value={partner.geography}
                onChange={(e) => setPartner({ ...partner, geography: e.target.value })}
                maxLength={150}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                aria-label="Indicative funding range"
                placeholder="Indicative funding range"
                value={partner.fundingRange}
                onChange={(e) => setPartner({ ...partner, fundingRange: e.target.value })}
                maxLength={100}
              />
              <Input
                aria-label="Proposed timeline"
                placeholder="Proposed timeline"
                value={partner.timeline}
                onChange={(e) => setPartner({ ...partner, timeline: e.target.value })}
                maxLength={100}
              />
            </div>
            <Textarea
              aria-label="Partnership message"
              placeholder="Tell us about your organization and the partnership you have in mind…"
              rows={6}
              value={partner.message}
              onChange={(e) => setPartner({ ...partner, message: e.target.value })}
              required
              maxLength={2000}
            />
          </fieldset>
          <Button type="submit" variant="default" size="lg" className="w-full" disabled={submitting} aria-busy={submitting}>
            {submitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
            ) : (
              <>Submit Partnership Inquiry <ArrowRight className="w-4 h-4" /></>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            By submitting, you agree to our <Link to="/privacy" className="underline hover:text-accent">privacy notice</Link>. You may also contact <a href="mailto:info@tijcef.org" className="underline hover:text-accent">info@tijcef.org</a>.
          </p>
        </form>
      </Reveal>
    </SimplePage>
  );
};

export default GetInvolved;
