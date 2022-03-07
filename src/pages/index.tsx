import Head from "next/head";
import type { GetStaticProps } from "next";

import getPopularMovies from "./api/getPopularMovies";

import { Hero } from "../components/Hero";
import { MoviesList } from "../components/MoviesList";
import { Pagination } from "../components/Pagination";
import { LoadingToast } from "../components/LoadingToast";
import { useCallback, useState } from "react";

interface resultsInterface {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  formattedDate: string;
  backdrop_path: string | null;
  poster_path: string | null;
  genre_ids: number[];
}

type HomeProps = {
  data: {
    page: number;
    results: Array<resultsInterface>;
  };
};

export default function Home({ data }: HomeProps) {
  const [isLoading, setIsLoading] = useState(false);

  const showLoadingToast = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 4500);
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>TMDB</title>
        <meta
          name="description"
          content="Lista de filmes e séries do The Movie DataBase"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-brand-primary-dark">
        <Hero />
        <MoviesList movies={data.results} handleOnClick={showLoadingToast} />
        <Pagination />
      </main>

      <LoadingToast isLoading={isLoading} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getPopularMovies();

  const newData = {
    page: data.page,
    results: data.results.map((item) => ({
      ...item,
      formattedDate: new Date(item.release_date)
        .toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .replace(/ de |\./g, " "),
    })),
  };

  // release_date = "2021-12-14"
  // formattedDate = "14 DEZ 2021"

  return {
    props: { data: newData },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
