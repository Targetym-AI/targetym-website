import type { Metadata } from 'next';
import DoneHead from '@/components/site/trial/DoneHead';

export const metadata: Metadata = {
  title: 'Demande envoyée — Targetym AI',
  description: 'Votre demande de démo gratuite a bien été reçue. Notre équipe vous recontacte rapidement.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConfirmationPage() {
  return (
    <DoneHead
      eyebrow="Démo gratuite"
      title={<>Merci&nbsp;! <span>votre demande est bien arrivée</span></>}
      lead="Votre demande a bien été envoyée. Notre équipe vous recontacte très rapidement pour organiser votre démo Targetym AI."
    />
  );
}
