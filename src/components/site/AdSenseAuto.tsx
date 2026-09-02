import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const client = (
  import.meta.env.VITE_ADSENSE_CLIENT || "ca-pub-8967021504063466"
).trim();

const advertisingRoute = /^\/(grants|post|category)(\/|$)/;

/** Loads Auto Ads only in editorial and opportunity sections; placement remains controlled in AdSense. */
export default function AdSenseAuto() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!advertisingRoute.test(pathname)) return;
    if (!/^ca-pub-\d{10,}$/.test(client)) return;
    if (document.querySelector('script[data-tijcef-adsense="true"]')) return;

    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.tijcefAdsense = "true";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    document.head.appendChild(script);
  }, [pathname]);

  return null;
}
