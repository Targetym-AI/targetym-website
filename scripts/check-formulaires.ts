/**
 * Formulaires publics (TAR-41) : validation serveur, bornes de la requête, contrôle de
 * l'origine, champ piège, preuve anti-robot et erreur d'envoi. Faux envoi qui compte ses
 * appels et faux vérificateur Turnstile : aucun e-mail n'est envoyé, ni Resend ni
 * Cloudflare ne sont appelés.
 */
import assert from 'node:assert/strict';
import {
  handleFormRequest,
  processContact,
  processDemo,
  processTrial,
  type FormProcessor,
  type SendLead,
} from '../lib/site/leadForms';
import { MAX_BODY_BYTES } from '../lib/site/formValidation';
import { makeTurnstileVerifier, turnstileSecret, type HumanCheck, type VerifyHuman } from '../lib/site/turnstile';
import { TURNSTILE_FIELD, TURNSTILE_TEST_SECRET_KEY } from '../lib/site/turnstileKeys';

let total = 0;
let echecs = 0;
async function verifier(libelle: string, fn: () => Promise<void>): Promise<void> {
  total += 1;
  try {
    await fn();
    console.log(`✓ ${libelle}`);
  } catch (e) {
    echecs += 1;
    console.error(`✗ ${libelle}\n    ${(e as Error).message.split('\n')[0]}`);
  }
}

const HOTE = 'www.targetym.ai';
type Corps = Record<string, unknown>;

// Formes exactes envoyées par les formulaires clients
const JETON = 'jeton-turnstile-test';
const CONTACT: Corps = {
  name: 'Awa Diop', email: 'awa@exemple.sn', company: 'Exemple SA', phone: '+221 77 000 00 00',
  subject: 'demo', message: 'Bonjour,\nje souhaite une démo.', info_supp: '', [TURNSTILE_FIELD]: JETON,
};
const DEMO: Corps = {
  firstName: 'Awa', lastName: 'Diop', whatsapp: '+221 77 000 00 00', email: 'awa@exemple.sn',
  jobTitle: '', company: '', info_supp: '', consent: true, [TURNSTILE_FIELD]: JETON,
};
const ESSAI: Corps = {
  firstName: 'Awa', lastName: 'Diop', email: 'awa@exemple.sn', phone: '+221 77 000 00 00',
  jobTitle: 'DRH', company: 'Exemple SA', sector: 'Banque', companySize: '51 – 100 employés',
  country: "Côte d'Ivoire", city: 'Abidjan', currentTools: 'Excel, Sage',
  mainChallenges: ['Gestion de la paie', 'Recrutement difficile'], mainObjectives: ['Reporting RH & tableau de bord'],
  howDidYouHear: 'LinkedIn', message: '', info_supp: '', consent: true, [TURNSTILE_FIELD]: JETON,
};

const FORMULAIRES: { nom: string; process: FormProcessor; valide: Corps }[] = [
  { nom: 'contact', process: processContact, valide: CONTACT },
  { nom: 'démo', process: processDemo, valide: DEMO },
  { nom: 'essai gratuit', process: processTrial, valide: ESSAI },
];

function fauxEnvoi(sortie: { error?: unknown } = {}) {
  const appels: Parameters<SendLead>[0][] = [];
  const send: SendLead = async (mail) => { appels.push(mail); return sortie; };
  return { appels, send };
}

function requete(corps: unknown, entetes: Record<string, string> = {}, brut = false): Request {
  const h: Record<string, string> = {
    'content-type': 'application/json', host: HOTE, origin: `https://${HOTE}`, ...entetes,
  };
  for (const k of Object.keys(h)) if (h[k] === '') delete h[k];
  return new Request(`https://${HOTE}/api/x`, {
    method: 'POST', headers: h, body: brut ? (corps as string) : JSON.stringify(corps),
  });
}

function fauxVerificateur(reponse: HumanCheck = 'ok') {
  const verifications: { token: string; ip: string | null }[] = [];
  const verify: VerifyHuman = async (token, ip) => { verifications.push({ token, ip }); return reponse; };
  return { verifications, verify };
}

