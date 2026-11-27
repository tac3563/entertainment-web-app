import type { Metadata } from "next";
import { Suspense } from "react";
import { MediaGrid, MediaGridSkeleton, Section } from "@/components/media-grid";
import { getPopular } from "@/lib/tmdb";

export const metadata: Metadata = { title: "Movies" };

export default function MoviesPage() {
  return (
    <Suspense
      fallback={
        <Section id="movies" as="h1" title="Popular movies">
          <MediaGridSkeleton count={12} />
        </Section>
      }
    >
      <Movies />
    </Suspense>
  );
}

async function Movies() {
  const movies = await getPopular("movie");
  return (
    <Section id="movies" as="h1" title="Popular movies">
      <MediaGrid items={movies} />
    </Section>
  );
}
