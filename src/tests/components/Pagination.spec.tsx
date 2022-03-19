import { render, screen, fireEvent } from "@testing-library/react";
import { mocked } from "jest-mock";

import { useRouter } from "next/router";

import { Pagination } from "../../components/Pagination";

jest.mock("next/router");

describe("Pagination component", () => {
  describe("receiving mocked props", () => {
    it("should highlight the current page", () => {
      render(<Pagination page={1} total_pages={200} />);
      const highlightedPage = screen.getByText("1");

      expect(highlightedPage).toBeInTheDocument();
      expect(highlightedPage).toHaveAttribute("disabled");
      expect(highlightedPage).not.toHaveClass("hover:bg-brand-neutral-300");
    });

    it("should render right icon if next page exists", () => {
      render(<Pagination page={1} total_pages={200} />);
      const rightIcon = screen.getByAltText(/Próxima página/i);

      expect(rightIcon).toBeInTheDocument();
      expect(rightIcon).toBeVisible();
      expect(rightIcon).not.toHaveAttribute("disabled");
    });

    it("should render left icon if previous page exists", () => {
      render(<Pagination page={2} total_pages={200} />);
      const leftIcon = screen.getByAltText(/Página anterior/i);

      expect(leftIcon).toBeInTheDocument();
      expect(leftIcon).toBeVisible();
      expect(leftIcon).not.toHaveAttribute("disabled");
    });
  });

  describe("if clicks right icon", () => {
    it.todo("should render loading toast");

    it("should redirect to next page", () => {
      const useRouterMocked = mocked(useRouter);
      const pushMock = jest.fn();

      useRouterMocked.mockReturnValueOnce({
        push: pushMock,
      } as any);

      render(<Pagination page={1} total_pages={200} />);
      const rightIcon = screen.getByAltText(/Próxima página/i);

      fireEvent.click(rightIcon);

      expect(pushMock).toBeCalledWith("/2");
    });
  });

  describe("if clicks left icon", () => {
    it.todo("should render loading toast");

    it("should redirect to previous page", () => {
      const useRouterMocked = mocked(useRouter);
      const pushMock = jest.fn();

      useRouterMocked.mockReturnValueOnce({
        push: pushMock,
      } as any);

      render(<Pagination page={2} total_pages={200} />);
      const leftIcon = screen.getByAltText(/Página anterior/i);

      fireEvent.click(leftIcon);

      expect(pushMock).toBeCalledWith("/1");
    });
  });
});
