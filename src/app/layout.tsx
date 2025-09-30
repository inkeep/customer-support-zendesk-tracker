import type { Metadata } from "next";
import {
  geistMono,
  geistSans,
  jetBrainsMono,
  neueHaasGroteskDisplayPro,
  notoSerif,
} from "@/styles/fonts";
import PageBackground from "@/components/PageBackground";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Customer Support Demo - Inkeep",
  description: "Inkeep AI Chat Integration with Zendesk Tracker - Experience the future of AI-powered customer support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}
         ${notoSerif.variable} ${jetBrainsMono.variable} ${neueHaasGroteskDisplayPro.variable} antialiased`}
      >
        <div className="fixed inset-0 -z-10">
          <PageBackground />
        </div>
        <Header />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
