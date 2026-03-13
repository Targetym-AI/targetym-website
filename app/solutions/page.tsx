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
  LayoutDashboard
} from 'lucide-react';

const modules = [
  {
    icon: Users,
    title: "Administration du Personnel",
    description: "Centralisez et digitalisez toute la gestion de vos collaborateurs. Dossiers employes, contrats, organigramme, mouvements... tout est accessible en quelques clics.",
    features: [
      "Dossiers employes complets et securises",
      "Organigramme dynamique et interactif",
      "Suivi des contrats et periodes d'essai",
      "Historique complet des promotions et mobilites",
      "Gestion multi-sites et multi-entites"
    ],
    aiFeature: "L'IA detecte automatiquement les echeances critiques (fin de contrat, fin de periode d'essai) et vous alerte en avance."
  },
  {
    icon: TrendingUp,
    title: "Gestion de la Performance",
    description: "Pilotez la performance individuelle et collective avec des evaluations structurees, des campagnes automatisees et un feedback continu.",
    features: [
      "Evaluations de performance 360\u00b0",
      "Campagnes d'evaluation automatisees",
      "Entretiens one-on-one structures avec suivi",
      "Calibrage et classement des performances",
      "Historique et evolution des notes"
    ],
    aiFeature: "L'IA analyse les tendances de performance et recommande des plans de developpement personnalises pour chaque collaborateur."
  },
  {
    icon: Target,
    title: "Objectifs & OKR",
    description: "Alignez toute l'organisation avec des objectifs clairs et mesurables. Du top management aux equipes terrain, chacun sait ou il va.",
    features: [
      "OKR en cascade (entreprise, equipe, individu)",
      "Suivi des Key Results en temps reel",
      "Daily Checklist connectee aux objectifs",
      "Visualisation des progres et tableaux de bord",
      "Alertes automatiques sur les ecarts"
    ],
    aiFeature: "L'IA identifie les objectifs a risque et suggere des actions correctives avant qu'il ne soit trop tard."
  },
  {
    icon: UserPlus,
    title: "Recrutement & Acquisition de Talents",
    description: "Attirez, evaluez et integrez les meilleurs talents avec un processus de recrutement intelligent de bout en bout.",
    features: [
      "Publication d'offres multi-canaux",
      "Filtrage et scoring de candidats par l'IA",
      "Pipeline de recrutement visuel",
      "Grilles d'evaluation collaboratives",
      "Onboarding structure des nouvelles recrues"
    ],
    aiFeature: "L'IA analyse les CV, evalue la compatibilite avec le poste et propose un classement automatique des meilleurs candidats."
  },
  {
    icon: Award,
    title: "Gestion des Talents & Carrieres",
    description: "Cartographiez vos talents, identifiez les hauts potentiels et construisez des plans de succession solides pour l'avenir.",
    features: [
      "Matrice 9-Box pour cartographier les talents",
      "Plans de succession et vivier de talents",
      "Parcours de carriere personnalises",
      "Analyse des ecarts de competences",
      "Mobilite interne et passerelles metiers"
    ],
    aiFeature: "L'IA detecte les hauts potentiels, predit les risques de depart et recommande des plans de retention cibles."
  },
  {
    icon: GraduationCap,
    title: "Formation & Developpement",
    description: "Developpez les competences de vos equipes avec des parcours de formation intelligents et un suivi precis des acquis.",
    features: [
      "Catalogue de formations personnalisable",
      "Parcours d'apprentissage adaptatifs",
      "Suivi des competences et certifications",
      "Budget formation et analytique ROI",
      "Plans de developpement individuels"
    ],
    aiFeature: "L'IA recommande les formations les plus pertinentes en fonction des ecarts de competences et des objectifs de carriere."
  },
  {
    icon: CalendarCheck,
    title: "Conges & Absences",
    description: "Simplifiez la gestion des conges et absences avec des workflows de validation automatiques et une visibilite totale sur les plannings.",
    features: [
      "Demandes de conges en un clic",
      "Validation multi-niveaux parametrable",
      "Calendrier d'equipe partage",
      "Soldes de conges en temps reel",
      "Rapports d'absenteisme et tendances"
    ],
    aiFeature: "L'IA anticipe les periodes de forte absence et alerte les managers pour eviter les sous-effectifs."
  },
  {
    icon: FileText,
    title: "Documents RH",
    description: "Generez automatiquement tous vos documents RH officiels en quelques secondes. Fini les modeles Word et les erreurs de saisie.",
    features: [
      "Attestations de travail automatiques",
      "Certificats de travail avec historique de carriere",
      "Modeles personnalisables par entreprise",
      "Signature electronique integree",
      "Archivage securise et conforme"
    ],
    aiFeature: "L'IA genere les documents en s'appuyant sur les donnees du dossier employe, sans aucune saisie manuelle."
  }
];

const aiHighlights = [
  {
    icon: Bot,
    title: "Agents IA Specialises",
    description: "Jusqu'a 30 agents IA, chacun expert dans un domaine RH precis : recrutement, performance, formation, talents, documents..."
  },
  {
    icon: Sparkles,
    title: "Automatisation Intelligente",
    description: "L'IA ne se contente pas d'analyser : elle agit. Generation de documents, alertes proactives, recommandations actionnables."
  },
  {
    icon: LayoutDashboard,
    title: "Tableaux de Bord Predictifs",
    description: "Des dashboards intelligents qui ne montrent pas seulement le passe, mais predisent les tendances futures de votre capital humain."
  },
  {
    icon: MessageSquare,
    title: "Assistant RH Conversationnel",
    description: "Posez vos questions en langage naturel. L'IA comprend le contexte et vous donne des reponses precises instantanement."
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
            8 Modules Integres
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Une Suite SIRH Complete pour{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
              Chaque Besoin RH
            </span>
          </h1>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-10">
            Du recrutement au depart, Targetym AI couvre l&apos;ensemble du cycle de vie
            de vos collaborateurs avec des modules puissants, interconnectes et optimises par l&apos;IA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login?tab=register"
              className="inline-flex items-center px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Demarrer l&apos;Essai Gratuit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors"
            >
              Demander une Demo
            </Link>
          </div>
        </div>
      </section>

      {/* AI Highlights */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiHighlights.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-5">
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Detail */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tous les Modules en Detail
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chaque module est concu pour fonctionner independamment ou en synergie
              avec les autres, pour une experience RH unifiee
            </p>
          </div>

          <div className="space-y-8">
            {modules.map((module, index) => (
              <div
                key={index}
                className="p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                        <module.icon className="w-6 h-6 text-primary-500" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {module.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                      {module.description}
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {module.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center">
                    <div className="p-5 bg-primary-50 rounded-xl w-full">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-primary-500" />
                        <span className="text-sm font-semibold text-primary-700">Boost IA</span>
                      </div>
                      <p className="text-sm text-primary-600 leading-relaxed">
                        {module.aiFeature}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-12 md:p-16 text-white text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Pret a decouvrir la puissance de Targetym AI ?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Testez gratuitement tous les modules et decouvrez comment l&apos;IA peut
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
                Contacter l&apos;Equipe
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