async function appel(process: FormProcessor, req: Request, sortie: { error?: unknown } = {}, humain: HumanCheck = 'ok') {
  const { appels, send } = fauxEnvoi(sortie);
  const { verifications, verify } = fauxVerificateur(humain);
  const res = await handleFormRequest(req, process, send, verify, 'Erreur lors de l\'envoi.', () => undefined);
  return { res, appels, verifications };
}

async function refus(process: FormProcessor, req: Request, statut: number) {
  const { res, appels } = await appel(process, req);
  assert.equal(res.status, statut);
  assert.equal(appels.length, 0, 'aucun envoi attendu');
  assert.ok('error' in res.body && typeof res.body.error === 'string' && res.body.error.length > 0);
  return res;
}

const avec = (base: Corps, patch: Corps): Corps => ({ ...base, ...patch });
const sans = (base: Corps, cle: string): Corps => { const c = { ...base }; delete c[cle]; return c; };

async function main() {
  for (const f of FORMULAIRES) {
    await verifier(`${f.nom} : envoi valide → un seul envoi, succès`, async () => {
      const { res, appels } = await appel(f.process, requete(f.valide));
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { success: true });
      assert.equal(appels.length, 1);
      assert.equal(appels[0].replyTo, 'awa@exemple.sn');
    });

    await verifier(`${f.nom} : champ piège rempli → succès, zéro envoi`, async () => {
      const { res, appels } = await appel(f.process, requete(avec(f.valide, { info_supp: 'http://spam.example' })));
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { success: true });
      assert.equal(appels.length, 0);
    });
    await verifier(`${f.nom} : champ piège non textuel → succès, zéro envoi`, async () => {
      const { res, appels } = await appel(f.process, requete(avec(f.valide, { info_supp: { a: 1 } })));
      assert.equal(res.status, 200);
      assert.equal(appels.length, 0);
    });

    await verifier(`${f.nom} : e-mail invalide (dont \\r\\n) → 400, zéro envoi`, async () => {
      for (const email of ['', 'pas-un-email', 'a@b', 'a@@b.com', 'a b@c.com', 'a@b.com\r\nBcc: x@y.com', 'a\n@b.com', '@b.com', 'a@.com', 'a@b..com']) {
        await refus(f.process, requete(avec(f.valide, { email })), 400);
      }
    });
    await verifier(`${f.nom} : e-mail trop long → 400, zéro envoi`, async () => {
      await refus(f.process, requete(avec(f.valide, { email: `${'a'.repeat(250)}@b.com` })), 400);
    });
    await verifier(`${f.nom} : e-mail de type nombre/objet/tableau → 400, zéro envoi`, async () => {
      for (const email of [42, { a: 1 }, ['a@b.com'], true]) {
        await refus(f.process, requete(avec(f.valide, { email })), 400);
      }
    });
    await verifier(`${f.nom} : corps non-objet (tableau, nombre, null, chaîne) → 400, zéro envoi`, async () => {
      for (const corps of ['[]', '42', 'null', '"texte"']) {
        await refus(f.process, requete(corps, {}, true), 400);
      }
    });
    await verifier(`${f.nom} : JSON invalide ou vide → 400, zéro envoi`, async () => {
      await refus(f.process, requete('{pas du json', {}, true), 400);
      await refus(f.process, requete('', {}, true), 400);
    });
    await verifier(`${f.nom} : mauvais Content-Type → 415, zéro envoi`, async () => {
      await refus(f.process, requete(JSON.stringify(f.valide), { 'content-type': 'text/plain' }, true), 415);
      await refus(f.process, requete('a=b', { 'content-type': 'application/x-www-form-urlencoded' }, true), 415);
      await refus(f.process, requete(JSON.stringify(f.valide), { 'content-type': '' }, true), 415);
    });
    await verifier(`${f.nom} : Content-Type avec charset accepté`, async () => {
      const { res, appels } = await appel(f.process, requete(f.valide, { 'content-type': 'application/json; charset=utf-8' }));
      assert.equal(res.status, 200);
      assert.equal(appels.length, 1);
    });
    await verifier(`${f.nom} : corps trop gros → 413, zéro envoi`, async () => {
      const gros = JSON.stringify(avec(f.valide, { zzz: 'x'.repeat(MAX_BODY_BYTES + 10) }));
      await refus(f.process, requete(gros, {}, true), 413);
      // sans en-tête Content-Length fiable : la lecture elle-même est bornée
      const flux = new ReadableStream<Uint8Array>({
        start(c) { const bloc = new TextEncoder().encode('x'.repeat(8192)); for (let i = 0; i < 5; i++) c.enqueue(bloc); c.close(); },
      });
      const req = new Request(`https://${HOTE}/api/x`, {
        method: 'POST', headers: { 'content-type': 'application/json', host: HOTE, origin: `https://${HOTE}` },
        body: flux, duplex: 'half',
      } as RequestInit);
      await refus(f.process, req, 413);
    });
    await verifier(`${f.nom} : champs inconnus ignorés, jamais repris dans l'e-mail`, async () => {
      const { res, appels } = await appel(f.process, requete(avec(f.valide, { inconnu: 'PIEGE-INCONNU', __proto__: { x: 1 } })));
      assert.equal(res.status, 200);
      assert.ok(!appels[0].html.includes('PIEGE-INCONNU'));
    });

    await verifier(`${f.nom} : origine absente → 403`, async () => {
      await refus(f.process, requete(f.valide, { origin: '' }), 403);
    });
    await verifier(`${f.nom} : origine d'un autre site → 403`, async () => {
      await refus(f.process, requete(f.valide, { origin: 'https://evil.example' }), 403);
      await refus(f.process, requete(f.valide, { origin: `https://${HOTE}.evil.example` }), 403);
      await refus(f.process, requete(f.valide, { origin: 'null' }), 403);
    });
    await verifier(`${f.nom} : origine du domaine public du site → succès, même si le proxy présente un autre hôte`, async () => {
      for (const origin of ['https://www.targetym.ai', 'https://targetym.ai']) {
        const { res, appels } = await appel(f.process, requete(f.valide, { host: 'interne.local:8080', origin }));
        assert.equal(res.status, 200, origin);
        assert.equal(appels.length, 1);
      }
      await refus(f.process, requete(f.valide, { host: 'interne.local:8080', origin: 'https://www.targetym.ai.evil.example' }), 403);
    });
    await verifier(`${f.nom} : origine du même hôte → succès`, async () => {
      const { res, appels } = await appel(f.process, requete(f.valide));
      assert.equal(res.status, 200);
      assert.equal(appels.length, 1);
    });
    await verifier(`${f.nom} : Referer seul du même hôte → succès ; Referer d'un autre site → 403`, async () => {
      const { res, appels } = await appel(f.process, requete(f.valide, { origin: '', referer: `https://${HOTE}/contact` }));
      assert.equal(res.status, 200);
      assert.equal(appels.length, 1);
      await refus(f.process, requete(f.valide, { origin: '', referer: 'https://evil.example/contact' }), 403);
    });
    await verifier(`${f.nom} : hôte vu par x-forwarded-host (derrière un proxy)`, async () => {
      const proxy = { host: 'interne.local:8080', 'x-forwarded-host': 'apercu-targetym.vercel.app', origin: 'https://apercu-targetym.vercel.app' };
      const { res, appels } = await appel(f.process, requete(f.valide, proxy));
      assert.equal(res.status, 200);
      assert.equal(appels.length, 1);
      await refus(f.process, requete(f.valide, { ...proxy, origin: 'https://interne.local:8080' }), 403);
    });
    await verifier(`${f.nom} : local avec port`, async () => {
      const { res } = await appel(f.process, requete(f.valide, { host: 'localhost:3000', origin: 'http://localhost:3000' }));
      assert.equal(res.status, 200);
    });

    await verifier(`${f.nom} : erreur du service d'envoi → 500 simple, sans fuite`, async () => {
      for (const sortie of [{ error: { message: 'SECRET-RESEND-DETAIL', name: 'x' } }, null]) {
        const { appels, send } = fauxEnvoi();
        const envoi: SendLead = sortie ? async (m) => { appels.push(m); return sortie; } : async () => { throw new Error('SECRET-RESEND-DETAIL'); };
        const res = await handleFormRequest(requete(f.valide), f.process, envoi, fauxVerificateur().verify, "Erreur lors de l'envoi.", () => undefined);
        assert.equal(res.status, 500);
        assert.deepEqual(res.body, { error: "Erreur lors de l'envoi." });
        assert.ok(!JSON.stringify(res.body).includes('SECRET'));
        void send;
      }
    });

    await verifier(`${f.nom} : jeton anti-robot absent, vide, non textuel ou trop long → 400, ni vérification ni envoi`, async () => {
      for (const corps of [sans(f.valide, TURNSTILE_FIELD), avec(f.valide, { [TURNSTILE_FIELD]: '' }),
        avec(f.valide, { [TURNSTILE_FIELD]: 42 }), avec(f.valide, { [TURNSTILE_FIELD]: 'x'.repeat(2049) })]) {
        const { res, appels, verifications } = await appel(f.process, requete(corps));
        assert.equal(res.status, 400);
        assert.equal(appels.length, 0);
        assert.equal(verifications.length, 0);
      }
    });
    await verifier(`${f.nom} : jeton refusé par Cloudflare → 400, zéro envoi`, async () => {
      const { res, appels } = await appel(f.process, requete(f.valide), {}, 'refused');
      assert.equal(res.status, 400);
      assert.deepEqual(res.body, { error: 'Vérification anti-robot échouée. Réessayez.' });
      assert.equal(appels.length, 0);
    });
    await verifier(`${f.nom} : Cloudflare indisponible → 503, zéro envoi`, async () => {
      const { res, appels } = await appel(f.process, requete(f.valide), {}, 'unavailable');
      assert.equal(res.status, 503);
      assert.equal(appels.length, 0);
    });
    await verifier(`${f.nom} : jeton vérifié une fois, avec l'adresse vue par Cloudflare`, async () => {
      const { res, verifications } = await appel(f.process, requete(f.valide, { 'cf-connecting-ip': '41.82.1.2' }));
      assert.equal(res.status, 200);
      assert.deepEqual(verifications, [{ token: JETON, ip: '41.82.1.2' }]);
    });
    await verifier(`${f.nom} : formulaire invalide ou champ piège → jeton non consommé`, async () => {
      const invalide = await appel(f.process, requete(avec(f.valide, { email: 'nul' })));
      assert.equal(invalide.res.status, 400);
      assert.equal(invalide.verifications.length, 0);
      const piege = await appel(f.process, requete(avec(f.valide, { info_supp: 'spam' })));
      assert.equal(piege.res.status, 200);
      assert.equal(piege.verifications.length, 0);
    });
  }

  // Vérificateur Cloudflare, avec un faux fetch
  const fauxFetch = (reponse: () => Promise<Response>) => {
    const requetes: { url: string; corps: string }[] = [];
    const f = (async (url: string | URL | Request, init?: RequestInit) => {
      requetes.push({ url: String(url), corps: String(init?.body) });
      return reponse();
    }) as typeof fetch;
    return { requetes, f };
  };
  const json = (corps: unknown, status = 200) => async () => new Response(JSON.stringify(corps), { status });
  await verifier('Cloudflare : success true → ok, avec la clé, le jeton et l\'adresse', async () => {
    const { requetes, f } = fauxFetch(json({ success: true }));
    assert.equal(await makeTurnstileVerifier('cle-secrete', f, () => undefined)('jeton', '41.82.1.2'), 'ok');
    assert.equal(requetes[0].url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
    const corps = new URLSearchParams(requetes[0].corps);
    assert.equal(corps.get('secret'), 'cle-secrete');
    assert.equal(corps.get('response'), 'jeton');
    assert.equal(corps.get('remoteip'), '41.82.1.2');
  });
  await verifier('Cloudflare : success false ou absent → refused', async () => {
    for (const corps of [{ success: false, 'error-codes': ['invalid-input-response'] }, {}, { success: 'true' }]) {
      assert.equal(await makeTurnstileVerifier('cle', fauxFetch(json(corps)).f, () => undefined)('jeton', null), 'refused');
    }
  });
  await verifier('Cloudflare : erreur HTTP, réseau ou réponse illisible → unavailable', async () => {
    const cas = [json({ success: true }, 500), async () => { throw new Error('réseau'); }, async () => new Response('pas du json')];
    for (const reponse of cas) {
      assert.equal(await makeTurnstileVerifier('cle', fauxFetch(reponse).f, () => undefined)('jeton', null), 'unavailable');
    }
  });
  await verifier('Cloudflare : clé secrète absente → unavailable, sans appel', async () => {
    const { requetes, f } = fauxFetch(json({ success: true }));
    assert.equal(await makeTurnstileVerifier(null, f, () => undefined)('jeton', null), 'unavailable');
    assert.equal(requetes.length, 0);
  });
  await verifier('clé secrète : celle de l\'environnement, sinon la clé de test hors production, jamais en production', async () => {
    assert.equal(turnstileSecret({ TURNSTILE_SECRET_KEY: 'vraie', VERCEL_ENV: 'production' }), 'vraie');
    assert.equal(turnstileSecret({ VERCEL_ENV: 'production' }), null);
    assert.equal(turnstileSecret({ VERCEL_ENV: 'preview' }), TURNSTILE_TEST_SECRET_KEY);
    assert.equal(turnstileSecret({}), TURNSTILE_TEST_SECRET_KEY);
  });

  // Champs propres à chaque formulaire
  const requis: Record<string, string[]> = {
    contact: ['name', 'email', 'subject', 'message'],
    'démo': ['firstName', 'lastName', 'whatsapp', 'email'],
    'essai gratuit': ['firstName', 'lastName', 'email', 'phone', 'company', 'jobTitle'],
  };
  const longueurs: Record<string, [string, number][]> = {
    contact: [['name', 150], ['company', 150], ['phone', 40], ['message', 5000]],
    'démo': [['firstName', 100], ['lastName', 100], ['jobTitle', 150], ['company', 150]],
    'essai gratuit': [['firstName', 100], ['jobTitle', 150], ['company', 150], ['sector', 150], ['city', 100], ['currentTools', 300], ['message', 5000]],
  };
  for (const f of FORMULAIRES) {
    await verifier(`${f.nom} : champ requis manquant, vide ou fait d'espaces → 400, zéro envoi`, async () => {
      for (const champ of requis[f.nom]) {
        await refus(f.process, requete(sans(f.valide, champ)), 400);
        await refus(f.process, requete(avec(f.valide, { [champ]: '' })), 400);
        await refus(f.process, requete(avec(f.valide, { [champ]: '   ' })), 400);
      }
    });
    await verifier(`${f.nom} : champ d'un mauvais type (nombre, objet, tableau) → 400, zéro envoi`, async () => {
      for (const champ of Object.keys(f.valide).filter((c) => c !== 'info_supp' && c !== 'consent' && !Array.isArray(f.valide[c]))) {
        for (const valeur of [42, { a: 1 }, ['x']]) {
          await refus(f.process, requete(avec(f.valide, { [champ]: valeur })), 400);
        }
      }
    });
    await verifier(`${f.nom} : champ trop long → 400, zéro envoi ; à la limite → accepté`, async () => {
      for (const [champ, max] of longueurs[f.nom]) {
        const car = champ === 'phone' ? '7' : 'a';
        const res = await refus(f.process, requete(avec(f.valide, { [champ]: car.repeat(max + 1) })), 400);
        assert.ok('error' in res.body && res.body.error.includes('trop long'));
        const ok = await appel(f.process, requete(avec(f.valide, { [champ]: car.repeat(max) })));
        assert.equal(ok.res.status, 200, `${champ} à ${max}`);
        assert.equal(ok.appels.length, 1);
      }
    });
    await verifier(`${f.nom} : retour à la ligne dans un champ d'une ligne → 400, zéro envoi`, async () => {
      await refus(f.process, requete(avec(f.valide, { [requis[f.nom][0]]: 'Awa\r\nBcc: x@y.com' })), 400);
    });
    await verifier(`${f.nom} : téléphone invalide → 400 ; formats usuels acceptés`, async () => {
      const champ = f.nom === 'contact' ? 'phone' : f.nom === 'démo' ? 'whatsapp' : 'phone';
      for (const tel of ['abc', '+221 77\r\n000 00 00', '12', '<script>']) {
        await refus(f.process, requete(avec(f.valide, { [champ]: tel })), 400);
      }
      for (const tel of ['+221 77 000 00 00', '(0033) 6.12.34.56.78', '+33-6-12-34-56-78', '771234567', '77 123 45 67 / 76 987 65 43', '77 123 45 67 (WhatsApp)']) {
        const { res } = await appel(f.process, requete(avec(f.valide, { [champ]: tel })));
        assert.equal(res.status, 200, tel);
      }
    });
  }

  // Contact : liste fermée des sujets
  await verifier('contact : les cinq sujets connus passent', async () => {
    for (const subject of ['demo', 'pricing', 'support', 'partnership', 'other']) {
      const { res, appels } = await appel(processContact, requete(avec(CONTACT, { subject })));
      assert.equal(res.status, 200, subject);
      assert.equal(appels.length, 1);
    }
  });
  await verifier('contact : sujet inconnu → 400, zéro envoi', async () => {
    for (const subject of ['inconnu', 'DEMO', 'demo\r\nBcc: x@y.com', '__proto__', 'constructor']) {
      await refus(processContact, requete(avec(CONTACT, { subject })), 400);
    }
  });
  await verifier('contact : téléphone et entreprise facultatifs', async () => {
    const { res, appels } = await appel(processContact, requete(sans(sans(CONTACT, 'phone'), 'company')));
    assert.equal(res.status, 200);
    assert.equal(appels.length, 1);
  });

  // Essai gratuit : sélections multiples
  await verifier('essai gratuit : tableau trop grand → 400, zéro envoi', async () => {
    const trop = Array.from({ length: 21 }, (_, i) => `choix ${i}`);
    await refus(processTrial, requete(avec(ESSAI, { mainChallenges: trop })), 400);
    await refus(processTrial, requete(avec(ESSAI, { mainObjectives: trop })), 400);
  });
  await verifier('essai gratuit : tableau à 20 éléments → accepté', async () => {
    const vingt = Array.from({ length: 20 }, (_, i) => `choix ${i}`);
    const { res } = await appel(processTrial, requete(avec(ESSAI, { mainChallenges: vingt })));
    assert.equal(res.status, 200);
  });
  await verifier('essai gratuit : élément de tableau trop long, non textuel ou chaîne à la place du tableau → 400', async () => {
    await refus(processTrial, requete(avec(ESSAI, { mainChallenges: ['a'.repeat(151)] })), 400);
    await refus(processTrial, requete(avec(ESSAI, { mainChallenges: [42] })), 400);
    await refus(processTrial, requete(avec(ESSAI, { mainChallenges: [{ a: 1 }] })), 400);
    await refus(processTrial, requete(avec(ESSAI, { mainObjectives: 'texte' })), 400);
    await refus(processTrial, requete(avec(ESSAI, { mainObjectives: { 0: 'a' } })), 400);
  });
  await verifier('essai gratuit : sélections absentes ou vides → accepté', async () => {
    const a = await appel(processTrial, requete(sans(sans(ESSAI, 'mainChallenges'), 'mainObjectives')));
    assert.equal(a.res.status, 200);
    const b = await appel(processTrial, requete(avec(ESSAI, { mainChallenges: [], mainObjectives: [] })));
    assert.equal(b.res.status, 200);
  });
  await verifier('essai gratuit : les sélections figurent dans l\'e-mail', async () => {
    const { appels } = await appel(processTrial, requete(ESSAI));
    assert.ok(appels[0].html.includes('Gestion de la paie, Recrutement difficile'));
    assert.equal(appels[0].subject, '[Essai Gratuit] Awa Diop — Exemple SA');
  });
  await verifier('contenu HTML toujours échappé dans l\'e-mail', async () => {
    const { appels } = await appel(processContact, requete(avec(CONTACT, { message: '<img src=x onerror=alert(1)>' })));
    assert.ok(!appels[0].html.includes('<img'));
    assert.ok(appels[0].html.includes('&lt;img'));
  });
  await verifier('messages d\'erreur en français, sans détail technique', async () => {
    const res = await refus(processContact, requete(avec(CONTACT, { email: 'nul' })), 400);
    assert.deepEqual(res.body, { error: 'Adresse e-mail invalide.' });
  });

  console.log(echecs === 0 ? `\n${total} contrôles passent.` : `\n${echecs} contrôle(s) en échec sur ${total}.`);
  process.exit(echecs === 0 ? 0 : 1);
}

main();
