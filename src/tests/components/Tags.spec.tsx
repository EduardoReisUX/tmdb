import { render } from "@testing-library/react";
import { GenresTags } from "../../components/GenresTag";

describe("Tags component", () => {
  it("should render some tags", () => {
    const { getByText } = render(<GenresTags />);

    const text = getByText(/Filtre por:/);
    expect(text).toBeInTheDocument();
  });
});
