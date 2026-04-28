'use client';

import { useState } from 'react';
import { CalendarDays, Clock, Mic, Users, Play, X, Loader2, CheckCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.targetym.ai';

interface Webinar {
  id: number;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  presenter_name: string | null;
  webinar_date: string | null;
  duration_minutes: number | null;
  replay_url: string | null;
  max_attendees: number | null;
  status: string;
  registrations_count: number;
}

interface RegistrationForm {
  first_name: string;
  last_name: string;
  email: string;
  company: string;
}

const EMPTY_FORM: RegistrationForm = { first_name: '', last_name: '', email: '', company: '' };

function formatDate(dateStr: string | null) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function formatTime(dateStr: string | null) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function RegistrationModal({ webinar, onClose }: { webinar: Webinar; onClose: () => void }) {
  const [form, setForm] = useState<RegistrationForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name.trim() || !form.last_name.trim() || !form.email.trim()) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/public/webinars/${webinar.id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          email: form.email.trim(),
          company: form.company.trim() || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Erreur lors de l'inscription");
      }
      setSuccess(true);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erreur lors de l'inscription";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">S&apos;inscrire au webinaire</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Inscription confirmée !</h3>
            <p className="text-gray-500 text-sm mb-1">
              Vous êtes inscrit(e) au webinaire <span className="font-medium">{webinar.title}</span>.
            </p>
            {webinar.webinar_date && (
              <p className="text-primary-600 font-medium text-sm mt-2">
                {formatDate(webinar.webinar_date)} à {formatTime(webinar.webinar_date)}
              </p>
            )}
            <button onClick={onClose} className="mt-6 px-6 py-2 bg-primary-600 text-white rounded-xl text-sm hover:bg-primary-700">
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Recap webinaire */}
            <div className="bg-primary-50 rounded-xl p-3 text-sm">
              <p className="font-medium text-primary-800 line-clamp-1">{webinar.title}</p>
              {webinar.webinar_date && (
                <p className="text-primary-600 text-xs mt-0.5">{formatDate(webinar.webinar_date)} · {formatTime(webinar.webinar_date)}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Prénom *</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-300"
                  value={form.first_name}
                  onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                  placeholder="Jean"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nom *</label>
                <input
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-300"
                  value={form.last_name}
                  onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
                  placeholder="Dupont"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-300"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="jean@entreprise.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Entreprise</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-300"
                value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                placeholder="Votre entreprise (optionnel)"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 disabled:opacity-60 transition-colors"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Confirmer mon inscription
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function WebinarsSection({ webinars }: { webinars: Webinar[] }) {
  const [registerFor, setRegisterFor] = useState<Webinar | null>(null);

  if (webinars.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-5">
          <CalendarDays className="w-8 h-8 text-primary-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-500 mb-2">Webinaires bientôt disponibles</h3>
        <p className="text-gray-400 text-sm">Nos prochains webinaires RH seront annoncés ici.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {webinars.map(w => {
          const isCompleted = w.status === 'completed';
          const isPublished = w.status === 'published';
          const isFull = w.max_attendees != null && w.registrations_count >= w.max_attendees;

          return (
            <div key={w.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col">
              {/* Cover */}
              <div className="relative aspect-video bg-gradient-to-br from-primary-50 to-indigo-50 overflow-hidden">
                {w.cover_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={w.cover_image_url} alt={w.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <CalendarDays className="w-12 h-12 text-primary-200" />
                  </div>
                )}
                {/* Badge statut */}
                <div className="absolute top-3 left-3">
                  {isCompleted ? (
                    <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                      <Play className="w-3 h-3" /> Replay disponible
                    </span>
                  ) : isFull ? (
                    <span className="px-2.5 py-1 bg-gray-600 text-white text-xs font-semibold rounded-full">Complet</span>
                  ) : (
                    <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">Inscription ouverte</span>
                  )}
                </div>
              </div>

              {/* Corps */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-base">{w.title}</h3>
                {w.description && (
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{w.description}</p>
                )}

                <div className="flex flex-col gap-1.5 text-xs text-gray-500 mt-auto mb-4">
                  {w.presenter_name && (
                    <span className="flex items-center gap-1.5"><Mic className="w-3.5 h-3.5 text-primary-400" />{w.presenter_name}</span>
                  )}
                  {w.webinar_date && (
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-primary-400" />
                      {formatDate(w.webinar_date)} · {formatTime(w.webinar_date)}
                    </span>
                  )}
                  {w.duration_minutes && (
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary-400" />{w.duration_minutes} minutes</span>
                  )}
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-primary-400" />{w.registrations_count} inscrits</span>
                </div>

                {/* CTA */}
                {isCompleted && w.replay_url ? (
                  <a
                    href={w.replay_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    <Play className="w-4 h-4" /> Regarder le replay
                  </a>
                ) : isPublished && !isFull ? (
                  <button
                    onClick={() => setRegisterFor(w)}
                    className="w-full px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                  >
                    Je m&apos;inscris — Gratuit
                  </button>
                ) : isFull ? (
                  <button disabled className="w-full px-4 py-2.5 bg-gray-200 text-gray-400 text-sm font-semibold rounded-xl cursor-not-allowed">
                    Complet
                  </button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {registerFor && (
        <RegistrationModal webinar={registerFor} onClose={() => setRegisterFor(null)} />
      )}
    </>
  );
}
