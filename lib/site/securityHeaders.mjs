/* En-têtes de sécurité du site (TAR-48). Module pur en .mjs : next.config.mjs l'importe,
   et scripts/check-entetes.ts le teste. L'origine de l'API est passée en paramètre. */

/* Hébergements des médias : les mêmes que remotePatterns dans next.config.mjs */
export const MEDIA_HOSTS = ['https://targetym-media.s3.amazonaws.com', 'https://targetym-media.s3.eu-west-1.amazonaws.com'];

/* Lecteurs vidéo intégrés (lib/site/safeUrl.ts, components/site/trial/TrialFlow.tsx) */
export const FRAME_HOSTS = ['https://www.youtube.com', 'https://www.youtube-nocookie.com', 'https://player.vimeo.com'];

/* Google tag (GT-… et AW-…) chargé par components/site/Analytics.tsx.
   Liste partie de la documentation Google, puis complétée d'après les signalements relevés sur une preview.
   Google envoie aussi une image à son domaine du pays du visiteur (google.sn, google.ci…) : seuls les pays
   ci-dessous sont listés, une CSP n'acceptant pas de joker sur l'extension. */
const GOOGLE_PAYS = ['https://www.google.sn', 'https://www.google.ci', 'https://www.google.cm', 'https://www.google.fr'];
const GOOGLE_SCRIPT = [
  'https://*.googletagmanager.com',
  'https://www.googleadservices.com',
  'https://www.google.com',
  'https://googleads.g.doubleclick.net',
];
const GOOGLE_IMG = [
  'https://*.google-analytics.com',
  'https://*.googletagmanager.com',
  'https://*.doubleclick.net',
  'https://www.google.com',
  ...GOOGLE_PAYS,
];
const GOOGLE_CONNECT = [
  'https://*.google-analytics.com',
  'https://analytics.google.com',
  'https://*.analytics.google.com',
  'https://*.googletagmanager.com',
  'https://*.doubleclick.net',
  'https://www.google.com',
  'https://pagead2.googlesyndication.com',
  ...GOOGLE_PAYS,
];
const GOOGLE_FRAME = ['https://td.doubleclick.net'];

/* Outil de commentaires que Vercel ajoute aux previews, et à elles seules */
const VERCEL_PREVIEW = {
  script: ['https://vercel.live'],
  style: ['https://vercel.live'],
  img: ['https://vercel.live', 'https://vercel.com'],
  font: ['https://vercel.live', 'https://assets.vercel.com'],
  connect: ['https://vercel.live', 'wss://ws-us3.pusher.com'],
  frame: ['https://vercel.live'],
};
const NO_PREVIEW = { script: [], style: [], img: [], font: [], connect: [], frame: [] };

function origin(apiUrl) {
  try {
    return new URL(apiUrl).origin;
  } catch {
    throw new Error(`NEXT_PUBLIC_API_URL invalide : ${JSON.stringify(apiUrl)}`);
  }
}

function policy(directives) {
  return Object.entries(directives)
    .map(([name, sources]) => `${name} ${[...new Set(sources)].join(' ')}`)
    .join('; ');
}

/* Politique appliquée : uniquement des directives qui ne peuvent pas casser l'affichage */
export function enforcedPolicy() {
  return policy({
    'frame-ancestors': ["'self'"],
    'base-uri': ["'self'"],
    'object-src': ["'none'"],
  });
}

/* Politique complète en observation : le navigateur signale, ne bloque rien.
   'unsafe-inline' pour les scripts : Next 14 injecte des scripts d'amorçage et il n'y a pas de nonce. */
export function reportOnlyPolicy({ apiUrl, isDev, isPreview = false }) {
  const api = origin(apiUrl);
  const vercel = isPreview ? VERCEL_PREVIEW : NO_PREVIEW;
  return policy({
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : []), ...GOOGLE_SCRIPT, ...vercel.script],
    'style-src': ["'self'", "'unsafe-inline'", ...vercel.style],
    'img-src': ["'self'", 'data:', api, ...MEDIA_HOSTS, 'https://img.youtube.com', ...GOOGLE_IMG, ...vercel.img],
    'font-src': ["'self'", ...vercel.font],
    'connect-src': ["'self'", api, ...GOOGLE_CONNECT, ...(isDev ? ['ws:'] : []), ...vercel.connect],
    'frame-src': [...FRAME_HOSTS, ...GOOGLE_FRAME, ...vercel.frame],
    'media-src': ["'self'", api, ...MEDIA_HOSTS],
    'worker-src': ["'self'"],
    'manifest-src': ["'self'"],
    'form-action': ["'self'"],
  });
}

/** Liste d'en-têtes au format attendu par headers() de next.config.mjs. */
export function securityHeaders({ apiUrl, isDev, isPreview = false }) {
  return [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    /* Sans includeSubDomains ni preload : les autres sous-domaines ne sont pas de notre ressort */
    { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
    /* Plein écran, lecture automatique et presse-papiers restent permis : les lecteurs YouTube/Vimeo les demandent */
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
    { key: 'Content-Security-Policy', value: enforcedPolicy() },
    { key: 'Content-Security-Policy-Report-Only', value: reportOnlyPolicy({ apiUrl, isDev, isPreview }) },
  ];
}
