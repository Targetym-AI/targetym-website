import Link from 'next/link';
import {
  BarChart3,
  Users,
  Target,
  TrendingUp,
  Shield,
  Sparkles,
  ArrowRight,
  Bot,
  BrainCircuit,
  FileText,
  CalendarCheck,
  UserPlus,
  GraduationCap,
  ClipboardCheck,
  MessageSquare,
  Zap,
  CheckCircle,
  Cpu,
  Award,
  Layers,
  Clock,
  PieChart,
  Settings
} from 'lucide-react';

const valuePropositions = [
  {
    icon: BrainCircuit,
    title: "50% du travail de la DRH automatise",
    description: "Targetym AI prend en charge la moitie des taches repetitives et chronophages de votre Direction des Ressources Humaines : generation de documents, suivi des conges, evaluations, rapports... Vos equipes RH se concentrent enfin sur l'essentiel.",
    highlight: "50%",
    highlightLabel: "de gain de temps RH"
  },
  {
    icon: Bot,
    title: "Jusqu'a 30 agents IA RH integres",
    description: "La plus grande flotte d'agents IA specialises RH au monde, directement integree dans votre SIRH. Chaque agent maitrise un domaine : recrutement, performance, formation, paie, conformite, bien-etre...",
    highlight: "30",
    highlightLabel: "agents IA specialises"
  },
  {
    icon: Layers,
    title: "Du personnel au pilotage de la performance",
    description: "Passez de la simple administration du personnel au pilotage strategique de la performance humaine. Un SIRH integreable qui transforme vos donnees RH en decisions eclairees.",
    highlight: "360\u00b0",
    highlightLabel: "vision de la performance"
  }
];

const aiAgents = [
  { icon: FileText, name: "Agent Documents", desc: "Genere automatiquement attestations, certificats de travail et bulletins de paie" },
  { icon: UserPlus, name: "Agent Recrutement", desc: "Filtre les candidatures, evalue les profils et propose les meilleurs matchs" },
  { icon: TrendingUp, name: "Agent Performance", desc: "Analyse les evaluations 360\u00b0 et recommande des plans de developpement" },
  { icon: Target, name: "Agent OKR", desc: "Suit les objectifs en temps reel et alerte sur les ecarts de performance" },
  { icon: GraduationCap, name: "Agent Formation", desc: "Identifie les besoins en competences et propose des parcours personnalises" },
  { icon: CalendarCheck, name: "Agent Planning", desc: "Optimise la gestion des conges, absences et plannings d'equipe" },
  { icon: ClipboardCheck, name: "Agent Conformite", desc: "Veille reglementaire automatique et alertes de conformite en continu" },
  { icon: MessageSquare, name: "Agent Engagement", desc: "Mesure le climat social et propose des actions pour ameliorer le bien-etre" },
  { icon: PieChart, name: "Agent Analytics", desc: "Tableaux de bord intelligents et predictions sur le turnover et la retention" },
  { icon: Award, name: "Agent Talents", desc: "Cartographie les talents, detecte les hauts potentiels via la matrice 9-Box" },
];

const capabilities = [
  {
    category: "Administration du Personnel",
    items: [
      "Gestion complete des dossiers employes",
      "Generation automatique de documents RH (attestations, certificats)",
      "Suivi des contrats, periodes d'essai et echeances",
      "Gestion des conges et absences avec validation multi-niveaux",
      "Organigramme dynamique et interactif"
    ]
  },
  {
    category: "Performance & OKR",
    items: [
      "Objectifs et Key Results (OKR) en cascade",
      "Evaluations de performance 360\u00b0 avec campagnes automatisees",
      "Entretiens one-on-one structures avec suivi",
      "Daily Checklist connectee aux KRs",
      "Calibrage et classement des performances"
    ]
  },
  {
    category: "Talents & Developpement",
    items: [
      "Matrice 9-Box pour cartographier les talents",
      "Plans de succession et mobilite interne",
      "Parcours de formation personnalises par l'IA",
      "Analyse des ecarts de competences",
      "Suivi des certifications et habilitations"
    ]
  },
  {
    category: "Pilotage & Intelligence RH",
    items: [
      "Tableaux de bord RH en temps reel",
      "Predictions IA sur le turnover et la retention",
      "Analyse du climat social et de l'engagement",
      "Rapports automatises pour la direction",
      "Benchmarks et indicateurs cles de performance RH"
    ]
  }
];

