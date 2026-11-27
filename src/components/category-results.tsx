import { MediaGrid } from "@/components/media-grid";
import { filterByTitle, readQuery } from "@/lib/filter-media";
import { getPopularMedia } from "@/lib/tmdb";
import type { MediaCategory } from "@/types/media";

type CategoryResultsProps = {
  category: MediaCategory;
  title: string;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function CategoryResults({ category, title, searchParams }: CategoryResultsProps) {
  const [params, media] = await Promise.all([searchParams, getPopularMedia()]);
  const query = readQuery(params);
  const items = filterByTitle(
    media.filter((item) => item.category === category),
    query,
  );

  return (
    <MediaGrid title={query ? `Found ${items.length} results for '${query}'` : title} items={items} />
  );
}
