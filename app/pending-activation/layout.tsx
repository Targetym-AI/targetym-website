import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activation du compte en cours – Targetym AI',
  description: "Votre compte Targetym AI est en cours d'activation. Vérifiez votre email pour finaliser l'accès à votre SIRH IA en Afrique.",
  robots: { index: false, follow: false },
};

export default function PendingActivationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
