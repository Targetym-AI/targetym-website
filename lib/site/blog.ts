import { SERVER_FETCH_HEADERS } from '@/lib/http';

/* Articles du blog : l'API publique de Targetym (reprise de app/blog/page.tsx) */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.targetym.ai';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  category: string | null;
  tags?: string | null;
  published_at: string | null;
  views_count?: number;
}

export interface BlogListResponse {
  items: BlogPost[];
  total: number;
}

/* `revalidate` : page statique régénérée toutes les N secondes (l'accueil), sinon rendu à chaque requête */
export async function fetchPosts({ limit = 50, category, revalidate }: { limit?: number; category?: string; revalidate?: number } = {}): Promise<BlogListResponse> {
  try {
    const params = new URLSearchParams({ limit: String(limit) });
    if (category) params.append('category', category);
    const res = await fetch(`${API_URL}/api/public/blog?${params}`, {
      ...(revalidate ? { next: { revalidate } } : { cache: 'no-store' as const }),
      headers: SERVER_FETCH_HEADERS,
    });
    if (!res.ok) return { items: [], total: 0 };
    return res.json();
  } catch {
    return { items: [], total: 0 };
  }
}

export async function fetchCategories(): Promise<{ category: string; count: number }[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/blog/categories`, {
      cache: 'no-store',
      headers: SERVER_FETCH_HEADERS,
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export function mediaUrl(url?: string | null): string {
  if (!url) return '';
  return url.startsWith('/') ? `${API_URL}${url}` : url;
}

/* Dates en UTC : le serveur et le navigateur écrivent le même jour */
export function formatDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export function formatLongDate(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** Estimation du temps de lecture (~200 mots/min) */
export function readTime(excerpt: string | null): string {
  if (!excerpt) return '2 min';
  const words = excerpt.split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200 * 5))} min`;
}

/* « 4,2 k lectures », comme les cartes du prototype */
export function readsLabel(n?: number) {
  if (n === undefined || n === null) return '';
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace('.', ',')} k lectures` : `${n} lecture${n > 1 ? 's' : ''}`;
}

/* L'API écrit les catégories en capitales (DIGITALISATION, PROCESS RH) : on garde les sigles */
export function categoryLabel(c: string | null) {
  if (!c) return '';
  return c.split(/\s+/).map((w) => (w.length <= 3 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())).join(' ');
}

/* Les extraits de l'API font un paragraphe entier : les cartes n'en montrent que le début */
export function teaser(s: string | null, max = 160) {
  if (!s) return '';
  const t = s.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, t.lastIndexOf(' ', max)).replace(/[\s,;:.–—-]+$/, '')}…`;
}
