import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

describe("TIJCEF navigation architecture", () => {
  it("removes retired products from all public website surfaces", () => {
    for (const file of [
      "../components/site/Header.tsx",
      "../components/site/Footer.tsx",
      "../pages/Resources.tsx",
      "../App.tsx",
      "../../public/sitemap.xml",
    ]) {
      const source = read(file).toLowerCase();
      expect(source).not.toContain("tijcef journal");
      expect(source).not.toContain('"/tgis');
    }
  });

  it("keeps Grant Hub as a main menu with five opportunity sections", () => {
    const header = read("../components/site/Header.tsx");
    for (const section of ["grants", "scholarships", "fellowships", "jobs", "internships"]) {
      expect(header).toContain(`/grants/${section}`);
    }
  });

  it("loads the primary menu hierarchy from the TIJCEF WordPress backend", () => {
    const client = read("../lib/wordpress.ts");
    const plugin = read("../../wordpress-plugin/tijcef-core/tijcef-core.php");
    expect(client).toContain("/wp-json/tijcef/v1/navigation");
    expect(client).toContain("/wp-json/wp/v2/posts?categories=");
    expect(plugin).toContain("TIJCEF Primary");
    expect(plugin).toContain("create_default_categories_and_menu(true)");
  });

  it("uses TIJCEF's four official pillars across the website and backend", () => {
    const homepage = read("../pages/Index.tsx");
    const pillarPage = read("../pages/Pillars.tsx");
    const plugin = read("../../wordpress-plugin/tijcef-core/tijcef-core.php");
    for (const pillar of ["Dignity", "Agency", "Resilience", "Evidence"]) {
      expect(homepage).toContain(`title: "${pillar}"`);
      expect(pillarPage).toContain(`title: "${pillar}"`);
      expect(plugin).toContain(`'${pillar}'`);
    }
  });
});
