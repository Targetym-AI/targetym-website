'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  category: string | null;
  published_at: string | null;
}

interface BlogListResponse {
  items: BlogPost[];
}

interface Props {
  apiUrl: string;
}

function mediaUrl(apiUrl: string, url: string | null): string {
  if (!url) return '';
  return url.startsWith('/') ? `${apiUrl}${url}` : url;
}

function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function readTime(excerpt: string | null): string {
  if (!excerpt) return '2 min';
  return `${Math.max(1, Math.round((excerpt.split(/\s+/).length / 200) * 5))} min`;
}

/**
 * Repli lorsque la protection Cloudflare refuse le fetch SSR exécuté depuis Vercel.
 * Le navigateur appelle l'API publique avec son User-Agent réel et son Origin autorisé.
 */
export default function BlogClientFallback({ apiUrl }: Props) {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${apiUrl}/api/public/blog?limit=50`, {
      signal: controller.signal,
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Blog API returned ${response.status}`);
        return response.json() as Promise<BlogListResponse>;
      })
      .then((data) => setPosts(data.items ?? []))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setPosts([]);
      });

    return () => controller.abort();
  }, [apiUrl]);

  if (posts === null) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-gray-300" aria-live="polite">
        <BookOpen className="w-10 h-10 mb-3 animate-pulse" />
        <p className="text-sm font-medium text-gray-400">Chargement des articles…</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-gray-300">
        <BookOpen className="w-10 h-10 mb-3" />
        <p className="text-sm font-medium text-gray-400">Aucun article pour le moment</p>
        <p className="text-xs text-gray-400 mt-1">Revenez bientôt !</p>
      </div>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <>
      <Link
        href={`/blog/${featured.slug}`}
        className="group mb-10 flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
      >
        <div className="sm:w-2/5 aspect-video sm:aspect-auto bg-primary-50 overflow-hidden shrink-0">
          {featured.cover_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mediaUrl(apiUrl, featured.cover_image_url)} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : <div className="w-full h-full min-h-[180px] flex items-center justify-center"><BookOpen className="w-8 h-8 text-primary-200" /></div>}
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            {featured.category && <span className="px-2.5 py-0.5 bg-primary-50 text-primary-600 text-xs font-semibold rounded-full">{featured.category}</span>}
            <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-xs font-semibold rounded-full">À la une</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">{featured.title}</h2>
          {featured.excerpt && <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">{featured.excerpt}</p>}
          <div className="flex items-center gap-4 text-xs text-gray-400">
            {featured.published_at && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(featured.published_at)}</span>}
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readTime(featured.excerpt)} de lecture</span>
            <span className="ml-auto text-primary-600 font-medium flex items-center gap-1">Lire <ArrowRight className="w-3 h-3" /></span>
          </div>
        </div>
      </Link>
      {rest.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="relative aspect-[16/9] bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden shrink-0">
              {post.cover_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={mediaUrl(apiUrl, post.cover_image_url)} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
              ) : <div className="w-full h-full flex items-center justify-center"><BookOpen className="w-7 h-7 text-primary-200" /></div>}
              {post.category && <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 backdrop-blur-sm text-primary-600 text-[11px] font-semibold rounded-full shadow-sm">{post.category}</span>}
            </div>
            <div className="flex flex-col flex-1 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5 line-clamp-2 leading-snug group-hover:text-primary-600 transition-colors">{post.title}</h3>
              {post.excerpt && <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3 flex-1">{post.excerpt}</p>}
              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-50 mt-auto">
                <div className="flex items-center gap-3">
                  {post.published_at && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.published_at)}</span>}
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readTime(post.excerpt)}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-primary-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>}
    </>
  );
}
