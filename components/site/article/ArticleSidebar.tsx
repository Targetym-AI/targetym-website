'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { categoryLabel, formatDate, mediaUrl, type BlogPost } from '@/lib/site/blog';

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

type Props = {
  currentSlug: string;
  posts: BlogPost[];
  categories: { category: string; count: number }[];
  ads: SidebarAd[];
};

const time = (iso: string | null) => (iso ? new Date(iso).getTime() : 0);

function AdLink({ ad }: { ad: SidebarAd }) {
  const external = /^https?:\/\//.test(ad.cta_url);
  const label = <>{ad.cta_label} <span aria-hidden="true">→</span></>;
  const className = ad.style === 'minimal' ? 'btn btn-mint' : 'btn btn-plain';
  return external
    ? <a className={className} href={ad.cta_url} target="_blank" rel="noopener noreferrer">{label}</a>
    : <Link className={className} href={ad.cta_url}>{label}</Link>;
}

/* Colonne latérale d'un article : recherche, catégories, articles récents et encarts de l'API */
export default function ArticleSidebar({ currentSlug, posts, categories, ads }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const recent = posts
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => time(b.published_at) - time(a.published_at))
    .slice(0, 3);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = search.trim();
    if (q) router.push(`/blog?q=${encodeURIComponent(q)}`);
  };

  return (
    <aside className="post-side" aria-label="Autour de l'article">
      <form className="side-block" role="search" onSubmit={submit}>
        <p className="eyebrow">Rechercher</p>
        <label className="search"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg><input type="search" placeholder="Titre, catégorie…" aria-label="Rechercher un article" autoComplete="off" value={search} onChange={(e) => setSearch(e.target.value)} /></label>
      </form>

      {categories.length > 0 && (
        <div className="side-block">
          <p className="eyebrow">Catégories</p>
          <ul className="side-cats">
            {categories.map((c) => (
              <li key={c.category}><Link href={`/blog?category=${encodeURIComponent(c.category)}`}>{categoryLabel(c.category)} <span className="n">{c.count}</span></Link></li>
            ))}
          </ul>
        </div>
      )}

      {recent.length > 0 && (
        <div className="side-block">
          <p className="eyebrow">Articles récents</p>
          <ul className="side-posts">
            {recent.map((p) => (
              <li key={p.id}>
                <Link href={`/blog/${p.slug}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {p.cover_image_url ? <img src={mediaUrl(p.cover_image_url)} alt="" width="68" height="68" loading="lazy" /> : <span className="side-thumb" aria-hidden="true"></span>}
                  <span><b>{p.title}</b>{p.published_at && <i>{formatDate(p.published_at)}</i>}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link className="uc-link side-all" href="/blog">Voir tous les articles <span aria-hidden="true">→</span></Link>
        </div>
      )}

      {ads.map((ad) => {
        const image = ad.style === 'image' && ad.image_url ? mediaUrl(ad.image_url) : '';
        const kind = image ? ' is-image' : ad.style === 'minimal' ? ' is-minimal' : '';
        return (
          <div key={ad.id} className={`side-ad${kind}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {image && <img className="side-ad-bg" src={image} alt="" loading="lazy" />}
            <p className="side-ad-k">{ad.badge_label ?? 'Sponsorisé'}</p>
            <h3>{ad.title}</h3>
            {ad.description && !image && <p>{ad.description}</p>}
            <AdLink ad={ad} />
          </div>
        );
      })}
    </aside>
  );
}
