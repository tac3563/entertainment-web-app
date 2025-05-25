import Search from "./Search.tsx";
import NavBar from "./Navbar.tsx";
import MediaGrid from "../MediaGrid.tsx";

export default function Home() {
    return (
        <>
            <aside><NavBar/></aside>
            <main className="max-w-screen-xl w-full">
                <Search/>
                <section>
                    <MediaGrid pageTitle='Home'/>
                </section>
            </main>
        </>
    );
}
