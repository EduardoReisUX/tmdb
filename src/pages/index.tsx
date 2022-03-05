import Head from "next/head";
import type { GetStaticProps } from "next";

import getPopularMovies from "./api/getPopularMovies";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "../components/Pagination";

interface resultsInterface {
  id: number;
  title: string;
  overview: string;
  release_date: string;
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
  console.log(data);

  const regex = /(\d+)-(\d+)-(\d+)/;
  const tags = [
    "ação",
    "aventura",
    "animação",
    "comédia",
    "crime",
    "documentário",
    "drama",
    "família",
    "fantasia",
    "história",
    "terror",
    "música",
    "mistério",
    "romance",
    "ficção científica",
    "cinema TV",
    "thriller",
    "guerra",
    "faroeste",
  ];

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
        <section className="flex flex-col gap-9 text-brand-neutral-000 font-bold px-2 pt-10 pb-12">
          <h1 className="text-2xl">
            Milhões de filmes, séries <br />
            e pessoas para descobrir. <br />
            Explore já.
          </h1>

          <section className="flex flex-col gap-2">
            <h3 className="uppercase text-sm">Filtre por:</h3>
            <div className="flex flex-wrap gap-3">
              {tags.map((item) => (
                <button className="first-letter:uppercase bg-brand-neutral-000 text-brand-neutral-900 text-sm font-bold py-2 px-4 rounded">
                  {item}
                </button>
              ))}
            </div>
          </section>
        </section>

        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8 px-2 bg-brand-neutral-000 text-brand-neutral-900 font-bold py-8">
          {data.results.map(
            ({
              id,
              title,
              release_date,
              backdrop_path,
              poster_path,
              genre_ids,
            }) => (
              <Link key={id} href="#" passHref>
                <a className="flex flex-col gap-2">
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                    alt={title}
                    width={176}
                    height={264}
                    objectFit="cover"
                    className="rounded"
                  />

                  <div>
                    <p className="text-sm">{title}</p>
                    <small className="text-xs text-brand-neutral-500 uppercase">
                      {new Date(release_date)
                        .toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        .replace(/ de |\./g, " ")}
                    </small>
                  </div>
                </a>
              </Link>
            )
          )}
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await getPopularMovies();

  return {
    props: { data },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
