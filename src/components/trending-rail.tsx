import { MediaMeta } from "@/components/media-meta";
import { TmdbImage } from "@/components/tmdb-image";
import { WatchlistButton } from "@/components/watchlist-button";
import type { MediaItem } from "@/types/media";

// CSS scroll-snap replaces the old JS carousel (ResizeObserver + hover-to-centre), so this ships no JS of its own.
export function TrendingRail({ items }: { items: MediaItem[] }) {
  return (
    <section>
      <h2>Trending</h2>
      <ul
        className="hide-scrollbar -mx-[var(--spacing-200)] flex snap-x snap-mandatory scroll-px-[var(--spacing-200)] gap-[var(--spacing-200)] overflow-x-auto px-[var(--spacing-200)] md:mr-[calc(var(--spacing-500)*-1)] md:ml-0 md:scroll-pl-0 md:gap-[var(--spacing-500)] md:pr-[var(--spacing-500)] md:pl-0"
        tabIndex={0}
        aria-label="Trending titles"
      >
        {items.map((item, index) => (
          <li
            key={item.key}
            className="relative w-[var(--carousel-max-width-mobile)] max-w-[85vw] shrink-0 snap-start md:w-[var(--carousel-max-width)]"
          >
            <div className="ratio-carousel relative overflow-hidden rounded-lg">
              <TmdbImage
                path={item.backdropPath}
                alt=""
                sizes="(min-width: 768px) 470px, 85vw"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
            </div>
            <div className="absolute bottom-6 left-6 flex flex-col">
              <MediaMeta item={item} />
              <h3>{item.title}</h3>
            </div>
            <WatchlistButton item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TrendingRailSkeleton() {
  return (
    <section aria-busy>
      <h2>Trending</h2>
      <div className="flex gap-[var(--spacing-200)] overflow-hidden md:gap-[var(--spacing-500)]">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="ratio-carousel w-[var(--carousel-max-width-mobile)] max-w-[85vw] shrink-0 animate-pulse rounded-lg bg-blue-900 md:w-[var(--carousel-max-width)]"
          />
        ))}
      </div>
    </section>
  );
}
