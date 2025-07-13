import useStore from "../stores/store.ts";
import MediaGridItem from "./MediaGridItem.tsx";

type MediaGridProps = {
  pageTitle: string;
};

export default function MediaGrid({ pageTitle }: MediaGridProps) {
  const { mediaItems, toggleBookmark, searchInput } = useStore();

  const filteredMediaItems = (() => {
    switch (pageTitle) {
      case "Movies":
        return mediaItems.filter((item) => item.category === "Movie");
      case "TV Series":
        return mediaItems.filter((item) => item.category === "TV Series");
      case "Bookmarked Movies":
        return mediaItems.filter(
          (item) => item.isBookmarked && item.category === "Movie",
        );
      case "Bookmarked TV Series":
        return mediaItems.filter(
          (item) => item.isBookmarked && item.category === "TV Series",
        );
      case "Recommended for you":
        return [...mediaItems].slice(6, 14);
      default:
        return mediaItems;
    }
  })();

  const searchResults = filteredMediaItems.filter((item) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase()),
  );

  return (
    <div className="media-grid-container">
      <h2 className="pb-0">
        {searchInput
          ? `Found ${searchResults.length} results for '${searchInput}'`
          : pageTitle}
      </h2>
      <ul className="py-[var(--spacing-400)] gap-x-[var(--spacing-500)] gap-y-[var(--spacing-300)] grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {searchInput
          ? searchResults.map((item) => (
              <MediaGridItem
                key={item.title}
                toggleBookmark={toggleBookmark}
                {...item}
              />
            ))
          : filteredMediaItems.map((item) => (
              <MediaGridItem
                key={item.title}
                toggleBookmark={toggleBookmark}
                {...item}
              />
            ))}
      </ul>
    </div>
  );
}
