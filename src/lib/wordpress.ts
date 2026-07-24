const WP_URL = (import.meta.env.VITE_WORDPRESS_URL || "https://wp.tijcef.org").replace(/\/$/, "");

export type Grant = {
  id: number;
  slug: string;
  title: string;
  description: string;
  funder: string;
  sector: string;
  country: string;
  deadline: string;
  amount: string;
  applicationUrl: string;
  verified: boolean;
};

export type TgisReport = {
  id: number;
  title: string;
  description: string;
  category: string;
  severity: string;
  state: string;
  latitude: number;
  longitude: number;
  created_at: string;
  organization: string;
  image_url?: string;
};

const text = (value: unknown) =>
  typeof value === "object" && value && "rendered" in value
    ? String((value as { rendered: string }).rendered).replace(/<[^>]+>/g, "")
    : String(value ?? "");

export async function getGrants(): Promise<Grant[]> {
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/tijcef_grant?per_page=100&_fields=id,slug,title,content,meta`);
  if (!response.ok) throw new Error("Grant service is temporarily unavailable.");
  const rows = await response.json();
  return rows.map((row: any) => ({
    id: row.id,
    slug: row.slug,
    title: text(row.title),
    description: text(row.content),
    funder: row.meta?.funder || "",
    sector: row.meta?.sector || "General",
    country: row.meta?.country || "Nigeria",
    deadline: row.meta?.deadline || "",
    amount: row.meta?.amount || "See opportunity",
    applicationUrl: row.meta?.application_url || "",
    verified: Boolean(row.meta?.verified),
  }));
}

export async function getReports(): Promise<TgisReport[]> {
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/tgis_report?per_page=100&_fields=id,date,title,content,meta`);
  if (!response.ok) throw new Error("TGIS data service is temporarily unavailable.");
  const rows = await response.json();
  return rows
    .map((row: any) => ({
      id: row.id,
      title: text(row.title),
      description: text(row.content),
      category: row.meta?.category || "community",
      severity: row.meta?.severity || "medium",
      state: row.meta?.state || "",
      latitude: Number(row.meta?.latitude),
      longitude: Number(row.meta?.longitude),
      created_at: row.date,
      organization: row.meta?.organization || "Community reporter",
      image_url: row.meta?.image_url || undefined,
    }))
    .filter((row: TgisReport) => Number.isFinite(row.latitude) && Number.isFinite(row.longitude));
}

export async function submitPublicForm(path: string, payload: Record<string, unknown>) {
  const response = await fetch(`${WP_URL}/wp-json/tijcef/v1/${path}`, {
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

export { WP_URL };
