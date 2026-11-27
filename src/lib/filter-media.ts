import type { MediaItem } from "@/types/media";

export function filterByTitle(items: MediaItem[], query: string): MediaItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) => item.title.toLowerCase().includes(q));
}

/** Reads `?q=` from page search params, ignoring repeated values. */
export function readQuery(params: Record<string, string | string[] | undefined>): string {
  const q = params.q;
  return (Array.isArray(q) ? q[0] : q)?.trim() ?? "";
}
