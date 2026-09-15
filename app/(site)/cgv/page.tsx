import type { Metadata } from 'next';
import LegalPage from '@/components/site/legal/LegalPage';
import { publicPageMetadata } from '@/lib/seo';

export const metadata: Metadata = publicPageMetadata({
  title: 'Conditions Générales de Vente - Targetym AI | SIRH Afrique',
  description:
    "Conditions Générales de Vente de Targetym AI, le SIRH augmenté par l'IA en Afrique (Sénégal, Côte d'Ivoire, Bénin, Cameroun, Mali), édité par Agiltym SARL. Droit sénégalais et OHADA.",
  keywords: [
    'SIRH en Afrique',
    'logiciel RH Afrique',
    'meilleure SIRH en Afrique',
    'SIRH au Sénégal',
    "SIRH en Côte d'Ivoire",
    'SIRH au Mali',
    'SIRH IA',
    'CGV logiciel SIRH',
    'abonnement SIRH Afrique',
    'Targetym AI',
  ],
  path: '/cgv',
});

const lastUpdated = 'Juin 2026';

const toc = [
  { id: 'preambule', label: 'Préambule' },
  { id: 'article-1', k: '1', label: 'Définitions' },
  { id: 'article-2', k: '2', label: 'Application, Objet et Opposabilité des CGV' },
  { id: 'article-3', k: '3', label: 'Souscription et Facture' },
  { id: 'article-4', k: '4', label: "Durée d'engagement" },
  { id: 'article-5', k: '5', label: 'Hébergement, Sécurité et Souveraineté des données' },
  { id: 'article-6', k: '6', label: 'Obligations de la Société' },
  { id: 'article-7', k: '7', label: 'Obligations du Client' },
  { id: 'article-8', k: '8', label: 'Conditions financières' },
  { id: 'article-9', k: '9', label: 'Propriété intellectuelle' },
  { id: 'article-10', k: '10', label: 'Confidentialité' },
  { id: 'article-11', k: '11', label: 'Responsabilité' },
  { id: 'article-12', k: '12', label: 'Force majeure' },
  { id: 'article-13', k: '13', label: 'Résiliation' },
  { id: 'article-14', k: '14', label: 'Protection des données personnelles' },
  { id: 'article-15', k: '15', label: 'Droit applicable et juridiction' },
  { id: 'article-16', k: '16', label: 'Cession' },
  { id: 'article-17', k: '17', label: 'Dispositions diverses' },
  { id: 'annexe-i', k: 'A', label: 'Accord de traitement des données (DPA)' },
  { id: 'contact', label: 'Contact' },
];

