import { useEffect, useRef, useState } from "react";
import useStore from "../stores/store.ts";
import { motion } from "framer-motion";
import BookmarkIcon from "./BookmarkIcon.tsx";

export default function Carousel() {
  const { mediaItems, toggleBookmark } = useStore();
  const trendingItems = mediaItems.filter((item) => item.isTrending);

  const listRef = useRef<HTMLUListElement>(null);
  const [inputMethod, setInputMethod] = useState<"mouse" | "keyboard">("mouse");

  // Accessibility: prevents mouse hover interfering with keyboard navigation:
  useEffect(() => {
    const handleKeyDown = () => setInputMethod("keyboard");
    const handleMouseDown = () => setInputMethod("mouse");

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const scrollToCenter = (index: number) => {
    const container = listRef.current;
    if (!container) return;

    const item = container.children[index] as HTMLElement;
    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    // Dynamically calculate the active element's distance from centre of the container:
    const offset =
      itemRect.left -
      containerRect.left -
      (containerRect.width - itemRect.width) / 2;

    container.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <>
      <h2>Trending</h2>
      <ul
        className="hide-scrollbar flex gap-[var(--spacing-500)] overflow-x-auto scroll-smooth"
        ref={listRef}
        tabIndex={0}
      >
        {trendingItems.map((item, index) => (
          <motion.li
            key={`trending-item-${index}`}
            className="relative w-[var(--carousel-max-width)] flex-shrink-0"
            onMouseEnter={() => {
              if (inputMethod === "mouse") {
                scrollToCenter(index);
              }
            }}
          >
            <img
              className="ratio-carousel max-w-none rounded-lg w-[var(--carousel-max-width)] h-auto "
              src={item.thumbnail.trending.large}
              srcSet={`
                               ${item.thumbnail.trending.small}  480w,
                                ${item.thumbnail.trending.large}
                               `}
              alt={item.title}
            />

            <div className="absolute bottom-6 left-6 flex flex-col ">
              <div className="opacity-75 py-[var(--spacing-100)] flex gap-[var(--spacing-100)]">
                <p className="text-preset-5">{item.year}</p>
                <p className="text-preset-5">{item.category}</p>
                <p className="text-preset-5">{item.rating}</p>
              </div>
              <h3>{item.title}</h3>
            </div>
            <BookmarkIcon
              title={item.title}
              isBookmarked={item.isBookmarked}
              toggleBookmark={toggleBookmark}
            />
          </motion.li>
        ))}
      </ul>
    </>
  );
}
