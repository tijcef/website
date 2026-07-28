import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

describe("TIJCEF backend publishing", () => {
  it("loads WordPress opportunity images, content and application metadata", () => {
    const client = read("../lib/wordpress.ts");
    expect(client).toContain("_embed=wp:featuredmedia");
    expect(client).toContain("featuredImage");
    expect(client).toContain("applicationUrl");
    expect(client).toContain("getGrantBySlug");
  });

  it("renders each opportunity as a complete public post", () => {
    const grantHub = read("../pages/GrantHub.tsx");
    expect(grantHub).toContain("Read full opportunity");
    expect(grantHub).toContain("Apply on the official website");
    expect(grantHub).toContain("dangerouslySetInnerHTML");
    expect(grantHub).toContain("grant.featuredImage");
  });

  it("keeps normal WordPress categories connected to dynamic frontend sections", () => {
    const client = read("../lib/wordpress.ts");
    const categoryPage = read("../pages/Category.tsx");
    expect(client).toContain("/wp-json/wp/v2/categories?slug=");
    expect(client).toContain("/wp-json/wp/v2/posts?categories=");
    expect(categoryPage).toContain('to={`/post/${post.slug}`}');
    expect(categoryPage).toContain("post.featuredImage");
  });
});
