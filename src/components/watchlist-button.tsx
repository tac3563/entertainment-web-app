"use client";

import { CheckIcon, PlusIcon } from "@/components/icons";
import { site } from "@/config/site";
import { useWatchlist } from "@/hooks/use-watchlist";
import type { MediaItem } from "@/types/media";

type WatchlistButtonProps = {
  item: MediaItem;
  /** `icon`: round button over artwork. `pill`: labelled button for the hero. */
  variant?: "icon" | "pill";
};

export function WatchlistButton({ item, variant = "icon" }: WatchlistButtonProps) {
  const { isSaved, toggle } = useWatchlist();
  const saved = isSaved(item.key);
  const Icon = saved ? CheckIcon : PlusIcon;

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={() => toggle(item)}
        aria-pressed={saved}
        className={`flex min-h-12 cursor-pointer items-center gap-2.5 rounded-full border px-5.5 font-semibold transition-[transform,background-color,color] duration-200 ease-out-expo hover:scale-[1.03] active:scale-95 ${
          saved
            ? "border-accent/40 bg-accent/15 text-accent-soft"
            : "border-fg/30 bg-bg/35 text-fg hover:bg-bg/55"
        }`}
      >
        <Icon />
        {saved ? site.watchlist.saved : site.watchlist.add}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(item)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${item.title} from ${site.watchlist.nav.toLowerCase()}` : `${site.watchlist.add}: ${item.title}`}
      className={`absolute top-2.5 right-2.5 grid size-10 cursor-pointer place-items-center rounded-full transition-[transform,background-color,color] duration-200 ease-out-expo hover:scale-110 active:scale-90 ${
        saved ? "bg-accent text-bg" : "bg-bg/60 text-fg backdrop-blur-sm hover:bg-bg/80"
      }`}
    >
      <Icon />
    </button>
  );
}
