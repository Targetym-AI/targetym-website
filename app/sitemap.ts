import type { MetadataRoute } from 'next';
import { SERVER_FETCH_HEADERS } from '@/lib/http';

const BASE_URL = 'https://www.targetym.ai';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.targetym.ai';

interface BlogPost {
  slug: string;
  published_at: string | null;
}

// Maintient les articles déjà publiés dans le sitemap si Cloudflare refuse le
// fetch Vercel. Les nouveaux articles continuent de provenir automatiquement
// de l'API dès que cette protection est levée.
const FALLBACK_BLOG_POSTS: BlogPost[] = [
  { slug: 'les-20-fonctionnalites-inedites-de-targetym-ai-sirh-32-autres-a-decouvrir', published_at: '2026-04-28T11:14:46.788858Z' },
  { slug: 'digitaliser-les-processus-rh-comment-sortir-du-chaos-du-jonglage-entre-plusieurs-outils', published_at: '2026-04-28T10:54:00.866274Z' },
  { slug: 'construire-un-outil-sirh-toutes-les-fonctionnalites-sont-elles-vraiment-pertinentes', published_at: '2026-04-28T10:45:38.777272Z' },
  { slug: 'votre-management-rh-est-il-mature-pour-un-sirh-complet', published_at: '2026-04-28T10:38:42.828156Z' },
];

async function fetchBlogSlugs(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/blog?limit=100`, {
      cache: 'no-store',
      headers: SERVER_FETCH_HEADERS,
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.items) ? data.items : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/solutions`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/pricing`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/careers`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/essai-gratuit`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/resources`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/cgv`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const apiPosts = await fetchBlogSlugs();
  const posts = Array.from(
    new Map([...FALLBACK_BLOG_POSTS, ...apiPosts].map((post) => [post.slug, post])).values(),
  );
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
