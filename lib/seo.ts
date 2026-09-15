import type { Metadata } from 'next';

const SITE_URL = 'https://www.targetym.ai';
const DEFAULT_IMAGE = '/images/hero-rh.jpg';

type PublicPageMetadata = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

/** Metadata shared by public pages to keep canonical and social previews aligned. */
export function publicPageMetadata({ title, description, path, keywords = [] }: PublicPageMetadata): Metadata {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url,
      siteName: 'Targetym AI',
      title,
      description,
      images: [{ url: DEFAULT_IMAGE, width: 1200, height: 630, alt: 'Targetym AI — Logiciel RH en Afrique' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_IMAGE],
    },
  };
}

/** Métadonnées racines, communes aux deux layouts (site et pages historiques). */
export const rootMetadata: Metadata = {
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

export const organizationJsonLd = {
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
