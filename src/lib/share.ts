export const PUBLIC_ORIGIN = "https://www.tijcef.org";
export function publicationUrl(path: string) {
  const parsed = new URL(path || "/", PUBLIC_ORIGIN);
  const cleanPath = parsed.pathname === "/" ? "/" : parsed.pathname.replace(/\/+$/, "");
  return `${PUBLIC_ORIGIN}${cleanPath}`;
}
