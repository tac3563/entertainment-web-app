import BookmarkIcon from "./BookmarkIcon.tsx";

type MediaGridItemProps = {
  title: string;
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  thumbnail: {
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  toggleBookmark: (title: string) => void;
};

export default function MediaGridItem({
  title,
  year,
  category,
  rating,
  isBookmarked,
  thumbnail,
  toggleBookmark,
}: MediaGridItemProps) {
  return (
    <li className="relative">
      <img
        className="rounded-lg w-full h-auto"
        src={thumbnail.regular.large}
        srcSet={`
                                ${thumbnail.regular.small} 480w,
                                ${thumbnail.regular.medium} 768w,
                                ${thumbnail.regular.large} 1280w
                               `}
        alt={title}
      />

      <div className="opacity-75 py-[var(--spacing-100)] flex gap-[var(--spacing-100)]">
        <p className="text-preset-5">{year}</p>
        <p className="text-preset-5">{category}</p>
        <p className="text-preset-5">{rating}</p>
      </div>
      <h3>{title}</h3>

      <BookmarkIcon
        title={title}
        isBookmarked={isBookmarked}
        toggleBookmark={toggleBookmark}
      />
    </li>
  );
}
