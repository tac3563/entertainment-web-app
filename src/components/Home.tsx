import Search from "./Search.tsx";
import NavBar from "./Navbar.tsx";
import MediaGrid from "../MediaGrid.tsx";
import Carousel from "./Carousel.tsx";
import { Routes, Route } from "react-router-dom";

export default function Home() {
  return (
    <>
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
