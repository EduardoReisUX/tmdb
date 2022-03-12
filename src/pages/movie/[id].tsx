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

interface MovieTypeFormatted {
  formattedDate: string;
  duration: string;
  vote_average_formatted: number;
  title: string;
  certification: string | undefined;
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
}

type MovieByIdProps = {
  data: {
    movieData: MovieTypeFormatted;
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

  const movieNewData = {
    ...data.movieData,
    formattedDate: new Date(data.movieData.release_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    ),
    duration: `${Math.floor(data.movieData.runtime / 60)}h${Math.floor(
      data.movieData.runtime % 60
    )}m`,
    vote_average_formatted: data.movieData.vote_average * 10,
    certification: data.movieData.release_dates.results.find(
      ({ iso_3166_1 }) => iso_3166_1 === "BR"
    )?.release_dates[0].certification,
  };

  return {
    props: {
      data: {
        movieData: movieNewData,
        castData: data.castData,
        recommendedMoviesData: recommendedMoviesnewData,
      },
    },
  };
};
