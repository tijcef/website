import { useState } from "react";
import SimplePage from "@/components/site/SimplePage";
import Reveal from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Shield, ArrowRight, Sparkles, Sprout, HeartPulse, CreditCard, Globe, Landmark, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import girlsImg from "@/assets/girls-education.jpg";

const amounts = [5000, 10000, 25000, 50000, 100000, 250000];
const impacts: Record<number, string> = {
  5000: "Provides menstrual hygiene supplies for one girl for 6 months",
  10000: "Sponsors one girl through a full school year of dignity supplies",
  25000: "Funds a community health workshop for 50 women",
  50000: "Supports a youth climate workshop in one community",
  100000: "Trains and equips one Green Futures climate fellow",
  250000: "Funds an entire school's Pad-A-Girl program for one term",
};

const bankDetails = {
  bank: "Zenith Bank Plc",
  accountName: "Tijwun Care and Empowerment Foundation",
  accountNumber: "1311675477",
};

const PAYSTACK_PUBLIC_KEY = "pk_live_c30e73fb9f4d22233712b946402a67b4a192f220";
const PAYPAL_EMAIL = "info@tijcef.org";

declare global {
  interface Window {
    PaystackPop?: { setup: (opts: Record<string, unknown>) => { openIframe: () => void } };
  }
}

