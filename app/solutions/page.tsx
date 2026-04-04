import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp,
  Target,
  Users,
  UserPlus,
  GraduationCap,
  FileText,
  CalendarCheck,
  CheckCircle,
  ArrowRight,
  Bot,
  Sparkles,
  MessageSquare,
  Award,
  ClipboardList,
  LayoutDashboard,
  Banknote,
  LogOut,
  Scale,
  Gift,
  BarChart3,
  Briefcase,
  Plug,
  ShieldCheck,
  UserCircle
} from 'lucide-react';

const modules = [
  {
    icon: Users,
    title: "Administration du Personnel",
    description: "Centralisez la gestion de vos collaborateurs en un seul endroit.",
    features: [
      "Dossiers employés complets",
      "Organigramme dynamique",
      "Suivi des contrats et échéances",
      "Historique des promotions",
      "Gestion multi-sites"
    ],
    aiFeature: "Détection automatique des échéances critiques et alertes proactives.",
    color: "from-primary-500 to-primary-600",
    bgLight: "bg-primary-50",
    textColor: "text-primary-600",
    borderColor: "border-primary-200",
    screenshot: "/modules/personnel.png"
  },
  {
    icon: TrendingUp,
    title: "Performance",
    description: "Évaluations structurées et feedback continu pour piloter la performance.",
    features: [
      "Évaluations 360°",
      "Campagnes automatisées",
      "Entretiens one-on-one",
      "Calibrage des notes",
      "Plans de développement"
    ],
    aiFeature: "Analyse des tendances et recommandations de développement personnalisées.",
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
    borderColor: "border-emerald-200",
    screenshot: "/modules/performance.png"
  },
  {
    icon: Target,
    title: "Objectifs & OKR",
    description: "Alignez toute l'organisation avec des objectifs clairs et mesurables.",
    features: [
      "OKR en cascade",
      "Suivi temps réel des KR",
      "Daily Checklist connectée",
      "Tableaux de bord visuels",
      "Alertes sur les écarts"
    ],
    aiFeature: "Identification des objectifs à risque et suggestions d'actions correctives.",
    color: "from-violet-500 to-violet-600",
    bgLight: "bg-violet-50",
    textColor: "text-violet-600",
    borderColor: "border-violet-200",
    screenshot: null
  },
  {
    icon: UserPlus,
    title: "Recrutement",
    description: "Attirez et intégrez les meilleurs talents avec un processus intelligent.",
    features: [
      "Offres multi-canaux",
      "Scoring IA des candidats",
      "Pipeline visuel",
      "Grilles collaboratives",
      "Onboarding structuré"
    ],
    aiFeature: "Analyse automatique des CV et classement des meilleurs profils.",
    color: "from-orange-500 to-orange-600",
    bgLight: "bg-orange-50",
    textColor: "text-orange-600",
    borderColor: "border-orange-200",
    screenshot: "/modules/recrutement.png"
  },
  {
    icon: Award,
    title: "Gestion des Talents",
    description: "Cartographiez vos talents et construisez des plans de succession solides.",
    features: [
      "Matrice 9-Box",
      "Plans de succession",
      "Parcours de carrière",
      "Analyse des compétences",
      "Mobilité interne"
    ],
    aiFeature: "Détection des hauts potentiels et prédiction des risques de départ.",
    color: "from-rose-500 to-rose-600",
    bgLight: "bg-rose-50",
    textColor: "text-rose-600",
    borderColor: "border-rose-200",
    screenshot: null
  },
  {
    icon: GraduationCap,
    title: "Formation",
    description: "Développez les compétences avec des parcours intelligents et adaptatifs.",
    features: [
      "Catalogue personnalisable",
      "Parcours adaptatifs",
      "Suivi des certifications",
      "Budget et ROI formation",
      "Plans individuels"
    ],
    aiFeature: "Recommandations de formations basées sur les écarts de compétences.",
    color: "from-cyan-500 to-cyan-600",
    bgLight: "bg-cyan-50",
    textColor: "text-cyan-600",
    borderColor: "border-cyan-200",
    screenshot: "/modules/formation.png"
  },
  {
    icon: CalendarCheck,
    title: "Congés & Absences",
    description: "Simplifiez la gestion des congés avec des workflows automatiques.",
    features: [
      "Demandes en un clic",
      "Validation multi-niveaux",
      "Calendrier d'équipe",
      "Soldes temps réel",
      "Rapports d'absentéisme"
    ],
    aiFeature: "Anticipation des périodes de forte absence pour éviter les sous-effectifs.",
    color: "from-amber-500 to-amber-600",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
    borderColor: "border-amber-200",
    screenshot: "/modules/conges.png"
  },
  {
    icon: FileText,
    title: "Documents RH",
    description: "Générez tous vos documents RH officiels en quelques secondes.",
    features: [
      "Attestations automatiques",
      "Certificats de travail",
      "Modèles personnalisables",
      "Signature électronique",
      "Archivage sécurisé"
    ],
    aiFeature: "Génération automatique à partir des données employé, zéro saisie manuelle.",
    color: "from-indigo-500 to-indigo-600",
    bgLight: "bg-indigo-50",
    textColor: "text-indigo-600",
    borderColor: "border-indigo-200",
    screenshot: "/modules/documents.png"
  },
  {
    icon: Banknote,
    title: "Module Paie",
    description: "Gérez la paie de vos employés avec des bulletins officiels et des cotisations légales calculées automatiquement.",
    features: [
      "Runs de paie mensuels",
      "Bulletins de paie PDF",
      "IPRES / CSS / IPM / CFCE",
      "Impôt sur le revenu (IR)",
      "Rubriques paramétrables",
      "Profils de paie employés",
      "Simulation avant validation"
    ],
    aiFeature: "Calcul automatique des cotisations légales sénégalaises et génération des bulletins en un clic.",
    color: "from-teal-500 to-teal-600",
    bgLight: "bg-teal-50",
    textColor: "text-teal-600",
    borderColor: "border-teal-200",
    screenshot: null
  },
  {
    icon: Gift,
    title: "Avantages Sociaux",
    description: "Centralisez et gérez tous les avantages accordés à vos collaborateurs.",
    features: [
      "Catalogue des avantages",
      "Attribution par poste",
      "Suivi des primes",
      "Assurances & mutuelles",
      "Rapports de coûts"
    ],
    aiFeature: "Suggestions d'avantages pour améliorer la rétention des talents clés.",
    color: "from-pink-500 to-pink-600",
    bgLight: "bg-pink-50",
    textColor: "text-pink-600",
    borderColor: "border-pink-200",
    screenshot: null
  },
  {
    icon: Scale,
    title: "Sanctions Disciplinaires",
    description: "Gérez les procédures disciplinaires dans le respect du droit du travail.",
    features: [
      "Avertissements & mises en demeure",
      "Procédures réglementaires",
      "Suivi des dossiers",
      "Historique disciplinaire",
      "Gestion du contentieux"
    ],
    aiFeature: "Vérification de la conformité légale des procédures avant notification.",
    color: "from-slate-500 to-slate-600",
    bgLight: "bg-slate-50",
    textColor: "text-slate-600",
    borderColor: "border-slate-200",
    screenshot: "/modules/contentieux.png"
  },
  {
    icon: LogOut,
    title: "Gestion des Départs",
    description: "Pilotez l'offboarding et les soldes de tout compte en toute sérénité.",
    features: [
      "Entretiens de départ",
      "Solde de tout compte",
      "Checklist de départ",
      "Archivage du dossier",
      "Analyse des motifs"
    ],
    aiFeature: "Identification des tendances de départ pour anticiper les risques de turnover.",
    color: "from-red-400 to-red-500",
    bgLight: "bg-red-50",
    textColor: "text-red-500",
    borderColor: "border-red-200",
    screenshot: null
  },
  {
    icon: BarChart3,
    title: "People Analytics",
    description: "Exploitez vos données RH pour prendre des décisions stratégiques éclairées.",
    features: [
      "Tableaux de bord interactifs",
      "Analyse du turnover",
      "Indicateurs de performance",
      "Rapports automatisés",
      "Prédictions IA"
    ],
    aiFeature: "Prédictions sur le turnover, la rétention et les tendances RH de votre organisation.",
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    screenshot: "/modules/analytics.png"
  },
  {
    icon: Briefcase,
    title: "Gestion des Missions",
    description: "Planifiez et suivez les missions et déplacements de vos collaborateurs.",
    features: [
      "Création de missions",
      "Ordres de mission",
      "Suivi des frais",
      "Validation hiérarchique",
      "Rapports de mission"
    ],
    aiFeature: "Optimisation des plannings de mission et suivi automatique des budgets.",
    color: "from-lime-500 to-lime-600",
    bgLight: "bg-lime-50",
    textColor: "text-lime-600",
    borderColor: "border-lime-200",
    screenshot: "/modules/missions.png"
  },
  {
    icon: Plug,
    title: "Intégrations",
    description: "Connectez Targetym AI à vos outils existants pour un écosystème unifié.",
    features: [
      "API ouverte",
      "Connecteurs prêts à l'emploi",
      "Synchronisation temps réel",
      "Webhooks configurables",
      "Import/Export de données"
    ],
    aiFeature: "Configuration intelligente des intégrations et détection des anomalies de synchronisation.",
    color: "from-fuchsia-500 to-fuchsia-600",
    bgLight: "bg-fuchsia-50",
    textColor: "text-fuchsia-600",
    borderColor: "border-fuchsia-200",
    screenshot: "/modules/integrations.png"
  },
  {
    icon: ShieldCheck,
    title: "Sécurité 2FA",
    description: "Protégez l'accès à votre SIRH avec une authentification renforcée.",
    features: [
      "Authentification à deux facteurs",
      "Contrôle d'accès par rôle",
      "Journal d'audit",
      "Politique de mots de passe",
      "Sessions sécurisées"
    ],
    aiFeature: "Détection des connexions suspectes et alertes de sécurité en temps réel.",
    color: "from-green-500 to-green-600",
    bgLight: "bg-green-50",
    textColor: "text-green-600",
    borderColor: "border-green-200",
    screenshot: "/modules/securite.png"
  },
  {
    icon: UserCircle,
    title: "Mon Espace",
    description: "Un espace personnel pour chaque collaborateur avec toutes ses informations.",
    features: [
      "Profil personnel",
      "Mes demandes",
      "Mes documents",
      "Mes objectifs",
      "Notifications"
    ],
    aiFeature: "Assistant personnel IA pour répondre aux questions RH de chaque collaborateur.",
    color: "from-sky-500 to-sky-600",
    bgLight: "bg-sky-50",
    textColor: "text-sky-600",
    borderColor: "border-sky-200",
    screenshot: "/modules/mon-espace.png"
  }
];

