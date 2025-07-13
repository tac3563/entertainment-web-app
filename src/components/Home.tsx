import Search from "./Search.tsx";
import NavBar from "./Navbar.tsx";
import MediaGrid from "./MediaGrid.tsx";
import Carousel from "./Carousel.tsx";
import Auth from "./Auth.tsx";
import useAuthStore from "../stores/authStore.ts";
import useStore from "../stores/store.ts";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

type AuthType = "Login" | "Sign up";
type handleAuthType = () => void;

export default function Home() {
  const { userIsAuthenticated } = useAuthStore();
  const [authType, setAuthType] = useState<AuthType>("Login");
  const handleAuthType: handleAuthType = () => {
    setAuthType((prev) => (prev === "Login" ? "Sign up" : "Login"));
  };

  const fetchAndSetMediaItems = useStore(
    (state) => state.fetchAndSetMediaItems,
  );

  useEffect(() => {
    fetchAndSetMediaItems();
  }, [fetchAndSetMediaItems]);

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
          <Routes>
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
            <Route
              path="/tv-shows"
              element={<MediaGrid pageTitle="TV Series" />}
            />
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
        </section>
      </main>
    </>
  );
}
