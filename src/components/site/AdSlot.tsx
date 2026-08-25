import { useEffect, useRef, useState } from "react";

type Placement = "content" | "directory";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

const client = (
  import.meta.env.VITE_ADSENSE_CLIENT || "ca-pub-8967021504063466"
).trim();
const slots: Record<Placement, string> = {
  content: (import.meta.env.VITE_ADSENSE_CONTENT_SLOT || "").trim(),
  directory: (import.meta.env.VITE_ADSENSE_DIRECTORY_SLOT || "").trim(),
};
const testMode = import.meta.env.VITE_ADSENSE_TEST_MODE === "true";

const validClient = /^ca-pub-\d{10,}$/.test(client);
const validSlot = (value: string) => /^\d{6,}$/.test(value);

let scriptPromise: Promise<void> | null = null;

function loadAdSense() {
  if (window.adsbygoogle) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-tijcef-adsense="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Ad service failed to load.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.tijcefAdsense = "true";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Ad service failed to load."));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export default function AdSlot({ placement }: { placement: Placement }) {
  const [failed, setFailed] = useState(false);
  const requested = useRef(false);
  const slot = slots[placement];
  const configured = validClient && validSlot(slot);

  useEffect(() => {
    if (!configured || requested.current) return;
    let active = true;
    loadAdSense()
      .then(() => {
        if (!active || requested.current) return;
        requested.current = true;
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      })
      .catch(() => active && setFailed(true));
    return () => {
      active = false;
    };
  }, [configured]);

  if (!configured || failed) return null;

  return (
    <aside className="ad-shell mx-auto my-10 max-w-5xl" aria-label="Advertisement">
      <div className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Advertisement
      </div>
      <ins
        className="adsbygoogle block overflow-hidden"
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-adtest={testMode ? "on" : undefined}
      />
    </aside>
  );
}
