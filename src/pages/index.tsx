import Head from "next/head";

export default function Home({ data }: any) {
  console.log(data);
  return (
    <div className="flex flex-col">
      <Head>
        <title>TMDB</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 min-h-screen flex items-center justify-center">
        <h1 className="text-5xl font-thin">Hello, World!</h1>
      </main>
    </div>
  );
}
