import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cta from '@/components/site/Cta';
import BlogRail from '@/components/site/home/BlogRail';
import HomeEffects from '@/components/site/home/HomeEffects';
import ModuleDialog from '@/components/site/home/ModuleDialog';
import { fetchPosts } from '@/lib/site/blog';
import { AppleLogo, PlayLogo } from '@/components/site/icons';
import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/site/links';

export const metadata: Metadata = {
  title: "Targetym AI — Meilleur Logiciel RH (SIRH) en Afrique augmenté par l'IA",
  description: "Targetym AI, le SIRH n°1 en Afrique augmenté par l'IA : utilisé au Sénégal, en Côte d'Ivoire, au Bénin, au Cameroun et au Mali. Recrutement, paie, performance et talents avec 30+ agents IA RH.",
  keywords: [
    'logiciel RH Afrique',
    'meilleur logiciel RH Afrique',
    'SIRH Afrique',
    'meilleur SIRH en Afrique',
    'SIRH Sénégal',
    "SIRH Côte d'Ivoire",
    'SIRH Bénin',
    'SIRH Cameroun',
    'SIRH Mali',
    'logiciel de gestion RH Afrique',
    'plateforme RH Afrique',
    'ERP RH Afrique',
    'SIRH IA',
    'Targetym AI',
  ],
  alternates: { canonical: '/' },
};

/* Les articles du rail sont repris de l'API toutes les dix minutes : l'accueil reste statique */
export const revalidate = 600;

/* Logos détourés dans public/images/recommandations. Les tailles égalisent leur surface
   (≈ 5 600 px²) : un logo empilé comme Mavel monte plus haut qu'un logo en longueur. */
const RECOMMENDERS = [
  { name: 'Mavel', src: '/images/recommandations/mavel.png', width: 87, height: 64 },
  { name: 'NSIA Holding Assurances', src: '/images/recommandations/nsia-holding-assurances.png', width: 115, height: 48 },
  { name: 'NSIA Assurances', src: '/images/recommandations/nsia-assurances.png', width: 117, height: 48 },
  { name: 'H&C Executive Education', src: '/images/recommandations/hc-executive.png', width: 161, height: 35 },
  { name: 'Managersity', src: '/images/recommandations/managersity.png', width: 154, height: 36 },
];

