import type { Metadata } from "next";
import { Suspense } from "react";
import { MediaGrid, MediaGridSkeleton, Section } from "@/components/media-grid";
import { readQuery } from "@/lib/read-query";
import { searchMedia } from "@/lib/tmdb";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <Suspense
      fallback={
        <Section id="search-results" as="h1" title="Searching…">
          <MediaGridSkeleton />
        </Section>
      }
    >
      <Results searchParams={searchParams} />
    </Suspense>
  );
}

async function Results({ searchParams }: Pick<PageProps<"/search">, "searchParams">) {
  const query = readQuery(await searchParams);

  if (!query) {
    return (
      <Section id="search-results" as="h1" title="Search">
        <p className="text-muted">Type a film or TV series in the search box above.</p>
      </Section>
    );
  }

  const results = await searchMedia(query);

  return (
    <Section
      id="search-results"
      as="h1"
      title={`Results for “${query}”`}
      action={
        <p className="font-mono text-xs text-muted">
          {results.length} {results.length === 1 ? "title" : "titles"}
        </p>
      }
    >
      <MediaGrid items={results} empty={`No films or TV series match “${query}”. Try a shorter or different title.`} />
    </Section>
  );
}
