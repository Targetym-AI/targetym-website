import type { Metadata } from 'next';
import Link from 'next/link';
import Cta from '@/components/site/Cta';
import { publicPageMetadata } from '@/lib/seo';

export const metadata: Metadata = publicPageMetadata({
  title: 'Tarifs SIRH IA en Afrique – Plans Targetym AI',
  description: "Tarifs du meilleur logiciel RH en Afrique : forfaits flexibles pour PME et grands groupes au Sénégal, en Côte d'Ivoire, au Bénin, au Cameroun et au Mali. Paie, performance, talents — prix par employé.",
  keywords: [
    'tarif SIRH Afrique',
    'prix logiciel RH Afrique',
    'SIRH Sénégal',
    "SIRH Côte d'Ivoire",
    'SIRH Bénin',
    'SIRH Cameroun',
    'SIRH Mali',
    'abonnement SIRH Afrique',
    'Targetym AI',
  ],
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <>
      <section className="page-head">
        <p className="eyebrow">Tarification</p>
        <h1>Des tarifs clairs, <span>en FCFA et sans surprise</span></h1>
        <p className="lead">Choisissez le plan adapté à la taille de votre équipe et à vos besoins RH. Pas de frais cachés, pas de mauvaise surprise à la facture.</p>
        <div className="actions"><span className="pill"><i aria-hidden="true"></i>Essai gratuit 15 jours, sans carte bancaire</span></div>
      </section>

      <section className="section sec-anim" aria-label="Les plans">
        <div className="plans">
          <article className="plan">
            <p className="plan-kind">Starter</p>
            <h3>Basique</h3>
            <p className="plan-desc">Idéal pour les PME qui démarrent leur digitalisation RH.</p>
            <p className="plan-quota"><b>Jusqu&apos;à 25 collaborateurs inclus</b><i>+ 12&nbsp;500 FCFA par collaborateur supplémentaire</i></p>
            <ul>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Gestion des dossiers du personnel</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Recrutement &amp; onboarding</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Gestion des congés &amp; absences</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Gestion des missions</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Sanctions disciplinaires</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Organigramme dynamique</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Assistant IA conversationnel</li>
              <li className="off"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></svg>OKR &amp; objectifs</li>
              <li className="off"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></svg>Évaluations de performance</li>
              <li className="off"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></svg>Formation &amp; apprentissage</li>
              <li className="off"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></svg>Analytique avancée</li>
              <li className="off"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></svg>Documents RH automatisés</li>
            </ul>
            <p className="plan-cta"><Link className="btn btn-mint" href="/essai-gratuit">Démarrer l&apos;essai gratuit</Link></p>
          </article>
          <article className="plan plan-hi" data-cut>
            <span className="dock dock-tr" aria-hidden="true"><span className="plan-tag"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true" style={{ width: '13px', height: '13px', fill: 'currentColor', stroke: 'none' }}><path d="M12 2.8l2.7 5.7 6.2.8-4.5 4.3 1.1 6.2L12 16.8l-5.5 3 1.1-6.2L3.1 9.3l6.2-.8z" /></svg> Le plus populaire</span></span>
            <p className="plan-kind">Le plus populaire</p>
            <h3>Premium</h3>
            <p className="plan-desc">Pour les entreprises qui veulent piloter la performance humaine.</p>
            <p className="plan-quota"><b>Jusqu&apos;à 50 collaborateurs inclus</b><i>+ 12&nbsp;500 FCFA par collaborateur supplémentaire</i></p>
            <ul>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Tout le plan Basique</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>OKR &amp; objectifs en cascade</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Évaluations de performance 360°</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Entretiens one-on-one</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Formation &amp; parcours e-learning</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Gestion des talents, matrice 9-Box</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Documents RH automatisés</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Analytique RH avancée</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Suivi des départs</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Agent IA RH spécialisé</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Module Paie en option</li>
            </ul>
            <p className="plan-cta"><Link className="btn btn-mint" href="/essai-gratuit">Démarrer l&apos;essai gratuit</Link></p>
          </article>
          <article className="plan">
            <p className="plan-kind">Sur mesure</p>
            <h3>Entreprise</h3>
            <p className="plan-desc">Pour les grandes structures et les groupes multi-entités.</p>
            <p className="plan-quota"><b>Jusqu&apos;à 100 collaborateurs inclus</b><i>+ 5&nbsp;000 FCFA par collaborateur supplémentaire</i></p>
            <ul>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Tout le plan Premium</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>ATS, suivi des candidatures</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Module Paie intégré</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Agent IA avancé multi-domaines</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Certifications RH</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Data insights &amp; prédictif</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Mode groupe &amp; filiales</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Support prioritaire 24h/24</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Architecture multi-tenant</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Déploiement dédié sur demande</li>
              <li><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg>Budget RH, pilotage et saisie</li>
            </ul>
            <p className="plan-cta"><Link className="btn btn-mint" href="/essai-gratuit">Démarrer l&apos;essai gratuit</Link></p>
          </article>
        </div>
        <p className="plans-note">Tous les prix sont HT · Devise&nbsp;: FCFA (franc CFA) · Facturation mensuelle ou annuelle</p>
      </section>

      <section className="section sec-anim" aria-labelledby="opts-title">
        <p className="eyebrow">Options</p>
        <h2 className="head-duo" id="opts-title">Ajustez votre abonnement<span>à vos besoins exacts</span></h2>
        <div className="rate" data-cut>
          <span className="dock dock-tl" aria-hidden="true"><span className="fig-tag">À la carte</span></span>
          <ul>
            <li>
              <div className="rate-copy">
                <h3>Collaborateur supplémentaire</h3>
                <p>Au-delà du quota inclus dans votre plan, sans changer de formule.</p>
              </div>
              <div className="rate-price"><b>12&nbsp;500 FCFA</b><i>par collaborateur et par mois</i><i>5&nbsp;000 FCFA sur le plan Entreprise</i></div>
            </li>
            <li>
              <div className="rate-copy">
                <h3>Filiale en mode Groupe</h3>
                <p>La maison mère pilote ses filiales depuis un tableau de bord unique.</p>
              </div>
              <div className="rate-price"><b>30&nbsp;000 FCFA</b><i>par filiale et par mois</i><i>forfait groupe 100&nbsp;000 FCFA</i></div>
            </li>
            <li>
              <div className="rate-copy">
                <h3>Module Paie</h3>
                <p>Bulletins officiels, cotisations IPRES / CSS / IPM / CFCE et impôt sur le revenu sénégalais. Inclus dans Entreprise, en option sur Premium.</p>
              </div>
              <div className="rate-price"><b>Sur devis</b><i>selon l&apos;effectif et les pays de paie</i></div>
            </li>
            <li>
              <div className="rate-copy">
                <h3>Support Premium</h3>
                <p>Un manager de succès client dédié et un support téléphonique 24h/24.</p>
              </div>
              <div className="rate-price"><b>Inclus</b><i>dans le plan Entreprise</i></div>
            </li>
          </ul>
        </div>
      </section>

      <section className="section sec-anim" aria-labelledby="ent-title">
        <div className="ent">
          <div className="ent-head">
            <p className="eyebrow left">Fonctionnalités Entreprise</p>
            <h2 className="head-duo left" id="ent-title">Pensé pour les grandes organisations<span>et les groupes multi-entités</span></h2>
            <p className="lead">Multi-sites, multi-pays, filiales&nbsp;: le plan Entreprise ajoute la gouvernance, la sécurité et l&apos;accompagnement qu&apos;exige une organisation à plusieurs niveaux.</p>
            <Link className="btn btn-outline" href="/contact">Parler à l&apos;équipe</Link>
          </div>
          <ol className="ent-list">
            <li>
              <span className="ent-n" aria-hidden="true">01</span>
              <div>
                <h3>Sécurité avancée</h3>
                <p>Authentification à deux facteurs sur tous les plans, journaux d&apos;audit complets et contrôle d&apos;accès granulaire par rôle.</p>
              </div>
              <span className="feat-ico" aria-hidden="true"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5.2c0 4.4-3 8.2-7 9.8-4-1.6-7-5.4-7-9.8V6z" /><path d="M9.3 12.2l1.9 1.9 3.6-3.8" /></svg></span>
            </li>
            <li>
              <span className="ent-n" aria-hidden="true">02</span>
              <div>
                <h3>Agent IA avancé</h3>
                <p>Des agents multi-domaines qui exécutent des actions RH complexes de bout en bout, en français, anglais, portugais et arabe.</p>
              </div>
              <span className="feat-ico" aria-hidden="true"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="7" width="16" height="12" rx="4" /><path d="M12 3.5V7M9 12h.01M15 12h.01M9.5 15.5h5" /></svg></span>
            </li>
            <li>
              <span className="ent-n" aria-hidden="true">03</span>
              <div>
                <h3>Support dédié 24h/24</h3>
                <p>Un manager de succès client dédié et un support prioritaire, inclus dans le plan Entreprise.</p>
              </div>
              <span className="feat-ico" aria-hidden="true"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13a8 8 0 0 1 16 0" /><rect x="3" y="12" width="4" height="6" rx="2" /><rect x="17" y="12" width="4" height="6" rx="2" /><path d="M19 18.5a3 3 0 0 1-3 2.5h-3" /></svg></span>
            </li>
          </ol>
        </div>
      </section>

      <section className="section sec-anim" aria-labelledby="faq-title">
        <p className="eyebrow">Questions fréquentes</p>
        <h2 className="head-duo" id="faq-title">Vous avez des questions&nbsp;?<span>Nous avons des réponses</span></h2>
        <div className="faq">
          <details open>
            <summary>Puis-je changer de plan à tout moment&nbsp;?</summary>
            <p>Oui. Vous demandez le changement depuis vos paramètres, et notre équipe le traite sous 24&nbsp;h ouvrées.</p>
          </details>
          <details>
            <summary>Y a-t-il un essai gratuit&nbsp;?</summary>
            <p>Oui, 15 jours d&apos;essai avec un accès complet au plan Entreprise, jusqu&apos;à 100 collaborateurs. Aucun paiement n&apos;est demandé pour commencer.</p>
          </details>
          <details>
            <summary>Que se passe-t-il si je dépasse ma limite de collaborateurs&nbsp;?</summary>
            <p>Vous êtes prévenu à l&apos;approche de la limite. Chaque collaborateur supplémentaire est facturé 12&nbsp;500 FCFA par mois sur Basique et Premium, 5&nbsp;000 FCFA sur Entreprise.</p>
          </details>
          <details>
            <summary>Targetym AI est-il adapté au contexte africain&nbsp;?</summary>
            <p>Oui. Targetym AI est conçu pour les entreprises africaines&nbsp;: devise FCFA / XOF, conformité au droit du travail local, interface multilingue et support réactif en français.</p>
          </details>
          <details>
            <summary>Comment fonctionne le mode Groupe&nbsp;?</summary>
            <p>Une maison mère pilote plusieurs filiales depuis un tableau de bord centralisé. Tarif&nbsp;: forfait groupe de 100&nbsp;000 XOF, plus 30&nbsp;000 XOF par filiale et par mois.</p>
          </details>
          <details>
            <summary>Mes données sont-elles sécurisées&nbsp;?</summary>
            <p>Absolument. Toutes les données sont chiffrées et hébergées de manière sécurisée, avec authentification à deux facteurs et contrôle d&apos;accès par rôle.</p>
          </details>
        </div>
      </section>

      <Cta
        image="/img/mod-2a.jpg"
        title={<>Besoin d&apos;aide<br />pour choisir&nbsp;?</>}
        text="Notre équipe est disponible pour vous conseiller et trouver le plan adapté à votre structure."
        secondLabel="Parler à l'équipe"
        secondHref="/contact"
      />
    </>
  );
}
