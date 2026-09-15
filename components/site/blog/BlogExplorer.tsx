'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  API_URL,
  categoryLabel,
  formatDate,
  formatLongDate,
  mediaUrl,
  readTime,
  readsLabel,
  teaser,
  type BlogListResponse,
  type BlogPost,
} from '@/lib/site/blog';

type View = 'grid' | 'list' | 'compact';
type Sort = 'recent' | 'reads';

/* Photos du prototype, pour un article publié sans image de couverture */
const FALLBACK = ['/img/blog-1.jpg', '/img/blog-2.jpg', '/img/blog-3.jpg', '/img/mod-4a.jpg'];

function norm(s: string) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const same = (a: string | null, b: string) => (a || '').toLowerCase() === b.toLowerCase();

const IcoDate = () => <svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="4" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>;
const IcoTime = () => <svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
const IcoReads = () => <svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.8" /></svg>;

type Props = {
  initialPosts: BlogPost[];
  initialCategories: { category: string; count: number }[];
  initialCategory?: string;
  initialQuery?: string;
};

/* Blog : l'article le plus récent à la une, puis tous les autres. Recherche,
   tri, affichage et catégorie se combinent sur la même liste. Les articles
   viennent de l'API ; si le rendu serveur n'a rien reçu (Cloudflare refuse
   parfois le fetch de Vercel), le navigateur les demande lui-même. */
