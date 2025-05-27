import { create } from "zustand/react";
import mediaItemsData from "../data/data.json";

type MediaItem = {
  title: string;
  year: number;
  category: "Movie" | "TV Series";
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
  thumbnail: {
    regular: {
      small: string;
      medium: string;
      large: string;
    };
    trending: {
      small: string;
      large: string;
    };
  };
};

type StoreState = {
  mediaItems: MediaItem[];
  toggleBookmark: (title: string) => void;
};

const useStore = create<StoreState>((set) => ({
  mediaItems: mediaItemsData as MediaItem[],
  toggleBookmark: (title) =>
    set((state) => ({
      mediaItems: state.mediaItems.map((item) =>
        item.title === title
          ? { ...item, isBookmarked: !item.isBookmarked }
          : item,
      ),
    })),
}));

export default useStore;