export default async function HomePage() {
  const { items } = await fetchPosts({ limit: 3, revalidate });

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>Le SIRH dont le super-agent IA <br />prépare et réalise <em>95&nbsp;%</em> <br />du travail des DRH et des HRBP</h1>
          <p className="hero-sub">15 modules sur une seule plateforme&nbsp;: recrutement, dossiers du personnel, congés, documents RH, paie multi-pays, performance, talents, pilotage. Du premier entretien au solde de tout compte, avec vos règles et votre convention collective.</p>
          <div className="hero-actions"><Link className="btn btn-mint" href="/essai-gratuit">Démarrer l&apos;essai gratuit</Link> <a className="btn btn-plain" href="#interface">Voir l&apos;agent à l&apos;œuvre</a></div>
          <p className="hero-note">15 jours, sans carte bancaire</p>
          {/* Preuve sociale : quatre clients, chacun avec son mot au survol de son
             portrait (au clavier : focus ; au doigt : un tap). Témoignages
             placeholder, à remplacer par de vrais clients avant mise en ligne. */}
          <div className="hero-proof">
            <ul className="stack">
              <li><button className="face" type="button" aria-describedby="say-1"><Image src="/img/av-1.jpg" alt="Fatou Ndiaye" width={34} height={34} /></button> <span className="say" id="say-1" role="tooltip"><q>Les attestations partent en 30&nbsp;secondes, plus en 48&nbsp;heures.</q><b>Fatou Ndiaye</b><i>DRH · Dakar</i></span></li>
              <li><button className="face" type="button" aria-describedby="say-2"><Image src="/img/av-2.jpg" alt="Serge Mbarga" width={34} height={34} /></button> <span className="say" id="say-2" role="tooltip"><q>Les congés se valident sans moi&nbsp;: je ne relance plus personne.</q><b>Serge Mbarga</b><i>DRH · Douala</i></span></li>
              <li><button className="face" type="button" aria-describedby="say-3"><Image src="/img/av-3.jpg" alt="Mariam Coulibaly" width={34} height={34} /></button> <span className="say" id="say-3" role="tooltip"><q>L&apos;agent avait trié 200&nbsp;CV avant mon premier café.</q><b>Mariam Coulibaly</b><i>Responsable RH · Abidjan</i></span></li>
              <li><button className="face" type="button" aria-describedby="say-4"><Image src="/img/av-4.jpg" alt="Awa Sow" width={34} height={34} /></button> <span className="say" id="say-4" role="tooltip"><q>La paie de mars est sortie en une matinée, cotisations comprises.</q><b>Awa Sow</b><i>Responsable paie · Dakar</i></span></li>
            </ul>
            <p>Déjà adopté par des équipes RH au Sénégal, en Côte d&apos;Ivoire et au Cameroun</p>
          </div>
        </div>
        <div className="hero-media">
          <div className="hm-photo"><Image className="hero-photo" src="/img/hero-team.jpg" alt="Une équipe réunie autour d'une table de travail, en pleine discussion" width={1000} height={1200} sizes="(max-width: 860px) 100vw, 50vw" priority /></div>
          {/* Encoches en « marche » : la nav loge en haut à gauche, la carte graphique en haut à droite, la carte verte en bas à droite */}
          <span className="hm-notch hm-tl" aria-hidden="true"><i className="ear ear-a"></i><i className="ear ear-b"></i></span>
          {' '}
          <span className="hm-notch hm-tr" aria-hidden="true"><i className="ear ear-a"></i><i className="ear ear-b"></i></span>
          {' '}
          <span className="hm-notch hm-br" aria-hidden="true"><i className="ear ear-a"></i><i className="ear ear-b"></i></span>
          {/* Carte graphique, dans l'encoche haut-droite */}
          <figure className="float-chart">
            <figcaption><b>Effectif &amp; absences</b> <span className="fc-tag">2026</span></figcaption>
            <div className="fc-bars" role="img" aria-label="Dossiers traités, de janvier à juin 2026 : progression continue"><span style={{ '--h': '44%' } as CSSProperties}></span><span style={{ '--h': '66%' } as CSSProperties}></span><span style={{ '--h': '52%' } as CSSProperties}></span> <span style={{ '--h': '80%' } as CSSProperties}></span><span style={{ '--h': '61%' } as CSSProperties}></span><span className="is-hi" style={{ '--h': '96%' } as CSSProperties}></span></div>
            <div className="fc-axis" aria-hidden="true"><i>Jan</i><i>Fév</i><i>Mar</i><i>Avr</i><i>Mai</i><i>Jui</i></div>
          </figure>
          {/* Carte résultat, dans l'encoche */}
          <div className="float-stat">
            <b><span className="count" data-to="95" data-suffix=" %">95 %</span></b>
            <p className="fs-title">Du travail RH pris en charge</p>
            <p className="fs-note">Préparé et réalisé par le super-agent, validé par vos équipes.</p>
          </div>
        </div>
      </section>

      <section className="logos sec-anim" aria-labelledby="logos-label">
        <p className="logos-label" id="logos-label">Ils nous recommandent</p>
        <ul>
          {RECOMMENDERS.map((r) => (
            <li key={r.name}><Image src={r.src} alt={r.name} width={r.width} height={r.height} /></li>
          ))}
        </ul>
      </section>

      <section className="section values" id="agents" data-cut>
        <div className="values-pin sec-anim">
          <h2 className="head-duo">Trois choses que votre équipe RH<span>arrête de faire</span></h2>
          {/* Accordéon piloté par le scroll : la rangée reste épinglée le temps de
             trois créneaux de défilement, un par carte, et s'ouvre toute seule au
             passage. Aucun clic n'est nécessaire ; celui d'une carte fermée fait
             défiler jusqu'à son créneau. Sans JS, la première reste ouverte. */}
          <div className="value-row">
            <article className="v-item is-open" style={{ '--shot': "url('/img/values-1.jpg')" } as CSSProperties}>
              <button className="v-hit" type="button" aria-expanded="true" aria-controls="vd-1" aria-labelledby="vt-1"></button>
              <div className="v-media"><Image src="/img/values-1.jpg" alt="Une chargée de clientèle souriante à son poste, ordinateur portable ouvert dans un open space" width={700} height={880} /> <span className="dock dock-bl" aria-hidden="true"><span className="v-live"><i></i>Avenant préparé · il y a 2 min</span></span></div>
              <div className="v-panel">
                <div className="v-hi">
                  <span className="v-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3.84453 7.92226C2.71849 6.79623 2.71849 4.97056 3.84453 3.84453C4.97056 2.71849 6.79623 2.71849 7.92226 3.84453L20.1555 16.0777C21.2815 17.2038 21.2815 19.0294 20.1555 20.1555C19.0294 21.2815 17.2038 21.2815 16.0777 20.1555L3.84453 7.92226Z" /><path strokeLinecap="round" d="M6 10L10 6" /><path d="M16.1 2.30719C16.261 1.8976 16.8385 1.8976 16.9994 2.30719L17.4298 3.40247C17.479 3.52752 17.5776 3.62651 17.7022 3.67583L18.7934 4.1078C19.2015 4.26934 19.2015 4.849 18.7934 5.01054L17.7022 5.44252C17.5776 5.49184 17.479 5.59082 17.4298 5.71587L16.9995 6.81115C16.8385 7.22074 16.261 7.22074 16.1 6.81116L15.6697 5.71587C15.6205 5.59082 15.5219 5.49184 15.3973 5.44252L14.3061 5.01054C13.898 4.849 13.898 4.26934 14.3061 4.1078L15.3973 3.67583C15.5219 3.62651 15.6205 3.52752 15.6697 3.40247L16.1 2.30719Z" /><path d="M19.9672 9.12945C20.1281 8.71987 20.7057 8.71987 20.8666 9.12945L21.0235 9.5288C21.0727 9.65385 21.1713 9.75284 21.2959 9.80215L21.6937 9.95965C22.1018 10.1212 22.1018 10.7009 21.6937 10.8624L21.2959 11.0199C21.1713 11.0692 21.0727 11.1682 21.0235 11.2932L20.8666 11.6926C20.7057 12.1022 20.1281 12.1022 19.9672 11.6926L19.8103 11.2932C19.7611 11.1682 19.6625 11.0692 19.5379 11.0199L19.14 10.8624C18.732 10.7009 18.732 10.1212 19.14 9.95965L19.5379 9.80215C19.6625 9.75284 19.7611 9.65385 19.8103 9.5288L19.9672 9.12945Z" /><path d="M5.1332 15.3072C5.29414 14.8976 5.87167 14.8976 6.03261 15.3072L6.18953 15.7065C6.23867 15.8316 6.33729 15.9306 6.46188 15.9799L6.85975 16.1374C7.26783 16.2989 7.26783 16.8786 6.85975 17.0401L6.46188 17.1976C6.33729 17.2469 6.23867 17.3459 6.18953 17.471L6.03261 17.8703C5.87167 18.2799 5.29414 18.2799 5.1332 17.8703L4.97628 17.471C4.92714 17.3459 4.82852 17.2469 4.70393 17.1976L4.30606 17.0401C3.89798 16.8786 3.89798 16.2989 4.30606 16.1374L4.70393 15.9799C4.82852 15.9306 4.92714 15.8316 4.97628 15.7065L5.1332 15.3072Z" /></svg></span>
                  <div className="v-stats">
                    <p><b>+64 %</b><i>de tâches RH automatisées</i></p>
                    <p><b>−12 j</b><i>sur le délai des documents</i></p>
                  </div>
                </div>
                <span className="v-thumb" aria-hidden="true"><span className="dock dock-br"><i className="v-go">→</i></span></span>
                <div className="v-text">
                  <h3 id="vt-1">Le dossier collaborateur qui se tient à jour tout seul</h3>
                  <p>Contrats, échéances, congés, attestations : l&apos;agent lit vos données, prépare les documents et relance les validations avant les dates butoirs.</p>
                  <div className="v-detail" id="vd-1">
                    <div>
                      <ul className="v-list">
                        <li>Avenants et renouvellements préparés 30 jours avant l&apos;échéance</li>
                        <li>Soldes de congés recalculés à chaque validation</li>
                        <li>Pièces manquantes réclamées au collaborateur, pas à la DRH</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article className="v-item" style={{ '--shot': "url('/img/values-2.jpg')" } as CSSProperties}>
              <button className="v-hit" type="button" aria-expanded="false" aria-controls="vd-2" aria-labelledby="vt-2"></button>
              <div className="v-media"><Image src="/img/values-2.jpg" alt="Une responsable RH concentrée, ordinateur sur les genoux, qui lit un dossier" width={700} height={880} /> <span className="dock dock-bl" aria-hidden="true"><span className="v-live"><i></i>Manager alerté · à l&apos;instant</span></span></div>
              <div className="v-panel">
                <div className="v-hi">
                  <span className="v-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z" /><path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" /></svg></span>
                  <div className="v-stats">
                    <p><b>−31 %</b><i>de départs non anticipés</i></p>
                    <p><b>0</b><i>tableur à tenir côté manager</i></p>
                  </div>
                </div>
                <span className="v-thumb" aria-hidden="true"><span className="dock dock-br"><i className="v-go">→</i></span></span>
                <div className="v-text">
                  <h3 id="vt-2">Les départs, vus six semaines à l&apos;avance</h3>
                  <p>L&apos;agent croise ce que vous saisissez déjà, absences, entretiens, ancienneté dans le poste, et signale au manager les équipes qui décrochent, avant la lettre de démission.</p>
                  <div className="v-detail" id="vd-2">
                    <div>
                      <ul className="v-list">
                        <li>Un risque de départ suivi par équipe, recalculé chaque semaine</li>
                        <li>Le manager alerté en privé, avec le motif probable</li>
                        <li>Entretien de maintien proposé et calé automatiquement</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article className="v-item" style={{ '--shot': "url('/img/values-3.jpg')" } as CSSProperties}>
              <button className="v-hit" type="button" aria-expanded="false" aria-controls="vd-3" aria-labelledby="vt-3"></button>
              <div className="v-media"><Image src="/img/values-3.jpg" alt="Une responsable RH debout, tablette à la main" width={700} height={880} /> <span className="dock dock-bl" aria-hidden="true"><span className="v-live"><i></i>Attestation signée · 30 s</span></span></div>
              <div className="v-panel">
                <div className="v-hi">
                  <span className="v-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z" /><path strokeLinecap="round" d="M8 12H16" /><path strokeLinecap="round" d="M8 8H16" /><path strokeLinecap="round" d="M8 16H13" /></svg></span>
                  <div className="v-stats">
                    <p><b>30 s</b><i>pour un document signé</i></p>
                    <p><b>×5</b><i>de demandes absorbées</i></p>
                  </div>
                </div>
                <span className="v-thumb" aria-hidden="true"><span className="dock dock-br"><i className="v-go">→</i></span></span>
                <div className="v-text">
                  <h3 id="vt-3">L&apos;attestation signée en 30 secondes</h3>
                  <p>Attestation, certificat, ordre de mission&nbsp;: le collaborateur demande depuis son téléphone, l&apos;agent génère, fait signer et archive. Zéro relance à la DRH.</p>
                  <div className="v-detail" id="vd-3">
                    <div>
                      <ul className="v-list">
                        <li>Modèles à votre en-tête, remplis avec les données du dossier</li>
                        <li>Signature électronique et archivage dans la foulée</li>
                        <li>Historique consultable par le collaborateur, sans relance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="tour" id="interface">
        <div className="tour-pin sec-anim">
          <div className="tour-grid">
            <div className="tour-copy">
              <p className="eyebrow left">L&apos;interface</p>
              <h2 className="head-duo left">Un seul écran <br />pour décider<span>l&apos;agent fait le travail en dessous</span></h2>
              <div className="tour-list">
                <span className="tour-rail" aria-hidden="true"><i></i></span>
                <ol className="tour-steps">
                  <li className="tour-step is-on" data-stat="342" data-stat-label="collaborateurs suivis, à la minute">
                    <button type="button" className="ts-hit" aria-current="true"><span className="ts-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M13.5 15.5C13.5 13.6144 13.5 12.6716 14.0858 12.0858C14.6716 11.5 15.6144 11.5 17.5 11.5C19.3856 11.5 20.3284 11.5 20.9142 12.0858C21.5 12.6716 21.5 13.6144 21.5 15.5V17.5C21.5 19.3856 21.5 20.3284 20.9142 20.9142C20.3284 21.5 19.3856 21.5 17.5 21.5C15.6144 21.5 14.6716 21.5 14.0858 20.9142C13.5 20.3284 13.5 19.3856 13.5 17.5V15.5Z" /><path d="M2 8.5C2 10.3856 2 11.3284 2.58579 11.9142C3.17157 12.5 4.11438 12.5 6 12.5C7.88562 12.5 8.82843 12.5 9.41421 11.9142C10 11.3284 10 10.3856 10 8.5V6.5C10 4.61438 10 3.67157 9.41421 3.08579C8.82843 2.5 7.88562 2.5 6 2.5C4.11438 2.5 3.17157 2.5 2.58579 3.08579C2 3.67157 2 4.61438 2 6.5V8.5Z" /><path d="M13.5 5.5C13.5 4.56812 13.5 4.10218 13.6522 3.73463C13.8552 3.24458 14.2446 2.85523 14.7346 2.65224C15.1022 2.5 15.5681 2.5 16.5 2.5H18.5C19.4319 2.5 19.8978 2.5 20.2654 2.65224C20.7554 2.85523 21.1448 3.24458 21.3478 3.73463C21.5 4.10218 21.5 4.56812 21.5 5.5C21.5 6.43188 21.5 6.89782 21.3478 7.26537C21.1448 7.75542 20.7554 8.14477 20.2654 8.34776C19.8978 8.5 19.4319 8.5 18.5 8.5H16.5C15.5681 8.5 15.1022 8.5 14.7346 8.34776C14.2446 8.14477 13.8552 7.75542 13.6522 7.26537C13.5 6.89782 13.5 6.43188 13.5 5.5Z" /><path d="M2 18.5C2 19.4319 2 19.8978 2.15224 20.2654C2.35523 20.7554 2.74458 21.1448 3.23463 21.3478C3.60218 21.5 4.06812 21.5 5 21.5H7C7.93188 21.5 8.39782 21.5 8.76537 21.3478C9.25542 21.1448 9.64477 20.7554 9.84776 20.2654C10 19.8978 10 19.4319 10 18.5C10 17.5681 10 17.1022 9.84776 16.7346C9.64477 16.2446 9.25542 15.8552 8.76537 15.6522C8.39782 15.5 7.93188 15.5 7 15.5H5C4.06812 15.5 3.60218 15.5 3.23463 15.6522C2.74458 15.8552 2.35523 16.2446 2.15224 16.7346C2 17.1022 2 17.5681 2 18.5Z" /></svg></span> <span className="ts-title">Tableau de bord RH</span></button>
                    <div className="ts-body">
                      <div>
                        <p>Effectif, absences, échéances et ce que l&apos;agent a fait ce matin&nbsp;: l&apos;essentiel sur un écran, par pays et par équipe, à jour à la minute.</p>
                      </div>
                    </div>
                  </li>
                  <li className="tour-step" data-stat="96 %" data-stat-label="de dossiers complets, relances comprises">
                    <button type="button" className="ts-hit"><span className="ts-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="9" cy="9" r="2" /><path d="M13 15C13 16.1046 13 17 9 17C5 17 5 16.1046 5 15C5 13.8954 6.79086 13 9 13C11.2091 13 13 13.8954 13 15Z" /><path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" /><path strokeLinecap="round" d="M19 12H15" /><path strokeLinecap="round" d="M19 9H14" /><path strokeLinecap="round" d="M19 15H16" /></svg></span> <span className="ts-title">Dossier collaborateur</span></button>
                    <div className="ts-body">
                      <div>
                        <p>Contrat, documents, congés, historique&nbsp;: l&apos;agent garde chaque dossier complet et réclame lui-même la pièce qui manque, avant qu&apos;elle ne bloque une paie.</p>
                      </div>
                    </div>
                  </li>
                  <li className="tour-step" data-stat="< 1 min" data-stat-label="de la demande à la signature">
                    <button type="button" className="ts-hit"><span className="ts-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M16 4C18.175 4.01211 19.3529 4.10856 20.1213 4.87694C21 5.75562 21 7.16983 21 9.99826V15.9983C21 18.8267 21 20.2409 20.1213 21.1196C19.2426 21.9983 17.8284 21.9983 15 21.9983H9C6.17157 21.9983 4.75736 21.9983 3.87868 21.1196C3 20.2409 3 18.8267 3 15.9983V9.99826C3 7.16983 3 5.75562 3.87868 4.87694C4.64706 4.10856 5.82497 4.01211 8 4" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 13.4L10.7143 15L15 11" /><path d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z" /></svg></span> <span className="ts-title">Demandes en libre-service</span></button>
                    <div className="ts-body">
                      <div>
                        <p>Attestations, ordres de mission, congés : demandés depuis le mobile, traités par l&apos;agent en moins d&apos;une minute, signés dans la foulée.</p>
                      </div>
                    </div>
                  </li>
                  <li className="tour-step" data-stat="3" data-stat-label="devises : XOF, XAF et MAD">
                    <button type="button" className="ts-hit"><span className="ts-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167C21 10.8996 21 11.4234 21 11.9914C21 17.6294 16.761 20.3655 14.1014 21.5273C13.38 21.8424 13.0193 22 12 22C10.9807 22 10.62 21.8424 9.89856 21.5273C7.23896 20.3655 3 17.6294 3 11.9914C3 11.4234 3 10.8996 3 10.4167Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12.4L10.9286 14L14.5 10" /></svg></span> <span className="ts-title">Paie &amp; conformité</span></button>
                    <div className="ts-body">
                      <div>
                        <p>XOF, XAF, MAD&nbsp;: les règles de chaque pays sont intégrées, CNPS, IPRES et ITS compris. Données chiffrées, accès par rôle, et votre logiciel de paie reste en place.</p>
                      </div>
                    </div>
                  </li>
                  {/* Cinquième étape : l'app des collaborateurs. À droite, le cadre se
                     métamorphose en téléphone (data-view). Le lien « App mobile » de la
                     nav vise cette étape. Plateformes : à confirmer avant mise en ligne. */}
                  <li className="tour-step" id="mobile" data-view="phone">
                    <button type="button" className="ts-hit"><span className="ts-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 10C4 6.22876 4 4.34315 5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C20 4.34315 20 6.22876 20 10V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V10Z" /><path strokeLinecap="round" d="M15 19H9" /></svg></span> <span className="ts-title">L&apos;app mobile</span></button>
                    <div className="ts-body">
                      <div>
                        <p>Vos collaborateurs ont l&apos;app dans la poche. Ils demandent, l&apos;agent traite, le manager valide d&apos;un geste&nbsp;: personne n&apos;écrit à la DRH.</p>
                        <ul className="ts-points">
                          <li>Demandes en libre-service, signées en moins d&apos;une minute</li>
                          <li>Congés validés d&apos;un geste par le manager, solde recalculé</li>
                          <li>Bulletins, contrats, attestations : à tout moment, sans relance</li>
                        </ul>
                        <div className="ts-stores"><a className="store" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer"><AppleLogo /><span className="store-txt"><i>Télécharger dans</i><b>l&apos;App&nbsp;Store</b></span></a> <a className="store" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer"><PlayLogo /><span className="store-txt"><i>Disponible sur</i><b>Google&nbsp;Play</b></span></a></div>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
            <div className="tour-stage" aria-hidden="true" data-cut>
              <div className="device-wrap">
                <div className="device">
                  <div className="device-bar"><i></i><i></i><i></i><span>app.targetym.ai</span></div>
                  <div className="shots">
                    {/* Quatre captures de l'application (img/tour/*.jpg, 1280×860, compte de
                       démonstration) : le cadre les cale en haut à gauche et rogne un peu le
                       bord droit ; l'encoche masque leur coin bas-droit. */}
                    <div className="shot is-on"><Image className="shot-img" src="/img/tour/dashboard.jpg" alt="" width={1280} height={860} /></div>
                    <div className="shot"><Image className="shot-img" src="/img/tour/dossier.jpg" alt="" width={1280} height={860} /></div>
                    <div className="shot"><Image className="shot-img" src="/img/tour/demandes.jpg" alt="" width={1280} height={860} /></div>
                    <div className="shot"><Image className="shot-img" src="/img/tour/paie.jpg" alt="" width={1280} height={860} /></div>
                    {/* Cinquième écran : celui du téléphone. C'est le cadre qui devient
                       téléphone (voir .is-phone) ; l'écran n'a qu'à fondre. Capture de
                       l'application sur iPhone, barre d'état comprise. */}
                    <div className="shot shot-phone">
                      <div className="phone-screen"><Image className="ph-img" src="/img/tour/mobile.jpg" alt="" width={591} height={1280} /></div>
                    </div>
                  </div>
                </div>
                {/* La carte verte en encoche, comme sur la photo du hero : son chiffre suit
                   l'étape. L'encoche est découpée dans le device par un masque (voir .device). */}
                <div className="device-stat"><b>342</b><i>collaborateurs suivis, à la minute</i></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="figures sec-anim" aria-label="Targetym AI en chiffres">
        <div className="fig-band" data-cut>
          <span className="dock dock-tl fig-dock" aria-hidden="true"><span className="fig-tag">En chiffres</span></span>
          <ul className="fig-row">
            <li><b className="count" data-to="30" data-suffix=" s">30 s</b> <i>pour une attestation signée</i></li>
            <li><b className="count" data-to="7">7</b> <i>modules, un agent IA dans chacun</i></li>
            <li><b className="fig-word">CSV · API</b> <i>votre logiciel de paie reste en place</i></li>
            <li><b>24 h/24</b> <i>de supervision de l&apos;hébergement</i></li>
          </ul>
        </div>
      </section>

      <section className="section modules sec-anim" id="modules">
        <p className="eyebrow">Les modules</p>
        <h2 className="head-duo">Sept modules, un agent IA dans chacun<span>de l&apos;embauche au départ</span></h2>
        {/* Chaque carte s'ouvre en modale (le bouton du titre couvre toute la carte).
           Le texte occupe le haut ; la capture du module est posée en bas et déborde
           d'un côté (shot-r / shot-l) : la carte la recadre. */}
        <div className="mod-grid">
          <article className="mod shot-r" data-module="personnel">
            <span className="mod-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path strokeLinecap="round" d="M18 10L13 10" /><path d="M10 3H16.5C16.9644 3 17.1966 3 17.3916 3.02567C18.7378 3.2029 19.7971 4.26222 19.9743 5.60842C20 5.80337 20 6.03558 20 6.5" /><path d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z" /></svg></span>
            {' '}
            <span className="mod-arrow" aria-hidden="true">↗</span>
            <h3><button className="mod-open" type="button">Administration du personnel</button></h3>
            <p>Contrats, périodes d&apos;essai, échéances&nbsp;: suivis et relancés par l&apos;agent, sans que vous y pensiez.</p>
            <figure className="mod-shot" aria-hidden="true"><Image src="/img/modules/personnel.jpg" alt="" width={1100} height={600} /></figure>
          </article>
          <article className="mod mod-hi" data-module="recrutement">
            <span className="mod-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="6" r="4" /><path d="M15 13.3271C14.0736 13.1162 13.0609 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C17.6874 22 19.3315 20.9817 19.8068 19.5" /><circle cx="18" cy="16" r="4" /><path strokeLinecap="round" strokeLinejoin="round" d="M18 14.6667V17.3333" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.6665 16L19.3332 16" /></svg></span>
            {' '}
            <span className="mod-arrow" aria-hidden="true">↗</span>
            <h3><button className="mod-open" type="button">Recrutement &amp; onboarding</button></h3>
            <p>L&apos;agent trie les candidatures, évalue les profils et prépare l&apos;arrivée&nbsp;: contrat, matériel, parcours des premiers jours. Vos managers n&apos;ouvrent plus un tableur.</p>
            <figure className="mod-shot" aria-hidden="true"><Image src="/img/modules/recrutement.jpg" alt="" width={1100} height={600} /></figure>
          </article>
          <article className="mod shot-l" data-module="performance">
            <span className="mod-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 14L9.29289 11.7071C9.68342 11.3166 10.3166 11.3166 10.7071 11.7071L12.2929 13.2929C12.6834 13.6834 13.3166 13.6834 13.7071 13.2929L17 10M14.5 10H17V12.5" /></svg></span>
            {' '}
            <span className="mod-arrow" aria-hidden="true">↗</span>
            <h3><button className="mod-open" type="button">Performance &amp; OKR</button></h3>
            <p>Objectifs en cascade, évaluations 360°, entretiens préparés par l&apos;agent&nbsp;: le manager arrive avec les faits.</p>
            <figure className="mod-shot" aria-hidden="true"><Image src="/img/modules/performance.jpg" alt="" width={1100} height={600} /></figure>
          </article>
          <article className="mod shot-r" data-module="talents">
            <span className="mod-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M17 8V6C17 4.11438 17 3.17157 16.4142 2.58579C15.8284 2 14.8856 2 13 2H11C9.11438 2 8.17157 2 7.58579 2.58579C7 3.17157 7 4.11438 7 6V8" /><path d="M10.5636 5.78311C11.4588 5.29495 12.5407 5.29495 13.436 5.78311L18.2302 8.39728C19.1942 8.92292 19.794 9.93319 19.794 11.0312V15.9688C19.794 17.0668 19.1942 18.0771 18.2302 18.6027L13.436 21.2169C12.5407 21.705 11.4588 21.705 10.5636 21.2169L5.76937 18.6027C4.80539 18.0771 4.20557 17.0668 4.20557 15.9688V11.0312C4.20557 9.93318 4.80539 8.92292 5.76937 8.39728L10.5636 5.78311Z" /><path d="M11.1459 11.5228C11.5259 10.8411 11.7159 10.5002 12 10.5002C12.2841 10.5002 12.4741 10.8411 12.8541 11.5228L12.9524 11.6991C13.0603 11.8928 13.1143 11.9897 13.1985 12.0536C13.2827 12.1175 13.3875 12.1412 13.5972 12.1887L13.7881 12.2319C14.526 12.3988 14.895 12.4823 14.9828 12.7646C15.0706 13.0468 14.819 13.341 14.316 13.9292L14.1858 14.0814C14.0429 14.2486 13.9714 14.3322 13.9392 14.4356C13.9071 14.539 13.9179 14.6505 13.9395 14.8735L13.9592 15.0766C14.0352 15.8614 14.0733 16.2539 13.8435 16.4283C13.6136 16.6028 13.2682 16.4437 12.5773 16.1256L12.3986 16.0433C12.2022 15.9529 12.1041 15.9077 12 15.9077C11.8959 15.9077 11.7978 15.9529 11.6014 16.0433L11.4227 16.1256C10.7318 16.4437 10.3864 16.6028 10.1565 16.4283C9.92674 16.2539 9.96476 15.8614 10.0408 15.0766L10.0605 14.8735C10.0821 14.6505 10.0929 14.539 10.0608 14.4356C10.0286 14.3322 9.95713 14.2486 9.81418 14.0814L9.68403 13.9292C9.18097 13.341 8.92945 13.0468 9.01723 12.7646C9.10501 12.4823 9.47396 12.3988 10.2119 12.2319L10.4028 12.1887C10.6125 12.1412 10.7173 12.1175 10.8015 12.0536C10.8857 11.9897 10.9397 11.8928 11.0476 11.6991L11.1459 11.5228Z" /></svg></span>
            {' '}
            <span className="mod-arrow" aria-hidden="true">↗</span>
            <h3><button className="mod-open" type="button">Talents &amp; carrière</button></h3>
            <p>Matrice 9-Box à jour, successions prêtes avant qu&apos;un poste ne se libère.</p>
            <figure className="mod-shot" aria-hidden="true"><Image src="/img/modules/talents.jpg" alt="" width={1100} height={600} /></figure>
          </article>
          <article className="mod shot-l" data-module="formation">
            <span className="mod-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9.78272 3.49965C11.2037 2.83345 12.7962 2.83345 14.2172 3.49965L20.9084 6.63664C22.3639 7.31899 22.3639 9.68105 20.9084 10.3634L14.2173 13.5004C12.7963 14.1665 11.2038 14.1665 9.78281 13.5004L3.0916 10.3634C1.63613 9.68101 1.63614 7.31895 3.0916 6.63659L9.78272 3.49965Z" /><path strokeLinecap="round" d="M2 8.5V14" /><path strokeLinecap="round" d="M19 11.5V16.6254C19 17.6334 18.4965 18.5772 17.6147 19.0656C16.1463 19.8787 13.796 21 12 21C10.204 21 7.8537 19.8787 6.38533 19.0656C5.5035 18.5772 5 17.6334 5 16.6254V11.5" /></svg></span>
            {' '}
            <span className="mod-arrow" aria-hidden="true">↗</span>
            <h3><button className="mod-open" type="button">Formation &amp; compétences</button></h3>
            <p>Écarts de compétences repérés, parcours proposé à chacun avant la prise de poste.</p>
            <figure className="mod-shot" aria-hidden="true"><Image src="/img/modules/formation.jpg" alt="" width={1100} height={600} /></figure>
          </article>
          <article className="mod shot-r" data-module="paie">
            <span className="mod-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z" /><path strokeLinecap="round" d="M7 4V2.5" /><path strokeLinecap="round" d="M17 4V2.5" /><path strokeLinecap="round" d="M2.5 9H21.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M17 13H17.0001" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 13H12.0001" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 13H7.0001" /><path strokeLinecap="round" strokeLinejoin="round" d="M17 17.0234H17.0001" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 17.0234H12.0001" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 17.0234H7.0001" /></svg></span>
            {' '}
            <span className="mod-arrow" aria-hidden="true">↗</span>
            <h3><button className="mod-open" type="button">Paie &amp; congés</button></h3>
            <p>Congés validés à plusieurs niveaux d&apos;un geste, variables de paie prêtes à la clôture.</p>
            <figure className="mod-shot" aria-hidden="true"><Image src="/img/modules/conges.jpg" alt="" width={1100} height={600} /></figure>
          </article>
          <article className="mod shot-l" data-module="pilotage">
            <span className="mod-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" /><path strokeLinecap="round" d="M7 18V9" /><path strokeLinecap="round" d="M12 18V6" /><path strokeLinecap="round" d="M17 18V13" /></svg></span>
            {' '}
            <span className="mod-arrow" aria-hidden="true">↗</span>
            <h3><button className="mod-open" type="button">Pilotage &amp; analytics</button></h3>
            <p>Tableaux de bord en temps réel, turnover prédit par équipe et par pays.</p>
            <figure className="mod-shot" aria-hidden="true"><Image src="/img/modules/analytics.jpg" alt="" width={1100} height={600} /></figure>
          </article>
        </div>
      </section>

      <section className="section quote sec-anim" aria-label="Témoignage">
        <div className="quote-grid">
          <figure className="quote-media" data-cut>
            <Image src="/img/quote-drh.jpg" alt="" width={900} height={780} />
            <figcaption className="dock dock-bl quote-dock"><span className="quote-who"><b>Ibrahima Sarr</b><i>DRH, Sahel Logistics · 380 collaborateurs, Dakar</i></span></figcaption>
          </figure>
          <div className="quote-body">
            <p className="quote-label">Huit DRH, un même constat</p>
            <blockquote>
              <p>«&nbsp;Nos attestations partaient en 48&nbsp;heures. Elles partent en 30&nbsp;secondes. Mon équipe s&apos;occupe enfin des personnes, pas des papiers.&nbsp;»</p>
            </blockquote>
            {/* Navigation masquée tant qu'il n'y a qu'un témoignage.
            <footer className="quote-foot">
              <div className="qf-nav"><button type="button" className="arrow" aria-label="Témoignage précédent">←</button> <span className="qf-count">1 / 8</span> <button type="button" className="arrow" aria-label="Témoignage suivant">→</button></div>
            </footer> */}
          </div>
        </div>
      </section>

      <section className="section sec-anim" aria-labelledby="faq-title">
        <p className="eyebrow">Avant de vous lancer</p>
        <h2 className="head-duo" id="faq-title">Les questions qu&apos;on nous pose<span>avant de signer</span></h2>
        <div className="faq">
          <details open>
            <summary>«&nbsp;Et notre logiciel de paie actuel, il devient quoi&nbsp;?&nbsp;»</summary>
            <p>Il reste en place. L&apos;agent prépare les variables de paie, congés, absences, primes, et les lui transmet par export CSV ou par API&nbsp;: le calcul reste chez vous. Si vous préférez tout regrouper, le module Paie multi-pays (XOF, XAF, MAD) prend le relais quand vous le décidez.</p>
          </details>
          <details>
            <summary>«&nbsp;Où sont hébergées nos données de paie&nbsp;?&nbsp;»</summary>
            <p>Sur un hébergement que nous supervisons en continu, chiffrées en transit comme au repos. Chaque rôle, collaborateur, manager, RH, direction, ne voit que ce qui le concerne. Vous restez propriétaire de vos données&nbsp;: l&apos;export complet est disponible à tout moment, y compris si vous nous quittez.</p>
          </details>
          <details>
            <summary>«&nbsp;Combien de temps pour migrer, et qui fait le travail&nbsp;?&nbsp;»</summary>
            <p>Cinq jours ouvrés, et c&apos;est nous qui tenons le stylo. Jour 1&nbsp;: vous nous transmettez votre fichier du personnel, un tableur suffit, nous l&apos;importons. Jours 2 à 4&nbsp;: nous paramétrons avec vous vos pays, vos règles de congés et vos modèles de documents. Jour 5&nbsp;: l&apos;agent est au travail et vos collaborateurs installent l&apos;app. Vous ne ressaisissez rien.</p>
          </details>
          <details>
            <summary>«&nbsp;Ça coûte combien&nbsp;?&nbsp;»</summary>
            <p>Trois plans, en FCFA et hors taxes, dimensionnés à votre effectif&nbsp;: 25, 50 ou 100 collaborateurs inclus, puis 12&nbsp;500&nbsp;FCFA par collaborateur supplémentaire et par mois (5&nbsp;000&nbsp;FCFA sur le plan Entreprise). Les 15 jours d&apos;essai donnent accès à tout, sans carte bancaire. <Link href="/pricing">Voir les tarifs en détail</Link></p>
          </details>
        </div>
      </section>

      <Cta
        image="/img/cta-team.jpg"
        title={<>Reprenez la moitié<br />de votre semaine RH</>}
        text="15 jours d'essai, sans carte bancaire. Vos données importées et l'agent au travail en 5 jours ouvrés."
        secondLabel="Parler à un expert RH"
        secondHref="/contact"
      />

      <BlogRail initial={items.slice(0, 3)} />

      <ModuleDialog />
      <HomeEffects />
    </>
  );
}
