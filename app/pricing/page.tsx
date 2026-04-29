import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle,
  Shield,
  Sparkles,
  HeadphonesIcon,
  Phone,
  X,
  Zap,
  Users,
  Building2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tarifs SIRH IA en Afrique – Plans Targetym AI',
  description: "Tarifs SIRH IA Targetym AI pour l'Afrique : forfaits flexibles PME et grands groupes. Paie, performance, talents — prix par employé.",
};

const plans = [
  {
    name: "Basique",
    tagline: "Starter",
    description: "Idéal pour les PME qui démarrent leur digitalisation RH",
    price: "197 000",
    priceNote: "FCFA / mois",
    employees: "Jusqu'à 25 employés inclus",
    extraEmployee: "+ 12 500 FCFA / employé supplémentaire",
    features: [
      "Gestion des dossiers du personnel",
      "Recrutement & onboarding",
      "Gestion des congés & absences",
      "Gestion des missions",
      "Sanctions disciplinaires",
      "Organigramme dynamique",
      "Assistant IA conversationnel",
    ],
    notIncluded: [
      "OKR & objectifs",
      "Évaluations de performance",
      "Formation & apprentissage",
      "Analytique avancée",
      "Documents RH automatisés",
    ],
    cta: "Démarrer l'Essai Gratuit",
    highlighted: false,
    icon: Zap,
    color: "from-teal-500 to-teal-600",
    badgeColor: "bg-teal-100 text-teal-700",
  },
  {
    name: "Premium",
    tagline: "Le plus populaire",
    description: "Pour les entreprises qui veulent piloter la performance humaine",
    price: "597 000",
    priceNote: "FCFA / mois",
    employees: "Jusqu'à 50 employés inclus",
    extraEmployee: "+ 12 500 FCFA / employé supplémentaire",
    features: [
      "Tout le plan Basique",
      "OKR & objectifs en cascade",
      "Évaluations de performance 360°",
      "Entretiens one-on-one",
      "Formation & parcours e-learning",
      "Gestion des talents — Matrice 9-Box",
      "Documents RH automatisés",
      "Analytique RH avancée",
      "Suivi des départs",
      "Agent IA RH spécialisé",
      "Module Paie (add-on optionnel)",
    ],
    notIncluded: [],
    cta: "Démarrer l'Essai Gratuit",
    highlighted: true,
    icon: Users,
    color: "from-primary-500 to-primary-600",
    badgeColor: "bg-primary-100 text-primary-700",
  },
  {
    name: "Entreprise",
    tagline: "Sur mesure",
    description: "Pour les grandes structures et groupes multi-entités",
    price: "1 000 000",
    priceNote: "FCFA / mois  ·  ou 12 000 000 FCFA / an",
    employees: "Jusqu'à 100 employés inclus",
    extraEmployee: "+ 5 000 FCFA / employé supplémentaire",
    features: [
      "Tout le plan Premium",
      "ATS — Système de suivi des candidatures",
      "Module Paie intégré",
      "Agent IA avancé multi-domaines",
      "Certifications RH",
      "Data insights & prédictif",
      "Mode groupe & filiales",
      "Support prioritaire 24h/24",
      "Architecture multi-tenant",
      "Déploiement dédié sur demande",
      "Budget RH — Pilotage & saisie budgétaire",
    ],
    notIncluded: [],
    cta: "Démarrer l'Essai Gratuit",
    highlighted: false,
    icon: Building2,
    color: "from-violet-500 to-violet-600",
    badgeColor: "bg-violet-100 text-violet-700",
  },
];

const addons = [
  {
    title: "Employé supplémentaire",
    description: "Au-delà du quota inclus dans votre plan",
    price: "12 500 FCFA / employé / mois",
    priceEntreprise: "5 000 FCFA / employé / mois (Entreprise)",
  },
  {
    title: "Filiale (mode Groupe)",
    description: "Ajoutez des filiales à votre tableau de bord groupe",
    price: "30 000 FCFA / filiale / mois",
    priceEntreprise: null,
  },
  {
    title: "Module Paie",
    description: "Bulletins de paie officiels, cotisations IPRES/CSS/IPM/CFCE, IR sénégalais. Inclus dans Entreprise, disponible en add-on pour Premium.",
    price: "Sur devis",
    priceEntreprise: "Inclus dans Entreprise",
  },
  {
    title: "Support Premium",
    description: "Manager dédié + support téléphonique 24h/24",
    price: "Inclus dans Entreprise",
    priceEntreprise: null,
  },
];

