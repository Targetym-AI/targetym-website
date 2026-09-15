'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/* Page d'atterrissage des campagnes : le logo seul, sans nav ni pied de page */
const MINIMAL_PREFIXES = ['/demo-gratuit-targetym'];

type Props = { nav: ReactNode; footer: ReactNode; children: ReactNode };

/* Le cadre des pages : page blanche arrondie, nav et pied de page du prototype.
   <main> garde sa place dans l'arbre, quel que soit l'habillage. */
export default function SiteShell({ nav, footer, children }: Props) {
  const pathname = usePathname() || '/';
  const minimal = MINIMAL_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  return (
    <div className="frame">
      <div className="page">
        {minimal ? (
          <header className="nav-min">
            <Link href="/" aria-label="Targetym AI, accueil"><Image src="/img/logo-targetym-dark.avif" alt="Targetym AI" width={384} height={58} priority /></Link>
          </header>
        ) : nav}
        <main>{children}</main>
      </div>
      {!minimal && footer}
    </div>
  );
}
