/**
 * Validation des URL venant des contenus de l'API (TAR-39) et du slug d'article (TAR-53).
 * Modules purs : aucun navigateur ni appel réseau.
 */
import assert from 'node:assert/strict';
import {
  blogHref,
  blogPostApiUrl,
  isValidSlug,
  safeExternalUrl,
  safeInternalPath,
  safeLink,
  safeMediaUrl,
  safeVideoEmbed,
} from '../lib/site/safeUrl';

const API = 'https://api.targetym.ai';
let total = 0;
let echecs = 0;
function verifier(libelle: string, fn: () => void): void {
  total += 1;
  try {
    fn();
    console.log(`✓ ${libelle}`);
  } catch (e) {
    echecs += 1;
    console.error(`✗ ${libelle}\n    ${(e as Error).message.split('\n')[0]}`);
  }
}

const ACTIFS = [
  'javascript:alert(1)',
  'JaVaScRiPt:alert(1)',
  'JAVASCRIPT:alert(1)',
  ' javascript:alert(1)',
  'javascript:alert(1) ',
  'java\tscript:alert(1)',
  'java\nscript:alert(1)',
  'java\rscript:alert(1)',
  '\u0001javascript:alert(1)',
  'data:text/html,<script>alert(1)</script>',
  'DaTa:text/html;base64,PHNjcmlwdD4=',
  'vbscript:msgbox(1)',
  'file:///etc/passwd',
  'blob:https://x.com/1',
  'javascript%3Aalert(1)',
  '%6Aavascript:alert(1)',
  '&#106;avascript:alert(1)',
  'javascript&colon;alert(1)',
];
const AMBIGUES = [
  '//evil.com',
  '///evil.com',
  '/\\evil.com',
  '\\\\evil.com',
  '\\/evil.com',
  'https:/evil.com',
  'https:evil.com',
  'https:///',
  'https://',
  'https://user:pass@evil.com/',
  'https://user@evil.com/',
  'https://exemple.com/a b',
  ' https://exemple.com',
  'https://exemple.com ',
  'https://exemple.com/\u0000',
  'https://exemple.com/\u200b',
  'https://exemple.com:abc/',
  '',
  'exemple.com',
  'pricing',
];

verifier('lien externe : http et https absolus acceptés', () => {
  assert.equal(safeExternalUrl('https://exemple.com/page?a=1#b'), 'https://exemple.com/page?a=1#b');
  assert.equal(safeExternalUrl('http://exemple.com/'), 'http://exemple.com/');
  assert.equal(safeExternalUrl('https://exemple.com:8443/x'), 'https://exemple.com:8443/x');
});
verifier('lien externe : schéma en casse mixte normalisé en minuscules', () => {
  assert.equal(safeExternalUrl('HTTPS://Exemple.com/Page'), 'https://exemple.com/Page');
  assert.equal(safeExternalUrl('HtTp://exemple.com/'), 'http://exemple.com/');
});
verifier('lien externe : schémas actifs, variantes de casse, d’encodage et d’espaces refusés', () => {
  for (const u of [...ACTIFS, ...AMBIGUES]) assert.equal(safeExternalUrl(u), null, JSON.stringify(u));
});
verifier('lien externe : valeurs non textuelles refusées', () => {
  for (const u of [null, undefined, 12, {}, ['https://exemple.com']]) assert.equal(safeExternalUrl(u), null);
});
verifier('lien externe : URL démesurée refusée', () => {
  assert.equal(safeExternalUrl(`https://exemple.com/${'a'.repeat(2100)}`), null);
});

verifier('route interne : chemins simples, query et ancre acceptés tels quels', () => {
  for (const p of ['/pricing', '/', '/blog?q=rh', '/solutions#m-recrutement-0', '/a/b/c']) assert.equal(safeInternalPath(p), p);
});
verifier('route interne : « // », « /\\ », antislash, espaces et contrôles refusés', () => {
  for (const p of ['//evil.com', '//', '/\\evil.com', '/\\/evil.com', '/a\\b', '/a b', '/a\tb', '/a\nb', '/\u0000', ' /pricing', '/pricing ', '\t//evil.com']) {
    assert.equal(safeInternalPath(p), null, JSON.stringify(p));
  }
});
verifier('route interne : URL absolues, schémas actifs et chemins relatifs refusés', () => {
  for (const p of ['https://exemple.com', 'javascript:alert(1)', 'pricing', './pricing', '../pricing', '', '?q=1', '#ancre']) {
    assert.equal(safeInternalPath(p), null, JSON.stringify(p));
  }
});

