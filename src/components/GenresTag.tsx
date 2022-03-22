import { useState } from "react";

type GenresTagsProps = {
  genres: Array<{
    id: number;
    name: string;
    isSelected: boolean;
  }>;
  toggleSelectedGenre: (id: number) => void;
};

export function GenresTags({ genres, toggleSelectedGenre }: GenresTagsProps) {
  const baseButtonStyle = "text-sm font-bold py-2 px-4 rounded duration-150";
  const buttonStyles = {
    false: `bg-brand-neutral-000 text-brand-neutral-900 ${baseButtonStyle}`,
    true: `bg-brand-secondary text-brand-neutral-000 ${baseButtonStyle}`,
  };

  return (
    <section className="flex flex-col gap-2 lg:gap-4">
      <h3 className="uppercase text-sm lg:text-center">Filtre por:</h3>
      <div className="flex flex-wrap gap-3 lg:justify-center">
        {!!genres &&
          genres.map(({ id, name, isSelected }) => (
            <button
              key={id}
              className={buttonStyles[`${isSelected}`]}
              onClick={() => toggleSelectedGenre(id)}
            >
              {name}
            </button>
          ))}
      </div>
    </section>
  );
}
