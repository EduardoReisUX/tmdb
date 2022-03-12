interface resultsInterface {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  backdrop_path: string | null;
  poster_path: string | null;
  genre_ids: number[];
}

type PopularMoviesType = {
  page: number;
  results: Array<resultsInterface>;
};

type GenresListType = {
  genres: Array<{
    id: number;
    name: string;
  }>;
};

export default async () => {
  const BASE_URL = process.env.BASE_URL;
  const FETCH_CONFIG = process.env.FETCH_CONFIG;

  const popularMovieResponse = await fetch(
    `${BASE_URL}/movie/popular${FETCH_CONFIG}`
  );
  const popularMoviesData: PopularMoviesType =
    await popularMovieResponse.json();

  const genresListResponse = await fetch(
    `${BASE_URL}/genre/movie/list${FETCH_CONFIG}`
  );
  const genresListData: GenresListType = await genresListResponse.json();

  return { popularMoviesData, genresListData };
};
