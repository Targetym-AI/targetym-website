import { Nunito, Inter, Lora, Manrope } from "next/font/google";

import "./globals.css";
import "@/styles/site/chrome.css";
import "@/styles/site/runtime.css";
import SiteChrome from "@/components/SiteChrome";
import Analytics, { CutBootstrap } from "@/components/site/Analytics";
import { rootMetadata } from "@/lib/seo";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

/* Police du texte de la nav et du pied de page du nouveau site */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${nunito.variable} ${inter.variable} ${lora.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <CutBootstrap />
        <Analytics />
      </head>
      <body className="font-body antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
