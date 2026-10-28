/* Logique des trois formulaires publics, sans dépendance à Resend ni à Next : chaque
   traitement reçoit le corps déjà décodé, une fonction d'envoi et une vérification
   anti-robot injectées. La route réelle branche Resend et Cloudflare Turnstile, les
   contrôles (scripts/check-formulaires.ts) branchent un faux envoi et un faux vérificateur.
   Les mises en forme d'e-mail sont celles des routes d'origine, inchangées. */
import { escapeHtml } from '../sanitize';
import {
  CONTACT_SPEC,
  DEMO_SPEC,
  TRIAL_SPEC,
  isHoneypotFilled,
  isSameOrigin,
  readJsonBody,
  validateForm,
  type FormSpec,
} from './formValidation';
import type { HumanCheck, VerifyHuman } from './turnstile';
import { TURNSTILE_FIELD } from './turnstileKeys';

export type LeadMail = { replyTo: string; subject: string; html: string };
export type SendLead = (mail: LeadMail) => Promise<{ error?: unknown }>;
export type FormResult = { status: number; body: { success: true } | { error: string } };
export type CheckToken = (token: string) => Promise<HumanCheck>;
export type FormProcessor = (input: unknown, send: SendLead, checkToken: CheckToken) => Promise<FormResult>;

const OK: FormResult = { status: 200, body: { success: true } };

const TOKEN_MAX_LENGTH = 2048;

/** Refus à renvoyer si la preuve anti-robot manque ou ne passe pas ; null si elle passe. */
async function refuseUnlessHuman(input: unknown, checkToken: CheckToken): Promise<FormResult | null> {
  const token = (input as Record<string, unknown>)[TURNSTILE_FIELD];
  if (typeof token !== 'string' || !token || token.length > TOKEN_MAX_LENGTH) {
    return { status: 400, body: { error: 'Vérification anti-robot manquante. Rechargez la page et réessayez.' } };
  }
  const result = await checkToken(token);
  if (result === 'ok') return null;
  if (result === 'refused') {
    return { status: 400, body: { error: 'Vérification anti-robot échouée. Réessayez.' } };
  }
  return { status: 503, body: { error: 'Vérification anti-robot indisponible. Réessayez dans un instant.' } };
}

const subjectLabels: Record<string, string> = {
  demo: 'Demande de démonstration',
  pricing: 'Question sur les tarifs',
  support: 'Support technique',
  partnership: 'Partenariat',
  other: 'Autre',
};

