import type { Metadata } from 'next';
import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Cta from '@/components/site/Cta';
import { CheckIco, XIco } from '@/components/site/icons';
import UcCard from '@/components/site/use-cases/UcCard';
import { publicPageMetadata } from '@/lib/seo';
import { caseById, cases, familyOf, fr, modCases, pad, roles, type UseCase } from '@/lib/site/use-cases';

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const c = caseById(params.slug);
  if (!c) return {};
  return publicPageMetadata({
    title: `${c.short} : ${c.title} — Cas d'usage Targetym AI`,
    description: c.story,
    keywords: ["cas d'usage SIRH", c.module, 'agents IA RH', 'Targetym AI'],
    path: `/use-cases/${c.id}`,
  });
}

/* D'autres cas : la même famille d'abord, puis les suivants, en boucle */
function relatedTo(c: UseCase): UseCase[] {
  const i = cases.indexOf(c);
  const seen = new Set([c.id]);
  const related: UseCase[] = [];
  [...modCases.filter((x) => x.fam === c.fam), ...cases.slice(i + 1), ...cases.slice(0, i)].forEach((x) => {
    if (related.length < 3 && !seen.has(x.id)) { seen.add(x.id); related.push(x); }
  });
  return related;
}

/* Une étape peut citer un produit du groupe : [libellé](https://…) devient un lien, ouvert dans un nouvel onglet */
function withLinks(s: string): ReactNode[] {
  return s.split(/(\[[^\]]+\]\(https:\/\/[^)\s]+\))/).map((part, k) => {
    const m = /^\[([^\]]+)\]\((https:\/\/[^)\s]+)\)$/.exec(part);
    return m ? <a key={k} className="uc-step-link" href={m[2]} target="_blank" rel="noopener">{m[1]}</a> : part;
  });
}

/* La capture de l'app : celle du cas, ou celle de sa famille quand le cas est illustré par une photo */
function shotOf(c: UseCase): string {
  return /^\/img\/(modules|tour)\//.test(c.img) ? c.img : familyOf(c).shot;
}

