import Link from 'next/link';
import { 
  Building2, 
  Heart, 
  Briefcase, 
  GraduationCap,
  TrendingDown,
  Users,
  Award,
  BarChart3,
  ArrowRight,
  Quote
} from 'lucide-react';

const globalStats = [
  { value: "85%", label: "Augmentation moyenne de l'engagement des employés" },
  { value: "4,2 millions de dollars", label: "Économies annuelles moyennes par client" },
  { value: "60%", label: "Réduction du temps administratif des RH" },
  { value: "3,2x", label: "Amélioration de l'efficacité des évaluations de performance" }
];

const caseStudies = [
  {
    icon: Building2,
    company: "TechCorp Inc.",
    sector: "Technologie",
    sectorColor: "bg-blue-100 text-blue-700",
    employees: "Plus de 500 employés",
    challenge: "Taux de rotation du personnel élevé et manque de visibilité sur les performances des équipes dispersées.",
    solution: "Mise en place de Targetym AI pour suivre les indicateurs d'engagement, prédire le risque de roulement du personnel et optimiser les processus de gestion des performances.",
    results: [
      { value: "40%", label: "Réduction du roulement du personnel" },
      { value: "65%", label: "Augmentation du nombre d'évaluations de performance réalisées" },
      { value: "2,5 millions de dollars", label: "Économies annuelles grâce à une meilleure fidélisation" }
    ],
    quote: "Targetym AI nous a aidés à identifier les employés à risque avant leur départ. Ces informations prédictives changent la donne.",
    author: "Sarah Johnson",
    role: "Directrice des ressources humaines",
    tags: ["Fidélisation des employés", "Gestion de la performance", "Analyse prédictive"]
  },
  {
    icon: Heart,
    company: "Partenaires en soins de santé",
    sector: "Soins de santé",
    sectorColor: "bg-red-100 text-red-700",
    employees: "Plus de 1 200 employés",
    challenge: "Des exigences de conformité complexes et la gestion des performances sur plusieurs quarts de travail et sites.",
    solution: "Mise en place d'un système complet de suivi des performances avec contrôle de la conformité et tableaux de bord d'analyse en temps réel.",
    results: [
      { value: "100%", label: "Taux de réussite des audits de conformité" },
      { value: "30%", label: "Amélioration de l'efficacité de la planification du personnel" },
      { value: "45%", label: "Réduction des frais administratifs" }
    ],
    quote: "Le suivi de la conformité à lui seul nous a permis d'économiser un temps précieux et d'éliminer le stress lié aux audits. Le retour sur investissement est incroyable.",
    author: "Dr Michael Chen",
    role: "Directeur des opérations",
    tags: ["Soins de santé", "Conformité", "Opérations"]
  },
  {
    icon: Briefcase,
    company: "Conseil mondial",
    sector: "Services professionnels",
    sectorColor: "bg-purple-100 text-purple-700",
    employees: "Plus de 300 employés",
    challenge: "Suivi des heures facturables, optimisation des effectifs des projets et amélioration des scores de satisfaction client.",
    solution: "Analyse intégrée des données de projet et des données RH pour optimiser l'allocation des ressources et suivre les indicateurs de performance.",
    results: [
      { value: "25%", label: "Augmentation du taux d'utilisation des heures facturables" },
      { value: "90%", label: "Amélioration du score de satisfaction client" },
      { value: "1,8 million de dollars", label: "Revenus annuels supplémentaires provenant de l'optimisation" }
    ],
    quote: "Nous pouvons désormais associer instantanément les bons talents aux bons projets. Nos clients constatent la différence.",
    author: "Emily Davis",
    role: "Associé gérant",
    tags: ["Services professionnels", "Optimisation des ressources", "Satisfaction du client"]
  },
  {
    icon: GraduationCap,
    company: "Université EduTech",
    sector: "Éducation",
    sectorColor: "bg-green-100 text-green-700",
    employees: "Plus de 800 employés",
    challenge: "Gestion des évaluations de performance du corps professoral, suivi de la productivité de la recherche et efficacité administrative.",
    solution: "Plateforme analytique personnalisée pour les environnements académiques, avec rapports spécialisés et suivi des objectifs.",
    results: [
      { value: "95%", label: "Taux d'achèvement des évaluations du corps professoral" },
      { value: "50%", label: "Augmentation de la collaboration en matière de recherche" },
      { value: "35%", label: "Réduction du temps de traitement administratif" }
    ],
    quote: "Targetym AI comprend les besoins spécifiques du monde universitaire. Les professeurs apprécient la simplification du processus d'évaluation.",
    author: "Professeure Lisa Wang",
    role: "Prévôt et vice-président",
    tags: ["Éducation", "Gestion du corps professoral", "Analyse de la recherche"]
  }
];

