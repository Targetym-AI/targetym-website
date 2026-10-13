/**
 * En-têtes de sécurité du site (TAR-48) : présence, politiques de production et de développement,
 * cohérence avec safeUrl.ts et next.config.mjs. Modules purs : aucun navigateur ni appel réseau.
 */
import assert from 'node:assert/strict';
import nextConfig from '../next.config.mjs';
import { securityHeaders } from '../lib/site/securityHeaders.mjs';
import { safeVideoEmbed } from '../lib/site/safeUrl';

const API = 'https://api.targetym.ai';
const API_AUTRE = 'https://api.exemple-test.org';
const API_LOCAL = 'http://localhost:8002';
let total = 0;
let echecs = 0;
const attente: Promise<void>[] = [];
function verifier(libelle: string, fn: () => void | Promise<void>): void {
  total += 1;
  const ok = () => console.log(`✓ ${libelle}`);
  const ko = (e: unknown) => {
    echecs += 1;
    console.error(`✗ ${libelle}\n    ${(e as Error).message.split('\n')[0]}`);
  };
  try {
    const r = fn();
    if (r) attente.push(r.then(ok, ko));
    else ok();
  } catch (e) {
    ko(e);
  }
}

type Entete = { key: string; value: string };
const ATTENDUS = [
  'X-Content-Type-Options',
  'Referrer-Policy',
  'X-Frame-Options',
  'Strict-Transport-Security',
  'Permissions-Policy',
  'Content-Security-Policy',
  'Content-Security-Policy-Report-Only',
];

function entetes(apiUrl: string, isDev: boolean): Entete[] {
  return securityHeaders({ apiUrl, isDev });
}
function valeur(liste: Entete[], cle: string): string {
  const trouves = liste.filter((h) => h.key.toLowerCase() === cle.toLowerCase());
  assert.equal(trouves.length, 1, `${cle} présent ${trouves.length} fois`);
  return trouves[0].value;
}
function directives(politique: string): Map<string, string[]> {
  const m = new Map<string, string[]>();
  for (const part of politique.split(';')) {
    const [nom, ...sources] = part.trim().split(/\s+/);
    if (!nom) continue;
    assert.ok(!m.has(nom), `directive ${nom} en double`);
    m.set(nom, sources);
  }
  return m;
}
function rapport(apiUrl: string, isDev: boolean): Map<string, string[]> {
  return directives(valeur(entetes(apiUrl, isDev), 'Content-Security-Policy-Report-Only'));
}
function sources(d: Map<string, string[]>, nom: string): string[] {
  const s = d.get(nom);
  assert.ok(s, `directive ${nom} absente`);
  return s;
}

