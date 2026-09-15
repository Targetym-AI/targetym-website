import Link from 'next/link';
import type { ReactNode } from 'react';
import LegalToc, { type TocItem } from './LegalToc';

const DOCS = [
  { href: '/privacy', label: 'Confidentialité' },
  { href: '/terms', label: 'Mentions légales & CGU' },
  { href: '/cgv', label: 'Conditions de vente' },
];

type Props = {
  current: string;
  eyebrow: string;
  title: ReactNode;
  updated: string;
  frame: string;
  contact: string;
  toc: TocItem[];
  children: ReactNode;
};

/* Pages légales : titre bicolore, trois repères, les trois documents en onglets,
   puis le texte avec son sommaire collé à gauche */
export default function LegalPage({ current, eyebrow, title, updated, frame, contact, toc, children }: Props) {
  return (
    <>
      <section className="page-head legal-head">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <ul className="uc-facts">
          <li><i>Dernière mise à jour</i><b>{updated}</b></li>
          <li><i>Cadre</i><b>{frame}</b></li>
          <li><i>Contact</i><b><a href={`mailto:${contact}`}>{contact}</a></b></li>
        </ul>
        <nav className="tabbar" aria-label="Documents légaux">
          {DOCS.map((doc) => (
            <Link key={doc.href} className={doc.href === current ? 'tab is-on' : 'tab'} href={doc.href} aria-current={doc.href === current ? 'page' : undefined}>{doc.label}</Link>
          ))}
        </nav>
      </section>

      <section className="section" aria-label="Texte intégral">
        <div className="legal">
          <LegalToc items={toc} />
          <article className="legal-body">{children}</article>
        </div>
      </section>
    </>
  );
}
