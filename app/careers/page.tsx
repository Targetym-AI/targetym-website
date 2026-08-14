import type { Metadata } from 'next';
import { Rocket, Heart, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Carrières — Targetym AI',
  description: "Rejoignez l'équipe Targetym AI, le SIRH n°1 en Afrique (Sénégal, Côte d'Ivoire, Bénin, Cameroun, Mali). Construisons ensemble l'avenir des RH africaines.",
  keywords: [
    'emploi Targetym AI',
    'carrières SIRH Afrique',
    'logiciel RH Afrique',
    'emploi tech Sénégal',
    "emploi tech Côte d'Ivoire",
    'Targetym AI',
  ],
};

const perks = [
  {
    icon: Rocket,
    title: "Impact direct",
    desc: "Vos contributions transforment la gestion des talents dans des centaines d'entreprises africaines.",
  },
  {
    icon: Heart,
    title: "Culture bienveillante",
    desc: "Une équipe soudée, flexible et orientée résultats. Le bien-être est une priorité, pas un bonus.",
  },
  {
    icon: Zap,
    title: "Technologie de pointe",
    desc: "Vous travaillez avec les dernières avancées en IA, FastAPI, Next.js et analytics at scale.",
  },
];

export default function CareersPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white pt-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Rejoignez l&apos;aventure Targetym AI
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nous construisons la suite SIRH qui va redéfinir la gestion des talents en Afrique. Si vous êtes passionné(e) par la tech et les RH, votre place est ici.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi nous rejoindre ?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {perks.map((p) => (
              <div key={p.title} className="bg-gray-50 rounded-xl p-8">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <p.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Postes ouverts</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Nous sommes en pleine croissance. Aucun poste listé ne correspond à votre profil ? Envoyez-nous une candidature spontanée.
            </p>
          </div>

          <div className="text-center bg-white rounded-2xl border border-dashed border-gray-300 py-20 px-8">
            <p className="text-gray-500 text-lg mb-2">Aucun poste ouvert pour le moment.</p>
            <p className="text-gray-400 mb-8">Revenez bientôt ou envoyez une candidature spontanée.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors"
            >
              Candidature spontanée <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
