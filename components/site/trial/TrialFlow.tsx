'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckIco, LineIco } from '@/components/site/icons';
import { challenges, companySizes, countries, objectives, sectors, sources, steps } from './options';

type Step = 1 | 2;
type ListField = 'mainChallenges' | 'mainObjectives';

const VIDEO_ID = 'iucfJrrW1HI';

const initialForm = {
  firstName: '', lastName: '', email: '', phone: '', jobTitle: '',
  company: '', sector: '', companySize: '', country: '', city: '',
  currentTools: '',
  mainChallenges: [] as string[],
  mainObjectives: [] as string[],
  howDidYouHear: '',
  message: '',
  consent: false,
};

function Stepper({ current }: { current: Step }) {
  return (
    <ol className="stepper" aria-label="Étapes de la demande">
      <li className={current === 1 ? 'is-on' : 'is-done'} aria-current={current === 1 ? 'step' : undefined}><b>{current === 2 ? <CheckIco /> : '1'}</b><span>Découvrir la plateforme</span></li>
      <li className={current === 2 ? 'sep is-done' : 'sep'} aria-hidden="true"></li>
      <li className={current === 2 ? 'is-on' : ''} aria-current={current === 2 ? 'step' : undefined}><b>2</b><span>Votre demande</span></li>
    </ol>
  );
}

