import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { LoadingToast } from "../../components/LoadingToast";
import { MovieResume } from "../../components/MovieResume";
import { MoviesList } from "../../components/MoviesList";

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

        <section className="bg-brand-neutral-000 text-brand-neutral-900 py-12 px-2">
          <div className="max-w-screen-xl mx-auto flex flex-col gap-2">
            <h3 className="text-3xl font-bold">Elenco original</h3>
            <div className="grid grid-flow-col gap-4 overflow-x-scroll snap-x snap-mandatory pb-6">
              {castData.cast
                .slice(0, 10)
                .map(({ id, profile_path, name, character }) => (
                  <a
                    key={id}
                    href="#"
                    className="snap-start scroll-m-12 flex flex-col gap-4 py-2 px-2 border rounded shadow-md duration-150 hover:shadow-xl"
                  >
                    <div className="w-[175px] h-[222px]">
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${profile_path}`}
                        alt={name}
                        width={175}
                        height={222}
                        className="rounded"
                      />
                    </div>

                    <div>
                      <strong className="text-lg">{name}</strong>
                      <p>{character}</p>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-neutral-000 text-brand-neutral-900 -mt-1 pb-12 px-2">
          <div className="max-w-screen-xl mx-auto flex flex-col gap-2">
            <h3 className="text-3xl font-bold">Recomendações</h3>

            <div className="grid grid-flow-col gap-4 overflow-x-scroll snap-x snap-mandatory pb-6">
              {recommendedMoviesData.results.map(
                ({ id, poster_path, backdrop_path, title, formattedDate }) => (
                  <Link key={id} href={`${id}`} passHref>
                    <a
                      className="snap-start scroll-m-12 flex flex-col gap-4 py-2 px-2 border rounded shadow-md duration-150 hover:shadow-xl"
                      onClick={() => showLoadingToast()}
                    >
                      <div className="w-[156px] h-[232px]">
                        <Image
                          src={`https://image.tmdb.org/t/p/original/${
                            poster_path || backdrop_path
                          }`}
                          alt={title}
                          width={156}
                          height={232}
                          className="rounded"
                        />
                      </div>

                      <div>
                        <strong className="text-lg">{title}</strong>
                        <p className="uppercase text-xs text-brand-neutral-500 font-bold">
                          {formattedDate}
                        </p>
                      </div>
                    </a>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>

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
