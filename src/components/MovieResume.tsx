import Image from "next/image";
import { CastsType, MovieType } from "../pages/api/getMovieById";

type MovieResumeProps = { movie: MovieType; casts: CastsType };

export function MovieResume({ movie, casts }: MovieResumeProps) {
  return (
    <section className="flex flex-col gap-9 max-w-screen-xl mx-auto text-brand-neutral-000 px-2 pt-9 pb-[72px]">
      <div className="mx-auto">
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            movie.poster_path || movie.backdrop_path
          }`}
          width={186}
          height={279}
          alt={movie.title}
          className="rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-4xl font-bold">
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h3>

          <div className="text-lg">
            <p>16 anos</p>
            <p>11/02/2016 (BR)</p>
            <div className="flex gap-4">
              {movie.genres.map(({ id, name }) => (
                <p key={id}>{name}</p>
              ))}
            </div>
            <p>1h 47m</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-16 h-16 flex justify-center items-center rounded-full bg-[rgba(255,255,255,0.1)] border-4 border-[#14FF00] text-[#14FF00] font-bold">
            76%
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
