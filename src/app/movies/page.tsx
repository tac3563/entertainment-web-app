import type { Metadata } from "next";
import { Suspense } from "react";
import { CategoryResults } from "@/components/category-results";
import { MediaGridSkeleton } from "@/components/media-grid";

export const metadata: Metadata = { title: "Movies" };

export default function MoviesPage({ searchParams }: PageProps<"/movies">) {
  return (
    <Suspense fallback={<MediaGridSkeleton title="Movies" />}>
      <CategoryResults category="Movie" title="Movies" searchParams={searchParams} />
    </Suspense>
  );
}
