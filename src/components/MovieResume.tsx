import Image from "next/image";
import { CastsType } from "../pages/api/getMovieById";

interface Movie {
  formattedDate: string;
  duration: string;
  vote_average_formatted: number;
  title: string;
  certification: string | undefined;
  overview: string;
  vote_average: number;
  runtime: number;
  release_date: string;
  backdrop_path: string | null;
  poster_path: string | null;
  genres: Array<{
    id: number;
    name: string;
  }>;
}

type MovieResumeProps = { movie: Movie; casts: CastsType };

export function MovieResume({ movie, casts }: MovieResumeProps) {
  return (
    <section
      className="flex flex-col gap-9 max-w-screen-lg mx-auto text-brand-neutral-000 px-2 pt-9 pb-[72px]
      lg:grid lg:grid-flow-col lg:gap-8 lg:pb-14
    "
    >
      <div className="mx-auto w-[186px] h-[279px] lg:w-[383px] lg:h-[574px] lg:relative">
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            movie.poster_path || movie.backdrop_path
          }`}
          width={383}
          height={574}
          alt={movie.title}
          className="rounded-lg lg:absolute lg:-top-8"
        />
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-4xl font-bold">
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h3>

          <ul className="text-lg lg:flex lg:gap-[18px] lg:list-disc lg:list-inside">
            <li className="lg:list-none">
              {movie.certification !== "L" && `${movie.certification} anos`}
            </li>
            <li>{movie.formattedDate} (BR)</li>
            {movie.genres.map(({ id, name }, index) => (
              <li
                className={`${index === 0 ? "lg:list-disc" : "lg:list-none"} `}
                key={id}
              >
                {name}
              </li>
            ))}
            <li>{movie.duration}</li>
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-16 h-16 flex justify-center items-center rounded-full bg-[rgba(255,255,255,0.1)] border-4 border-[#14FF00] text-[#14FF00] font-bold">
            {movie.vote_average_formatted}%
          </div>
          <p>
            Avaliação dos <br />
            usuários
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="text-xl font-bold">Sinopse</h5>
          <p>{movie.overview}</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {casts.crew.slice(0, 4).map(({ id, name, job }) => (
            <div key={id} className="flex flex-col">
              <strong>{name}</strong>
              <small>{job}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