const Donate = () => {
  const [type, setType] = useState<"once" | "monthly">("monthly");
  const [amount, setAmount] = useState(10000);
  const [custom, setCustom] = useState("");
  const [designation, setDesignation] = useState("where-needed");
  const [method, setMethod] = useState<"paystack" | "paypal" | "bank">("paystack");
  const [copied, setCopied] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const finalAmount = custom ? Number(custom) : amount;

  const copy = (key: string, value: string) => {
    navigator.clipboard?.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  };

  const handleDonate = () => {
    if (method === "bank") return;
    if (!finalAmount || finalAmount < 100) {
      alert("Please enter a valid donation amount.");
      return;
    }
    if (method === "paystack") {
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        alert("Please enter a valid email address for your receipt.");
        return;
      }
      if (!window.PaystackPop) {
        alert("Payment is still loading. Please try again in a moment.");
        return;
      }
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email,
        amount: finalAmount * 100,
        currency: "NGN",
        ref: `TIJCEF-${Date.now()}`,
        metadata: {
          custom_fields: [
            { display_name: "Designation", variable_name: "designation", value: designation },
            { display_name: "Frequency", variable_name: "frequency", value: type },
          ],
        },
      });
      handler.openIframe();
      return;
    }
    if (method === "paypal") {
      const usd = (finalAmount / 1500).toFixed(2);
      const params = new URLSearchParams({
        cmd: "_donations",
        business: PAYPAL_EMAIL,
        item_name: `TIJCEF Donation (${designation})`,
        currency_code: "USD",
        amount: usd,
      });
      window.open(`https://www.paypal.com/donate?${params.toString()}`, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <SimplePage
      eyebrow="Donate to TIJCEF"
      title="Your gift becomes her future."
      subtitle="100% of donations go directly to programs. Every contribution is reported, measured, and accountable."
      image={girlsImg}
    >
      <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 mb-24">
        <Reveal className="lg:col-span-3">
          <div className="bg-card border border-border rounded-2xl shadow-elegant p-8 md:p-10">
            {/* Type toggle */}
            <div className="flex gap-2 p-1.5 bg-muted rounded-xl mb-7">
              {(["monthly", "once"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={cn(
                    "flex-1 py-3 rounded-lg text-sm font-semibold capitalize transition-all",
                    type === t ? "bg-card shadow-card text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t === "monthly" ? "Monthly Giving" : "One-time Gift"}
                </button>
              ))}
            </div>

            <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-3">Choose Your Gift</div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {amounts.map((a) => (
                <button
                  key={a}
                  onClick={() => { setAmount(a); setCustom(""); }}
                  className={cn(
                    "py-4 rounded-xl border-2 font-display text-lg transition-all",
                    !custom && amount === a
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  ₦{a.toLocaleString()}
                </button>
              ))}
            </div>
            <Input
              type="number"
              placeholder="Or enter custom amount (₦)"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              className="h-12 mb-7"
            />

            <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-3">Direct Your Gift</div>
            <div className="grid sm:grid-cols-2 gap-3 mb-7">
              {[
                { id: "where-needed", icon: Heart, label: "Where most needed" },
                { id: "girls", icon: Sparkles, label: "Sponsor a girl" },
                { id: "health", icon: HeartPulse, label: "Health programs" },
                { id: "climate", icon: Sprout, label: "Climate action" },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDesignation(d.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 flex items-center gap-3 text-sm font-medium transition-all text-left",
                    designation === d.id ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/40"
                  )}
                >
                  <d.icon className="w-5 h-5 shrink-0" />
                  {d.label}
                </button>
              ))}
            </div>

            {/* Impact preview */}
            {impacts[amount] && !custom && (
              <div className="p-5 rounded-xl bg-accent-soft border border-accent/30 mb-7 animate-fade-in">
                <div className="text-xs uppercase tracking-wider text-accent-foreground/70 font-semibold mb-1">Your Impact</div>
                <p className="text-sm text-accent-foreground font-medium">{impacts[amount]}</p>
              </div>
            )}

            {/* Payment method */}
            <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-3">Payment Method</div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { id: "paystack" as const, icon: CreditCard, label: "Paystack", sub: "Card · Bank · USSD" },
                { id: "paypal" as const, icon: Globe, label: "PayPal", sub: "International" },
                { id: "bank" as const, icon: Landmark, label: "Bank Transfer", sub: "Zenith Bank" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 flex flex-col items-start gap-1.5 text-left transition-all",
                    method === m.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  )}
                >
                  <m.icon className={cn("w-5 h-5", method === m.id ? "text-primary" : "text-muted-foreground")} />
                  <div className={cn("text-sm font-semibold", method === m.id ? "text-primary" : "text-foreground")}>{m.label}</div>
                  <div className="text-[11px] text-muted-foreground leading-tight">{m.sub}</div>
                </button>
              ))}
            </div>

            {method === "bank" && (
              <div className="p-5 rounded-xl bg-muted/60 border border-border mb-5 animate-fade-in space-y-3">
                <div className="text-xs uppercase tracking-wider text-accent font-semibold">Bank Transfer Details</div>
                {[
                  { key: "bank", label: "Bank", value: bankDetails.bank },
                  { key: "name", label: "Account Name", value: bankDetails.accountName },
                  { key: "number", label: "Account Number", value: bankDetails.accountNumber },
                ].map((row) => (
                  <div key={row.key} className="flex items-center justify-between gap-3 pb-2 border-b border-border/60 last:border-0 last:pb-0">
                    <div className="min-w-0">
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{row.label}</div>
                      <div className="text-sm font-semibold text-foreground truncate">{row.value}</div>
                    </div>
                    <button
                      onClick={() => copy(row.key, row.value)}
                      className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                      aria-label={`Copy ${row.label}`}
                    >
                      {copied === row.key ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied === row.key ? "Copied" : "Copy"}
                    </button>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground pt-1">
                  Please send proof of payment to <a href="mailto:info@tijcef.org" className="text-primary hover:underline">info@tijcef.org</a> so we can issue your receipt.
                </p>
              </div>
            )}

            {method === "paystack" && (
              <div className="mb-5 animate-fade-in">
                <label className="text-xs uppercase tracking-wider text-accent font-semibold mb-2 block">Email for Receipt</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
            )}

            <Button variant="donate" size="xl" className="w-full" onClick={handleDonate} disabled={method === "bank"}>
              {method === "bank"
                ? "Use the bank details above"
                : `${type === "monthly" ? "Give ₦" : "Donate ₦"}${finalAmount.toLocaleString()}${type === "monthly" ? " / month" : ""} via ${method === "paystack" ? "Paystack" : "PayPal"}`}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
              <Shield className="w-3.5 h-3.5" /> Secure payment · 100% to programs · Receipt issued
            </div>
          </div>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-2">
          <div className="sticky top-28 space-y-7">
            <div>
              <h3 className="font-display text-3xl mb-4 leading-tight">Our Transparency Promise</h3>
              <p className="text-foreground/75 leading-relaxed">
                Every naira is tracked. We publish program budgets, third-party audits, and an annual impact report so you can see exactly where your gift goes.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { stat: "100%", label: "Of donations to programs" },
                { stat: "Annual", label: "Independent financial audit" },
                { stat: "Quarterly", label: "Donor impact reports" },
              ].map((b) => (
                <div key={b.label} className="flex items-baseline gap-4 pb-4 border-b border-border">
                  <div className="font-display text-3xl text-primary">{b.stat}</div>
                  <div className="text-sm text-muted-foreground">{b.label}</div>
                </div>
              ))}
            </div>
            <div className="p-6 rounded-xl gradient-soft border border-border">
              <div className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">Other Ways to Give</div>
              <p className="text-sm text-muted-foreground">Bank transfer, corporate sponsorship, in-kind donations, or estate giving contact our partnerships team.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </SimplePage>
  );
};

export default Donate;
