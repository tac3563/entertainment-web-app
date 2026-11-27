import type { Metadata } from "next";
import { Suspense } from "react";
import { MediaGridSkeleton } from "@/components/media-grid";
import { WatchlistView } from "@/components/watchlist-view";

export const metadata: Metadata = { title: "Watchlist" };

// Reads the watchlist from this browser's storage, so it renders on the client.
export default function WatchlistPage() {
  return (
    <Suspense fallback={<MediaGridSkeleton title="Watchlist" />}>
      <WatchlistView />
    </Suspense>
  );
}
