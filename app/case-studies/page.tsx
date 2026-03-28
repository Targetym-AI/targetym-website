import Link from 'next/link';
import { TrendingUp, Clock, Star, ArrowRight, Building2, Award } from 'lucide-react';

const caseStudies = [
  {
    id: 'orange-sn',
    company: "Orange Sénégal",
    industry: "Télécommunications",
    size: "600+ employés",
    location: "Dakar, Sénégal",
    plan: "Entreprise",
    logo: "/logos/orange.svg",
    logoFallback: "OS",
    color: "from-orange-400 to-orange-500",
    challenge:
      "Orange Sénégal gérait des dossiers RH en papier et des évaluations de performance non structurées pour plus de 600 collaborateurs répartis dans plusieurs régions du pays.",
    solution:
      "Déploiement de Targetym AI avec le module de gestion du personnel, les évaluations 360°, les OKR en cascade et le tableau de bord analytique.",
    results: [
      { metric: "Réduction du temps de traitement RH", value: "65%", icon: Clock },
      { metric: "Taux d'adoption employés en 3 mois", value: "92%", icon: Star },
      { metric: "Économies sur les processus manuels", value: "48M FCFA/an", icon: TrendingUp },
    ],
    quote:
      "Targetym IA a transformé notre façon de gérer nos équipes. Les managers ont enfin un outil à la hauteur de leurs ambitions.",
    author: "Aminata Diallo",
    authorTitle: "DRH, Orange Sénégal",
    tags: ["OKR", "Performance", "Analytics", "Mode Groupe"],
  },
  {
    id: 'bsic',
    company: "BSIC Côte d'Ivoire",
    industry: "Banque & Finance",
    size: "320 employés",
    location: "Abidjan, Côte d'Ivoire",
    plan: "Premium",
    logo: "/logos/bsic.svg",
    logoFallback: "BI",
    color: "from-blue-500 to-blue-600",
    challenge:
      "La Banque Sahélo-Saharienne pour l'Investissement et le Commerce (BSIC) avait besoin de standardiser ses processus de recrutement, de formation et d'évaluation du personnel dans plusieurs agences.",
    solution:
      "Mise en place de Targetym AI Premium avec les workflows de recrutement, le portail de formation e-learning et les parcours de développement des carrières.",
    results: [
      { metric: "Délai moyen de recrutement", value: "-42 jours", icon: Clock },
      { metric: "Formations complétées sur la plateforme", value: "1 200+", icon: Award },
      { metric: "Coût RH par employé (1ère année)", value: "-28%", icon: TrendingUp },
    ],
    quote:
      "Le module formation a permis à nos collaborateurs de monter en compétences sans interruption d'activité. Un vrai gain pour l'organisation.",
    author: "Koffi N'Guessan",
    authorTitle: "Directeur RH, BSIC CI",
    tags: ["Recrutement", "Formation", "Carrières", "Documents RH"],
  },
  {
    id: 'olam-ci',
    company: "Olam Côte d'Ivoire",
    industry: "Agrobusiness & Distribution",
    size: "850 employés",
    location: "San-Pédro, Côte d'Ivoire",
    plan: "Entreprise",
    logo: "/logos/olam.svg",
    logoFallback: "OL",
    color: "from-green-500 to-green-600",
    challenge:
      "Avec des équipes terrain dispersées dans plusieurs zones de production, Olam CI devait digitaliser la gestion des missions, des congés et des évaluations de performance des superviseurs.",
    solution:
      "Déploiement Entreprise avec gestion des missions géolocalisées, suivi des congés, évaluations terrain et agents IA pour automatiser les rapports hebdomadaires.",
    results: [
      { metric: "Productivité terrain améliorée", value: "+38%", icon: TrendingUp },
      { metric: "Rapports automatisés par mois", value: "240+", icon: Star },
      { metric: "Temps libéré pour les managers", value: "12h/semaine", icon: Clock },
    ],
    quote:
      "Nos superviseurs terrain peuvent enfin se concentrer sur l'essentiel. L'agent IA s'occupe des rapports à leur place.",
    author: "Samba Touré",
    authorTitle: "Responsable Excellence Opérationnelle",
    tags: ["Missions", "Agent IA", "Performance", "Congés"],
  },
  {
    id: 'canal-plus-afrique',
    company: "Canal+ Afrique (Groupe Vivendi)",
    industry: "Médias & Divertissement",
    size: "250 employés",
    location: "Dakar / Abidjan",
    plan: "Premium",
    logo: "/logos/canalplus.svg",
    logoFallback: "C+",
    color: "from-gray-700 to-gray-900",
    challenge:
      "Canal+ Afrique centralisait les RH pour deux entités (Sénégal et Côte d'Ivoire) avec des processus différents, une double gestion des dossiers et aucune visibilité consolidée sur les talents.",
    solution:
      "Activation du mode multi-entités de Targetym AI avec tableau de bord centralisé, matrice des talents 9-Box, plan de succession et gestion unifiée des documents RH.",
    results: [
      { metric: "Visibilité RH consolidée", value: "2 pays", icon: Building2 },
      { metric: "Temps de traitement des documents", value: "-70%", icon: Clock },
      { metric: "Taux rétention talents clés (12 mois)", value: "+22%", icon: Star },
    ],
    quote:
      "Targetym IA nous a permis de voir nos talents comme un seul portefeuille, indépendamment des frontières géographiques.",
    author: "Fatou Cissé",
    authorTitle: "HR Business Partner, Canal+ Afrique",
    tags: ["Multi-entités", "Talent Management", "Documents", "Succession"],
  },
];

