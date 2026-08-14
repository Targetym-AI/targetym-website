import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions SIRH & Agents IA RH en Afrique | Targetym AI',
  description: "Découvrez les solutions du meilleur logiciel RH en Afrique : recrutement, paie, performance, OKR, talents et people analytics — pour les entreprises du Sénégal, de Côte d'Ivoire et d'Afrique francophone.",
  keywords: [
    'SIRH Afrique',
    'logiciel RH Afrique',
    'agents IA RH',
    'SIRH Sénégal',
    "SIRH Côte d'Ivoire",
    'SIRH Bénin',
    'SIRH Cameroun',
    'SIRH Mali',
    'logiciel paie Afrique',
    'logiciel recrutement Afrique',
  ],
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
