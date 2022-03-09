import { api } from "../../services/api";

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
  const popularMoviesData = await (
    await api.get<PopularMoviesType>("/movie/popular")
  ).data;

  const genresListData = await (
    await api.get<GenresListType>("/genre/movie/list")
  ).data;

  return { popularMoviesData, genresListData };
};
