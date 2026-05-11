import SimplePage from "@/components/site/SimplePage";
import Reveal from "@/components/site/Reveal";
import { Mail, Phone, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import healthImg from "@/assets/health-dignity.jpg";

const Contact = () => (
  <SimplePage
    eyebrow="Contact TIJCEF"
    title="Let's build something together."
    subtitle="For partnerships, press, programs, or general questions&nbsp; we'd love to hear from you."
    image={healthImg}
  >
    <div className="grid lg:grid-cols-5 gap-12 mb-20">
      <Reveal className="lg:col-span-2 space-y-8">
        {[
          { icon: Mail, label: "Email", value: "info@tijcef.org", href: "mailto:info@tijcef.org" },
          { icon: Phone, label: "Phone", value: "+234 704 931 4372", href: "tel:+2347049314372" },
          { icon: MessageCircle, label: "WhatsApp", value: "Chat with our team", href: "https://wa.me/2347049314372" },
          { icon: MapPin, label: "Office", value: "No 1. Opp Coca-Cola Junction, Jalingo, Nigeria" },
        ].map((c) => (
          <a key={c.label} href={c.href} className="flex items-start gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <c.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">{c.label}</div>
              <div className="font-display text-lg text-foreground group-hover:text-primary transition-colors">{c.value}</div>
            </div>
          </a>
        ))}
      </Reveal>

      <Reveal delay={150} className="lg:col-span-3">
        <form onSubmit={(e) => e.preventDefault()} className="p-8 md:p-10 rounded-2xl bg-card border border-border shadow-card space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Full name" required />
            <Input type="email" placeholder="Email" required />
          </div>
          <Input placeholder="Organization (optional)" />
          <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option>General inquiry</option>
            <option>Partnership / sponsorship</option>
            <option>Media / press</option>
            <option>Volunteer</option>
            <option>Donation question</option>
          </select>
          <Textarea placeholder="Tell us how we can help..." rows={6} required />
          <Button type="submit" variant="default" size="lg" className="w-full">
            Send Message <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      </Reveal>
    </div>

    <Reveal>
      <div className="rounded-2xl overflow-hidden border border-border shadow-card aspect-[21/9] bg-muted">
        <iframe
          title="TIJCEF Office Location"
          src="https://www.openstreetmap.org/export/embed.html?bbox=7.3675%2C9.0345%2C7.5675%2C9.1345&layer=mapnik&marker=9.0845%2C7.4675"
          className="w-full h-full"
          loading="lazy"
        />
      </div>
    </Reveal>
  </SimplePage>
);

export default Contact;
