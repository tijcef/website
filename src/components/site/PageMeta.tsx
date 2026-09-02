import { useEffect } from "react";

const SITE_URL = "https://www.tijcef.org";
const SITE_NAME = "TIJCEF";
const DEFAULT_IMAGE = `${SITE_URL}/og-logo.webp`;

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

type PageMetaProps = {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
  canonicalPath?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: JsonLd;
  includeSiteName?: boolean;
};

const absoluteUrl = (value: string) => {
  try {
    return new URL(value, SITE_URL).toString();
  } catch {
    return DEFAULT_IMAGE;
  }
};

const normalizedPath = (value: string) => {
  const path = value.split("?")[0].split("#")[0] || "/";
  return path === "/" ? "/" : path.replace(/\/+$/, "");
};

const setMeta = (key: string, content: string, useProperty = false) => {
  const attribute = useProperty ? "property" : "name";
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    tag.dataset.tijcefMeta = "true";
    document.head.appendChild(tag);
  }
  tag.content = content;
};

const removeMeta = (key: string, useProperty = false) => {
  const attribute = useProperty ? "property" : "name";
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove();
};

export default function PageMeta({
  title,
  description,
  image = DEFAULT_IMAGE,
  noIndex = false,
  canonicalPath,
  type = "website",
  publishedTime,
  modifiedTime,
  jsonLd,
  includeSiteName = true,
}: PageMetaProps) {
  useEffect(() => {
    document.getElementById("tijcef-prerender-schema")?.remove();
    const pageTitle = includeSiteName && !title.toLowerCase().includes("tijcef")
      ? `${title} | ${SITE_NAME}`
      : title;
    const path = normalizedPath(canonicalPath || window.location.pathname);
    const canonicalUrl = `${SITE_URL}${path === "/" ? "/" : path}`;
    const socialImage = absoluteUrl(image);
    const cleanDescription = description.replace(/\s+/g, " ").trim().slice(0, 180);

    document.title = pageTitle;
    setMeta("description", cleanDescription);
    setMeta("robots", noIndex
      ? "noindex,follow"
      : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setMeta("og:title", pageTitle, true);
    setMeta("og:description", cleanDescription, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:image", socialImage, true);
    setMeta("og:image:alt", `${pageTitle} — TIJCEF`, true);
    if (socialImage === DEFAULT_IMAGE) {
      setMeta("og:image:width", "800", true);
      setMeta("og:image:height", "800", true);
    } else {
      removeMeta("og:image:width", true);
      removeMeta("og:image:height", true);
    }
    setMeta("og:type", type, true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("og:locale", "en_NG", true);
    setMeta("twitter:title", pageTitle);
    setMeta("twitter:description", cleanDescription);
    setMeta("twitter:image", socialImage);
    setMeta("twitter:image:alt", `${pageTitle} — TIJCEF`);
    setMeta("twitter:card", "summary_large_image");

    if (type === "article" && publishedTime) {
      setMeta("article:published_time", publishedTime, true);
    } else {
      removeMeta("article:published_time", true);
    }
    if (type === "article" && modifiedTime) {
      setMeta("article:modified_time", modifiedTime, true);
    } else {
      removeMeta("article:modified_time", true);
    }

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const defaultSchema: Record<string, unknown> = type === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${canonicalUrl}#article`,
          headline: title,
          description: cleanDescription,
          url: canonicalUrl,
          image: socialImage,
          datePublished: publishedTime,
          dateModified: modifiedTime || publishedTime,
          author: { "@type": "Organization", name: "Tijwun Care and Empowerment Foundation" },
          publisher: { "@id": `${SITE_URL}/#organization` },
          mainEntityOfPage: { "@id": `${canonicalUrl}#webpage` },
        }
      : {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          name: pageTitle,
          description: cleanDescription,
          url: canonicalUrl,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          about: { "@id": `${SITE_URL}/#organization` },
        };

    let schema = document.getElementById("tijcef-page-schema") as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "tijcef-page-schema";
      schema.type = "application/ld+json";
      document.head.appendChild(schema);
    }
    schema.text = JSON.stringify(jsonLd || defaultSchema);
  }, [
    canonicalPath,
    description,
    image,
    includeSiteName,
    jsonLd,
    modifiedTime,
    noIndex,
    publishedTime,
    title,
    type,
  ]);

  return null;
}
