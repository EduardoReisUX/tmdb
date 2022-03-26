import { render, screen, fireEvent } from "@testing-library/react";
import { mocked } from "jest-mock";

import { useRouter } from "next/router";

import { Pagination } from "../../components/Pagination";

jest.mock("next/router");

const PaginationProps = {
  page: 5,
  total_pages: 200,
};

describe("Pagination component", () => {
  describe("receiving mocked props", () => {
    it("should highlight the current page", () => {
      render(<Pagination {...PaginationProps} />);
      const highlightedPage = screen.getByText("5");

      expect(highlightedPage).toBeInTheDocument();
      expect(highlightedPage).toHaveAttribute("disabled");
      expect(highlightedPage).not.toHaveClass("hover:bg-brand-neutral-300");
    });

    it("should render right icon if next page exists", () => {
      render(<Pagination {...PaginationProps} />);
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

  describe("when user clicks right icon", () => {
    it("should redirect to next page", () => {
      const useRouterMocked = mocked(useRouter);
      const pushMock = jest.fn();

      useRouterMocked.mockReturnValueOnce({
        push: pushMock,
      } as any);

      render(<Pagination {...PaginationProps} />);
      const rightIcon = screen.getByAltText(/Próxima página/i);

      fireEvent.click(rightIcon);

      expect(pushMock).toBeCalledWith("/6");
    });
  });

  describe("when user clicks left icon", () => {
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

    it("should redirect to first page", () => {
      const useRouterMocked = mocked(useRouter);
      const pushMock = jest.fn();

      useRouterMocked.mockReturnValueOnce({
        push: pushMock,
      } as any);

      render(<Pagination page={2} total_pages={200} />);
      const firstPage = screen.getByText("1");

      fireEvent.click(firstPage);

      expect(pushMock).toBeCalledWith("/1");
    });
  });

  describe("when user clicks previous pages", () => {
    it("should redirect to previous pages", () => {
      const useRouterMocked = mocked(useRouter);
      const pushMock = jest.fn();

      useRouterMocked.mockReturnValueOnce({
        push: pushMock,
      } as any);

      render(<Pagination {...PaginationProps} />);
      const previousPages = screen.getByText("4");

      fireEvent.click(previousPages);

      expect(pushMock).toBeCalledWith("/4");
    });
  });

  describe("when user clicks next pages", () => {
    it("should redirect to next pages", () => {
      const useRouterMocked = mocked(useRouter);
      const pushMock = jest.fn();

      useRouterMocked.mockReturnValueOnce({
        push: pushMock,
      } as any);

      render(<Pagination {...PaginationProps} />);
      const nextPages = screen.getByText("7");

      fireEvent.click(nextPages);

      expect(pushMock).toBeCalledWith("/7");
    });
  });
});
