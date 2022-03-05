export function Pagination() {
  const pages = [1, 2, 3, 4, 5, 6];

  return (
    <section className="flex gap-2 justify-center text-brand-primary-light bg-brand-neutral-000 ">
      {pages.map((item) => (
        <button key={Math.random()} className="font-bold py-2 px-4">
          {item}
        </button>
      ))}
    </section>
  );
}
