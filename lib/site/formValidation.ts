/* Validation serveur des formulaires publics (contact, démo, essai gratuit) et bornes sur
   la requête HTTP. Modules purs : aucun appel réseau, aucune variable d'environnement.
   Les champs inconnus sont ignorés, donc jamais repris dans l'e-mail. */

export const MAX_BODY_BYTES = 20 * 1024;

/* Champ caché des formulaires : un humain ne le voit pas, beaucoup de robots le remplissent.
   Nom volontairement neutre : un champ « website » ou « url » peut être rempli par le
   remplissage automatique du navigateur, et l'envoi d'un vrai visiteur serait alors écarté. */
export const HONEYPOT_FIELD = 'info_supp';

export const CONTACT_SUBJECTS = ['demo', 'pricing', 'support', 'partnership', 'other'] as const;

type StringKind = 'text' | 'multiline' | 'email' | 'phone' | 'enum';

export type FieldSpec =
  | { kind: StringKind; label: string; required: boolean; max: number; values?: readonly string[] }
  | { kind: 'list'; label: string; required: false; maxItems: number; itemMax: number };

export type FormSpec = Record<string, FieldSpec>;

export type ValidationResult =
  | { ok: true; data: Record<string, string | string[]> }
  | { ok: false; error: string };

/* Bornes : nom, entreprise, poste, ville... 150 ; e-mail 254 (RFC 5321) ; téléphone 40 ;
   message 5 000. Les listes de choix de l'essai gratuit comptent au plus 8 options par
   question, 20 laisse de la marge. */
export const CONTACT_SPEC: FormSpec = {
  name: { kind: 'text', label: 'Nom', required: true, max: 150 },
  email: { kind: 'email', label: 'E-mail', required: true, max: 254 },
  company: { kind: 'text', label: 'Entreprise', required: false, max: 150 },
  phone: { kind: 'phone', label: 'Téléphone', required: false, max: 40 },
  subject: { kind: 'enum', label: 'Sujet', required: true, max: 20, values: CONTACT_SUBJECTS },
  message: { kind: 'multiline', label: 'Message', required: true, max: 5000 },
};

export const DEMO_SPEC: FormSpec = {
  firstName: { kind: 'text', label: 'Prénom', required: true, max: 100 },
  lastName: { kind: 'text', label: 'Nom', required: true, max: 100 },
  whatsapp: { kind: 'phone', label: 'Téléphone', required: true, max: 40 },
  email: { kind: 'email', label: 'E-mail', required: true, max: 254 },
  jobTitle: { kind: 'text', label: 'Profession', required: false, max: 150 },
  company: { kind: 'text', label: 'Entreprise', required: false, max: 150 },
};

export const TRIAL_SPEC: FormSpec = {
  firstName: { kind: 'text', label: 'Prénom', required: true, max: 100 },
  lastName: { kind: 'text', label: 'Nom', required: true, max: 100 },
  email: { kind: 'email', label: 'E-mail', required: true, max: 254 },
  phone: { kind: 'phone', label: 'Téléphone', required: true, max: 40 },
  jobTitle: { kind: 'text', label: 'Poste', required: true, max: 150 },
  company: { kind: 'text', label: 'Entreprise', required: true, max: 150 },
  sector: { kind: 'text', label: 'Secteur d\'activité', required: false, max: 150 },
  companySize: { kind: 'text', label: 'Taille de l\'entreprise', required: false, max: 150 },
  country: { kind: 'text', label: 'Pays', required: false, max: 100 },
  city: { kind: 'text', label: 'Ville', required: false, max: 100 },
  currentTools: { kind: 'text', label: 'Outils RH', required: false, max: 300 },
  mainChallenges: { kind: 'list', label: 'Défis RH', required: false, maxItems: 20, itemMax: 150 },
  mainObjectives: { kind: 'list', label: 'Objectifs', required: false, maxItems: 20, itemMax: 150 },
  howDidYouHear: { kind: 'text', label: 'Source', required: false, max: 150 },
  message: { kind: 'multiline', label: 'Message', required: false, max: 5000 },
};

// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u001f\u007f\u2028\u2029]/;
// eslint-disable-next-line no-control-regex
const MULTILINE_CONTROL_CHARS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;
const EMAIL_FORBIDDEN = /[\s\u0000-\u001f\u007f-\u00a0<>(),;:"\\[\]]/;

export function isValidEmail(value: string): boolean {
  if (value.length > 254 || EMAIL_FORBIDDEN.test(value)) return false;
  const parts = value.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || local.length > 64 || !domain) return false;
  const labels = domain.split('.');
  return labels.length >= 2 && labels.every((l) => l.length > 0 && l.length <= 63);
}

/* Volontairement souple : un visiteur écrit « 77 123 45 67 / 76 987 65 43 » ou ajoute
   « (WhatsApp) ». Refuser ces saisies ferait perdre une demande commerciale. */
function isValidPhone(value: string): boolean {
  return !CONTROL_CHARS.test(value) && value.replace(/\D/g, '').length >= 5;
}

function tooLong(label: string): string {
  return `Le champ « ${label} » est trop long.`;
}

