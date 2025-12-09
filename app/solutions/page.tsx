import Link from 'next/link';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Users, 
  UserPlus, 
  BookOpen,
  Building2,
  Briefcase,
  GraduationCap,
  Heart,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const solutions = [
  {
    icon: BarChart3,
    title: "Analytique People",
    description: "Transformez les données RH brutes en insights exploitables avec des analyses avancées et des recommandations alimentées par l'IA.",
    features: [
      "Analytique de personnel en temps réel",
      "Modélisation prédictive du turnover",
      "Analyse des tendances de performance",
      "Création de tableaux de bord personnalisés"
    ],
    sectors: ["Technologie", "Finance", "Santé"]
  },
  {
    icon: TrendingUp,
    title: "Gestion de Performance",
    description: "Rationalisez les évaluations de performance avec des outils d'évaluation complets et des systèmes de feedback continu.",
    features: [
      "Feedback à 360 degrés",
      "Définition et suivi d'objectifs",
      "Calibrage des performances",
      "Planification du développement"
    ],
    sectors: ["Manufacturing", "Retail", "Services Professionnels"]
  },
  {
    icon: Target,
    title: "Suivi Objectifs & OKRs",
    description: "Alignez votre organisation avec une définition d'objectifs transparente et un suivi de progrès en temps réel.",
    features: [
      "OKRs à l'échelle de l'entreprise",
      "Gestion d'objectifs individuels",
      "Visualisation des progrès",
      "Analytique des réalisations"
    ],
    sectors: ["Startups", "Entreprise", "Non-profit"]
  },
  {
    icon: Users,
    title: "Engagement Employés",
    description: "Mesurez et améliorez la satisfaction des employés avec des enquêtes pulse et des analyses d'engagement.",
    features: [
      "Enquêtes d'engagement",
      "Analyse de sentiment",
      "Prédictions de rétention",
      "Insights culturels"
    ],
    sectors: ["Équipes Distantes", "Travail Hybride", "Bureau Traditionnel"]
  },
  {
    icon: UserPlus,
    title: "Planification Talents & Acquisition",
    description: "Rationalisez le recrutement avec un matching de candidats alimenté par l'IA et une planification stratégique de la main-d'œuvre.",
    features: [
      "Filtrage de candidats alimenté par l'IA",
      "Gestion du pipeline de talents",
      "Analyse des écarts de compétences",
      "Analytique de recrutement",
      "Matrice 9-Box des Talents"
    ],
    sectors: ["Technologie", "Consulting", "Entreprises en croissance rapide"]
  },
  {
    icon: BookOpen,
    title: "Apprentissage & Développement",
    description: "Responsabilisez votre personnel avec des parcours d'apprentissage personnalisés et des programmes complets de développement de compétences.",
    features: [
      "Parcours d'apprentissage personnalisés",
      "Évaluation et suivi des compétences",
      "Gestion de cours",
      "Suivi des certifications"
    ],
    sectors: ["Corporate", "Éducation", "Services Professionnels"]
  }
];

const sectors = [
  {
    icon: Building2,
    title: "Entreprise",
    subtitle: "500+ employés",
    description: "Mettez à l'échelle les opérations RH sur des milliers d'employés avec une sécurité et une conformité de niveau entreprise.",
    features: ["Intégration SSO", "Sécurité Avancée", "Workflows Personnalisés", "Support Dédié"]
  },
  {
    icon: Briefcase,
    title: "Services Professionnels",
    subtitle: "50-500 employés",
    description: "Optimisez les heures facturables et les relations client avec des analyses RH spécialisées pour les entreprises de services.",
    features: ["Analytique Projets", "Satisfaction Client", "Suivi d'Utilisation", "Gestion Compétences"]
  },
  {
    icon: GraduationCap,
    title: "Éducation",
    subtitle: "Toute taille",
    description: "Gérez les performances du corps professoral et du personnel avec des solutions adaptées aux institutions éducatives.",
    features: ["Calendriers Académiques", "Suivi Titularisation", "Analytique Recherche", "Feedback Étudiants"]
  },
  {
    icon: Heart,
    title: "Santé",
    subtitle: "100+ employés",
    description: "Assurez la conformité et optimisez la planification du personnel avec des outils RH spécifiques à la santé.",
    features: ["Suivi Conformité", "Gestion Équipes", "Suivi Certifications", "Analytique Sécurité"]
  }
];

const integrations = [
  "Slack", "Teams", "Workday", "BambooHR", "Greenhouse", "Jira"
];

export default function SolutionsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white pt-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Solutions pour Chaque{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              Défi RH
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            Découvrez comment Targetym AI peut transformer votre gestion du personnel
            avec des solutions adaptées à votre secteur d&apos;activité et à la taille de votre entreprise.
          </p>
          <Link
            href="/login?tab=register"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-dark rounded-lg hover:bg-gray-800 transition-colors"
          >
            Commencer l&apos;Essai Gratuit
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Solutions RH Complètes */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Solutions RH Complètes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour gérer, analyser et optimiser votre personnel
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <div 
                key={index} 
                className="p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-6">
                  <solution.icon className="w-6 h-6 text-primary-500" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {solution.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {solution.description}
                </p>
                
                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-900 mb-3">Fonctionnalités Clés :</div>
                  <ul className="space-y-2">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-2">Parfait pour :</div>
                  <div className="flex flex-wrap gap-2">
                    {solution.sectors.map((sector, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions par Secteur */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Solutions Spécifiques par Secteur
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fonctionnalités et workflows adaptés conçus pour les besoins uniques de votre secteur
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((sector, index) => (
              <div 
                key={index} 
                className="p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                  <sector.icon className="w-6 h-6 text-primary-500" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {sector.title}
                </h3>
                <div className="text-sm text-primary-600 font-medium mb-3">
                  {sector.subtitle}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {sector.description}
                </p>
                
                <ul className="space-y-2">
                  {sector.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intégrations */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Intégrations Transparentes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Connectez-vous avec vos outils et workflows existants. Targetym AI
            s&apos;intègre avec plus de 50 plateformes populaires.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {integrations.map((integration, index) => (
              <div 
                key={index} 
                className="px-6 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 font-medium"
              >
                {integration}
              </div>
            ))}
          </div>

          <Link
            href="/integrations"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-dark rounded-lg hover:bg-gray-800 transition-colors"
          >
            Voir Toutes les Intégrations
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