const aiHighlights = [
  {
    icon: Bot,
    title: "Agents IA Spécialisés",
    description: "Jusqu'à 30 agents IA experts dans chaque domaine RH"
  },
  {
    icon: Sparkles,
    title: "Automatisation Intelligente",
    description: "L'IA agit : génération de documents, alertes, recommandations"
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards Prédictifs",
    description: "Des tableaux de bord qui prédisent les tendances futures"
  },
  {
    icon: MessageSquare,
    title: "Assistant Conversationnel",
    description: "Posez vos questions RH en langage naturel"
  }
];

export default function SolutionsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 pt-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/15 text-white rounded-full text-sm font-medium mb-8 backdrop-blur-sm border border-white/20">
            <ClipboardList className="w-4 h-4 mr-2" />
            Suite SIRH Complète
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Une Suite SIRH Complète pour{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
              Chaque Besoin RH
            </span>
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-10">
            Du recrutement au départ, Targetym AI couvre l&apos;ensemble du cycle de vie
            de vos collaborateurs avec des modules puissants, interconnectés et optimisés par l&apos;IA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login?tab=register"
              className="inline-flex items-center px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Démarrer l&apos;Essai Gratuit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors"
            >
              Demander une Démo
            </Link>
          </div>
        </div>
      </section>

      {/* AI Highlights Bar */}
      <section className="py-6 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiHighlights.map((item, index) => (
              <div key={index} className="flex items-center gap-3 py-2">
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tous les Modules
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chaque module fonctionne indépendamment ou en synergie avec les autres
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl overflow-hidden border ${module.borderColor} hover:shadow-xl transition-all group`}
              >
                {/* Color accent top */}
                <div className={`h-1.5 bg-gradient-to-r ${module.color}`} />

                <div className="p-7">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 ${module.bgLight} rounded-xl flex items-center justify-center`}>
                      <module.icon className={`w-6 h-6 ${module.textColor}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
                      <p className="text-sm text-gray-500">{module.description}</p>
                    </div>
                  </div>

                  {/* Features as pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {module.features.map((feature, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-medium rounded-full border border-gray-100"
                      >
                        <CheckCircle className={`w-3.5 h-3.5 ${module.textColor} mr-1.5`} />
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* AI Feature */}
                  <div className={`flex items-start gap-2.5 p-3.5 ${module.bgLight} rounded-xl`}>
                    <Sparkles className={`w-4 h-4 ${module.textColor} mt-0.5 flex-shrink-0`} />
                    <p className={`text-sm ${module.textColor} font-medium leading-relaxed`}>
                      {module.aiFeature}
                    </p>
                  </div>

                  {/* Screenshot */}
                  {module.screenshot && (
                    <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="bg-gray-100 px-3 py-1.5 flex items-center gap-1.5 border-b border-gray-200">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      </div>
                      <Image
                        src={module.screenshot}
                        alt={`Capture d'écran du module ${module.title}`}
                        width={600}
                        height={350}
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-12 md:p-16 text-white text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Prêt à découvrir la puissance de Targetym AI ?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Testez gratuitement tous les modules et découvrez comment l&apos;IA peut
              transformer votre gestion des ressources humaines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login?tab=register"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-gray-100 transition-colors"
              >
                Commencer Gratuitement
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors"
              >
                Contacter l&apos;Équipe
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
