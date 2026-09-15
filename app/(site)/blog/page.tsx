import Cta from '@/components/site/Cta';
import BlogExplorer from '@/components/site/blog/BlogExplorer';
import { fetchCategories, fetchPosts } from '@/lib/site/blog';

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  RH: {
    title: 'Articles RH | Blog Targetym AI',
    description: "Conseils RH pratiques, gestion des talents, paie et performance pour les équipes africaines. Blog Targetym AI.",
  },
  DIGITALISATION: {
    title: 'Digitalisation RH en Afrique | Blog Targetym AI',
    description: "Transformation digitale des RH en Afrique : SIRH IA, automatisation des processus et conduite du changement.",
  },
  PERFORMANCE: {
    title: 'Performance & OKR RH | Blog Targetym AI',
    description: "Pilotez la performance de vos équipes : OKR, feedback continu, évaluations et indicateurs RH adaptés à l'Afrique.",
  },
  RECRUTEMENT: {
    title: 'Recrutement & Talents | Blog Targetym AI',
    description: "Stratégies de recrutement, scoring IA des candidats et gestion des talents pour les entreprises africaines.",
  },
  PAIE: {
    title: 'Paie & Conformité RH | Blog Targetym AI',
    description: "Module Paie, conformité réglementaire OHADA et bonnes pratiques de gestion administrative RH en Afrique.",
  },
  IA: {
    title: 'IA & Agents RH | Blog Targetym AI',
    description: "Intelligence artificielle appliquée aux RH : agents IA spécialisés, automatisation et analytics pour l'Afrique.",
  },
  MANAGEMENT: {
    title: 'Management & Leadership RH | Blog Targetym AI',
    description: "Conseils en management, leadership et culture d'entreprise adaptés aux réalités des organisations africaines.",
  },
  FORMATION: {
    title: 'Formation & Développement RH | Blog Targetym AI',
    description: "Plans de formation, montée en compétences et développement des collaborateurs en entreprise africaine.",
  },
};

const BLOG_KEYWORDS = [
  'blog SIRH Afrique',
  'SIRH Afrique',
  'logiciel RH Afrique',
  'SIRH IA',
  'meilleur SIRH en Afrique',
  'digitalisation RH Afrique',
  'gestion RH Afrique',
  'SIRH Sénégal',
  "SIRH Côte d'Ivoire",
  'SIRH Mali',
  'SIRH Guinée',
  'SIRH Gabon',
  'SIRH Congo',
  'SIRH Comores',
  'Targetym AI',
];

function getCategoryMeta(category: string) {
  const upper = category.toUpperCase();
  return CATEGORY_META[upper] ?? CATEGORY_META[category] ?? null;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;
  if (category) {
    const known = getCategoryMeta(category);
    if (known) return {
      ...known,
      keywords: [...BLOG_KEYWORDS, `articles ${category.toLowerCase()}`],
      alternates: { canonical: `/blog?category=${encodeURIComponent(category)}` },
    };
    return {
      title: `Articles ${category} | Blog Targetym AI`,
      keywords: [...BLOG_KEYWORDS, `articles ${category.toLowerCase()}`],
      description: `Retrouvez tous nos articles sur le thème "${category}" : analyses, conseils et bonnes pratiques RH pour l'Afrique.`,
      alternates: { canonical: `/blog?category=${encodeURIComponent(category)}` },
    };
  }
  return {
    title: 'Blog SIRH & IA RH en Afrique | Targetym AI',
    keywords: BLOG_KEYWORDS,
    description: "Actualités RH, conseils pratiques et retours d'expérience SIRH et IA pour les entreprises africaines.",
    alternates: { canonical: '/blog' },
  };
}

export default async function BlogPage({ searchParams }: { searchParams: { category?: string; q?: string } }) {
  const [{ items }, categories] = await Promise.all([fetchPosts({ limit: 50 }), fetchCategories()]);

  return (
    <>
      <section className="page-head">
        <p className="eyebrow">Le blog</p>
        <h1>RH, tech &amp; management <span>conseils pratiques pour les équipes africaines</span></h1>
        <p className="lead">Tendances RH, retours d&apos;expérience et méthodes concrètes pour digitaliser vos processus, du recrutement au pilotage de la performance.</p>
      </section>

      <BlogExplorer initialPosts={items} initialCategories={categories} initialCategory={searchParams.category} initialQuery={searchParams.q} />

      <Cta
        image="/img/mod-7a.jpg"
        title={<>Prêt à transformer<br />vos RH&nbsp;?</>}
        text="Rejoignez les entreprises africaines qui pilotent déjà leurs équipes avec Targetym AI. Essai gratuit de 15 jours, sans carte bancaire."
        secondLabel="Voir les solutions"
        secondHref="/solutions"
      />
    </>
  );
}
