import { create } from "zustand/react";
import React from "react";
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
  searchInput: string;
  updateSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleBookmark: (title: string) => void;
};

const useStore = create<StoreState>((set) => ({
  mediaItems: mediaItemsData as MediaItem[],
  searchInput: "",
  updateSearch: (event) =>
    set(() => ({
      searchInput: event.target.value,
    })),
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
