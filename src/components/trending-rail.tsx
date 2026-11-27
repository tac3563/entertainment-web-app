import { MediaCard } from "@/components/media-card";
import type { MediaItem } from "@/types/media";

type TrendingRailProps = {
  items: MediaItem[];
  /** Rank of the first item, so the rail can continue the hero's numbering. */
  startRank?: number;
};

// CSS scroll-snap, no carousel JS. The rail bleeds to the screen edge and snaps to the page gutter.
export function TrendingRail({ items, startRank = 1 }: TrendingRailProps) {
  return (
    <ul
      className="hide-scrollbar -mx-(--gutter) flex snap-x snap-mandatory scroll-px-(--gutter) gap-5 overflow-x-auto px-(--gutter) pb-2"
      aria-label="Trending titles"
      tabIndex={0}
    >
      {items.map((item, i) => (
        <li key={item.key} className="w-[min(300px,80vw)] flex-none snap-start">
          <MediaCard item={item} rank={startRank + i} sizes="300px" />
        </li>
      ))}
    </ul>
  );
}
