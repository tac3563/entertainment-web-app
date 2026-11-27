export type MediaKind = "movie" | "tv";

export type MediaItem = {
  /** Unique across movies and TV, e.g. `movie-123` or `tv-123`. TMDb ids overlap between the two. */
  key: string;
  id: number;
  kind: MediaKind;
  title: string;
  year: number | null;
  /** TMDb audience score out of 10, one decimal, e.g. `"7.8"`. Null when there are too few votes. */
  rating: string | null;
  /** First listed genre, e.g. `"Sci-Fi & Fantasy"`. */
  genre: string | null;
  overview: string;
  /** TMDb image path, e.g. `/abc.jpg`. Sized by `TmdbImage`. */
  backdropPath: string | null;
};

export function kindLabel(kind: MediaKind) {
  return kind === "tv" ? "TV series" : "Movie";
}

export function tmdbUrl(item: Pick<MediaItem, "kind" | "id">) {
  return `https://www.themoviedb.org/${item.kind}/${item.id}`;
}
