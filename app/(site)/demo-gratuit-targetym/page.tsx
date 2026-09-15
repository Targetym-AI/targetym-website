import Image from 'next/image';
import { CheckIco } from '@/components/site/icons';
import DemoForm from '@/components/site/trial/DemoForm';

/* Page d'atterrissage des campagnes : habillage réduit au logo (voir SiteShell) */
export default function DemoGratuitTargetymPage() {
  return (
    <section className="page-head">
      <div className="demo">
        <div className="demo-copy">
          <p className="pill"><i aria-hidden="true"></i>Démo gratuite</p>
          <h1>Ravis de vous rencontrer&nbsp;! <span>Demandez votre démo Targetym AI</span></h1>
          <p className="lead">Laissez-nous vos coordonnées, notre équipe vous recontacte rapidement pour vous présenter le SIRH augmenté par l&apos;IA.</p>
          <ul className="head-checks">
            <li><CheckIco />Présentation personnalisée</li>
            <li><CheckIco />Sans engagement</li>
            <li><CheckIco />Données sécurisées</li>
          </ul>
          <figure className="c-photo" data-cut>
            <Image src="/img/mod-1b.jpg" alt="Une conseillère souriante, assise sur un bureau, un carnet à la main" width={900} height={560} sizes="(max-width: 1100px) 100vw, 50vw" priority />
            <figcaption className="dock dock-bl"><span className="quote-who"><b>L&apos;équipe Targetym AI</b><i>Du lundi au vendredi, 9h à 18h</i></span></figcaption>
          </figure>
        </div>
        <DemoForm />
      </div>
    </section>
  );
}
