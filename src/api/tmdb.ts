const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Fetch movies and tv shows:
export async function fetchMediaItems() {
  try {
    const [moviesRes, tvRes] = await Promise.all([
      fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`),
      fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`),
    ]);

    if (!moviesRes.ok || !tvRes.ok) {
      throw new Error(
        `Fetch failed: Movies (${moviesRes.status}), TV (${tvRes.status})`,
      );
    }

    const moviesData = await moviesRes.json();
    const tvData = await tvRes.json();

    const movies = moviesData.results.map((item) => ({
      id: item.id,
      title: item.title,
      year: parseInt((item.release_date || "").slice(0, 4)),
      category: "Movie",
      rating: item.adult ? "18" : "PG",
      isBookmarked: false,
      isTrending: false,
      thumbnail: {
        regular: {
          small: `https://image.tmdb.org/t/p/w300${item.backdrop_path}`,
          medium: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
          large: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
        },
      },
    }));

    const tv = tvData.results.map((item) => ({
      id: item.id,
      title: item.name,
      year: parseInt((item.first_air_date || "").slice(0, 4)),
      category: "TV Series",
      rating: item.vote_average?.toFixed(1) || "N/A",
      isBookmarked: false,
      isTrending: false,
      thumbnail: {
        regular: {
          small: `https://image.tmdb.org/t/p/w300${item.backdrop_path}`,
          medium: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
          large: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
        },
      },
    }));
    console.log(movies);

    const combined = [...movies, ...tv];
    const sorted = combined.sort((a, b) => b.popularity - a.popularity);

    sorted.forEach((item, index) => {
      item.isTrending = index < 5;
    });

    return sorted;
  } catch (error) {
    console.error("Error fetching media items:", error);
    return [];
  }
}

// Fetch trailers:
