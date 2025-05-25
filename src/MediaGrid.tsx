import mediaItems from './data/data.json'

type MediaGridProps = {
    pageTitle: string
}
export default function MediaGrid({pageTitle}: MediaGridProps) {

    return (
        <div className="media-grid-container">
            <h1 className="pb-0">{pageTitle}</h1>
            <ul className="py-[var(--spacing-400)] gap-x-[var(--spacing-500)] gap-y-[var(--spacing-300)] grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                {
                    mediaItems.map((item) => (
                        <li key={item.title}>
                            <img className="rounded-lg" src={item.thumbnail.regular.large} alt=""/>
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