const stats = [
  { value: "2 000+", label: "Employés gérés via Targetym AI" },
  { value: "35%", label: "Gain moyen de productivité RH" },
  { value: "4 pays", label: "Présence en Afrique de l'Ouest" },
  { value: "92%", label: "Taux de satisfaction client" },
];

export default function CaseStudiesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white pt-16 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            Études de cas clients
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Ils ont transformé leurs{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              RH en Afrique
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez comment des entreprises africaines utilisent Targetym AI pour piloter leurs équipes,
            automatiser leurs processus RH et développer les talents.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-primary-600 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
          {caseStudies.map((cs, index) => (
            <article
              key={cs.id}
              className={`grid md:grid-cols-5 gap-8 rounded-2xl border border-gray-200 overflow-hidden ${
                index % 2 === 1 ? 'md:grid-flow-dense' : ''
              }`}
            >
              {/* Sidebar */}
              <div className={`md:col-span-2 bg-gradient-to-br ${cs.color} p-8 flex flex-col justify-between text-white ${
                index % 2 === 1 ? 'md:col-start-4' : ''
              }`}>
                <div>
                  {/* Logo placeholder */}
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-5 text-gray-800 font-bold text-lg shadow">
                    {cs.logoFallback}
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{cs.company}</h3>
                  <p className="text-white/70 text-sm mb-4">{cs.location}</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex gap-2"><span className="opacity-60">Secteur :</span><span className="font-medium">{cs.industry}</span></div>
                    <div className="flex gap-2"><span className="opacity-60">Taille :</span><span className="font-medium">{cs.size}</span></div>
                    <div className="flex gap-2"><span className="opacity-60">Plan :</span><span className="font-medium">{cs.plan}</span></div>
                  </div>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {cs.tags.map((tag, i) => (
                    <span key={i} className="px-2.5 py-1 bg-white/20 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className={`md:col-span-3 p-8 flex flex-col justify-between ${
                index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''
              }`}>
                <div>
                  <div className="mb-5">
                    <h4 className="text-xs font-bold uppercase text-gray-400 mb-1">Le défi</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase text-gray-400 mb-1">La solution</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{cs.solution}</p>
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {cs.results.map((result, i) => (
                      <div key={i} className="bg-primary-50 rounded-xl p-3 text-center">
                        <result.icon className="w-4 h-4 text-primary-500 mx-auto mb-1" />
                        <div className="text-lg font-black text-primary-600">{result.value}</div>
                        <div className="text-xs text-gray-500 leading-tight mt-1">{result.metric}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="border-l-4 border-primary-300 pl-4">
                  <p className="text-gray-700 italic text-sm mb-2">&ldquo;{cs.quote}&rdquo;</p>
                  <cite className="text-xs text-gray-500 not-italic">
                    <span className="font-bold text-gray-700">{cs.author}</span> · {cs.authorTitle}
                  </cite>
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Votre entreprise sera la prochaine success story
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Rejoignez les équipes RH africaines qui pilotent leurs talents avec Targetym AI.
              Essai gratuit 30 jours, sans carte bancaire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login?tab=register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-primary-600 bg-white rounded-xl hover:bg-gray-100 transition-colors"
              >
                Démarrer Gratuitement
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-colors"
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
