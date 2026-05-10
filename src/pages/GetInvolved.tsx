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
import healthImg from "@/assets/health-dignity.jpg";

const partnerSchema = z.object({
  organization: z.string().trim().min(1, "Organization is required").max(150),
  contactName: z.string().trim().min(1, "Contact name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  partnershipType: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Please share a brief message").max(2000),
});

const ways = [
  { icon: Heart, title: "Donate", desc: "Fuel programs that change lives — one-time or monthly.", cta: "Give now", to: "/donate", variant: "donate" as const },
  { icon: Handshake, title: "Partner", desc: "Foundations, CSR teams, and institutions building lasting impact.", cta: "Partner with us", to: "#partner", variant: "default" as const },
  { icon: UserPlus, title: "Volunteer", desc: "Lend your skills&nbsp; in the field, online, or behind the scenes.", cta: "Apply to volunteer", to: "#volunteer", variant: "secondary" as const },
  { icon: Users, title: "Become a Member", desc: "Join a community of advocates supporting our long-term mission.", cta: "Join TIJCEF", to: "#member", variant: "outline" as const },
];

const GetInvolved = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [partner, setPartner] = useState({
    organization: "",
    contactName: "",
    email: "",
    phone: "",
    partnershipType: "",
    message: "",
  });

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const result = partnerSchema.safeParse(partner);
    if (!result.success) {
      const first = result.error.issues[0];
      toast({ title: "Please review the form", description: first.message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const d = result.data;
    const subject = encodeURIComponent(`Partnership inquiry — ${d.organization}`);
    const body = encodeURIComponent(
      `Organization: ${d.organization}\nContact: ${d.contactName}\nEmail: ${d.email}\nPhone: ${d.phone || "—"}\nPartnership type: ${d.partnershipType || "—"}\n\nMessage:\n${d.message}`,
    );
    window.open(`mailto:partner@tijcef.org?subject=${subject}&body=${body}`, "_blank");
    setPartner({ organization: "", contactName: "", email: "", phone: "", partnershipType: "", message: "" });
    navigate("/thank-you?type=partnership");
  };

  return (
    <SimplePage
      eyebrow="Get Involved"
      title="Four ways to stand with us."
      subtitle="Every contribution&nbsp; financial, professional, or personal&nbsp; multiplies the impact of our work across Nigeria."
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
            We welcome health professionals, educators, climate scientists, designers, writers, researchers, and field volunteers across Nigeria and globally.
          </p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2 whitespace-pre-line"><span className="text-accent">✓</span>{"\n"}Flexible commitment&nbsp; remote or field-based</li>
            <li className="flex gap-2"><span className="text-accent">✓</span> Training and mentorship provided</li>
            <li className="flex gap-2"><span className="text-accent">✓</span> Letters of service & professional references</li>
          </ul>
        </Reveal>
        <Reveal delay={150}>
          <form onSubmit={(e) => e.preventDefault()} className="p-8 md:p-10 rounded-2xl bg-muted/50 border border-border space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input placeholder="First name" required maxLength={100} />
              <Input placeholder="Last name" required maxLength={100} />
            </div>
            <Input type="email" placeholder="Email address" required maxLength={255} />
            <Input placeholder="Location (City, State)" maxLength={150} />
            <Input placeholder="Area of expertise" maxLength={150} />
            <Textarea placeholder="Why do you want to volunteer with TIJCEF?" rows={4} maxLength={2000} />
            <Button type="submit" variant="default" size="lg" className="w-full">Submit Application <ArrowRight className="w-4 h-4" /></Button>
          </form>
        </Reveal>
      </div>

      <Reveal>
        <div id="partner" className="rounded-2xl gradient-primary p-10 md:p-16 text-primary-foreground mb-12">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">Partnership Inquiry</div>
            <h3 className="font-display text-3xl md:text-4xl leading-tight mb-3">Ready to build something measurable together?</h3>
            <p className="text-primary-foreground/80">Foundations, CSR programs, government grants, and academic collaborations&nbsp; tell us about your organization and we'll be in touch.</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <form onSubmit={handlePartnerSubmit} className="p-8 md:p-10 rounded-2xl bg-card border border-border shadow-card space-y-4 max-w-3xl mx-auto">
          <fieldset disabled={submitting} className="space-y-4 disabled:opacity-70">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                placeholder="Organization name"
                value={partner.organization}
                onChange={(e) => setPartner({ ...partner, organization: e.target.value })}
                required
                maxLength={150}
              />
              <Input
                placeholder="Contact person"
                value={partner.contactName}
                onChange={(e) => setPartner({ ...partner, contactName: e.target.value })}
                required
                maxLength={100}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                type="email"
                placeholder="Work email"
                value={partner.email}
                onChange={(e) => setPartner({ ...partner, email: e.target.value })}
                required
                maxLength={255}
              />
              <Input
                type="tel"
                placeholder="Phone (optional)"
                value={partner.phone}
                onChange={(e) => setPartner({ ...partner, phone: e.target.value })}
                maxLength={30}
              />
            </div>
            <select
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
            <Textarea
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
            Inquiries are sent to <a href="mailto:partner@tijcef.org" className="underline hover:text-accent">partner@tijcef.org</a>.
          </p>
        </form>
      </Reveal>
    </SimplePage>
  );
};

export default GetInvolved;
