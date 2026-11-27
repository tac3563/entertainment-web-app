import "server-only";
import { cacheLife } from "next/cache";
import type { MediaItem, MediaKind } from "@/types/media";

const BASE_URL = "https://api.themoviedb.org/3";

type TmdbResult = {
  id: number;
  media_type?: string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  backdrop_path: string | null;
  overview?: string;
  vote_average?: number;
  vote_count?: number;
  genre_ids?: number[];
};

type Page = { results: TmdbResult[] };

// Errors are thrown, not cached, so `error.tsx` shows them and the next request retries.
async function tmdb<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB_API_KEY is not set. Add it to .env.local.");

  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", apiKey);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDb ${path} failed with ${res.status}`);
  return res.json();
}

async function getGenres(): Promise<Record<string, string>> {
  "use cache";
  cacheLife("days");

  type Genres = { genres: { id: number; name: string }[] };
  const [movie, tv] = await Promise.all([
    tmdb<Genres>("/genre/movie/list"),
    tmdb<Genres>("/genre/tv/list"),
  ]);
  return Object.fromEntries([...movie.genres, ...tv.genres].map((g) => [String(g.id), g.name]));
}

function toMediaItem(r: TmdbResult, kind: MediaKind, genres: Record<string, string>): MediaItem {
  const date = kind === "movie" ? r.release_date : r.first_air_date;
  const year = parseInt((date ?? "").slice(0, 4), 10);
  const genreId = r.genre_ids?.[0];

  return {
    key: `${kind}-${r.id}`,
    id: r.id,
    kind,
    title: (kind === "movie" ? r.title : r.name) ?? "Untitled",
    year: Number.isNaN(year) ? null : year,
    rating: r.vote_average && (r.vote_count ?? 0) >= 20 ? r.vote_average.toFixed(1) : null,
    genre: genreId !== undefined ? (genres[String(genreId)] ?? null) : null,
    overview: r.overview ?? "",
    backdropPath: r.backdrop_path,
  };
}

function isMediaKind(value: string | undefined): value is MediaKind {
  return value === "movie" || value === "tv";
}

/** TMDb's weekly trending list, films and TV mixed. Titles without artwork are skipped. */
export async function getTrending(): Promise<MediaItem[]> {
  "use cache";
  cacheLife("hours");

  const [page, genres] = await Promise.all([tmdb<Page>("/trending/all/week"), getGenres()]);
  return page.results
    .filter((r) => isMediaKind(r.media_type) && r.backdrop_path)
    .map((r) => toMediaItem(r, r.media_type as MediaKind, genres));
}

/** The first `pages` pages (20 each) of popular movies or TV, de-duplicated. */
export async function getPopular(kind: MediaKind, pages = 2): Promise<MediaItem[]> {
  "use cache";
  cacheLife("hours");

  const [results, genres] = await Promise.all([
    Promise.all(
      Array.from({ length: pages }, (_, i) => tmdb<Page>(`/${kind}/popular`, { page: String(i + 1) })),
    ),
    getGenres(),
  ]);

  const seen = new Set<number>();
  return results
    .flatMap((p) => p.results)
    .filter((r) => !seen.has(r.id) && seen.add(r.id))
    .map((r) => toMediaItem(r, kind, genres));
}
