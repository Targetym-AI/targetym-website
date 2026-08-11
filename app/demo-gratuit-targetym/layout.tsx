import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Démo Gratuite — Targetym AI, meilleur SIRH augmenté par l\'IA en Afrique',
  description: "Targetym AI : le SIRH augmenté par l'IA et la Data, adapté au marché africain. Demandez votre démo gratuite et découvrez comment automatiser recrutement, paie et performance RH en Afrique.",
  keywords: ['Targetym', 'SIRH', 'SIRH Afrique', 'SIRH en Afrique', 'Targetym AI', 'IA RH', 'RH Afrique', 'logiciel RH Afrique', 'démo gratuite SIRH'],
  robots: {
    index: false,
    follow: false,
  },
};

export default function DemoGratuitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
