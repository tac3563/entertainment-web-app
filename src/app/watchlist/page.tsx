import type { Metadata } from "next";
import { WatchlistView } from "@/components/watchlist-view";
import { site } from "@/config/site";

export const metadata: Metadata = { title: site.watchlist.nav };

// Reads the watchlist from this browser's storage, so it fills in on the client.
export default function WatchlistPage() {
  return <WatchlistView />;
}
