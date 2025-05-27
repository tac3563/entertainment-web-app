import useStore from "./stores/store.ts";

type MediaGridProps = {
  pageTitle: string;
};
export default function MediaGrid({ pageTitle }: MediaGridProps) {
  const { mediaItems, toggleBookmark } = useStore();

  const filteredMediaItems = (() => {
    switch (pageTitle) {
      case "Movies":
        return mediaItems.filter((item) => item.category === "Movie");
      case "TV Series":
        return mediaItems.filter((item) => item.category === "TV Series");
      case "Bookmarked":
        return mediaItems.filter((item) => item.isBookmarked);
      case "Recommended for you":
        return [...mediaItems].slice(0, 8);
      default:
        return mediaItems;
    }
  })();

  return (
    <div className="media-grid-container">
      <h2 className="pb-0">{pageTitle}</h2>
      <ul className="py-[var(--spacing-400)] gap-x-[var(--spacing-500)] gap-y-[var(--spacing-300)] grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {filteredMediaItems.map((item) => (
          <li className="relative" key={item.title}>
            <img
              className="rounded-lg w-full h-auto"
              src={item.thumbnail.regular.large}
              srcSet={`
                                ${item.thumbnail.regular.small} 480w,
                                ${item.thumbnail.regular.medium} 768w,
                                ${item.thumbnail.regular.large} 1280w
                               `}
              alt={item.title}
            />

            <div className="opacity-75 py-[var(--spacing-100)] flex gap-[var(--spacing-100)]">
              <p className="text-preset-5">{item.year}</p>
              <p className="text-preset-5">{item.category}</p>
              <p className="text-preset-5">{item.rating}</p>
            </div>
            <h3>{item.title}</h3>

            <div
              onClick={() => toggleBookmark(item.title)}
              className="cursor-pointer bg-[var(--color-blue-500-50)] flex-center rounded-full w-8 h-8 absolute top-4 right-4"
            >
              {item.isBookmarked ? (
                <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z"
                    fill="#FFF"
                  />
                </svg>
              ) : (
                <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                    stroke="#FFF"
                    stroke-width="1.5"
                    fill="none"
                  />
                </svg>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
