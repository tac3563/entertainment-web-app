import { useQuery } from "@tanstack/react-query";
import useStore from "../stores/store.ts";
import { fetchMediaItems } from "../api/tmdb";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export function useFetchMediaWithBookmarks(userId?: string) {
    const setMediaItems = useStore((state) => state.setMediaItems);

    return useQuery({
        queryKey: ["mediaItems", userId],
        queryFn: async () => {
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

            setMediaItems(merged);

            return merged;
        },
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
}
