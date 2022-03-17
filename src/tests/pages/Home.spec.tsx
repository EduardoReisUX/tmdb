import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import Home, { getStaticProps } from "../../pages";
import getPopularMovies from "../../pages/api/getPopularMovies";

jest.mock("../../pages/api/getPopularMovies");

const HomeProps = {
  popularMovies: {
    page: 1,
    results: [
      {
        id: 1,
        title: "HomemAranha",
        overview: "",
        release_date: "",
        formattedDate: "",
        backdrop_path: "",
        poster_path: "",
        genre_ids: [1],
      },
    ],
  },
  genresList: [{ id: 1, name: "test-genre" }],
};

describe("Home page", () => {
  describe("Receiving mocked HomeProps", () => {
    it("should render a list of heroes", () => {
      render(
        <Home
          popularMovies={HomeProps.popularMovies}
          genresList={HomeProps.genresList}
        />
      );

      const text = screen.getByText(HomeProps.popularMovies.results[0].title);
      expect(text).toBeInTheDocument();
    });
  });

  describe("when user clicks a movie", () => {
    it.todo("should render a loading toast");
  });

  describe("getStaticProps", () => {
    it("should return popularMovies with formatted date, genresList and revalidade of 24hr", async () => {
      const getPopularMoviesMocked = mocked(getPopularMovies);

      getPopularMoviesMocked.mockResolvedValueOnce({
        popularMoviesData: {
          page: 1,
          results: [
            {
              id: 2,
              title: "Batman",
              overview: "overview-mock",
              release_date: "2021-12-24",
              backdrop_path: "backdrop_path-mock",
              poster_path: "poster_path-mock",
              genre_ids: [2],
            },
          ],
        },
        genresListData: {
          genres: [
            {
              id: 1,
              name: "ação",
            },
          ],
        },
      });

      const response = await getStaticProps({});

      expect(response).toEqual(
        expect.objectContaining({
          props: {
            popularMovies: {
              page: 1,
              results: [
                {
                  id: 2,
                  title: "Batman",
                  overview: "overview-mock",
                  release_date: "2021-12-24",
                  backdrop_path: "backdrop_path-mock",
                  poster_path: "poster_path-mock",
                  genre_ids: [2],
                  formattedDate: "23 dez  2021",
                },
              ],
            },
            genresList: [
              {
                id: 1,
                name: "ação",
              },
            ],
          },
          revalidate: 60 * 60 * 24, // 24 hours
        })
      );
    });
  });
});
