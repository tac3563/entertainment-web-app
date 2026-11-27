export type MediaCategory = "Movie" | "TV Series";

export type MediaItem = {
  /** Unique across movies and TV, e.g. `movie-123` or `tv-123`. TMDb ids overlap between the two. */
  key: string;
  id: number;
  title: string;
  year: number | null;
  category: MediaCategory;
  rating: string;
  /** TMDb image path, e.g. `/abc.jpg`. Sized by `TmdbImage`. */
  backdropPath: string | null;
};
