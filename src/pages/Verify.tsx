import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, Search, ShieldCheck, XCircle } from "lucide-react";
import SiteLayout from "@/components/site/SiteLayout";
import PageMeta from "@/components/site/PageMeta";

const WP_URL = (import.meta.env.VITE_WORDPRESS_URL || "https://studio.tijcef.org").replace(/\/$/, "");

type RecordResult = {
  valid: boolean;
  document_id?: string;
  document_type?: string;
  holder?: string;
  issue_date?: string;
  status?: string;
  note?: string;
};

export default function Verify() {
  const [params, setParams] = useSearchParams();
  const [code, setCode] = useState(params.get("id") || params.get("token") || "");
  const [result, setResult] = useState<RecordResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verify = async (value: string) => {
    const clean = value.trim();
    if (!clean) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const r = await fetch(`${WP_URL}/wp-json/tijcef/v1/verify?code=${encodeURIComponent(clean)}`, { headers: { Accept: "application/json" } });
      const data = await r.json();
      if (!r.ok && r.status !== 404) throw new Error(data?.message || "Verification service is unavailable.");
      setResult(data);
      setParams({ id: clean }, { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Verification service is unavailable.");
    } finally { setLoading(false); }
  };

  useEffect(() => { if (code) verify(code); /* initial deep-link verification */ }, []);
  const submit = (e: FormEvent) => { e.preventDefault(); verify(code); };

  return (
    <SiteLayout>
      <PageMeta title="Verify an Official TIJCEF Document" description="Verify certificates, staff IDs, appointment letters, partnership letters and other official documents issued by TIJCEF." />
      <main className="min-h-[70vh] bg-slate-50 py-14 md:py-20">
        <section className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-primary/10"><ShieldCheck className="h-9 w-9 text-primary" /></div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">TIJCEF Official Verification</h1>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">Check the authenticity and current status of a certificate, ID card, letter or other document issued by Tijwun Care Empowerment Foundation.</p>
          </div>

          <form onSubmit={submit} className="mt-9 rounded-2xl border bg-white p-5 shadow-sm md:p-7">
            <label htmlFor="verification-code" className="text-sm font-semibold text-slate-800">Document ID or verification code</label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input id="verification-code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. TIJCEF/CV/2026/001" className="h-12 flex-1 rounded-xl border border-slate-300 px-4 outline-none ring-primary/20 focus:border-primary focus:ring-4" />
              <button disabled={loading} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground disabled:opacity-60"><Search className="h-4 w-4" />{loading ? "Checking…" : "Verify"}</button>
            </div>
            <p className="mt-3 text-xs text-slate-500">The ID is printed on official TIJCEF documents. QR codes issued by TIJCEF open this page with the verification code automatically.</p>
          </form>

          {error && <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">{error}</div>}
          {result && (result.valid ? (
            <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 bg-emerald-50 p-5 text-emerald-900"><CheckCircle2 className="h-7 w-7" /><div><div className="font-bold">VERIFIED — AUTHENTIC TIJCEF RECORD</div><div className="text-sm">This record exists in the official TIJCEF verification register.</div></div></div>
              <dl className="grid gap-0 p-5 text-sm md:grid-cols-2 md:p-7">
                {[['Document ID',result.document_id],['Document type',result.document_type],['Recipient / Holder',result.holder],['Issue date',result.issue_date],['Status',result.status]].filter(([,v])=>v).map(([k,v])=><div key={k} className="border-b py-3"><dt className="text-slate-500">{k}</dt><dd className="mt-1 font-semibold text-slate-900">{v}</dd></div>)}
              </dl>
            </div>
          ) : (
            <div className="mt-6 flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900"><XCircle className="mt-0.5 h-6 w-6 shrink-0" /><div><div className="font-bold">RECORD NOT VERIFIED</div><p className="mt-1 text-sm">No matching valid TIJCEF record was found. Check the ID carefully. If the document claims to be from TIJCEF, contact the Foundation for confirmation.</p></div></div>
          ))}
        </section>
      </main>
    </SiteLayout>
  );
}
