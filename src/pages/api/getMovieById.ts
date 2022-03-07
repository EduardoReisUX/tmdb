import { api } from "../../services/api";

type MovieType = {
  title: string;
  overview: string;
  vote_average: number;
  run_time: number;
  release_date: string;
  genres: Array<{
    id: number;
    name: string;
  }>;
};

type CastsType = {
  id: number;
  cast: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string;
  }>;
};

interface resultsInterface {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  backdrop_path: string | null;
  poster_path: string | null;
  genre_ids: number[];
}

type RecommendedMoviesType = {
  page: number;
  results: Array<resultsInterface>;
};

export default async (movieId: number) => {
  const movieData = (await api.get<MovieType>(`/movie/${movieId}`)).data;

  const castData = (await api.get<CastsType>(`/movie/${movieId}/credits`)).data;

  const recommendedMoviesData = (
    await api.get<RecommendedMoviesType>(`/movie/${movieId}/credits`)
  ).data;

  const data = { movieData, castData, recommendedMoviesData };

  return data;
};
