import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/site/SiteLayout";

const COPY: Record<string, { eyebrow: string; title: string; body: string }> = {
  partnership: {
    eyebrow: "Partnership inquiry received",
    title: "Thank you — we've got your details.",
    body: "Our team will review your message and respond using the contact details you provided.",
  },
  newsletter: {
    eyebrow: "Subscription received",
    title: "Thanks for joining the TIJCEF circle.",
    body: "Your address has been added to our newsletter list. You may request removal at any time.",
  },
  volunteer: {
    eyebrow: "Volunteer application received",
    title: "Thank you for offering your time and skills.",
    body: "Our volunteer team will review your application and contact you if a suitable opportunity is available.",
  },
  default: {
    eyebrow: "Submission received",
    title: "Thank you for reaching out.",
    body: "We've received your message and will be in touch soon.",
  },
};

const ThankYou = () => {
  const [params] = useSearchParams();
  const type = params.get("type") ?? "default";
  const c = COPY[type] ?? COPY.default;

  return (
    <SiteLayout>
      <section className="container py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full gradient-primary text-primary-foreground flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-4">{c.eyebrow}</div>
          <h1 className="font-display text-4xl md:text-5xl leading-tight mb-5">{c.title}</h1>
          <p className="text-foreground/75 leading-relaxed mb-10">{c.body}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="default" size="lg">
              <Link to="/">Back to home <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="mailto:info@tijcef.org"><Mail className="w-4 h-4" /> Email us directly</a>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default ThankYou;