function buildContact(d: Record<string, string | string[]>): LeadMail {
  const { name, email, company, phone, subject, message } = d as Record<string, string>;
  return {
    replyTo: email,
    subject: `[Contact Targetym] ${subjectLabels[subject] ?? subject}`,
    html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#4f46e5;">Nouveau message depuis le site Targetym</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;font-weight:bold;width:140px;">Nom</td><td style="padding:8px;">${escapeHtml(name)}</td></tr>
            <tr style="background:#f9fafb;"><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Entreprise</td><td style="padding:8px;">${escapeHtml(company || '—')}</td></tr>
            <tr style="background:#f9fafb;"><td style="padding:8px;font-weight:bold;">Téléphone</td><td style="padding:8px;">${escapeHtml(phone || '—')}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Sujet</td><td style="padding:8px;">${escapeHtml(subjectLabels[subject] ?? subject)}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:8px;">
            <p style="font-weight:bold;margin-bottom:8px;">Message :</p>
            <p style="white-space:pre-wrap;margin:0;">${escapeHtml(message)}</p>
          </div>
        </div>
      `,
  };
}

function buildDemo(d: Record<string, string | string[]>): LeadMail {
  const { firstName, lastName, whatsapp, email, jobTitle, company } = d as Record<string, string>;
  return {
    replyTo: email,
    subject: `[Événement Odoo] ${firstName} ${lastName}${company ? ' — ' + company : ''}`,
    html: `
        <div style="font-family:sans-serif;max-width:700px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#066C6C,#0AAE8E);padding:24px 32px;border-radius:12px 12px 0 0;">
            <h2 style="color:#fff;margin:0;font-size:22px;">🎪 Nouveau contact — Événement Odoo</h2>
            <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;">Targetym AI — Demande de démo gratuite</p>
          </div>
          <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:24px 32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;width:200px;color:#374151;">Prénom</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(firstName)}</td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Nom</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(lastName)}</td></tr>
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;color:#374151;">WhatsApp</td><td style="padding:10px 12px;color:#111827;"><a href="tel:${escapeHtml(whatsapp)}" style="color:#066C6C;">${escapeHtml(whatsapp)}</a></td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Email</td><td style="padding:10px 12px;color:#111827;"><a href="mailto:${escapeHtml(email)}" style="color:#066C6C;">${escapeHtml(email)}</a></td></tr>
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;color:#374151;">Profession</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(jobTitle || '—')}</td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Entreprise</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(company || '—')}</td></tr>
            </table>

            <div style="margin-top:24px;padding:16px;background:#e6f5f5;border-radius:8px;border-left:4px solid #066C6C;">
              <p style="margin:0;color:#066C6C;font-weight:600;">✅ Action recommandée</p>
              <p style="margin:6px 0 0;color:#374151;">Recontacter ${escapeHtml(firstName)} rapidement suite à sa demande lors de l'événement Odoo.</p>
            </div>
          </div>
        </div>
      `,
  };
}

function buildTrial(d: Record<string, string | string[]>): LeadMail {
  const { firstName, lastName, email, phone, jobTitle, company, sector, companySize, country, city,
    currentTools, mainChallenges, mainObjectives, howDidYouHear, message } = d as Record<string, string>;

  // Les multi-sélections arrivent sous forme de tableaux → présentation lisible
  const fmtList = (v: unknown) => (Array.isArray(v) ? v.join(', ') : (v || '—'));

  return {
    replyTo: email,
    subject: `[Essai Gratuit] ${firstName} ${lastName} — ${company}`,
    html: `
        <div style="font-family:sans-serif;max-width:700px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#066C6C,#0AAE8E);padding:24px 32px;border-radius:12px 12px 0 0;">
            <h2 style="color:#fff;margin:0;font-size:22px;">🚀 Nouvelle demande d'essai gratuit</h2>
            <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;">Targetym AI — Formulaire de qualification</p>
          </div>
          <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;padding:24px 32px;">

            <h3 style="color:#066C6C;font-size:16px;margin:0 0 16px;">👤 Informations personnelles</h3>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;width:200px;color:#374151;">Prénom</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(firstName)}</td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Nom</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(lastName)}</td></tr>
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;color:#374151;">Email professionnel</td><td style="padding:10px 12px;color:#111827;"><a href="mailto:${escapeHtml(email)}" style="color:#066C6C;">${escapeHtml(email)}</a></td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Téléphone</td><td style="padding:10px 12px;color:#111827;"><a href="tel:${escapeHtml(phone)}" style="color:#066C6C;">${escapeHtml(phone)}</a></td></tr>
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;color:#374151;">Poste / Fonction</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(jobTitle)}</td></tr>
            </table>

            <h3 style="color:#066C6C;font-size:16px;margin:0 0 16px;">🏢 Informations entreprise</h3>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;width:200px;color:#374151;">Entreprise</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(company)}</td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Secteur d'activité</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(sector || '—')}</td></tr>
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;color:#374151;">Taille de l'entreprise</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(companySize || '—')}</td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Pays</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(country || '—')}</td></tr>
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;color:#374151;">Ville</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(city || '—')}</td></tr>
            </table>

            <h3 style="color:#066C6C;font-size:16px;margin:0 0 16px;">🎯 Qualification commerciale</h3>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;width:200px;color:#374151;">Outils RH actuels</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(currentTools || '—')}</td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Principaux défis RH</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(fmtList(mainChallenges))}</td></tr>
              <tr style="background:#f9fafb;"><td style="padding:10px 12px;font-weight:600;color:#374151;">Objectifs principaux</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(fmtList(mainObjectives))}</td></tr>
              <tr><td style="padding:10px 12px;font-weight:600;color:#374151;">Source / Comment nous a-t-il connu ?</td><td style="padding:10px 12px;color:#111827;">${escapeHtml(howDidYouHear || '—')}</td></tr>
            </table>

            ${message ? `
            <h3 style="color:#066C6C;font-size:16px;margin:0 0 12px;">💬 Message complémentaire</h3>
            <div style="background:#f9fafb;border-radius:8px;padding:16px;color:#111827;white-space:pre-wrap;">${escapeHtml(message)}</div>
            ` : ''}

            <div style="margin-top:24px;padding:16px;background:#e6f5f5;border-radius:8px;border-left:4px solid #066C6C;">
              <p style="margin:0;color:#066C6C;font-weight:600;">✅ Action recommandée</p>
              <p style="margin:6px 0 0;color:#374151;">Contacter ${escapeHtml(firstName)} dans les 24h pour planifier la présentation (1h–1h30).</p>
            </div>
          </div>
        </div>
      `,
  };
}

function makeProcessor(spec: FormSpec, build: (d: Record<string, string | string[]>) => LeadMail): FormProcessor {
  return async (input, send, checkToken) => {
    // Un robot qui remplit le champ piège reçoit un succès, sans aucun envoi.
    if (isHoneypotFilled(input)) return OK;
    const checked = validateForm(spec, input);
    if (!checked.ok) return { status: 400, body: { error: checked.error } };
    // Après la validation : un formulaire mal rempli ne consomme pas le jeton à usage unique.
    const refused = await refuseUnlessHuman(input, checkToken);
    if (refused) return refused;
    const { error } = await send(build(checked.data));
    if (error) throw new Error('send failed', { cause: error });
    return OK;
  };
}

export const processContact = makeProcessor(CONTACT_SPEC, buildContact);
export const processDemo = makeProcessor(DEMO_SPEC, buildDemo);
export const processTrial = makeProcessor(TRIAL_SPEC, buildTrial);

/** Enchaîne les contrôles de requête (origine, type, taille, JSON) puis le traitement du
    formulaire. Toute erreur d'envoi donne un 500 au message simple ; le détail va au journal. */
export async function handleFormRequest(
  req: Request,
  process: FormProcessor,
  send: SendLead,
  verifyHuman: VerifyHuman,
  sendErrorMessage: string,
  log: (...args: unknown[]) => void = console.error,
): Promise<FormResult> {
  if (!isSameOrigin(req.headers)) return { status: 403, body: { error: 'Requête refusée.' } };
  const parsed = await readJsonBody(req);
  if (!parsed.ok) return { status: parsed.status, body: { error: parsed.error } };
  // Derrière Cloudflare, l'adresse du visiteur est dans CF-Connecting-IP.
  const ip = req.headers.get('cf-connecting-ip');
  try {
    return await process(parsed.value, send, (token) => verifyHuman(token, ip));
  } catch (err) {
    log('[formulaire public]', err);
    return { status: 500, body: { error: sendErrorMessage } };
  }
}
