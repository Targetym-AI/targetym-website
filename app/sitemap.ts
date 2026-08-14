import type { MetadataRoute } from 'next';
import { SERVER_FETCH_HEADERS } from '@/lib/http';

const BASE_URL = 'https://www.targetym.ai';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.targetym.ai';

interface BlogPost {
  slug: string;
  published_at: string | null;
}

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

  const posts = await fetchBlogSlugs();
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
