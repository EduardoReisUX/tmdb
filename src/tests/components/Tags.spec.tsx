import { render, screen, fireEvent } from "@testing-library/react";
import { GenresTags } from "../../components/GenresTag";

let genres = [
  {
    id: 1,
    name: "Ação",
    isSelected: false,
  },
  {
    id: 2,
    name: "Aventura",
    isSelected: false,
  },
  {
    id: 3,
    name: "Terror",
    isSelected: false,
  },
];

const toggleSelectedGenre = jest.fn();

describe("Tags component", () => {
  describe("receiving default props", () => {
    it("should render tags in initial state", () => {
      render(
        <GenresTags toggleSelectedGenre={toggleSelectedGenre} genres={genres} />
      );

      const text = screen.getByText(/Filtre por:/);
      const tags = screen.getAllByRole("button");

      expect(text).toBeInTheDocument();

      tags.forEach((button) => {
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass(
          "bg-brand-neutral-000 text-brand-neutral-900"
        );
      });
    });
  });
});
