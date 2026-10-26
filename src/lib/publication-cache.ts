import type { Grant, WordPressPost } from "./wordpress";
export function savedPublication<T extends Grant | WordPressPost>(path: string): T | null {
 if (typeof document === "undefined") return null;
 try {
  const saved=JSON.parse(document.getElementById('tijcef-publication-data')?.textContent || 'null');
  if (saved?.path !== path || !saved.data?.slug || !saved.data?.title || typeof saved.data?.content !== 'string') return null;
  return saved.data as T;
 } catch { return null; }
}
