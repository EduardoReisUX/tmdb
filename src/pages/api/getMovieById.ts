export type MovieType = {
  title: string;
  overview: string;
  vote_average: number;
  runtime: number;
  release_date: string;
  backdrop_path: string | null;
  poster_path: string | null;
  genres: Array<{
    id: number;
    name: string;
  }>;
};

export type CastsType = {
  id: number;
  cast: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string;
  }>;
  crew: Array<{
    id: number;
    name: string;
    job: string;
  }>;
};

export interface resultsInterface {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  backdrop_path: string | null;
  poster_path: string | null;
  genre_ids: number[];
}

export type RecommendedMoviesType = {
  page: number;
  results: Array<resultsInterface>;
};

export default async (movieId: number) => {
  const BASE_URL = process.env.BASE_URL;
  const FETCH_CONFIG = process.env.FETCH_CONFIG;

  const movieResponse = await fetch(
    `${BASE_URL}/movie/${movieId}${FETCH_CONFIG}`
  );
  const movieData: MovieType = await movieResponse.json();

  const castResponse = await fetch(
    `${BASE_URL}/movie/${movieId}/credits${FETCH_CONFIG}`
  );
  const castData: CastsType = await castResponse.json();

  const recommendedMoviesResponse = await fetch(
    `${BASE_URL}/movie/${movieId}/recommendations${FETCH_CONFIG}`
  );
  const recommendedMoviesData: RecommendedMoviesType =
    await recommendedMoviesResponse.json();

  return { movieData, castData, recommendedMoviesData };
};
