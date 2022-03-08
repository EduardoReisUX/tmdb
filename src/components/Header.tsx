import Logo from "./../assets/logo.svg";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-brand-primary-light min-w-full flex sticky top-0 z-10">
      <div className="flex-1 max-w-screen-xl mx-auto py-4 px-2 flex items-center justify-center md:justify-start">
        <Link href="/" passHref>
          <Image src={Logo} alt="Logo" />
        </Link>
      </div>
    </header>
  );
}
