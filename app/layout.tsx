import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    <html lang="fr">
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
