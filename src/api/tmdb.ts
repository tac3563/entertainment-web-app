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

    const movies = await moviesRes.json();
    const tv = await tvRes.json();

    return console.log([movies, tv]);
  } catch (error) {
    console.error("Error fetching media items:", error);
    return [];
  }
}
