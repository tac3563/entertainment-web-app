import { MediaMeta } from "@/components/media-meta";
import { TmdbImage } from "@/components/tmdb-image";
import { WatchlistButton } from "@/components/watchlist-button";
import type { MediaItem } from "@/types/media";

const GRID = "grid grid-cols-2 gap-x-[var(--spacing-300)] gap-y-[var(--spacing-300)] py-[var(--spacing-400)] md:grid-cols-3 md:gap-x-[var(--spacing-500)] lg:grid-cols-4";

type MediaGridProps = {
  title: string;
  items: MediaItem[];
  /** Shown instead of the grid when `items` is empty. */
  emptyMessage?: string;
};

// No directive: renders on the server for browse pages and on the client for the watchlist.
export function MediaGrid({ title, items, emptyMessage = "Nothing found." }: MediaGridProps) {
  return (
    <section>
      <h2 className="pb-0">{title}</h2>
      {items.length === 0 ? (
        <p className="py-[var(--spacing-400)] opacity-75">{emptyMessage}</p>
      ) : (
        <ul className={GRID}>
          {items.map((item) => (
            <li key={item.key} className="animate-fade-in relative">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <TmdbImage
                  path={item.backdropPath}
                  alt=""
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </div>
              <MediaMeta item={item} />
              <h3>{item.title}</h3>
              <WatchlistButton item={item} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function MediaGridSkeleton({ title }: { title: string }) {
  return (
    <section aria-busy>
      <h2 className="pb-0">{title}</h2>
      <ul className={GRID}>
        {Array.from({ length: 8 }, (_, i) => (
          <li key={i}>
            <div className="aspect-video animate-pulse rounded-lg bg-blue-900" />
            <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-blue-900" />
            <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-blue-900" />
          </li>
        ))}
      </ul>
    </section>
  );
}
