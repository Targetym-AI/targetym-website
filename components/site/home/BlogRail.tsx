'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { API_URL, mediaUrl, teaser, type BlogListResponse, type BlogPost } from '@/lib/site/blog';

/* Rail du blog de l'accueil : les trois derniers articles. Rendus par le serveur
   quand l'API répond ; sinon le navigateur les demande lui-même (Cloudflare
   refuse parfois le fetch de Vercel). Sans article, la section n'apparaît pas.
   Les flèches font défiler d'une carte. */
export default function BlogRail({ initial }: { initial: BlogPost[] }) {
  const [posts, setPosts] = useState(initial);
  const rail = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (initial.length) return;
    const controller = new AbortController();
    fetch(`${API_URL}/api/public/blog?limit=3`, { signal: controller.signal, credentials: 'include' })
      .then((r) => (r.ok ? (r.json() as Promise<BlogListResponse>) : { items: [], total: 0 }))
      .then((data) => setPosts((data.items ?? []).slice(0, 3)))
      .catch(() => {});
    return () => controller.abort();
  }, [initial]);

  if (!posts.length) return null;

  const scroll = (dir: 1 | -1) => {
    const card = rail.current?.querySelector('li');
    if (!rail.current || !card) return;
    rail.current.scrollBy({ left: dir * (card.getBoundingClientRect().width + 24), behavior: 'smooth' });
  };

  return (
    <section className="section blog sec-anim" id="blog">
      <div className="blog-head">
        <p className="eyebrow"><Link href="/blog">Le blog</Link></p>
        <div className="arrows">
          <button type="button" className="arrow" data-blog="prev" aria-label="Articles précédents" onClick={() => scroll(-1)}>←</button>
          <button type="button" className="arrow" data-blog="next" aria-label="Articles suivants" onClick={() => scroll(1)}>→</button>
        </div>
      </div>

      <ul className="blog-rail" ref={rail}>
        {posts.map((p, i) => (
          <li key={p.id}>
            <Link href={`/blog/${p.slug}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <span className="bl-media" data-cut><img src={p.cover_image_url ? mediaUrl(p.cover_image_url) : `/img/blog-${(i % 3) + 1}.jpg`} alt={p.title} width="980" height="640" loading="lazy" /><span className="dock dock-br" aria-hidden="true"><span className="round">↗</span></span></span>
              <div className="bl-foot">
                <div>
                  <h3>{p.title}</h3>
                  {p.excerpt && <p>{teaser(p.excerpt, 110)}</p>}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