export default function UseCasePage({ params }: Props) {
  const c = caseById(params.slug);
  if (!c) notFound();

  const f = familyOf(c);
  const agent = c.fam === 'agent';
  const i = cases.indexOf(c);
  const n = cases.length;
  const prev = cases[(i - 1 + n) % n];
  const next = cases[(i + 1) % n];
  const tint = { '--uc-bg': f.tint } as CSSProperties;
  const famLink = agent ? '/use-cases#uc-agent' : `/use-cases#${c.fam}`;
  const famName = agent ? 'Transversal' : f.name;
  const doer = agent ? 'L\'agent' : 'Le module';

  return (
    <>
      <div className="uc-page" data-uc-detail>
        {/* En-tête : le fil d'Ariane, le titre en deux temps, le récit, trois repères.
            À droite, le résultat sur une carte sombre, son numéro en encoche. */}
        <section className="page-head uc-head">
          <div className="uc-head-copy">
            <nav className="uc-crumbs" aria-label="Fil d'Ariane"><Link href="/use-cases">Cas d&apos;usage</Link><i aria-hidden="true">›</i><Link href={famLink}>{fr(famName)}</Link><i aria-hidden="true">›</i><span aria-current="page">{fr(c.short)}</span></nav>
            <h1>{fr(c.h1[0])} <span>{fr(c.h1[1])}</span></h1>
            <p className="lead">{fr(c.story)}</p>
            <ul className="uc-facts">
              <li><i>Module</i><b>{fr(c.module)}</b></li>
              <li><i>Pour</i><b>{fr(roles[c.role].who)}</b></li>
              <li><i>Temps fort</i><b>{fr(c.gain)}</b></li>
            </ul>
            <div className="actions"><Link className="btn btn-mint" href="/essai-gratuit">Démarrer l&apos;essai gratuit</Link><a className="btn btn-plain" href="#demo">Voir l&apos;aperçu <span aria-hidden="true">↓</span></a></div>
          </div>
          <aside className="uc-result" style={tint} data-cut aria-label="Le résultat">
            <span className="dock dock-tr" aria-hidden="true"><span className="hub-num">{agent ? <><b>15</b><i>modules</i></> : <><b>{pad(modCases.indexOf(c) + 1)}</b><i>/ {modCases.length}</i></>}</span></span>
            <p className="uc-kicker"><span className="live-dot" aria-hidden="true"></span>Avec Targetym AI</p>
            <p className="uc-r-after">{fr(c.after)}</p>
            <div className="uc-r-foot">
              <p className="uc-r-before"><i>Avant</i>{fr(c.before)}</p>
              <p className="uc-r-gain"><CheckIco />{fr(c.gain)}</p>
            </div>
          </aside>
        </section>

        {/* L'aperçu : une capture de l'écran du module (la démo interactive viendra plus tard) */}
        <section className="section sec-anim" id="demo" aria-labelledby="demo-title">
          <div className="uc-stage" style={tint}>
            <div className="uc-stage-copy">
              <p className="uc-kicker"><span className="live-dot" aria-hidden="true"></span>Aperçu de l&apos;app</p>
              <h2 id="demo-title">{fr(c.short)}, <span>comme dans l&apos;app</span></h2>
              <p className="uc-stage-note">Sahel Logistics est une entreprise fictive, ses données aussi.</p>
            </div>
            <figure className="uc-app"><Image src={shotOf(c)} alt={`Écran ${c.module} dans l'app Targetym AI`} width={1100} height={600} sizes="(max-width: 1080px) 100vw, 60vw" /></figure>
          </div>
        </section>

        {/* Le déroulé : la situation, ce que fait le module, ce qui vous reste */}
        <section className="section sec-anim" aria-labelledby="steps-title">
          <h2 className="head-duo left" id="steps-title">Comment ça se passe <span>de la situation à la décision</span></h2>
          <ol className="uc-steps">
            <li className="uc-step"><p className="uc-step-k"><i className="lg-trigger" aria-hidden="true"></i>La situation<b>01</b></p><p className="uc-step-big">{fr(c.situation)}</p></li>
            <li className="uc-step is-module"><p className="uc-step-k"><i className="lg-agent" aria-hidden="true"></i>{doer}<b>02</b></p><ul>{c.steps.map((s) => <li key={s}><CheckIco /><span>{withLinks(fr(s))}</span></li>)}</ul></li>
            <li className="uc-step"><p className="uc-step-k"><i className="lg-you" aria-hidden="true"></i>Vous<b>03</b></p><p className="uc-step-big">{fr(c.you)}</p></li>
          </ol>
        </section>

        {/* Avant / avec : les deux cartes face à face, le temps fort en encoche */}
        <section className="section sec-anim" aria-labelledby="cmp-title">
          <h2 className="head-duo left" id="cmp-title">Ce qui change <span>pour vos équipes</span></h2>
          <div className="uc-compare">
            <div className="uc-cmp is-before"><p className="uc-cmp-k">Avant</p><p className="uc-cmp-v">{fr(c.before)}</p><ul>{c.pains.map((s) => <li key={s}><XIco /><span>{fr(s)}</span></li>)}</ul></div>
            <div className="uc-cmp is-after" data-cut><span className="dock dock-tr"><span className="pill"><i aria-hidden="true"></i>{fr(c.gain)}</span></span><p className="uc-cmp-k">Avec Targetym AI</p><p className="uc-cmp-v">{fr(c.after)}</p><ul>{c.gains.map((s) => <li key={s}><CheckIco /><span>{fr(s)}</span></li>)}</ul></div>
          </div>
        </section>

        {/* Les fonctionnalités du module sur lesquelles le cas s'appuie */}
        <section className="section sec-anim" aria-labelledby="feat-title">
          <div className="uc-feats">
            <div className="uc-feats-copy">
              <h2 className="head-duo left" id="feat-title">Les fonctionnalités <span>mobilisées</span></h2>
              <p>{fr(agent ? 'Le super-agent s\'appuie sur ces briques, dans chacun des quinze modules.' : `Ce cas d'usage s'appuie sur ces briques du module ${c.module}, paramétrées avec vos règles.`)}</p>
              <Link className="uc-link" href={c.panel}>{agent ? 'Voir l\'agent sur l\'accueil' : 'Voir le module sur Solutions'} <span aria-hidden="true">↗</span></Link>
            </div>
            <ul className="uc-chips">{c.features.map((s) => <li key={s}><CheckIco />{fr(s)}</li>)}</ul>
          </div>
        </section>

        {/* D'autres cas (la même famille d'abord), puis précédent / suivant */}
        <section className="section sec-anim" aria-labelledby="rel-title">
          <div className="blog-top"><p className="eyebrow left" id="rel-title">Autres cas d&apos;usage</p><Link className="uc-link" href="/use-cases">Tous les cas d&apos;usage <span aria-hidden="true">→</span></Link></div>
          <ul className="post-grid uc-grid is-grid">{relatedTo(c).map((x, k) => <UcCard key={x.id} c={x} i={k} />)}</ul>
          <nav className="uc-pager" aria-label="Cas d'usage précédent et suivant">
            <Link className="prev" href={`/use-cases/${prev.id}`}><i><span aria-hidden="true">←</span> Précédent</i><b>{fr(prev.short)}</b><span>{fr(prev.title)}</span></Link>
            <Link className="next" href={`/use-cases/${next.id}`}><i>Suivant <span aria-hidden="true">→</span></i><b>{fr(next.short)}</b><span>{fr(next.title)}</span></Link>
          </nav>
        </section>
      </div>

      <Cta
        image="/img/mod-7a.jpg"
        title={<>Ce cas d&apos;usage,<br />dans vos équipes&nbsp;?</>}
        text="15 jours d'essai, sans carte bancaire. Vos données importées et les modules au travail en 5 jours ouvrés."
        secondLabel="Parler à un expert RH"
        secondHref="/contact"
      />
    </>
  );
}
