import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Phone, Gift, Rocket } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Demande envoyée — Targetym AI',
  description: 'Votre demande d\'essai gratuit a bien été reçue. Notre équipe vous contactera sous 24 heures.',
  robots: {
    index: false,
    follow: false,
  },
};

const steps = [
  {
    icon: Phone,
    title: 'Présentation personnalisée',
    detail: '1h – 1h30',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: Gift,
    title: 'Essai gratuit 15 jours',
    detail: 'Sans carte bancaire',
    color: 'from-secondary-500 to-secondary-600',
  },
  {
    icon: Rocket,
    title: 'Démarrage & intégration',
    detail: 'Accompagné pas à pas',
    color: 'from-indigo-500 to-indigo-600',
  },
];

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center px-4 py-24">
      <div className="max-w-lg w-full text-center">

        {/* Icône */}
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-primary-500" />
        </div>

        {/* Titre */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Demande envoyée !</h1>
        <p className="text-lg text-gray-600 mb-2">
          Merci pour votre demande. Notre équipe vous contactera dans les{' '}
          <strong>24 heures</strong> pour planifier votre présentation.
        </p>
        <p className="text-gray-500 mb-8">
          Vérifiez votre boîte mail — un email de confirmation vous a été envoyé.
        </p>

        {/* Rappel étapes */}
        <div className="bg-white border border-primary-100 rounded-2xl p-6 text-left mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            La suite en 3 étapes
          </p>
          {steps.map((s) => (
            <div key={s.title} className="flex items-center gap-3 mb-3 last:mb-0">
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0`}>
                <s.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{s.title}</p>
                <p className="text-xs text-gray-400">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA retour accueil */}
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
