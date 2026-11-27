"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "@/components/icons";

/**
 * Typing sends you to /search?q=…, so results can be shared and survive refresh.
 * Press "/" anywhere to jump here.
 */
export function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const onSearchPage = pathname === "/search";
  const urlQuery = onSearchPage ? (searchParams.get("q") ?? "") : "";
  const [value, setValue] = useState(urlQuery);
  const [isPending, startTransition] = useTransition();

  // Follow the URL when it changes from outside (back button, leaving /search), but not
  // when it's catching up with our own debounced update, or it would overwrite newer typing.
  const [syncedQuery, setSyncedQuery] = useState(urlQuery);
  const [pushedQuery, setPushedQuery] = useState(urlQuery);
  if (urlQuery !== syncedQuery) {
    setSyncedQuery(urlQuery);
    if (urlQuery !== pushedQuery) setValue(urlQuery);
  }

  useEffect(() => {
    const next = value.trim();
    if (next === urlQuery) return;
    if (!next && !onSearchPage) return;

    const timer = setTimeout(() => {
      setPushedQuery(next);
      const href = next ? `/search?q=${encodeURIComponent(next)}` : "/search";
      startTransition(() => {
        if (onSearchPage) router.replace(href, { scroll: false });
        else router.push(href);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [value, urlQuery, onSearchPage, router]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement;
      if (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      event.preventDefault();
      inputRef.current?.focus();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full items-center gap-2.5 rounded-full border border-line-strong bg-surface px-3.5 py-2.5 transition-colors focus-within:border-accent"
    >
      <SearchIcon className={isPending ? "animate-pulse text-accent" : "text-muted"} />
      <label htmlFor="site-search" className="sr-only">
        Search films and TV
      </label>
      <input
        ref={inputRef}
        id="site-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search films and TV"
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent text-fg outline-none placeholder:text-muted"
      />
      <kbd className="hidden rounded-md border border-line-strong px-1.5 font-mono text-xs text-muted sm:block" aria-hidden>
        /
      </kbd>
    </form>
  );
}

export function SearchBoxSkeleton() {
  return <div className="h-[46px] w-full rounded-full border border-line-strong bg-surface" aria-hidden />;
}
