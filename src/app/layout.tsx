import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/config/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: site.title, template: `%s · ${site.title}` },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: "#0a0c12",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${geist.variable} ${geistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <div className="container-page flex min-h-dvh flex-col gap-14 pt-6 pb-16">
          <SiteHeader />
          <main id="main" className="flex flex-1 flex-col gap-14">
            {children}
          </main>
          <footer className="flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-[13px] text-muted">
            <span>This product uses the TMDb API but is not endorsed or certified by TMDb.</span>
            <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="hover:text-fg">
              Data from TMDb
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
