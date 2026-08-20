import type { Metadata } from 'next';
import { publicPageMetadata } from '@/lib/seo';

export const metadata: Metadata = publicPageMetadata({
  title: 'Essai Gratuit SIRH IA en Afrique – Targetym AI',
  description: "Testez gratuitement Targetym AI : SIRH augmenté par l'IA pour les entreprises africaines. Recrutement, paie, performance — opérationnel en quelques jours.",
  keywords: [
    'essai gratuit SIRH',
    'démo SIRH Afrique',
    'logiciel RH Afrique',
    'SIRH IA',
    'meilleur SIRH en Afrique',
    'SIRH Sénégal',
    "SIRH Côte d'Ivoire",
    'SIRH Mali',
    'SIRH Guinée',
    'SIRH Gabon',
    'SIRH Congo',
    'SIRH Comores',
    'recrutement RH',
    'paie et gestion RH',
    'performance et OKR',
    'Targetym AI',
  ],
  path: '/essai-gratuit',
});

export default function EssaiGratuitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
