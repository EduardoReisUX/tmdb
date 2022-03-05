import Logo from "./../assets/logo.svg";
import Image from "next/image";

export function Header() {
  return (
    <header className="bg-brand-primary-light w-screen flex">
      <div className="max-w-screen-xl mx-auto py-4 flex items-center">
        <Image src={Logo} alt="Logo" />
      </div>
    </header>
  );
}
