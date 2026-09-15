import { organizationJsonLd } from '@/lib/seo';

/* Balises communes aux deux layouts racines : favicon, JSON-LD et Google tag */
export default function Analytics() {
  return (
    <>
      <link rel="icon" href="/favicon.png" type="image/png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=GT-K8K3SHQQ" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GT-K8K3SHQQ');
              gtag('config', 'AW-17108802870');
            `,
        }}
      />
    </>
  );
}

/* Masque dès le premier rendu les encoches que SiteEffects découpera ; filet de sécurité si le JS ne démarre pas */
export function CutBootstrap() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: "(function(d){d.classList.add('js-cut');setTimeout(function(){if(!d.classList.contains('cut-ready'))d.classList.remove('js-cut')},4000)})(document.documentElement)",
      }}
    />
  );
}
