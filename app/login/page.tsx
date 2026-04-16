'use client';

import { useState, useRef, Suspense, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, Loader2, Building2, Phone, CheckCircle, Clock, Users, Shield, ArrowLeft, ArrowRight, Brain } from 'lucide-react';
import { getAuthErrorMessage } from '@/lib/error-messages';

// URL de ton API Railway
const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.targetym.ai').replace(/^http:\/\//, 'https://');
const DASHBOARD_URL = 'https://dashboard.targetym.ai';

// Domaines emails personnels bloqués
const BLOCKED_EMAIL_DOMAINS = [
  'gmail.com', 'googlemail.com',
  'yahoo.com', 'yahoo.fr', 'yahoo.co.uk', 'ymail.com',
  'hotmail.com', 'hotmail.fr', 'hotmail.co.uk',
  'outlook.com', 'outlook.fr',
  'live.com', 'live.fr',
  'msn.com',
  'icloud.com', 'me.com', 'mac.com',
  'aol.com', 'aol.fr',
  'protonmail.com', 'proton.me',
  'mail.com', 'email.com',
  'gmx.com', 'gmx.fr',
  'zoho.com',
  'yandex.com', 'yandex.ru',
  'mail.ru',
  'orange.fr', 'wanadoo.fr', 'free.fr', 'sfr.fr', 'laposte.net',
];

function isPersonalEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? BLOCKED_EMAIL_DOMAINS.includes(domain) : false;
}

