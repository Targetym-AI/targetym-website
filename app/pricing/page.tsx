'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle, 
  Shield, 
  Sparkles, 
  HeadphonesIcon,
  Phone,
  Mail
} from 'lucide-react';

const plans = [
  {
    name: "Démarrage",
    description: "Parfait pour les petites équipes qui commencent avec l'analytique RH",
    priceMonthly: 24,
    priceAnnual: 19,
    employees: "Jusqu'à 50 employés",
    savings: "Économisez 60€/an",
    features: [
      "Analytique people de base",
      "Annuaire des employés",
      "Suivi des performances",
      "Définition d'objectifs",
      "Support par email",
      "Intégrations standards"
    ],
    cta: "Commencer l'Essai Gratuit",
    highlighted: false
  },
  {
    name: "Professionnel",
    description: "Fonctionnalités avancées pour les entreprises en croissance",
    priceMonthly: 65,
    priceAnnual: 52,
    employees: "Jusqu'à 250 employés",
    savings: "Économisez 168€/an",
    features: [
      "Analytique et insights avancés",
      "Feedback à 360 degrés",
      "Évaluations de performance",
      "Gestion des OKRs",
      "Analytique d'équipe",
      "Rapports personnalisés",
      "Accès API",
      "Support prioritaire",
      "Intégrations avancées"
    ],
    cta: "Commencer l'Essai Gratuit",
    highlighted: true
  },
  {
    name: "Entreprise",
    description: "Solution complète pour les grandes organisations",
    priceMonthly: 125,
    priceAnnual: 100,
    employees: "Jusqu'à 1 000 employés",
    savings: "Économisez 288€/an",
    features: [
      "Insights alimentés par l'IA",
      "Analytique prédictive",
      "Sécurité avancée (SSO, SAML)",
      "Workflows personnalisés",
      "Rapports illimités",
      "Options marque blanche",
      "Success manager dédié",
      "Support téléphonique 24/7",
      "Intégrations personnalisées"
    ],
    cta: "Contacter les Ventes",
    highlighted: false
  },
  {
    name: "Entreprise Plus",
    description: "Solution sur mesure pour les grandes entreprises",
    priceMonthly: null,
    priceAnnual: null,
    employees: "1 000+ employés",
    savings: null,
    features: [
      "Tout dans Entreprise",
      "Modèles IA personnalisés",
      "Outils de conformité avancés",
      "Architecture multi-tenant",
      "Développement personnalisé",
      "Déploiement sur site",
      "Reporting exécutif",
      "Infrastructure dédiée"
    ],
    cta: "Contacter les Ventes",
    highlighted: false
  }
];

const addons = [
  {
    title: "Analytique IA Avancée",
    description: "Turnover prédictif, analyse de sentiment et modèles ML personnalisés",
    price: "15€/mois par 100 employés"
  },
  {
    title: "Rétention de Données Étendue",
    description: "Conservez vos données jusqu'à 7 ans au lieu des 2 ans standards",
    price: "5€/mois par 100 employés"
  },
  {
    title: "Support Premium",
    description: "Support téléphonique 24/7 et customer success manager dédié",
    price: "200€/mois"
  },
  {
    title: "Intégrations Personnalisées",
    description: "Créez des intégrations personnalisées avec vos outils existants",
    price: "À partir de 500€/mois"
  }
];

const enterpriseFeatures = [
  {
    icon: Shield,
    title: "Sécurité Avancée",
    description: "SSO, SAML, journaux d'audit avancés et reporting de conformité pour les exigences de sécurité entreprise."
  },
  {
    icon: Sparkles,
    title: "Modèles IA Personnalisés",
    description: "Créez des modèles d'apprentissage automatique personnalisés adaptés aux données et exigences uniques de votre organisation."
  },
  {
    icon: HeadphonesIcon,
    title: "Support Dédié",
    description: "Support prioritaire 24/7 avec customer success manager dédié et spécialiste de mise en œuvre."
  }
];

