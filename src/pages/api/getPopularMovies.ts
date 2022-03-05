import { api } from "../../services/api";

export default async () => {
  const data = await (await api.get("/movie/popular")).data;

  return { data };
};
