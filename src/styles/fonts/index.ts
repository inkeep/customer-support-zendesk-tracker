import localFont from "next/font/local";
import {
  Geist,
  Geist_Mono,
  JetBrains_Mono,
  Noto_Serif,
} from "next/font/google";

export const neueHaasGroteskDisplayPro = localFont({
  src: [
    {
      path: "./neue-haas-grotesk-display-pro/Neue_Haas_Grotesk_Display_Pro_45_Light.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./neue-haas-grotesk-display-pro/Neue_Haas_Grotesk_Display_Pro_55_Roman.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./neue-haas-grotesk-display-pro/Neue_Haas_Grotesk_Display_Pro_65_Medium.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./neue-haas-grotesk-display-pro/Neue_Haas_Grotesk_Display_Pro_75_Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neue-haas-grotesk-display-pro",
});

export const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jet-brains-mono",
  subsets: ["latin"],
});

export const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
