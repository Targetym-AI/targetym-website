'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Phone,
  Gift,
  Rocket,
  Send,
  Loader2,
  Star,
  Bot,
  BarChart3,
  Clock,
} from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Phone,
    title: 'Demandez une présentation',
    duration: '1h – 1h30',
    description:
      'Remplissez le formulaire ci-dessous. Notre équipe vous contacte pour planifier une présentation personnalisée de la plateforme, adaptée à votre secteur et à vos défis RH.',
    color: 'from-primary-500 to-primary-600',
    bgLight: 'bg-primary-50',
    textColor: 'text-primary-600',
    borderColor: 'border-primary-200',
  },
  {
    number: '02',
    icon: Gift,
    title: 'Demandez l\'essai gratuit',
    duration: '14 jours gratuits',
    description:
      'Accédez immédiatement à toutes les fonctionnalités de la plateforme. Profitez de 14 jours d\'essai complet, sans carte bancaire et sans engagement.',
    color: 'from-secondary-500 to-secondary-600',
    bgLight: 'bg-secondary-50',
    textColor: 'text-secondary-600',
    borderColor: 'border-secondary-200',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Démarrez et intégrez vos données',
    duration: 'Et c\'est parti !',
    description:
      'Notre équipe vous accompagne pas à pas pour intégrer vos données RH existantes. En quelques heures, Targetym AI est opérationnel et vos équipes peuvent commencer à l\'utiliser.',
    color: 'from-indigo-500 to-indigo-600',
    bgLight: 'bg-indigo-50',
    textColor: 'text-indigo-600',
    borderColor: 'border-indigo-200',
  },
];

const sectors = [
  'Finance & Assurance', 'Banque', 'Commerce & Distribution', 'Industrie & Manufacturing',
  'Santé & Pharmaceutique', 'Télécommunications', 'Mines & Énergie', 'BTP & Immobilier',
  'Agroalimentaire', 'Transport & Logistique', 'Services & Consulting', 'ONG & Secteur public',
  'Enseignement & Formation', 'Technologie & Startups', 'Autre',
];

const companySizes = [
  '1 – 10 employés', '11 – 50 employés', '51 – 100 employés',
  '101 – 250 employés', '251 – 500 employés', '501 – 1 000 employés', 'Plus de 1 000 employés',
];

const countries = [
  'Sénégal', 'Côte d\'Ivoire', 'Cameroun', 'Mali', 'Burkina Faso', 'Guinée',
  'Togo', 'Bénin', 'Niger', 'Gabon', 'Congo', 'RDC', 'Madagascar',
  'Maroc', 'Tunisie', 'Algérie', 'France', 'Autre',
];

const challenges = [
  'Gestion administrative chronophage',
  'Suivi des congés et absences',
  'Recrutement difficile',
  'Évaluations de performance',
  'Gestion de la paie',
  'Formation et montée en compétences',
  'Conformité légale',
  'Reporting RH & tableau de bord',
];

const objectives = [
  'Automatiser les tâches répétitives',
  'Améliorer l\'expérience employé',
  'Réduire les coûts RH',
  'Centraliser les données RH',
  'Mieux piloter la performance',
  'Digitaliser les processus RH',
  'Gagner du temps sur les recrutements',
  'Améliorer la conformité légale',
];

const sources = [
  'Réseaux sociaux (LinkedIn, Facebook…)',
  'Recommandation d\'un collègue / partenaire',
  'Google / moteur de recherche',
  'Événement ou conférence',
  'Publicité en ligne',
  'Article de blog ou presse',
  'Autre',
];

