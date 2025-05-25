import Search from "./Search.tsx";
import NavBar from "./Navbar.tsx";
import MediaGrid from "../MediaGrid.tsx";
import {Routes, Route} from "react-router-dom";

export default function Home() {
    return (
        <>
            <aside><NavBar/></aside>
            <main className="max-w-screen-xl w-full">
                <Search/>
                <section>
                    <Routes>
                        <Route path='/' element={
                            <MediaGrid pageTitle='Recommended for you'/>
                        }/>
                        <Route path='/movies' element={
                            <MediaGrid pageTitle='Movies'/>
                        }/>
                        <Route path='/tv-shows' element={
                            <MediaGrid pageTitle='TV shows'/>
                        }/>
                        <Route path='/bookmarked' element={
                            <MediaGrid pageTitle='Bookmarked'/>
                        }/>
                    </Routes>
                </section>
            </main>
        </>
    );
}
