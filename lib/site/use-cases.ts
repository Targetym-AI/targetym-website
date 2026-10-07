/* Targetym AI — les cas d'usage, une seule source (reprise de prototype/v3/use-cases-data.js).
   Texte brut : les espaces insécables de la typographie française sont posés au rendu par fr().
   Dans les étapes, [libellé](https://…) devient un lien (un produit du groupe, par exemple).
   Chiffres et situations : des exemples, à valider. */

export type FamilyKey = 'recrutement' | 'administration' | 'performance' | 'talents' | 'paie' | 'pilotage' | 'conformite' | 'agent';
export type RoleKey = 'drh' | 'manager' | 'collab' | 'direction' | 'all';

export interface Family {
  key: FamilyKey;
  n: string;
  name: string;
  sub: string;
  tint: string;
  shot: string;
}

export interface UseCase {
  id: string;
  fam: FamilyKey;
  role: RoleKey;
  module: string;
  short: string;
  img: string;
  panel: string;
  title: string;
  h1: [string, string];
  situation: string;
  story: string;
  steps: string[];
  you: string;
  before: string;
  after: string;
  gain: string;
  pains: string[];
  gains: string[];
  features: string[];
}

export const families: Family[] = [
  {
    "key": "recrutement",
    "n": "01",
    "name": "Recrutement & onboarding",
    "sub": "du premier CV au premier jour",
    "tint": "#0c1d1a",
    "shot": "/img/modules/recrutement.jpg"
  },
  {
    "key": "administration",
    "n": "02",
    "name": "Administration RH",
    "sub": "dossiers, congés, documents et budget",
    "tint": "#0e2825",
    "shot": "/img/modules/conges.jpg"
  },
  {
    "key": "performance",
    "n": "03",
    "name": "Performance & OKR",
    "sub": "des objectifs suivis toute l'année",
    "tint": "#0f3330",
    "shot": "/img/modules/performance.jpg"
  },
  {
    "key": "talents",
    "n": "04",
    "name": "Talents & formation",
    "sub": "faire grandir chacun",
    "tint": "#0e3e3b",
    "shot": "/img/modules/talents.jpg"
  },
  {
    "key": "paie",
    "n": "05",
    "name": "Paie & rémunération",
    "sub": "multi-pays, sans ressaisie",
    "tint": "#0c4a47",
    "shot": "/img/modules/paie.jpg"
  },
  {
    "key": "pilotage",
    "n": "06",
    "name": "Pilotage RH",
    "sub": "décider sur des chiffres",
    "tint": "#095a58",
    "shot": "/img/modules/analytics.jpg"
  },
  {
    "key": "conformite",
    "n": "07",
    "name": "Conformité & départs",
    "sub": "chaque étape dans les règles",
    "tint": "#066c6c",
    "shot": "/img/modules/departs.jpg"
  },
  {
    "key": "agent",
    "n": "IA",
    "name": "Le super-agent IA",
    "sub": "un cas d'usage à lui tout seul",
    "tint": "#0c1d1a",
    "shot": "/img/tour/copilote.jpg"
  }
];

export const roles: Record<RoleKey, { tag: string; who: string }> = {
  "drh": {
    "tag": "DRH",
    "who": "DRH et équipes RH"
  },
  "manager": {
    "tag": "Manager",
    "who": "Managers"
  },
  "collab": {
    "tag": "Collaborateur",
    "who": "Collaborateurs"
  },
  "direction": {
    "tag": "Direction",
    "who": "Direction générale"
  },
  "all": {
    "tag": "Tous",
    "who": "DRH, managers, collaborateurs"
  }
};

