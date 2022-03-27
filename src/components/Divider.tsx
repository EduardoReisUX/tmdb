import Image from "next/image";
import DividerSvg from "./../assets/divider.svg";

export function Divider() {
  return (
    <>
      {/* <div
        className="w-full h-4 -mt-4 lg:h-8 lg:-mt-8 bg-brand-neutral-000"
        style={{
          clipPath:
            //"polygon(-1% -1%, -1% 101%, 101% 101%, 101% -1%, 66% -1%, 50% 101%, 33% -1%)",
            "ellipse(51% 101% at 50% 100%)",
        }}
      /> */}
      <div className="w-full overflow-hidden rotate-180 -mt-8 lg:-mt-16">
        <svg
          className="relative w-[calc(150%+1.3px)] h-8 lg:h-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-brand-neutral-000"
          ></path>
        </svg>
      </div>
    </>
  );
}
