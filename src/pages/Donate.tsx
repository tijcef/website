import { useState } from "react";
import SimplePage from "@/components/site/SimplePage";
import Reveal from "@/components/site/Reveal";
import PageMeta from "@/components/site/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Copy, CreditCard, Heart, Landmark, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { verifyDonation } from "@/lib/wordpress";
import girlsImg from "@/assets/girls-education.jpg";

const amounts = [5000, 10000, 25000, 50000, 100000, 250000];
const bankDetails = {
  bank: "Zenith Bank Plc",
  accountName: "Tijwun Care and Empowerment Foundation",
  accountNumber: "1311675477",
};
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

function loadPaystack() {
  if (window.PaystackPop) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-tijcef-paystack]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Payment service failed to load.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.dataset.tijcefPaystack = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Payment service failed to load."));
    document.head.appendChild(script);
  });
}

export default function Donate() {
  const [amount, setAmount] = useState(10000);
  const [custom, setCustom] = useState("");
  const [designation, setDesignation] = useState("where-needed");
  const [method, setMethod] = useState<"paystack" | "bank">("paystack");
  const [copied, setCopied] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const finalAmount = custom ? Number(custom) : amount;

  function copy(key: string, value: string) {
    navigator.clipboard?.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1800);
  }

  async function donate() {
    setStatus("");
    if (!PAYSTACK_PUBLIC_KEY) {
      setStatus("Online donation is being configured. Please use the verified bank details or contact TIJCEF.");
      return;
    }
    if (!finalAmount || finalAmount < 100 || !email.match(/^\S+@\S+\.\S+$/)) {
      setStatus("Enter a valid amount and email address.");
      return;
    }
    setBusy(true);
    try {
      await loadPaystack();
      if (!window.PaystackPop) throw new Error("Payment service is unavailable.");
      const reference = `TIJCEF-${Date.now()}`;
      window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email,
        amount: Math.round(finalAmount * 100),
        currency: "NGN",
        ref: reference,
        metadata: {
          custom_fields: [
            { display_name: "Designation", variable_name: "designation", value: designation },
          ],
        },
        callback: async (response: { reference?: string }) => {
          try {
            await verifyDonation(response.reference || reference);
            setStatus("Thank you. Your donation was verified and recorded successfully.");
          } catch {
            setStatus("Payment was received but verification is pending. Keep your Paystack reference and contact TIJCEF.");
          }
          setBusy(false);
        },
        onClose: () => setBusy(false),
      }).openIframe();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Payment could not be started.");
      setBusy(false);
    }
  }

  return (
    <>
      <PageMeta
  title="Donate to TIJCEF"
  description="Support TIJCEF’s dignity, agency, resilience and evidence programmes through a secure one-time donation."
/>
      <SimplePage
        eyebrow="Donate to TIJCEF"
        title="Support community-led change."
        subtitle="Your contribution supports approved TIJCEF programmes and is managed under our financial controls and donor restrictions."
        image={girlsImg}
      >
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <Reveal className="lg:col-span-3">
            <div className="rounded-2xl border bg-card p-8 shadow-elegant md:p-10">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">Choose a one-time gift</div>
              <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {amounts.map((value) => (
                  <button key={value} type="button" onClick={() => { setAmount(value); setCustom(""); }} className={cn("rounded-xl border-2 py-4 font-display text-lg", !custom && amount === value ? "border-primary bg-primary/5 text-primary" : "border-border")}>
                    ₦{value.toLocaleString()}
                  </button>
                ))}
              </div>
              <Input type="number" min={100} placeholder="Or enter a custom amount (₦)" value={custom} onChange={(event) => setCustom(event.target.value)} className="mb-7 h-12" />

             <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">
  Donation preference
</div>

<select
  value={designation}
  onChange={(event) => setDesignation(event.target.value)}
  className="mb-7 h-12 w-full rounded-md border bg-background px-3"
>
  <option value="where-needed">Where most needed</option>
  <option value="dignity">Dignity</option>
  <option value="agency">Agency</option>
  <option value="resilience">Resilience</option>
  <option value="evidence">Evidence</option>
</select>
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">Payment method</div>
              <div className="mb-5 grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setMethod("paystack")} className={cn("rounded-xl border-2 p-4 text-left", method === "paystack" ? "border-primary bg-primary/5" : "border-border")}><CreditCard className="mb-2 h-5 w-5" /><strong>Paystack</strong><div className="text-xs text-muted-foreground">Card, transfer or USSD</div></button>
                <button type="button" onClick={() => setMethod("bank")} className={cn("rounded-xl border-2 p-4 text-left", method === "bank" ? "border-primary bg-primary/5" : "border-border")}><Landmark className="mb-2 h-5 w-5" /><strong>Bank transfer</strong><div className="text-xs text-muted-foreground">Zenith Bank</div></button>
              </div>

              {method === "paystack" ? (
                <>
                  <label className="mb-5 block text-sm font-semibold">Email for receipt<Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-12" required /></label>
                  <Button variant="donate" size="xl" className="w-full" onClick={donate} disabled={busy}>{busy ? "Opening secure payment…" : `Donate ₦${finalAmount.toLocaleString()}`}<ArrowRight className="h-5 w-5" /></Button>
                </>
              ) : (
                <div className="space-y-3 rounded-xl border bg-muted/60 p-5">
                  {[["Bank", bankDetails.bank], ["Account name", bankDetails.accountName], ["Account number", bankDetails.accountNumber]].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-3 border-b pb-2 last:border-0">
                      <div><div className="text-xs uppercase text-muted-foreground">{label}</div><strong>{value}</strong></div>
                      <button type="button" onClick={() => copy(label, value)} className="inline-flex items-center gap-1 text-xs text-primary">{copied === label ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied === label ? "Copied" : "Copy"}</button>
                    </div>
                  ))}
                  <p className="text-xs text-muted-foreground">Send proof of payment to <a className="underline" href="mailto:info@tijcef.org">info@tijcef.org</a> for acknowledgement.</p>
                </div>
              )}
              {status && <p role="status" className="mt-4 rounded-lg bg-muted p-3 text-sm">{status}</p>}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground"><Shield className="h-4 w-4" />Online payments are verified before being recorded.</div>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-2">
            <div className="space-y-6">
              <Heart className="h-9 w-9 text-primary" />
              <h2 className="font-display text-4xl">Our donor commitment</h2>
              <p className="leading-relaxed text-muted-foreground">TIJCEF records restricted and unrestricted gifts, applies approved programme and operational budgets, and acknowledges donations after confirmation.</p>
              <ul className="space-y-3 text-sm">
                <li>• Donor preferences are honoured where accepted.</li>
                <li>• No donation guarantees a specific beneficiary outcome.</li>
                <li>• Suspected fraud should be reported immediately.</li>
              </ul>
              <a href="/donation-policy" className="font-semibold text-primary underline">Read our donation and refund policy</a>
            </div>
          </Reveal>
        </div>
      </SimplePage>
    </>
  );
}
