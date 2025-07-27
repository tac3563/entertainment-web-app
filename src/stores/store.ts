import { create } from "zustand/react";
import React from "react";
import { db } from "../firebaseConfig";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

type MediaItem = {
  id: number;
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
  };
};

type StoreState = {
  mediaItems: MediaItem[];
  searchInput: string;
  updateSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleBookmark: (itemId: number, userId: string) => Promise<void>;
  appendMediaItems: (items: MediaItem[]) => void;
};

const useStore = create<StoreState>((set, get) => ({
  mediaItems: [],
  searchInput: "",
  appendMediaItems: (items: MediaItem[]) =>
      set((state) => ({ mediaItems: [...state.mediaItems, ...items] })),


  updateSearch: (event) =>
      set({ searchInput: event.target.value }),

  toggleBookmark: async (itemId, userId) => {
    const ref = doc(db, "bookmarks", userId);
    const currentItems = get().mediaItems;
    const item = currentItems.find((m) => m.id === itemId);
    if (!item) return;

    const isBookmarked = item.isBookmarked;

    set({
      mediaItems: currentItems.map((m) =>
          m.id === itemId ? { ...m, isBookmarked: !isBookmarked } : m
      ),
    });

    await updateDoc(ref, {
      mediaIds: isBookmarked
          ? arrayRemove(itemId)
          : arrayUnion(itemId),
    });
  },
}));

export default useStore;
