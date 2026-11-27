import type { Metadata } from "next";
import { Suspense } from "react";
import { MediaGrid, MediaGridSkeleton, Section } from "@/components/media-grid";
import { getPopular } from "@/lib/tmdb";

export const metadata: Metadata = { title: "TV series" };

export default function TvShowsPage() {
  return (
    <Suspense
      fallback={
        <Section id="tv" as="h1" title="Popular TV series">
          <MediaGridSkeleton count={12} />
        </Section>
      }
    >
      <TvShows />
    </Suspense>
  );
}

async function TvShows() {
  const tv = await getPopular("tv");
  return (
    <Section id="tv" as="h1" title="Popular TV series">
      <MediaGrid items={tv} />
    </Section>
  );
}
