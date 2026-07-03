import type { Metadata } from "next";
import { Nunito, Inter, Lora } from "next/font/google";

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
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

export const metadata: Metadata = {
  title: "Targetym AI - Plateforme RH & Performance augmentée par l'IA",
  description: "Targetym AI : plateforme SIRH augmentée par l'IA pour l'Afrique. Automatisez paie, performance, talents et people analytics avec 30+ agents IA RH.",
  verification: {
    google: 'B3q06AfiZvuiDmt8keNE14E5bilSXNjaidDJefTsZII',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${nunito.variable} ${inter.variable} ${lora.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GT-K8K3SHQQ" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GT-K8K3SHQQ');
              gtag('config', 'AW-17108802870');
            `,
          }}
        />
      </head>
      <body className="font-body antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        </body>
      </html>
  );
}