export const cases: UseCase[] = [
  {
    "id": "recrutement",
    "fam": "recrutement",
    "role": "drh",
    "module": "Recrutement",
    "short": "Recrutement",
    "img": "/img/modules/recrutement.jpg",
    "panel": "/solutions#m-recrutement-0",
    "title": "Trier 500 candidatures en une matinée",
    "h1": [
      "Trier 500 candidatures",
      "en une matinée"
    ],
    "situation": "L'offre de chef de projet a reçu 500 CV en dix jours.",
    "story": "Une offre publiée sur cinq sites reçoit 500 candidatures en dix jours. Le module les lit, les note sur la fiche de poste et vous remet les quinze profils à rencontrer.",
    "steps": [
      "Diffuse l'offre sur [Intowork](https://www.intowork.co/), les autres jobboards, LinkedIn et votre page carrière, en une fois.",
      "Centralise les candidatures dans un pipeline visuel, doublons écartés.",
      "Note chaque CV sur les critères de la fiche de poste et motive chaque refus."
    ],
    "you": "Recevez les quinze profils à rencontrer et calez les entretiens depuis le pipeline.",
    "before": "3 jours de tri",
    "after": "1 matinée",
    "gain": "2,5 jours gagnés par offre",
    "pains": [
      "Trois jours à ouvrir des CV un par un",
      "Des doublons et des candidatures perdues dans la boîte mail",
      "Des refus envoyés sans motif, ou jamais envoyés"
    ],
    "gains": [
      "Une matinée pour relire la sélection",
      "Un pipeline unique, partagé avec les managers",
      "Chaque candidat informé, avec un motif clair"
    ],
    "features": [
      "Offres multi-canaux",
      "Scoring IA des candidats",
      "Pipeline visuel",
      "Grilles collaboratives",
      "Onboarding structuré"
    ]
  },
  {
    "id": "onboarding",
    "fam": "recrutement",
    "role": "manager",
    "module": "Onboarding",
    "short": "Onboarding",
    "img": "/img/mod-1a.jpg",
    "panel": "/solutions#m-recrutement-0",
    "title": "Un contrat, un poste et un parcours prêts pour J+1",
    "h1": [
      "Un contrat, un poste et un parcours",
      "prêts pour J+1"
    ],
    "situation": "La candidate a dit oui hier soir.",
    "story": "Aminata a accepté l'offre hier soir. Le lendemain matin, son contrat attend votre signature, son matériel est commandé et son parcours d'intégration est prêt.",
    "steps": [
      "Génère le contrat depuis l'offre acceptée, avec la grille et la convention.",
      "Crée le dossier, la demande de matériel et les accès du premier jour.",
      "Prépare le parcours d'intégration, prévient l'équipe et propose un parrain."
    ],
    "you": "Signez le contrat et accueillez la personne.",
    "before": "2 semaines de préparation",
    "after": "prêt le lendemain",
    "gain": "0 ressaisie",
    "pains": [
      "Deux semaines de relances entre RH, IT et manager",
      "Un contrat ressaisi à la main depuis l'offre",
      "Un premier jour sans poste ni accès"
    ],
    "gains": [
      "Tout est prêt le lendemain de l'accord",
      "Aucune ressaisie entre l'offre, le contrat et le dossier",
      "Un premier jour qui donne envie de rester"
    ],
    "features": [
      "Onboarding structuré",
      "Contrat généré depuis l'offre",
      "Parcours d'intégration",
      "Demandes de matériel et d'accès",
      "Suivi du premier mois"
    ]
  },
  {
    "id": "personnel",
    "fam": "administration",
    "role": "manager",
    "module": "Gestion du personnel",
    "short": "Gestion du personnel",
    "img": "/img/modules/personnel.jpg",
    "panel": "/solutions#m-administration-0",
    "title": "Aucune fin de période d'essai ne passe inaperçue",
    "h1": [
      "Aucune fin de période d'essai",
      "ne passe inaperçue"
    ],
    "situation": "Trois périodes d'essai se terminent ce mois-ci, dans trois équipes.",
    "story": "Trois périodes d'essai se terminent ce mois-ci, dans trois équipes différentes. Chaque manager est alerté quinze jours avant, avec une évaluation déjà pré-remplie.",
    "steps": [
      "Tient à jour le dossier de chaque collaborateur : contrat, poste, pièces.",
      "Suit les échéances d'essai, de CDD et de renouvellement dans un seul échéancier.",
      "Alerte le manager quinze jours avant, évaluation pré-remplie."
    ],
    "you": "Confirmez, prolongez ou mettez fin, en un choix.",
    "before": "des échéances sur un tableur",
    "after": "0 échéance manquée",
    "gain": "Alerte à J−15",
    "pains": [
      "Des échéances suivies sur un tableur",
      "Une période d'essai dépassée qui vaut embauche",
      "Des managers prévenus la veille, ou pas du tout"
    ],
    "gains": [
      "Aucune échéance manquée",
      "Une alerte à J−15, chez le bon manager",
      "Une décision prise à temps, tracée dans le dossier"
    ],
    "features": [
      "Dossiers collaborateurs complets",
      "Organigramme dynamique",
      "Suivi des contrats et échéances",
      "Import CSV / Excel",
      "Gestion multi-sites"
    ]
  },
  {
    "id": "conges",
    "fam": "administration",
    "role": "manager",
    "module": "Congés & absences",
    "short": "Congés & absences",
    "img": "/img/modules/conges.jpg",
    "panel": "/solutions#m-administration-1",
    "title": "Un congé validé en un geste, le solde à jour partout",
    "h1": [
      "Un congé validé en un geste,",
      "le solde à jour partout"
    ],
    "situation": "Moussa demande cinq jours en mai depuis son téléphone.",
    "story": "Moussa demande cinq jours en mai depuis son téléphone. Avant même que son manager ouvre la notification, le solde, la convention et le planning de l'équipe sont vérifiés.",
    "steps": [
      "Vérifie le solde et les règles de la convention collective.",
      "Montre les absences déjà posées dans l'équipe sur ces dates.",
      "Route la demande au bon valideur, et relance s'il le faut."
    ],
    "you": "Validez d'un geste, depuis l'app. Le solde est à jour partout.",
    "before": "4 e-mails et 2 jours",
    "after": "1 notification, 1 minute",
    "gain": "Solde recalculé aussitôt",
    "pains": [
      "Quatre e-mails et deux jours d'attente",
      "Un solde recalculé à la main dans un tableur",
      "Deux absences qui se chevauchent sans que personne ne le voie"
    ],
    "gains": [
      "Une notification, une minute",
      "Le solde recalculé aussitôt, en paie comme dans l'app",
      "Le calendrier de l'équipe sous les yeux au moment de valider"
    ],
    "features": [
      "Demandes en un clic",
      "Validation multi-niveaux",
      "Calendrier d'équipe",
      "Soldes temps réel",
      "Rapports d'absentéisme"
    ]
  },
  {
    "id": "documents",
    "fam": "administration",
    "role": "collab",
    "module": "Documents RH",
    "short": "Documents RH",
    "img": "/img/modules/documents.jpg",
    "panel": "/solutions#m-administration-2",
    "title": "Une attestation de travail signée en 30 secondes",
    "h1": [
      "Une attestation de travail",
      "signée en 30 secondes"
    ],
    "situation": "Aminata a besoin d'une attestation pour sa banque.",
    "story": "Aminata a besoin d'une attestation de travail pour sa banque. Elle la demande dans l'app à 9 h 02 ; à 9 h 03, le document signé est dans son espace.",
    "steps": [
      "Génère l'attestation depuis le dossier : poste, date d'entrée, salaire.",
      "La fait signer électroniquement par la personne habilitée.",
      "La dépose dans l'espace d'Aminata et l'archive dans son dossier."
    ],
    "you": "Rien, ou un clic pour valider si vous l'avez demandé.",
    "before": "48 h",
    "after": "30 s",
    "gain": "Signature électronique",
    "pains": [
      "Quarante-huit heures entre la demande et le document",
      "Un modèle Word recopié à la main",
      "Des copies éparpillées entre e-mails et classeurs"
    ],
    "gains": [
      "Trente secondes, signature comprise",
      "Des modèles à vos couleurs, toujours à jour",
      "Chaque document archivé dans le bon dossier"
    ],
    "features": [
      "Attestations automatiques",
      "Certificats de travail",
      "Modèles personnalisables",
      "Signature électronique",
      "Archivage sécurisé"
    ]
  },
  {
    "id": "budget",
    "fam": "administration",
    "role": "direction",
    "module": "Budget RH",
    "short": "Budget RH",
    "img": "/img/modules/budget-rh.jpg",
    "panel": "/solutions#m-administration-3",
    "title": "La masse salariale prévue et réalisée, sans ressaisie",
    "h1": [
      "La masse salariale prévue et réalisée,",
      "sans ressaisie"
    ],
    "situation": "Fin de mois : la direction veut l'écart budget / réalisé par service.",
    "story": "Fin de mois : la direction veut l'écart entre budget et réalisé, service par service. Le chiffre est déjà là, rapproché de la paie, et chaque écart est expliqué.",
    "steps": [
      "Reçoit le budget saisi par catégorie et par service.",
      "Le rapproche automatiquement du réalisé de chaque run de paie.",
      "Signale les écarts de plus de 5 % avec leur explication."
    ],
    "you": "Arbitrez, l'écart déjà expliqué.",
    "before": "2 jours de consolidation",
    "after": "en temps réel",
    "gain": "Écarts expliqués",
    "pains": [
      "Deux jours de consolidation entre paie et tableurs",
      "Des écarts découverts trop tard pour agir",
      "Des chiffres différents selon qui les a calculés"
    ],
    "gains": [
      "Budget et réalisé comparés en temps réel",
      "Chaque écart signalé et expliqué",
      "Un seul chiffre, partagé par la RH et la finance"
    ],
    "features": [
      "Saisie budgétaire par catégorie",
      "Pilotage budget vs réalisé",
      "Nomenclature NRG standard",
      "Analyse par collaborateur",
      "Verrouillage et export"
    ]
  },
  {
    "id": "performance",
    "fam": "performance",
    "role": "manager",
    "module": "Performance & feedback",
    "short": "Performance & feedback",
    "img": "/img/modules/performance.jpg",
    "panel": "/solutions#m-performance-0",
    "title": "Une campagne d'entretiens qui se lance et se relance seule",
    "h1": [
      "Une campagne d'entretiens",
      "qui se lance et se relance seule"
    ],
    "situation": "Les entretiens annuels démarrent le 1er du mois.",
    "story": "Les entretiens annuels démarrent le 1er du mois pour 48 collaborateurs. Grilles envoyées, auto-évaluations collectées, retardataires relancés : il ne reste que les entretiens.",
    "steps": [
      "Lance la campagne avec vos grilles et le calendrier de chaque équipe.",
      "Collecte les auto-évaluations et relance les retardataires.",
      "Synthétise les tendances par équipe pour la revue des talents."
    ],
    "you": "Menez l'entretien, l'auto-évaluation déjà sous les yeux.",
    "before": "6 semaines de campagne",
    "after": "3 semaines, 100 % tenus",
    "gain": "Relances automatiques",
    "pains": [
      "Six semaines de campagne et de relances par e-mail",
      "Des grilles perdues ou remplies à la dernière minute",
      "Aucune vue d'ensemble avant la fin de la campagne"
    ],
    "gains": [
      "Trois semaines, tous les entretiens tenus",
      "Des relances qui partent toutes seules",
      "Les tendances par équipe dès la clôture"
    ],
    "features": [
      "Évaluations 360°",
      "Campagnes automatisées",
      "Entretiens one-on-one",
      "Calibrage des notes",
      "Feedback continu"
    ]
  },
  {
    "id": "okr",
    "fam": "performance",
    "role": "direction",
    "module": "OKR & objectifs",
    "short": "OKR & objectifs",
    "img": "/img/modules/okr.jpg",
    "panel": "/solutions#m-performance-1",
    "title": "Les objectifs à risque repérés avant la revue trimestrielle",
    "h1": [
      "Les objectifs à risque repérés",
      "avant la revue trimestrielle"
    ],
    "situation": "À mi-trimestre, deux résultats clés n'avancent plus.",
    "story": "À mi-trimestre, deux résultats clés n'avancent plus. Leurs responsables le savent trois semaines avant la revue, avec une action corrective proposée.",
    "steps": [
      "Aligne les objectifs en cascade, de la direction à chaque équipe.",
      "Suit l'avancement des résultats clés en continu.",
      "Alerte sur ceux qui décrochent et propose une action."
    ],
    "you": "Décidez de recadrer ou de réaffecter, avant la revue.",
    "before": "constaté en revue",
    "after": "3 semaines d'avance",
    "gain": "Alerte à mi-parcours",
    "pains": [
      "Des retards découverts le jour de la revue",
      "Des OKR mis à jour une fois par trimestre",
      "Aucun lien entre objectifs et entretiens"
    ],
    "gains": [
      "Trois semaines d'avance pour corriger",
      "Un avancement suivi en continu",
      "Des objectifs repris dans les entretiens de performance"
    ],
    "features": [
      "OKR en cascade",
      "Suivi temps réel des KR",
      "Daily checklist connectée",
      "Tableaux de bord visuels",
      "Alertes sur les écarts"
    ]
  },
  {
    "id": "talents",
    "fam": "talents",
    "role": "drh",
    "module": "Gestion des talents",
    "short": "Gestion des talents",
    "img": "/img/modules/talents.jpg",
    "panel": "/solutions#m-talents-0",
    "title": "Un plan de succession pour chaque poste clé",
    "h1": [
      "Un plan de succession",
      "pour chaque poste clé"
    ],
    "situation": "Le directeur financier annonce son départ dans six mois.",
    "story": "Le directeur financier annonce son départ dans six mois. La matrice 9-Box montre déjà qui pourrait reprendre le poste, et ce qu'il leur manque.",
    "steps": [
      "Alimente la matrice 9-Box avec les évaluations de performance.",
      "Tient un plan de succession pour chaque poste clé.",
      "Repère les hauts potentiels et les postes sans relève."
    ],
    "you": "Validez les successeurs pressentis et leur plan de développement.",
    "before": "une revue annuelle sur PowerPoint",
    "after": "à jour en continu",
    "gain": "Matrice 9-Box",
    "pains": [
      "Une revue des talents annuelle, sur PowerPoint",
      "Un départ clé qui prend tout le monde de court",
      "Des hauts potentiels qui partent faute de perspective"
    ],
    "gains": [
      "Une matrice à jour en continu",
      "Un successeur identifié pour chaque poste clé",
      "Un plan de développement pour chaque haut potentiel"
    ],
    "features": [
      "Matrice 9-Box",
      "Plans de succession",
      "Parcours de carrière",
      "Analyse des compétences",
      "Mobilité interne"
    ]
  },
  {
    "id": "formation",
    "fam": "talents",
    "role": "collab",
    "module": "Formation",
    "short": "Formation",
    "img": "/img/modules/formation.jpg",
    "panel": "/solutions#m-talents-1",
    "title": "Le bon parcours de formation proposé à chacun",
    "h1": [
      "Le bon parcours de formation",
      "proposé à chacun"
    ],
    "situation": "Les entretiens révèlent des écarts de compétences dans l'équipe Ventes.",
    "story": "Les entretiens annuels révèlent des écarts de compétences dans l'équipe Ventes. Chaque commercial reçoit un parcours adapté, et le budget formation suit.",
    "steps": [
      "Compare les compétences requises et celles notées en entretien.",
      "Recommande un parcours à chaque personne, dans votre catalogue.",
      "Gère les inscriptions, les certifications et le budget formation."
    ],
    "you": "Choisissez votre parcours, le manager approuve.",
    "before": "un catalogue que personne n'ouvre",
    "after": "1 parcours par collaborateur",
    "gain": "Recommandations personnalisées",
    "pains": [
      "Un catalogue que personne n'ouvre",
      "Des formations choisies sans lien avec les entretiens",
      "Un budget formation suivi en fin d'année"
    ],
    "gains": [
      "Un parcours pour chaque collaborateur",
      "Des recommandations tirées des entretiens",
      "Le budget et le retour sur investissement suivis en continu"
    ],
    "features": [
      "Catalogue personnalisable",
      "Parcours adaptatifs",
      "Suivi des certifications",
      "Budget et ROI formation",
      "Plans individuels"
    ]
  },
  {
    "id": "paie",
    "fam": "paie",
    "role": "drh",
    "module": "Module paie",
    "short": "Module paie",
    "img": "/img/modules/paie.jpg",
    "panel": "/solutions#m-paie-0",
    "title": "Un run de paie multi-pays clôturé en une journée",
    "h1": [
      "Un run de paie multi-pays",
      "clôturé en une journée"
    ],
    "situation": "Le 25 du mois : trois pays, deux monnaies.",
    "story": "Le 25 du mois : trois pays, deux monnaies, 180 bulletins. Les cotisations sont calculées, les anomalies signalées et les déclarations prêtes à partir.",
    "steps": [
      "Calcule les cotisations de chaque pays : IPRES, CSS, IPM, CNPS…",
      "Contrôle les écarts d'un mois sur l'autre et les explique.",
      "Génère les bulletins PDF, les virements et les déclarations."
    ],
    "you": "Contrôlez les écarts signalés et validez le run.",
    "before": "5 jours",
    "after": "1 jour",
    "gain": "XOF, XAF, MAD",
    "pains": [
      "Cinq jours de calcul et de vérification",
      "Des taux de cotisation mis à jour à la main",
      "Des erreurs découvertes par les salariés"
    ],
    "gains": [
      "Un jour pour clôturer les trois pays",
      "Les règles de chaque pays tenues à jour",
      "Chaque anomalie repérée avant le virement"
    ],
    "features": [
      "Runs de paie mensuels",
      "Bulletins de paie PDF",
      "IPRES / CSS / IPM / CFCE",
      "Impôt sur le revenu",
      "Simulation avant validation"
    ]
  },
  {
    "id": "compensation",
    "fam": "paie",
    "role": "direction",
    "module": "Compensation & benefits",
    "short": "Compensation & benefits",
    "img": "/img/modules/compensation.jpg",
    "panel": "/solutions#m-paie-1",
    "title": "Une grille salariale cohérente avec la convention collective",
    "h1": [
      "Une grille salariale cohérente",
      "avec la convention collective"
    ],
    "situation": "La revue annuelle des salaires approche.",
    "story": "La revue annuelle des salaires approche. La grille est déjà rapprochée de la convention et du marché, et les écarts d'équité entre postes comparables sont signalés.",
    "steps": [
      "Pèse chaque poste et construit la grille salariale.",
      "La rapproche de la convention collective et des données du marché.",
      "Signale les écarts d'équité entre postes comparables."
    ],
    "you": "Arbitrez les augmentations, enveloppe en main.",
    "before": "une étude ponctuelle par an",
    "after": "une grille tenue à jour",
    "gain": "Pesées IPE",
    "pains": [
      "Une étude de rémunération ponctuelle, une fois par an",
      "Des écarts entre sites que personne ne mesure",
      "Des minimums conventionnels vérifiés à la main"
    ],
    "gains": [
      "Une grille tenue à jour toute l'année",
      "Chaque écart d'équité chiffré",
      "Les propositions des managers tenues dans l'enveloppe"
    ],
    "features": [
      "Pesées IPE (Mercer)",
      "Conventions collectives",
      "Simulateur salarial",
      "Grilles de mérite",
      "Workflow d'approbation"
    ]
  },
  {
    "id": "analytics",
    "fam": "pilotage",
    "role": "direction",
    "module": "People analytics",
    "short": "People analytics",
    "img": "/img/modules/analytics.jpg",
    "panel": "/solutions#m-pilotage-0",
    "title": "Le turnover du prochain trimestre, prédit ce mois-ci",
    "h1": [
      "Le turnover du prochain trimestre,",
      "prédit ce mois-ci"
    ],
    "situation": "Deux démissions surprises dans la même équipe.",
    "story": "Deux démissions surprises dans la même équipe. Le mois suivant, le module signale une autre équipe à risque, six semaines avant la première lettre.",
    "steps": [
      "Croise absences, ancienneté, évaluations et entretiens.",
      "Calcule un risque de départ pour chaque équipe.",
      "Alimente le tableau de bord de la direction, commentaires compris."
    ],
    "you": "Décidez d'un entretien de maintien, avant la lettre.",
    "before": "constaté après coup",
    "after": "6 semaines d'avance",
    "gain": "Risque par équipe",
    "pains": [
      "Des départs constatés après coup",
      "Des indicateurs éparpillés entre paie, congés et entretiens",
      "Un bilan social monté à la main"
    ],
    "gains": [
      "Six semaines d'avance sur les départs",
      "Un tableau de bord unique pour la direction",
      "Des rapports générés automatiquement"
    ],
    "features": [
      "Tableaux de bord interactifs",
      "Analyse du turnover",
      "Indicateurs de performance",
      "Rapports automatisés",
      "Prédictions IA"
    ]
  },
  {
    "id": "missions",
    "fam": "pilotage",
    "role": "collab",
    "module": "Gestion des missions",
    "short": "Gestion des missions",
    "img": "/img/modules/missions.jpg",
    "panel": "/solutions#m-pilotage-1",
    "title": "Un ordre de mission généré et validé avant le départ",
    "h1": [
      "Un ordre de mission généré",
      "et validé avant le départ"
    ],
    "situation": "Fatou part à Abidjan lundi pour trois jours.",
    "story": "Fatou part à Abidjan lundi pour trois jours. Son ordre de mission est généré, ses frais calculés selon le barème, et la paie est prévenue.",
    "steps": [
      "Génère l'ordre de mission depuis la demande.",
      "Calcule les frais selon le barème de la destination.",
      "Lance le circuit de validation et transmet à la paie."
    ],
    "you": "Le manager valide, Fatou part avec son ordre signé.",
    "before": "3 jours et une note de frais papier",
    "after": "10 minutes",
    "gain": "Barème appliqué",
    "pains": [
      "Trois jours d'allers-retours avant le départ",
      "Une note de frais papier à reconstituer au retour",
      "Un barème appliqué différemment selon les services"
    ],
    "gains": [
      "Dix minutes, validation comprise",
      "Les frais remboursés sur la paie suivante",
      "Le même barème pour tout le monde"
    ],
    "features": [
      "Création de missions",
      "Ordres de mission",
      "Suivi des frais",
      "Validation hiérarchique",
      "Rapports de mission"
    ]
  },
  {
    "id": "contentieux",
    "fam": "conformite",
    "role": "drh",
    "module": "Gestion des contentieux",
    "short": "Gestion des contentieux",
    "img": "/img/modules/contentieux.jpg",
    "panel": "/solutions#m-conformite-0",
    "title": "Une procédure disciplinaire conforme, étape par étape",
    "h1": [
      "Une procédure disciplinaire conforme,",
      "étape par étape"
    ],
    "situation": "Un manager signale une faute grave.",
    "story": "Un manager signale une faute grave. La procédure prévue par le Code du travail se déroule étape par étape : chaque délai est contrôlé, chaque courrier est prêt.",
    "steps": [
      "Déroule la procédure prévue par le Code du travail.",
      "Prépare chaque courrier, de la convocation à la notification.",
      "Contrôle les délais de convocation et de notification."
    ],
    "you": "Menez l'entretien et signez les courriers.",
    "before": "un risque de vice de forme",
    "after": "0 étape sautée",
    "gain": "Délais contrôlés",
    "pains": [
      "Un vice de forme qui fait tomber la sanction",
      "Des modèles de courriers approximatifs",
      "Un historique disciplinaire introuvable"
    ],
    "gains": [
      "Aucune étape sautée",
      "Des courriers conformes, prêts à signer",
      "Un dossier complet en cas de contrôle ou de recours"
    ],
    "features": [
      "Procédures réglementaires",
      "Suivi des dossiers",
      "Historique disciplinaire",
      "Gestion du contentieux"
    ]
  },
  {
    "id": "departs",
    "fam": "conformite",
    "role": "drh",
    "module": "Gestion des départs",
    "short": "Gestion des départs",
    "img": "/img/modules/departs.jpg",
    "panel": "/solutions#m-conformite-1",
    "title": "Un solde de tout compte prêt le jour du départ",
    "h1": [
      "Un solde de tout compte",
      "prêt le jour du départ"
    ],
    "situation": "Un collaborateur quitte l'entreprise le 30.",
    "story": "Un collaborateur quitte l'entreprise le 30. Ce jour-là, son solde de tout compte est calculé, son certificat de travail signé et ses accès coupés à 18 h.",
    "steps": [
      "Lance la checklist de départ dès que la date est connue.",
      "Calcule le solde de tout compte : congés, préavis, indemnités.",
      "Prépare le certificat de travail et programme la coupure des accès."
    ],
    "you": "Validez le solde et signez le certificat.",
    "before": "2 semaines",
    "after": "prêt le jour J",
    "gain": "Checklist complète",
    "pains": [
      "Deux semaines pour solder un départ",
      "Des accès encore ouverts des semaines après",
      "Un entretien de sortie oublié"
    ],
    "gains": [
      "Tout est prêt le jour J",
      "Des accès coupés à l'heure prévue",
      "Les motifs de départ suivis et analysés"
    ],
    "features": [
      "Entretiens de départ",
      "Solde de tout compte",
      "Checklist de départ",
      "Archivage du dossier",
      "Analyse des motifs"
    ]
  },
  {
    "id": "agent",
    "fam": "agent",
    "role": "all",
    "module": "Tous les modules",
    "short": "Le super-agent IA",
    "img": "/img/tour/copilote.jpg",
    "panel": "/#interface",
    "title": "Le super-agent IA, un cas d'usage à lui tout seul",
    "h1": [
      "Le super-agent IA,",
      "un cas d'usage à lui tout seul"
    ],
    "situation": "Une demande arrive dans un module : attestation, congé, candidature, fin de contrat, run de paie.",
    "story": "Il ne remplace pas les modules, il les fait travailler : dans chacun, un agent prépare, instruit, génère et relance. Les décisions restent à vos équipes.",
    "steps": [
      "Prépare le document, instruit la demande ou classe les profils.",
      "Applique les règles de votre entreprise et de votre convention collective.",
      "Relance, trace chaque action et vous remet le dossier prêt."
    ],
    "you": "Validez ou refusez en un geste. Rien ne part sans une décision humaine.",
    "before": "des RH absorbées par l'administratif",
    "after": "95 % du travail préparé",
    "gain": "Actif dans les 15 modules",
    "pains": [
      "Des demandes qui s'empilent dans les boîtes mail",
      "Des règles appliquées différemment selon qui traite",
      "Peu de temps pour les salariés et les managers"
    ],
    "gains": [
      "95 % du travail préparé avant d'arriver chez vous",
      "Les mêmes règles, appliquées à chaque demande",
      "Du temps rendu aux RH et aux HRBP"
    ],
    "features": [
      "Un agent dans chaque module",
      "Vos règles et votre convention collective",
      "Validation humaine systématique",
      "Journal de chaque action",
      "Relances automatiques"
    ]
  }
];

/** Les quinze modules (tout sauf le super-agent) et leurs sept familles */
export const modCases = cases.filter((c) => c.fam !== 'agent');
export const groups = families.filter((f) => f.key !== 'agent');

export function familyOf(c: UseCase): Family {
  return families.find((f) => f.key === c.fam)!;
}

export function caseById(id: string): UseCase | undefined {
  return cases.find((c) => c.id === id);
}

/** Espaces insécables de la typographie française : avant « : ; ? ! % » et après « */
export function fr(s: string): string {
  return s.replace(/ ([:;?!%»])/g, '\u00a0$1').replace(/« /g, '«\u00a0');
}

export function pad(n: number): string {
  return (n < 10 ? '0' : '') + n;
}
