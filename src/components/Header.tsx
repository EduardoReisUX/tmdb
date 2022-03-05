import Logo from "./../assets/logo.svg";
import Image from "next/image";

export function Header() {
  return (
    <header className="bg-brand-primary-light min-w-full flex">
      <div className="flex-1 max-w-screen-xl mx-auto py-4 px-2 flex items-center justify-center md:justify-start">
        <Image src={Logo} alt="Logo" />
      </div>
    </header>
  );
}
