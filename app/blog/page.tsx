import Link from 'next/link';
import { Calendar, Tag, ArrowRight, BookOpen, Clock } from 'lucide-react';

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
    const res = await fetch(`${API_URL}/api/public/blog?${params}`, { cache: 'no-store' });
    if (!res.ok) return { items: [], total: 0 };
    return res.json();
  } catch {
    return { items: [], total: 0 };
  }
}

async function fetchCategories(): Promise<{ category: string; count: number }[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/blog/categories`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function mediaUrl(url?: string | null): string {
  if (!url) return '';
  return url.startsWith('/') ? `${API_URL}${url}` : url;
}

function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Estimation du temps de lecture (~200 mots/min) */
function readTime(excerpt: string | null): string {
  if (!excerpt) return '2 min';
  const words = excerpt.split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200 * 5))} min`;
}

export const metadata = {
  title: 'Blog — Targetym AI',
  description: "Actualités RH, conseils pratiques et retours d'expérience de l'équipe Targetym AI.",
};

export default async function BlogPage({ searchParams }: { searchParams: { category?: string } }) {
  const activeCategory = searchParams.category;
  const [{ items: posts, total }, categories] = await Promise.all([
    fetchPosts(activeCategory),
    fetchCategories(),
  ]);

  const [featured, ...rest] = posts;

  return (
    <div className="bg-white">
      {/* ── Header compact ── */}
      <section className="border-b border-gray-100 bg-white py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-500 mb-2 block">
                Blog Targetym AI
              </span>
              <h1 className="text-2xl font-bold text-gray-900">
                RH, Tech &amp; Management
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Conseils pratiques et tendances RH pour les équipes africaines.
              </p>
            </div>
            {total > 0 && (
              <span className="text-xs text-gray-400 shrink-0">{total} article{total > 1 ? 's' : ''}</span>
            )}
          </div>

          {/* Filtres catégories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              <Link
                href="/blog"
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  !activeCategory
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
                }`}
              >
                Tout
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.category}
                  href={`/blog?category=${encodeURIComponent(c.category)}`}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    activeCategory === c.category
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
                  }`}
                >
                  {c.category}
                  <span className="ml-1 text-[10px] opacity-60">({c.count})</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Contenu ── */}
      <section className="py-12 bg-gray-50 min-h-[50vh]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 text-gray-300">
              <BookOpen className="w-10 h-10 mb-3" />
              <p className="text-sm font-medium text-gray-400">Aucun article pour le moment</p>
              <p className="text-xs text-gray-400 mt-1">Revenez bientôt !</p>
            </div>
          ) : (
            <>
              {/* Article à la une */}
              {featured && !activeCategory && (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group mb-10 flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  {/* Image */}
                  <div className="sm:w-2/5 aspect-video sm:aspect-auto bg-primary-50 overflow-hidden shrink-0">
                    {featured.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={mediaUrl(featured.cover_image_url)}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full min-h-[180px] flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-primary-200" />
                      </div>
                    )}
                  </div>
                  {/* Texte */}
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <div className="flex items-center gap-2 mb-3">
                      {featured.category && (
                        <span className="px-2.5 py-0.5 bg-primary-50 text-primary-600 text-xs font-semibold rounded-full">
                          {featured.category}
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-xs font-semibold rounded-full">
                        À la une
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">{featured.excerpt}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      {featured.published_at && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(featured.published_at)}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {readTime(featured.excerpt)} de lecture
                      </span>
                      <span className="ml-auto text-primary-600 font-medium flex items-center gap-1">
                        Lire <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grille articles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(activeCategory ? posts : rest).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/9] bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden shrink-0">
                      {post.cover_image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={mediaUrl(post.cover_image_url)}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-7 h-7 text-primary-200" />
                        </div>
                      )}
                      {post.category && (
                        <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 backdrop-blur-sm text-primary-600 text-[11px] font-semibold rounded-full shadow-sm">
                          {post.category}
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-1 p-4">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1.5 line-clamp-2 leading-snug group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3 flex-1">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-50 mt-auto">
                        <div className="flex items-center gap-3">
                          {post.published_at && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(post.published_at)}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {readTime(post.excerpt)}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-primary-400 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      {posts.length > 0 && (
        <section className="py-14 bg-white border-t border-gray-100">
          <div className="mx-auto max-w-xl px-4 text-center">
            <Tag className="w-5 h-5 text-primary-400 mx-auto mb-3" />
            <h2 className="text-base font-bold text-gray-900 mb-1">
              Prêt à transformer vos RH ?
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Rejoignez des centaines d&apos;entreprises africaines qui utilisent Targetym AI.
            </p>
            <Link
              href="https://dashboard.targetym.ai"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Essai Gratuit 30 Jours <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
