"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { MediaItem } from "@/types/media";

// Temporary, account-free watchlist saved in this browser only. Swap the store for a
// server-backed one when auth is added; components only use the hook's return value.

const STORAGE_KEY = "watchlist";

type Saved = Record<string, MediaItem>;

const EMPTY: Saved = {};
const listeners = new Set<() => void>();
let cache: { raw: string | null; items: Saved } = { raw: null, items: EMPTY };

function parse(raw: string | null): Saved {
  if (!raw) return EMPTY;
  try {
    const value: unknown = JSON.parse(raw);
    return value && typeof value === "object" && !Array.isArray(value) ? (value as Saved) : EMPTY;
  } catch {
    return EMPTY;
  }
}

// Returns the same object until storage changes, as useSyncExternalStore requires.
function getSnapshot(): Saved {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage blocked (e.g. some private modes): behave as an empty list.
  }
  if (raw !== cache.raw) cache = { raw, items: parse(raw) };
  return cache.items;
}

// null on the server and during hydration, so the UI can tell "not loaded yet" from "empty".
function getServerSnapshot(): Saved | null {
  return null;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Keep other tabs in sync.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function save(items: Saved) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Couldn't save watchlist:", error);
  }
  listeners.forEach((listener) => listener());
}

export function useWatchlist() {
  const saved = useSyncExternalStore<Saved | null>(subscribe, getSnapshot, getServerSnapshot);

  const items = useMemo(() => Object.values(saved ?? EMPTY), [saved]);

  const isSaved = useCallback((key: string) => !!saved && key in saved, [saved]);

  const toggle = useCallback((item: MediaItem) => {
    const current = getSnapshot();
    if (item.key in current) {
      const next = { ...current };
      delete next[item.key];
      save(next);
    } else {
      save({ ...current, [item.key]: item });
    }
  }, []);

  return { ready: saved !== null, items, isSaved, toggle };
}
