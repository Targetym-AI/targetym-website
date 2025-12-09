import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark">
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 via-secondary-500 to-secondary-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à transformer vos RH ?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Commencez votre essai gratuit dès aujourd&apos;hui. Aucune carte de crédit requise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login?tab=register"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-primary-600 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              Commencer l&apos;Essai Gratuit
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
            >
              Voir la Tarification
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-9 h-9 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-white text-lg leading-tight">Targetym AI</span>
                  <span className="text-xs text-gray-400 leading-tight">HR Analytics</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm max-w-xs">
                Transformez vos RH avec l&apos;analytique people alimentée par l&apos;IA.
              </p>
            </div>

            {/* Produit */}
            <div>
              <h3 className="text-white font-semibold mb-4">Produit</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/solutions" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Tarification
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Cas d&apos;Usage
                  </Link>
                </li>
              </ul>
            </div>

            {/* Entreprise */}
            <div>
              <h3 className="text-white font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                    À Propos
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Carrières
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/docs" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Centre d&apos;Aide
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Panneau Admin
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Targetym AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
