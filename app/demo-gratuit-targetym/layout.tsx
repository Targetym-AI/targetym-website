import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Démo Gratuite Targetym AI — Événement Odoo',
  description: "Rencontrez Targetym AI lors de l'événement Odoo et demandez votre démo gratuite personnalisée du SIRH augmenté par l'IA.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DemoGratuitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
