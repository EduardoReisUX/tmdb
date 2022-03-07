import { render } from "@testing-library/react";
import Home from "../../pages";

const HomeProps = {
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
};

describe("Home page", () => {
  describe("Receiving mocked HomeProps", () => {
    it("should render a list of heroes", () => {
      const { getByText } = render(<Home data={HomeProps} />);

      const text = getByText(HomeProps.results[0].title);
      expect(text).toBeInTheDocument();
    });
  });
});
