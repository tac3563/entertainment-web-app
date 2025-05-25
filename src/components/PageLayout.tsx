import type {ReactNode} from "react";

type PageLayoutProps = {
    children: ReactNode;
};

export default function PageLayout({children}: PageLayoutProps) {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-[var(--spacing-400)] justify-between max-w-[var(--max-w-7xl)]" id="page-wrapper">{children}</div>
        </>
    );
}
