import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center px-4 py-24">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-primary-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Merci !</h1>
        <p className="text-lg text-gray-600 mb-2">
          Votre demande a bien été envoyée. Notre équipe vous recontacte très rapidement pour organiser votre démo Targetym AI.
        </p>
        <p className="text-gray-500 mb-8">
          Vérifiez votre boîte mail — un email de confirmation vous a été envoyé.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
        >
          Retour à l&apos;accueil <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
