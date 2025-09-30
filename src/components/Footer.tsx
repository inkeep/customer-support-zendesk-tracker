"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="border-t border-primary-lighter pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                className="object-contain"
                src="/images/logos/logo-with-text-black.svg"
                alt="Inkeep Logo"
                width={120}
                height={28}
              />
            </div>

            {/* Links */}
            <div className="flex items-center gap-8">
              <Link
                href="https://inkeep.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-neue-haas text-sm hover:text-primary transition-colors duration-200"
                style={{ color: 'var(--color-muted)' }}
              >
                Inkeep.com
              </Link>
              <Link
                href="https://docs.inkeep.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-neue-haas text-sm hover:text-primary transition-colors duration-200"
                style={{ color: 'var(--color-muted)' }}
              >
                Documentation
              </Link>
              <Link
                href="https://github.com/inkeep"
                target="_blank"
                rel="noopener noreferrer"
                className="font-neue-haas text-sm hover:text-primary transition-colors duration-200"
                style={{ color: 'var(--color-muted)' }}
              >
                GitHub
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="font-neue-haas text-sm" style={{ color: 'var(--color-muted)' }}>
                © 2024 Inkeep. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