function Chips({ legend, name, options, values, onToggle }: { legend: string; name: ListField; options: string[]; values: string[]; onToggle: (field: ListField, value: string) => void }) {
  return (
    <fieldset className="f-set-inner">
      <legend className="f-lab">{legend} <small>(plusieurs choix possibles)</small></legend>
      <div className="f-chips">
        {options.map((option) => {
          const on = values.includes(option);
          return (
            <label key={option} className={on ? 'f-chip is-on' : 'f-chip'}>
              <input type="checkbox" name={name} value={option} checked={on} onChange={() => onToggle(name, option)} />
              <i aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></i>
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* Essai gratuit en deux temps : la présentation (étapes, vidéo, chiffres),
   puis le formulaire de qualification envoyé à /api/essai-gratuit */
export default function TrialFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState(initialForm);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  type TextField = Exclude<keyof typeof initialForm, ListField | 'consent'>;
  const bind = (field: TextField) => ({
    value: form[field],
    onChange: (e: { target: { value: string } }) => setForm((prev) => ({ ...prev, [field]: e.target.value })),
  });

  const go = (next: Step) => {
    setStep(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleArray = (field: ListField, value: string) => {
    setForm((prev) => {
      const arr = prev[field];
      return { ...prev, [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      setError('Veuillez accepter la politique de confidentialité pour continuer.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/essai-gratuit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Erreur inconnue');
      }
      router.push('/essai-gratuit/confirmation');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <>
        <section className="page-head split trial-head">
          <div>
            <Stepper current={1} />
            <p className="pill"><i aria-hidden="true"></i>Essai gratuit · 15 jours · Aucun abonnement</p>
            <h1>Démarrez votre essai gratuit <span>de 15 jours en 3 étapes&nbsp;!</span></h1>
            <p className="lead">Profitez de la puissance de Targetym AI — jusqu&apos;à 30 agents IA RH — sans engagement. Remplissez le formulaire et notre équipe vous guide à chaque étape.</p>
            <ul className="head-checks">
              <li><CheckIco />Accès complet à toutes les fonctionnalités</li>
              <li><CheckIco />Accompagnement personnalisé</li>
              <li><CheckIco />Données sécurisées</li>
            </ul>
            <div className="actions"><button className="btn btn-mint" type="button" onClick={() => go(2)}>Prendre mon rendez-vous <span aria-hidden="true">→</span></button> <Link className="btn btn-plain" href="/contact">Parler à un expert</Link></div>
          </div>
          <figure className={videoPlaying ? 'tv is-playing' : 'tv'} data-cut>
            <div className="tv-frame">
              {videoPlaying ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1`}
                  title="Targetym AI — Présentation"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <button type="button" className="tv-play" onClick={() => setVideoPlaying(true)} aria-label="Lire la vidéo de présentation Targetym AI">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`} alt="Targetym AI — Présentation" loading="lazy" />
                  <span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 4.5v15l12.5-7.5z" /></svg></span>
                </button>
              )}
            </div>
            <figcaption className="dock dock-tr"><span className="v-live"><i aria-hidden="true"></i>Découvrez Targetym AI en action</span></figcaption>
          </figure>
        </section>

        <section className="section sec-anim" aria-labelledby="steps-title">
          <h2 className="head-duo left" id="steps-title">Trois étapes <span>de la présentation au démarrage</span></h2>
          <ol className="uc-steps trial-steps">
            {steps.map((s, i) => (
              <li key={s.number} className={i === 1 ? 'uc-step is-module' : 'uc-step'}>
                <p className="uc-step-k"><LineIco name={s.icon} />{s.duration}<b>{s.number}</b></p>
                <h3>{s.title}</h3>
                <p className="trial-d">{s.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section sec-anim" aria-label="Targetym AI en chiffres">
          <div className="fig-band" data-cut>
            <span className="dock dock-tl fig-dock" aria-hidden="true"><span className="fig-tag">En chiffres</span></span>
            <ul className="fig-row is-3">
              <li><b>+30</b> <i>Agents IA intégrés</i></li>
              <li><b>50%</b> <i>Du temps RH automatisé</i></li>
              <li><b>360°</b> <i>Pilotage 360 degrés</i></li>
            </ul>
          </div>
        </section>

        <section className="section sec-anim" aria-labelledby="next-title">
          <div className="next-band">
            <div>
              <h2 id="next-title">Prêt à démarrer&nbsp;? <span>Remplissez le formulaire de demande</span></h2>
              <p>Notre équipe vous contacte sous <strong>24h</strong>.</p>
            </div>
            <button className="btn btn-mint" type="button" onClick={() => go(2)}>Prendre mon rendez-vous <span aria-hidden="true">→</span></button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-head">
        <Stepper current={2} />
        <h1>Prendre mon rendez-vous <span>réponse sous 24&nbsp;h</span></h1>
        <p className="lead">Remplissez ce formulaire et notre équipe commerciale vous contactera sous 24h.</p>
      </section>

      <section className="section" aria-label="Formulaire de demande">
        <div className="req">
          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <fieldset className="f-set">
                <legend className="f-legend">Vos coordonnées</legend>
                <div className="f-grid">
                  <div className="f-field"><label htmlFor="t-first">Prénom <small>*</small></label><input id="t-first" type="text" autoComplete="given-name" required {...bind('firstName')} /></div>
                  <div className="f-field"><label htmlFor="t-last">Nom <small>*</small></label><input id="t-last" type="text" autoComplete="family-name" required {...bind('lastName')} /></div>
                  <div className="f-field"><label htmlFor="t-mail">Email professionnel <small>*</small></label><input id="t-mail" type="email" autoComplete="email" placeholder="prenom@entreprise.com" required {...bind('email')} /></div>
                  <div className="f-field"><label htmlFor="t-tel">Téléphone <small>*</small></label><input id="t-tel" type="tel" autoComplete="tel" placeholder="+221 77 000 00 00" required {...bind('phone')} /></div>
                  <div className="f-field span2"><label htmlFor="t-job">Poste / Fonction <small>*</small></label><input id="t-job" type="text" autoComplete="organization-title" placeholder="DRH, Responsable RH, CEO, DAF…" required {...bind('jobTitle')} /></div>
                </div>
              </fieldset>

              <fieldset className="f-set">
                <legend className="f-legend">Votre entreprise</legend>
                <div className="f-grid">
                  <div className="f-field span2"><label htmlFor="t-org">Nom de l&apos;entreprise <small>*</small></label><input id="t-org" type="text" autoComplete="organization" required {...bind('company')} /></div>
                  <div className="f-field"><label htmlFor="t-sector">Secteur d&apos;activité</label><select id="t-sector" {...bind('sector')}><option value="">Sélectionner…</option>{sectors.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
                  <div className="f-field"><label htmlFor="t-size">Taille de l&apos;entreprise</label><select id="t-size" {...bind('companySize')}><option value="">Sélectionner…</option>{companySizes.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
                  <div className="f-field"><label htmlFor="t-country">Pays</label><select id="t-country" {...bind('country')}><option value="">Sélectionner…</option>{countries.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
                  <div className="f-field"><label htmlFor="t-city">Ville</label><input id="t-city" type="text" autoComplete="address-level2" {...bind('city')} /></div>
                </div>
              </fieldset>

              <fieldset className="f-set">
                <legend className="f-legend">Vos besoins RH</legend>
                <div className="f-stack">
                  <div className="f-field"><label htmlFor="t-tools">Outil(s) RH actuellement utilisé(s)</label><input id="t-tools" type="text" placeholder="Excel, Sage, SAP, Odoo, aucun…" {...bind('currentTools')} /></div>
                  <Chips legend="Vos principaux défis RH" name="mainChallenges" options={challenges} values={form.mainChallenges} onToggle={toggleArray} />
                  <Chips legend="Vos objectifs principaux avec Targetym AI" name="mainObjectives" options={objectives} values={form.mainObjectives} onToggle={toggleArray} />
                  <div className="f-field"><label htmlFor="t-source">Comment avez-vous entendu parler de nous&nbsp;?</label><select id="t-source" {...bind('howDidYouHear')}><option value="">Sélectionner…</option>{sources.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
                  <div className="f-field"><label htmlFor="t-msg">Message complémentaire <small>(facultatif)</small></label><textarea id="t-msg" placeholder="Décrivez votre contexte, vos questions, vos contraintes particulières…" {...bind('message')} /></div>
                </div>
              </fieldset>

              <label className="f-consent">
                <input type="checkbox" checked={form.consent} onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))} />
                <span>J&apos;accepte que mes données soient utilisées pour me recontacter dans le cadre de ma demande d&apos;essai gratuit Targetym AI. Conformément au RGPD, vous pouvez exercer vos droits à tout moment en écrivant à <a href="mailto:sales@agiltym.com">sales@agiltym.com</a>. *</span>
              </label>

              {error && <p className="f-error" role="alert">{error}</p>}

              <button className="btn btn-mint" type="submit" disabled={loading}>
                {loading ? <><span className="spin" aria-hidden="true"></span>Envoi en cours…</> : <>Demander ma présentation gratuite <span aria-hidden="true">→</span></>}
              </button>
              <p className="f-note">Notre équipe vous contactera sous <strong>24 heures</strong> pour planifier votre présentation.</p>
            </form>
          </div>

          <aside className="req-side">
            <div className="req-card">
              <p className="uc-kicker"><span className="live-dot" aria-hidden="true"></span>Après votre demande</p>
              <h2>La suite en 3 étapes</h2>
              <ol className="req-list">
                {steps.map((s) => (
                  <li key={s.number}><span><LineIco name={s.icon} /></span><div><b>{s.title}</b><i>{s.duration}</i></div></li>
                ))}
              </ol>
            </div>
            <button className="btn btn-plain req-back" type="button" onClick={() => go(1)}><span aria-hidden="true">←</span> Retour à la présentation</button>
            <p className="f-note">Une question&nbsp;? <Link href="/contact">Écrivez-nous</Link>.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
