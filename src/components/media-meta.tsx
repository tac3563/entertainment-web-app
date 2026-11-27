import type { MediaItem } from "@/types/media";

export function MediaMeta({ item }: { item: MediaItem }) {
  return (
    <div className="flex gap-[var(--spacing-100)] py-[var(--spacing-100)] opacity-75">
      {item.year && <p className="text-preset-5">{item.year}</p>}
      <p className="text-preset-5">{item.category}</p>
      <p className="text-preset-5">{item.rating}</p>
    </div>
  );
}
