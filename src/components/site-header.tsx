"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { LogoMark } from "@/components/icons";
import { SearchBox, SearchBoxSkeleton } from "@/components/search-box";
import { site } from "@/config/site";
import { useWatchlist } from "@/hooks/use-watchlist";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const active = usePathname() === href;
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-2 rounded-full px-3.5 py-2 font-medium transition-colors ${
        active ? "bg-raised text-fg" : "text-muted hover:text-fg"
      }`}
    >
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const { ready, items } = useWatchlist();

  return (
    <header className="flex flex-wrap items-center gap-x-8 gap-y-4">
      <Link href="/" className="flex items-center gap-2.5 text-fg">
        <LogoMark className="text-accent" />
        <span className="font-display text-[26px] font-extrabold tracking-[-0.04em]">{site.name}</span>
      </Link>

      <nav aria-label="Main" className="flex flex-wrap gap-1">
        {site.nav.map((link) => (
          <NavLink key={link.href} href={link.href}>
            {link.label}
          </NavLink>
        ))}
        <NavLink href={site.watchlist.href}>
          {site.watchlist.nav}
          {ready && items.length > 0 && (
            <span className="rounded-full bg-accent px-2 font-mono text-xs text-bg">
              <span className="sr-only">(</span>
              {items.length}
              <span className="sr-only"> saved)</span>
            </span>
          )}
        </NavLink>
      </nav>

      <div className="w-full md:ml-auto md:w-auto md:max-w-[380px] md:flex-[1_1_260px]">
        <Suspense fallback={<SearchBoxSkeleton />}>
          <SearchBox />
        </Suspense>
      </div>
    </header>
  );
}