function LoginForm() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'register' ? 'register' : 'login';

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    jobTitle: ''
  });

  // 2FA state
  const [twoFactorStep, setTwoFactorStep] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [tempToken, setTempToken] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [verifying2FA, setVerifying2FA] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Setup 2FA (fetch QR code)
  const setup2FA = useCallback(async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/2fa/setup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setQrCode(data.qr_code_base64);
      } else {
        setError('Erreur lors de la configuration 2FA');
      }
    } catch (err) {
      setError(getAuthErrorMessage(err));
    }
  }, []);

  // Auto-setup when entering 2FA step with needs_setup
  useEffect(() => {
    if (twoFactorStep && needsSetup && tempToken && !qrCode) {
      setup2FA(tempToken);
    }
  }, [twoFactorStep, needsSetup, tempToken, qrCode, setup2FA]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...otpCode];
    newCode[index] = value;
    setOtpCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = [...otpCode];
    for (let i = 0; i < pasted.length; i++) {
      newCode[i] = pasted[i];
    }
    setOtpCode(newCode);
    if (pasted.length > 0) {
      const focusIndex = Math.min(pasted.length, 5);
      otpRefs.current[focusIndex]?.focus();
    }
  };

  const verify2FA = async () => {
    const code = otpCode.join('');
    if (code.length !== 6) {
      setError('Veuillez entrer les 6 chiffres');
      return;
    }

    setVerifying2FA(true);
    setError('');

    let responseStatus: number | undefined;

    try {
      const res = await fetch(`${API_URL}/api/auth/2fa/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tempToken}`,
        },
        body: JSON.stringify({ code }),
      });

      responseStatus = res.status;
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Code invalide');
      }

      // Rediriger vers le dashboard avec les vrais tokens
      const userEncoded = encodeURIComponent(JSON.stringify(data.user));
      window.location.href = `${DASHBOARD_URL}?token=${data.access_token}&refresh=${data.refresh_token}&user=${userEncoded}`;
    } catch (err) {
      setError(getAuthErrorMessage(err, responseStatus));
      setOtpCode(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    } finally {
      setVerifying2FA(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setEmailError('');

    // Validation email professionnel pour inscription
    if (activeTab === 'register' && isPersonalEmail(formData.email)) {
      setEmailError('Les emails personnels ne sont pas acceptés. Utilisez votre email professionnel.');
      setIsLoading(false);
      return;
    }

    let responseStatus: number | undefined;
    let registerDetail: string | undefined;

    try {
      if (activeTab === 'login') {
        // LOGIN
        const response = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        responseStatus = response.status;
        const data = await response.json();

        if (!response.ok) {
          const detail = typeof data.detail === 'string' ? data.detail : 'Erreur de connexion';
          // Rediriger vers pending-activation si compte en attente de validation
          if (response.status === 403 && detail.includes('en cours de validation')) {
            window.location.href = '/pending-activation';
            return;
          }
          throw new Error(detail);
        }

        // Vérifier si 2FA est requis
        if (data.requires_2fa) {
          setTempToken(data.temp_token);
          setNeedsSetup(data.needs_setup);
          setTwoFactorStep(true);
          return;
        }

        // Rediriger vers le dashboard avec les tokens dans l'URL
        const userEncoded = encodeURIComponent(JSON.stringify(data.user));
        window.location.href = `${DASHBOARD_URL}?token=${data.access_token}&refresh=${data.refresh_token}&user=${userEncoded}`;

      } else {
        // REGISTER TENANT (nouvelle entreprise)
        const response = await fetch(`${API_URL}/api/auth/register-tenant`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company_name: formData.company,
            email: formData.email,
            password: formData.password,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone || null,
            job_title: formData.jobTitle || null,
          }),
        });

        responseStatus = response.status;
        const data = await response.json();
        registerDetail = typeof data.detail === 'string' ? data.detail : undefined;

        if (!response.ok) {
          throw new Error(data.detail || "Erreur lors de l'inscription");
        }

        // Compte en attente de validation → page d'attente
        window.location.href = '/pending-activation';
      }
    } catch (err) {
      // Si c'est un 403 "en cours de validation", rediriger
      if (err instanceof Error && err.message.includes('en cours de validation')) {
        window.location.href = '/pending-activation';
        return;
      }

      if (activeTab === 'register') {
        if (responseStatus === 429) {
          setError('Trop de tentatives. Veuillez patienter quelques minutes avant de réessayer.');
        } else if (registerDetail?.includes('existe déjà')) {
          setError('Un compte existe déjà avec cet email. Essayez de vous connecter ou de réinitialiser votre mot de passe.');
        } else {
          setError(getAuthErrorMessage(err, responseStatus));
        }
      } else {
        setError(getAuthErrorMessage(err, responseStatus));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // RENDU PRINCIPAL — split layout (gauche + droite)
  // ============================================
  return (
    <div className="min-h-screen bg-white flex overflow-hidden">

      {/* ── Panneau gauche (branding) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12 xl:p-16">
        {/* Fond plein */}
        <div className="absolute inset-0 bg-primary-500" />

        {/* Contenu */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="mb-16 xl:mb-20">
            <Link href="/">
              <img
                src="/logo-targetym.png"
                alt="Targetym AI"
                className="h-16 xl:h-20 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Titre + features */}
          <div className="space-y-10">
            <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight">
              La plateforme RH intelligente pour votre entreprise
            </h2>

            <div className="space-y-8">
              {/* Feature 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white mb-1">Gestion RH Complète</h3>
                  <p className="text-white/80 leading-relaxed">
                    Gérez vos collaborateurs, absences, paie et performance en un seul endroit
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white mb-1">Agent IA Intégré</h3>
                  <p className="text-white/80 leading-relaxed">
                    Automatisez les tâches répétitives et obtenez des insights RH en temps réel
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white mb-1">Sécurité & Conformité</h3>
                  <p className="text-white/80 leading-relaxed">
                    Authentification 2FA, données chiffrées et hébergées en Europe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badge de confiance */}
        <div className="relative z-10 border-t border-white/20 pt-8">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <Shield className="w-5 h-5 flex-shrink-0" />
            <span>Données hébergées et sécurisées — Conformité RGPD</span>
          </div>
        </div>
      </div>

      {/* ── Panneau droit (formulaire) ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white">
        <div className="w-full max-w-lg">

          {/* Logo mobile */}
          <div className="lg:hidden mb-8">
            <Link href="/">
              <img src="/logo-targetym-dark.png" alt="Targetym AI" className="h-10 w-auto" />
            </Link>
          </div>

          {twoFactorStep ? (
            /* ── ÉCRAN 2FA ── */
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Vérification en deux étapes
                </h2>
                <p className="text-slate-600">
                  {needsSetup
                    ? "Configurez votre application d'authentification"
                    : "Entrez le code de votre application d'authentification"}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 sm:p-8">
                {/* Erreur */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* QR Code setup */}
                {needsSetup && (
                  <div className="mb-6">
                    <div className="bg-slate-50 rounded-xl p-4 mb-4">
                      <h3 className="text-sm font-semibold text-slate-900 mb-2">Instructions :</h3>
                      <ol className="text-sm text-slate-600 space-y-1.5 list-decimal list-inside">
                        <li>Ouvrez <strong>Google Authenticator</strong>, <strong>Authy</strong> ou une autre app TOTP</li>
                        <li>Scannez le QR code ci-dessous</li>
                        <li>Entrez le code à 6 chiffres affiché</li>
                      </ol>
                    </div>
                    <div className="flex justify-center p-4 bg-white border-2 border-slate-200 rounded-xl">
                      {qrCode ? (
                        <img src={qrCode} alt="QR Code 2FA" className="w-48 h-48" />
                      ) : (
                        <div className="w-48 h-48 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Saisie OTP */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-900 mb-3 text-center">
                    Code à 6 chiffres
                  </label>
                  <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
                    {otpCode.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { otpRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className="w-11 h-14 text-center text-xl font-bold bg-slate-50 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                        autoFocus={i === 0}
                      />
                    ))}
                  </div>
                </div>

                {/* Bouton vérifier */}
                <button
                  onClick={verify2FA}
                  disabled={verifying2FA || otpCode.join('').length !== 6}
                  className="w-full h-11 sm:h-12 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl"
                >
                  {verifying2FA ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Vérification...
                    </>
                  ) : (
                    <>
                      Vérifier
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Retour */}
                <button
                  onClick={() => {
                    setTwoFactorStep(false);
                    setTempToken('');
                    setQrCode('');
                    setOtpCode(['', '', '', '', '', '']);
                    setError('');
                  }}
                  className="w-full mt-4 py-2 text-sm text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour à la connexion
                </button>
              </div>
            </>
          ) : (
            /* ── FORMULAIRE LOGIN / REGISTER ── */
            <>
              {/* En-tête animé */}
              <div key={`header-${activeTab}`} className="mb-8 animate-form-enter">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                  {activeTab === 'login' ? 'Bienvenue !' : "Démarrer l'essai gratuit"}
                </h2>
                <p className="text-slate-600 text-base sm:text-lg">
                  {activeTab === 'login'
                    ? 'Accédez à votre espace RH'
                    : "90 jours d'accès complet à toutes les fonctionnalités"}
                </p>
              </div>

              <div key={`form-${activeTab}`} className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 animate-form-enter">

                {/* Onglets */}
                <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
                      activeTab === 'login'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Connexion
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
                      activeTab === 'register'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Essai gratuit
                  </button>
                </div>

                {/* Avantages essai */}
                {activeTab === 'register' && (
                  <div className="mb-6 p-4 bg-primary-50 rounded-xl border border-primary-100">
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      Essai gratuit - 90 jours
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        90 jours d&apos;accès complet aux fonctionnalités Premium
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        Jusqu&apos;à 100 collaborateurs
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        Frais d&apos;installation et de formation : 197 000 FCFA
                      </li>
                    </ul>
                  </div>
                )}

                {/* Erreur */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {activeTab === 'register' && (
                    <>
                      {/* Entreprise */}
                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold text-slate-900 mb-1.5">
                          Nom de l&apos;entreprise *
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                          <input
                            type="text"
                            id="company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Nom de votre entreprise"
                            className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm sm:text-base"
                            required
                          />
                        </div>
                      </div>

                      {/* Prénom / Nom */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-semibold text-slate-900 mb-1.5">
                            Prénom *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="Prénom"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm sm:text-base"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-semibold text-slate-900 mb-1.5">
                            Nom *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="Nom"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm sm:text-base"
                            required
                          />
                        </div>
                      </div>

                      {/* Téléphone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-1.5">
                          Téléphone{' '}
                          <span className="font-normal text-slate-400">(optionnel)</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                          <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+221 77 123 45 67"
                            className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm sm:text-base"
                          />
                        </div>
                      </div>

                      {/* Poste */}
                      <div>
                        <label htmlFor="jobTitle" className="block text-sm font-semibold text-slate-900 mb-1.5">
                          Votre poste{' '}
                          <span className="font-normal text-slate-400">(optionnel)</span>
                        </label>
                        <input
                          type="text"
                          id="jobTitle"
                          value={formData.jobTitle}
                          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                          placeholder="Ex: Directeur Général, DRH, Fondateur..."
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm sm:text-base"
                        />
                      </div>
                    </>
                  )}

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-1.5">
                      Email{' '}
                      {activeTab === 'register' && <span className="text-red-500">*</span>}
                      {activeTab === 'register' && (
                        <span className="font-normal text-slate-400 text-xs ml-1">(professionnel uniquement)</span>
                      )}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => {
                          const email = e.target.value;
                          setFormData({ ...formData, email });
                          if (activeTab === 'register' && email.includes('@')) {
                            if (isPersonalEmail(email)) {
                              setEmailError('Les emails personnels (Gmail, Yahoo, etc.) ne sont pas acceptés.');
                            } else {
                              setEmailError('');
                            }
                          } else {
                            setEmailError('');
                          }
                        }}
                        placeholder={activeTab === 'register' ? 'votre@entreprise.com' : 'votre@email.com'}
                        className={`w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-slate-50 border rounded-lg sm:rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm sm:text-base ${
                          emailError ? 'border-red-300 bg-red-50' : 'border-slate-300'
                        }`}
                        required
                      />
                    </div>
                    {emailError && (
                      <p className="mt-1 text-sm text-red-600">{emailError}</p>
                    )}
                  </div>

                  {/* Mot de passe */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-slate-900 mb-1.5">
                      Mot de passe{' '}
                      {activeTab === 'register' && (
                        <span className="font-normal text-slate-400 text-xs">(min. 8 caractères)</span>
                      )}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                        minLength={activeTab === 'register' ? 8 : undefined}
                        className="w-full pl-10 sm:pl-12 pr-12 py-2.5 sm:py-3 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm sm:text-base"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Mémoriser / mot de passe oublié (login) */}
                  {activeTab === 'login' && (
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-2 border-slate-300 accent-primary-500 focus:ring-2 focus:ring-primary-500/50"
                        />
                        <span className="text-sm text-slate-600">Se souvenir de moi</span>
                      </label>
                      <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        Mot de passe oublié ?
                      </Link>
                    </div>
                  )}

                  {/* CGU (register) */}
                  {activeTab === 'register' && (
                    <p className="text-xs text-slate-500">
                      En créant un compte, vous acceptez nos{' '}
                      <Link href="/terms" className="text-primary-600 hover:underline">
                        conditions d&apos;utilisation
                      </Link>{' '}
                      et notre{' '}
                      <Link href="/privacy" className="text-primary-600 hover:underline">
                        politique de confidentialité
                      </Link>.
                    </p>
                  )}

                  {/* Bouton soumettre */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 sm:h-12 mt-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Chargement...
                      </>
                    ) : (
                      <>
                        <span>
                          {activeTab === 'login' ? 'Se connecter' : 'Démarrer mon essai gratuit'}
                        </span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                {/* Lien bas de formulaire */}
                <div className="mt-6 pt-5 border-t border-slate-200 text-center">
                  <p className="text-sm text-slate-600">
                    {activeTab === 'login' ? (
                      <>
                        Pas encore de compte ?{' '}
                        <button
                          type="button"
                          onClick={() => setActiveTab('register')}
                          className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                        >
                          Essai gratuit 90 jours
                        </button>
                      </>
                    ) : (
                      <>
                        Déjà un compte ?{' '}
                        <button
                          type="button"
                          onClick={() => setActiveTab('login')}
                          className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                        >
                          Se connecter
                        </button>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
