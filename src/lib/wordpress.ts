const WP_URL = (import.meta.env.VITE_WORDPRESS_URL || "https://studio.tijcef.org").replace(/\/$/, "");
const REQUEST_TIMEOUT = 12000;

export type Grant = {
  id: number;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  content: string;
  date: string;
  funder: string;
  sector: string;
  country: string;
  deadline: string;
  amount: string;
  applicationUrl: string;
  verified: boolean;
  opportunityType: string;
  featuredImage: string;
  featuredImageAlt: string;
};

export type NavigationItem = {
  id: number | string;
  label: string;
  url: string;
  children: NavigationItem[];
};

export type WordPressPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage: string;
  featuredImageAlt: string;
};

const text = (value: unknown) =>
  typeof value === "object" && value && "rendered" in value
    ? String((value as { rendered: string }).rendered).replace(/<[^>]+>/g, "")
    : String(value ?? "");

async function apiFetch(path: string, options?: RequestInit) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  try {
    return await fetch(`${WP_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...options?.headers,
      },
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("The TIJCEF content service took too long to respond.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/\s+/g, " ")
    .trim();

const normalizeNavigationItem = (item: any, index: number): NavigationItem => ({
  id: item.id ?? item.ID ?? `${item.label || item.title || "item"}-${index}`,
  label: text(item.label || item.title || item.name),
  url: String(item.url || item.path || item.link || "/"),
  children: Array.isArray(item.children)
    ? item.children.map((child: any, childIndex: number) =>
        normalizeNavigationItem(child, childIndex)
      )
    : [],
});

const retiredNavigationLabels = new Set(["tgis", "tijcef journal"]);

const removeRetiredNavigation = (items: NavigationItem[]): NavigationItem[] =>
  items
    .filter(
      (item) =>
        !retiredNavigationLabels.has(item.label.trim().toLowerCase()) &&
        !/(^|\/)(tgis|journal)(\/|$)/i.test(item.url)
    )
    .map((item) => ({
      ...item,
      children: removeRetiredNavigation(item.children),
    }));

const pillarNavigation: NavigationItem[] = [
  { id: "dignity", label: "Dignity", url: "/category/dignity", children: [] },
  { id: "agency", label: "Agency", url: "/category/agency", children: [] },
  { id: "resilience", label: "Resilience", url: "/category/resilience", children: [] },
  { id: "evidence", label: "Evidence", url: "/category/evidence", children: [] },
];

const grantNavigation: NavigationItem = {
  id: "grant-hub",
  label: "Grant Hub",
  url: "/grants",
  children: [
    { id: "all-opportunities", label: "All Opportunities", url: "/grants/opportunities", children: [] },
    { id: "grants", label: "Grants", url: "/grants/grants", children: [] },
    { id: "scholarships", label: "Scholarships", url: "/grants/scholarships", children: [] },
    { id: "fellowships", label: "Fellowships", url: "/grants/fellowships", children: [] },
    { id: "jobs", label: "Jobs", url: "/grants/jobs", children: [] },
    { id: "internships", label: "Internships", url: "/grants/internships", children: [] },
  ],
};

const enforceNavigationContract = (items: NavigationItem[]): NavigationItem[] => {
  const sanitized = removeRetiredNavigation(items).map((item) => {
    const label = item.label.trim().toLowerCase();
    if (label === "our pillars" || item.url.replace(/\/$/, "") === "/pillars") {
      return { ...item, label: "Our Pillars", url: "/pillars", children: pillarNavigation };
    }
    if (label === "grant" || label === "grants" || label === "grant hub") {
      return grantNavigation;
    }
    return item;
  });

  if (!sanitized.some((item) => item.label === "Grant Hub")) {
    const programsIndex = sanitized.findIndex((item) => item.label.trim().toLowerCase() === "programs");
    sanitized.splice(programsIndex >= 0 ? programsIndex + 1 : sanitized.length, 0, grantNavigation);
  }
  return sanitized;
};

export async function getNavigation(): Promise<NavigationItem[]> {
  const response = await apiFetch("/wp-json/tijcef/v1/navigation");
  if (!response.ok) throw new Error("Navigation service is temporarily unavailable.");
  const payload = await response.json();
  const items = Array.isArray(payload) ? payload : payload.items;
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("No primary navigation has been published.");
  }
  return enforceNavigationContract(items.map(normalizeNavigationItem));
}

const getFeaturedMedia = (row: any) => {
  const media = row?._embedded?.["wp:featuredmedia"]?.[0];
  const sizes = media?.media_details?.sizes;
  return {
    url: String(
      sizes?.large?.source_url ||
        sizes?.medium_large?.source_url ||
        media?.source_url ||
        ""
    ),
    alt: String(media?.alt_text || text(row.title)),
  };
};

const mapGrant = (row: any): Grant => {
  const featuredMedia = getFeaturedMedia(row);
  const content = String(row.content?.rendered || "");
  const excerpt = stripHtml(String(row.excerpt?.rendered || ""));
  return {
    id: Number(row.id),
    slug: String(row.slug || ""),
    title: text(row.title),
    description: excerpt || stripHtml(content),
    excerpt,
    content,
    date: String(row.date || ""),
    funder: String(row.meta?.funder || ""),
    sector: String(row.meta?.sector || "General"),
    country: String(row.meta?.country || "Nigeria"),
    deadline: String(row.meta?.deadline || ""),
    amount: String(row.meta?.amount || "See opportunity"),
    applicationUrl: String(row.meta?.application_url || ""),
    verified: Boolean(row.meta?.verified),
    opportunityType: String(row.meta?.opportunity_type || "grant").toLowerCase(),
    featuredImage: featuredMedia.url,
    featuredImageAlt: featuredMedia.alt,
  };
};

const grantQueryFields =
  "id,slug,title,excerpt,content,date,meta,_links,_embedded";

export async function getGrants(): Promise<Grant[]> {
  const response = await apiFetch(
    `/wp-json/wp/v2/tijcef_grant?per_page=100&orderby=date&order=desc&_embed=wp:featuredmedia&_fields=${grantQueryFields}`
  );
  if (!response.ok) throw new Error("Grant service is temporarily unavailable.");
  const rows = await response.json();
  return rows.map(mapGrant);
}

export async function getGrantBySlug(slug: string): Promise<Grant | null> {
  const response = await apiFetch(
    `/wp-json/wp/v2/tijcef_grant?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia&_fields=${grantQueryFields}`
  );
  if (!response.ok) throw new Error("This opportunity is temporarily unavailable.");
  const rows = await response.json();
  return rows[0] ? mapGrant(rows[0]) : null;
}

const mapPost = (row: any): WordPressPost => {
  const featuredMedia = getFeaturedMedia(row);
  return {
    id: Number(row.id),
    slug: String(row.slug || ""),
    title: text(row.title),
    excerpt: stripHtml(String(row.excerpt?.rendered || "")),
    content: String(row.content?.rendered || ""),
    date: String(row.date || ""),
    featuredImage: featuredMedia.url,
    featuredImageAlt: featuredMedia.alt,
  };
};

export async function getPostsByCategory(
  categorySlug: string
): Promise<{ categoryName: string; posts: WordPressPost[] }> {
  const categoryResponse = await apiFetch(
    `/wp-json/wp/v2/categories?slug=${encodeURIComponent(categorySlug)}&_fields=id,name,slug`
  );
  if (!categoryResponse.ok) throw new Error("This content section is temporarily unavailable.");
  const categories = await categoryResponse.json();
  const category = categories[0];
  if (!category) throw new Error("This content section has not been published.");

  const postsResponse = await apiFetch(
    `/wp-json/wp/v2/posts?categories=${category.id}&per_page=24&_embed=1`
  );
  if (!postsResponse.ok) throw new Error("Posts are temporarily unavailable.");
  const posts = await postsResponse.json();
  return {
    categoryName: text(category.name),
    posts: posts.map(mapPost),
  };
}

export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  const response = await apiFetch(
    `/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1`
  );
  if (!response.ok) throw new Error("This story is temporarily unavailable.");
  const posts = await response.json();
  return posts[0] ? mapPost(posts[0]) : null;
}

export async function submitPublicForm(path: string, payload: Record<string, unknown>) {
  const response = await apiFetch(`/wp-json/tijcef/v1/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || "We could not submit the form. Please try again.");
  }
  return response.json();
}

export async function verifyDonation(reference: string) {
  return submitPublicForm("payments/verify", { reference });
}

export { WP_URL };
