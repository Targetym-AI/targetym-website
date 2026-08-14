import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Targetym AI – SIRH & Logiciel RH en Afrique',
  description: "Contactez Targetym AI pour découvrir le meilleur logiciel RH en Afrique. Démos, devis et accompagnement pour vos RH au Sénégal, en Côte d'Ivoire, au Bénin, au Cameroun et au Mali.",
  keywords: [
    'contact SIRH Afrique',
    'logiciel RH Afrique',
    'SIRH Sénégal',
    "SIRH Côte d'Ivoire",
    'SIRH Bénin',
    'SIRH Cameroun',
    'SIRH Mali',
    'démo SIRH Afrique',
    'Targetym AI',
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
