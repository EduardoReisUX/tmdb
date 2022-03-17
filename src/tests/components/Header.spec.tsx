import { render, screen } from "@testing-library/react";
import { Header } from "../../components/Header";

describe("Header component", () => {
  it("should render with image inside of an anchor", () => {
    render(<Header />);

    const link = screen.getByRole("link");
    const logo = screen.getByAltText(/Logo/i);

    expect(link).toContainElement(logo);
  });

  describe("anchor element", () => {
    it("should have attribute href === '/'", () => {
      render(<Header />);

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();

      const href = link.getAttribute("href");
      expect(href).toBe("/");
    });
  });
});
