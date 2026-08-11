'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

const MINIMAL_CHROME_PREFIXES = ['/demo-gratuit-targetym'];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMinimal = MINIMAL_CHROME_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isMinimal) {
    return (
      <>
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-center">
              <Link href="/">
                <Image
                  src="/logo-targetym-dark.png"
                  alt="Targetym AI"
                  width={150}
                  height={40}
                  className="object-contain"
                />
              </Link>
            </div>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
