import type { Metadata } from 'next';
import { publicPageMetadata } from '@/lib/seo';

export const metadata: Metadata = publicPageMetadata({
  title: 'Essai Gratuit SIRH IA en Afrique – Targetym AI',
  description: "Testez gratuitement Targetym AI : SIRH augmenté par l'IA pour les entreprises africaines. Recrutement, paie, performance — opérationnel en quelques jours.",
  path: '/essai-gratuit',
});

export default function EssaiGratuitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
