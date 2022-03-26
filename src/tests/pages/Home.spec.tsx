import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { mocked } from "jest-mock";
import React from "react";
import Home, { getStaticProps } from "../../pages";
import getPopularMovies from "../../pages/api/getPopularMovies";

jest.mock("../../pages/api/getPopularMovies");
jest.mock("next/link", () => {
  return ({ children }: any) => {
    return children;
  };
});

const HomeProps = {
  popularMovies: {
    total_pages: 1,
    page: 1,
    results: [
      {
        id: 1,
        title: "Homem Aranha",
        overview: "",
        release_date: "",
        formattedDate: "",
        backdrop_path: "",
        poster_path: "",
        genre_ids: [1],
      },
      {
        id: 2,
        title: "Batman",
        overview: "",
        release_date: "",
        formattedDate: "",
        backdrop_path: "",
        poster_path: "",
        genre_ids: [2],
      },
    ],
  },
  genresList: [
    { id: 1, name: "Ação" },
    { id: 2, name: "Ficção" },
  ],
};

describe("Home page", () => {
  describe("Receiving mocked HomeProps", () => {
    it("should render a list of heroes", () => {
      render(<Home {...HomeProps} />);

      const text = screen.getByText(/Homem Aranha/i);
      expect(text).toBeInTheDocument();
    });
  });

  describe("when user clicks a genre", () => {
    it("should change its color from neutral to secondary", () => {
      render(<Home {...HomeProps} />);

      const genre = screen.getByText("Ação");
      fireEvent.click(genre);

      expect(genre).toHaveClass("bg-brand-secondary text-brand-neutral-000");
      expect(genre).not.toHaveClass(
        "bg-brand-neutral-000 text-brand-neutral-900"
      );
    });

    it("should filter movies to only show movies with selected genres", () => {
      render(<Home {...HomeProps} />);

      const genre = screen.getByText("Ficção");
      fireEvent.click(genre);

      const filteredMovies = screen.getAllByText(/Batman/i);
      expect(filteredMovies).toHaveLength(1);
    });
  });

  describe("when user clicks a movie", () => {
    it("should render a loading toast", async () => {
      render(<Home {...HomeProps} />);

      const movieLink = screen.getByText("Homem Aranha");
      fireEvent.click(movieLink);

      const loadingToast = await screen.findByText(/Carregando.../i);
      expect(loadingToast).toBeInTheDocument();
      expect(loadingToast).toBeVisible();
    });

    it("loading toast should disappear after a while", async () => {
      render(<Home {...HomeProps} />);

      const movieLink = screen.getByText("Homem Aranha");
      fireEvent.click(movieLink);

      const loadingToast = await screen.findByText(/Carregando.../i);

      waitFor(() => {
        expect(loadingToast).not.toBeInTheDocument();
      });
    });
  });

  describe("getStaticProps", () => {
    it("should return popularMovies with formatted date, genresList and revalidade of 24hr", async () => {
      const getPopularMoviesMocked = mocked(getPopularMovies);

      getPopularMoviesMocked.mockResolvedValueOnce({
        popularMoviesData: {
          total_pages: 1,
          total_results: 1,
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
              total_pages: 1,
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
