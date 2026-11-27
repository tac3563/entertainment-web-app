import { Suspense } from "react";
import { MediaGrid, MediaGridSkeleton, Section } from "@/components/media-grid";
import { getPopular } from "@/lib/tmdb";

// All data here is cached, so the whole page is prerendered and refreshed hourly.
export default function HomePage() {
  return (
    <Suspense
      fallback={
        <Section id="popular-movies" as="h1" title="Popular movies">
          <MediaGridSkeleton />
        </Section>
      }
    >
      <Popular />
    </Suspense>
  );
}

async function Popular() {
  const [movies, tv] = await Promise.all([getPopular("movie", 1), getPopular("tv", 1)]);

  return (
    <>
      <Section id="popular-movies" as="h1" title="Popular movies">
        <MediaGrid items={movies.slice(0, 8)} />
      </Section>
      <Section id="popular-tv" title="Popular TV series">
        <MediaGrid items={tv.slice(0, 8)} />
      </Section>
    </>
  );
}
