"use client";

import Link from "next/link";
import { MediaGrid, MediaGridSkeleton, Section } from "@/components/media-grid";
import { site } from "@/config/site";
import { useWatchlist } from "@/hooks/use-watchlist";

export function WatchlistView() {
  const { ready, items } = useWatchlist();

  if (!ready) {
    return (
      <Section id="watchlist" as="h1" title={site.watchlist.nav}>
        <MediaGridSkeleton count={4} />
      </Section>
    );
  }

  if (items.length === 0) {
    return (
      <Section id="watchlist" as="h1" title={site.watchlist.nav}>
        <MediaGrid
          items={[]}
          empty={
            <>
              Nothing saved yet. Press <span className="text-fg">+</span> on any title to keep it here.{" "}
              <Link href="/" className="text-accent hover:text-accent-soft">
                See what&apos;s trending
              </Link>
            </>
          }
        />
      </Section>
    );
  }

  const movies = items.filter((item) => item.kind !== "tv");
  const tv = items.filter((item) => item.kind === "tv");

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[clamp(40px,5vw,64px)] leading-none font-extrabold tracking-[-0.045em]">
          {site.watchlist.nav}
        </h1>
        <p className="text-muted">
          {items.length} {items.length === 1 ? "title" : "titles"}, saved on this device.
        </p>
      </div>
      {movies.length > 0 && (
        <Section id="saved-movies" title="Movies">
          <MediaGrid items={movies} />
        </Section>
      )}
      {tv.length > 0 && (
        <Section id="saved-tv" title="TV series">
          <MediaGrid items={tv} />
        </Section>
      )}
    </div>
  );
}
