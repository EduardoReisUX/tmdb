import { Tags } from "./Tags";

export function Hero() {
  return (
    <>
      <section className="flex flex-col gap-9 max-w-screen-xl mx-auto text-brand-neutral-000 font-bold px-2 pt-10 pb-12">
        <h1 className="text-2xl">
          Milhões de filmes, séries <br />
          e pessoas para descobrir. <br />
          Explore já.
        </h1>

        <Tags />
      </section>
    </>
  );
}
