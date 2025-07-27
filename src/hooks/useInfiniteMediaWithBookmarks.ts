import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMediaItems } from "../api/tmdb";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import useStore from "../stores/store.ts";

export default function useInfiniteMediaWithBookmarks(userId?: string) {
    const appendMediaItems = useStore((state) => state.appendMediaItems);

    return useInfiniteQuery({
        queryKey: ["mediaItems", userId],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            const items = await fetchMediaItems(pageParam);

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

            appendMediaItems(merged);

            return {
                items: merged,
                nextPage: items.length < 20 ? undefined : pageParam + 1,
            };
        },
        getNextPageParam: (lastPage) => lastPage?.nextPage,
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
}
