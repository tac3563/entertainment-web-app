import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Search from "./Search.tsx";
import NavBar from "./Navbar.tsx";
import MediaGrid from "./MediaGrid.tsx";
import Carousel from "./Carousel.tsx";
import Auth from "./Auth.tsx";
import useAuthStore from "../stores/authStore.ts";
import useStore from "../stores/store.ts";
import { useEffect, useState } from "react";

export default function Home() {
    const location = useLocation();
    const { userIsAuthenticated, user, loading } = useAuthStore();
    const [authType, setAuthType] = useState<"Login" | "Sign up">("Login");
    const fetchAndSetMediaItems = useStore((state) => state.fetchAndSetMediaItems);

    const handleAuthType = () => {
        setAuthType((prev) => (prev === "Login" ? "Sign up" : "Login"));
    };

    useEffect(() => {
        if (!loading) {
            fetchAndSetMediaItems(user?.uid);
        }
    }, [user, loading, fetchAndSetMediaItems]);

    const pageTransitionVariants = {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeInOut" } },
        exit: { opacity: 0, x: 50, transition: { duration: 1, ease: "easeInOut" } },
    };

    return (
        <>
            {!userIsAuthenticated && (
                <Auth authType={authType} handleAuthType={handleAuthType} />
            )}
            <aside>
                <NavBar />
            </aside>
            <main className="w-full">
                <Search />
                <section>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            variants={pageTransitionVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            style={{ position: "relative" }}
                        >
                            <Routes location={location} key={location.pathname}>
                                <Route
                                    path="/"
                                    element={
                                        <>
                                            <Carousel />
                                            <MediaGrid pageTitle="Recommended for you" />
                                        </>
                                    }
                                />
                                <Route path="/movies" element={<MediaGrid pageTitle="Movies" />} />
                                <Route path="/tv-shows" element={<MediaGrid pageTitle="TV Series" />} />
                                <Route
                                    path="/bookmarked"
                                    element={
                                        <>
                                            <MediaGrid pageTitle="Bookmarked Movies" />
                                            <MediaGrid pageTitle="Bookmarked TV Series" />
                                        </>
                                    }
                                />
                            </Routes>
                        </motion.div>
                    </AnimatePresence>
                </section>
            </main>
        </>
    );
}
