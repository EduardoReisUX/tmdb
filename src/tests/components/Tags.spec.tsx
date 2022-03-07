import { render } from "@testing-library/react";
import { Tags } from "../../components/Tags";

describe("Tags component", () => {
  it("should render some tags", () => {
    const { getByText } = render(<Tags />);

    const text = getByText(/Filtre por:/);
    expect(text).toBeInTheDocument();
  });
});