const differentiators = [
  { icon: Cpu, title: "IA Generative Integree", desc: "Pas un simple chatbot : de vrais agents IA qui executent des actions RH complexes de bout en bout." },
  { icon: Shield, title: "Securite de Niveau Entreprise", desc: "Chiffrement des donnees, controle d'acces granulaire par role et conformite aux normes de protection des donnees." },
  { icon: Zap, title: "Deploiement Rapide", desc: "Operationnel en quelques jours, pas en mois. Integration facile avec vos outils existants via API ouverte." },
  { icon: Settings, title: "SIRH Integreable", desc: "S'adapte a votre ecosysteme existant. Connectez Targetym AI a vos outils de paie, comptabilite et communication." },
  { icon: Clock, title: "ROI Immediat", desc: "Reduction mesurable de la charge administrative des la premiere semaine d'utilisation." },
  { icon: Users, title: "Concu pour l'Afrique et le Monde", desc: "Multi-devises, multi-langues, adapte aux reglementations locales et aux realites des entreprises africaines." },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50 via-white to-white pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/40 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-8">
            <Bot className="w-4 h-4 mr-2" />
            Jusqu&apos;a 30 Agents IA RH Integres
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Le SIRH optimise IA qui fait{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              50% du travail de la DRH
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto mb-4">
            Targetym AI : la suite SIRH la plus complete au monde avec jusqu&apos;a 30 agents IA RH integres.
            Passez de l&apos;administration du personnel au pilotage de la performance humaine.
          </p>

          <p className="text-base text-gray-500 max-w-3xl mx-auto mb-10">
            Recrutement, gestion des talents, evaluations 360&deg;, OKR, formation, documents RH,
            conformite... Tout est automatise, intelligent et integrable a votre ecosysteme.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login?tab=register"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25"
            >
              Demarrer l&apos;Essai Gratuit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Decouvrir les Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Targetym AI change la donne
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Bien plus qu&apos;un SIRH classique : une plateforme intelligente qui transforme
              radicalement la gestion des ressources humaines
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {valuePropositions.map((vp, index) => (
              <div
                key={index}
                className="relative p-8 bg-gradient-to-b from-white to-gray-50 border border-gray-100 rounded-2xl hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-100 transition-colors">
                  <vp.icon className="w-7 h-7 text-primary-500" />
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-black text-primary-500">{vp.highlight}</span>
                  <span className="ml-2 text-sm font-medium text-gray-500">{vp.highlightLabel}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {vp.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {vp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents Showcase */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Intelligence Artificielle
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              30 Agents IA RH a Votre Service
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Chaque agent est specialise dans un domaine RH precis. Ils travaillent ensemble,
              24h/24, pour automatiser, analyser et optimiser vos processus.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {aiAgents.map((agent, index) => (
              <div
                key={index}
                className="p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary-500/30 transition-all group"
              >
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary-500/30 transition-colors">
                  <agent.icon className="w-5 h-5 text-primary-400" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">
                  {agent.name}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {agent.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            Et bien d&apos;autres agents specialises : paie, bien-etre, onboarding, offboarding, audit RH...
          </p>
        </div>
      </section>

      {/* What You Can Do - Capabilities */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tout ce que vous pouvez faire avec Targetym AI
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Une suite SIRH complete qui couvre l&apos;ensemble du cycle de vie de vos collaborateurs,
              de l&apos;embauche au depart
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((cap, index) => (
              <div
                key={index}
                className="p-8 bg-gray-50 rounded-2xl border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="w-8 h-8 bg-primary-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </span>
                  {cap.category}
                </h3>
                <ul className="space-y-3">
                  {cap.items.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ce qui rend Targetym AI unique
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Pas un SIRH de plus. Une revolution dans la facon de gerer le capital humain.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((diff, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-gray-100 rounded-xl hover:shadow-lg hover:border-primary-100 transition-all"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                  <diff.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {diff.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-12 md:p-16 text-white text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Passez de l&apos;administration au pilotage strategique
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
              Targetym AI transforme votre DRH en centre de decision strategique.
              Fini les taches repetitives, place a l&apos;intelligence collective et a la performance humaine.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-black mb-2">-50%</div>
                <div className="text-sm text-white/70">de charge administrative RH</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-black mb-2">30+</div>
                <div className="text-sm text-white/70">agents IA specialises</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-black mb-2">100%</div>
                <div className="text-sm text-white/70">SIRH integreable</div>
              </div>
            </div>

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
                Demander une Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
