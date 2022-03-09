import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { CastsList } from "../../components/CastsList";
import { LoadingToast } from "../../components/LoadingToast";
import { MovieResume } from "../../components/MovieResume";
import { RecommendedMoviesList } from "../../components/RecommendedMoviesList";

import getMovieById, { CastsType, MovieType } from "../api/getMovieById";

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

type MovieByIdProps = {
  data: {
    movieData: MovieType;
    castData: CastsType;
    recommendedMoviesData: { page: number; results: Array<resultsInterface> };
  };
};

export default function MovieById({ data }: MovieByIdProps) {
  const { movieData, castData, recommendedMoviesData } = data;

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
        <title>TMDB | {movieData.title}</title>
        <meta
          name="description"
          content="Lista de filmes e séries do The Movie DataBase"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-brand-primary-dark">
        <MovieResume movie={movieData} casts={castData} />

        <CastsList cast={castData.cast} />

        <RecommendedMoviesList
          data={recommendedMoviesData}
          showLoadingToast={showLoadingToast}
        />

        <LoadingToast isLoading={isLoading} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { id } = query;

  const data = await getMovieById(Number(id));

  const recommendedMoviesnewData = {
    page: data.recommendedMoviesData.page,
    results: data.recommendedMoviesData.results.map((item) => ({
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

  return {
    props: {
      data: {
        movieData: data.movieData,
        castData: data.castData,
        recommendedMoviesData: recommendedMoviesnewData,
      },
    },
  };
};
