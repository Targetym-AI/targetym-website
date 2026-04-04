import Link from 'next/link';
import Image from 'next/image';
import {
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
    title: "50% du travail de la DRH automatisé",
    description: "Targetym AI prend en charge la moitié des tâches répétitives et chronophages de votre Direction des Ressources Humaines : génération de documents, suivi des congés, évaluations, rapports... Vos équipes RH se concentrent enfin sur l'essentiel.",
    highlight: "50%",
    highlightLabel: "de gain de temps RH"
  },
  {
    icon: Bot,
    title: "Jusqu'à 30 agents IA RH intégrés",
    description: "La plus grande flotte d'agents IA spécialisés RH au monde, directement intégrée dans votre SIRH. Chaque agent maîtrise un domaine : recrutement, performance, formation, bien-être...",
    highlight: "30",
    highlightLabel: "agents IA spécialisés"
  },
  {
    icon: Layers,
    title: "Du personnel au pilotage de la performance",
    description: "Passez de la simple administration du personnel au pilotage stratégique de la performance humaine. Un SIRH intégrable qui transforme vos données RH en décisions éclairées.",
    highlight: "360\u00b0",
    highlightLabel: "vision de la performance"
  }
];

const aiAgents = [
  { icon: FileText, name: "Agent Documents", desc: "Génère automatiquement attestations, certificats de travail et documents RH" },
  { icon: UserPlus, name: "Agent Recrutement", desc: "Filtre les candidatures, évalue les profils et propose les meilleurs matchs" },
  { icon: TrendingUp, name: "Agent Performance", desc: "Analyse les évaluations 360\u00b0 et recommande des plans de développement" },
  { icon: Target, name: "Agent OKR", desc: "Suit les objectifs en temps réel et alerte sur les écarts de performance" },
  { icon: GraduationCap, name: "Agent Formation", desc: "Identifie les besoins en compétences et propose des parcours personnalisés" },
  { icon: CalendarCheck, name: "Agent Planning", desc: "Optimise la gestion des congés, absences et plannings d'équipe" },
  { icon: MessageSquare, name: "Agent Engagement", desc: "Mesure le climat social et propose des actions pour améliorer le bien-être" },
  { icon: PieChart, name: "Agent Analytics", desc: "Tableaux de bord intelligents et prédictions sur le turnover et la rétention" },
  { icon: Award, name: "Agent Talents", desc: "Cartographie les talents, détecte les hauts potentiels via la matrice 9-Box" },
];

const capabilities = [
  {
    category: "Administration du Personnel",
    items: [
      "Gestion complète des dossiers employés",
      "Generation automatique de documents RH (attestations, certificats)",
      "Suivi des contrats, périodes d'essai et échéances",
      "Gestion des congés et absences avec validation multi-niveaux",
      "Organigramme dynamique et interactif"
    ]
  },
  {
    category: "Performance & OKR",
    items: [
      "Objectifs et Key Results (OKR) en cascade",
      "Évaluations de performance 360\u00b0 avec campagnes automatisées",
      "Entretiens one-on-one structures avec suivi",
      "Daily Checklist connectee aux KRs",
      "Calibrage et classement des performances"
    ]
  },
  {
    category: "Talents & Développement",
    items: [
      "Matrice 9-Box pour cartographier les talents",
      "Plans de succession et mobilité interne",
      "Parcours de formation personnalisés par l'IA",
      "Analyse des écarts de compétences",
      "Suivi des certifications et habilitations"
    ]
  },
  {
    category: "Pilotage & Intelligence RH",
    items: [
      "Tableaux de bord RH en temps reel",
      "Prédictions IA sur le turnover et la rétention",
      "Analyse du climat social et de l'engagement",
      "Rapports automatisés pour la direction",
      "Benchmarks et indicateurs clés de performance RH"
    ]
  }
];

const differentiators = [
  { icon: Cpu, title: "IA Générative Intégrée", desc: "Pas un simple chatbot : de vrais agents IA qui exécutent des actions RH complexes de bout en bout." },
  { icon: Shield, title: "Sécurité de Niveau Entreprise", desc: "Chiffrement des données, contrôle d'accès granulaire par rôle et conformité aux normes de protection des données." },
  { icon: Zap, title: "Déploiement Rapide", desc: "Operationnel en quelques jours, pas en mois. Intégration facile avec vos outils existants via API ouverte." },
  { icon: Settings, title: "SIRH Intégrable", desc: "S'adapte à votre écosystème existant. Connectez Targetym AI à vos outils de paie, comptabilite et communication." },
  { icon: Clock, title: "ROI Immédiat", desc: "Réduction mesurable de la charge administrative dès la première semaine d'utilisation." },
  { icon: Users, title: "Conçu pour l'Afrique et le Monde", desc: "Multi-devises, multi-langues, adapté aux réglementations locales et aux réalités des entreprises africaines." },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/15 text-white rounded-full text-sm font-medium mb-8 backdrop-blur-sm border border-white/20">
            <Bot className="w-4 h-4 mr-2" />
            Jusqu&apos;à 30 Agents IA RH Intégrés
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Le SIRH optimisé IA qui fait{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
              50% du travail du DRH
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/85 max-w-4xl mx-auto mb-4">
            Targetym AI : la suite SIRH la plus complète au monde avec jusqu&apos;à 30 agents IA RH intégrés.
            Passez de l&apos;administration du personnel au pilotage de la performance humaine.
          </p>

          <p className="text-base text-white/65 max-w-3xl mx-auto mb-10">
            Recrutement, gestion des talents, évaluations 360&deg;, OKR, formation, documents RH...
            Tout est automatisé, intelligent et intégrable a votre ecosysteme.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login?tab=register"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Démarrer l&apos;Essai Gratuit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors"
            >
              Découvrir les Solutions
            </Link>
          </div>

          {/* Dashboard Screenshot */}
          <div className="mt-16 max-w-5xl mx-auto perspective-1000">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-white/20 transform rotate-x-1">
              <div className="bg-gray-800 px-4 py-2.5 flex items-center gap-2 border-b border-gray-700">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-4 flex-1 bg-gray-700 rounded-md h-6 flex items-center px-3">
                  <span className="text-xs text-gray-400">app.targetym.com/dashboard</span>
                </div>
              </div>
              <Image
                src="/modules/dashboard.png"
                alt="Tableau de bord Targetym AI"
                width={1200}
                height={700}
                className="w-full h-auto"
                priority
              />
            </div>
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
              30 Agents IA RH à Votre Service
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Chaque agent est spécialisé dans un domaine RH précis. Ils travaillent ensemble,
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
            Et bien d&apos;autres agents spécialisés : bien-être, onboarding, offboarding, audit RH...
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
              de l&apos;embauche au départ
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
              Pas un SIRH de plus. Une révolution dans la façon de gérer le capital humain.
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
              Passez de l&apos;administration au pilotage stratégique
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
              Targetym AI transforme votre DRH en centre de décision stratégique.
              Fini les tâches répétitives, place à l&apos;intelligence collective et à la performance humaine.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-black mb-2">-50%</div>
                <div className="text-sm text-white/70">de charge administrative RH</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-black mb-2">30+</div>
                <div className="text-sm text-white/70">agents IA spécialisés</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-black mb-2">100%</div>
                <div className="text-sm text-white/70">SIRH intégrable</div>
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
                Demander une Démo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
