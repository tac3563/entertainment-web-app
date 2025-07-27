import { motion, AnimatePresence } from "framer-motion";
import useStore from "../stores/store.ts";
import MediaGridItem from "./MediaGridItem.tsx";
import useAuthStore from "../stores/authStore.ts";

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

type MediaGridProps = {
  pageTitle: string;
  items: {
    id: string;
    title: string;
    category: string;
    isBookmarked: boolean;
    [key: string]: any;
  }[];
};

export default function MediaGrid({ pageTitle, items }: MediaGridProps) {
  const { toggleBookmark, searchInput } = useStore();
  const { user } = useAuthStore();

  if (!user) return null;

  const searchResults = items.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const itemsToShow = searchInput ? searchResults : items;

  return (
      <div className="media-grid-container">
        <h2 className="pb-0">
          {searchInput
              ? `Found ${searchResults.length} results for '${searchInput}'`
              : pageTitle}
        </h2>
        <ul className="py-[var(--spacing-400)] md:gap-x-[var(--spacing-500)] gap-x-[var(--spacing-300)] gap-y-[var(--spacing-300)] grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
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
                      toggleBookmark={() => toggleBookmark(item.id, user.uid)}
                      {...item}
                  />
                </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
  );
}
