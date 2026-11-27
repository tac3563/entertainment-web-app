import { Suspense } from "react";
import { MediaGrid, MediaGridSkeleton } from "@/components/media-grid";
import { TrendingRail, TrendingRailSkeleton } from "@/components/trending-rail";
import { filterByTitle, readQuery } from "@/lib/filter-media";
import { getPopularMedia } from "@/lib/tmdb";

export default function HomePage({ searchParams }: PageProps<"/">) {
  return (
    <Suspense
      fallback={
        <>
          <TrendingRailSkeleton />
          <MediaGridSkeleton title="Recommended for you" />
        </>
      }
    >
      <Home searchParams={searchParams} />
    </Suspense>
  );
}

async function Home({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  const [params, media] = await Promise.all([searchParams, getPopularMedia()]);
  const query = readQuery(params);

  // Searching from home covers everything, not just the recommended slice.
  if (query) {
    const results = filterByTitle(media, query);
    return <MediaGrid title={`Found ${results.length} results for '${query}'`} items={results} />;
  }

  return (
    <>
      <TrendingRail items={media.slice(0, 5)} />
      <MediaGrid title="Recommended for you" items={media.slice(6, 14)} />
    </>
  );
}
