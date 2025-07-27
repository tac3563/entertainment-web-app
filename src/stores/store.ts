import { create } from "zustand/react";
import { fetchMediaItems } from "../api/tmdb";
import { db } from "../firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
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
  updateSearch: (event: string) => void;
  toggleBookmark: (itemId: number, userId: string) => Promise<void>;
  fetchAndSetMediaItems: (userId?: string) => Promise<void>;
};

const useStore = create<StoreState>((set, get) => ({
  mediaItems: [],
  searchInput: "",

  updateSearch: (value: string) => set({ searchInput: value }),

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

  fetchAndSetMediaItems: async (userId) => {
    const items = await fetchMediaItems();
    let bookmarkedIds: number[] = [];

    if (userId) {
      const ref = doc(db, "bookmarks", userId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        bookmarkedIds = snap.data().mediaIds || [];
      } else {
        await setDoc(ref, { mediaIds: [] });
      }
    }

    const merged = items.map((item) => ({
      ...item,
      isBookmarked: bookmarkedIds.includes(item.id),
    }));

    set({ mediaItems: merged });
  },
}));

export default useStore;
