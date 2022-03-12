import Link from "next/link";
import Image from "next/image";

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

type RecommendedMoviesListProps = {
  data: { page: number; results: Array<resultsInterface> };
  showLoadingToast: () => void;
};

export function RecommendedMoviesList({
  data,
  showLoadingToast,
}: RecommendedMoviesListProps) {
  return (
    <section className="bg-brand-neutral-000 text-brand-neutral-900 -mt-1 pb-12 px-2">
      <div className="max-w-screen-lg mx-auto flex flex-col gap-2">
        <h3 className="text-3xl font-bold">Recomendações</h3>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6">
          {data.results.map(
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
  );
}
