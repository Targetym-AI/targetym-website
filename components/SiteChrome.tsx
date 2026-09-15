'use client';

import { usePathname } from 'next/navigation';
import SiteNav from './site/SiteNav';
import SiteFooter from './site/SiteFooter';
import SiteEffects from './site/SiteEffects';

const matches = (pathname: string, prefixes: string[]) =>
  prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

/* Pages sans habillage : la connexion a sa propre scène plein écran */
const BARE_PREFIXES = ['/login'];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (matches(pathname, BARE_PREFIXES)) {
    return <main className="min-h-screen">{children}</main>;
  }

  /* Même cadre que le nouveau site : page blanche arrondie, nav et pied de page du prototype */
  return (
    <div className="frame">
      <div className="page">
        <SiteNav />
        <main>{children}</main>
      </div>
      <SiteFooter />
      <SiteEffects />
    </div>
  );
}
