'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Calendar, Tag, ChevronRight } from 'lucide-react';

export interface SidebarPost {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  published_at: string | null;
  cover_image_url: string | null;
}

export interface SidebarCategory {
  category: string;
  count: number;
}

interface Props {
  currentSlug: string;
  posts: SidebarPost[];
  categories: SidebarCategory[];
  apiUrl: string;
}

function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function BlogSidebar({ currentSlug, posts, categories, apiUrl }: Props) {
  const [search, setSearch] = useState('');

  const otherPosts = posts.filter((p) => p.slug !== currentSlug);
  const filtered = search.trim()
    ? otherPosts.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          (p.category ?? '').toLowerCase().includes(search.toLowerCase()),
      )
    : otherPosts;

  function mediaUrl(url?: string | null) {
    if (!url) return '';
    return url.startsWith('/') ? `${apiUrl}${url}` : url;
  }

  return (
    <aside className="space-y-6">
      {/* ── Recherche ── */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Rechercher</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Titre, catégorie…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* ── Publicité / CTA ── */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl p-5 text-white">
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-2 opacity-60">Sponsorisé</p>
        <h3 className="text-sm font-bold leading-snug mb-1.5">Gérez vos RH avec l&apos;IA</h3>
        <p className="text-[12px] text-white/75 leading-relaxed mb-4">
          Targetym AI — 90 jours gratuits, sans carte bancaire.
        </p>
        <Link
          href="https://dashboard.targetym.ai"
          className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-white text-primary-700 text-xs font-semibold rounded-lg hover:bg-primary-50 transition-colors"
        >
          Essayer gratuitement <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* ── Catégories ── */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Catégories</h3>
          <div className="space-y-0.5">
            {categories.map((c) => (
              <Link
                key={c.category}
                href={`/blog?category=${encodeURIComponent(c.category)}`}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <span className="text-sm text-gray-600 group-hover:text-primary-600 transition-colors flex items-center gap-2">
                  <Tag className="w-3 h-3 text-gray-300 group-hover:text-primary-400 flex-none" />
                  {c.category}
                </span>
                <span className="text-[11px] text-gray-400 bg-gray-100 group-hover:bg-primary-50 group-hover:text-primary-600 px-1.5 py-0.5 rounded-full transition-colors flex-none">
                  {c.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Autres articles ── */}
      <div>
        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">
          {search.trim() ? `Résultats (${filtered.length})` : 'Autres articles'}
        </h3>
        {filtered.length === 0 ? (
          <p className="text-xs text-gray-400 px-2">Aucun article trouvé.</p>
        ) : (
          <div className="space-y-2">
            {filtered.slice(0, 8).map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="flex gap-3 group items-start p-1.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {p.cover_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={mediaUrl(p.cover_image_url)}
                    alt=""
                    className="w-14 h-14 rounded-lg object-cover flex-none border border-gray-100"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary-50 to-secondary-50 flex-none border border-gray-100" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
                    {p.title}
                  </p>
                  {p.published_at && (
                    <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5 flex-none" />
                      {formatDate(p.published_at)}
                    </p>
                  )}
                  {p.category && (
                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-primary-50 text-primary-600 text-[10px] rounded-full font-medium">
                      {p.category}
                    </span>
                  )}
                </div>
              </Link>
            ))}
            {filtered.length > 8 && (
              <Link
                href="/blog"
                className="block text-center text-xs text-primary-600 hover:text-primary-700 font-medium py-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Voir tous les articles →
              </Link>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
