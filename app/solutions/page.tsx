import Link from 'next/link';
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
  Gift
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
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200"
  },
  {
    icon: TrendingUp,
    title: "Performance",
    description: "Évaluations structurées et feedback continu pour piloter la performance.",
    features: [
      "Évaluations 360\u00b0",
      "Campagnes automatisées",
      "Entretiens one-on-one",
      "Calibrage des notes",
      "Plans de développement"
    ],
    aiFeature: "Analyse des tendances et recommandations de développement personnalisées.",
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
    borderColor: "border-emerald-200"
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
    borderColor: "border-violet-200"
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
    borderColor: "border-orange-200"
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
    borderColor: "border-rose-200"
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
    borderColor: "border-cyan-200"
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
    borderColor: "border-amber-200"
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
    borderColor: "border-indigo-200"  },
  {
    icon: Banknote,
    title: "Paie & Rémunération",
    description: "Gérez les salaires, grilles de rémunération et avances sur paie.",
    features: [
      "Grilles salariales",
      "Avances sur salaire",
      "Historique des rémunérations",
      "Révisions salariales",
      "Exports comptables"
    ],
    aiFeature: "Analyse des écarts salariaux et recommandations d'équité de rémunération.",
    color: "from-teal-500 to-teal-600",
    bgLight: "bg-teal-50",
    textColor: "text-teal-600",
    borderColor: "border-teal-200"
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
    borderColor: "border-pink-200"
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
    borderColor: "border-slate-200"
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
    borderColor: "border-red-200"  }
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
