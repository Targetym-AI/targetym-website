'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp,
  Users,
  UserPlus,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Bot,
  Sparkles,
  MessageSquare,
  ClipboardList,
  LayoutDashboard,
  DollarSign,
  Scale,
  BarChart3
} from 'lucide-react';

const categories = [
  {
    id: "recrutement",
    label: "Recrutement & Onboarding",
    icon: UserPlus,
    modules: [
      {
        title: "Recrutement",
        description: "Attirez et intégrez les meilleurs talents avec un processus intelligent.",
        features: ["Offres multi-canaux", "Scoring IA des candidats", "Pipeline visuel", "Grilles collaboratives", "Onboarding structuré"],
        ai: "Analyse automatique des CV et classement des meilleurs profils.",
        screenshot: "/modules/recrutement.png"
      }
    ]
  },
  {
    id: "administration",
    label: "Administration RH",
    icon: Users,
    modules: [
      {
        title: "Gestion du Personnel",
        description: "Centralisez la gestion de vos collaborateurs en un seul endroit.",
        features: ["Dossiers employés complets", "Organigramme dynamique", "Suivi des contrats et échéances", "Import CSV/Excel", "Gestion multi-sites"],
        ai: "Détection automatique des échéances critiques et alertes proactives.",
        screenshot: "/modules/personnel.png"
      },
      {
        title: "Congés & Absences",
        description: "Simplifiez la gestion des congés avec des workflows automatiques.",
        features: ["Demandes en un clic", "Validation multi-niveaux", "Calendrier d'équipe", "Soldes temps réel", "Rapports d'absentéisme"],
        ai: "Anticipation des périodes de forte absence.",
        screenshot: "/modules/conges.png"
      },
      {
        title: "Documents RH",
        description: "Générez tous vos documents RH officiels en quelques secondes.",
        features: ["Attestations automatiques", "Certificats de travail", "Modèles personnalisables", "Signature électronique", "Archivage sécurisé"],
        ai: "Génération automatique à partir des données employé, zéro saisie manuelle.",
        screenshot: "/modules/documents.png"
      },
      {
        title: "Budget RH",
        description: "Pilotez et saisissez votre budget RH avec une nomenclature NRG structurée et des analyses en temps réel.",
        features: ["Saisie budgétaire par catégorie", "Pilotage budget vs réalisé", "Nomenclature NRG standard", "Analyse par employé", "Verrouillage et export"],
        ai: "Comparaison automatique budget prévisionnel vs réalisé issu de la paie.",
        screenshot: "/modules/budget-rh.png"
      }
    ]
  },
  {
    id: "performance",
    label: "Performance & OKR",
    icon: TrendingUp,
    modules: [
      {
        title: "Performance & Feedback",
        description: "Évaluations structurées et feedback continu pour piloter la performance.",
        features: ["Évaluations 360°", "Campagnes automatisées", "Entretiens one-on-one", "Calibrage des notes", "Feedback continu"],
        ai: "Analyse des tendances et recommandations de développement personnalisées.",
        screenshot: "/modules/performance.png"
      },
      {
        title: "OKR & Objectifs",
        description: "Alignez toute l'organisation avec des objectifs clairs et mesurables.",
        features: ["OKR en cascade", "Suivi temps réel des KR", "Daily Checklist connectée", "Tableaux de bord visuels", "Alertes sur les écarts"],
        ai: "Identification des objectifs à risque et suggestions d'actions correctives.",
        screenshot: "/modules/okr.png"
      }
    ]
  },
  {
    id: "talents",
    label: "Talents & Formation",
    icon: GraduationCap,
    modules: [
      {
        title: "Gestion des Talents",
        description: "Cartographiez vos talents et construisez des plans de succession solides.",
        features: ["Matrice 9-Box", "Plans de succession", "Parcours de carrière", "Analyse des compétences", "Mobilité interne"],
        ai: "Détection des hauts potentiels et prédiction des risques de départ.",
        screenshot: "/modules/talents.png"
      },
      {
        title: "Formation",
        description: "Développez les compétences avec des parcours intelligents et adaptatifs.",
        features: ["Catalogue personnalisable", "Parcours adaptatifs", "Suivi des certifications", "Budget et ROI formation", "Plans individuels"],
        ai: "Recommandations de formations basées sur les écarts de compétences.",
        screenshot: "/modules/formation.png"
      }
    ]
  },
  {
    id: "paie",
    label: "Paie & Rémunération",
    icon: DollarSign,
    modules: [
      {
        title: "Module Paie",
        description: "Gérez la paie avec des bulletins officiels et des cotisations légales calculées automatiquement.",
        features: ["Runs de paie mensuels", "Bulletins de paie PDF", "IPRES / CSS / IPM / CFCE", "Impôt sur le revenu", "Simulation avant validation"],
        ai: "Calcul automatique des cotisations légales sénégalaises.",
        screenshot: "/modules/paie.png"
      },
      {
        title: "Compensation & Benefits",
        description: "Optimisez votre politique de rémunération.",
        features: ["Pesées IPE (Mercer)", "Conventions collectives", "Simulateur salarial", "Grilles de mérite", "Workflow d'approbation"],
        ai: "Réconciliation automatique IPE × Convention Collective.",
        screenshot: "/modules/compensation.png"
      }
    ]
  },
  {
    id: "pilotage",
    label: "Pilotage RH",
    icon: BarChart3,
    modules: [
      {
        title: "People Analytics",
        description: "Exploitez vos données RH pour prendre des décisions stratégiques éclairées.",
        features: ["Tableaux de bord interactifs", "Analyse du turnover", "Indicateurs de performance", "Rapports automatisés", "Prédictions IA"],
        ai: "Prédictions sur le turnover, la rétention et les tendances RH.",
        screenshot: "/modules/analytics.png"
      },
      {
        title: "Gestion des Missions",
        description: "Planifiez et suivez les missions et déplacements de vos collaborateurs.",
        features: ["Création de missions", "Ordres de mission", "Suivi des frais", "Validation hiérarchique", "Rapports de mission"],
        ai: "Optimisation des plannings et suivi automatique des budgets.",
        screenshot: "/modules/missions.png"
      }
    ]
  },
  {
    id: "conformite",
    label: "Conformité",
    icon: Scale,
    modules: [
      {
        title: "Gestion des Contentieux",
        description: "Gérez les procédures disciplinaires dans le respect du droit du travail.",
        features: ["Procédures réglementaires", "Suivi des dossiers", "Historique disciplinaire", "Gestion du contentieux"],
        ai: "Vérification de la conformité légale des procédures.",
        screenshot: "/modules/contentieux.png"
      },
      {
        title: "Gestion des Départs",
        description: "Pilotez l'offboarding et les soldes de tout compte en toute sérénité.",
        features: ["Entretiens de départ", "Solde de tout compte", "Checklist de départ", "Archivage du dossier", "Analyse des motifs"],
        ai: "Identification des tendances de départ pour anticiper les risques de turnover.",
        screenshot: "/modules/departs.png"
      }
    ]
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
  const [activeTab, setActiveTab] = useState("recrutement");
  const activeCategory = categories.find(c => c.id === activeTab)!;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 pt-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/15 text-white rounded-full text-sm font-medium mb-8 backdrop-blur-sm border border-white/20">
            <ClipboardList className="w-4 h-4 mr-2" />
            Suite SIRH Complete
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
              href="/essai-gratuit"
              className="inline-flex items-center px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Demarrer l&apos;Essai Gratuit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/essai-gratuit"
              className="inline-flex items-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors"
            >
              Demander une Demo
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

      {/* Sticky Tabs Navigation */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg
                            text-sm font-medium whitespace-nowrap transition-all
                            ${activeTab === cat.id
                              ? 'bg-primary-500 text-white shadow-sm'
                              : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content — Alternating Layout */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {activeCategory.modules.map((mod, idx) => (
            <div key={mod.title}>
              {idx > 0 && <div className="border-t border-gray-100" />}
              <div
                className={`flex flex-col md:flex-row items-center gap-10 py-16 ${
                  idx % 2 !== 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Text */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {mod.title}
                  </h3>
                  <p className="text-gray-600">{mod.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {mod.features.map(f => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> {f}
                      </span>
                    ))}
                  </div>
                  {mod.ai && (
                    <div className="flex items-start gap-2 mt-4 p-4 bg-secondary-50 border border-secondary-200 rounded-xl">
                      <Sparkles className="w-5 h-5 text-secondary-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-secondary-700">{mod.ai}</p>
                    </div>
                  )}
                </div>

                {/* Screenshot */}
                <div className="flex-1">
                  {mod.screenshot ? (
                    <div className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                      <Image
                        src={mod.screenshot}
                        alt={mod.title}
                        width={1576}
                        height={889}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        quality={75}
                        className="w-full h-auto"
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 border border-gray-200 p-12 flex items-center justify-center h-[300px]">
                      <p className="text-gray-400 text-sm">Capture à venir</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
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
                href="/essai-gratuit"
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
