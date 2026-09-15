import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { LineIco, type LineIcoName } from '@/components/site/icons';
import { publicPageMetadata } from '@/lib/seo';

export const metadata: Metadata = publicPageMetadata({
  title: 'Carrières — Targetym AI',
  description: "Rejoignez l'équipe Targetym AI, le SIRH n°1 en Afrique (Sénégal, Côte d'Ivoire, Bénin, Cameroun, Mali). Construisons ensemble l'avenir des RH africaines.",
  keywords: [
    'emploi Targetym AI',
    'carrières SIRH Afrique',
    'logiciel RH Afrique',
    'emploi tech Sénégal',
    "emploi tech Côte d'Ivoire",
    'Targetym AI',
  ],
  path: '/careers',
});

const perks: { icon: LineIcoName; title: string; desc: string }[] = [
  {
    icon: 'rocket',
    title: 'Impact direct',
    desc: "Vos contributions transforment la gestion des talents dans des centaines d'entreprises africaines.",
  },
  {
    icon: 'heart',
    title: 'Culture bienveillante',
    desc: 'Une équipe soudée, flexible et orientée résultats. Le bien-être est une priorité, pas un bonus.',
  },
  {
    icon: 'bolt',
    title: 'Technologie de pointe',
    desc: 'Vous travaillez avec les dernières avancées en IA, FastAPI, Next.js et analytics at scale.',
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="page-head split">
        <div>
          <p className="eyebrow">Carrières</p>
          <h1>Rejoignez l&apos;aventure <span>Targetym AI</span></h1>
          <p className="lead">Nous construisons la suite SIRH qui va redéfinir la gestion des talents en Afrique. Si vous êtes passionné(e) par la tech et les RH, votre place est ici.</p>
          <div className="actions"><a className="btn btn-mint" href="#postes">Voir les postes ouverts</a> <Link className="btn btn-plain" href="/contact">Candidature spontanée</Link></div>
        </div>
        <figure className="ph-visual" data-cut>
          <Image src="/img/mod-3b.jpg" alt="Une collaboratrice souriante, bras croisés, devant un tableau blanc couvert de notes" width={900} height={720} sizes="(max-width: 860px) 100vw, 42vw" priority />
          <figcaption className="dock dock-bl"><span className="v-live"><i aria-hidden="true"></i>Nous sommes en pleine croissance</span></figcaption>
        </figure>
      </section>

      <section className="section sec-anim" aria-labelledby="perks-title">
        <div className="sec-top">
          <h2 className="head-duo left" id="perks-title">Pourquoi nous rejoindre&nbsp;? <span>trois bonnes raisons</span></h2>
        </div>
        <ul className="pcards">
          {perks.map((p, i) => (
            <li key={p.title} className={i === 0 ? 'pcard is-hi' : 'pcard'}>
              <div className="pcard-top"><span className="c-ico"><LineIco name={p.icon} /></span><span className="pcard-n">0{i + 1}</span></div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section sec-anim" id="postes" aria-labelledby="jobs-title">
        <div className="sec-top">
          <h2 className="head-duo left" id="jobs-title">Postes ouverts <span>et candidatures spontanées</span></h2>
          <p>Nous sommes en pleine croissance. Aucun poste listé ne correspond à votre profil&nbsp;? Envoyez-nous une candidature spontanée.</p>
        </div>
        <div className="jobs-empty">
          <span className="c-ico"><LineIco name="briefcase" /></span>
          <b>Aucun poste ouvert pour le moment.</b>
          <p>Revenez bientôt ou envoyez une candidature spontanée.</p>
          <Link className="btn btn-mint" href="/contact">Candidature spontanée <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </>
  );
}
