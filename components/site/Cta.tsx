import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type CtaProps = {
  image: string;
  title: ReactNode;
  text: ReactNode;
  secondLabel: string;
  secondHref: string;
};

/* Bandeau final des pages : photo, titre, et les deux boutons en encoche bas-gauche */
export default function Cta({ image, title, text, secondLabel, secondHref }: CtaProps) {
  return (
    <section className="cta sec-anim" data-cut>
      <Image className="cta-bg" src={image} alt="" width={1400} height={740} sizes="100vw" />
      <div className="cta-inner">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="dock dock-bl cta-dock">
        <div className="cta-actions">
          <Link className="btn btn-mint" href="/essai-gratuit">Démarrer l&apos;essai gratuit</Link>{' '}
          <Link className="btn btn-plain" href={secondHref}>{secondLabel}</Link>
        </div>
      </div>
    </section>
  );
}
