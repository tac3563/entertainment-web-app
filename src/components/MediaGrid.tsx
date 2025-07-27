import { useEffect, useRef } from "react";
import useStore from "../stores/store.ts";
import useAuthStore from "../stores/authStore.ts";
import MediaGridItem from "./MediaGridItem.tsx";
import useInfiniteMediaWithBookmarks from "../hooks/useInfiniteMediaWithBookmarks.ts";

type MediaGridProps = {
  pageTitle: string;
};

export default function MediaGrid({ pageTitle }: MediaGridProps) {
  const { toggleBookmark, searchInput } = useStore();
  const { user } = useAuthStore();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
      useInfiniteMediaWithBookmarks(user?.uid);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || !observerRef.current) return;

    const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 1 }
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [fetchNextPage, hasNextPage]);

  if (!user || !data) return null;

  const allItems = data.pages.flatMap((page) => page.items);

  const filteredItems = (() => {
    switch (pageTitle) {
      case "Movies":
        return allItems.filter((item) => item.category === "Movie");
      case "TV Series":
        return allItems.filter((item) => item.category === "TV Series");
      case "Bookmarked Movies":
        return allItems.filter(
            (item) => item.isBookmarked && item.category === "Movie"
        );
      case "Bookmarked TV Series":
        return allItems.filter(
            (item) => item.isBookmarked && item.category === "TV Series"
        );
      case "Recommended for you":
        return [...allItems].slice(6, 14);
      default:
        return allItems;
    }
  })();

  const searchResults = filteredItems.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const itemsToRender = searchInput ? searchResults : filteredItems;

  return (
      <div className="media-grid-container">
        <h2 className="pb-0">
          {searchInput
              ? `Found ${searchResults.length} results for '${searchInput}'`
              : pageTitle}
        </h2>
        <ul className="py-[var(--spacing-400)] gap-x-[var(--spacing-500)] gap-y-[var(--spacing-300)] grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
          {itemsToRender.map((item) => (
              <MediaGridItem
                  key={item.id}
                  toggleBookmark={() => toggleBookmark(item.id, user?.uid)}
                  {...item}
              />
          ))}
        </ul>

        {hasNextPage && (
            <div ref={observerRef} className="h-10 w-full text-center">
              {isFetchingNextPage ? "Loading more..." : "Scroll to load more"}
            </div>
        )}
      </div>
  );
}
