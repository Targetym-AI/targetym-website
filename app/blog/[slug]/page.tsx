import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Tag, ArrowLeft, Eye, Clock } from 'lucide-react';

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
    const res = await fetch(`${API_URL}/api/public/blog/${slug}`, { cache: 'no-store' });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function mediaUrl(url?: string | null): string {
  if (!url) return '';
  return url.startsWith('/') ? `${API_URL}${url}` : url;
}

function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

function plainTextToHtml(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return escaped
    .split(/\n\n+/)
    .map((para) => `<p>${para.replace(/\n/g, '<br />')}</p>`)
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
  const readTime = estimateReadTime(post.content);

  return (
    <div className="bg-white">
      {/* ── Barre de navigation ── */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Blog
          </Link>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            {post.published_at && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.published_at)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime} de lecture
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {post.views_count}
            </span>
          </div>
        </div>
      </div>

      {/* ── En-tête article ── */}
      <header className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        {post.category && (
          <span className="inline-block mb-3 px-2.5 py-0.5 bg-primary-50 text-primary-600 text-xs font-semibold rounded-full">
            {post.category}
          </span>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-3">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-sm text-gray-500 leading-relaxed border-l-2 border-primary-200 pl-4">
            {post.excerpt}
          </p>
        )}
      </header>

      {/* ── Image de couverture ── */}
      {post.cover_image_url && (
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaUrl(post.cover_image_url)}
            alt={post.title}
            className="w-full rounded-xl object-cover max-h-64 shadow-sm"
          />
        </div>
      )}

      {/* ── Contenu ── */}
      <article className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 pb-16">
        <div
          className="
            prose prose-sm max-w-none
            prose-headings:font-semibold prose-headings:text-gray-900 prose-headings:mt-6 prose-headings:mb-2
            prose-h2:text-lg prose-h3:text-base
            prose-p:text-gray-600 prose-p:leading-7 prose-p:text-[15px] prose-p:my-3
            prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-800 prose-strong:font-semibold
            prose-ul:text-gray-600 prose-ul:text-[15px] prose-ol:text-gray-600 prose-ol:text-[15px]
            prose-li:my-0.5
            prose-blockquote:border-l-2 prose-blockquote:border-primary-300 prose-blockquote:text-gray-500 prose-blockquote:italic prose-blockquote:pl-4 prose-blockquote:not-italic
            prose-hr:border-gray-100
          "
          dangerouslySetInnerHTML={{ __html: plainTextToHtml(post.content) }}
        />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-8 pt-5 border-t border-gray-100 flex flex-wrap items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-gray-300" />
            {tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white text-center">
          <h3 className="text-base font-bold mb-1">Prêt à transformer vos RH ?</h3>
          <p className="text-white/75 text-xs mb-4">
            Essayez Targetym AI gratuitement pendant 90 jours. Sans carte bancaire.
          </p>
          <Link
            href="https://dashboard.targetym.ai"
            className="inline-flex items-center px-5 py-2 bg-white text-primary-600 font-semibold text-xs rounded-lg hover:bg-gray-100 transition-colors"
          >
            Démarrer l&apos;Essai Gratuit
          </Link>
        </div>
      </article>
    </div>
  );
}
