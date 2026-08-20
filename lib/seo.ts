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
