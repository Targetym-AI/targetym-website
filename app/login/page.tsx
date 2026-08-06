'use client';

import { useState, useRef, Suspense, useEffect, useCallback, type PointerEvent as ReactPointerEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, Loader2, Building2, Phone, CheckCircle, Clock, Users, ArrowLeft, ArrowRight, Sparkles, BarChart3, Download, Bot, ShieldCheck, CalendarCheck, ClipboardCheck, UserPlus, Handshake, Star, GraduationCap, Target, ScanLine, CalendarDays, Banknote, Scale } from 'lucide-react';
import { getAuthErrorMessage } from '@/lib/error-messages';

// URL de ton API Railway
const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.targetym.ai').replace(/^http:\/\//, 'https://');
const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://dashboard.targetym.ai';

function getRequestedDashboardDestination(requestedPath: string | null): string | null {
  if (!requestedPath || requestedPath.startsWith('//')) {
    return null;
  }

  try {
    const destination = new URL(requestedPath, DASHBOARD_URL);
    const dashboardOrigin = new URL(DASHBOARD_URL).origin;
    const isDashboardPath =
      destination.pathname === '/dashboard' ||
      destination.pathname.startsWith('/dashboard/');

    if (destination.origin !== dashboardOrigin || !isDashboardPath) {
      return null;
    }

    return `${DASHBOARD_URL}${destination.pathname}${destination.search}${destination.hash}`;
  } catch {
    return null;
  }
}

function getDashboardDestination(role?: string, requestedPath?: string | null): string {
  const requestedDestination = getRequestedDashboardDestination(requestedPath ?? null);
  if (requestedDestination) {
    return requestedDestination;
  }

  const normalized = (role || '').toLowerCase().replace(/[^a-z_]/g, '');
  if (['superadmin', 'super_admin', 'superadmintech', 'platform_admin'].includes(normalized)) {
    return `${DASHBOARD_URL}/dashboard/platform-admin`;
  }
  if (normalized === 'cabinet') {
    return `${DASHBOARD_URL}/dashboard/cabinet`;
  }
  return `${DASHBOARD_URL}/dashboard`;
}

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

const BACKGROUND_MODULES = [
  { label: 'Collaborateurs', icon: Users, className: 'module-avatar-01 module-avatar-near' },
  { label: 'Recrutement', icon: UserPlus, className: 'module-avatar-02 module-avatar-mid' },
  { label: 'Onboarding', icon: Handshake, className: 'module-avatar-03 module-avatar-far' },
  { label: 'Talents et carrière', icon: Star, className: 'module-avatar-04 module-avatar-mid' },
  { label: 'Formation', icon: GraduationCap, className: 'module-avatar-05 module-avatar-near' },
  { label: 'Objectifs et OKR', icon: Target, className: 'module-avatar-06 module-avatar-far' },
  { label: 'Présence', icon: ScanLine, className: 'module-avatar-07 module-avatar-mid' },
  { label: 'Congés', icon: CalendarDays, className: 'module-avatar-08 module-avatar-near' },
  { label: 'Paie et rémunération', icon: Banknote, className: 'module-avatar-09 module-avatar-far' },
  { label: 'Analytics', icon: BarChart3, className: 'module-avatar-10 module-avatar-mid' },
  { label: 'Conformité', icon: Scale, className: 'module-avatar-11 module-avatar-near' },
  { label: 'Copilote AI', icon: Sparkles, className: 'module-avatar-12 module-avatar-far' },
] as const;

function ModuleAvatarCloud() {
  return (
    <div className="targetym-module-cloud" aria-hidden="true">
      {BACKGROUND_MODULES.map(({ label, icon: Icon, className }) => (
        <span key={label} className={`targetym-module-avatar ${className}`}>
          <span><Icon /></span>
        </span>
      ))}
    </div>
  );
}