verifier('lien au choix : externe, interne ou rien', () => {
  assert.deepEqual(safeLink('https://exemple.com/offre'), { kind: 'external', href: 'https://exemple.com/offre' });
  assert.deepEqual(safeLink('/pricing'), { kind: 'internal', href: '/pricing' });
  for (const u of [...ACTIFS, ...AMBIGUES]) assert.equal(safeLink(u), null, JSON.stringify(u));
});

verifier('média : un chemin reçoit l’origine de l’API', () => {
  assert.equal(safeMediaUrl('/uploads/a.jpg', API), `${API}/uploads/a.jpg`);
});
verifier('média : une URL absolue http(s) est conservée', () => {
  assert.equal(safeMediaUrl('https://cdn.exemple.com/a.jpg', API), 'https://cdn.exemple.com/a.jpg');
});
verifier('média : data:, javascript:, « // » et valeurs vides donnent une chaîne vide', () => {
  for (const u of [...ACTIFS, ...AMBIGUES, null, undefined]) assert.equal(safeMediaUrl(u, API), '', JSON.stringify(u));
});

verifier('vidéo YouTube : watch?v=, youtu.be, /embed/ donnent le même lecteur', () => {
  const attendu = { type: 'iframe', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' };
  for (const u of [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtube.com/watch?v=dQw4w9WgXcQ&t=10s',
    'https://m.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtu.be/dQw4w9WgXcQ',
    'https://youtu.be/dQw4w9WgXcQ?si=abc',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    'HTTPS://WWW.YOUTUBE.COM/watch?v=dQw4w9WgXcQ',
  ]) assert.deepEqual(safeVideoEmbed(u, API), attendu, u);
});
verifier('vidéo Vimeo : vimeo.com/ID et player.vimeo.com/video/ID', () => {
  const attendu = { type: 'iframe', src: 'https://player.vimeo.com/video/123456789' };
  assert.deepEqual(safeVideoEmbed('https://vimeo.com/123456789', API), attendu);
  assert.deepEqual(safeVideoEmbed('https://www.vimeo.com/123456789', API), attendu);
  assert.deepEqual(safeVideoEmbed('https://player.vimeo.com/video/123456789?h=abc', API), attendu);
});
verifier('vidéo : l’URL de lecteur est reconstruite, jamais recopiée', () => {
  const r = safeVideoEmbed('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&x=<script>', API);
  assert.deepEqual(r, { type: 'iframe', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' });
});
verifier('vidéo : fichier hébergé par l’API ou le stockage média lu nativement', () => {
  assert.deepEqual(safeVideoEmbed(`${API}/uploads/demo.mp4`, API), { type: 'video', src: `${API}/uploads/demo.mp4` });
  const s3 = 'https://targetym-media.s3.amazonaws.com/v/demo.mp4';
  assert.deepEqual(safeVideoEmbed(s3, API), { type: 'video', src: s3 });
});
verifier('vidéo : hôtes imitant un fournisseur refusés', () => {
  for (const u of [
    'https://evil-youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtube.com.evil.com/watch?v=dQw4w9WgXcQ',
    'https://notyoutube.com/watch?v=dQw4w9WgXcQ',
    'https://youtu.be.evil.com/dQw4w9WgXcQ',
    'https://evil.com/youtu.be/dQw4w9WgXcQ',
    'https://evilvimeo.com/123456789',
    'https://vimeo.com.evil.com/123456789',
    'https://user@www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.youtube.com:444/watch?v=dQw4w9WgXcQ',
  ]) assert.equal(safeVideoEmbed(u, API), null, u);
});
verifier('vidéo : toute URL /embed/ d’un hôte non approuvé est refusée', () => {
  for (const u of ['https://evil.com/embed/x', 'https://evil.com/embed/dQw4w9WgXcQ', 'https://www.youtube.com.evil.com/embed/dQw4w9WgXcQ']) {
    assert.equal(safeVideoEmbed(u, API), null, u);
  }
});
verifier('vidéo : identifiants invalides ou chemins détournés refusés', () => {
  for (const u of [
    'https://www.youtube.com/watch?v=../../x',
    'https://www.youtube.com/watch?v=abc',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ"onload="x',
    'https://www.youtube.com/watch',
    'https://www.youtube.com/embed/dQw4w9WgXcQ/extra',
    'https://www.youtube.com/embed/..%2F..%2Fx',
    'https://youtu.be/',
    'https://youtu.be/a/b',
    'https://vimeo.com/abc',
    'https://vimeo.com/123/456',
    'https://player.vimeo.com/video/abc',
    'https://player.vimeo.com/embed/123',
  ]) assert.equal(safeVideoEmbed(u, API), null, u);
});
verifier('vidéo : schémas actifs, http non chiffré hors lecteurs et hôte inconnu refusés', () => {
  for (const u of [...ACTIFS, ...AMBIGUES, 'https://evil.com/video.mp4', 'http://api.targetym.ai/uploads/demo.mp4', 'https://exemple.com/page']) {
    assert.equal(safeVideoEmbed(u, API), null, u);
  }
});

verifier('slug : slugs réels accueillis', () => {
  for (const s of [
    'les-20-fonctionnalites-inedites-de-targetym-ai-sirh-32-autres-a-decouvrir',
    'digitaliser-les-processus-rh-comment-sortir-du-chaos-du-jonglage-entre-plusieurs-outils',
    'construire-un-outil-sirh-toutes-les-fonctionnalites-sont-elles-vraiment-pertinentes',
    'votre-management-rh-est-il-mature-pour-un-sirh-complet',
    'sirh-2026',
    'A1',
  ]) assert.equal(isValidSlug(s), true, s);
});
verifier('slug : ?, #, %2F, .., /, vide, long et autres formes ambiguës refusés', () => {
  for (const s of [
    'a?b=1', 'a#b', '%2F', 'a%2Fb', '%2e%2e', '..', '../x', 'a/../b', 'a/b', '/a', 'a/', 'a\\b', '',
    'a'.repeat(301), 'a b', ' a', 'a\n', 'a\u0000', 'a_b', 'a.b', 'é', 'a;b', 'a%00', null, undefined, 3,
  ]) assert.equal(isValidSlug(s), false, JSON.stringify(s));
});
verifier('slug : formes produites par l’API pour un titre très long (coupé à 280, suffixe de doublon)', () => {
  assert.equal(isValidSlug('a'.repeat(280)), true);
  assert.equal(isValidSlug(`${'a'.repeat(279)}-`), true);
  assert.equal(isValidSlug(`${'a'.repeat(279)}--2`), true);
});
verifier('slug : 300 caractères acceptés, 301 refusés', () => {
  assert.equal(isValidSlug('a'.repeat(300)), true);
  assert.equal(isValidSlug('a'.repeat(301)), false);
});
verifier('URL d’API : construction exacte pour un slug valide', () => {
  assert.equal(blogPostApiUrl(API, 'votre-management-rh-est-il-mature'), 'https://api.targetym.ai/api/public/blog/votre-management-rh-est-il-mature');
  assert.equal(blogPostApiUrl('http://localhost:8000', 'sirh-2026'), 'http://localhost:8000/api/public/blog/sirh-2026');
});
verifier('URL d’API : aucun appel construit pour un slug refusé', () => {
  for (const s of ['a?b', 'a#b', '%2F', '..', '', 'a'.repeat(301), 'a/b']) assert.equal(blogPostApiUrl(API, s), null, s);
});
verifier('URL d’API : l’origine reste celle de l’API et le chemin ne change pas', () => {
  const u = new URL(blogPostApiUrl(API, 'un-slug-valide') as string);
  assert.equal(u.origin, API);
  assert.equal(u.pathname, '/api/public/blog/un-slug-valide');
  assert.equal(u.search, '');
  assert.equal(u.hash, '');
});
verifier('lien article : segment encodé, sans sortie du chemin', () => {
  assert.equal(blogHref('un-slug-valide'), '/blog/un-slug-valide');
  assert.equal(blogHref('../x?y#z'), '/blog/..%2Fx%3Fy%23z');
  assert.equal(blogHref('a/b'), '/blog/a%2Fb');
});

console.log(echecs === 0 ? `\n${total} contrôles passent.` : `\n${echecs} contrôle(s) en échec sur ${total}.`);
process.exit(echecs === 0 ? 0 : 1);
