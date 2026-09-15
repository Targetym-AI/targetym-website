import { Manrope, Nunito } from 'next/font/google';

import '@/styles/site/styles.css';
import '@/styles/site/pages.css';
import '@/styles/site/runtime.css';
import '@/styles/site/extras.css';
import SiteNav from '@/components/site/SiteNav';
import SiteFooter from '@/components/site/SiteFooter';
import SiteShell from '@/components/site/SiteShell';
import SiteEffects from '@/components/site/SiteEffects';
import Analytics, { CutBootstrap } from '@/components/site/Analytics';
import { rootMetadata } from '@/lib/seo';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = rootMetadata;

/* Pages du prototype v3 : CSS du prototype tel quel, sans Tailwind ni globals.css */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${nunito.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <CutBootstrap />
        <Analytics />
      </head>
      <body>
        <SiteShell nav={<SiteNav />} footer={<SiteFooter />}>{children}</SiteShell>
        <SiteEffects />
      </body>
    </html>
  );
}
