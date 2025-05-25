import Search from "./Search.tsx";
import NavBar from "./Navbar.tsx";

export default function Home() {
    return (
        <>
            <aside><NavBar/></aside>
            <main className="max-w-screen-xl w-full">
                <Search/>
                <section>{/* Grid */}</section>
            </main>
        </>
    );
}
