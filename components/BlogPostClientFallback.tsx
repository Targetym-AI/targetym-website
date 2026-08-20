'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Calendar, Clock, Tag } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  category: string | null;
  tags: string | null;
  published_at: string | null;
}

interface Props {
  apiUrl: string;
  slug: string;
}

function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function readTime(content: string): string {
  return `${Math.max(1, Math.round(content.split(/\s+/).length / 200))} min`;
}

/** Repli navigateur si Cloudflare bloque la récupération SSR depuis Vercel. */
export default function BlogPostClientFallback({ apiUrl, slug }: Props) {
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${apiUrl}/api/public/blog/${encodeURIComponent(slug)}`, {
      signal: controller.signal,
      credentials: 'include',
    })
      .then((response) => response.ok ? response.json() as Promise<BlogPost> : null)
      .then(setPost)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setPost(null);
      });

    return () => controller.abort();
  }, [apiUrl, slug]);

  if (post === undefined) {
    return <div className="mx-auto max-w-3xl px-4 py-24 text-center text-sm text-gray-400">Chargement de l&apos;article…</div>;
  }

  if (post === null) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <BookOpen className="w-10 h-10 mx-auto mb-3 text-gray-300" />
        <p className="text-sm text-gray-500">Cet article est indisponible pour le moment.</p>
        <Link href="/blog" className="inline-flex mt-5 text-sm font-medium text-primary-600 hover:underline">Retour au blog</Link>
      </div>
    );
  }

  const imageUrl = post.cover_image_url?.startsWith('/') ? `${apiUrl}${post.cover_image_url}` : post.cover_image_url;
  const tags = post.tags?.split(',').map((tag) => tag.trim()).filter(Boolean) ?? [];
  const articleUrl = `https://www.targetym.ai/blog/${encodeURIComponent(slug)}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: post.published_at ?? undefined,
    dateModified: post.published_at ?? undefined,
    mainEntityOfPage: articleUrl,
    author: { '@type': 'Organization', name: 'Targetym AI', url: 'https://www.targetym.ai/about' },
    publisher: {
      '@type': 'Organization',
      name: 'Targetym AI',
      logo: { '@type': 'ImageObject', url: 'https://www.targetym.ai/logo-targetym.png' },
    },
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }}
      />
      <div className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary-600 transition-colors font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Blog
          </Link>
        </div>
      </div>
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-10 pb-16">
        {post.category && <span className="inline-block mb-3 px-2.5 py-0.5 bg-primary-50 text-primary-600 text-xs font-semibold rounded-full">{post.category}</span>}
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 leading-snug mb-3 [font-family:var(--font-lora)] tracking-tight">{post.title}</h1>
        {post.excerpt && <p className="text-[15px] text-gray-500 leading-relaxed border-l-2 border-primary-200 pl-4 [font-family:var(--font-lora)] italic mb-5">{post.excerpt}</p>}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-7">
          {post.published_at && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.published_at)}</span>}
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readTime(post.content)} de lecture</span>
        </div>
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={post.title} className="w-full rounded-xl object-cover max-h-96 shadow-sm mb-8" />
        )}
        <div className="whitespace-pre-wrap text-[15.5px] leading-[1.85] text-gray-700 [font-family:var(--font-lora)]">{post.content}</div>
        {tags.length > 0 && <div className="mt-8 pt-5 border-t border-gray-100 flex flex-wrap items-center gap-2">
          <Tag className="w-3.5 h-3.5 text-gray-300" />
          {tags.map((tag) => <span key={tag} className="px-2.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">{tag}</span>)}
        </div>}
      </article>
    </div>
  );
}