const enterpriseFeatures = [
  {
    icon: Shield,
    title: "Sécurité Avancée",
    description: "Authentification 2FA disponible sur tous les plans, journaux d'audit complets et contrôle d'accès granulaire par rôle.",
  },
  {
    icon: Sparkles,
    title: "Agent IA Avancé",
    description: "Agents IA multi-domaines capables d'exécuter des actions RH complexes de bout en bout, en français, anglais, portugais et arabe.",
  },
  {
    icon: HeadphonesIcon,
    title: "Support Dédié 24h/24",
    description: "Manager de succès client dédié et support prioritaire inclus dans le plan Entreprise.",
  },
];

const faqs = [
  {
    question: "Puis-je changer de plan à tout moment ?",
    answer: "Oui, vous pouvez demander un changement de plan depuis vos paramètres. Notre équipe traitera votre demande sous 24h ouvrées.",
  },
  {
    question: "Y a-t-il un essai gratuit ?",
    answer: "Oui, nous offrons un essai gratuit de 30 jours avec accès complet au plan Entreprise (jusqu'à 100 employés). Aucun paiement requis pour commencer.",
  },
  {
    question: "Que se passe-t-il si je dépasse ma limite d'employés ?",
    answer: "Vous serez notifié lorsque vous approchez de la limite. Chaque employé supplémentaire est facturé 12 500 FCFA/mois (Basique & Premium) ou 5 000 FCFA/mois (Entreprise).",
  },
  {
    question: "La plateforme est-elle adaptée au contexte africain ?",
    answer: "Oui, Targetym AI est conçu pour les entreprises africaines : devise FCFA/XOF, conformité au droit du travail local, interface multilingue et support réactif en français.",
  },
  {
    question: "Comment fonctionne le mode Groupe ?",
    answer: "Le mode Groupe permet à une maison mère de gérer plusieurs filiales depuis un tableau de bord centralisé. Tarif : forfait groupe 100 000 XOF + 30 000 XOF/filiale/mois.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Absolument. Toutes les données sont chiffrées, hébergées de manière sécurisée, avec authentification 2FA disponible et contrôle d'accès par rôle.",
  },
];

export default function PricingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white pt-16 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            Essai gratuit 30 jours — aucune carte bancaire requise
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Des tarifs clairs,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              en FCFA
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choisissez le plan adapté à la taille de votre équipe et à vos besoins RH.
            Pas de frais cachés, pas de surprise.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative flex flex-col rounded-2xl border ${
                  plan.highlighted
                    ? 'border-primary-500 shadow-xl shadow-primary-100'
                    : 'border-gray-200'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full shadow">
                      ⭐ Le plus populaire
                    </span>
                  </div>
                )}

                {/* Color accent */}
                <div className={`h-1.5 rounded-t-2xl bg-gradient-to-r ${plan.color}`} />

                <div className="p-7 flex flex-col flex-1">
                  {/* Header */}
                  <div className="mb-5">
                    <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full mb-3 ${plan.badgeColor}`}>
                      {plan.tagline}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
                  </div>

                  {/* Employees info only — prices hidden */}
                  <div className="mb-5 pb-5 border-b border-gray-100">
                    <p className="text-sm text-gray-600 font-medium">{plan.employees}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{plan.extraEmployee}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-400">
                        <X className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/essai-gratuit"
                    className={`w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${
                      plan.highlighted
                        ? 'bg-primary-500 text-white hover:bg-primary-600'
                        : 'border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            Tous les prix sont HT · Devise : FCFA (Franc CFA) · Facturation mensuelle ou annuelle
          </p>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Options supplémentaires
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Personnalisez votre abonnement selon vos besoins exacts
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {addons.map((addon, index) => (
              <div key={index} className="p-6 bg-white rounded-xl border border-gray-200">
                <h3 className="text-base font-bold text-gray-900 mb-1">{addon.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{addon.description}</p>
                <div className="text-primary-600 font-semibold text-sm">{addon.price}</div>
                {addon.priceEntreprise && (
                  <div className="text-violet-600 font-medium text-xs mt-0.5">{addon.priceEntreprise}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fonctionnalités Entreprise
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Capacités avancées pour les grandes organisations et les groupes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {enterpriseFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-lg text-gray-600">
              Vous avez des questions ? Nous avons des réponses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-white rounded-xl border border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Besoin d&apos;aide pour choisir ?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Notre équipe est disponible pour vous conseiller et trouver le plan adapté à votre structure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/essai-gratuit"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-primary-600 bg-white rounded-xl hover:bg-gray-100 transition-colors"
              >
                Démarrer l&apos;Essai Gratuit
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Parler à l&apos;Équipe
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
