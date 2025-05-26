import {create} from "zustand/react";
import mediaItemsData from "../data/data.json"

const useStore = create(() => (
    {
        mediaItems: mediaItemsData
    }
))

export default useStore;
