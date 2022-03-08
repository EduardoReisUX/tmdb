import { render, screen, fireEvent } from "@testing-library/react";
import { LoadingToast } from "../../components/LoadingToast";
import { MoviesList } from "../../components/MoviesList";

let LoadingToastProps = {
  isLoading: false,
};

const MoviesListProps = {
  movies: [
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
  ],
  handleOnClick: () => {
    LoadingToastProps.isLoading = true;
  },
};

describe("MoviesList component", () => {
  describe("receiving mocked MoviesListProps", () => {
    it("should render a list of movies", () => {
      render(
        <MoviesList
          movies={MoviesListProps.movies}
          handleOnClick={MoviesListProps.handleOnClick}
        />
      );

      const title = screen.getByText(MoviesListProps.movies[0].title);
      const overview = screen.queryByText(MoviesListProps.movies[0].overview);
      const release_date = screen.queryByText(
        MoviesListProps.movies[0].release_date
      );
      const formattedDate = screen.getByText(
        MoviesListProps.movies[0].formattedDate
      );

      expect(title).toBeInTheDocument();
      expect(formattedDate).toBeInTheDocument();
      expect(overview).not.toBeInTheDocument();
      expect(release_date).not.toBeInTheDocument();
    });

    it("should have a link to its specific movie", () => {
      render(
        <MoviesList
          movies={MoviesListProps.movies}
          handleOnClick={MoviesListProps.handleOnClick}
        />
      );

      const link = screen.getByRole("link");

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute(
        "href",
        `/movie/${MoviesListProps.movies[0].id}`
      );
    });

    it("LoadingToast component should appear when clicked", async () => {
      render(
        <div>
          <MoviesList
            movies={MoviesListProps.movies}
            handleOnClick={MoviesListProps.handleOnClick}
          />
          <LoadingToast isLoading={LoadingToastProps.isLoading} />
        </div>
      );

      const link = screen.getByRole("link");
      fireEvent(link, new MouseEvent("click"));

      const loadingComponent = await screen.findByText(/Carregando.../i);
      expect(loadingComponent).toBeVisible();
    });
  });
});