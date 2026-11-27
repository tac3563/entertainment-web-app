import { Suspense } from "react";
import { FeaturedHero, FeaturedHeroSkeleton } from "@/components/featured-hero";
import { FilterTabs } from "@/components/filter-tabs";
import { MediaGrid, MediaGridSkeleton, Section } from "@/components/media-grid";
import { TrendingRail } from "@/components/trending-rail";
import { getPopular, getTrending } from "@/lib/tmdb";
import type { MediaItem } from "@/types/media";

const HERO_COUNT = 4;

// All data here is cached, so the whole page is prerendered and refreshed hourly.
export default function HomePage() {
  return (
    <>
      <Suspense fallback={<FeaturedHeroSkeleton />}>
        <Trending />
      </Suspense>
      <Suspense
        fallback={
          <Section id="popular" title="Popular right now">
            <MediaGridSkeleton />
          </Section>
        }
      >
        <Popular />
      </Suspense>
    </>
  );
}

async function Trending() {
  const trending = await getTrending();
  const withOverview = trending.filter((item) => item.overview);
  const hero = withOverview.slice(0, HERO_COUNT);
  const rail = trending.filter((item) => !hero.includes(item)).slice(0, 12);

  return (
    <>
      <FeaturedHero items={hero} />
      <Section id="trending" title="Trending this week">
        <TrendingRail items={rail} startRank={hero.length + 1} />
      </Section>
    </>
  );
}

function interleave(a: MediaItem[], b: MediaItem[], count: number) {
  return Array.from({ length: count }, (_, i) => (i % 2 ? b : a)[Math.floor(i / 2)]).filter(Boolean);
}

async function Popular() {
  const [movies, tv] = await Promise.all([getPopular("movie", 1), getPopular("tv", 1)]);

  return (
    <Section id="popular" title="Popular right now">
      <FilterTabs
        label="Filter by type"
        tabs={[
          { id: "all", label: "All", content: <MediaGrid items={interleave(movies, tv, 12)} /> },
          { id: "movie", label: "Movies", content: <MediaGrid items={movies.slice(0, 12)} /> },
          { id: "tv", label: "TV series", content: <MediaGrid items={tv.slice(0, 12)} /> },
        ]}
      />
    </Section>
  );
}