export default function BlogExplorer({ initialPosts, initialCategories, initialCategory, initialQuery }: Props) {
  const [posts, setPosts] = useState<BlogPost[] | null>(initialPosts.length ? initialPosts : null);
  const [cat, setCat] = useState(initialCategory || '*');
  const [sort, setSort] = useState<Sort>('recent');
  const [view, setView] = useState<View>('grid');
  const [query, setQuery] = useState(initialQuery || '');

  useEffect(() => {
    if (initialPosts.length) return;
    const controller = new AbortController();
    fetch(`${API_URL}/api/public/blog?limit=50`, { signal: controller.signal, credentials: 'include' })
      .then((r) => (r.ok ? (r.json() as Promise<BlogListResponse>) : { items: [], total: 0 }))
      .then((data) => setPosts(data.items ?? []))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setPosts([]);
      });
    return () => controller.abort();
  }, [initialPosts]);

  const featured = posts?.[0];
  const rest = useMemo(() => (posts || []).slice(1), [posts]);

  /* Les catégories de l'API, ou à défaut celles des articles reçus ; comptées hors article à la une */
  const categories = useMemo(() => {
    const names = initialCategories.length
      ? initialCategories.map((c) => c.category)
      : Array.from(new Set(rest.map((p) => p.category).filter((c): c is string => !!c)));
    return names
      .map((name) => ({ name, n: rest.filter((p) => same(p.category, name)).length }))
      .filter((c) => c.n > 0);
  }, [initialCategories, rest]);

  const hasReads = rest.some((p) => typeof p.views_count === 'number');
  const texts = useMemo(() => rest.map((p) => norm([categoryLabel(p.category), p.title, teaser(p.excerpt), formatDate(p.published_at)].join(' '))), [rest]);

  if (posts === null) {
    return (
      <section className="section sec-anim" aria-live="polite">
        <p className="post-empty">Chargement des articles…</p>
      </section>
    );
  }

  if (!featured) {
    return (
      <section className="section sec-anim">
        <p className="post-empty">Aucun article pour le moment. Revenez bientôt&nbsp;!</p>
      </section>
    );
  }

  const q = norm(query.trim());
  const order = rest.map((p, i) => ({ p, i }));
  if (sort === 'reads') order.sort((a, b) => (b.p.views_count ?? 0) - (a.p.views_count ?? 0));
  const shown = (i: number) => (cat === '*' || same(rest[i].category, cat)) && (!q || texts[i].indexOf(q) >= 0);
  const n = rest.filter((_, i) => shown(i)).length;
  const tab = (on: boolean) => (on ? 'tab is-on' : 'tab');
  const cover = (p: BlogPost, i: number) => (p.cover_image_url ? mediaUrl(p.cover_image_url) : FALLBACK[i % FALLBACK.length]);

  return (
    <>
      <section className="section sec-anim blog-lead" aria-labelledby="une-title">
        <p className="eyebrow left" id="une-title">À la une</p>
        <article className="post-feature" data-cut>
          <Link className="pf-media" href={`/blog/${featured.slug}`} aria-label="Lire l'article à la une">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.cover_image_url ? mediaUrl(featured.cover_image_url) : '/img/mod-3a.jpg'} alt={featured.title} width="900" height="680" />
            {featured.category && <>{' '}<span className="tag pf-tag">{categoryLabel(featured.category)}</span></>}
            {' '}<span className="dock dock-br" aria-hidden="true"><span className="round">↗</span></span>
          </Link>
          <div className="pf-body">
            <p className="pf-meta">
              {featured.published_at && <><time dateTime={featured.published_at.slice(0, 10)}>{formatLongDate(featured.published_at)}</time><b>·</b></>}
              {featured.category && <>{categoryLabel(featured.category)}<b>·</b></>}
              {readTime(featured.excerpt)} de lecture
            </p>
            <h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2>
            {featured.excerpt && <p>{teaser(featured.excerpt, 240)}</p>}
            <Link className="more" href={`/blog/${featured.slug}`}>Lire l&apos;article →</Link>
          </div>
        </article>
      </section>

      {rest.length > 0 && (
        <section className="section sec-anim" aria-labelledby="all-title" data-blog>
          <div className="blog-top">
            <p className="eyebrow left" id="all-title">Tous les articles</p>
            <span className="count" aria-live="polite">{n}{n > 1 ? ' articles' : ' article'}</span>
          </div>
          <div className="toolbar">
            <label className="search"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg><input type="search" placeholder="Rechercher un article, un sujet…" aria-label="Rechercher un article" autoComplete="off" value={query} onChange={(e) => setQuery(e.target.value)} /></label>
            {hasReads && (
              <div className="seg" role="group" aria-label="Trier les articles">
                <button className={tab(sort === 'recent')} type="button" data-sort="recent" onClick={() => setSort('recent')}>Récents</button>
                <button className={tab(sort === 'reads')} type="button" data-sort="reads" onClick={() => setSort('reads')}>Les plus lus</button>
              </div>
            )}
            <div className="seg views" role="group" aria-label="Affichage">
              <button className={tab(view === 'grid')} type="button" data-view="grid" aria-label="Grille" aria-pressed={view === 'grid'} onClick={() => setView('grid')}><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="2" /><rect x="13.5" y="3.5" width="7" height="7" rx="2" /><rect x="3.5" y="13.5" width="7" height="7" rx="2" /><rect x="13.5" y="13.5" width="7" height="7" rx="2" /></svg></button>
              <button className={tab(view === 'list')} type="button" data-view="list" aria-label="Liste" aria-pressed={view === 'list'} onClick={() => setView('list')}><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="6" height="5" rx="1.5" /><path d="M12.5 6.5H20M12.5 9h5" /><rect x="3.5" y="14" width="6" height="5" rx="1.5" /><path d="M12.5 15.5H20M12.5 18h5" /></svg></button>
              <button className={tab(view === 'compact')} type="button" data-view="compact" aria-label="Compact" aria-pressed={view === 'compact'} onClick={() => setView('compact')}><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg></button>
            </div>
          </div>
          {categories.length > 1 && (
            <div className="filters" role="group" aria-label="Filtrer par catégorie">
              <button className={tab(cat === '*')} type="button" data-filter="*" onClick={() => setCat('*')}>Tout</button>
              {categories.map((c) => (
                <button key={c.name} className={tab(same(c.name, cat))} type="button" data-filter={c.name} onClick={() => setCat(c.name)}>{categoryLabel(c.name)} <span className="n">{c.n}</span></button>
              ))}
            </div>
          )}
          <ul className={`post-grid is-${view}`}>
            {order.map(({ p, i }) => (
              <li key={p.id} className="post" data-cat={p.category || undefined} data-order={i} data-reads={p.views_count ?? 0} hidden={!shown(i)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Link className="bl-media" href={`/blog/${p.slug}`} data-cut aria-label={`Lire : ${p.title}`}><img src={cover(p, i)} alt={p.title} width="980" height="640" loading="lazy" /><span className="dock dock-br" aria-hidden="true"><span className="round">↗</span></span></Link>
                {p.category && <span className="tag">{categoryLabel(p.category)}</span>}
                <h3><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3>
                {p.excerpt && <p>{teaser(p.excerpt)}</p>}
                <div className="meta">
                  {p.published_at && <span><IcoDate /> {formatDate(p.published_at)}</span>}
                  <span><IcoTime /> {readTime(p.excerpt)}</span>
                  {typeof p.views_count === 'number' && <span><IcoReads /> {readsLabel(p.views_count)}</span>}
                </div>
              </li>
            ))}
          </ul>
          <p className="post-empty" hidden={n > 0}>Aucun article ne correspond à cette recherche. Essayez un autre mot ou une autre catégorie.</p>
        </section>
      )}
    </>
  );
}
