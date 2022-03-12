import Link from "next/link";
import Image from "next/image";

type MoviesListProps = {
  movies: Array<{
    id: number;
    title: string;
    overview: string;
    release_date: string;
    formattedDate: string;
    backdrop_path: string | null;
    poster_path: string | null;
    genre_ids: number[];
  }>;
  handleOnClick: () => void;
};

export function MoviesList({ movies, handleOnClick }: MoviesListProps) {
  return (
    <section className="bg-brand-neutral-000 text-brand-neutral-900 font-bold py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 max-w-screen-lg mx-auto px-2 ">
        {!!movies &&
          movies.map(
            ({
              id,
              title,
              formattedDate,
              backdrop_path,
              poster_path,
              genre_ids,
            }) => (
              <Link key={id} href={`movie/${id}`} passHref>
                <a
                  className="flex flex-col gap-2 duration-100 ease-in-out hover:brightness-75"
                  onClick={() => handleOnClick()}
                >
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
                      {formattedDate}
                    </small>
                  </div>
                </a>
              </Link>
            )
          )}
      </div>
    </section>
  );
}
