type CastsListProps = {
  cast: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string;
  }>;
};

export function CastsList({ cast }: CastsListProps) {
  return (
    <section className="bg-brand-neutral-000 text-brand-neutral-900 py-12 px-2">
      <div className="max-w-screen-lg mx-auto flex flex-col gap-2">
        <h3 className="text-3xl font-bold">Elenco original</h3>
        <div className="grid grid-flow-col gap-4 overflow-x-auto snap-x snap-mandatory pb-6">
          {cast.slice(0, 10).map(({ id, profile_path, name, character }) => (
            <a
              key={id}
              href="#"
              className="snap-start scroll-m-12 flex flex-col gap-4 py-2 px-2 border rounded shadow-md duration-150 hover:shadow-xl"
            >
              <div className="w-[175px] h-[222px]">
                <img
                  src={`https://image.tmdb.org/t/p/original/${profile_path}`}
                  alt={name}
                  className="rounded w-[175px] h-[222px]"
                />
              </div>

              <div>
                <strong className="text-lg">{name}</strong>
                <p>{character}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
