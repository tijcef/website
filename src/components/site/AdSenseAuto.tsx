import { useEffect } from "react";

const client = (
  import.meta.env.VITE_ADSENSE_CLIENT || "ca-pub-8967021504063466"
).trim();

/** Loads the official AdSense script once. Auto Ads remain controlled in AdSense. */
export default function AdSenseAuto() {
  useEffect(() => {
    if (!/^ca-pub-\d{10,}$/.test(client)) return;
    if (document.querySelector('script[data-tijcef-adsense="true"]')) return;

    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.tijcefAdsense = "true";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    document.head.appendChild(script);
  }, []);

  return null;
}
