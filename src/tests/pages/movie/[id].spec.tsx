import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { mocked } from "jest-mock";

import getMovieById from "../../../pages/api/getMovieById";
import MovieById, { getServerSideProps } from "../../../pages/movie/[id]";

jest.mock("../../../pages/api/getMovieById");
jest.mock("next/link", () => {
  return ({ children }: any) => {
    return children;
  };
});

const MovieByIdProps = {
  movieData: {
    formattedDate: "01/03/2022",
    duration: "3h5m",
    vote_average_formatted: 80,
    title: "Batman",
    certification: "16",
    overview: "string",
    vote_average: 0.8,
    runtime: 130,
    release_date: "2022-03-01",
    backdrop_path: "string",
    poster_path: "string",
    genres: [
      {
        id: 1,
        name: "Ação",
      },
    ],
  },
  castData: {
    id: 1,
    cast: [
      {
        id: 1,
        name: "string",
        character: "string",
        profile_path: "string",
      },
    ],
    crew: [
      {
        id: 1,
        name: "string",
        job: "string",
      },
    ],
  },
  recommendedMoviesData: {
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
        genre_ids: [1, 2],
      },
    ],
  },
};

describe("Movie Page", () => {
  describe("receiving mocked props", () => {
    it("should render details of the movie", () => {
      render(<MovieById data={MovieByIdProps} />);

      for (const value in MovieByIdProps.movieData) {
        expect(value).toBeInTheDocument;
      }
    });

    it("should render list of casts and crews", () => {
      render(<MovieById data={MovieByIdProps} />);

      for (const value in MovieByIdProps.castData) {
        expect(value).toBeInTheDocument;
      }
    });

    it("should render list of recommended movies", () => {
      render(<MovieById data={MovieByIdProps} />);

      for (const value in MovieByIdProps.recommendedMoviesData) {
        expect(value).toBeInTheDocument;
      }
    });
  });

  describe("when user clicks a movie", () => {
    it("should render a loading toast", async () => {
      render(<MovieById data={MovieByIdProps} />);

      const movieLink = screen.getByText("Homem Aranha");
      fireEvent.click(movieLink);

      const loadingToast = await screen.findByText(/Carregando.../i);
      expect(loadingToast).toBeInTheDocument();
      expect(loadingToast).toBeVisible();
    });

    it("loading toast should disappear after a while", async () => {
      render(<MovieById data={MovieByIdProps} />);

      const movieLink = screen.getByText("Homem Aranha");
      fireEvent.click(movieLink);

      const loadingToast = await screen.findByText(/Carregando.../i);

      waitFor(() => {
        expect(loadingToast).not.toBeInTheDocument();
      });
    });
  });

  describe("getServerSideProps", () => {
    it("should return formatted recommended movies, details and casts of movie by id", async () => {
      const apiMocked = mocked(getMovieById);

      const dataFromApi = {
        movieData: {
          genres: [],
          overview: "overview-fake",
          release_date: "2020-12-24",
          runtime: 120,
          title: "Iron Man",
          vote_average: 0.75,
          backdrop_path: "",
          poster_path: "",
          release_dates: {
            results: [
              {
                iso_3166_1: "BR",
                release_dates: [
                  {
                    certification: "14",
                    release_date: "2020-12-24",
                  },
                ],
              },
            ],
          },
        },
        castData: {
          cast: [
            {
              character: "cast character",
              id: 1,
              name: "cast name",
              profile_path: "",
            },
          ],
          crew: [
            {
              id: 1,
              job: "crew job",
              name: "crew name",
            },
          ],
          id: 1,
        },
        recommendedMoviesData: {
          page: 1,
          results: [
            {
              backdrop_path: "",
              genre_ids: [1],
              id: 1,
              overview: "overview-fake",
              poster_path: "",
              release_date: "2020-12-24",
              title: "Batman",
            },
          ],
        },
      };

      apiMocked.mockResolvedValueOnce(dataFromApi);

      const response = await getServerSideProps({ query: { id: "5" } } as any);

      const formattedData = {
        ...dataFromApi,
      };

      formattedData.movieData = {
        ...dataFromApi.movieData,
        certification: "14",
        duration: "2h0m",
        formattedDate: "23/12/2020",
        vote_average_formatted: 7.5,
      } as any;

      formattedData.recommendedMoviesData.results[0] = {
        ...dataFromApi.recommendedMoviesData.results[0],
        formattedDate: "23 dez  2020",
      } as any;

      expect(response).toEqual(
        expect.objectContaining({
          props: {
            data: formattedData,
          },
        })
      );
    });
  });
});
