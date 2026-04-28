import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Tag, ArrowLeft, Eye } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.targetym.ai';

interface BlogPostFull {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  category: string | null;
  tags: string | null;
  published_at: string | null;
  views_count: number;
}

async function fetchPost(slug: string): Promise<BlogPostFull | null> {
  try {
    const res = await fetch(`${API_URL}/api/public/blog/${slug}`, {
      cache: 'no-store',
    });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

/** Préfixe les URLs relatives (/media-uploads/...) avec l'URL de l'API */
function mediaUrl(url?: string | null): string {
  if (!url) return '';
  return url.startsWith('/') ? `${API_URL}${url}` : url;
}

function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Convertit du texte brut (avec \n) en HTML — échappe les caractères dangereux */
function plainTextToHtml(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped
    .split(/\n\n+/)
    .map(para => `<p>${para.replace(/\n/g, '<br />')}</p>`)
    .join('');
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);
  if (!post) return { title: 'Article introuvable — Targetym AI' };
  return {
    title: `${post.title} — Blog Targetym AI`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);
  if (!post) notFound();

  const tags = post.tags ? post.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white pt-12 pb-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au Blog
          </Link>

          {post.category && (
            <span className="inline-block mb-4 px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
              {post.category}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>
          )}

          <div className="flex items-center gap-5 text-sm text-gray-400">
            {post.published_at && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.published_at)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              {post.views_count} vue{post.views_count !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      {post.cover_image_url && (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaUrl(post.cover_image_url)}
            alt={post.title}
            className="w-full rounded-2xl object-cover max-h-80"
          />
        </div>
      )}

      {/* Content */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20">
        <div
          className="prose prose-gray prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900
            prose-ul:text-gray-700 prose-ol:text-gray-700
            prose-blockquote:border-primary-300 prose-blockquote:text-gray-600"
          dangerouslySetInnerHTML={{ __html: plainTextToHtml(post.content) }}
        />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
            <Tag className="w-4 h-4 text-gray-400 mr-1 mt-0.5" />
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Prêt à transformer vos RH ?</h3>
          <p className="text-white/80 text-sm mb-5">
            Essayez Targetym AI gratuitement pendant 90 jours. Aucune carte bancaire.
          </p>
          <Link
            href="https://dashboard.targetym.ai"
            className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold text-sm rounded-xl hover:bg-gray-100 transition-colors"
          >
            Démarrer l&apos;Essai Gratuit
          </Link>
        </div>
      </article>
    </div>
  );
}
