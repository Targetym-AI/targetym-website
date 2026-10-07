import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cta from '@/components/site/Cta';
import UseCasesExplorer from '@/components/site/use-cases/UseCasesExplorer';
import { publicPageMetadata } from '@/lib/seo';
import { caseById, fr, groups, modCases, pad, families } from '@/lib/site/use-cases';

export const metadata: Metadata = publicPageMetadata({
  title: "Cas d'usage SIRH et agents IA RH | Targetym AI",
  description: "Seize situations RH du quotidien, une par module, et le super-agent IA qui les traverse tous : recrutement, congés, paie, performance, départs. La situation, ce que fait le module, ce qui vous reste à décider.",
  keywords: [
    "cas d'usage SIRH",
    'agents IA RH',
    'logiciel RH Afrique',
    'SIRH Sénégal',
    "SIRH Côte d'Ivoire",
    'Targetym AI',
  ],
  path: '/use-cases',
});

export default function UseCasesPage() {
  const agentFamily = families.find((f) => f.key === 'agent')!;
  const agentCase = caseById('agent')!;
  const total = pad(groups.length);

  return (
    <>
      <section className="page-head">
        <p className="eyebrow">Cas d&apos;usage</p>
        <h1>Un cas d&apos;usage par module, <span>du recrutement au départ</span></h1>
        <p className="lead">Seize situations RH du quotidien, une par module (deux pour le recrutement), et le super-agent IA qui les traverse tous. Choisissez un module&nbsp;: la situation, ce que fait le module, ce qui vous reste à décider, et un aperçu de l&apos;app.</p>
      </section>

      {/* La carte d'entrée, en tuiles comme la pile de Solutions : une par famille
          (sa teinte, son numéro en encoche, sa capture), ses modules en pastilles.
          Chaque pastille ouvre la page du cas d'usage. Le super-agent IA a sa tuile. */}
      <section className="section sec-anim uc-hub" aria-labelledby="hub-title">
        <div className="hub-head">
          <div>
            <p className="eyebrow left">Tous les modules</p>
            <h2 className="head-duo left" id="hub-title">Sept familles, quinze modules, <span>un cas d&apos;usage pour chacun</span></h2>
          </div>
          <p className="hub-intro">Ouvrez un module pour voir la situation qu&apos;il règle, ce qu&apos;il fait à votre place et un aperçu de l&apos;app.</p>
        </div>
        <ul className="hub" data-uc-hub>
          {groups.map((f) => {
            const cs = modCases.filter((c) => c.fam === f.key);
            return (
              <li key={f.key} className={cs.length > 2 ? 'hub-tile is-wide' : 'hub-tile'} style={{ '--hub-bg': f.tint } as CSSProperties} data-cut>
                <span className="dock dock-tr" aria-hidden="true"><span className="hub-num"><b>{f.n}</b><i>/ {total}</i></span></span>
                <h3>{fr(f.name)} <span>{fr(f.sub)}</span></h3>
                <p className="hub-count">{cs.length} cas d&apos;usage</p>
                <ul className="hub-links">
                  {cs.map((c) => (
                    <li key={c.id}><Link href={`/use-cases/${c.id}`}>{fr(c.short)}<span aria-hidden="true">↗</span></Link></li>
                  ))}
                </ul>
                <div className="hub-shot" aria-hidden="true"><Image src={f.shot} alt="" width={1100} height={600} /></div>
              </li>
            );
          })}
          <li className="hub-tile hub-agent" data-cut>
            <Image className="hub-photo" src="/img/mod-6b.jpg" alt="" width={616} height={408} />
            <span className="dock dock-tr"><span className="v-live"><i aria-hidden="true"></i>{fr(agentCase.gain)}</span></span>
            <p className="hub-count">Transversal</p>
            <h3>{fr(agentFamily.name)} <span>{fr(agentFamily.sub)}</span></h3>
            <ul className="hub-links"><li><Link href="/use-cases/agent">Voir le cas d&apos;usage<span aria-hidden="true">↗</span></Link></li></ul>
          </li>
        </ul>
      </section>

      {/* Même carte que la une du blog : le super-agent IA, avec son déroulé en
          trois temps. Il traverse tous les modules, il n'en est pas un. */}
      <section className="section sec-anim blog-lead" aria-labelledby="agent-title">
        <p className="eyebrow left" id="agent-title">Le cas d&apos;usage transversal</p>
        <article className="post-feature uc-feature" id="uc-agent" data-cut>
          <Link className="pf-media" href="/use-cases/agent" aria-label="Voir le cas d'usage du super-agent IA"><Image src="/img/tour/copilote.jpg" alt="Le Copilote AI : le point du jour préparé par le super-agent, il reste à valider" width={1100} height={739} /> <span className="tag pf-tag">Super-agent IA</span> <span className="dock dock-br" aria-hidden="true"><span className="round">↗</span></span></Link>
          <div className="pf-body">
            <p className="pf-meta">Tous les modules<b>·</b>DRH, managers, collaborateurs<b>·</b>95&nbsp;% du travail RH</p>
            <h2><Link href="/use-cases/agent">Le super-agent IA, un cas d&apos;usage à lui tout seul</Link></h2>
            <p>Il ne remplace pas les modules, il les fait travailler&nbsp;: dans chacun, un agent prépare, instruit, génère et relance. Les décisions restent à vos équipes.</p>
            <ol className="uc-flow">
              <li><i className="lg-trigger" aria-hidden="true"></i><b>Déclencheur</b><span>Une demande arrive dans un module&nbsp;: attestation, congé, candidature, fin de contrat, run de paie.</span></li>
              <li><i className="lg-agent" aria-hidden="true"></i><b>L&apos;agent</b><span>Il prépare le document, instruit la demande ou classe les profils, avec les règles de votre entreprise et de votre convention collective.</span></li>
              <li><i className="lg-you" aria-hidden="true"></i><b>Vous</b><span>Vous validez ou refusez en un geste. Rien ne part sans une décision humaine.</span></li>
            </ol>
            <Link className="more" href="/use-cases/agent">Voir le cas d&apos;usage →</Link>
          </div>
        </article>
      </section>

      <UseCasesExplorer />

      <Cta
        image="/img/mod-7a.jpg"
        title={<>Ces cas d&apos;usage,<br />dans vos équipes&nbsp;?</>}
        text="15 jours d'essai, sans carte bancaire. Vos données importées et les modules au travail en 5 jours ouvrés."
        secondLabel="Parler à un expert RH"
        secondHref="/contact"
      />
    </>
  );
}
