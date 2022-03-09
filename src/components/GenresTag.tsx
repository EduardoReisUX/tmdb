import { useState } from "react";

type GenresTagsProps = {
  genres: Array<{
    id: number;
    name: string;
  }>;
};

type SelectedGenresType = Array<{
  id: number;
  name: string;
  isSelected: boolean;
}>;

export function GenresTags({ genres }: GenresTagsProps) {
  const [selectedGenresList, setSelectedGenresList] =
    useState<SelectedGenresType>(
      Array.from(genres, ({ id, name }) => ({
        id,
        name,
        isSelected: false,
      }))
    );

  function toggleIsSelected(id: number) {
    if (selectedGenresList.find((genre) => genre.id === id)) {
      const toggled = selectedGenresList.map((genre) => {
        if (genre.id === id) {
          return {
            ...genre,
            isSelected: !genre.isSelected,
          };
        }

        return genre;
      });

      const newState = [...toggled];
      setSelectedGenresList([...newState]);
    }
  }

  const baseButtonStyle = "text-sm font-bold py-2 px-4 rounded duration-150";
  const buttonStyles = {
    false: `bg-brand-neutral-000 text-brand-neutral-900 ${baseButtonStyle}`,
    true: `bg-brand-secondary text-brand-neutral-000 ${baseButtonStyle}`,
  };

  return (
    <section className="flex flex-col gap-2">
      <h3 className="uppercase text-sm">Filtre por:</h3>
      <div className="flex flex-wrap gap-3">
        {!!selectedGenresList &&
          selectedGenresList.map(({ id, name, isSelected }) => (
            <button
              key={id}
              className={buttonStyles[`${isSelected}`]}
              onClick={() => toggleIsSelected(id)}
            >
              {name}
            </button>
          ))}
      </div>
    </section>
  );
}
