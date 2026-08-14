import type { Metadata } from "next";
import { Nunito, Inter, Lora } from "next/font/google";

import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

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
  metadataBase: new URL('https://www.targetym.ai'),
  title: "Targetym AI - Meilleur Logiciel RH (SIRH) en Afrique augmenté par l'IA",
  description: "Targetym AI, le SIRH augmenté par l'IA n°1 en Afrique : Sénégal, Côte d'Ivoire, Bénin, Cameroun, Mali. Automatisez paie, recrutement, performance et talents avec 30+ agents IA RH.",
  keywords: [
    'Targetym AI',
    'logiciel RH Afrique',
    'meilleur logiciel RH Afrique',
    'SIRH Afrique',
    'meilleur SIRH en Afrique',
    'SIRH Sénégal',
    "SIRH Côte d'Ivoire",
    'SIRH Bénin',
    'SIRH Cameroun',
    'SIRH Mali',
    'logiciel RH Sénégal',
    "logiciel RH Côte d'Ivoire",
    'logiciel de gestion RH Afrique',
    'plateforme RH Afrique',
    'ERP RH Afrique',
    'SIRH IA',
    'agents IA RH',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.targetym.ai',
    siteName: 'Targetym AI',
    title: "Targetym AI - Meilleur Logiciel RH (SIRH) en Afrique augmenté par l'IA",
    description: "Le SIRH augmenté par l'IA n°1 en Afrique : Sénégal, Côte d'Ivoire, Bénin, Cameroun, Mali. Paie, recrutement, performance et talents avec 30+ agents IA RH.",
    images: [{ url: '/images/hero-rh.jpg', width: 1200, height: 630, alt: 'Targetym AI — Logiciel RH en Afrique' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Targetym AI - Meilleur Logiciel RH (SIRH) en Afrique",
    description: "Le SIRH augmenté par l'IA n°1 en Afrique : Sénégal, Côte d'Ivoire, Bénin, Cameroun, Mali.",
    images: ['/images/hero-rh.jpg'],
  },
  verification: {
    google: 'B3q06AfiZvuiDmt8keNE14E5bilSXNjaidDJefTsZII',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Targetym AI',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://www.targetym.ai',
  image: 'https://www.targetym.ai/logo-targetym.png',
  description: "Targetym AI est un SIRH (Système d'Information des Ressources Humaines) augmenté par l'IA, conçu pour les entreprises africaines : recrutement, paie, performance, talents et people analytics.",
  areaServed: [
    { '@type': 'Country', name: 'Sénégal' },
    { '@type': 'Country', name: "Côte d'Ivoire" },
    { '@type': 'Country', name: 'Bénin' },
    { '@type': 'Country', name: 'Cameroun' },
    { '@type': 'Country', name: 'Mali' },
    { '@type': 'Country', name: 'Togo' },
    { '@type': 'Country', name: 'Burkina Faso' },
  ],
  provider: {
    '@type': 'Organization',
    name: 'Agiltym SARL',
    url: 'https://www.targetym.ai',
    logo: 'https://www.targetym.ai/logo-targetym.png',
    sameAs: [
      'https://www.linkedin.com/showcase/targetym-ai-sirh/posts/?feedView=all',
    ],
  },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'XOF',
    availability: 'https://schema.org/InStock',
    url: 'https://www.targetym.ai/pricing',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
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
        <SiteChrome>{children}</SiteChrome>
      </body>
      </html>
  );
}
