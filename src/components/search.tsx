"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PLACEHOLDERS: Record<string, string> = {
  "/movies": "Search for movies",
  "/tv-shows": "Search for TV series",
  "/watchlist": "Search your watchlist",
};

/** Keeps the search term in `?q=` so results are shareable and survive refresh and back/forward. */
export function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const [value, setValue] = useState(urlQuery);
  const [isPending, startTransition] = useTransition();

  // Follow the URL when it changes from outside (back button, nav link), but not when it's
  // catching up with our own debounced update, or it would overwrite what's been typed since.
  const [syncedQuery, setSyncedQuery] = useState(urlQuery);
  const [pushedQuery, setPushedQuery] = useState(urlQuery);
  if (urlQuery !== syncedQuery) {
    setSyncedQuery(urlQuery);
    if (urlQuery !== pushedQuery) setValue(urlQuery);
  }

  useEffect(() => {
    const next = value.trim();
    if (next === urlQuery) return;
    const timer = setTimeout(() => {
      setPushedQuery(next);
      const params = new URLSearchParams(searchParams);
      if (next) params.set("q", next);
      else params.delete("q");
      const qs = params.toString();
      startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
    }, 300);
    return () => clearTimeout(timer);
  }, [value, urlQuery, pathname, router, searchParams]);

  return (
    <header className="pt-[var(--spacing-400)]">
      <form role="search" className="flex items-center gap-[var(--spacing-400)]" onSubmit={(e) => e.preventDefault()}>
        <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" aria-hidden className="shrink-0">
          <path
            d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
            fill="#FFF"
          />
        </svg>
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          id="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="text-preset-2-light w-full border-b border-transparent bg-transparent py-2 caret-red-500 outline-none focus:border-blue-500"
          type="search"
          placeholder={PLACEHOLDERS[pathname] ?? "Search for movies or TV series"}
          aria-busy={isPending}
        />
      </form>
    </header>
  );
}

export function SearchSkeleton() {
  return <div className="h-[calc(var(--spacing-400)+48px)]" aria-hidden />;
}
