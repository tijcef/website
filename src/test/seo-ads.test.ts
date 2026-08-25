import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (file: string) => readFileSync(new URL(file, import.meta.url), "utf8");

describe("TIJCEF indexing and advertising safeguards", () => {
  it("publishes stable canonical, robots and social metadata for every route", () => {
    const pageMeta = read("../components/site/PageMeta.tsx");
    expect(pageMeta).toContain('link[rel="canonical"]');
    expect(pageMeta).toContain("max-image-preview:large");
    expect(pageMeta).toContain("noindex,follow");
    expect(pageMeta).toContain("tijcef-page-schema");
  });

  it("pre-renders fixed and WordPress-backed routes into the production sitemap", () => {
    const postbuild = read("../../scripts/postbuild.mjs");
    expect(postbuild).toContain("/wp-json/wp/v2/posts");
    expect(postbuild).toContain("/wp-json/wp/v2/tijcef_grant");
    expect(postbuild).toContain("sitemap.xml");
    expect(postbuild).toContain("404.html");
  });

  it("returns a real static 404 for unknown paths instead of a catch-all soft 404", () => {
    const redirects = read("../../public/_redirects");
    expect(redirects).toContain("/*                        /404.html                    404");
    expect(redirects).not.toMatch(/\/index\.html\s+200/);
  });

  it("renders ads only when a valid publisher and slot are configured", () => {
    const adSlot = read("../components/site/AdSlot.tsx");
    expect(adSlot).toContain("validClient && validSlot(slot)");
    expect(adSlot).toContain("if (!configured || failed) return null");
    expect(adSlot).toContain('data-full-width-responsive="true"');
    const postbuild = read("../../scripts/postbuild.mjs");
    expect(postbuild).toContain("f08c47fec0942fa0");
  });

  it("keeps verified public impact figures consistent", () => {
    const homepage = read("../pages/Index.tsx");
    const impact = read("../pages/Impact.tsx");
    expect(homepage).toContain("end: 3500");
    expect(impact).toContain("value: 3500");
    expect(homepage).not.toContain("end: 8500");
  });
});
