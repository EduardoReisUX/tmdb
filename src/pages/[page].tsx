import Head from "next/head";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";

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
  popularMovies: {
    total_pages: number;
    page: number;
    results: Array<resultsInterface>;
  };
  genresList: Array<{ id: number; name: string }>;
};

export default function PopularMoviesPage({
  popularMovies,
  genresList,
}: HomeProps) {
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
        <Hero genres={genresList} />
        <MoviesList
          movies={popularMovies.results}
          handleOnClick={showLoadingToast}
        />
        <Pagination
          page={popularMovies.page}
          total_pages={popularMovies.total_pages}
        />
      </main>

      <LoadingToast isLoading={isLoading} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { page } = query;

  const data = await getPopularMovies(Number(page));

  const popularMovies = {
    page: data.popularMoviesData.page,
    total_pages: data.popularMoviesData.total_pages,
    results: data.popularMoviesData.results.map((item) => ({
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

  const genresList = data.genresListData.genres;

  return {
    props: {
      popularMovies,
      genresList,
    },
  };
};
