import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mentions Légales & Conditions Générales d'Utilisation - Targetym AI",
  description: "Mentions légales, CGU du site www.targetym.ai et du logiciel SIRH Targetym AI. Conformité droit sénégalais, OHADA et Loi n°2008-12.",
};

const lastUpdated = 'Avril 2026';

export default function TermsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white pt-16 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 mb-3">TARGETYM AI - AGILTYM SARL</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Mentions Légales & CGU
          </h1>
          <p className="text-gray-500 text-sm">Dernière mise à jour : {lastUpdated} - Droit sénégalais &amp; OHADA</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_li]:text-gray-600 [&_li]:mb-1 [&_a]:text-primary-600 [&_a]:underline [&_strong]:text-gray-800">

          {/* Intro */}
          <p className="text-gray-600 leading-relaxed mb-6 text-base border-l-4 border-primary-400 pl-4 bg-primary-50 py-3 rounded-r-lg">
            Les présentes Conditions Générales d&apos;Utilisation (CGU) définissent le cadre juridique applicable à la consultation du site <strong>www.targetym.ai</strong> et à l&apos;utilisation du logiciel <strong>TARGETYM AI</strong> fourni en mode SaaS, conformément au droit sénégalais, aux Actes uniformes de l&apos;OHADA et à la Loi n°&nbsp;2008-12 du 25 janvier 2008.
          </p>

          {/* ─── IDENTITÉ ─── */}
          <h2>Identité - Mentions Légales</h2>
          <p>
            <strong>Éditeur :</strong> Agiltym, SARL de droit sénégalais, immatriculée au RCCM de Dakar sous le numéro <strong>SN.DKR.2025.B.42427</strong><br />
            <strong>Responsable éditorial :</strong> Marie Reine Cakpo<br />
            <strong>Siège social :</strong> Immeuble Bidaness Building, Mermoz VDN, Dakar, Sénégal<br />
            <strong>Téléphone :</strong> +221 76 523 57 94<br />
            <strong>E-mail :</strong> <a href="mailto:support@agiltym.com">support@agiltym.com</a><br />
            <strong>Site web :</strong> <a href="https://www.targetym.ai/">https://www.targetym.ai/</a>
          </p>
          <p>
            <strong>Marque :</strong> TARGETYM AI est une marque enregistrée auprès de l&apos;<strong>Organisation Africaine de la Propriété Intellectuelle (OAPI)</strong>.
          </p>
          <p>
            <strong>Hébergeur :</strong> Amazon Web Services EMEA SARL - 38 avenue John F. Kennedy, L-1855 Luxembourg
          </p>

          {/* ─── PARTIE I - SITE ─── */}
          <h2>Partie I - Conditions d&apos;utilisation du site internet</h2>

          <h3>Article 1 - Objet du site</h3>
          <p>
            Le site www.targetym.ai a pour objet exclusif de présenter, à titre informatif, la solution TARGETYM AI, ses fonctionnalités, ses cas d&apos;usage, ses offres d&apos;abonnement et de permettre la prise de contact commerciale ou la demande de démonstration. Les contenus publiés ne constituent en aucun cas une offre ferme d&apos;abonnement ni un conseil juridique, fiscal ou professionnel.
          </p>

          <h3>Article 2 - Accès au site</h3>
          <p>
            Le site est accessible gratuitement à tout visiteur disposant d&apos;une connexion internet. Agiltym se réserve le droit de suspendre ou interrompre l&apos;accès à tout moment pour maintenance, mise à jour ou incident technique, sans préavis et sans responsabilité envers les visiteurs.
          </p>

          <h3>Article 3 - Propriété intellectuelle du site</h3>
          <p>
            Le site et l&apos;ensemble de ses composants (textes, graphismes, logos, marques, code source, architecture) sont protégés par les droits de propriété intellectuelle. Toute reproduction, diffusion, extraction ou usage commercial non autorisé est strictement interdit et engage la responsabilité civile et/ou pénale de son auteur.
          </p>

          <h3>Article 4 - Cookies et traceurs</h3>
          <p>
            Le site utilise des cookies strictement nécessaires (fonctionnement, session), des cookies fonctionnels (mémorisation de préférences) et des cookies statistiques (mesure d&apos;audience). Le dépôt de cookies non essentiels est subordonné à votre consentement préalable, conformément à la Loi n°&nbsp;2008-12. Vous pouvez retirer votre consentement à tout moment.
          </p>

          <h3>Article 5 - Limitation de responsabilité (site)</h3>
          <p>
            Agiltym ne saurait être tenue responsable de l&apos;interprétation ou de l&apos;utilisation des informations publiées sur le site, des interruptions ou indisponibilités du site, ni des dommages résultant de l&apos;accès à des sites tiers accessibles via des liens hypertextes.
          </p>

          {/* ─── PARTIE II - LOGICIEL ─── */}
          <h2>Partie II - Conditions d&apos;utilisation du logiciel Targetym AI</h2>

          <h3>Article 6 - Nature du logiciel</h3>
          <p>
            TARGETYM AI est un SIRH de nouvelle génération fourni exclusivement en mode <strong>SaaS</strong>. Aucune installation locale, cession de licence logicielle, ni remise de code source n&apos;est consentie. Le logiciel est régulièrement mis à jour sans surcoût pour les fonctionnalités comprises dans l&apos;abonnement.
          </p>

          <h3>Article 7 - Conditions d&apos;accès</h3>
          <p>
            L&apos;accès est strictement réservé aux Clients ayant souscrit un abonnement valide et à jour de paiement, et aux Utilisateurs expressément autorisés par le Client. Chaque compte est nominatif et ne peut être partagé entre plusieurs personnes. Le Client garantit que chaque Utilisateur a pris connaissance des présentes CGU.
          </p>

          <h3>Article 8 - Comptes Utilisateurs et gestion des accès</h3>
          <p>
            Les identifiants sont personnels, confidentiels et non transférables. Le Client est entièrement responsable des actions réalisées via les comptes de ses Utilisateurs, y compris en cas d&apos;utilisation frauduleuse résultant d&apos;un défaut de sécurisation. Tout accès non autorisé doit être signalé immédiatement.
          </p>

          <h3>Article 9 - Usages interdits</h3>
          <p>Il est strictement interdit de :</p>
          <ul>
            <li>Utiliser le logiciel à des fins illégales, frauduleuses ou contraires à l&apos;ordre public</li>
            <li>Tenter d&apos;accéder à des données pour lesquelles l&apos;Utilisateur ne dispose pas des droits nécessaires</li>
            <li>Décompiler, désassembler ou tenter d&apos;identifier le code source</li>
            <li>Reproduire, revendre ou sous-licencier tout ou partie du logiciel</li>
            <li>Utiliser le logiciel à des fins d&apos;analyse concurrentielle</li>
            <li>Introduire des codes malveillants, virus ou éléments nuisibles</li>
            <li>Effectuer des tests de pénétration sans autorisation écrite préalable</li>
          </ul>

          <h3>Article 10 - Fonctionnalités d&apos;Intelligence Artificielle</h3>
          <p>
            TARGETYM AI intègre plus de <strong>30 Agents IA</strong> d&apos;assistance RH. Ces fonctionnalités constituent exclusivement des <strong>outils d&apos;aide à la décision</strong>. La Société s&apos;engage à ce qu&apos;aucune décision à impact significatif sur un collaborateur (embauche, licenciement, promotion, évaluation) ne soit prise de manière entièrement automatisée, sans intervention humaine validante.
          </p>
          <p>
            Les Agents IA sont régulièrement audités pour détecter et corriger les biais algorithmiques. Le Client reconnaît les limitations inhérentes aux modèles statistiques et s&apos;engage à ne pas prendre de décisions à forts enjeux sur le seul fondement des Outputs IA.
          </p>
          <p>Il est interdit d&apos;utiliser les Agents IA pour mettre en place une surveillance intrusive, générer des profils discriminatoires ou alimenter un système IA concurrent.</p>

          <h3>Article 11 - Données personnelles et protection des données RH</h3>
          <p>
            Dans le cadre de l&apos;utilisation du logiciel, le <strong>Client agit en qualité de Responsable de Traitement</strong> et la Société en qualité de Sous-traitant au sens de la Loi n°&nbsp;2008-12. Un <strong>Accord de Traitement des Données (DPA)</strong> est conclu avec chaque Client préalablement à l&apos;activation du logiciel. La Société met en œuvre un chiffrement de bout en bout (TLS 1.3+, AES-256), un contrôle d&apos;accès RBAC, des journaux d&apos;audit complets et une conformité SOC 2 Type II.
          </p>

          <h3>Article 12 - Modalités financières</h3>
          <p>
            L&apos;accès au logiciel donne lieu au paiement d&apos;un abonnement périodique. Tout retard de paiement peut entraîner la suspension de l&apos;accès après mise en demeure, l&apos;application de pénalités au taux légal en vigueur au Sénégal, et en cas de défaut persistant, la résiliation du contrat.
          </p>

          <h3>Article 13 - Niveaux de service (SLA)</h3>
          <p>
            Agiltym garantit un taux de disponibilité mensuelle de <strong>99,5%</strong>, hors maintenances planifiées (notifiées au moins 48h à l&apos;avance) et cas de force majeure. Les engagements détaillés (délais d&apos;intervention, résolution) sont définis dans le SLA annexé au Contrat SaaS.
          </p>

          <h3>Article 14 - Fin d&apos;accès et réversibilité des données</h3>
          <p>
            À la fin de l&apos;abonnement, l&apos;accès est supprimé. Le Client peut demander l&apos;export de ses données dans un format standard (CSV, JSON) avant la date de fin. Passé 30 jours, Agiltym procède à la suppression sécurisée des données et délivre une attestation de suppression sur demande.
          </p>

          {/* ─── PARTIE III - DISPOSITIONS COMMUNES ─── */}
          <h2>Partie III - Dispositions communes</h2>

          <h3>Article 15 - Propriété intellectuelle du logiciel</h3>
          <p>
            TARGETYM AI, ses composants, algorithmes, bases de données, marques et interfaces sont la propriété exclusive d&apos;Agiltym. La souscription confère un droit d&apos;accès limité, non exclusif, non transférable et révocable pour la durée de l&apos;abonnement. Toute tentative de décompilation ou d&apos;ingénierie inverse constitue une violation grave.
          </p>

          <h3>Article 16 - Confidentialité</h3>
          <p>
            Chaque Partie s&apos;engage à traiter comme strictement confidentielles toutes les Informations Confidentielles de l&apos;autre Partie pendant toute la durée du Contrat SaaS et pour une période de <strong>5 ans</strong> après son expiration ou sa résiliation.
          </p>

          <h3>Article 17 - Limitation de responsabilité (logiciel)</h3>
          <p>
            La responsabilité d&apos;Agiltym est en tout état de cause plafonnée au montant des sommes versées par le Client au cours des <strong>12 mois</strong> précédant le fait générateur. Agiltym n&apos;est pas responsable des dommages indirects, de la perte d&apos;exploitation, de la perte de données, ni des décisions RH prises sur la base des Outputs IA.
          </p>

          <h3>Article 18 - Force majeure</h3>
          <p>
            Aucune Partie ne pourra être tenue responsable d&apos;un manquement résultant d&apos;un événement de force majeure. Si l&apos;événement excède 30 jours consécutifs, chaque Partie peut résilier le Contrat sans indemnité.
          </p>

          <h3>Article 19 - Résiliation</h3>
          <p>
            <strong>Résiliation à l&apos;échéance</strong> : possible avec un préavis écrit de 15 jours dans les conditions prévues au Contrat SaaS.<br />
            <strong>Résiliation pour manquement grave</strong> : après mise en demeure restée infructueuse 15 jours, la Partie non défaillante peut résilier de plein droit.<br />
            <strong>Résiliation immédiate</strong> par Agiltym possible en cas de violation grave des CGU, usage illégal ou défaut de paiement persistant au-delà de 60 jours.
          </p>

          <h3>Article 20 - Modifications des CGU</h3>
          <p>
            Agiltym se réserve le droit de modifier les présentes CGU. Toute modification substantielle est notifiée aux Clients actifs avec un préavis minimum de <strong>30 jours</strong>. La poursuite de l&apos;utilisation vaut acceptation. L&apos;historique des versions antérieures est accessible sur le site.
          </p>

          <h3>Article 21 - Droit applicable et juridiction compétente</h3>
          <p>
            Les présentes CGU sont régies par le <strong>droit sénégalais</strong>, complété par les Actes uniformes de l&apos;OHADA. En cas de litige, les Parties s&apos;engagent à une résolution amiable dans un délai de 30 jours. À défaut, les juridictions compétentes du ressort de <strong>Dakar (Sénégal)</strong> seront exclusivement compétentes.
          </p>

          <h3>Article 22 - Divisibilité et intégralité de l&apos;accord</h3>
          <p>
            Si une clause est déclarée nulle, les autres restent en vigueur. Les présentes CGU, conjointement avec le Contrat SaaS, le DPA et le SLA, constituent l&apos;intégralité de l&apos;accord entre les Parties.
          </p>

          {/* Contact */}
          <h2>Contact</h2>
          <p>
            <strong>AGILTYM SARL - Targetym AI</strong><br />
            E-mail juridique : <a href="mailto:support@agiltym.com">support@agiltym.com</a><br />
            Immeuble Bidaness Building, Mermoz VDN, Dakar, Sénégal<br />
            Tél. : +221 76 523 57 94
          </p>
          <p>
            Voir aussi : <a href="/privacy">Politique de Vie Privée</a> - <a href="/cgv">Conditions Générales de Vente (CGV)</a>
          </p>
        </div>
      </section>
    </div>
  );
}
