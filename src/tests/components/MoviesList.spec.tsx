import { render, screen } from "@testing-library/react";
import { MoviesList } from "../../components/MoviesList";

const MoviesListProps = [
  {
    id: 1,
    title: "Homem Aranha",
    overview: "overview-fake",
    release_date: "release_date-fake",
    formattedDate: "formattedDate-fake",
    backdrop_path: "backdrop_path-fake",
    poster_path: "poster_path-fake",
    genre_ids: [1],
  },
];

describe("MoviesList component", () => {
  describe("receiving mocked MoviesListProps", () => {
    it("should render a list of movies", () => {
      render(<MoviesList movies={MoviesListProps} />);

      const title = screen.getByText(MoviesListProps[0].title);
      const overview = screen.queryByText(MoviesListProps[0].overview);
      const release_date = screen.queryByText(MoviesListProps[0].release_date);
      const formattedDate = screen.getByText(MoviesListProps[0].formattedDate);

      expect(title).toBeInTheDocument();
      expect(formattedDate).toBeInTheDocument();
      expect(overview).not.toBeInTheDocument();
      expect(release_date).not.toBeInTheDocument();
    });

    it("should have a link to its specific movie", () => {
      render(<MoviesList movies={MoviesListProps} />);

      const link = screen.getByRole("link");

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/movie/${MoviesListProps[0].id}`);
    });
  });
});
