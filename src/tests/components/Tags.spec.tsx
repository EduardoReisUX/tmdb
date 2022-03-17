import { render, screen, fireEvent } from "@testing-library/react";
import { GenresTags } from "../../components/GenresTag";

const genres = {
  genres: [
    {
      id: 1,
      name: "Ação",
    },
    {
      id: 2,
      name: "Aventura",
    },
    {
      id: 3,
      name: "Terror",
    },
  ],
};

describe("Tags component", () => {
  describe("receiving default props", () => {
    it("should render tags in initial state", () => {
      render(<GenresTags {...genres} />);

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

  describe("when clicked", () => {
    it("should change its class attribute", () => {
      render(<GenresTags {...genres} />);

      const tags = screen.getAllByRole("button");

      tags.forEach((button) => {
        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(button).toHaveClass("bg-brand-secondary text-brand-neutral-000");
        expect(button).not.toHaveClass(
          "bg-brand-neutral-000 text-brand-neutral-900"
        );
      });
    });

    it.todo(
      "should filter movie list to only show movies with selected genres"
    );
  });
});