function checkString(spec: Exclude<FieldSpec, { kind: 'list' }>, raw: string): string | null {
  const value = raw.trim();
  if (value.length > spec.max) return tooLong(spec.label);
  if (spec.kind === 'email') return isValidEmail(value) ? null : 'Adresse e-mail invalide.';
  if (spec.kind === 'phone') return !value || isValidPhone(value) ? null : 'Numéro de téléphone invalide.';
  if (spec.kind === 'enum') return spec.values?.includes(value) ? null : 'Sujet invalide.';
  const bad = spec.kind === 'multiline' ? MULTILINE_CONTROL_CHARS : CONTROL_CHARS;
  return bad.test(value) ? 'Données invalides.' : null;
}

/** Valide un corps JSON déjà décodé. Renvoie les seuls champs connus, nettoyés (espaces retirés). */
export function validateForm(spec: FormSpec, input: unknown): ValidationResult {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    return { ok: false, error: 'Données invalides.' };
  }
  const body = input as Record<string, unknown>;
  const data: Record<string, string | string[]> = {};
  let missing = false;

  for (const [name, field] of Object.entries(spec)) {
    const raw = Object.prototype.hasOwnProperty.call(body, name) ? body[name] : undefined;
    const absent = raw === undefined || raw === null;

    if (field.kind === 'list') {
      if (absent) { data[name] = []; continue; }
      if (!Array.isArray(raw) || raw.some((v) => typeof v !== 'string')) return { ok: false, error: 'Données invalides.' };
      if (raw.length > field.maxItems) return { ok: false, error: 'Trop de choix sélectionnés.' };
      const items = (raw as string[]).map((v) => v.trim());
      for (const item of items) {
        if (item.length > field.itemMax) return { ok: false, error: tooLong(field.label) };
        if (CONTROL_CHARS.test(item)) return { ok: false, error: 'Données invalides.' };
      }
      data[name] = items.filter(Boolean);
      continue;
    }

    if (absent) {
      if (field.required) missing = true;
      data[name] = '';
      continue;
    }
    if (typeof raw !== 'string') return { ok: false, error: 'Données invalides.' };
    const error = checkString(field, raw);
    if (error) return { ok: false, error };
    const value = raw.trim();
    if (field.required && !value) missing = true;
    data[name] = value;
  }

  if (missing) return { ok: false, error: 'Champs requis manquants.' };
  return { ok: true, data };
}

/** Vrai si le champ piège est rempli (toute valeur non vide, quel qu'en soit le type). */
export function isHoneypotFilled(input: unknown): boolean {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) return false;
  const value = (input as Record<string, unknown>)[HONEYPOT_FIELD];
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
}

type HeaderReader = { get(name: string): string | null };

function hostOf(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).host.toLowerCase();
  } catch {
    return null;
  }
}

/* Domaines publics du site : acceptés même si un proxy en amont présente un autre hôte. */
const SITE_HOSTS = ['www.targetym.ai', 'targetym.ai'];

/** L'origine de la requête (Origin, à défaut Referer) doit désigner l'hôte vu derrière le
    proxy. Comparer à l'hôte de la requête plutôt qu'à une liste fixe garde le contrôle
    valable sur les aperçus Vercel et en local. */
export function isSameOrigin(headers: HeaderReader): boolean {
  const origin = headers.get('origin');
  const claimed = hostOf(origin) ?? (origin === null ? hostOf(headers.get('referer')) : null);
  if (!claimed) return false;
  if (SITE_HOSTS.includes(claimed)) return true;
  const forwarded = headers.get('x-forwarded-host')?.split(',')[0]?.trim();
  const actual = (forwarded || headers.get('host') || '').toLowerCase();
  return actual !== '' && claimed === actual;
}

export type BodyResult =
  | { ok: true; value: unknown }
  | { ok: false; status: 400 | 413 | 415; error: string };

/** Lit le corps JSON d'une requête avec une taille maximale, avant tout JSON.parse. */
export async function readJsonBody(req: Request, maxBytes: number = MAX_BODY_BYTES): Promise<BodyResult> {
  const type = req.headers.get('content-type') ?? '';
  if (!/^application\/json\s*(;|$)/i.test(type.trim())) {
    return { ok: false, status: 415, error: 'Format de requête non pris en charge.' };
  }
  const tooBig: BodyResult = { ok: false, status: 413, error: 'Requête trop volumineuse.' };
  const declared = Number(req.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > maxBytes) return tooBig;

  let text = '';
  if (req.body) {
    const reader = req.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel().catch(() => undefined);
        return tooBig;
      }
      chunks.push(value);
    }
    const all = new Uint8Array(size);
    let offset = 0;
    for (const c of chunks) { all.set(c, offset); offset += c.byteLength; }
    text = new TextDecoder().decode(all);
  }

  try {
    const value: unknown = JSON.parse(text);
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      return { ok: false, status: 400, error: 'Données invalides.' };
    }
    return { ok: true, value };
  } catch {
    return { ok: false, status: 400, error: 'Données invalides.' };
  }
}
