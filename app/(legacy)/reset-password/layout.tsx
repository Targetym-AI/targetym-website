import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Réinitialiser le mot de passe – Targetym AI',
  description: "Définissez un nouveau mot de passe pour votre compte Targetym AI et reprenez le pilotage de votre SIRH IA en Afrique.",
  robots: { index: false, follow: false },
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
