import type { Metadata } from "next";
import { Suspense } from "react";
import { CategoryResults } from "@/components/category-results";
import { MediaGridSkeleton } from "@/components/media-grid";

export const metadata: Metadata = { title: "TV Series" };

export default function TvShowsPage({ searchParams }: PageProps<"/tv-shows">) {
  return (
    <Suspense fallback={<MediaGridSkeleton title="TV Series" />}>
      <CategoryResults category="TV Series" title="TV Series" searchParams={searchParams} />
    </Suspense>
  );
}
