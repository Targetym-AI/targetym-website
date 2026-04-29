import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Targetym AI – SIRH & Logiciel RH en Afrique',
  description: "Contactez Targetym AI pour découvrir notre SIRH augmenté par l'IA. Démos, devis et accompagnement pour vos RH en Afrique : paie, performance et talents.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
