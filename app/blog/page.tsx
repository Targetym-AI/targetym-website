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
      next: { revalidate: 300 }, // revalidate toutes les 5 minutes
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
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
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

  const featuredPost = posts[0] ?? null;
  const otherPosts = posts.slice(1);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white pt-16 pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Blog Targetym AI
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            RH, Tech &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              Management
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conseils pratiques, tendances RH et retours d&apos;expérience pour les équipes africaines.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filtres catégories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <Link
                href="/blog"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !activeCategory
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Tous ({total})
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.category}
                  href={`/blog?category=${encodeURIComponent(c.category)}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === c.category
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
            <>
              {/* Article en vedette */}
              {featuredPost && (
                <Link href={`/blog/${featuredPost.slug}`} className="block group mb-10">
                  <div className="grid md:grid-cols-2 gap-6 rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="bg-gradient-to-br from-primary-50 to-primary-100 min-h-[220px] flex items-center justify-center">
                      {featuredPost.cover_image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={featuredPost.cover_image_url}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <BookOpen className="w-16 h-16 text-primary-300" />
                      )}
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      {featuredPost.category && (
                        <span className="inline-block mb-3 px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full w-fit">
                          {featuredPost.category}
                        </span>
                      )}
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {featuredPost.title}
                      </h2>
                      {featuredPost.excerpt && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        {featuredPost.published_at && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(featuredPost.published_at)}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-primary-600 font-medium">
                          Lire l&apos;article
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grille des autres articles */}
              {otherPosts.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                        {post.cover_image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.cover_image_url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <BookOpen className="w-10 h-10 text-gray-300" />
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        {post.category && (
                          <span className="text-xs font-semibold text-primary-600 mb-2">
                            <Tag className="w-3 h-3 inline mr-1" />
                            {post.category}
                          </span>
                        )}
                        <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-sm text-gray-500 line-clamp-2 flex-1">{post.excerpt}</p>
                        )}
                        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                          {post.published_at && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(post.published_at)}
                            </span>
                          )}
                          <span className="text-primary-600 font-medium flex items-center gap-1">
                            Lire <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
