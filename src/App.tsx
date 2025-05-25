import PageLayout from "./components/PageLayout.tsx";
import Home from "./components/Home.tsx";
import {BrowserRouter} from "react-router-dom";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <PageLayout>
                    <Home/>
                </PageLayout>
            </BrowserRouter>
        </>
    );
}
