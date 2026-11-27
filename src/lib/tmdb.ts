import "server-only";
import { cacheLife } from "next/cache";
import type { MediaItem } from "@/types/media";

const BASE_URL = "https://api.themoviedb.org/3";

type TmdbMovie = {
  id: number;
  title: string;
  release_date?: string;
  backdrop_path: string | null;
  adult: boolean;
  popularity: number;
};

type TmdbTV = {
  id: number;
  name: string;
  first_air_date?: string;
  backdrop_path: string | null;
  vote_average?: number;
  popularity: number;
};

type Ranked = MediaItem & { popularity: number };

function parseYear(date?: string): number | null {
  const year = parseInt((date ?? "").slice(0, 4), 10);
  return Number.isNaN(year) ? null : year;
}

async function tmdbFetch<T>(path: string): Promise<{ results: T[] }> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB_API_KEY is not set");

  const res = await fetch(`${BASE_URL}${path}?api_key=${apiKey}`);
  if (!res.ok) throw new Error(`TMDb ${path} failed with ${res.status}`);
  return res.json();
}

/**
 * Popular movies and TV combined, most popular first. Cached for an hour and
 * shared across every request. Errors are thrown (not cached) so `error.tsx` shows them.
 */
export async function getPopularMedia(): Promise<MediaItem[]> {
  "use cache";
  cacheLife("hours");

  const [movies, tv] = await Promise.all([
    tmdbFetch<TmdbMovie>("/movie/popular"),
    tmdbFetch<TmdbTV>("/tv/popular"),
  ]);

  const items: Ranked[] = [
    ...movies.results.map((m) => ({
      key: `movie-${m.id}`,
      id: m.id,
      title: m.title,
      year: parseYear(m.release_date),
      category: "Movie" as const,
      rating: m.adult ? "18" : "PG",
      backdropPath: m.backdrop_path,
      popularity: m.popularity,
    })),
    ...tv.results.map((t) => ({
      key: `tv-${t.id}`,
      id: t.id,
      title: t.name,
      year: parseYear(t.first_air_date),
      category: "TV Series" as const,
      rating: t.vote_average?.toFixed(1) ?? "N/A",
      backdropPath: t.backdrop_path,
      popularity: t.popularity,
    })),
  ];

  return items
    .sort((a, b) => b.popularity - a.popularity)
    .map((ranked) => {
      const item: MediaItem & { popularity?: number } = { ...ranked };
      delete item.popularity;
      return item;
    });
}