const quickWins = [
  {
    icon: TrendingDown,
    title: "Réduction de 45 % du chiffre d'affaires",
    description: "Une entreprise manufacturière a utilisé l'analyse prédictive pour identifier les risques de départ et mettre en œuvre des stratégies de fidélisation ciblées."
  },
  {
    icon: Users,
    title: "90 % d'engagement des employés",
    description: "Cette start-up technologique a atteint des scores d'engagement parmi les meilleurs du secteur grâce à un retour d'information continu et à un alignement des objectifs."
  },
  {
    icon: Award,
    title: "Meilleurs lieux de travail",
    description: "Une entreprise de services professionnels a remporté un prix régional après la mise en œuvre d'un programme complet d'analyse des données relatives aux ressources humaines."
  },
  {
    icon: BarChart3,
    title: "Retour sur investissement de 300 % dès la première année",
    description: "Un client entreprise a réalisé un retour sur investissement de 300 % grâce à une meilleure fidélisation et à des gains de productivité."
  }
];

const process = [
  { step: 1, title: "Découverte et planification", description: "Nous analysons votre situation actuelle et définissons des indicateurs de réussite." },
  { step: 2, title: "Mise en œuvre", description: "Déploiement rapide avec une perturbation minimale de vos opérations." },
  { step: 3, title: "Formation et adoption", description: "Une formation complète garantit que votre équipe maximise la valeur." },
  { step: 4, title: "Succès continu", description: "Optimisation continue et soutien pour des résultats durables." }
];

export default function CaseStudiesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white pt-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Des résultats concrets obtenus par{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              de vraies entreprises
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            Découvrez comment des organisations de tous les secteurs transforment leurs
            opérations RH et obtiennent des résultats mesurables grâce à Targetym AI.
          </p>
          <Link
            href="/login?tab=register"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-dark rounded-lg hover:bg-gray-800 transition-colors"
          >
            Commencez votre histoire à succès
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Global Stats */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Impact avéré dans tous les secteurs d&apos;activité
            </h2>
            <p className="text-lg text-gray-600">
              Nos clients obtiennent systématiquement des améliorations remarquables de leurs indicateurs RH clés.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {globalStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Témoignages clients
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez comment des entreprises comme la vôtre réussissent leur transformation grâce à Targetym AI
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                        <study.icon className="w-6 h-6 text-primary-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{study.company}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${study.sectorColor}`}>
                            {study.sector}
                          </span>
                          <span className="text-sm text-gray-500">{study.employees}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-red-600 mb-2">Défi:</h4>
                      <p className="text-gray-600">{study.challenge}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-green-600 mb-2">Solution:</h4>
                      <p className="text-gray-600">{study.solution}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-semibold text-gray-700">Étiquettes :</span>
                      {study.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-primary-600 mb-4">Résultats:</h4>
                      <div className="space-y-4">
                        {study.results.map((result, i) => (
                          <div key={i} className="text-center p-4 bg-primary-50 rounded-lg">
                            <div className="text-2xl font-bold text-primary-600">{result.value}</div>
                            <div className="text-sm text-gray-600">{result.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-xl border-l-4 border-primary-500">
                      <Quote className="w-6 h-6 text-primary-300 mb-3" />
                      <p className="text-gray-700 italic mb-4">« {study.quote} »</p>
                      <div>
                        <div className="font-semibold text-gray-900">{study.author}</div>
                        <div className="text-sm text-gray-500">{study.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Wins */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Plus d&apos;histoires à succès
            </h2>
            <p className="text-lg text-gray-600">
              Des succès rapides et des transformations à long terme pour l&apos;ensemble de notre clientèle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickWins.map((win, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl text-center">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <win.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{win.title}</h3>
                <p className="text-sm text-gray-600">{win.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Votre parcours vers le succès
            </h2>
            <p className="text-lg text-gray-600">
              Notre méthodologie éprouvée vous garantit des résultats rapides et durables.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
