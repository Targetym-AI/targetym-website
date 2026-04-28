import type { Metadata } from "next";
import { Nunito, Inter, Lora } from "next/font/google";
import Script from "next/script";
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
  description: "Transformez vos RH avec l'analytique people alimentée par l'IA. Targetym AI fournit des insights complets, un suivi des performances et des recommandations intelligentes.",
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
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-V7K9V9VJ9V" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V7K9V9VJ9V');
          `}
        </Script>
        <Script
          id="hs-script-loader"
          src="//js-eu1.hs-scripts.com/148317292.js"
          strategy="afterInteractive"
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
