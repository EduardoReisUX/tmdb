export function Tags() {
  const tags = [
    "ação",
    "aventura",
    "animação",
    "comédia",
    "crime",
    "documentário",
    "drama",
    "família",
    "fantasia",
    "história",
    "terror",
    "música",
    "mistério",
    "romance",
    "ficção científica",
    "cinema TV",
    "thriller",
    "guerra",
    "faroeste",
  ];

  return (
    <section className="flex flex-col gap-2">
      <h3 className="uppercase text-sm">Filtre por:</h3>
      <div className="flex flex-wrap gap-3">
        {tags.map((item) => (
          <button
            key={Math.random()}
            className="first-letter:uppercase bg-brand-neutral-000 text-brand-neutral-900 text-sm font-bold py-2 px-4 rounded"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}
