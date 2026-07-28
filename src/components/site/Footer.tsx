import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { submitPublicForm } from "@/lib/wordpress";
import logo from "@/assets/tijcef-logo.webp";

const emailSchema = z.string().trim().email({ message: "Please enter a valid email" }).max(255);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({ title: "Invalid email", description: result.error.issues[0].message, variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await submitPublicForm("newsletter", { email: result.data });
      setEmail("");
      navigate("/thank-you?type=newsletter");
    } catch (error) {
      toast({ title: "Subscription failed", description: error instanceof Error ? error.message : "Please try again.", variant: "destructive" });
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-20">
        {/* Newsletter band */}
        <div className="grid lg:grid-cols-2 gap-10 pb-16 border-b border-primary-foreground/15">
          <div>
            <h3 className="font-display text-3xl md:text-4xl leading-tight max-w-md">
              Stay close to the work. Stories from the field, monthly.
            </h3>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 self-end w-full max-w-xl"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="bg-primary-foreground/10 border-primary-foreground/25 text-primary-foreground placeholder:text-primary-foreground/55 h-12"
              required
              maxLength={255}
              disabled={submitting}
            />
            <Button type="submit" variant="gold" size="lg" disabled={submitting} aria-busy={submitting}>
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Subscribing…</>
              ) : (
                <>Subscribe <ArrowRight className="w-4 h-4" /></>
              )}
            </Button>
          </form>
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 pt-16">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center overflow-hidden">
                <img src={logo} alt="TIJCEF logo" className="w-full h-full object-contain p-0.5" />
              </div>
              <div>
                <div className="font-display text-xl">TIJCEF</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-primary-foreground/70">
                  Tijwun Care & Empowerment Foundation
                </div>
              </div>
            </div>
            <p className="text-primary-foreground/75 leading-relaxed text-sm max-w-sm">
              Empowering women and youth across Nigeria through health education, menstrual dignity, climate action, and research-driven programs.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-[0.18em] text-accent mb-4">Explore</div>
            <ul className="space-y-2.5 text-sm text-primary-foreground/80">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/pillars" className="hover:text-accent transition-colors">Our Pillars</Link></li>
              <li><Link to="/programs" className="hover:text-accent transition-colors">Programs</Link></li>
              <li><Link to="/resources" className="hover:text-accent transition-colors">Resources</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-[0.18em] text-accent mb-4">Grant Hub</div>
            <ul className="space-y-2.5 text-sm text-primary-foreground/80">
              <li><Link to="/grants" className="hover:text-accent transition-colors">Overview</Link></li>
              <li><Link to="/grants/grants" className="hover:text-accent transition-colors">Grants</Link></li>
              <li><Link to="/grants/scholarships" className="hover:text-accent transition-colors">Scholarships</Link></li>
              <li><Link to="/grants/fellowships" className="hover:text-accent transition-colors">Fellowships</Link></li>
              <li><Link to="/grants/jobs" className="hover:text-accent transition-colors">Jobs</Link></li>
              <li><Link to="/grants/internships" className="hover:text-accent transition-colors">Internships</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-[0.18em] text-accent mb-4">Act</div>
            <ul className="space-y-2.5 text-sm text-primary-foreground/80">
              <li><Link to="/donate" className="hover:text-accent transition-colors">Donate</Link></li>
              <li><Link to="/get-involved" className="hover:text-accent transition-colors">Volunteer</Link></li>
              <li><Link to="/get-involved" className="hover:text-accent transition-colors">Become a Partner</Link></li>
              <li><Link to="/get-involved" className="hover:text-accent transition-colors">Membership</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.18em] text-accent mb-4">Reach Us</div>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span>No. 1, Opposite Coca-Cola Junction, Jalingo, Nigeria</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:info@tijcef.org" className="hover:text-accent transition-colors">info@tijcef.org</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:+2347049314372" className="hover:text-accent transition-colors">+234 704 931 4372</a>
              </li>
            </ul>
            <div className="flex gap-2 mt-5">
              {[
                { Icon: Facebook, href: "https://facebook.com/tijcef", label: "Facebook" },
                { Icon: Instagram, href: "https://instagram.com/tijcef_ng", label: "Instagram" },
                { Icon: Twitter, href: "https://x.com/tijcef", label: "X (Twitter)" },
                { Icon: Linkedin, href: "https://linkedin.com/company/tijwun-care-and-empowerment-foundation", label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors" aria-label={label}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10 mt-10 border-t border-primary-foreground/15 flex flex-col md:flex-row justify-between gap-4 text-xs text-primary-foreground/60">
          <div>© {new Date().getFullYear()} Tijwun Care and Empowerment Foundation. All rights reserved.</div>
          <div className="flex flex-wrap gap-5">
            <span>Registered Nonprofit · Nigeria</span>
            <Link to="/privacy" className="hover:text-accent">Privacy</Link>
            <Link to="/transparency" className="hover:text-accent">Transparency</Link>
            <Link to="/safeguarding" className="hover:text-accent">Safeguarding</Link>
            <Link to="/complaints" className="hover:text-accent">Complaints</Link>
            <Link to="/terms" className="hover:text-accent">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
