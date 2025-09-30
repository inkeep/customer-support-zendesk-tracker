"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

// Centralized configuration for all backgrounds
const BACKGROUND_CONFIG = {
  routes: [
    {
      pattern: /^\/dashboard/,
      variant: "blue",
      images: [
        "/images/gradients/page-gradient-blue.png",
        "/images/gradients/cream-gradient.png",
      ],
    },
  ],
  default: {
    variant: "blue",
    images: ["/images/gradients/page-gradient-blue.png", "/images/gradients/cream-gradient.png"],
  },
} as const;

const PageBackground = () => {
  const pathname = usePathname();

  const getBackgroundImages = () => {
    if (!pathname) return BACKGROUND_CONFIG.default.images;

    // Find matching route configuration
    const matchedRoute = BACKGROUND_CONFIG.routes.find((route) =>
      route.pattern.test(pathname)
    );

    return matchedRoute?.images || BACKGROUND_CONFIG.default.images;
  };

  const backgroundImages = getBackgroundImages();

  return (
    <>
      {backgroundImages.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt="Background Gradient"
          fill
          className="object-cover object-top"
          quality={100}
          priority={index === 0}
        />
      ))}
    </>
  );
};

export default PageBackground;
