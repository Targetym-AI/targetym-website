import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Tag, ArrowLeft, Eye, Clock } from 'lucide-react';
import BlogSidebar from '@/components/BlogSidebar';
import type { SidebarPost, SidebarCategory, SidebarAd } from '@/components/BlogSidebar';

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

async function fetchPostsList(): Promise<SidebarPost[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/blog?limit=50`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items ?? [];
  } catch {
    return [];
  }
}

async function fetchCategories(): Promise<SidebarCategory[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/blog/categories`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function fetchBlogAds(): Promise<SidebarAd[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/blog-ads`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
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

/**
 * Convertit du texte avec syntaxe markdown en HTML.
 * Supporte : ## titres, **gras**, *italique*, `code`,
 *            - listes, 1. listes numérotées, > citations, ---, [lien](url)
 */
function parseMarkdown(text: string): string {
  function inline(s: string): string {
    let r = s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    r = r
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/_(.+?)_/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(
        /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
      );
    return r;
  }

  const blocks = text.split(/\n\n+/);
  const html: string[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('#### ')) {
      html.push(`<h4>${inline(trimmed.slice(5))}</h4>`);
    } else if (trimmed.startsWith('### ')) {
      html.push(`<h3>${inline(trimmed.slice(4))}</h3>`);
    } else if (trimmed.startsWith('## ')) {
      html.push(`<h2>${inline(trimmed.slice(3))}</h2>`);
    } else if (trimmed.startsWith('# ')) {
      html.push(`<h2>${inline(trimmed.slice(2))}</h2>`);
    } else if (trimmed.startsWith('> ')) {
      html.push(`<blockquote>${inline(trimmed.slice(2))}</blockquote>`);
    } else if (/^---+$/.test(trimmed)) {
      html.push('<hr />');
    } else if (trimmed.split('\n').every((l) => /^[-*]\s/.test(l))) {
      const items = trimmed.split('\n').map((l) => `<li>${inline(l.slice(2))}</li>`).join('');
      html.push(`<ul>${items}</ul>`);
    } else if (trimmed.split('\n').every((l) => /^\d+\.\s/.test(l))) {
      const items = trimmed.split('\n').map((l) => `<li>${inline(l.replace(/^\d+\.\s/, ''))}</li>`).join('');
      html.push(`<ol>${items}</ol>`);
    } else {
      const para = trimmed.split('\n').map((l) => inline(l)).join('<br />');
      html.push(`<p>${para}</p>`);
    }
  }

  return html.join('\n');
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
  const [post, allPosts, categories, ads] = await Promise.all([
    fetchPost(params.slug),
    fetchPostsList(),
    fetchCategories(),
    fetchBlogAds(),
  ]);

  if (!post) notFound();

  const tags = post.tags ? post.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];
  const readTime = estimateReadTime(post.content);

  return (
    <div className="bg-white">
      {/* ── Barre de navigation sticky ── */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
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

      {/* ── Layout principal 2 colonnes ── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-12 items-start">

          {/* ── Colonne article ── */}
          <div>
            {/* En-tête */}
            <header className="pb-7">
              {post.category && (
                <span className="inline-block mb-3 px-2.5 py-0.5 bg-primary-50 text-primary-600 text-xs font-semibold rounded-full">
                  {post.category}
                </span>
              )}
              <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 leading-snug mb-3 [font-family:var(--font-lora)] tracking-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-[15px] text-gray-500 leading-relaxed border-l-2 border-primary-200 pl-4 [font-family:var(--font-lora)] italic">
                  {post.excerpt}
                </p>
              )}
            </header>

            {/* Image de couverture */}
            {post.cover_image_url && (
              <div className="mb-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mediaUrl(post.cover_image_url)}
                  alt={post.title}
                  className="w-full rounded-xl object-cover max-h-72 shadow-sm"
                />
              </div>
            )}

            {/* Contenu markdown */}
            <article>
              <div
                className="
                  prose max-w-none
                  [font-family:var(--font-lora)]
                  prose-headings:[font-family:var(--font-nunito)] prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mt-8 prose-headings:mb-2 prose-headings:tracking-tight
                  prose-h2:text-[19px] prose-h3:text-[16px] prose-h4:text-[14px]
                  prose-p:text-gray-700 prose-p:leading-[1.85] prose-p:text-[15.5px] prose-p:my-4
                  prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-semibold prose-strong:[font-family:var(--font-inter)]
                  prose-em:[font-family:var(--font-lora)] prose-em:text-gray-600
                  prose-ul:text-gray-700 prose-ul:text-[15px] prose-ol:text-gray-700 prose-ol:text-[15px]
                  prose-li:my-1.5 prose-li:leading-[1.75]
                  prose-blockquote:border-l-2 prose-blockquote:border-primary-300 prose-blockquote:bg-primary-50/40 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-600 prose-blockquote:italic prose-blockquote:py-1 prose-blockquote:pl-4 prose-blockquote:pr-3 prose-blockquote:text-[15px]
                  prose-hr:border-gray-100
                  prose-code:bg-gray-100 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:px-1 prose-code:py-0.5 prose-code:text-gray-700
                "
                dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
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
                  Essayez Targetym AI gratuitement pendant 30 jours. Sans carte bancaire.
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

          {/* ── Sidebar ── */}
          <div className="lg:sticky lg:top-16 lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto lg:pb-4 scrollbar-hide">
            <BlogSidebar
              currentSlug={post.slug}
              posts={allPosts}
              categories={categories}
              ads={ads}
              apiUrl={API_URL}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
