'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const initialForm = { firstName: '', lastName: '', whatsapp: '', email: '', jobTitle: '', company: '', consent: false };

/* Formulaire de la démo gratuite : envoyé à /api/demo-gratuit-targetym */
export default function DemoForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const bind = (field: Exclude<keyof typeof initialForm, 'consent'>) => ({
    value: form[field],
    onChange: (e: { target: { value: string } }) => setForm((prev) => ({ ...prev, [field]: e.target.value })),
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      setError('Veuillez accepter la politique de confidentialité pour continuer.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/demo-gratuit-targetym', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Erreur inconnue');
      }
      router.push('/demo-gratuit-targetym/confirmation');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Vos coordonnées</h2>
      <p>Les champs marqués d&apos;un astérisque sont obligatoires.</p>
      <form onSubmit={handleSubmit}>
        <div className="f-grid">
          <div className="f-field"><label htmlFor="d-first">Prénom <small>*</small></label><input id="d-first" type="text" autoComplete="given-name" required {...bind('firstName')} /></div>
          <div className="f-field"><label htmlFor="d-last">Nom <small>*</small></label><input id="d-last" type="text" autoComplete="family-name" required {...bind('lastName')} /></div>
          <div className="f-field span2"><label htmlFor="d-wa">Téléphone WhatsApp <small>*</small></label><input id="d-wa" type="tel" autoComplete="tel" placeholder="+221 77 000 00 00" required {...bind('whatsapp')} /></div>
          <div className="f-field span2"><label htmlFor="d-mail">Email <small>*</small></label><input id="d-mail" type="email" autoComplete="email" placeholder="prenom@entreprise.com" required {...bind('email')} /></div>
          <div className="f-field"><label htmlFor="d-job">Profession <small>(facultatif)</small></label><input id="d-job" type="text" autoComplete="organization-title" {...bind('jobTitle')} /></div>
          <div className="f-field"><label htmlFor="d-org">Entreprise <small>(facultatif)</small></label><input id="d-org" type="text" autoComplete="organization" {...bind('company')} /></div>
        </div>

        <label className="f-consent">
          <input type="checkbox" checked={form.consent} onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))} />
          <span>J&apos;accepte que mes données soient utilisées pour me recontacter dans le cadre de ma demande de démo Targetym AI. Conformément au RGPD, vous pouvez exercer vos droits à tout moment en écrivant à <a href="mailto:sales@agiltym.com">sales@agiltym.com</a>. *</span>
        </label>

        {error && <p className="f-error" role="alert">{error}</p>}

        <button className="btn btn-mint" type="submit" disabled={loading}>
          {loading ? <><span className="spin" aria-hidden="true"></span>Envoi en cours…</> : <>Demander ma démo gratuite <span aria-hidden="true">→</span></>}
        </button>
        <p className="f-note">Notre équipe vous recontacte rapidement.</p>
      </form>
    </div>
  );
}
