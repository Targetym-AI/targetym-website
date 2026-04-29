import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connexion & Inscription – Espace Targetym AI',
  description: "Connectez-vous ou créez votre compte Targetym AI pour accéder à votre SIRH IA et piloter vos RH en Afrique en toute sécurité.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
