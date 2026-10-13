/* Validation centralisée des URL et chemins venant des contenus de l'API (liens, médias,
   vidéos intégrées, slugs). Modules purs, sans dépendance à l'environnement : l'origine
   de l'API est passée en paramètre. Un refus renvoie null (ou '' pour une source média) :
   l'appelant n'affiche alors simplement pas le lien ou l'intégration. */

const MAX_URL_LENGTH = 2048;

/* Contrôles C0/C1, espace, espaces Unicode invisibles, séparateurs de ligne, antislash :
   le navigateur les retire ou les convertit avant de lire l'URL (« java\tscript: »,
   « /\evil.com »), donc leur seule présence rend l'URL ambiguë. */
// eslint-disable-next-line no-control-regex
const FORBIDDEN_CHARS = /[\u0000-\u0020\u007f-\u00a0\u00ad\u1680\u180e\u2000-\u200f\u2028-\u202f\u205f-\u2064\u3000\ufeff\\]/;

function plain(raw: unknown): raw is string {
  return typeof raw === 'string' && raw.length > 0 && raw.length <= MAX_URL_LENGTH && !FORBIDDEN_CHARS.test(raw);
}

/** Lien externe : http(s) absolu avec hôte, sans identifiants. Renvoie l'URL normalisée. */
export function safeExternalUrl(raw: unknown): string | null {
  if (!plain(raw) || !/^https?:\/\/[^/?#]/i.test(raw)) return null;
  try {
    const u = new URL(raw);
    if ((u.protocol !== 'http:' && u.protocol !== 'https:') || !u.hostname) return null;
    if (u.username || u.password) return null;
    return u.href;
  } catch {
    return null;
  }
}

/** Route interne : un seul « / » en tête, jamais « // » ni « /\ ». Renvoie le chemin tel quel. */
export function safeInternalPath(raw: unknown): string | null {
  if (!plain(raw) || raw[0] !== '/' || raw[1] === '/') return null;
  try {
    const base = 'http://interne.invalid';
    if (new URL(raw, base).origin !== base) return null;
  } catch {
    return null;
  }
  return raw;
}

export type SafeLink = { kind: 'external' | 'internal'; href: string };

/** Lien qui peut être l'un ou l'autre (CTA) : le composant choisit <a> ou next/link, ou rien. */
export function safeLink(raw: unknown): SafeLink | null {
  const external = safeExternalUrl(raw);
  if (external) return { kind: 'external', href: external };
  const internal = safeInternalPath(raw);
  if (internal) return { kind: 'internal', href: internal };
  return null;
}

/** Source média : un chemin est préfixé par l'origine de l'API, une URL absolue doit être http(s). '' si refusée. */
export function safeMediaUrl(raw: unknown, apiUrl: string): string {
  const internal = safeInternalPath(raw);
  if (internal) return `${apiUrl}${internal}`;
  return safeExternalUrl(raw) ?? '';
}

/* --- Vidéos --- */

export type VideoEmbed = { type: 'iframe' | 'video'; src: string };

const YOUTUBE_HOSTS = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'];
const VIMEO_HOSTS = ['vimeo.com', 'www.vimeo.com'];
const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const VIMEO_ID = /^\d{1,12}$/;

/* Hébergements des fichiers vidéo lus nativement : les mêmes que les images (next.config.mjs) */
const MEDIA_HOSTS = ['targetym-media.s3.amazonaws.com', 'targetym-media.s3.eu-west-1.amazonaws.com'];

/** Lecteur intégré construit à partir de l'identifiant analysé, jamais de la chaîne d'origine. */
export function safeVideoEmbed(raw: unknown, apiUrl: string): VideoEmbed | null {
  const href = safeExternalUrl(raw);
  if (!href) return null;
  const u = new URL(href);
  if (u.port) return null;
  const host = u.hostname;
  const segments = u.pathname.split('/').slice(1);

  let youtube: string | null = null;
  if (YOUTUBE_HOSTS.includes(host)) {
    if (u.pathname === '/watch') youtube = u.searchParams.get('v');
    else if (segments[0] === 'embed' && segments.length === 2) youtube = segments[1];
  } else if (host === 'youtu.be' && segments.length === 1) {
    youtube = segments[0];
  }
  if (youtube !== null) {
    return YOUTUBE_ID.test(youtube) ? { type: 'iframe', src: `https://www.youtube.com/embed/${youtube}` } : null;
  }

  let vimeo: string | null = null;
  if (VIMEO_HOSTS.includes(host) && segments.length === 1) vimeo = segments[0];
  else if (host === 'player.vimeo.com' && segments[0] === 'video' && segments.length === 2) vimeo = segments[1];
  if (vimeo !== null) {
    return VIMEO_ID.test(vimeo) ? { type: 'iframe', src: `https://player.vimeo.com/video/${vimeo}` } : null;
  }

  let apiHost = '';
  try {
    apiHost = new URL(apiUrl).hostname;
  } catch {
    apiHost = '';
  }
  if (u.protocol === 'https:' && (host === apiHost || MEDIA_HOSTS.includes(host))) {
    return { type: 'video', src: href };
  }
  return null;
}

/* --- Slugs d'articles --- */

/* L'API fabrique les slugs en minuscules, chiffres et tirets, coupés à 280 caractères puis
   suivis d'un « -N » en cas de doublon : un slug coupé peut donc finir par un tiret ou en
   contenir deux de suite. */
const SLUG = /^[A-Za-z0-9-]+$/;
const MAX_SLUG_LENGTH = 300;

export function isValidSlug(slug: unknown): slug is string {
  return typeof slug === 'string' && slug.length <= MAX_SLUG_LENGTH && SLUG.test(slug);
}

/** Chemin du site vers un article ; encodé, donc un slug étrange ne sort jamais du segment. */
export function blogHref(slug: string): string {
  return `/blog/${encodeURIComponent(slug)}`;
}

/** URL de l'API pour un article, ou null si le slug n'est pas valide. L'origine reste celle de l'API. */
export function blogPostApiUrl(apiUrl: string, slug: unknown): string | null {
  if (!isValidSlug(slug)) return null;
  return `${apiUrl}/api/public/blog/${encodeURIComponent(slug)}`;
}
