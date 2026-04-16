import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  produit: [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Tarification', href: '/pricing' },
  ],
  entreprise: [
    { label: 'À Propos', href: '/about' },
    { label: 'Carrières', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  support: [
    { label: 'Documentation', href: '/resources' },
    { label: "Centre d'Aide", href: 'https://dashboard.targetym.ai/help', external: true },
    { label: 'Panneau Admin', href: '/login' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark" aria-label="Pied de page">
      {/* Accent bar */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand column */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <Link href="/" aria-label="Accueil Targetym AI">
              <Image
                src="/logo-targetym.png"
                alt="Targetym AI"
                width={160}
                height={42}
                className="object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              La plateforme RH intelligente pour les équipes africaines. Pilotez vos talents,
              anticipez les départs et prenez de meilleures décisions grâce à l&apos;IA.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://www.linkedin.com/company/targetym"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary-500/20 hover:border-primary-500/50 hover:text-primary-400 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/targetym"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary-500/20 hover:border-primary-500/50 hover:text-primary-400 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Produit */}
            <div>
              <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-5">
                Produit
              </h3>
              <ul className="space-y-3">
                {footerLinks.produit.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-secondary-400 text-sm transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Entreprise */}
            <div>
              <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-5">
                Entreprise
              </h3>
              <ul className="space-y-3">
                {footerLinks.entreprise.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-secondary-400 text-sm transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-5">
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-secondary-400 text-sm transition-colors duration-150"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-secondary-400 text-sm transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Targetym AI. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-150">
              Confidentialité
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-150">
              Conditions d&apos;utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
