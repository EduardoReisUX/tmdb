import RightArrow from "./../assets/right-arrow.svg";
import LeftArrow from "./../assets/left-arrow.svg";

import Image from "next/image";
import { useRouter } from "next/router";

type PaginationProps = {
  page: number;
  total_pages: number;
};

export function Pagination({
  page: currentPage,
  total_pages,
}: PaginationProps) {
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const allPages = Array.from({ length: total_pages }, (_, index) => index + 1);
  const twoPagesAfter = allPages.slice(currentPage, currentPage + 2);
  const twoPagesBefore = allPages.slice(currentPage - 3, currentPage - 1);
  const onePageBefore = allPages.slice(currentPage - 2, currentPage - 1);

  const buttonStyles = {
    base: "text-sm sm:text-base font-bold py-2 px-4 duration-150 hover:bg-brand-neutral-300 rounded",
    active:
      "text-sm sm:text-base font-bold py-2 px-4 border border-brand-primary-light rounded",
  };

  const router = useRouter();

  function handleOnClick(page: number) {
    router.push(`/${String(page)}`);
  }

  return (
    <section className="flex justify-center text-brand-primary-light bg-brand-neutral-000 py-2">
      {previousPage > 0 && (
        <>
          <button
            className={buttonStyles.base}
            onClick={() => handleOnClick(previousPage)}
          >
            <Image src={LeftArrow} alt="Página anterior" />
          </button>
          {previousPage == 1 ? (
            <button
              className={buttonStyles.base}
              onClick={() => handleOnClick(1)}
            >
              1
            </button>
          ) : (
            twoPagesBefore.map((number) => (
              <button
                key={number}
                className={buttonStyles.base}
                onClick={() => handleOnClick(number)}
              >
                {number}
              </button>
            ))
          )}
        </>
      )}

      <button className={buttonStyles.active} disabled>
        {currentPage}
      </button>

      {nextPage < total_pages && (
        <>
          {twoPagesAfter.map((number) => (
            <button
              key={number}
              className={buttonStyles.base}
              onClick={() => handleOnClick(number)}
            >
              {number}
            </button>
          ))}
          <button
            className={buttonStyles.base}
            onClick={() => handleOnClick(nextPage)}
          >
            <Image src={RightArrow} alt="Próxima página" />
          </button>
        </>
      )}
    </section>
  );
}
