import { useEffect } from "react";

export default function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} | TIJCEF`;
    const canonicalUrl = `https://tijcef.org${window.location.pathname}`;
    const values: Record<string, string> = {
      description,
      "og:title": `${title} | TIJCEF`,
      "og:description": description,
      "og:url": canonicalUrl,
      "twitter:card": "summary_large_image",
    };
    Object.entries(values).forEach(([name, content]) => {
      const property = name.startsWith("og:") ? "property" : "name";
      let tag = document.head.querySelector(`meta[${property}="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(property, name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [title, description]);
  return null;
}
