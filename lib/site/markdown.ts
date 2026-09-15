import { API_URL } from '@/lib/site/blog';

export interface BlogPostFull {
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

/** Temps de lecture d'un article complet (~200 mots/min) */
export function contentReadTime(text: string): string {
  const words = text.split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeAttr = (s: string) => escapeHtml(s).replace(/"/g, '&quot;');

/**
 * Convertit le markdown des articles en HTML (mis en forme par .post-body).
 * Supporte : # à #### titres, **gras**, *italique*, `code`, ![image](url),
 *            - listes, 1. listes numérotées, > citations, ---, [lien](url)
 */
export function parseMarkdown(text: string): string {
  function inline(s: string): string {
    // Les images sont mises de côté avant l'échappement pour préserver leurs URL
    const imgs: string[] = [];
    let r = s.replace(/!\[([^\]]*)\]\(([^\s)]+)\)/g, (_, alt: string, src: string) => {
      const fullSrc = src.startsWith('/') ? `${API_URL}${src}` : src;
      imgs.push(`<img src="${escapeAttr(fullSrc)}" alt="${escapeAttr(alt)}" loading="lazy" decoding="async" />`);
      return `\x00IMG${imgs.length - 1}\x00`;
    });
    r = escapeHtml(r)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/_(.+?)_/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)"]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    return r.replace(/\x00IMG(\d+)\x00/g, (_, idx: string) => imgs[parseInt(idx, 10)]);
  }

  const html: string[] = [];
  for (const block of text.split(/\n\n+/)) {
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
      html.push(`<ul>${trimmed.split('\n').map((l) => `<li>${inline(l.slice(2))}</li>`).join('')}</ul>`);
    } else if (trimmed.split('\n').every((l) => /^\d+\.\s/.test(l))) {
      html.push(`<ol>${trimmed.split('\n').map((l) => `<li>${inline(l.replace(/^\d+\.\s/, ''))}</li>`).join('')}</ol>`);
    } else {
      html.push(`<p>${trimmed.split('\n').map((l) => inline(l)).join('<br />')}</p>`);
    }
  }
  return html.join('\n');
}

/** Données structurées schema.org d'un article */
export function articleJsonLd(post: Pick<BlogPostFull, 'title' | 'slug' | 'excerpt' | 'published_at'>, image: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: image ? [image] : undefined,
    datePublished: post.published_at ?? undefined,
    dateModified: post.published_at ?? undefined,
    mainEntityOfPage: `https://www.targetym.ai/blog/${encodeURIComponent(post.slug)}`,
    author: {
      '@type': 'Organization',
      name: 'Targetym AI',
      url: 'https://www.targetym.ai/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Targetym AI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.targetym.ai/logo-targetym.png',
      },
    },
  };
}
