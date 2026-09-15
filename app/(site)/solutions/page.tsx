import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cta from '@/components/site/Cta';
import SolutionsStack from '@/components/site/solutions/SolutionsStack';
import { publicPageMetadata } from '@/lib/seo';

export const metadata: Metadata = publicPageMetadata({
  title: 'Solutions SIRH & Agents IA RH en Afrique | Targetym AI',
  description: "Découvrez les solutions du meilleur logiciel RH en Afrique : recrutement, paie, performance, OKR, talents et people analytics — pour les entreprises du Sénégal, de Côte d'Ivoire et d'Afrique francophone.",
  keywords: [
    'SIRH Afrique',
    'logiciel RH Afrique',
    'agents IA RH',
    'SIRH Sénégal',
    "SIRH Côte d'Ivoire",
    'SIRH Bénin',
    'SIRH Cameroun',
    'SIRH Mali',
    'logiciel paie Afrique',
    'logiciel recrutement Afrique',
  ],
  path: '/solutions',
});

export default function SolutionsPage() {
  return (
    <>
      <section className="page-head split">
        <div>
          <p className="eyebrow">Solutions</p>
          <h1>Une suite RH complète, <span>un agent IA dans chaque module</span></h1>
          <p className="lead">Du recrutement au départ, Targetym AI couvre tout le cycle de vie de vos collaborateurs&nbsp;: sept familles de modules interconnectées, et dans chacune un agent qui prend l&apos;administratif en charge.</p>
          <div className="actions"><Link className="btn btn-mint" href="/essai-gratuit">Démarrer l&apos;essai gratuit</Link> <Link className="btn btn-plain" href="/contact">Demander une démo</Link></div>
        </div>
        <figure className="ph-visual" data-cut>
          <Image src="/img/mod-5b.jpg" alt="Trois collègues autour d'un ordinateur portable affichant un tableau de bord" width={900} height={720} priority />
          <figcaption className="dock dock-bl"><span className="v-live"><i aria-hidden="true"></i>L&apos;agent a présélectionné 14 candidatures</span></figcaption>
        </figure>
      </section>

      <section className="pillars sec-anim" aria-label="Ce que l'agent apporte dans chaque module">
        <div className="pillars-band" data-cut>
          <span className="dock dock-tl" aria-hidden="true"><span className="fig-tag">Dans chaque module</span></span>
          <ul>
            <li>
              <span className="p-ico"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="7" width="16" height="12" rx="4" /><path d="M12 3.5V7M9 12h.01M15 12h.01M9.5 15.5h5" /></svg></span>
              <b>Agents IA spécialisés</b>
              <p>Jusqu&apos;à 30 agents experts, un par domaine RH.</p>
            </li>
            <li>
              <span className="p-ico"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2.5L4.5 13.5H11l-1 8 8.5-11H12z" /></svg></span>
              <b>Automatisation intelligente</b>
              <p>L&apos;agent agit&nbsp;: documents générés, alertes, recommandations.</p>
            </li>
            <li>
              <span className="p-ico"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="8" height="10" rx="2.5" /><rect x="13" y="3" width="8" height="6" rx="2.5" /><rect x="13" y="11" width="8" height="10" rx="2.5" /><rect x="3" y="15" width="8" height="6" rx="2.5" /></svg></span>
              <b>Tableaux de bord prédictifs</b>
              <p>Des indicateurs qui anticipent les tendances, pas seulement le passé.</p>
            </li>
            <li>
              <span className="p-ico"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5c4.9 0 8.8 3.2 8.8 7.3S16.9 18 12 18c-.9 0-1.7-.1-2.5-.3L5 19.8l1-3.3c-1.7-1.3-2.8-3.3-2.8-5.7C3.2 6.7 7.1 3.5 12 3.5z" /></svg></span>
              <b>Agent conversationnel</b>
              <p>Posez vos questions RH en langage naturel, en français.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section sec-anim" id="modules">
        <p className="eyebrow">Sept familles de modules</p>
        <h2 className="head-duo">Explorez la suite,<span>famille par famille</span></h2>
        <div className="sk-stack">
          <article className="sk-card" id="m-recrutement" style={{ '--i': '0' } as CSSProperties} data-cut>
            <div className="sk-body">
              <h3 className="sk-title">Recrutement<span>&amp; onboarding</span></h3>
              <div className="sk-tags" role="tablist" aria-label="Sous-modules Recrutement &amp; onboarding"><button className="sk-tag is-on" type="button" role="tab" id="m-recrutement-t0" aria-controls="m-recrutement-0" aria-selected="true">Recrutement</button></div>
              <div className="sk-subs">
                <div className="sk-sub" id="m-recrutement-0" role="tabpanel" aria-labelledby="m-recrutement-t0">
                  <div className="sk-text">
                    <p className="sk-desc"><svg className="sk-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l1.9 6.6 6.6 1.9-6.6 1.9L12 19.5l-1.9-6.6L3.5 11l6.6-1.9z" /></svg><span>Attirez et intégrez les meilleurs talents avec un processus intelligent, de l&apos;offre à l&apos;arrivée.</span></p>
                    <p className="sk-agent"><span className="live-dot" aria-hidden="true"></span><span><b>L&apos;agent&nbsp;:</b> analyse automatiquement les CV et classe les meilleurs profils.</span></p>
                    <ul className="sk-chips">
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Offres multi-canaux</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Scoring IA des candidats</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Pipeline visuel</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Grilles collaboratives</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Onboarding structuré</li>
                    </ul>
                    <Link className="sk-more" href="/use-cases/recrutement">En savoir plus <span aria-hidden="true">↗</span></Link>
                  </div>
                  <figure className="sk-shot"><Image src="/img/modules/recrutement.jpg" alt="Écran Recrutement : pipeline des candidats et scoring IA des CV" width={1100} height={600} /></figure>
                </div>
              </div>
            </div>
            <span className="sk-dock" aria-hidden="true"><b>01</b><i>/ 07</i></span>
          </article>
          <article className="sk-card" id="m-administration" style={{ '--i': '1' } as CSSProperties} data-cut>
            <div className="sk-body">
              <h3 className="sk-title">Administration<span>RH</span></h3>
              <div className="sk-tags" role="tablist" aria-label="Sous-modules Administration RH"><button className="sk-tag is-on" type="button" role="tab" id="m-administration-t0" aria-controls="m-administration-0" aria-selected="true">Gestion du personnel</button> <button className="sk-tag" type="button" role="tab" id="m-administration-t1" aria-controls="m-administration-1" aria-selected="false">Congés &amp; absences</button> <button className="sk-tag" type="button" role="tab" id="m-administration-t2" aria-controls="m-administration-2" aria-selected="false">Documents RH</button> <button className="sk-tag" type="button" role="tab" id="m-administration-t3" aria-controls="m-administration-3" aria-selected="false">Budget RH</button></div>
              <div className="sk-subs">
                <div className="sk-sub" id="m-administration-0" role="tabpanel" aria-labelledby="m-administration-t0">
                  <div className="sk-text">
                    <p className="sk-desc"><svg className="sk-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l1.9 6.6 6.6 1.9-6.6 1.9L12 19.5l-1.9-6.6L3.5 11l6.6-1.9z" /></svg><span>Centralisez la gestion de vos collaborateurs en un seul endroit.</span></p>
                    <p className="sk-agent"><span className="live-dot" aria-hidden="true"></span><span><b>L&apos;agent&nbsp;:</b> détecte les échéances critiques et alerte avant qu&apos;elles ne tombent.</span></p>
                    <ul className="sk-chips">
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Dossiers collaborateurs complets</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Organigramme dynamique</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Suivi des contrats et échéances</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Import CSV / Excel</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Gestion multi-sites</li>
                    </ul>
                    <Link className="sk-more" href="/use-cases/personnel">En savoir plus <span aria-hidden="true">↗</span></Link>
                  </div>
                  <figure className="sk-shot"><Image src="/img/modules/personnel.jpg" alt="Écran Gestion du personnel : annuaire des collaborateurs" width={1100} height={600} /></figure>
                </div>
                <div className="sk-sub" id="m-administration-1" role="tabpanel" aria-labelledby="m-administration-t1" hidden>
                  <div className="sk-text">
                    <p className="sk-desc"><svg className="sk-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l1.9 6.6 6.6 1.9-6.6 1.9L12 19.5l-1.9-6.6L3.5 11l6.6-1.9z" /></svg><span>Simplifiez la gestion des congés avec des circuits de validation automatiques.</span></p>
                    <p className="sk-agent"><span className="live-dot" aria-hidden="true"></span><span><b>L&apos;agent&nbsp;:</b> anticipe les périodes de forte absence.</span></p>
                    <ul className="sk-chips">
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Demandes en un clic</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Validation multi-niveaux</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Calendrier d&apos;équipe</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Soldes temps réel</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Rapports d&apos;absentéisme</li>
                    </ul>
                    <Link className="sk-more" href="/use-cases/conges">En savoir plus <span aria-hidden="true">↗</span></Link>
                  </div>
                  <figure className="sk-shot"><Image src="/img/modules/conges.jpg" alt="Écran Gestion des congés : demandes, calendrier et soldes" width={1100} height={600} /></figure>
                </div>
                <div className="sk-sub" id="m-administration-2" role="tabpanel" aria-labelledby="m-administration-t2" hidden>
                  <div className="sk-text">
                    <p className="sk-desc"><svg className="sk-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l1.9 6.6 6.6 1.9-6.6 1.9L12 19.5l-1.9-6.6L3.5 11l6.6-1.9z" /></svg><span>Générez tous vos documents RH officiels en quelques secondes.</span></p>
                    <p className="sk-agent"><span className="live-dot" aria-hidden="true"></span><span><b>L&apos;agent&nbsp;:</b> génère chaque document à partir des données du collaborateur, sans saisie.</span></p>
                    <ul className="sk-chips">
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Attestations automatiques</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Certificats de travail</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Modèles personnalisables</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Signature électronique</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Archivage sécurisé</li>
                    </ul>
                    <Link className="sk-more" href="/use-cases/documents">En savoir plus <span aria-hidden="true">↗</span></Link>
                  </div>
                  <figure className="sk-shot"><Image src="/img/modules/documents.jpg" alt="Écran Documents RH : attestations et certificats générés" width={1100} height={600} /></figure>
                </div>
                <div className="sk-sub" id="m-administration-3" role="tabpanel" aria-labelledby="m-administration-t3" hidden>
                  <div className="sk-text">
                    <p className="sk-desc"><svg className="sk-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l1.9 6.6 6.6 1.9-6.6 1.9L12 19.5l-1.9-6.6L3.5 11l6.6-1.9z" /></svg><span>Pilotez et saisissez votre budget RH avec une nomenclature NRG structurée et des analyses en temps réel.</span></p>
                    <p className="sk-agent"><span className="live-dot" aria-hidden="true"></span><span><b>L&apos;agent&nbsp;:</b> compare le budget prévisionnel au réalisé issu de la paie.</span></p>
                    <ul className="sk-chips">
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Saisie budgétaire par catégorie</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Pilotage budget vs réalisé</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Nomenclature NRG standard</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Analyse par collaborateur</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Verrouillage et export</li>
                    </ul>
                    <Link className="sk-more" href="/use-cases/budget">En savoir plus <span aria-hidden="true">↗</span></Link>
                  </div>
                  <figure className="sk-shot"><Image src="/img/modules/budget-rh.jpg" alt="Écran Budget RH : masse salariale et suivi budgétaire" width={1100} height={600} /></figure>
                </div>
              </div>
            </div>
            <span className="sk-dock" aria-hidden="true"><b>02</b><i>/ 07</i></span>
          </article>
          <article className="sk-card" id="m-performance" style={{ '--i': '2' } as CSSProperties} data-cut>
            <div className="sk-body">
              <h3 className="sk-title">Performance<span>&amp; OKR</span></h3>
              <div className="sk-tags" role="tablist" aria-label="Sous-modules Performance &amp; OKR"><button className="sk-tag is-on" type="button" role="tab" id="m-performance-t0" aria-controls="m-performance-0" aria-selected="true">Performance &amp; feedback</button> <button className="sk-tag" type="button" role="tab" id="m-performance-t1" aria-controls="m-performance-1" aria-selected="false">OKR &amp; objectifs</button></div>
              <div className="sk-subs">
                <div className="sk-sub" id="m-performance-0" role="tabpanel" aria-labelledby="m-performance-t0">
                  <div className="sk-text">
                    <p className="sk-desc"><svg className="sk-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l1.9 6.6 6.6 1.9-6.6 1.9L12 19.5l-1.9-6.6L3.5 11l6.6-1.9z" /></svg><span>Évaluations structurées et feedback continu pour piloter la performance.</span></p>
                    <p className="sk-agent"><span className="live-dot" aria-hidden="true"></span><span><b>L&apos;agent&nbsp;:</b> analyse les tendances et recommande un développement personnalisé.</span></p>
                    <ul className="sk-chips">
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Évaluations 360°</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Campagnes automatisées</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Entretiens one-on-one</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Calibrage des notes</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Feedback continu</li>
                    </ul>
                    <Link className="sk-more" href="/use-cases/performance">En savoir plus <span aria-hidden="true">↗</span></Link>
                  </div>
                  <figure className="sk-shot"><Image src="/img/modules/performance.jpg" alt="Écran Performance : feedback continu et évaluations" width={1100} height={600} /></figure>
                </div>
                <div className="sk-sub" id="m-performance-1" role="tabpanel" aria-labelledby="m-performance-t1" hidden>
                  <div className="sk-text">
                    <p className="sk-desc"><svg className="sk-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l1.9 6.6 6.6 1.9-6.6 1.9L12 19.5l-1.9-6.6L3.5 11l6.6-1.9z" /></svg><span>Alignez toute l&apos;organisation sur des objectifs clairs et mesurables.</span></p>
                    <p className="sk-agent"><span className="live-dot" aria-hidden="true"></span><span><b>L&apos;agent&nbsp;:</b> repère les objectifs à risque et suggère des actions correctives.</span></p>
                    <ul className="sk-chips">
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>OKR en cascade</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Suivi temps réel des KR</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Daily checklist connectée</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Tableaux de bord visuels</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Alertes sur les écarts</li>
                    </ul>
                    <Link className="sk-more" href="/use-cases/okr">En savoir plus <span aria-hidden="true">↗</span></Link>
                  </div>
                  <figure className="sk-shot"><Image src="/img/modules/okr.jpg" alt="Écran OKR &amp; Objectifs : objectifs en cascade et progression" width={1100} height={600} /></figure>
                </div>
              </div>
            </div>
            <span className="sk-dock" aria-hidden="true"><b>03</b><i>/ 07</i></span>
          </article>
          <article className="sk-card" id="m-talents" style={{ '--i': '3' } as CSSProperties} data-cut>
            <div className="sk-body">
              <h3 className="sk-title">Talents<span>&amp; formation</span></h3>
              <div className="sk-tags" role="tablist" aria-label="Sous-modules Talents &amp; formation"><button className="sk-tag is-on" type="button" role="tab" id="m-talents-t0" aria-controls="m-talents-0" aria-selected="true">Gestion des talents</button> <button className="sk-tag" type="button" role="tab" id="m-talents-t1" aria-controls="m-talents-1" aria-selected="false">Formation</button></div>
              <div className="sk-subs">
                <div className="sk-sub" id="m-talents-0" role="tabpanel" aria-labelledby="m-talents-t0">
                  <div className="sk-text">
                    <p className="sk-desc"><svg className="sk-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l1.9 6.6 6.6 1.9-6.6 1.9L12 19.5l-1.9-6.6L3.5 11l6.6-1.9z" /></svg><span>Cartographiez vos talents et construisez des plans de succession solides.</span></p>
                    <p className="sk-agent"><span className="live-dot" aria-hidden="true"></span><span><b>L&apos;agent&nbsp;:</b> détecte les hauts potentiels et prédit les risques de départ.</span></p>
                    <ul className="sk-chips">
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Matrice 9-Box</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Plans de succession</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Parcours de carrière</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Analyse des compétences</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Mobilité interne</li>
                    </ul>
                    <Link className="sk-more" href="/use-cases/talents">En savoir plus <span aria-hidden="true">↗</span></Link>
                  </div>
                  <figure className="sk-shot"><Image src="/img/modules/talents.jpg" alt="Écran Talents &amp; Carrière : matrice 9-Box et succession" width={1100} height={600} /></figure>
                </div>
                <div className="sk-sub" id="m-talents-1" role="tabpanel" aria-labelledby="m-talents-t1" hidden>
                  <div className="sk-text">
                    <p className="sk-desc"><svg className="sk-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l1.9 6.6 6.6 1.9-6.6 1.9L12 19.5l-1.9-6.6L3.5 11l6.6-1.9z" /></svg><span>Développez les compétences avec des parcours intelligents et adaptatifs.</span></p>
                    <p className="sk-agent"><span className="live-dot" aria-hidden="true"></span><span><b>L&apos;agent&nbsp;:</b> recommande des formations à partir des écarts de compétences.</span></p>
                    <ul className="sk-chips">
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Catalogue personnalisable</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Parcours adaptatifs</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Suivi des certifications</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Budget et ROI formation</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Plans individuels</li>
                    </ul>
                    <Link className="sk-more" href="/use-cases/formation">En savoir plus <span aria-hidden="true">↗</span></Link>
                  </div>
                  <figure className="sk-shot"><Image src="/img/modules/formation.jpg" alt="Écran Formation : catalogue et parcours de formation" width={1100} height={600} /></figure>
                </div>
              </div>
            </div>
            <span className="sk-dock" aria-hidden="true"><b>04</b><i>/ 07</i></span>
          </article>
          <article className="sk-card" id="m-paie" style={{ '--i': '4' } as CSSProperties} data-cut>
            <div className="sk-body">
              <h3 className="sk-title">Paie<span>&amp; rémunération</span></h3>
              <div className="sk-tags" role="tablist" aria-label="Sous-modules Paie &amp; rémunération"><button className="sk-tag is-on" type="button" role="tab" id="m-paie-t0" aria-controls="m-paie-0" aria-selected="true">Module paie</button> <button className="sk-tag" type="button" role="tab" id="m-paie-t1" aria-controls="m-paie-1" aria-selected="false">Compensation &amp; benefits</button></div>
              <div className="sk-subs">
                <div className="sk-sub" id="m-paie-0" role="tabpanel" aria-labelledby="m-paie-t0">
                  <div className="sk-text">
                    <p className="sk-desc"><svg className="sk-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l1.9 6.6 6.6 1.9-6.6 1.9L12 19.5l-1.9-6.6L3.5 11l6.6-1.9z" /></svg><span>Gérez la paie avec des bulletins officiels et des cotisations légales calculées automatiquement.</span></p>
                    <p className="sk-agent"><span className="live-dot" aria-hidden="true"></span><span><b>L&apos;agent&nbsp;:</b> calcule les cotisations légales sénégalaises à chaque run.</span></p>
                    <ul className="sk-chips">
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Runs de paie mensuels</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Bulletins de paie PDF</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>IPRES / CSS / IPM / CFCE</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Impôt sur le revenu</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Simulation avant validation</li>
                    </ul>
                    <Link className="sk-more" href="/use-cases/paie">En savoir plus <span aria-hidden="true">↗</span></Link>
                  </div>
                  <figure className="sk-shot"><Image src="/img/modules/paie.jpg" alt="Écran Paie : configuration et runs de paie" width={1100} height={600} /></figure>
                </div>
                <div className="sk-sub" id="m-paie-1" role="tabpanel" aria-labelledby="m-paie-t1" hidden>
                  <div className="sk-text">
                    <p className="sk-desc"><svg className="sk-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l1.9 6.6 6.6 1.9-6.6 1.9L12 19.5l-1.9-6.6L3.5 11l6.6-1.9z" /></svg><span>Optimisez votre politique de rémunération, pesées et grilles comprises.</span></p>
                    <p className="sk-agent"><span className="live-dot" aria-hidden="true"></span><span><b>L&apos;agent&nbsp;:</b> réconcilie les pesées IPE et la convention collective.</span></p>
                    <ul className="sk-chips">
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Pesées IPE (Mercer)</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Conventions collectives</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Simulateur salarial</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Grilles de mérite</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Workflow d&apos;approbation</li>
                    </ul>
                    <Link className="sk-more" href="/use-cases/compensation">En savoir plus <span aria-hidden="true">↗</span></Link>
                  </div>
                  <figure className="sk-shot"><Image src="/img/modules/compensation.jpg" alt="Écran Compensation &amp; Benefits : pesées et conventions" width={1100} height={600} /></figure>
                </div>
              </div>
            </div>
            <span className="sk-dock" aria-hidden="true"><b>05</b><i>/ 07</i></span>
          </article>
          <article className="sk-card" id="m-pilotage" style={{ '--i': '5' } as CSSProperties} data-cut>
            <div className="sk-body">
              <h3 className="sk-title">Pilotage<span>RH</span></h3>
              <div className="sk-tags" role="tablist" aria-label="Sous-modules Pilotage RH"><button className="sk-tag is-on" type="button" role="tab" id="m-pilotage-t0" aria-controls="m-pilotage-0" aria-selected="true">People analytics</button> <button className="sk-tag" type="button" role="tab" id="m-pilotage-t1" aria-controls="m-pilotage-1" aria-selected="false">Gestion des missions</button></div>
              <div className="sk-subs">
                <div className="sk-sub" id="m-pilotage-0" role="tabpanel" aria-labelledby="m-pilotage-t0">
                  <div className="sk-text">
                    <p className="sk-desc"><svg className="sk-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l1.9 6.6 6.6 1.9-6.6 1.9L12 19.5l-1.9-6.6L3.5 11l6.6-1.9z" /></svg><span>Exploitez vos données RH pour prendre des décisions stratégiques éclairées.</span></p>
                    <p className="sk-agent"><span className="live-dot" aria-hidden="true"></span><span><b>L&apos;agent&nbsp;:</b> prédit le turnover, la rétention et les tendances RH.</span></p>
                    <ul className="sk-chips">
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Tableaux de bord interactifs</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Analyse du turnover</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Indicateurs de performance</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Rapports automatisés</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Prédictions IA</li>
                    </ul>
                    <Link className="sk-more" href="/use-cases/analytics">En savoir plus <span aria-hidden="true">↗</span></Link>
                  </div>
                  <figure className="sk-shot"><Image src="/img/modules/analytics.jpg" alt="Écran People Analytics : effectifs, turnover et performance" width={1100} height={600} /></figure>
                </div>
                <div className="sk-sub" id="m-pilotage-1" role="tabpanel" aria-labelledby="m-pilotage-t1" hidden>
                  <div className="sk-text">
                    <p className="sk-desc"><svg className="sk-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l1.9 6.6 6.6 1.9-6.6 1.9L12 19.5l-1.9-6.6L3.5 11l6.6-1.9z" /></svg><span>Planifiez et suivez les missions et déplacements de vos collaborateurs.</span></p>
                    <p className="sk-agent"><span className="live-dot" aria-hidden="true"></span><span><b>L&apos;agent&nbsp;:</b> optimise les plannings et suit les budgets de mission.</span></p>
                    <ul className="sk-chips">
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Création de missions</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Ordres de mission</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Suivi des frais</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Validation hiérarchique</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Rapports de mission</li>
                    </ul>
                    <Link className="sk-more" href="/use-cases/missions">En savoir plus <span aria-hidden="true">↗</span></Link>
                  </div>
                  <figure className="sk-shot"><Image src="/img/modules/missions.jpg" alt="Écran Gestion des missions : ordres de mission et suivi" width={1100} height={600} /></figure>
                </div>
              </div>
            </div>
            <span className="sk-dock" aria-hidden="true"><b>06</b><i>/ 07</i></span>
          </article>
          <article className="sk-card" id="m-conformite" style={{ '--i': '6' } as CSSProperties} data-cut>
            <div className="sk-body">
              <h3 className="sk-title">Conformité<span>&amp; départs</span></h3>
              <div className="sk-tags" role="tablist" aria-label="Sous-modules Conformité"><button className="sk-tag is-on" type="button" role="tab" id="m-conformite-t0" aria-controls="m-conformite-0" aria-selected="true">Gestion des contentieux</button> <button className="sk-tag" type="button" role="tab" id="m-conformite-t1" aria-controls="m-conformite-1" aria-selected="false">Gestion des départs</button></div>
              <div className="sk-subs">
                <div className="sk-sub" id="m-conformite-0" role="tabpanel" aria-labelledby="m-conformite-t0">
                  <div className="sk-text">
                    <p className="sk-desc"><svg className="sk-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l1.9 6.6 6.6 1.9-6.6 1.9L12 19.5l-1.9-6.6L3.5 11l6.6-1.9z" /></svg><span>Gérez les procédures disciplinaires dans le respect du droit du travail.</span></p>
                    <p className="sk-agent"><span className="live-dot" aria-hidden="true"></span><span><b>L&apos;agent&nbsp;:</b> vérifie la conformité légale de chaque procédure.</span></p>
                    <ul className="sk-chips">
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Procédures réglementaires</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Suivi des dossiers</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Historique disciplinaire</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Gestion du contentieux</li>
                    </ul>
                    <Link className="sk-more" href="/use-cases/contentieux">En savoir plus <span aria-hidden="true">↗</span></Link>
                  </div>
                  <figure className="sk-shot"><Image src="/img/modules/contentieux.jpg" alt="Écran Gestion des contentieux : dossiers et procédures" width={1100} height={600} /></figure>
                </div>
                <div className="sk-sub" id="m-conformite-1" role="tabpanel" aria-labelledby="m-conformite-t1" hidden>
                  <div className="sk-text">
                    <p className="sk-desc"><svg className="sk-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l1.9 6.6 6.6 1.9-6.6 1.9L12 19.5l-1.9-6.6L3.5 11l6.6-1.9z" /></svg><span>Pilotez l&apos;offboarding et les soldes de tout compte en toute sérénité.</span></p>
                    <p className="sk-agent"><span className="live-dot" aria-hidden="true"></span><span><b>L&apos;agent&nbsp;:</b> identifie les tendances de départ pour anticiper le turnover.</span></p>
                    <ul className="sk-chips">
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Entretiens de départ</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Solde de tout compte</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Checklist de départ</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Archivage du dossier</li>
                      <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Analyse des motifs</li>
                    </ul>
                    <Link className="sk-more" href="/use-cases/departs">En savoir plus <span aria-hidden="true">↗</span></Link>
                  </div>
                  <figure className="sk-shot"><Image src="/img/modules/departs.jpg" alt="Écran Gestion des départs : nouveau départ et checklist" width={1100} height={600} /></figure>
                </div>
              </div>
            </div>
            <span className="sk-dock" aria-hidden="true"><b>07</b><i>/ 07</i></span>
          </article>
        </div>
      </section>
      <SolutionsStack />

      <Cta
        image="/img/cta-team.jpg"
        title={<>Prêt à voir l&apos;agent<br />à l&apos;œuvre dans vos modules&nbsp;?</>}
        text="Essai gratuit de 15 jours, sans carte bancaire. Tous les modules, et l'agent au travail dès vos données importées."
        secondLabel="Contacter l'équipe"
        secondHref="/contact"
      />
    </>
  );
}
