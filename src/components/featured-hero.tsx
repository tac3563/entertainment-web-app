"use client";

import { useState } from "react";
import { ExternalIcon } from "@/components/icons";
import { TmdbImage } from "@/components/tmdb-image";
import { WatchlistButton } from "@/components/watchlist-button";
import { kindLabel, tmdbUrl, type MediaItem } from "@/types/media";

export function FeaturedHero({ items }: { items: MediaItem[] }) {
  const [activeKey, setActiveKey] = useState(items[0]?.key);
  const activeIndex = Math.max(0, items.findIndex((item) => item.key === activeKey));
  const featured = items[activeIndex];
  if (!featured) return null;

  const meta = [featured.year, kindLabel(featured.kind), featured.genre].filter(Boolean);

  return (
    <section aria-label="Featured" className="flex flex-wrap gap-4">
      <div className="relative flex min-h-[min(540px,85vh)] min-w-0 flex-[999_1_640px] items-end overflow-hidden rounded-[28px] bg-raised">
        {/* Every backdrop stays mounted so switching crossfades instead of flashing. */}
        {items.map((item, i) => (
          <div
            key={item.key}
            aria-hidden
            className={`absolute inset-0 transition-opacity duration-700 ease-out-expo ${i === activeIndex ? "opacity-100" : "opacity-0"}`}
          >
            <TmdbImage path={item.backdropPath} alt="" sizes="(min-width: 1024px) 75vw, 100vw" priority={i === 0} />
          </div>
        ))}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,rgb(10_12_18/0.92)_0%,rgb(10_12_18/0.55)_45%,rgb(10_12_18/0)_75%),linear-gradient(0deg,rgb(10_12_18/0.85)_0%,rgb(10_12_18/0)_50%)]"
        />

        <div key={featured.key} className="relative flex max-w-[640px] animate-rise flex-col gap-4.5 p-[clamp(24px,4vw,56px)]">
          <p className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
            Trending #{activeIndex + 1} this week
          </p>
          <h1 className="font-display text-[clamp(44px,6vw,84px)] leading-[0.95] font-extrabold tracking-[-0.045em] text-balance">
            {featured.title}
          </h1>
          <p className="flex flex-wrap gap-x-3.5 gap-y-1.5 font-mono text-[13px] text-fg-soft">
            {meta.map((part) => (
              <span key={part}>{part}</span>
            ))}
            {featured.rating && <span>★ {featured.rating}</span>}
          </p>
          {featured.overview && (
            <p className="line-clamp-3 max-w-[52ch] text-base text-fg-soft">{featured.overview}</p>
          )}
          <div className="flex flex-wrap gap-3 pt-1.5">
            <WatchlistButton item={featured} variant="pill" />
            <a
              href={tmdbUrl(featured)}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-12 items-center gap-2 rounded-full px-4 font-medium text-fg-soft transition-colors hover:text-fg"
            >
              View on TMDb <ExternalIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-[1_1_280px] flex-col gap-2.5">
        <p className="mx-1 mt-1 mb-0.5 font-mono text-xs tracking-[0.1em] text-muted uppercase">Up next</p>
        {items.map((item, i) => {
          const active = i === activeIndex;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setActiveKey(item.key)}
              aria-pressed={active}
              className={`flex cursor-pointer items-center gap-3.5 rounded-[18px] border p-2.5 text-left transition-[transform,opacity,background-color,border-color] duration-300 ease-out-expo hover:-translate-x-1 ${
                active ? "border-line-strong bg-raised opacity-100" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <span className="relative aspect-[16/10] w-24 flex-none overflow-hidden rounded-[10px] bg-raised">
                <TmdbImage path={item.backdropPath} alt="" sizes="96px" />
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="font-semibold">{item.title}</span>
                <span className="font-mono text-xs text-muted">
                  {[kindLabel(item.kind), item.genre].filter(Boolean).join(" · ")}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function FeaturedHeroSkeleton() {
  return (
    <div className="flex flex-wrap gap-4" aria-busy aria-label="Loading">
      <div className="min-h-[min(540px,85vh)] flex-[999_1_640px] animate-pulse rounded-[28px] bg-raised" />
      <div className="flex flex-[1_1_280px] flex-col gap-2.5 pt-8">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-[84px] animate-pulse rounded-[18px] bg-surface" />
        ))}
      </div>
    </div>
  );
}
