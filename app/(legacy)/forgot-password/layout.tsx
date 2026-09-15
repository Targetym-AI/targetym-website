import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mot de passe oublié – Targetym AI',
  description: "Réinitialisez votre mot de passe Targetym AI en toute sécurité pour retrouver l'accès à votre SIRH IA en Afrique.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
