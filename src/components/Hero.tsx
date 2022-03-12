import { GenresTags } from "./GenresTag";

type HeroProps = {
  genres: Array<{
    id: number;
    name: string;
  }>;
};

export function Hero({ genres }: HeroProps) {
  return (
    <>
      <section
        className="flex flex-col gap-9 max-w-screen-lg mx-auto text-brand-neutral-000 font-bold px-2 pt-10 pb-12
        lg:items-center lg:py-20 lg:gap-10
      "
      >
        <h1 className="text-2xl lg:text-5xl lg:text-center">
          Milhões de filmes, séries <br />
          e pessoas para descobrir. <br />
          Explore já.
        </h1>

        <GenresTags genres={genres} />
      </section>
    </>
  );
}
