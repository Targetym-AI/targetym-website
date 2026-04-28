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

export interface SidebarAd {
  id: number;
  title: string;
  description: string | null;
  image_url: string | null;
  cta_label: string;
  cta_url: string;
  style: string;
  position: number;
  badge_label: string | null;
}

interface Props {
  currentSlug: string;
  posts: SidebarPost[];
  categories: SidebarCategory[];
  ads: SidebarAd[];
  apiUrl: string;
}

function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function BlogSidebar({ currentSlug, posts, categories, ads, apiUrl }: Props) {
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

      {/* ── Publicités dynamiques (position 1 et 2) ── */}
      {ads.filter((a) => a.position <= 2).map((ad) => (
        <BlogAdCard key={ad.id} ad={ad} apiUrl={apiUrl} />
      ))}

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

// ── Composant carte publicitaire ──────────────────────────────────────────────

function BlogAdCard({ ad, apiUrl }: { ad: SidebarAd; apiUrl: string }) {
  const badge = ad.badge_label ?? 'Sponsorisé';

  if (ad.style === 'image' && ad.image_url) {
    const imgSrc = ad.image_url.startsWith('/') ? `${apiUrl}${ad.image_url}` : ad.image_url;
    return (
      <div className="rounded-xl overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgSrc} alt={ad.title} className="w-full h-36 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-1 text-white/60">{badge}</p>
          <h3 className="text-sm font-bold leading-snug text-white mb-2">{ad.title}</h3>
          <Link
            href={ad.cta_url}
            target={ad.cta_url.startsWith('http') ? '_blank' : undefined}
            rel={ad.cta_url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white text-gray-900 text-xs font-semibold rounded-lg hover:bg-gray-100 transition-colors self-start"
          >
            {ad.cta_label} <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    );
  }

  if (ad.style === 'minimal') {
    return (
      <div className="border border-primary-100 rounded-xl p-4 bg-primary-50/30">
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-2 text-primary-400">{badge}</p>
        <h3 className="text-sm font-bold text-gray-800 leading-snug mb-1.5">{ad.title}</h3>
        {ad.description && (
          <p className="text-[12px] text-gray-500 leading-relaxed mb-3">{ad.description}</p>
        )}
        <Link
          href={ad.cta_url}
          target={ad.cta_url.startsWith('http') ? '_blank' : undefined}
          rel={ad.cta_url.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-primary-600 text-white text-xs font-semibold rounded-lg hover:bg-primary-700 transition-colors"
        >
          {ad.cta_label} <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    );
  }

  // Default: gradient
  return (
    <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl p-5 text-white">
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-2 opacity-60">{badge}</p>
      <h3 className="text-sm font-bold leading-snug mb-1.5">{ad.title}</h3>
      {ad.description && (
        <p className="text-[12px] text-white/75 leading-relaxed mb-4">{ad.description}</p>
      )}
      <Link
        href={ad.cta_url}
        target={ad.cta_url.startsWith('http') ? '_blank' : undefined}
        rel={ad.cta_url.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-white text-primary-700 text-xs font-semibold rounded-lg hover:bg-primary-50 transition-colors"
      >
        {ad.cta_label} <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
