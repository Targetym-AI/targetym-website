'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ArticleView from './ArticleView';
import { API_URL } from '@/lib/site/blog';
import type { BlogPostFull } from '@/lib/site/markdown';

/** Repli navigateur si Cloudflare bloque la récupération SSR depuis Vercel. */
export default function ArticleClientFallback({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPostFull | null | undefined>(undefined);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API_URL}/api/public/blog/${encodeURIComponent(slug)}`, { signal: controller.signal, credentials: 'include' })
      .then((response) => (response.ok ? (response.json() as Promise<BlogPostFull>) : null))
      .then(setPost)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setPost(null);
      });
    return () => controller.abort();
  }, [slug]);

  if (post === undefined) {
    return (
      <section className="page-head" aria-live="polite">
        <p className="post-empty">Chargement de l&apos;article…</p>
      </section>
    );
  }

  if (post === null) {
    return (
      <section className="page-head">
        <div className="jobs-empty post-state">
          <b>Cet article est indisponible pour le moment.</b>
          <p>Il a peut-être été retiré, ou le blog est momentanément injoignable.</p>
          <Link className="btn btn-mint" href="/blog">Retour au blog</Link>
        </div>
      </section>
    );
  }

  return <ArticleView post={post} />;
}
