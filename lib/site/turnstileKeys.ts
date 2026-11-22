/* Cloudflare Turnstile, partagé par les formulaires (navigateur) et leurs routes (serveur). */

/** Champ du corps JSON qui porte le jeton délivré par le widget. */
export const TURNSTILE_FIELD = 'turnstileToken';

/* Clés de test publiées par Cloudflare : le widget délivre toujours un jeton que la clé
   secrète de test valide. Elles servent en local et sur les aperçus Vercel, où les vraies
   clés (limitées aux domaines du site) ne fonctionnent pas. */
export const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000AA';
export const TURNSTILE_TEST_SECRET_KEY = '1x0000000000000000000000000000000AA';

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TURNSTILE_TEST_SITE_KEY;

export const TURNSTILE_SCRIPT_ORIGIN = 'https://challenges.cloudflare.com';
