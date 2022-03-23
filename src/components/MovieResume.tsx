import Image from "next/image";
import { CastsType } from "../pages/api/getMovieById";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
  const genres = movie.genres.map(({ name }) => name);

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
          <h3 className="text-4xl font-bold">{movie.title}</h3>

          <div className="text-brand-neutral-300 flex gap-2 flex-wrap">
            {movie.certification && movie.certification !== "L" && (
              <>
                <span>{`${movie.certification} anos`}</span>
                <span>{" | "}</span>
              </>
            )}

            <span>{movie.formattedDate}</span>
            <span>{" | "}</span>

            <span>{genres.slice(0, 3).join(", ")}</span>
            <span>{" | "}</span>

            <span>{movie.duration}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-16 h-16 font-bold bg-[rgba(255,255,255,0.1)] rounded-full">
            <CircularProgressbar
              value={movie.vote_average_formatted}
              maxValue={100}
              text={`${movie.vote_average_formatted}%`}
              styles={buildStyles({
                trailColor: "rgba(255,255,255,0.1)",
                pathColor: "#14FF00",
                textColor: "#14FF00",
                textSize: "1.5rem",
                pathTransitionDuration: 0.3,
              })}
            />
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
