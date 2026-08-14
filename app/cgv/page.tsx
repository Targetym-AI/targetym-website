import type { Metadata } from 'next';

export const metadata: Metadata = {
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
};

const lastUpdated = 'Juin 2026';

export default function CgvPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white pt-16 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 mb-3">TARGETYM AI - AGILTYM SARL</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Conditions Générales de Vente
          </h1>
          <p className="text-gray-500 text-sm">Dernière mise à jour : {lastUpdated} - Droit sénégalais &amp; OHADA</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:text-gray-600 [&_li]:mb-1 [&_a]:text-primary-600 [&_a]:underline [&_strong]:text-gray-800 [&_table]:w-full [&_table]:border-collapse [&_table]:mb-6 [&_th]:bg-gray-100 [&_th]:text-left [&_th]:p-3 [&_th]:font-semibold [&_th]:text-gray-800 [&_th]:border [&_th]:border-gray-200 [&_td]:p-3 [&_td]:text-gray-600 [&_td]:border [&_td]:border-gray-200 [&_td:first-child]:font-semibold [&_td:first-child]:text-gray-800">

          {/* Préambule */}
          <h2>Préambule</h2>
          <p>
            La société <strong>AGILTYM SARL</strong>, société à responsabilité limitée de droit sénégalais au capital de <strong>200 000 FCFA</strong>, immatriculée au RCCM de Dakar sous le numéro <strong>SN.DKR.2025.B.42427</strong>, dont le siège social est situé Immeuble Bidaness Building, Mermoz VDN, Dakar, Sénégal (ci-après « la Société »), édite et commercialise la plateforme <strong>TARGETYM AI</strong>, un SIRH de nouvelle génération intégrant plus de <strong>30 Agents d&apos;intelligence artificielle</strong> spécialisés en ressources humaines. La marque <strong>TARGETYM AI</strong> est enregistrée auprès de l&apos;<strong>Organisation Africaine de la Propriété Intellectuelle (OAPI)</strong>.
          </p>
          <p>
            Les présentes Conditions Générales de Vente (CGV) s&apos;appliquent à toute souscription à la plateforme par une personne morale ou physique agissant dans le cadre de son activité professionnelle (ci-après « le Client »). Elles prévalent sur tout document du Client sauf dérogation écrite et signée entre les Parties.
          </p>

          {/* Article 1 */}
          <h2>Article 1 - Définitions</h2>
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

          {/* Article 2 */}
          <h2>Article 2 - Application, Objet et Opposabilité des CGV</h2>
          <p>
            Les présentes CGV définissent les droits et obligations de la Société et du Client dans le cadre de la mise à disposition de la Plateforme TARGETYM AI en mode SaaS. Elles sont opposables au Client dès le règlement de la Facture ou, à défaut, dès le début d&apos;une période d&apos;essai gratuit de <strong>14 jours</strong>. Le Client déclare avoir pris connaissance des CGV préalablement à toute souscription.
          </p>

          {/* Article 3 */}
          <h2>Article 3 - Souscription et Facture</h2>
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

          {/* Article 4 */}
          <h2>Article 4 - Durée d&apos;engagement</h2>
          <p>
            Le Contrat prend effet à la date de règlement de la Facture ou à la fin de la période d&apos;essai, pour une durée annuelle. À l&apos;échéance, il se <strong>renouvelle tacitement</strong> pour une durée équivalente, sauf dénonciation par l&apos;une des Parties dans les conditions prévues à l&apos;article 13.
          </p>

          {/* Article 5 */}
          <h2>Article 5 - Hébergement, Sécurité et Souveraineté des données</h2>
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

          {/* Article 6 */}
          <h2>Article 6 - Obligations de la Société</h2>
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

          {/* Article 7 */}
          <h2>Article 7 - Obligations du Client</h2>
          <p>Le Client s&apos;engage à :</p>
          <ul>
            <li>Désigner un référent TARGETYM AI responsable de la gestion des accès</li>
            <li>Agir en qualité de <strong>Responsable de Traitement</strong> conformément à la Loi n°&nbsp;2008-12 et informer ses Employés du traitement de leurs données</li>
            <li>Utiliser les Agents IA de manière éthique, sans chercher à générer des profils discriminatoires ni à mettre en place une surveillance intrusive</li>
            <li>Ne pas utiliser TARGETYM AI pour prendre des décisions définitives sur le seul fondement des outputs IA</li>
            <li>Signaler tout dépassement du nombre d&apos;Employés contractuellement prévu</li>
            <li>Maintenir la confidentialité de ses identifiants de connexion</li>
          </ul>

          {/* Article 8 */}
          <h2>Article 8 - Conditions financières</h2>
          <p>
            Les prix sont exprimés en <strong>FCFA/XOF</strong> pour les Clients de la zone UEMOA. La facturation intervient annuellement, terme à échoir. Les Factures sont payables dans un délai de <strong>30 jours</strong> à compter de leur émission, par virement bancaire, carte bancaire ou mobile money (Wave, Orange Money, Free Money, etc.).
          </p>
          <p>
            La Société se réserve le droit de réviser ses tarifs avec un préavis écrit de <strong>30 jours</strong>. En l&apos;absence d&apos;opposition écrite du Client dans les 15 jours suivant la notification, la révision est réputée acceptée. En cas de désaccord, le Client peut résilier dans les conditions de l&apos;article 13.
          </p>

          {/* Article 9 */}
          <h2>Article 9 - Propriété intellectuelle</h2>
          <p>
            La souscription confère au Client un droit d&apos;accès non exclusif, non cessible et limité à la durée du Contrat. La Plateforme, ses Agents IA, algorithmes, modèles et documentation sont la propriété exclusive de la Société, protégée par le droit de la propriété intellectuelle et enregistrée auprès de l&apos;OAPI. Toute reproduction, décompilation ou tentative d&apos;ingénierie inverse est formellement interdite.
          </p>
          <p>
            Les données RH saisies par le Client restent <strong>sa propriété exclusive</strong>. La Société ne les utilise jamais pour entraîner ses modèles IA ou les vendre à des tiers.
          </p>

          {/* Article 10 */}
          <h2>Article 10 - Confidentialité</h2>
          <p>
            Chaque Partie s&apos;engage à traiter comme strictement confidentielles les informations de l&apos;autre Partie pendant toute la durée du Contrat et pour une période de <strong>3 ans</strong> après sa cessation, quelle qu&apos;en soit la cause. Sont notamment confidentiels : les algorithmes des Agents IA, les données RH des Employés, les stratégies commerciales des Parties et les conditions tarifaires.
          </p>

          {/* Article 11 */}
          <h2>Article 11 - Responsabilité</h2>
          <p>
            La responsabilité de la Société est plafonnée au montant des sommes effectivement payées par le Client au cours des <strong>12 mois</strong> précédant le fait générateur. La Société ne saurait être tenue responsable des dommages indirects, de la perte de données, de la perte d&apos;exploitation, ni des décisions RH prises sur la base des outputs des Agents IA. La Société n&apos;est pas responsable des usages non conformes aux présentes CGV.
          </p>

          {/* Article 12 */}
          <h2>Article 12 - Force majeure</h2>
          <p>
            Aucune Partie ne sera responsable d&apos;un manquement causé par un événement de force majeure (catastrophe naturelle, conflit armé, pandémie, décision gouvernementale, cyberattaque d&apos;ampleur nationale). La Partie affectée doit en informer l&apos;autre dans les <strong>48 heures</strong>. Si la force majeure se prolonge au-delà de <strong>60 jours</strong>, chaque Partie peut résilier le Contrat sans indemnité.
          </p>

          {/* Article 13 */}
          <h2>Article 13 - Résiliation</h2>
          <p>
            Chaque Partie peut s&apos;opposer au renouvellement tacite par notification écrite avec un préavis de <strong>30 jours</strong> avant la date d&apos;échéance annuelle. En cas de manquement grave non remédié dans un délai de 30 jours suivant mise en demeure, la Partie non défaillante peut résilier de plein droit. La Société peut résilier immédiatement sans indemnité en cas de violation grave des CGV ou d&apos;usage illégal de la Plateforme.
          </p>
          <p>
            En cas de résiliation, le Client peut demander l&apos;export de ses données en format CSV ou JSON dans un délai de <strong>30 jours</strong> suivant la fin d&apos;accès. Passé ce délai, la Société procède à la destruction sécurisée et irréversible des données dans les 15 jours et délivre une <strong>attestation de suppression</strong> sur demande.
          </p>

          {/* Article 14 */}
          <h2>Article 14 - Protection des données personnelles</h2>
          <p>
            Le Client agit en qualité de <strong>Responsable de Traitement</strong> et la Société en qualité de <strong>Sous-traitant</strong>, conformément à la Loi n°&nbsp;2008-12 du 25 janvier 2008 sur la Protection des données personnelles au Sénégal et à la Politique de Sécurité et de Gouvernance Juridique de Targetym AI. Les mesures techniques incluent TLS 1.3+, AES-256, MFA, RBAC, journaux d&apos;audit et tests d&apos;intrusion annuels. Conformité SOC 2 Type II certifiée.
          </p>

          {/* Article 15 */}
          <h2>Article 15 - Droit applicable et juridiction</h2>
          <p>
            Les présentes CGV sont régies par le <strong>droit sénégalais</strong>, complété par les Actes uniformes de l&apos;OHADA. En cas de litige, les Parties s&apos;engagent à rechercher une résolution amiable dans un délai de <strong>45 jours</strong>. À défaut, les juridictions compétentes du ressort de <strong>Dakar</strong> seront exclusivement compétentes.
          </p>

          {/* Article 16 */}
          <h2>Article 16 - Cession</h2>
          <p>
            La Société peut céder le présent Contrat à toute entité du même groupe ou dans le cadre d&apos;une opération de fusion-acquisition, avec notification préalable de <strong>30 jours</strong>. Le Client ne peut céder ses droits et obligations sans accord écrit préalable de la Société.
          </p>

          {/* Article 17 */}
          <h2>Article 17 - Dispositions diverses</h2>
          <p>
            Si une clause est déclarée nulle ou inapplicable, les autres dispositions restent en vigueur. La renonciation à se prévaloir d&apos;une clause ne vaut pas renonciation définitive. Les présentes CGV, la Facture, le DPA, le SLA et la Politique de Vie Privée constituent l&apos;intégralité de l&apos;accord entre les Parties et remplacent tout accord antérieur.
          </p>

          {/* Annexe DPA */}
          <h2>ANNEXE I - ACCORD DE TRAITEMENT DES DONNÉES (DPA)</h2>
          <p className="font-semibold text-gray-700">Conformité Loi n°&nbsp;2008-12 - CDP Sénégal</p>
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

          {/* Contact */}
          <h2>Contact</h2>
          <p>
            <strong>AGILTYM SARL - Targetym AI</strong><br />
            E-mail : <a href="mailto:support@agiltym.com">support@agiltym.com</a><br />
            Tél. : +221 76 523 57 94<br />
            Immeuble Bidaness Building, Mermoz VDN, Dakar, Sénégal
          </p>
        </div>
      </section>
    </div>
  );
}
