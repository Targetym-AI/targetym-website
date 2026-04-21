import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de Protection de la Vie Privée — Targetym AI',
  description: "Politique de confidentialité de Targetym AI. Conditions dans lesquelles AGILTYM SARL collecte, traite, conserve et protège vos données personnelles, conformément à la Loi n°2008-12 du Sénégal.",
};

const lastUpdated = 'Avril 2026';

export default function PrivacyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white pt-16 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 mb-3">TARGETYM AI — Le SIRH optimisé IA qui fait 50% du travail du DRH</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Politique de Protection de la Vie Privée
          </h1>
          <p className="text-gray-500 text-sm">Dernière mise à jour : {lastUpdated} — Conformité Loi n°2008-12 du Sénégal</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:text-gray-600 [&_li]:mb-1 [&_a]:text-primary-600 [&_a]:underline [&_strong]:text-gray-800">

          {/* Introduction */}
          <p className="text-gray-600 leading-relaxed mb-6 text-base border-l-4 border-primary-400 pl-4 bg-primary-50 py-3 rounded-r-lg">
            La présente Politique a pour objet d&apos;informer toute personne visitant le site www.targetym.ai ou utilisant la plateforme Targetym AI des conditions dans lesquelles <strong>AGILTYM SARL</strong> collecte, traite, conserve et protège ses données à caractère personnel, conformément à la <strong>Loi n°&nbsp;2008-12 du 25 janvier 2008</strong> sur la Protection des données personnelles au Sénégal, sous le contrôle de la <strong>Commission de Protection des Données Personnelles (CDP)</strong>.
          </p>

          <h2>Article 1 — Qui traite vos données ?</h2>
          <p>
            Le responsable du traitement est :<br />
            <strong>AGILTYM SARL</strong> — RCCM Dakar n°&nbsp;SN.DKR.2025.B.42427<br />
            Immeuble Bidaness Building, Mermoz VDN, 1er étage, Dakar, Sénégal<br />
            Tél. : +221 76 523 57 94 — E-mail : <a href="mailto:support@agiltym.com">support@agiltym.com</a><br />
            DPO : <a href="mailto:privacy@targetym.ai">privacy@targetym.ai</a>
          </p>

          <h2>Article 2 — Quelles données collectons-nous et pourquoi ?</h2>
          <h3>2.1 Données collectées sur le site www.targetym.ai</h3>
          <p>Lors de votre navigation ou de votre inscription à un essai gratuit, nous collectons : nom, prénom, e-mail, téléphone, nom de l&apos;entreprise, secteur, taille de l&apos;organisation, messages envoyés via les formulaires de contact et données de navigation (adresse IP, navigateur, pages visitées).</p>

          <h3>2.2 Données traitées dans le cadre de la Plateforme SIRH (en qualité de Sous-traitant)</h3>
          <p>
            Dans le cadre de l&apos;utilisation de la Plateforme par les Clients (employeurs), Targetym AI traite les données RH de leurs Employés <strong>uniquement sur instruction du Client</strong>. Ces données comprennent : identité et coordonnées, poste et département, rémunération et historique salarial, évaluations de performance, congés et absences, données de formation, et tout élément nécessaire aux fonctionnalités souscrites.
          </p>
          <p>La collecte et le traitement de ces données sont effectués sous la responsabilité exclusive du Client, qui doit en informer ses Employés conformément à la Loi n°&nbsp;2008-12.</p>

          <h2>Article 3 — Bases légales des traitements</h2>
          <p>Targetym AI fonde ses traitements sur les bases suivantes :</p>
          <ul>
            <li><strong>Exécution du contrat</strong> : fourniture des services souscrits, gestion des abonnements</li>
            <li><strong>Consentement</strong> : cookies non essentiels, communications marketing (retrait possible à tout moment)</li>
            <li><strong>Intérêt légitime</strong> : amélioration du produit, sécurité, prévention des fraudes</li>
            <li><strong>Obligation légale</strong> : conservation des données fiscales et comptables</li>
          </ul>

          <h2>Article 4 — Intelligence Artificielle et données personnelles</h2>
          <p>Targetym AI intègre plus de <strong>30 agents d&apos;intelligence artificielle</strong> spécialisés. La Société s&apos;engage à respecter les principes suivants :</p>
          <ul>
            <li><strong>Finalité limitée</strong> : chaque Agent IA n&apos;accède qu&apos;aux données strictement nécessaires à sa mission</li>
            <li><strong>Transparence algorithmique</strong> : documentation explicative des critères de chaque Agent IA fournie sur demande</li>
            <li><strong>Supervision humaine obligatoire</strong> : aucune décision RH à impact significatif (licenciement, évaluation défavorable, promotion) ne résulte exclusivement d&apos;un Agent IA</li>
            <li><strong>Non-discrimination</strong> : les modèles IA sont régulièrement audités par des tiers indépendants pour détecter et corriger tout biais algorithmique</li>
            <li><strong>Droit à l&apos;explication</strong> : tout Employé concerné par une décision assistée par IA peut en demander l&apos;explication</li>
            <li><strong>Vos données ne servent pas à entraîner nos modèles</strong> : les données RH des Clients ne sont jamais utilisées pour entraîner des modèles IA tiers</li>
          </ul>
          <p>Conformément aux articles 26 à 38 de la Loi n°&nbsp;2008-12, les Agents IA produisent des recommandations et analyses — <strong>jamais des décisions définitives autonomes</strong>.</p>

          <h2>Article 5 — Durée de conservation</h2>
          <p>Targetym AI applique le principe de minimisation de la durée de conservation :</p>
          <ul>
            <li><strong>Données de compte actif</strong> : pendant toute la durée de la relation contractuelle</li>
            <li><strong>Données après résiliation</strong> : 30 jours pour export, puis suppression sécurisée</li>
            <li><strong>Journaux de connexion</strong> : 12 mois minimum</li>
            <li><strong>Données de facturation</strong> : durée légale applicable (droit OHADA)</li>
            <li><strong>Données de prospection</strong> : 3 ans après le dernier contact</li>
          </ul>
          <p>À l&apos;expiration de ces délais, les données sont supprimées de façon sécurisée et irréversible ou anonymisées à des fins statistiques agrégées.</p>

          <h2>Article 6 — Qui accède à vos données ?</h2>
          <h3>6.1 Au sein d&apos;AGILTYM SARL</h3>
          <p>L&apos;accès est strictement limité aux collaborateurs ayant besoin d&apos;y accéder dans l&apos;exercice de leurs fonctions, soumis à des obligations de confidentialité contractuelles. Chaque accès est journalisé.</p>

          <h3>6.2 Sous-traitants techniques</h3>
          <p>Des prestataires techniques (hébergement, sécurité, messagerie) peuvent avoir accès aux données. Ils sont contractuellement tenus de respecter des obligations de confidentialité équivalentes et <strong>ne peuvent utiliser vos données pour leurs propres finalités</strong>. La liste des sous-traitants principaux est disponible sur demande à <a href="mailto:Compliance@agiltym.com">Compliance@agiltym.com</a>. Tout changement de sous-traitant est notifié au Client avec un préavis de 14 jours.</p>

          <h3>6.3 Ce que nous ne faisons jamais</h3>
          <ul>
            <li>Nous ne vendons jamais vos données à des tiers</li>
            <li>Nous ne partageons jamais vos données avec des annonceurs publicitaires</li>
            <li>Nous n&apos;utilisons jamais vos données pour entraîner des modèles d&apos;IA externes</li>
            <li>Nous ne transférons jamais vos données sans cadre juridique approprié</li>
          </ul>

          <h2>Article 7 — Transferts de données hors du Sénégal</h2>
          <p>
            Targetym AI privilégie un hébergement en Afrique de l&apos;Ouest ou dans des zones offrant un niveau de protection équivalent aux exigences de la Loi n°&nbsp;2008-12. Lorsque des transferts vers des pays tiers sont nécessaires, la Société s&apos;assure que ces transferts sont encadrés par des garanties contractuelles appropriées et autorisés par la CDP conformément aux articles 49 à 51 de la Loi n°&nbsp;2008-12.
          </p>
          <p>En cas de modification des destinations d&apos;hébergement, les Clients sont notifiés avec un préavis de 30 jours.</p>

          <h2>Article 8 — Cookies et traceurs</h2>
          <p>Targetym AI utilise les catégories de cookies suivantes :</p>
          <ul>
            <li><strong>Cookies strictement nécessaires</strong> : fonctionnement du site, authentification — ne peuvent être refusés</li>
            <li><strong>Cookies fonctionnels</strong> : mémorisation de vos préférences de navigation</li>
            <li><strong>Cookies statistiques et analytiques</strong> : mesure d&apos;audience (ex. Google Analytics)</li>
          </ul>
          <p>Le dépôt de cookies non essentiels est subordonné à votre consentement, recueilli lors de votre première visite. Vous pouvez retirer votre consentement à tout moment via le lien &laquo;&nbsp;Gérer mes cookies&nbsp;&raquo; en bas du site.</p>

          <h2>Article 9 — Vos droits sur vos données personnelles</h2>
          <p>Conformément aux articles 26 à 38 de la Loi n°&nbsp;2008-12, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d&apos;accès</strong> : obtenir une copie de vos données personnelles traitées</li>
            <li><strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes</li>
            <li><strong>Droit d&apos;opposition</strong> : vous opposer à certains traitements</li>
            <li><strong>Droit d&apos;effacement</strong> : demander la suppression de vos données</li>
            <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
            <li><strong>Droit de ne pas faire l&apos;objet d&apos;une décision entièrement automatisée</strong> : particulièrement pertinent dans le contexte des Agents IA</li>
          </ul>
          <h3>9.1 Comment exercer vos droits ?</h3>
          <p>
            Par e-mail : <a href="mailto:privacy@targetym.ai">privacy@targetym.ai</a> (réponse garantie sous 30 jours)<br />
            Par courrier : AGILTYM SARL — À l&apos;attention du DPO — Bidaness Building, Mermoz VDN, 1er étage, Dakar, Sénégal
          </p>
          <p>Nous pourrons vous demander de justifier de votre identité. En cas de demande complexe, le délai de réponse peut être prolongé de 30 jours supplémentaires avec information motivée.</p>
          <h3>9.2 Droit de saisir la CDP</h3>
          <p>Si vous estimez que vos droits ne sont pas respectés après avoir contacté la Société, vous avez le droit de déposer une réclamation auprès de la <strong>Commission de Protection des Données Personnelles (CDP)</strong> du Sénégal — site : <a href="https://www.cdp.sn" target="_blank" rel="noopener noreferrer">www.cdp.sn</a>.</p>

          <h2>Article 10 — Comment protégeons-nous vos données ?</h2>
          <h3>10.1 Mesures techniques</h3>
          <ul>
            <li>Chiffrement de bout en bout : TLS 1.3+ en transit, AES-256 au repos</li>
            <li>Authentification multi-facteurs (MFA) obligatoire pour les accès administrateurs</li>
            <li>Contrôle d&apos;accès granulaire par rôle (RBAC) configurable par le Client</li>
            <li>Journaux d&apos;audit complets conservés 12 mois minimum</li>
            <li>Tests d&apos;intrusion annuels par prestataire indépendant certifié</li>
            <li>Architecture cloisonnée : environnements production / test / développement strictement séparés</li>
          </ul>
          <h3>10.2 Mesures organisationnelles</h3>
          <ul>
            <li>Formation obligatoire à la sécurité des données pour l&apos;ensemble du personnel</li>
            <li>Politique de &laquo;&nbsp;besoin d&apos;en connaître&nbsp;&raquo; : accès limité aux personnes qui en ont besoin</li>
            <li>Plan de reprise d&apos;activité (PRA) et plan de continuité (PCA) testés semestriellement</li>
            <li>Conformité SOC 2 Type II certifiée par audit tiers indépendant</li>
            <li>Disponibilité garantie à 99,5% mensuel</li>
          </ul>
          <h3>10.3 En cas de violation de données</h3>
          <p>En cas de violation susceptible d&apos;engendrer un risque, la Société s&apos;engage à notifier le Client sous 48 heures et la CDP selon les délais imposés par la Loi n°&nbsp;2008-12, en précisant la nature de la violation, les données concernées et les mesures prises.</p>

          <h2>Article 11 — Personnes mineures</h2>
          <p>
            Le site et la Plateforme sont exclusivement destinés à des professionnels et entreprises. La Société ne collecte pas sciemment de données concernant des mineurs de moins de 18 ans. Si vous en avez connaissance, contactez-nous à <a href="mailto:privacy@targetym.ai">privacy@targetym.ai</a>.
          </p>

          <h2>Article 12 — Liens vers des sites tiers</h2>
          <p>Le site www.targetym.ai peut contenir des liens vers des sites tiers. La présente Politique ne s&apos;applique pas à ces sites. La Société n&apos;est pas responsable de leurs pratiques de confidentialité.</p>

          <h2>Article 13 — Modifications de la Politique</h2>
          <p>
            La Société se réserve le droit de modifier la présente Politique. En cas de modification substantielle, les Clients sont notifiés par e-mail au moins <strong>30 jours</strong> avant l&apos;entrée en vigueur. La version en vigueur est toujours accessible sur <a href="https://targetym.ai/privacy">targetym.ai/privacy</a>.
          </p>

          <h2>Article 14 — Nous contacter</h2>
          <p>
            <strong>AGILTYM SARL — Targetym AI</strong><br />
            DPO : <a href="mailto:privacy@targetym.ai">privacy@targetym.ai</a><br />
            Immeuble Bidaness Building, Mermoz VDN, 1er étage, Dakar, Sénégal<br />
            Tél. : +221 76 523 57 94
          </p>
        </div>
      </section>
    </div>
  );
}
