import Link from 'next/link';
import { Calendar, Tag, ArrowRight, BookOpen } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.targetym.ai';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  category: string | null;
  tags: string | null;
  published_at: string | null;
  views_count: number;
}

interface BlogListResponse {
  items: BlogPost[];
  total: number;
}

async function fetchPosts(category?: string): Promise<BlogListResponse> {
  try {
    const params = new URLSearchParams({ limit: '50' });
    if (category) params.append('category', category);
    const res = await fetch(`${API_URL}/api/public/blog?${params}`, {
      cache: 'no-store',
    });
    if (!res.ok) return { items: [], total: 0 };
    return res.json();
  } catch {
    return { items: [], total: 0 };
  }
}

async function fetchCategories(): Promise<{ category: string; count: number }[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/blog/categories`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/** Préfixe les URLs relatives (/media-uploads/...) avec l'URL de l'API */
function mediaUrl(url?: string | null): string {
  if (!url) return '';
  return url.startsWith('/') ? `${API_URL}${url}` : url;
}

function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export const metadata = {
  title: 'Blog — Targetym AI',
  description: 'Actualités RH, conseils pratiques et retours d\'expérience de l\'équipe Targetym AI.',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const activeCategory = searchParams.category;
  const [{ items: posts, total }, categories] = await Promise.all([
    fetchPosts(activeCategory),
    fetchCategories(),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white pt-16 pb-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Blog Targetym AI
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            RH, Tech &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              Management
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conseils pratiques, tendances RH et retours d&apos;expérience pour les équipes africaines.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 min-h-[40vh]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Filtres catégories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <Link
                href="/blog"
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !activeCategory
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                Tous ({total})
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.category}
                  href={`/blog?category=${encodeURIComponent(c.category)}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === c.category
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {c.category} ({c.count})
                </Link>
              ))}
            </div>
          )}

          {posts.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg">Aucun article pour le moment.</p>
              <p className="text-sm mt-1">Revenez bientôt !</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  {/* Image */}
                  <div className="relative aspect-video bg-primary-50 overflow-hidden">
                    {post.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={mediaUrl(post.cover_image_url)}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-primary-200" />
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    {post.category && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-600 mb-3">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                    )}
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      {post.published_at ? (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(post.published_at)}
                        </span>
                      ) : <span />}
                      <span className="text-primary-600 font-medium flex items-center gap-1">
                        Lire <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
