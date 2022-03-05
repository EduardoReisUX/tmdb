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

type DataType = {
  page: number;
  results: Array<resultsInterface>;
};

export default async () => {
  const responseData = await (await api.get<DataType>("/movie/popular")).data;

  return responseData;
};
