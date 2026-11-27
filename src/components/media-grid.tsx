import type { ReactNode } from "react";
import { MediaCard } from "@/components/media-card";
import type { MediaItem } from "@/types/media";

const GRID = "grid grid-cols-[repeat(auto-fill,minmax(min(240px,100%),1fr))] gap-x-5 gap-y-7";
const SIZES = "(min-width: 1360px) 330px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw";

type MediaGridProps = {
  items: MediaItem[];
  /** Shown instead of the grid when `items` is empty. */
  empty?: ReactNode;
};

export function MediaGrid({ items, empty = "Nothing here yet." }: MediaGridProps) {
  if (items.length === 0) {
    return <div className="rounded-2xl border border-dashed border-line-strong p-8 text-muted">{empty}</div>;
  }

  return (
    <ul className={GRID}>
      {items.map((item) => (
        <li key={item.key} className="animate-fade-in">
          <MediaCard item={item} sizes={SIZES} />
        </li>
      ))}
    </ul>
  );
}

export function MediaGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <ul className={GRID} aria-busy aria-label="Loading">
      {Array.from({ length: count }, (_, i) => (
        <li key={i}>
          <div className="aspect-[16/10] animate-pulse rounded-2xl bg-raised" />
          <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-raised" />
          <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-raised" />
        </li>
      ))}
    </ul>
  );
}

type SectionProps = {
  id: string;
  title: string;
  /** `h1` for a page's main heading, `h2` for sections within a page. */
  as?: "h1" | "h2";
  action?: ReactNode;
  children: ReactNode;
};

export function Section({ id, title, as: Heading = "h2", action, children }: SectionProps) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Heading id={id} className="font-display text-[32px] leading-tight font-bold tracking-[-0.03em] text-balance">
          {title}
        </Heading>
        {action}
      </div>
      {children}
    </section>
  );
}
