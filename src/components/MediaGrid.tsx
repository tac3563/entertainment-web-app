import { motion, AnimatePresence } from "framer-motion";
import useStore from "../stores/store.ts";
import MediaGridItem from "./MediaGridItem.tsx";
import useAuthStore from "../stores/authStore.ts";

type MediaGridProps = {
  pageTitle: string;
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export default function MediaGrid({ pageTitle }: MediaGridProps) {
  const { mediaItems, toggleBookmark, searchInput } = useStore();
  const { user } = useAuthStore();

  if (!user) return null;

  const filteredMediaItems = (() => {
    switch (pageTitle) {
      case "Movies":
        return mediaItems.filter((item) => item.category === "Movie");
      case "TV Series":
        return mediaItems.filter((item) => item.category === "TV Series");
      case "Bookmarked Movies":
        return mediaItems.filter(
            (item) => item.isBookmarked && item.category === "Movie"
        );
      case "Bookmarked TV Series":
        return mediaItems.filter(
            (item) => item.isBookmarked && item.category === "TV Series"
        );
      case "Recommended for you":
        return [...mediaItems].slice(6, 14);
      default:
        return mediaItems;
    }
  })();

  const searchResults = filteredMediaItems.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const itemsToShow = searchInput ? searchResults : filteredMediaItems;

  return (
      <div className="media-grid-container">
        <h2 className="pb-0">
          {searchInput
              ? `Found ${searchResults.length} results for '${searchInput}'`
              : pageTitle}
        </h2>
        <ul className="py-[var(--spacing-400)] gap-x-[var(--spacing-500)] gap-y-[var(--spacing-300)] grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
          <AnimatePresence>
            {itemsToShow.map((item) => (
                <motion.li
                    key={item.id}
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={itemVariants}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <MediaGridItem
                      toggleBookmark={() => toggleBookmark(item.id, user?.uid)}
                      {...item}
                  />
                </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
  );
}
