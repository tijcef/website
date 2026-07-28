import { FormEvent, useState } from "react";
import SimplePage from "@/components/site/SimplePage";
import Reveal from "@/components/site/Reveal";
import PageMeta from "@/components/site/PageMeta";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitPublicForm } from "@/lib/wordpress";
import healthImg from "@/assets/health-dignity.jpg";

export default function Contact() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setStatus("");
    try {
      await submitPublicForm("inquiries", { kind: "contact", ...Object.fromEntries(new FormData(form)) });
      form.reset();
      setStatus("Thank you. Your message has been received.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Your message could not be sent.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageMeta title="Contact" description="Contact TIJCEF about programmes, partnerships, volunteering, donations or media enquiries." />
      <SimplePage eyebrow="Contact TIJCEF" title="Let's build something together." subtitle="For partnerships, media, programmes or general questions, contact our team." image={healthImg}>
        <div className="mb-20 grid gap-12 lg:grid-cols-5">
          <Reveal className="space-y-8 lg:col-span-2">
            {[
              { icon: Mail, label: "Email", value: "info@tijcef.org", href: "mailto:info@tijcef.org" },
              { icon: Phone, label: "Phone", value: "+234 704 931 4372", href: "tel:+2347049314372" },
              { icon: MessageCircle, label: "WhatsApp", value: "Chat with our team", href: "https://wa.me/2347049314372" },
              { icon: MapPin, label: "Office", value: "No. 1, Opposite Coca-Cola Junction, Jalingo, Nigeria" },
            ].map((item) => {
              const content = <><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><item.icon className="h-5 w-5" /></div><div><div className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">{item.label}</div><div className="font-display text-lg">{item.value}</div></div></>;
              return item.href ? <a key={item.label} href={item.href} className="flex items-start gap-4">{content}</a> : <div key={item.label} className="flex items-start gap-4">{content}</div>;
            })}
          </Reveal>
          <Reveal delay={150} className="lg:col-span-3">
            <form onSubmit={submit} className="space-y-4 rounded-2xl border bg-card p-8 shadow-card md:p-10">
              <input name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input name="name" aria-label="Full name" placeholder="Full name" required maxLength={120} />
                <Input name="email" aria-label="Email address" type="email" placeholder="Email" required maxLength={255} />
              </div>
              <Input name="organization" aria-label="Organisation" placeholder="Organization (optional)" maxLength={160} />
              <select name="subject" aria-label="Enquiry subject" className="h-10 w-full rounded-md border bg-background px-3 text-sm">
                <option>General inquiry</option><option>Partnership or sponsorship</option><option>Media or press</option><option>Volunteer</option><option>Donation question</option><option>Safeguarding or complaint</option>
              </select>
              <Textarea name="message" aria-label="Message" placeholder="Tell us how we can help…" rows={6} required maxLength={3000} />
              <Button type="submit" size="lg" className="w-full" disabled={busy}>{busy ? "Sending…" : "Send Message"} <ArrowRight className="h-4 w-4" /></Button>
              {status && <p role="status" className="rounded-lg bg-muted p-3 text-sm">{status}</p>}
            </form>
          </Reveal>
        </div>
        <Reveal><div className="aspect-[21/9] overflow-hidden rounded-2xl border bg-muted shadow-card"><iframe title="General location of TIJCEF office in Jalingo" src="https://www.openstreetmap.org/export/embed.html?bbox=11.25%2C8.80%2C11.47%2C9.00&layer=mapnik&marker=8.8937%2C11.3596" className="h-full w-full" loading="lazy" /></div><p className="mt-2 text-xs text-muted-foreground">Map indicates the general Jalingo area. Contact the office for directions before visiting.</p></Reveal>
      </SimplePage>
    </>
  );
}
