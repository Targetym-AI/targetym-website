import type { Metadata } from 'next';
import { Target, Users, Globe, TrendingUp, Lightbulb, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'À Propos — Targetym AI',
  description: "Découvrez Targetym AI, la suite SIRH intelligente conçue pour les entreprises africaines. Notre mission, notre vision et notre équipe.",
};

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "Nous intégrons les dernières avancées de l'IA pour résoudre des problèmes RH concrets et mesurables.",
  },
  {
    icon: Users,
    title: "Centré sur l'humain",
    desc: "La technologie est au service des collaborateurs. Chaque fonctionnalité est pensée pour améliorer l'expérience employé.",
  },
  {
    icon: Globe,
    title: "Ancré en Afrique",
    desc: "Conçu pour les réalités africaines : devise locale (FCFA/XOF), droit du travail, langues et support en français.",
  },
  {
    icon: Shield,
    title: "Confiance & Sécurité",
    desc: "Vos données RH sont sensibles. Nous appliquons les standards les plus élevés de sécurité et de confidentialité.",
  },
  {
    icon: TrendingUp,
    title: "Performance",
    desc: "Nous mesurons notre succès à travers la croissance de nos clients et l'impact mesurable sur leur ROI RH.",
  },
  {
    icon: Target,
    title: "Précision",
    desc: "Des analyses data-driven et des recommandations IA pour des décisions RH basées sur les faits, pas les intuitions.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white pt-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            À Propos de Targetym AI
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nous construisons la suite SIRH la plus intelligente pour les entreprises d&apos;Afrique francophone — combinant analytique people, IA et automatisation dans une plateforme unifiée.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Mission</h2>
              <p className="text-gray-600 text-lg mb-4">
                Targetym AI est né d&apos;un constat simple : les équipes RH passent trop de temps sur des tâches administratives répétitives et pas assez sur ce qui compte vraiment — les collaborateurs.
              </p>
              <p className="text-gray-600 text-lg mb-4">
                Notre mission est de libérer les professionnels RH de ces charges en leur fournissant une plateforme dotée de 30+ agents IA capables d&apos;automatiser la génération de documents, le suivi des congés, les évaluations, les rapports et bien plus encore.
              </p>
              <p className="text-gray-600 text-lg">
                Résultat : vos équipes RH se concentrent enfin sur l&apos;essentiel — le développement humain et la performance collective.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-10 text-white text-center">
              <div className="text-6xl font-bold mb-2">30+</div>
              <div className="text-xl mb-8">Agents IA RH intégrés</div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-4xl font-bold">50%</div>
                  <div className="text-sm opacity-80">tâches automatisées</div>
                </div>
                <div>
                  <div className="text-4xl font-bold">3x</div>
                  <div className="text-sm opacity-80">productivité RH</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ces principes guident chaque décision produit et chaque interaction avec nos clients.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à transformer votre gestion RH ?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Rejoignez les entreprises qui font confiance à Targetym AI pour gérer leurs talents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://dashboard.targetym.ai"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors"
            >
              Essayer gratuitement
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-gray-600 text-white font-semibold hover:border-gray-400 transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