verifier('chaque en-tête attendu est présent une seule fois, et rien d’autre', () => {
  const liste = entetes(API, false);
  for (const k of ATTENDUS) valeur(liste, k);
  assert.equal(liste.length, ATTENDUS.length);
});
verifier('valeurs simples : nosniff, referrer, cadre, HSTS sans includeSubDomains ni preload', () => {
  const liste = entetes(API, false);
  assert.equal(valeur(liste, 'X-Content-Type-Options'), 'nosniff');
  assert.equal(valeur(liste, 'Referrer-Policy'), 'strict-origin-when-cross-origin');
  assert.equal(valeur(liste, 'X-Frame-Options'), 'SAMEORIGIN');
  assert.equal(valeur(liste, 'Strict-Transport-Security'), 'max-age=63072000');
});
verifier('Permissions-Policy : coupe l’inutilisé, laisse plein écran, lecture auto et presse-papiers', () => {
  const v = valeur(entetes(API, false), 'Permissions-Policy');
  for (const f of ['camera', 'microphone', 'geolocation', 'payment', 'usb']) assert.ok(v.includes(`${f}=()`), f);
  for (const f of ['fullscreen', 'autoplay', 'clipboard', 'encrypted-media', 'picture-in-picture']) assert.ok(!v.includes(f), f);
});
verifier('politique appliquée : frame-ancestors, base-uri et object-src, et rien d’autre', () => {
  const d = directives(valeur(entetes(API, false), 'Content-Security-Policy'));
  assert.deepEqual(Array.from(d.keys()), ['frame-ancestors', 'base-uri', 'object-src']);
  assert.deepEqual(d.get('frame-ancestors'), ["'self'"]);
  assert.deepEqual(d.get('object-src'), ["'none'"]);
});
verifier('frame-ancestors est dans l’en-tête appliqué, pas dans celui d’observation (où il est ignoré)', () => {
  assert.ok(directives(valeur(entetes(API, false), 'Content-Security-Policy')).has('frame-ancestors'));
  assert.ok(!rapport(API, false).has('frame-ancestors'));
});
verifier('observation : toutes les directives prévues, default-src \'self\'', () => {
  const d = rapport(API, false);
  for (const n of ['default-src', 'script-src', 'style-src', 'img-src', 'font-src', 'connect-src', 'frame-src', 'media-src', 'worker-src', 'manifest-src', 'form-action']) {
    assert.ok(d.has(n), n);
  }
  assert.deepEqual(d.get('default-src'), ["'self'"]);
});
verifier('production : ni unsafe-eval, ni ws:, ni *, ni schéma http(s) seul', () => {
  const d = rapport(API, false);
  for (const [nom, liste] of Array.from(d.entries())) {
    for (const s of liste) {
      assert.notEqual(s, "'unsafe-eval'", nom);
      assert.ok(!/^wss?:/.test(s), `${nom} ${s}`);
      assert.notEqual(s, '*', nom);
      assert.ok(!/^[a-z][a-z0-9+.-]*:$/i.test(s) || s === 'data:', `${nom} ${s}`);
      assert.ok(!/^https?:\/\/\*$/.test(s), `${nom} ${s}`);
    }
  }
});
verifier('développement : unsafe-eval dans script-src et ws: dans connect-src, nulle part ailleurs', () => {
  const d = rapport(API_LOCAL, true);
  assert.ok(sources(d, 'script-src').includes("'unsafe-eval'"));
  assert.ok(sources(d, 'connect-src').includes('ws:'));
  for (const [nom, liste] of Array.from(d.entries())) {
    if (nom !== 'script-src') assert.ok(!liste.includes("'unsafe-eval'"), nom);
    if (nom !== 'connect-src') assert.ok(!liste.includes('ws:'), nom);
  }
});
verifier('l’origine de l’API vient de l’argument : connect-src, img-src et media-src', () => {
  for (const [apiUrl, attendu] of [[API, API], [API_AUTRE, API_AUTRE], [`${API_LOCAL}/api/`, API_LOCAL]]) {
    const d = rapport(apiUrl, false);
    for (const n of ['connect-src', 'img-src', 'media-src']) assert.ok(sources(d, n).includes(attendu), `${n} ${attendu}`);
  }
});
verifier('une autre API donnée : l’adresse de production n’est écrite nulle part', () => {
  const liste = entetes(API_AUTRE, false);
  for (const h of liste) assert.ok(!h.value.includes('api.targetym.ai'), h.key);
  assert.ok(!entetes(API_LOCAL, true).some((h) => h.value.includes('api.targetym.ai')));
});
verifier('API invalide : erreur explicite plutôt qu’une politique sans API', () => {
  assert.throws(() => entetes('pas une url', false), /NEXT_PUBLIC_API_URL/);
});
verifier('frame-src : tous les lecteurs que safeUrl.ts accepte', () => {
  const f = sources(rapport(API, false), 'frame-src');
  const urls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtu.be/dQw4w9WgXcQ',
    'https://m.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    'https://vimeo.com/123456789',
    'https://player.vimeo.com/video/123456789',
  ];
  for (const u of urls) {
    const r = safeVideoEmbed(u, API);
    assert.ok(r && r.type === 'iframe', u);
    assert.ok(f.includes(new URL(r.src).origin), `${u} -> ${r.src}`);
  }
  assert.ok(f.includes('https://www.youtube-nocookie.com'), 'lecteur de TrialFlow.tsx');
});
verifier('media-src : l’API et les hôtes S3 que safeUrl.ts accepte pour les vidéos natives', () => {
  const m = sources(rapport(API, false), 'media-src');
  for (const u of [`${API}/uploads/a.mp4`, 'https://targetym-media.s3.amazonaws.com/v/a.mp4', 'https://targetym-media.s3.eu-west-1.amazonaws.com/v/a.mp4']) {
    const r = safeVideoEmbed(u, API);
    assert.ok(r && r.type === 'video', u);
    assert.ok(m.includes(new URL(r.src).origin), u);
  }
});
verifier('img-src : les hôtes de next.config.mjs', () => {
  const hotes = (nextConfig.images?.remotePatterns ?? []).map((p) => `${p.protocol}://${p.hostname}`);
  assert.equal(hotes.length, 3);
  const img = sources(rapport(API, false), 'img-src');
  for (const h of hotes) assert.ok(img.includes(h), h);
});
verifier('next.config.mjs : aucun nom d’hôte avec joker dans les images', () => {
  for (const p of nextConfig.images?.remotePatterns ?? []) {
    assert.ok(!p.hostname.includes('*'), p.hostname);
    assert.equal(p.protocol, 'https');
  }
});
verifier('next.config.mjs : headers() applique la liste à toutes les routes', async () => {
  const regles = await nextConfig.headers?.();
  assert.ok(regles && regles.length === 1);
  assert.equal(regles[0].source, '/:path*');
  for (const k of ATTENDUS) assert.equal(regles[0].headers.filter((h: Entete) => h.key === k).length, 1, k);
});
verifier('Google tag : script, collecte et conversions autorisés en observation', () => {
  const d = rapport(API, false);
  assert.ok(sources(d, 'script-src').includes('https://*.googletagmanager.com'));
  assert.ok(sources(d, 'connect-src').includes('https://*.google-analytics.com'));
  assert.ok(sources(d, 'img-src').includes('https://*.google-analytics.com'));
});

verifier('preview Vercel : son outil de commentaires est permis là, et là seulement', () => {
  const preview = directives(valeur(securityHeaders({ apiUrl: API, isDev: false, isPreview: true }), 'Content-Security-Policy-Report-Only'));
  assert.ok(preview.get('script-src')?.includes('https://vercel.live'));
  assert.ok(preview.get('frame-src')?.includes('https://vercel.live'));
  for (const h of entetes(API, false)) assert.ok(!h.value.includes('vercel'), `${h.key} cite Vercel en production`);
});

Promise.all(attente).then(() => {
  console.log(echecs === 0 ? `\n${total} contrôles passent.` : `\n${echecs} contrôle(s) en échec sur ${total}.`);
  process.exit(echecs === 0 ? 0 : 1);
});
