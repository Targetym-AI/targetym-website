'use client';

import Link from 'next/link';
import { Clock, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const SUPPORT_EMAIL = 'contact@targetym.com';

export default function PendingActivationPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-amber-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Votre demande a bien été enregistrée
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 leading-relaxed mb-6">
            Notre équipe vous contactera sous <strong>24H</strong> pour finaliser
            votre activation. Des frais d&apos;installation de{' '}
            <strong className="text-gray-900">297 000 FCFA</strong> seront
            requis pour démarrer votre essai gratuit de 30 jours.
          </p>

          {/* What's included */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">
              Inclus dans votre essai gratuit
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                30 jours d&apos;accès complet aux fonctionnalités Premium
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                Jusqu&apos;à 100 collaborateurs
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                OKR, Performance, Formation, Analytics et plus
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                Accompagnement à la prise en main
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
            <Mail className="w-4 h-4 mr-2" />
            <span>
              Une question ?{' '}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {SUPPORT_EMAIL}
              </a>
            </span>
          </div>

          {/* Back to login */}
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}
