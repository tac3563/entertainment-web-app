import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { Search, SearchSkeleton } from "@/components/search";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Entertainment Web App", template: "%s · Entertainment Web App" },
  description: "Browse popular movies and TV series, and keep a watchlist.",
  icons: { icon: "/assets/images/logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#10141E",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-white px-4 py-2 text-blue-950 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <div className="flex flex-col justify-between md:flex-row md:gap-[var(--spacing-400)]">
          <aside>
            <Navbar />
          </aside>
          <main id="main" className="w-full min-w-0 pb-[var(--spacing-500)]">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
