/* Vérification côté serveur du jeton Turnstile (W-01 / TAR-41). La fonction de
   vérification est injectée dans handleFormRequest : les routes branchent Cloudflare,
   scripts/check-formulaires.ts branche un faux vérificateur. */
import { TURNSTILE_SCRIPT_ORIGIN, TURNSTILE_TEST_SECRET_KEY } from './turnstileKeys';

export type HumanCheck = 'ok' | 'refused' | 'unavailable';
export type VerifyHuman = (token: string, ip: string | null) => Promise<HumanCheck>;

const SITEVERIFY_URL = `${TURNSTILE_SCRIPT_ORIGIN}/turnstile/v0/siteverify`;
const TIMEOUT_MS = 5000;

type Env = Record<string, string | undefined>;

/** Clé secrète à utiliser, ou null en production si elle n'est pas configurée : on refuse
    alors plutôt que de laisser passer les robots. */
export function turnstileSecret(env: Env = process.env): string | null {
  if (env.TURNSTILE_SECRET_KEY) return env.TURNSTILE_SECRET_KEY;
  return env.VERCEL_ENV === 'production' ? null : TURNSTILE_TEST_SECRET_KEY;
}

export function makeTurnstileVerifier(
  secret: string | null,
  fetchImpl: typeof fetch = fetch,
  log: (...args: unknown[]) => void = console.error,
): VerifyHuman {
  return async (token, ip) => {
    if (!secret) {
      log('[formulaire public] TURNSTILE_SECRET_KEY absente en production');
      return 'unavailable';
    }
    const form = new URLSearchParams({ secret, response: token });
    if (ip) form.set('remoteip', ip);
    try {
      const res = await fetchImpl(SITEVERIFY_URL, {
        method: 'POST',
        body: form,
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!res.ok) {
        log('[formulaire public] siteverify a répondu', res.status);
        return 'unavailable';
      }
      const data = (await res.json()) as { success?: unknown };
      return data.success === true ? 'ok' : 'refused';
    } catch (err) {
      log('[formulaire public] siteverify injoignable', err);
      return 'unavailable';
    }
  };
}

/** Vérificateur des routes : la clé est relue à chaque appel, comme les autres variables. */
export const verifyWithCloudflare: VerifyHuman = (token, ip) =>
  makeTurnstileVerifier(turnstileSecret())(token, ip);
