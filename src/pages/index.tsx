import Head from "next/head";
import type { GetStaticProps } from "next";

import getPopularMovies from "./api/getPopularMovies";

interface resultsInterface {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  backdrop_path: string | null;
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

      <main className="flex-1 min-h-screen flex flex-col gap-2 items-center justify-center">
        <h1 className="text-brand-neutral-900 text-5xl font-bold">
          Hello, World!
        </h1>
        {!!data && data.results[0].title}
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
