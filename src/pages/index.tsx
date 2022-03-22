import Head from "next/head";
import type { GetStaticProps } from "next";

import getPopularMovies from "./api/getPopularMovies";

import { Hero } from "../components/Hero";
import { MoviesList } from "../components/MoviesList";
import { Pagination } from "../components/Pagination";
import { LoadingToast } from "../components/LoadingToast";
import { useCallback, useState } from "react";

type SelectedGenresType = Array<{
  id: number;
  name: string;
  isSelected: boolean;
}>;

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

export default function Home({ popularMovies, genresList }: HomeProps) {
  const [isLoading, setIsLoading] = useState(false);

  const showLoadingToast = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 4500);
  }, [isLoading]);

  const [selectedGenres, setSelectedGenres] = useState<SelectedGenresType>(
    Array.from(genresList, ({ id, name }) => ({
      id,
      name,
      isSelected: false,
    }))
  );

  function toggleSelectedGenre(id: number) {
    if (selectedGenres.find((genre) => genre.id === id)) {
      const toggled = selectedGenres.map((genre) => {
        if (genre.id === id) {
          return {
            ...genre,
            isSelected: !genre.isSelected,
          };
        }

        return genre;
      });

      const newState = [...toggled];
      setSelectedGenres([...newState]);
    }
  }

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
        <Hero
          genres={selectedGenres}
          toggleSelectedGenre={toggleSelectedGenre}
        />
        <MoviesList
          movies={popularMovies.results}
          selectedGenres={selectedGenres}
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

export const getStaticProps: GetStaticProps = async () => {
  const data = await getPopularMovies();

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
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
