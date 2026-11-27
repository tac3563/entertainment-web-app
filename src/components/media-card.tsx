import { TmdbImage } from "@/components/tmdb-image";
import { WatchlistButton } from "@/components/watchlist-button";
import { kindLabel, type MediaItem } from "@/types/media";

type MediaCardProps = {
  item: MediaItem;
  /** Position in a ranked list, shown as a chip over the artwork. */
  rank?: number;
  sizes: string;
};

// No directive: renders on the server for browse pages and on the client for the watchlist.
export function MediaCard({ item, rank, sizes }: MediaCardProps) {
  const meta = [item.year, kindLabel(item.kind), item.genre].filter(Boolean).join(" · ");

  return (
    <article className="group relative min-w-0 transition-transform duration-350 ease-out-expo hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-raised">
        <TmdbImage
          path={item.backdropPath}
          alt=""
          sizes={sizes}
          className="transition-transform duration-700 ease-out-expo group-hover:scale-105"
        />
        {rank !== undefined && (
          <span className="absolute top-3 left-3 rounded-full bg-bg/70 px-2.5 py-0.5 font-mono text-xs backdrop-blur-sm">
            #{rank}
          </span>
        )}
        <WatchlistButton item={item} />
      </div>
      <div className="mt-3 flex justify-between gap-3">
        <h3 className="min-w-0 text-base font-semibold">{item.title}</h3>
        {item.rating && (
          <p className="flex-none font-mono text-[13px] text-fg-soft">
            <span aria-hidden>★ </span>
            <span className="sr-only">Rated </span>
            {item.rating}
          </p>
        )}
      </div>
      <p className="mt-0.5 font-mono text-xs text-muted">{meta}</p>
    </article>
  );
}
