import useStore from "../stores/store.ts";

export default function Carousel() {
  const { mediaItems } = useStore();

  const trendingItems = mediaItems.filter((item) => {
    return item.isTrending;
  });

  return (
    <>
      <h2>Trending</h2>
      <ul className="flex gap-[var(--spacing-500)] overflow-scroll">
        {trendingItems.map((item, index) => (
          <li
            key={`trending-item-${index}`}
            className="relative w-[var(--carousel-max-width)] w-full"
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
          </li>
        ))}
      </ul>
    </>
  );
}
