import type { Metadata } from 'next';
import Image from 'next/image';
import ContactForm from '@/components/site/contact/ContactForm';
import { publicPageMetadata } from '@/lib/seo';

export const metadata: Metadata = publicPageMetadata({
  title: 'Contact Targetym AI – SIRH & Logiciel RH en Afrique',
  description: "Contactez Targetym AI pour découvrir le meilleur logiciel RH en Afrique. Démos, devis et accompagnement pour vos RH au Sénégal, en Côte d'Ivoire, au Bénin, au Cameroun et au Mali.",
  keywords: [
    'contact SIRH Afrique',
    'logiciel RH Afrique',
    'SIRH Sénégal',
    "SIRH Côte d'Ivoire",
    'SIRH Bénin',
    'SIRH Cameroun',
    'SIRH Mali',
    'démo SIRH Afrique',
    'Targetym AI',
  ],
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <section className="page-head">
        <p className="eyebrow">Contact</p>
        <h1>Parlons de votre projet RH <span>réponse sous 24&nbsp;h ouvrées</span></h1>
        <p className="lead">Que vous soyez une startup ou un groupe multi-pays, nous avons une solution adaptée. Écrivez-nous pour une démonstration personnalisée.</p>
      </section>

      <section className="section sec-anim" aria-label="Nous contacter">
        <div className="contact">
          <div>
            <ul className="c-list">
              <li>
                <span className="c-ico"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="4" /><path d="M3.5 7.5l7.3 5a2 2 0 0 0 2.4 0l7.3-5" /></svg></span>
                <div><b>Email</b><a href="mailto:sales@agiltym.com">sales@agiltym.com</a><a href="mailto:support@agiltym.com">support@agiltym.com</a></div>
              </li>
              <li>
                <span className="c-ico"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.6 3.5h2.9l1.7 4.2-2 1.4a11 11 0 0 0 6.7 6.7l1.4-2 4.2 1.7v2.9a2 2 0 0 1-2.2 2C10.4 20 4 13.6 3.5 5.7a2 2 0 0 1 2.1-2.2z" /></svg></span>
                <div><b>Téléphone</b><a href="tel:+221779043443">+221 77 904 34 43</a></div>
              </li>
              <li>
                <span className="c-ico"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0 1 13 0c0 5.3-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.5" /></svg></span>
                <div>
                  <b>Adresse</b>
                  <p>Mermoz VDN, Immeuble Bidaness Building<br />1<sup>er</sup> étage, Dakar, Sénégal</p>
                </div>
              </li>
              <li>
                <span className="c-ico"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5c4.9 0 8.8 3.2 8.8 7.3S16.9 18 12 18c-.9 0-1.7-.1-2.5-.3L5 19.8l1-3.3c-1.7-1.3-2.8-3.3-2.8-5.7C3.2 6.7 7.1 3.5 12 3.5z" /></svg></span>
                <div>
                  <b>Support</b>
                  <p>24h/24 et 7j/7 pour les clients Entreprise<br />Du lundi au vendredi, 9h à 18h, pour les autres plans</p>
                </div>
              </li>
            </ul>
            <figure className="c-photo" data-cut>
              <Image src="/img/mod-6a.jpg" alt="Une collaboratrice au téléphone, souriante, dans un bureau" width={900} height={560} sizes="(max-width: 860px) 100vw, 45vw" />
              <figcaption className="dock dock-bl"><span className="quote-who"><b>Bureau de Dakar</b><i>Mermoz VDN · du lundi au vendredi, 9h à 18h</i></span></figcaption>
            </figure>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