export default function EssaiGratuitPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', jobTitle: '',
    company: '', sector: '', companySize: '', country: '', city: '',
    currentTools: '',
    mainChallenges: [] as string[],
    mainObjectives: [] as string[],
    howDidYouHear: '',
    message: '',
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleArray = (field: 'mainChallenges' | 'mainObjectives', value: string) => {
    setForm((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center px-4 py-24">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Demande envoyée !</h2>
          <p className="text-lg text-gray-600 mb-2">
            Merci <strong>{form.firstName}</strong> ! Notre équipe vous contactera dans les <strong>24 heures</strong> pour planifier votre présentation.
          </p>
          <p className="text-gray-500 mb-8">
            Vérifiez votre boîte mail <span className="font-medium text-primary-600">{form.email}</span>.
          </p>
          <div className="bg-white border border-primary-100 rounded-2xl p-6 text-left mb-8">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Rappel des étapes</p>
            {steps.map((s) => (
              <div key={s.number} className="flex items-center gap-3 mb-3 last:mb-0">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0`}>
                  <s.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-700">{s.title}</span>
              </div>
            ))}
          </div>
          <Link href="/" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
            Retour à l&apos;accueil <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress indicator */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-3">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                currentStep === 1 ? 'bg-primary-500 text-white' : 'bg-primary-100 text-primary-600'
              }`}>
                {currentStep === 2 ? <CheckCircle className="w-4 h-4" /> : '1'}
              </div>
              <span className={`text-sm font-medium hidden sm:inline ${currentStep === 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                Découvrir la plateforme
              </span>
            </div>
            {/* Connector */}
            <div className={`h-0.5 w-12 sm:w-24 rounded transition-all ${currentStep === 2 ? 'bg-primary-400' : 'bg-gray-200'}`} />
            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                currentStep === 2 ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                2
              </div>
              <span className={`text-sm font-medium hidden sm:inline ${currentStep === 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                Votre demande
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────── ÉTAPE 1 ─────────────────────────── */}
      {currentStep === 1 && (
        <>
          {/* Hero */}
          <section className="bg-gradient-to-b from-primary-50 to-white pt-16 pb-12">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                Essai gratuit · 30 jours · Aucun abonnement
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                Démarrez votre essai gratuit<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                  de 30 jours en 3 étapes !
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Profitez de la puissance de Targetym AI — jusqu&apos;à 30 agents IA RH — sans engagement. Remplissez le formulaire et notre équipe vous guide à chaque étape.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-secondary-500" /> Accès complet à toutes les fonctionnalités</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-secondary-500" /> Accompagnement personnalisé</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-secondary-500" /> Données sécurisées</span>
              </div>
            </div>
          </section>

          {/* Steps cards */}
          <section className="py-12 bg-white">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-3 gap-6">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`relative border-2 ${step.borderColor} ${step.bgLight} rounded-2xl p-6 flex flex-col`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`text-4xl font-black ${step.textColor} opacity-20 absolute top-4 right-6 leading-none`}>
                      {step.number}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className={`text-sm font-semibold ${step.textColor} mb-3`}>{step.duration}</p>
                    <p className="text-sm text-gray-600 flex-1">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Video */}
          <section className="py-10 bg-gray-50">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
                Découvrez Targetym AI en action
              </h2>
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/iucfJrrW1HI"
                  title="Targetym AI — Présentation"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </section>

          {/* Stats strip */}
          <section className="py-8 bg-white border-y border-gray-100">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                {[
                  { icon: Bot, stat: '+30', label: 'AGENTS IA INTÉGRÉS' },
                  { icon: Clock, stat: '50%', label: 'Du temps RH automatisé' },
                  { icon: BarChart3, stat: '360°', label: 'PILOTAGE 360 DEGRÉ' },
                ].map(({ icon: Icon, stat, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary-500" />
                    </div>
                    <p className="text-2xl font-black text-primary-500">{stat}</p>
                    <p className="text-sm text-gray-500 font-medium tracking-wide">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Suivant */}
          <section className="py-14 bg-gradient-to-b from-white to-primary-50">
            <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-gray-500 text-sm mb-6">
                Prêt à démarrer ? Remplissez le formulaire de demande — notre équipe vous contacte sous <strong>24h</strong>.
              </p>
              <button
                onClick={() => { setCurrentStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-lg font-semibold rounded-2xl hover:from-primary-600 hover:to-secondary-600 transition-all shadow-xl shadow-primary-500/25"
              >
                Prendre mon rendez-vous
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        </>
      )}

      {/* ─────────────────────────── ÉTAPE 2 ─────────────────────────── */}
      {currentStep === 2 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Prendre mon rendez-vous
              </h2>
              <p className="text-gray-500">
                Remplissez ce formulaire et notre équipe commerciale vous contactera sous 24h.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">

              {/* Identité */}
              <div>
                <h3 className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-4">Vos coordonnées</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Prénom *</label>
                    <input type="text" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom *</label>
                    <input type="text" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email professionnel *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm"
                      placeholder="prenom@entreprise.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone *</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm"
                      placeholder="+221 77 000 00 00" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Poste / Fonction *</label>
                    <input type="text" required value={form.jobTitle} onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm"
                      placeholder="DRH, Responsable RH, CEO, DAF…" />
                  </div>
                </div>
              </div>

              {/* Entreprise */}
              <div>
                <h3 className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-4">Votre entreprise</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom de l&apos;entreprise *</label>
                    <input type="text" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Secteur d&apos;activité</label>
                    <select value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm bg-white">
                      <option value="">Sélectionner…</option>
                      {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Taille de l&apos;entreprise</label>
                    <select value={form.companySize} onChange={(e) => setForm({ ...form, companySize: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm bg-white">
                      <option value="">Sélectionner…</option>
                      {companySizes.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Pays</label>
                    <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm bg-white">
                      <option value="">Sélectionner…</option>
                      {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ville</label>
                    <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm" />
                  </div>
                </div>
              </div>

              {/* Besoins */}
              <div>
                <h3 className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-4">Vos besoins RH</h3>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Outil(s) RH actuellement utilisé(s)</label>
                  <input type="text" value={form.currentTools} onChange={(e) => setForm({ ...form, currentTools: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm"
                    placeholder="Excel, Sage, SAP, Odoo, aucun…" />
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Vos principaux défis RH <small className="text-gray-400">(plusieurs choix possibles)</small></label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {challenges.map((c) => (
                      <label key={c} className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all text-sm ${
                        form.mainChallenges.includes(c)
                          ? 'border-primary-400 bg-primary-50 text-primary-700 font-medium'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}>
                        <input type="checkbox" className="sr-only" checked={form.mainChallenges.includes(c)} onChange={() => toggleArray('mainChallenges', c)} />
                        <span className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${form.mainChallenges.includes(c) ? 'border-primary-500 bg-primary-500' : 'border-gray-300'}`}>
                          {form.mainChallenges.includes(c) && <CheckCircle className="w-3 h-3 text-white" />}
                        </span>
                        {c}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Vos objectifs principaux avec Targetym AI <small className="text-gray-400">(plusieurs choix possibles)</small></label>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {objectives.map((o) => (
                      <label key={o} className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all text-sm ${
                        form.mainObjectives.includes(o)
                          ? 'border-secondary-400 bg-secondary-50 text-secondary-700 font-medium'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}>
                        <input type="checkbox" className="sr-only" checked={form.mainObjectives.includes(o)} onChange={() => toggleArray('mainObjectives', o)} />
                        <span className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${form.mainObjectives.includes(o) ? 'border-secondary-500 bg-secondary-500' : 'border-gray-300'}`}>
                          {form.mainObjectives.includes(o) && <CheckCircle className="w-3 h-3 text-white" />}
                        </span>
                        {o}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Comment avez-vous entendu parler de nous ?</label>
                  <select value={form.howDidYouHear} onChange={(e) => setForm({ ...form, howDidYouHear: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm bg-white">
                    <option value="">Sélectionner…</option>
                    {sources.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message complémentaire <span className="text-gray-400 font-normal">(facultatif)</span></label>
                <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent outline-none text-sm resize-none"
                  placeholder="Décrivez votre contexte, vos questions, vos contraintes particulières…" />
              </div>

              {/* Consent */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="flex-shrink-0 mt-0.5">
                    <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-400 cursor-pointer" />
                  </div>
                  <span className="text-sm text-gray-600">
                    J&apos;accepte que mes données soient utilisées pour me recontacter dans le cadre de ma demande d&apos;essai gratuit Targetym AI.
                    Conformément au RGPD, vous pouvez exercer vos droits à tout moment en écrivant à{' '}
                    <a href="mailto:sales@agiltym.com" className="text-primary-600 underline">sales@agiltym.com</a>. *
                  </span>
                </label>
              </div>

              {error && (
                <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours…
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Demander ma présentation gratuite
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                Notre équipe vous contactera sous <strong>24 heures</strong> pour planifier votre présentation.
              </p>
            </form>

            {/* Retour */}
            <div className="mt-6 text-center">
              <button
                onClick={() => { setCurrentStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Retour à la présentation
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
