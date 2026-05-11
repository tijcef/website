import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/site/SiteLayout";

const COPY: Record<string, { eyebrow: string; title: string; body: string }> = {
  partnership: {
    eyebrow: "Partnership inquiry received",
    title: "Thank you — we've got your details.",
    body: "Our partnerships team will review your message and reply from partner@tijcef.org within 3 business days. If your email client opened, please send the prefilled message to make sure we receive every detail.",
  },
  newsletter: {
    eyebrow: "You're almost subscribed",
    title: "Thanks for joining the TIJCEF circle.",
    body: "If your email app opened, please send the prefilled message so we can add you to our monthly stories from the field. We'll never share your email.",
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
              <a href="mailto:partner@tijcef.org"><Mail className="w-4 h-4" /> Email us directly</a>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default ThankYou;
