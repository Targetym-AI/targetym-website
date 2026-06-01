import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente - Targetym AI | SIRH Afrique',
  description:
    "Conditions Générales de Vente de Targetym AI, le SIRH augmenté par l'IA en Afrique (Sénégal, Côte d'Ivoire), édité par Agiltym SARL. Droit sénégalais et OHADA.",
  keywords: [
    'SIRH en Afrique',
    'meilleure SIRH en Afrique',
    'SIRH au Sénégal',
    "SIRH en Côte d'Ivoire",
    'logiciel RH Afrique',
    'SIRH IA',
    'CGV logiciel SIRH',
    'Targetym AI',
  ],
};

const lastUpdated = 'Avril 2026';

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
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:text-gray-600 [&_li]:mb-1 [&_a]:text-primary-600 [&_a]:underline [&_strong]:text-gray-800">

          {/* Préambule */}
          <h2>Préambule</h2>
          <p>
            La société <strong>AGILTYM SARL</strong>, société à responsabilité limitée de droit sénégalais au capital de <strong>200 000 FCFA</strong>, immatriculée au RCCM de Dakar sous le numéro <strong>SN.DKR.2025.B.42427</strong>, dont le siège social est situé Immeuble Bidaness Building, Mermoz VDN, Dakar, Sénégal (ci-après « la Société »), édite et commercialise la plateforme <strong>TARGETYM AI</strong>, un SIRH de nouvelle génération intégrant plus de <strong>30 Agents d&apos;intelligence artificielle</strong> spécialisés en ressources humaines. La marque <strong>TARGETYM AI</strong> est enregistrée auprès de l&apos;<strong>Organisation Africaine de la Propriété Intellectuelle (OAPI)</strong>.
          </p>
          <p>
            Les présentes Conditions Générales de Vente (CGV) s&apos;appliquent à toute souscription à la plateforme par une personne morale ou physique agissant dans le cadre de son activité professionnelle (ci-après « le Client »). Elles prévalent sur tout document du Client sauf dérogation écrite et signée entre les Parties.
          </p>

          <h2>Article 1 - Définitions</h2>
          <ul>
            <li><strong>Société</strong> : AGILTYM SARL, éditeur de TARGETYM AI</li>
            <li><strong>Client</strong> : toute entité ayant souscrit un abonnement TARGETYM AI</li>
            <li><strong>Utilisateurs</strong> : collaborateurs du Client autorisés à accéder à la Plateforme</li>
            <li><strong>Employés</strong> : personnes gérées dans la Plateforme au nom du Client</li>
            <li><strong>Agent IA</strong> : module d&apos;intelligence artificielle intégré à TARGETYM AI</li>
            <li><strong>Bon de Commande</strong> : document signé par les deux Parties formalisant la souscription, le Plan, le nombre d&apos;Employés gérés et la durée</li>
            <li><strong>DPA</strong> : Accord de Traitement des Données (Data Processing Agreement)</li>
            <li><strong>SLA</strong> : Accord de Niveau de Service (Service Level Agreement)</li>
            <li><strong>FCFA / XOF</strong> : monnaie de facturation applicable aux Clients de la zone UEMOA</li>
          </ul>

          <h2>Article 2 - Application, Objet et Opposabilité des CGV</h2>
          <p>
            Les présentes CGV définissent les droits et obligations de la Société et du Client dans le cadre de la mise à disposition de la Plateforme TARGETYM AI en mode SaaS. Elles sont opposables au Client dès la signature du Bon de Commande ou, à défaut, dès le début d&apos;une période d&apos;essai gratuit de <strong>14 jours</strong>. Le Client déclare avoir pris connaissance des CGV préalablement à toute souscription.
          </p>

          <h2>Article 3 - Souscription et Bon de Commande</h2>
          <p>
            La souscription est formalisée par un Bon de Commande précisant le <strong>Plan tarifaire</strong> choisi, le nombre d&apos;Employés gérés, la durée de l&apos;engagement (mensuelle ou annuelle) et le montant en FCFA/XOF. Les Plans disponibles sont :
          </p>
          <ul>
            <li><strong>Démarrage</strong> : accès aux fonctionnalités essentielles du SIRH</li>
            <li><strong>Professionnel</strong> : modules avancés + accès étendu aux Agents IA</li>
            <li><strong>Entreprise</strong> : suite complète + SLA renforcé + accompagnement dédié</li>
            <li><strong>Entreprise Plus</strong> : accès à l&apos;ensemble des modules + personnalisations + DPO assistance</li>
          </ul>
          <p>
            Le détail des fonctionnalités et la grille tarifaire en vigueur figurent sur le site <a href="https://targetym.ai">targetym.ai</a> ou dans la proposition commerciale remise au Client. Tout dépassement du nombre d&apos;Employés contractuellement prévu donnera lieu à une facturation complémentaire au tarif en vigueur.
          </p>

          <h2>Article 4 - Durée d&apos;engagement</h2>
          <p>
            Le Contrat prend effet à la date de signature du Bon de Commande ou à la fin de la période d&apos;essai, pour la durée convenue (mensuelle ou annuelle). À l&apos;échéance, il se <strong>renouvelle tacitement</strong> pour une durée équivalente, sauf dénonciation par l&apos;une des Parties dans les conditions prévues à l&apos;article 14.
          </p>

          <h2>Article 5 - Hébergement, Sécurité et Souveraineté des données</h2>
          <p>
            La Plateforme est hébergée sur des infrastructures certifiées <strong>SOC 2 Type II</strong>, avec des mesures de sécurité techniques comprenant TLS 1.3+, AES-256, MFA, RBAC, journaux d&apos;audit et tests d&apos;intrusion annuels. La Société privilégie un hébergement en Afrique de l&apos;Ouest ou dans des zones offrant un niveau de protection équivalent aux exigences de la Loi n°&nbsp;2008-12.
          </p>
          <p>
            En cas de changement de localisation d&apos;hébergement, le Client est notifié avec un préavis de <strong>30 jours</strong> et peut s&apos;y opposer dans un délai de 15 jours.
          </p>

          <h2>Article 6 - Obligations de la Société</h2>
          <h3>6.1 Disponibilité</h3>
          <p>
            La Société garantit un taux de disponibilité mensuelle de <strong>99,5%</strong>, hors maintenances planifiées (notifiées 48h à l&apos;avance) et événements de force majeure. En cas de dépassement, des crédits de service sont accordés selon les modalités du SLA.
          </p>
          <h3>6.2 Support</h3>
          <p>
            La Société fournit un support technique réactif selon le Plan souscrit. Les délais d&apos;intervention (GTI) et de résolution (GTR) sont définis dans le SLA annexé.
          </p>
          <h3>6.3 Agents IA - Principes éthiques</h3>
          <p>Les 30+ Agents IA de TARGETYM AI respectent les principes suivants :</p>
          <ul>
            <li><strong>Transparence</strong> : documentation explicative des critères fournie sur demande</li>
            <li><strong>Non-discrimination</strong> : audits réguliers par tiers indépendant pour détecter les biais</li>
            <li><strong>Supervision humaine</strong> : aucune décision RH à impact significatif n&apos;est entièrement automatisée</li>
            <li><strong>Droit à l&apos;explication</strong> : toute décision assistée par IA peut faire l&apos;objet d&apos;une demande d&apos;explication</li>
          </ul>

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

          <h2>Article 8 - Conditions financières</h2>
          <h3>8.1 Devise et facturation</h3>
          <p>
            Les prix sont exprimés en <strong>FCFA/XOF</strong> pour les Clients de la zone UEMOA. La facturation intervient selon la périodicité convenue (mensuelle ou annuelle), à terme échu ou à terme à échoir selon le Plan.
          </p>
          <h3>8.2 Paiement</h3>
          <p>
            Les factures sont payables dans un délai de <strong>30 jours</strong> à compter de leur émission. Tout retard de paiement entraîne de plein droit l&apos;application de pénalités au taux de <strong>1,5% par mois</strong> sur le montant TTC impayé, ainsi qu&apos;une indemnité forfaitaire de <strong>50 000 FCFA</strong> pour frais de recouvrement.
          </p>
          <h3>8.3 Révision tarifaire</h3>
          <p>
            La Société se réserve le droit de réviser ses tarifs avec un préavis de <strong>60 jours</strong>. En cas de désaccord, le Client peut résilier dans les conditions de l&apos;article 14.
          </p>

          <h2>Article 9 - Propriété intellectuelle</h2>
          <p>
            La souscription confère au Client un droit d&apos;accès non exclusif, non cessible et limité à la durée du Contrat. Toute reproduction, décompilation ou tentative d&apos;ingénierie inverse est formellement interdite. Les données RH saisies par le Client restent <strong>sa propriété exclusive</strong>. La Société ne les utilise jamais pour entraîner ses modèles IA ou les vendre à des tiers.
          </p>

          <h2>Article 10 - Confidentialité</h2>
          <p>
            Chaque Partie s&apos;engage à traiter comme strictement confidentielles les Informations Confidentielles de l&apos;autre Partie pendant toute la durée du Contrat et pour une période de <strong>3 ans</strong> après sa cessation, quelle qu&apos;en soit la cause.
          </p>

          <h2>Article 11 - Responsabilité</h2>
          <p>
            La responsabilité de la Société est plafonnée au montant des sommes effectivement payées par le Client au cours des <strong>12 mois</strong> précédant le fait générateur. La Société ne saurait être tenue responsable des dommages indirects, de la perte de données, de la perte d&apos;exploitation, ni des décisions RH prises sur la base des Outputs des Agents IA. La Société n&apos;est pas responsable des usages non conformes aux présentes CGV.
          </p>

          <h2>Article 12 - Assurance</h2>
          <p>
            La Société déclare être couverte par une assurance Responsabilité Civile Professionnelle (RC Pro) auprès d&apos;un assureur reconnu. Une attestation peut être fournie sur demande écrite.
          </p>

          <h2>Article 13 - Force majeure</h2>
          <p>
            Aucune Partie ne sera responsable d&apos;un manquement causé par un événement de force majeure (catastrophe naturelle, conflit armé, pandémie, décision gouvernementale, cyberattaque d&apos;ampleur nationale). La Partie affectée doit en informer l&apos;autre dans les <strong>48 heures</strong>. Si la force majeure se prolonge au-delà de <strong>60 jours</strong>, chaque Partie peut résilier le Contrat sans indemnité.
          </p>

          <h2>Article 14 - Résiliation</h2>
          <h3>14.1 Résiliation à l&apos;échéance</h3>
          <p>
            Chaque Partie peut s&apos;opposer au renouvellement tacite par notification écrite avec un préavis de <strong>60 jours</strong> avant la date d&apos;échéance.
          </p>
          <h3>14.2 Résiliation pour manquement grave</h3>
          <p>
            En cas de manquement grave non remédié dans un délai de <strong>30 jours</strong> suivant mise en demeure, la Partie non défaillante peut résilier de plein droit.
          </p>
          <h3>14.3 Résiliation immédiate</h3>
          <p>
            La Société peut résilier immédiatement sans indemnité en cas de violation grave des CGV, d&apos;usage illégal de la Plateforme ou de défaut de paiement persistant au-delà de 60 jours après mise en demeure.
          </p>
          <h3>14.4 Portabilité et suppression des données</h3>
          <p>
            En cas de résiliation, le Client peut demander l&apos;export de ses données dans un format standard (CSV ou JSON) dans un délai de <strong>30 jours</strong> suivant la date de fin d&apos;accès. Passé ce délai, la Société procède à la destruction sécurisée et irréversible des données et délivre une <strong>attestation de suppression</strong> sur demande, dans un délai de 15 jours ouvrés.
          </p>

          <h2>Article 15 - Protection des données personnelles et DPA</h2>
          <p>
            Dans le cadre des présentes CGV, le Client agit en qualité de <strong>Responsable de Traitement</strong> et la Société en qualité de <strong>Sous-traitant</strong>, conformément à la Loi n°&nbsp;2008-12 du 25 janvier 2008 sur la Protection des données personnelles au Sénégal. Un DPA (Accord de Traitement des Données) encadrant les obligations respectives est conclu séparément. Les mesures techniques incluent TLS 1.3+, AES-256, MFA, RBAC, journaux d&apos;audit et tests d&apos;intrusion annuels. Conformité SOC 2 Type II certifiée.
          </p>

          <h2>Article 16 - Droit applicable et juridiction</h2>
          <p>
            Les présentes CGV sont régies par le <strong>droit sénégalais</strong>, complété par les Actes uniformes de l&apos;OHADA. En cas de litige, les Parties s&apos;engagent à rechercher une résolution amiable dans un délai de <strong>45 jours</strong> à compter de la notification. À défaut de règlement amiable, les juridictions compétentes du ressort de <strong>Dakar (Sénégal)</strong> seront exclusivement compétentes.
          </p>

          <h2>Article 17 - Cession</h2>
          <p>
            La Société peut céder le présent Contrat à toute entité du même groupe ou dans le cadre d&apos;une opération de fusion-acquisition, avec notification préalable de <strong>30 jours</strong>. Le Client ne peut céder ses droits et obligations sans accord écrit préalable de la Société.
          </p>

          <h2>Article 18 - Dispositions diverses</h2>
          <p>
            Si une clause est déclarée nulle ou inapplicable, les autres dispositions restent en vigueur. La renonciation à se prévaloir d&apos;une clause ne vaut pas renonciation définitive. Les présentes CGV, le Bon de Commande, le DPA, le SLA et le cas échéant la Politique de Vie Privée constituent l&apos;intégralité de l&apos;accord entre les Parties et remplacent tout accord antérieur.
          </p>

          {/* Annexe DPA */}
          <h2>Annexe I - Accord de Traitement des Données (DPA)</h2>
          <p>
            Conformément à la Loi n°&nbsp;2008-12, la Société met en œuvre les mesures suivantes pour le compte du Client Responsable de Traitement :
          </p>
          <ul>
            <li>Chiffrement de toutes les données en transit (TLS 1.3+) et au repos (AES-256)</li>
            <li>Authentification multi-facteurs (MFA) obligatoire pour les accès administrateurs</li>
            <li>Contrôle d&apos;accès granulaire par rôle (RBAC) configurable par le Client</li>
            <li>Journaux d&apos;audit complets conservés 12 mois minimum</li>
            <li>Tests d&apos;intrusion annuels par prestataire indépendant certifié</li>
            <li>Architecture cloisonnée : environnements production / test / développement séparés</li>
            <li>Conformité SOC 2 Type II certifiée par audit tiers indépendant annuel</li>
            <li>Notification de violation de données sous 48 heures au Client et à la CDP si applicable</li>
            <li>Sous-traitants ultérieurs liés par obligations contractuelles équivalentes</li>
            <li>Données des Clients localisées dans des zones conformes à la Loi n°&nbsp;2008-12</li>
          </ul>
          <p>
            Les Parties concluent un DPA séparé et détaillé préalablement à l&apos;activation du service.
          </p>

          {/* Contact */}
          <h2>Contact</h2>
          <p>
            <strong>AGILTYM SARL - Targetym AI</strong><br />
            E-mail : <a href="mailto:support@agiltym.com">support@agiltym.com</a><br />
            Immeuble Bidaness Building, Mermoz VDN, Dakar, Sénégal<br />
            Tél. : +221 76 523 57 94
          </p>
          <p>
            Voir aussi : <a href="/privacy">Politique de Vie Privée</a> - <a href="/terms">Mentions Légales &amp; CGU</a>
          </p>
        </div>
      </section>
    </div>
  );
}