const faqs = [
  {
    question: "Puis-je changer mon plan à tout moment ?",
    answer: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement pour les upgrades, ou au prochain cycle de facturation pour les downgrades."
  },
  {
    question: "Y a-t-il un essai gratuit ?",
    answer: "Oui, nous offrons un essai gratuit de 14 jours pour tous les plans payants. Aucune carte de crédit n'est requise pour commencer votre essai."
  },
  {
    question: "Que se passe-t-il si je dépasse ma limite d'employés ?",
    answer: "Nous vous notifierons lorsque vous approchez de votre limite. Vous pouvez upgrader votre plan ou nous ajusterons automatiquement votre facturation selon l'usage."
  },
  {
    question: "Offrez-vous une tarification personnalisée pour les grandes organisations ?",
    answer: "Oui, nous offrons une tarification et des fonctionnalités personnalisées pour les organisations de 1 000+ employés. Contactez notre équipe commerciale pour un devis personnalisé."
  },
  {
    question: "Quelles intégrations sont incluses ?",
    answer: "Tous les plans incluent les intégrations standards avec des outils populaires comme Slack, Teams et Google Workspace. Les intégrations avancées et personnalisées sont disponibles dans les niveaux supérieurs."
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Absolument. Nous utilisons une sécurité de niveau bancaire avec conformité SOC 2 Type II, chiffrement de bout en bout et audits de sécurité réguliers."
  }
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white pt-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparente{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              Tarification
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            Choisissez le plan parfait pour votre organisation. Commencez avec un essai gratuit,
            évoluez selon votre croissance, et ne payez que ce dont vous avez besoin.
          </p>
          
          {/* Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Mensuel
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-primary-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annuel
            </span>
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Économisez 20%
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative p-6 rounded-2xl border ${
                  plan.highlighted 
                    ? 'border-primary-500 shadow-lg shadow-primary-100' 
                    : 'border-gray-200'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                      Plus Populaire
                    </span>
                  </div>
                )}
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  {plan.priceMonthly !== null ? (
                    <>
                      <span className="text-4xl font-bold text-gray-900">
                        {isAnnual ? plan.priceAnnual : plan.priceMonthly}€
                      </span>
                      <span className="text-gray-500">/mois</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">Sur Mesure</span>
                  )}
                </div>
                
                <div className="text-sm text-gray-600 mb-2">{plan.employees}</div>
                {plan.savings && isAnnual && (
                  <div className="text-sm text-green-600 font-medium mb-4">{plan.savings}</div>
                )}
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={plan.cta.includes('Contacter') ? '/contact' : '/login?tab=register'}
                  className={`w-full inline-flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    plan.highlighted
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Extensions Optionnelles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Améliorez votre plan avec des fonctionnalités et services supplémentaires
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addons.map((addon, index) => (
              <div key={index} className="p-6 bg-white rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{addon.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{addon.description}</p>
                <div className="text-primary-600 font-semibold mb-4">{addon.price}</div>
                <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Ajouter au Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fonctionnalités Entreprise
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Capacités avancées pour les grandes organisations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {enterpriseFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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
              Questions Fréquemment Posées
            </h2>
            <p className="text-lg text-gray-600">
              Vous avez des questions ? Nous avons des réponses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-white rounded-xl border border-gray-200">
                <h3 className="text-base font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Besoin d&apos;aide pour choisir ?
            </h2>
            <p className="text-lg text-gray-600">
              Notre équipe est là pour vous aider à trouver le plan parfait pour votre organisation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="p-6 bg-white rounded-xl border border-gray-200 text-center">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Parler aux Ventes</h3>
              <p className="text-sm text-gray-600 mb-4">Obtenez des recommandations personnalisées</p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Planifier un Appel
              </Link>
            </div>
            
            <div className="p-6 bg-white rounded-xl border border-gray-200 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Support Email</h3>
              <p className="text-sm text-gray-600 mb-4">Obtenez des réponses à vos questions</p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Nous Contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
