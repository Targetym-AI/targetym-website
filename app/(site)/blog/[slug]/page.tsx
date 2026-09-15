import ArticleClientFallback from '@/components/site/article/ArticleClientFallback';
import ArticleSidebar, { type SidebarAd } from '@/components/site/article/ArticleSidebar';
import ArticleView from '@/components/site/article/ArticleView';
import { SERVER_FETCH_HEADERS } from '@/lib/http';
import { API_URL, fetchCategories, fetchPosts } from '@/lib/site/blog';
import type { BlogPostFull } from '@/lib/site/markdown';

async function fetchPost(slug: string): Promise<BlogPostFull | null> {
  try {
    const res = await fetch(`${API_URL}/api/public/blog/${slug}`, {
      cache: 'no-store',
      headers: SERVER_FETCH_HEADERS,
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function fetchBlogAds(): Promise<SidebarAd[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/blog-ads`, {
      cache: 'no-store',
      headers: SERVER_FETCH_HEADERS,
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function buildBlogTitle(postTitle: string): string {
  const suffix = ' | Targetym AI';
  const maxLength = 70;
  const available = maxLength - suffix.length;
  if (postTitle.length <= available) {
    return `${postTitle}${suffix}`;
  }
  return `${postTitle.slice(0, available - 1).trimEnd()}…${suffix}`;
}

function truncateDescription(text: string | null | undefined): string | undefined {
  if (!text) return undefined;
  const maxLength = 155;
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1).trimEnd() + '…';
}

function titleFromSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function blogKeywords(title: string, category?: string | null): string[] {
  const normalized = `${title} ${category ?? ''}`.toLocaleLowerCase('fr-FR');
  const keywords = [
    title,
    'Targetym AI',
    'SIRH Afrique',
    'logiciel RH Afrique',
    'SIRH IA',
    'meilleur SIRH en Afrique',
    'SIRH Sénégal',
    "logiciel RH Côte d'Ivoire",
    'SIRH Mali',
    'SIRH Guinée',
    'SIRH Gabon',
    'SIRH Congo',
    'SIRH Comores',
  ];

  if (/recrut|candidat|onboard/.test(normalized)) {
    keywords.push('recrutement RH Afrique', 'onboarding digital', 'scoring IA des candidats');
  }
  if (/performance|okr|management|évaluation/.test(normalized)) {
    keywords.push('performance RH', 'OKR', 'évaluation de performance 360');
  }
  if (/paie|rémunération|salaire/.test(normalized)) {
    keywords.push('logiciel de paie Afrique', 'gestion de la rémunération');
  }
  if (/formation|talent|compétence|carrière/.test(normalized)) {
    keywords.push('gestion des talents', 'formation RH', 'matrice 9-Box');
  }
  if (/digital|outil|process|sirh/.test(normalized)) {
    keywords.push('digitalisation RH', 'automatisation RH', 'gestion du personnel');
  }

  return Array.from(new Set(keywords));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);
  const canonical = `/blog/${encodeURIComponent(params.slug)}`;
  if (!post) {
    const title = titleFromSlug(params.slug);
    return {
      title: buildBlogTitle(title),
      description: 'Découvrez cet article du blog Targetym AI sur le SIRH, la gestion RH et la digitalisation des entreprises africaines.',
      keywords: blogKeywords(title),
      alternates: { canonical },
    };
  }
  const description = truncateDescription(post.excerpt);
  return {
    title: buildBlogTitle(post.title),
    description,
    keywords: blogKeywords(post.title, post.category),
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title: post.title,
      description,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, { items }, categories, ads] = await Promise.all([
    fetchPost(params.slug),
    fetchPosts({ limit: 50 }),
    fetchCategories(),
    fetchBlogAds(),
  ]);

  if (!post) return <ArticleClientFallback slug={params.slug} />;

  return (
    <ArticleView
      post={post}
      sidebar={<ArticleSidebar currentSlug={post.slug} posts={items} categories={categories} ads={ads} />}
    />
  );
}