export default function CgvPage() {
  return (
    <LegalPage
      current="/cgv"
      eyebrow="Targetym AI · AGILTYM SARL"
      title={<>Conditions Générales <span>de Vente</span></>}
      updated={lastUpdated}
      frame="Droit sénégalais & OHADA"
      contact="support@agiltym.com"
      toc={toc}
    >
      <h2 id="preambule">Préambule</h2>
      <p>
        La société <strong>AGILTYM SARL</strong>, société à responsabilité limitée de droit sénégalais au capital de <strong>200 000 FCFA</strong>, immatriculée au RCCM de Dakar sous le numéro <strong>SN.DKR.2025.B.42427</strong>, dont le siège social est situé Immeuble Bidaness Building, Mermoz VDN, Dakar, Sénégal (ci-après « la Société »), édite et commercialise la plateforme <strong>TARGETYM AI</strong>, un SIRH de nouvelle génération intégrant plus de <strong>30 Agents d&apos;intelligence artificielle</strong> spécialisés en ressources humaines. La marque <strong>TARGETYM AI</strong> est enregistrée auprès de l&apos;<strong>Organisation Africaine de la Propriété Intellectuelle (OAPI)</strong>.
      </p>
      <p>
        Les présentes Conditions Générales de Vente (CGV) s&apos;appliquent à toute souscription à la plateforme par une personne morale ou physique agissant dans le cadre de son activité professionnelle (ci-après « le Client »). Elles prévalent sur tout document du Client sauf dérogation écrite et signée entre les Parties.
      </p>
      <h2 id="article-1"><small>Article 1</small>Définitions</h2>
      <div className="legal-table">
        <table>
          <tbody>
            <tr>
              <td>Société</td>
              <td>AGILTYM SARL, éditeur de TARGETYM AI.</td>
            </tr>
            <tr>
              <td>Client</td>
              <td>Toute entité ayant souscrit un abonnement TARGETYM AI.</td>
            </tr>
            <tr>
              <td>Utilisateurs</td>
              <td>Collaborateurs du Client autorisés à accéder à la Plateforme.</td>
            </tr>
            <tr>
              <td>Employés</td>
              <td>Personnes gérées dans la Plateforme au nom du Client.</td>
            </tr>
            <tr>
              <td>Agent IA</td>
              <td>Module d&apos;intelligence artificielle intégré à TARGETYM AI.</td>
            </tr>
            <tr>
              <td>Facture</td>
              <td>Document émis par la Société précisant le Plan souscrit, le nombre d&apos;Employés gérés, la durée d&apos;engagement et le montant en FCFA/XOF. La Facture vaut engagement contractuel dès son règlement par le Client.</td>
            </tr>
            <tr>
              <td>DPA</td>
              <td>Accord de Traitement des Données (Data Processing Agreement).</td>
            </tr>
            <tr>
              <td>SLA</td>
              <td>Accord de Niveau de Service (Service Level Agreement).</td>
            </tr>
            <tr>
              <td>GTI</td>
              <td>Garantie de Temps d&apos;Intervention : délai maximal de prise en charge d&apos;un Incident signalé.</td>
            </tr>
            <tr>
              <td>GTR</td>
              <td>Garantie de Temps de Résolution : délai maximal de rétablissement du Service après un Incident.</td>
            </tr>
            <tr>
              <td>FCFA / XOF</td>
              <td>Monnaie de facturation applicable aux Clients de la zone UEMOA.</td>
            </tr>
            <tr>
              <td>CSV / JSON</td>
              <td>Formats standards d&apos;export de données interopérables.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2 id="article-2"><small>Article 2</small>Application, Objet et Opposabilité des CGV</h2>
      <p>
        Les présentes CGV définissent les droits et obligations de la Société et du Client dans le cadre de la mise à disposition de la Plateforme TARGETYM AI en mode SaaS. Elles sont opposables au Client dès le règlement de la Facture ou, à défaut, dès le début d&apos;une période d&apos;essai gratuit de <strong>14 jours</strong>. Le Client déclare avoir pris connaissance des CGV préalablement à toute souscription.
      </p>
      <h2 id="article-3"><small>Article 3</small>Souscription et Facture</h2>
      <p>
        La souscription est formalisée par une Facture précisant le <strong>Plan tarifaire</strong> choisi, le nombre d&apos;Employés gérés, la durée de l&apos;engagement annuel et le montant en FCFA/XOF. Les Plans disponibles sont :
      </p>
      <ul>
        <li><strong>Basic</strong></li>
        <li><strong>Prémium</strong></li>
        <li><strong>Entreprise</strong></li>
      </ul>
      <p>
        Le détail des fonctionnalités et la grille tarifaire en vigueur figurent sur le site <a href="https://targetym.ai">targetym.ai</a> au niveau de « Tarification » et dans la facture remise au Client. Tout dépassement du nombre d&apos;Employés contractuellement prévu donnera lieu à l&apos;émission d&apos;une nouvelle Facture au tarif en vigueur.
      </p>
      <h2 id="article-4"><small>Article 4</small>Durée d&apos;engagement</h2>
      <p>
        Le Contrat prend effet à la date de règlement de la Facture ou à la fin de la période d&apos;essai, pour une durée annuelle. À l&apos;échéance, il se <strong>renouvelle tacitement</strong> pour une durée équivalente, sauf dénonciation par l&apos;une des Parties dans les conditions prévues à l&apos;article 13.
      </p>
      <h2 id="article-5"><small>Article 5</small>Hébergement, Sécurité et Souveraineté des données</h2>
      <p>
        La Plateforme est hébergée via <strong>AWS (Amazon Web Services)</strong>, sur des infrastructures certifiées <strong>SOC 2 Type II</strong>, avec des mesures de sécurité comprenant TLS 1.3+, AES-256, MFA, RBAC, journaux d&apos;audit et tests d&apos;intrusion annuels. La Société privilégie un hébergement en Afrique de l&apos;Ouest ou dans des zones offrant un niveau de protection équivalent aux exigences de la Loi n°&nbsp;2008-12.
      </p>
      <p>
        En cas de changement de localisation d&apos;hébergement, le Client est notifié avec un préavis de <strong>30 jours</strong> et peut s&apos;y opposer dans un délai de 15 jours.
      </p>
      <h3>Engagement de souveraineté des données</h3>
      <p>
        Les données confiées par le Client ne seront jamais utilisées pour entraîner des modèles d&apos;IA tiers, revendues à des partenaires commerciaux, ou exploitées à des fins autres que l&apos;exécution stricte du Contrat. Les données appartiennent au Client.
      </p>
      <h2 id="article-6"><small>Article 6</small>Obligations de la Société</h2>
      <p>
        La Société garantit un taux de disponibilité mensuelle de <strong>99,5%</strong>, hors maintenances planifiées (notifiées 48h à l&apos;avance) et événements de force majeure. En cas de dépassement, des crédits de service sont accordés selon les modalités du SLA. Un support technique est fourni selon le Plan souscrit ; les délais GTI et GTR sont définis dans le SLA annexé.
      </p>
      <p>Les 30+ Agents IA de TARGETYM AI respectent les principes éthiques suivants :</p>
      <ul>
        <li><strong>Transparence</strong> : documentation explicative des critères fournie sur demande</li>
        <li><strong>Non-discrimination</strong> : audits réguliers par tiers indépendant pour détecter les biais</li>
        <li><strong>Supervision humaine</strong> : aucune décision RH à impact significatif n&apos;est entièrement automatisée</li>
        <li><strong>Droit à l&apos;explication</strong> : toute décision assistée par IA peut faire l&apos;objet d&apos;une demande d&apos;explication</li>
      </ul>
      <h2 id="article-7"><small>Article 7</small>Obligations du Client</h2>
      <p>Le Client s&apos;engage à :</p>
      <ul>
        <li>Désigner un référent TARGETYM AI responsable de la gestion des accès</li>
        <li>Agir en qualité de <strong>Responsable de Traitement</strong> conformément à la Loi n°&nbsp;2008-12 et informer ses Employés du traitement de leurs données</li>
        <li>Utiliser les Agents IA de manière éthique, sans chercher à générer des profils discriminatoires ni à mettre en place une surveillance intrusive</li>
        <li>Ne pas utiliser TARGETYM AI pour prendre des décisions définitives sur le seul fondement des outputs IA</li>
        <li>Signaler tout dépassement du nombre d&apos;Employés contractuellement prévu</li>
        <li>Maintenir la confidentialité de ses identifiants de connexion</li>
      </ul>
      <h2 id="article-8"><small>Article 8</small>Conditions financières</h2>
      <p>
        Les prix sont exprimés en <strong>FCFA/XOF</strong> pour les Clients de la zone UEMOA. La facturation intervient annuellement, terme à échoir. Les Factures sont payables dans un délai de <strong>30 jours</strong> à compter de leur émission, par virement bancaire, carte bancaire ou mobile money (Wave, Orange Money, Free Money, etc.).
      </p>
      <p>
        La Société se réserve le droit de réviser ses tarifs avec un préavis écrit de <strong>30 jours</strong>. En l&apos;absence d&apos;opposition écrite du Client dans les 15 jours suivant la notification, la révision est réputée acceptée. En cas de désaccord, le Client peut résilier dans les conditions de l&apos;article 13.
      </p>
      <h2 id="article-9"><small>Article 9</small>Propriété intellectuelle</h2>
      <p>
        La souscription confère au Client un droit d&apos;accès non exclusif, non cessible et limité à la durée du Contrat. La Plateforme, ses Agents IA, algorithmes, modèles et documentation sont la propriété exclusive de la Société, protégée par le droit de la propriété intellectuelle et enregistrée auprès de l&apos;OAPI. Toute reproduction, décompilation ou tentative d&apos;ingénierie inverse est formellement interdite.
      </p>
      <p>
        Les données RH saisies par le Client restent <strong>sa propriété exclusive</strong>. La Société ne les utilise jamais pour entraîner ses modèles IA ou les vendre à des tiers.
      </p>
      <h2 id="article-10"><small>Article 10</small>Confidentialité</h2>
      <p>
        Chaque Partie s&apos;engage à traiter comme strictement confidentielles les informations de l&apos;autre Partie pendant toute la durée du Contrat et pour une période de <strong>3 ans</strong> après sa cessation, quelle qu&apos;en soit la cause. Sont notamment confidentiels : les algorithmes des Agents IA, les données RH des Employés, les stratégies commerciales des Parties et les conditions tarifaires.
      </p>
      <h2 id="article-11"><small>Article 11</small>Responsabilité</h2>
      <p>
        La responsabilité de la Société est plafonnée au montant des sommes effectivement payées par le Client au cours des <strong>12 mois</strong> précédant le fait générateur. La Société ne saurait être tenue responsable des dommages indirects, de la perte de données, de la perte d&apos;exploitation, ni des décisions RH prises sur la base des outputs des Agents IA. La Société n&apos;est pas responsable des usages non conformes aux présentes CGV.
      </p>
      <h2 id="article-12"><small>Article 12</small>Force majeure</h2>
      <p>
        Aucune Partie ne sera responsable d&apos;un manquement causé par un événement de force majeure (catastrophe naturelle, conflit armé, pandémie, décision gouvernementale, cyberattaque d&apos;ampleur nationale). La Partie affectée doit en informer l&apos;autre dans les <strong>48 heures</strong>. Si la force majeure se prolonge au-delà de <strong>60 jours</strong>, chaque Partie peut résilier le Contrat sans indemnité.
      </p>
      <h2 id="article-13"><small>Article 13</small>Résiliation</h2>
      <p>
        Chaque Partie peut s&apos;opposer au renouvellement tacite par notification écrite avec un préavis de <strong>30 jours</strong> avant la date d&apos;échéance annuelle. En cas de manquement grave non remédié dans un délai de 30 jours suivant mise en demeure, la Partie non défaillante peut résilier de plein droit. La Société peut résilier immédiatement sans indemnité en cas de violation grave des CGV ou d&apos;usage illégal de la Plateforme.
      </p>
      <p>
        En cas de résiliation, le Client peut demander l&apos;export de ses données en format CSV ou JSON dans un délai de <strong>30 jours</strong> suivant la fin d&apos;accès. Passé ce délai, la Société procède à la destruction sécurisée et irréversible des données dans les 15 jours et délivre une <strong>attestation de suppression</strong> sur demande.
      </p>
      <h2 id="article-14"><small>Article 14</small>Protection des données personnelles</h2>
      <p>
        Le Client agit en qualité de <strong>Responsable de Traitement</strong> et la Société en qualité de <strong>Sous-traitant</strong>, conformément à la Loi n°&nbsp;2008-12 du 25 janvier 2008 sur la Protection des données personnelles au Sénégal et à la Politique de Sécurité et de Gouvernance Juridique de Targetym AI. Les mesures techniques incluent TLS 1.3+, AES-256, MFA, RBAC, journaux d&apos;audit et tests d&apos;intrusion annuels. Conformité SOC 2 Type II certifiée.
      </p>
      <h2 id="article-15"><small>Article 15</small>Droit applicable et juridiction</h2>
      <p>
        Les présentes CGV sont régies par le <strong>droit sénégalais</strong>, complété par les Actes uniformes de l&apos;OHADA. En cas de litige, les Parties s&apos;engagent à rechercher une résolution amiable dans un délai de <strong>45 jours</strong>. À défaut, les juridictions compétentes du ressort de <strong>Dakar</strong> seront exclusivement compétentes.
      </p>
      <h2 id="article-16"><small>Article 16</small>Cession</h2>
      <p>
        La Société peut céder le présent Contrat à toute entité du même groupe ou dans le cadre d&apos;une opération de fusion-acquisition, avec notification préalable de <strong>30 jours</strong>. Le Client ne peut céder ses droits et obligations sans accord écrit préalable de la Société.
      </p>
      <h2 id="article-17"><small>Article 17</small>Dispositions diverses</h2>
      <p>
        Si une clause est déclarée nulle ou inapplicable, les autres dispositions restent en vigueur. La renonciation à se prévaloir d&apos;une clause ne vaut pas renonciation définitive. Les présentes CGV, la Facture, le DPA, le SLA et la Politique de Vie Privée constituent l&apos;intégralité de l&apos;accord entre les Parties et remplacent tout accord antérieur.
      </p>
      <h2 id="annexe-i"><small>Annexe I</small>Accord de traitement des données (DPA)</h2>
      <p className="legal-note">Conformité Loi n°&nbsp;2008-12 - CDP Sénégal</p>
      <div className="legal-table">
        <table>
          <tbody>
            <tr>
              <td>Personnes concernées</td>
              <td>Employés, managers, candidats et prestataires du Client.</td>
            </tr>
            <tr>
              <td>Finalités</td>
              <td>Gestion RH, paie, recrutement IA, formation, congés, performance (OKR, 360°), analyse prédictive, cartographie des talents, génération de documents RH.</td>
            </tr>
            <tr>
              <td>Catégories de données</td>
              <td>Identité, coordonnées professionnelles, carrière, paie, absences, pointage, compétences, évaluations, candidatures.</td>
            </tr>
            <tr>
              <td>Durée de conservation</td>
              <td>Destruction sous 15 jours après cessation du Contrat, sauf obligation légale contraire (ex. données de paie : 5 ans conformément au droit du travail sénégalais).</td>
            </tr>
            <tr>
              <td>Hébergement</td>
              <td>AWS (Amazon Web Services), certifié SOC 2 Type II. Zones conformes à la Loi n°&nbsp;2008-12. Tout changement notifié 30 jours à l&apos;avance.</td>
            </tr>
            <tr>
              <td>Sous-traitants ultérieurs</td>
              <td>Liste disponible sur demande. Liés par obligations contractuelles équivalentes. Droit d&apos;opposition du Client sous 14 jours.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>La Société met en œuvre les mesures de sécurité suivantes pour le compte du Client Responsable de Traitement :</p>
      <ul>
        <li>Chiffrement de toutes les données en transit (TLS 1.3+) et au repos (AES-256)</li>
        <li>Authentification multi-facteurs (MFA) obligatoire pour les accès administrateurs</li>
        <li>Contrôle d&apos;accès granulaire par rôle (RBAC) configurable par le Client</li>
        <li>Journaux d&apos;audit complets conservés 12 mois minimum</li>
        <li>Tests d&apos;intrusion annuels par prestataire indépendant certifié</li>
        <li>Architecture cloisonnée : environnements production / test / développement séparés</li>
        <li>Conformité SOC 2 Type II certifiée par audit tiers indépendant annuel</li>
        <li>Notification de violation de données sous 48 heures au Client et à la CDP si applicable</li>
      </ul>
      <h2 id="contact">Contact</h2>
      <p>
        <strong>AGILTYM SARL - Targetym AI</strong><br />
        E-mail : <a href="mailto:support@agiltym.com">support@agiltym.com</a><br />
        Tél. : +221 76 523 57 94<br />
        Immeuble Bidaness Building, Mermoz VDN, Dakar, Sénégal
      </p>
    </LegalPage>
  );
}