function AgentScene() {
  const sceneRef = useRef<HTMLDivElement | null>(null);

  const handleSceneMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || !sceneRef.current) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    sceneRef.current.style.setProperty('--agent-rotate-x', `${6 - y * 10}deg`);
    sceneRef.current.style.setProperty('--agent-rotate-y', `${-12 + x * 16}deg`);
  };

  const resetScene = () => {
    sceneRef.current?.style.setProperty('--agent-rotate-x', '6deg');
    sceneRef.current?.style.setProperty('--agent-rotate-y', '-12deg');
  };

  return (
    <div
      className="agent-stage"
      aria-hidden="true"
      onPointerMove={handleSceneMove}
      onPointerLeave={resetScene}
    >
      <div ref={sceneRef} className="agent-scene">
        <div className="agent-depth-sheet agent-depth-sheet-one" />
        <div className="agent-depth-sheet agent-depth-sheet-two" />

        <svg className="agent-flow-map" viewBox="0 0 780 520" fill="none">
          <defs>
            <linearGradient id="agent-flow-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8DE7D0" stopOpacity="0" />
              <stop offset="0.48" stopColor="#18AE8D" stopOpacity="0.8" />
              <stop offset="1" stopColor="#0C6D6C" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M386 252 C486 177 575 136 681 126" />
          <path d="M380 272 C277 320 192 355 104 380" />
          <path d="M388 284 C282 363 205 414 116 438" />
          <path d="M408 284 C512 354 594 400 690 429" />
        </svg>

        <div className="agent-layer agent-command-layer">
          <div className="agent-float agent-float-slow">
            <div className="agent-liquid-card agent-command-card">
              <div className="agent-command-head">
                <div className="agent-command-brand">
                  <span className="agent-command-icon"><BarChart3 /></span>
                  <span>
                    <strong>Tableau de bord</strong>
                    <small>Vue RH globale</small>
                  </span>
                </div>
                <span className="agent-beta">Aujourd&apos;hui</span>
              </div>

              <div className="agent-dashboard-intro">
                <strong>Bonjour !</strong>
                <span>Voici l&apos;essentiel aujourd&apos;hui.</span>
              </div>

              <div className="agent-dashboard-grid">
                <div className="agent-dashboard-kpi">
                  <div className="agent-dashboard-kpi-label"><Users /> Équipe active</div>
                  <strong>128</strong>
                  <small>+8 ce mois</small>
                </div>
                <div className="agent-dashboard-kpi agent-dashboard-kpi-right">
                  <div className="agent-dashboard-kpi-label"><ClipboardCheck /> Tâches</div>
                  <strong>24</strong>
                  <small>−12 % cette semaine</small>
                </div>
              </div>

              <div className="agent-dashboard-feed">
                <div className="agent-dashboard-feed-head">
                  <strong>Activité récente</strong>
                  <span>Voir tout</span>
                </div>
                <div className="agent-dashboard-row">
                  <i>AD</i><span>Demande de congé approuvée</span><small>15 min</small>
                </div>
                <div className="agent-dashboard-row">
                  <i>MF</i><span>Onboarding terminé</span><small>1 h</small>
                </div>
                <div className="agent-dashboard-row">
                  <i className="agent-ai-avatar"><Sparkles /></i><span>Rapport préparé par le Copilote</span><small>2 h</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="agent-layer agent-orb-layer">
          <div className="agent-orb-halo">
            <span className="agent-orb-ring agent-orb-ring-one" />
            <span className="agent-orb-ring agent-orb-ring-two" />
            <span className="agent-orb-core">
              <Sparkles />
            </span>
            <span className="agent-orb-tag">Copilote AI</span>
          </div>
        </div>

        <div className="agent-layer agent-understanding-layer">
          <div className="agent-float agent-float-one">
            <div className="agent-liquid-card agent-number-card">
              <div className="agent-number-card-head">
                <span className="agent-card-icon"><CalendarCheck /></span>
                <strong>Congés approuvés</strong>
              </div>
              <div className="agent-number-card-value"><strong>16</strong><span>ce mois</span></div>
              <svg className="agent-sparkline" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path d="M2 25 C17 24 23 17 36 20 S55 8 68 12 S87 3 98 5" />
              </svg>
            </div>
          </div>
        </div>

        <div className="agent-layer agent-data-layer">
          <div className="agent-float agent-float-two">
            <div className="agent-liquid-card agent-number-card">
              <div className="agent-number-card-head">
                <span className="agent-card-icon agent-card-icon-blue"><Users /></span>
                <strong>Équipe active</strong>
              </div>
              <div className="agent-number-card-value"><strong>128</strong><span>collaborateurs</span></div>
              <svg className="agent-sparkline" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path d="M2 22 C14 20 21 9 34 12 S53 22 67 16 S88 5 98 8" />
              </svg>
            </div>
          </div>
        </div>

        <div className="agent-layer agent-report-layer">
          <div className="agent-float agent-float-three">
            <div className="agent-liquid-card agent-mini-card agent-copilot-card">
              <span className="agent-card-icon agent-copilot-icon"><Bot /></span>
              <div><small>Copilote AI</small><strong>Rapport RH prêt</strong><p>Généré et vérifié · PDF</p></div>
              <span className="agent-download"><Download /></span>
            </div>
          </div>
        </div>

        <div className="agent-layer agent-security-layer">
          <div className="agent-float agent-float-four">
            <div className="agent-liquid-card agent-mini-card agent-security-card">
              <span className="agent-card-icon agent-card-icon-amber"><ShieldCheck /></span>
              <div><small>Sécurité</small><strong>Données protégées</strong><p>Chiffrées · Hébergées en Europe</p></div>
              <CheckCircle className="agent-card-check" />
            </div>
          </div>
        </div>

        <div className="agent-insight-chip">
          <ClipboardCheck />
          <span><strong>Tâches à traiter</strong><small>24 · 3 prioritaires</small></span>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'register' ? 'register' : 'login';
  const requestedDashboardPath = searchParams.get('next');

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
        credentials: 'include',
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

      // Le refresh token reste dans le cookie HTTP-only de l'API. Aucun JWT
      // ne transite dans l'URL ou dans le stockage JavaScript.
      window.location.href = getDashboardDestination(data.user?.role, requestedDashboardPath);
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
          credentials: 'include',
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

        // Le Dashboard restaurera l'access token via le cookie HTTP-only.
        window.location.href = getDashboardDestination(data.user?.role, requestedDashboardPath);

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
    <div className="targetym-login-page">
      <div className="targetym-login-atmosphere" aria-hidden="true" />
      <ModuleAvatarCloud />

      <Link href="/" className="targetym-login-brand" aria-label="Targetym AI">
        <Image src="/logo-targetym-dark.png" alt="Targetym AI" width={176} height={47} priority />
      </Link>

      <div className="targetym-login-layout">
        <section className="targetym-agent-hero" aria-labelledby="agent-login-title">
          <div className="targetym-agent-copy">
            <span className="targetym-agent-kicker"><Sparkles /> La plateforme RH intelligente</span>
            <h1 id="agent-login-title">Votre espace RH,<br />simplement.</h1>
            <p>
              Gérez vos collaborateurs, vos absences, la paie et la performance
              dans un seul espace, avec un agent IA directement intégré.
            </p>
            <div className="targetym-agent-trust">
              <span><ShieldCheck /> Accès selon vos droits</span>
              <i aria-hidden="true" />
              <span>Données sécurisées · RGPD</span>
            </div>
          </div>

          <AgentScene />
        </section>

        <aside className="targetym-auth-side" aria-label="Accès à Targetym">
          <div className="targetym-auth-content">

          {twoFactorStep ? (
            /* ── ÉCRAN 2FA ── */
            <>
              <div className="targetym-auth-card p-6 sm:p-8">
                <div className="targetym-auth-heading mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Vérification en deux étapes
                  </h2>
                  <p className="text-slate-600">
                    {needsSetup
                      ? "Configurez votre application d'authentification"
                      : "Entrez le code de votre application d'authentification"}
                  </p>
                </div>

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
              <div key={`form-${activeTab}`} className="targetym-auth-card p-6 sm:p-8 animate-form-enter">
                <div className="targetym-auth-heading mb-8">
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                    {activeTab === 'login' ? 'Bienvenue !' : "Démarrer l'essai gratuit"}
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg">
                    {activeTab === 'login'
                      ? 'Accédez à votre espace RH'
                      : "15 jours d'accès complet à toutes les fonctionnalités"}
                  </p>
                </div>

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
                      Essai gratuit - 15 jours
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary-500 flex-shrink-0" />
                        15 jours d&apos;accès complet aux fonctionnalités Premium
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
                        aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                        aria-pressed={showPassword}
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
                          Essai gratuit 15 jours
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
        </aside>
      </div>

      <footer className="targetym-login-footer">
        <Link href="/privacy">Confidentialité</Link>
        <span aria-hidden="true">•</span>
        <Link href="/terms">Conditions</Link>
        <span aria-hidden="true">•</span>
        <span>© 2026 Targetym AI</span>
      </footer>
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
