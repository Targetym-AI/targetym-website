import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark">
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
                {/* Masqué — réactiver quand les vraies case studies seront prêtes
                <li>
                  <Link href="/case-studies" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Cas d&apos;Usage
                  </Link>
                </li>
                */}
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
                  <Link href="/resources" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <a href="https://dashboard.targetym.ai/help" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Centre d&apos;Aide
                  </a>
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
