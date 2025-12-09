import Link from 'next/link';
import { 
  BarChart3, 
  Users, 
  Target, 
  TrendingUp, 
  Shield, 
  Sparkles,
  ArrowRight,
  Star
} from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: "Analytique Avancée",
    description: "Obtenez des insights approfondis sur votre personnel avec des analyses alimentées par l'IA et des tableaux de bord en temps réel."
  },
  {
    icon: Users,
    title: "Gestion des Employés",
    description: "Rationalisez les processus RH avec des profils d'employés complets et un suivi des performances."
  },
  {
    icon: Target,
    title: "Objectifs & OKRs",
    description: "Alignez vos équipes avec les objectifs de l'entreprise grâce à la définition et au suivi d'objectifs structurés."
  },
  {
    icon: TrendingUp,
    title: "Évaluations de Performance",
    description: "Menez des évaluations de performance équitables et complètes avec des retours à 360 degrés."
  },
  {
    icon: Shield,
    title: "Sécurité Entreprise",
    description: "Sécurité de niveau bancaire avec conformité SOC 2 et protection avancée des données."
  },
  {
    icon: Sparkles,
    title: "Insights IA",
    description: "Exploitez l'apprentissage automatique pour prédire les tendances et optimiser les décisions RH."
  }
];

const stats = [
  { value: "500+", label: "Entreprises Nous Font Confiance" },
  { value: "50k+", label: "Employés Gérés" },
  { value: "99.9%", label: "Garantie de Disponibilité" },
  { value: "24/7", label: "Support Disponible" }
];

const testimonials = [
  {
    quote: "Targetym AI a transformé notre façon de gérer notre équipe. Les insights sont incroyables et la plateforme est si intuitive.",
    author: "Sarah Johnson",
    role: "Directrice RH",
    company: "TechCorp Inc."
  },
  {
    quote: "L'analytique alimentée par l'IA nous a aidé à réduire le turnover de 40% en seulement 6 mois. Plateforme révolutionnaire.",
    author: "Mike Chen",
    role: "PDG",
    company: "StartupX"
  },
  {
    quote: "Enfin une plateforme RH qui comprend vraiment nos besoins. Le ROI a été phénoménal.",
    author: "Emily Davis",
    role: "Directrice du Personnel",
    company: "Enterprise Solutions"
  }
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50 via-white to-white pt-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Maintenant avec Analytique IA
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Transformez vos RH avec{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              l&apos;Analytique People
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Libérez la puissance des décisions RH basées sur les données. Targetym AI fournit des
            insights complets, un suivi des performances et des recommandations alimentées par
            l&apos;IA pour optimiser votre personnel.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login?tab=register"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Commencer l&apos;Essai Gratuit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Voir les Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin pour exceller
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Plateforme d&apos;analytique RH complète conçue pour les entreprises modernes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 bg-white border border-gray-100 rounded-xl hover:shadow-lg hover:border-primary-100 transition-all"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Approuvé par les entreprises leaders
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Rejoignez des centaines d&apos;entreprises qui transforment déjà leurs RH
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
