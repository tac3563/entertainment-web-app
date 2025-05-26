import useStore from "./stores/store.ts";

type MediaGridProps = {
    pageTitle: string
}
export default function MediaGrid({pageTitle}: MediaGridProps) {
    const {mediaItems} = useStore();

    const filteredMediaItems = (() => {
        switch (pageTitle) {
            case 'Movies':
                return mediaItems.filter(item => item.category === 'Movie');
            case 'TV Series':
                return mediaItems.filter(item => item.category === 'TV Series');
            case 'Bookmarked':
                return mediaItems.filter(item => item.isBookmarked);
            case 'Recommended for you':
                return [...mediaItems].slice(0, 8);
            default:
                return mediaItems;
        }
    })();

    return (
        <div className="media-grid-container">
            <h1 className="pb-0">{pageTitle}</h1>
            <ul className="py-[var(--spacing-400)] gap-x-[var(--spacing-500)] gap-y-[var(--spacing-300)] grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
                {
                    filteredMediaItems.map((item) => (
                        <li key={item.title}>
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
                                <p className='text-preset-5'>{item.year}</p>
                                <p className='text-preset-5'>{item.category}</p>
                                <p className='text-preset-5'>{item.rating}</p>
                            </div>
                            <h3>{item.title}</h3>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
