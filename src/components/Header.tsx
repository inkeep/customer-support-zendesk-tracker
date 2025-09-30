"use client";

import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full font-jet-brains px-4 sm:px-11 pt-8">
      <div className="max-w-[1440px] mx-auto h-[61.5px] flex items-center justify-center py-2">
        {/* Centered Logo */}
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity duration-200"
        >
          <Image
            className="object-contain"
            src="/images/logos/logo-with-text-black.svg"
            alt="Inkeep Logo"
            width={300}
            height={72}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
