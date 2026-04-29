import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Essai Gratuit SIRH IA en Afrique – Targetym AI',
  description: "Testez gratuitement Targetym AI : SIRH augmenté par l'IA pour les entreprises africaines. Recrutement, paie, performance — opérationnel en quelques jours.",
};

export default function EssaiGratuitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
