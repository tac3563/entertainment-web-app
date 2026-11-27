"use client";

import { useSearchParams } from "next/navigation";
import { MediaGrid, MediaGridSkeleton } from "@/components/media-grid";
import { useWatchlist } from "@/hooks/use-watchlist";
import { filterByTitle } from "@/lib/filter-media";

export function WatchlistView() {
  const { ready, items } = useWatchlist();
  const query = useSearchParams().get("q")?.trim() ?? "";

  if (!ready) return <MediaGridSkeleton title="Watchlist" />;

  const results = filterByTitle(items, query);

  if (query) {
    return <MediaGrid title={`Found ${results.length} results for '${query}'`} items={results} />;
  }

  if (items.length === 0) {
    return (
      <MediaGrid
        title="Watchlist"
        items={[]}
        emptyMessage="Nothing saved yet. Tap the bookmark on any title to add it here."
      />
    );
  }

  const movies = results.filter((item) => item.category === "Movie");
  const tv = results.filter((item) => item.category === "TV Series");

  return (
    <>
      {movies.length > 0 && <MediaGrid title="Saved movies" items={movies} />}
      {tv.length > 0 && <MediaGrid title="Saved TV series" items={tv} />}
    </>
  );
}
