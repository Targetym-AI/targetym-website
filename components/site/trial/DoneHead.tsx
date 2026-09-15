import Link from 'next/link';
import type { ReactNode } from 'react';
import { CheckIco, LineIco } from '@/components/site/icons';

type Props = { eyebrow: string; title: ReactNode; lead: ReactNode; home?: boolean };

/* En-tête des pages de confirmation : la coche, le titre, le rappel de l'e-mail */
export default function DoneHead({ eyebrow, title, lead, home = true }: Props) {
  return (
    <section className="page-head done-head">
      <span className="done-ico" aria-hidden="true"><CheckIco /></span>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lead">{lead}</p>
      <ul className="head-checks">
        <li><LineIco name="mail" />Vérifiez votre boîte mail — un email de confirmation vous a été envoyé.</li>
      </ul>
      {home && <div className="actions"><Link className="btn btn-mint" href="/">Retour à l&apos;accueil <span aria-hidden="true">→</span></Link> <Link className="btn btn-plain" href="/use-cases">Explorer les cas d&apos;usage</Link></div>}
    </section>
  );
}
