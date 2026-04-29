import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions SIRH & Agents IA RH en Afrique | Targetym AI',
  description: "Découvrez les solutions SIRH IA Targetym AI : recrutement, paie, performance, OKR, talents et people analytics — pensés pour les entreprises africaines.",
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
