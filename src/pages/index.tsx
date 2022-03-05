import Head from "next/head";

export default function Home({ data }: any) {
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

      <main className="flex-1 min-h-screen flex items-center justify-center">
        <h1 className="text-5xl font-bold">Hello, World!</h1>
      </main>
    </>
  );
}
