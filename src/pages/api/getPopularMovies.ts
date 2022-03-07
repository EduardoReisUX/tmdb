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

export default async () => {
  const popularMoviesData = await (
    await api.get<PopularMoviesType>("/movie/popular")
  ).data;

  return popularMoviesData;
};
