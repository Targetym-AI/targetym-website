'use client';

import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'sending' | 'done' | 'error';

/* Formulaire de contact : envoyé à /api/contact (e-mail à l'équipe commerciale).
   Les champs du prototype sont renommés pour l'API : org → company, tel → phone. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const field = (k: string) => String(data.get(k) ?? '').trim();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: field('name'),
          email: field('email'),
          company: field('org'),
          phone: field('tel'),
          subject: field('subject'),
          message: field('message'),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Erreur lors de l\'envoi du message.');
      }
      setStatus('done');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'envoi. Veuillez réessayer.');
      setStatus('error');
    }
  };

  return (
    <div className="form-card">
      <h2>Envoyez-nous un message</h2>
      <p>Un membre de l&apos;équipe vous répond sous 24&nbsp;h ouvrées.</p>
      <form action="/api/contact" method="post" onSubmit={submit} hidden={status === 'done'}>
        <div className="f-grid">
          <div className="f-field"><label htmlFor="c-name">Nom complet <small>*</small></label><input id="c-name" name="name" type="text" autoComplete="name" required /></div>
          <div className="f-field"><label htmlFor="c-mail">Email <small>*</small></label><input id="c-mail" name="email" type="email" autoComplete="email" required /></div>
          <div className="f-field"><label htmlFor="c-org">Entreprise</label><input id="c-org" name="org" type="text" autoComplete="organization" /></div>
          <div className="f-field"><label htmlFor="c-tel">Téléphone</label><input id="c-tel" name="tel" type="tel" autoComplete="tel" /></div>
          <div className="f-field span2"><label htmlFor="c-subject">Sujet <small>*</small></label> <select id="c-subject" name="subject" required defaultValue="">
              <option value="">Sélectionnez un sujet</option>
              <option value="demo">Demande de démo</option>
              <option value="pricing">Devis et tarification</option>
              <option value="support">Support technique</option>
              <option value="partnership">Partenariat</option>
              <option value="other">Autre</option>
            </select></div>
          <div className="f-field span2"><label htmlFor="c-msg">Message <small>*</small></label><textarea id="c-msg" name="message" placeholder="Comment pouvons-nous vous aider&nbsp;?" required></textarea></div>
        </div>
        <button className="btn btn-mint" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}</button>
        {status === 'error' && <p className="f-note" role="alert">{error}</p>}
      </form>
      <div className="f-done" hidden={status !== 'done'} role="status">
        <span className="c-ico"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></svg></span>
        <div>
          <b>Message envoyé</b>
          <p>Merci&nbsp;! Un membre de l&apos;équipe vous répond sous 24&nbsp;h ouvrées.</p>
        </div>
      </div>
    </div>
  );
}
