'use client';

import { useState, useRef, Suspense, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, Loader2, Building2, Phone, CheckCircle, Clock, Users, Shield, ArrowLeft } from 'lucide-react';

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
    } catch {
      setError('Erreur de connexion');
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

    try {
      const res = await fetch(`${API_URL}/api/auth/2fa/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tempToken}`,
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Code invalide');
      }

      // Rediriger vers le dashboard avec les vrais tokens
      const userEncoded = encodeURIComponent(JSON.stringify(data.user));
      window.location.href = `${DASHBOARD_URL}?token=${data.access_token}&refresh=${data.refresh_token}&user=${userEncoded}`;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Code invalide ou expiré');
      }
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

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Erreur lors de l'inscription");
        }

        // Compte en attente de validation → page d'attente
        window.location.href = '/pending-activation';
      }
    } catch (err) {
      if (err instanceof Error) {
        // Si c'est un 403 "en cours de validation", rediriger
        if (err.message.includes('en cours de validation')) {
          window.location.href = '/pending-activation';
          return;
        }
        setError(err.message);
      } else {
        setError('Une erreur est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================
  // ÉCRAN 2FA
  // ============================================
  if (twoFactorStep) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Vérification en deux étapes</h1>
            <p className="text-gray-500 mt-1">
              {needsSetup
                ? 'Configurez votre application d\'authentification'
                : 'Entrez le code de votre application d\'authentification'
              }
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* QR Code Setup */}
          {needsSetup && (
            <div className="mb-6">
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Instructions :</h3>
                <ol className="text-sm text-gray-600 space-y-1.5 list-decimal list-inside">
                  <li>Ouvrez <strong>Google Authenticator</strong>, <strong>Authy</strong> ou une autre app TOTP</li>
                  <li>Scannez le QR code ci-dessous</li>
                  <li>Entrez le code à 6 chiffres affiché</li>
                </ol>
              </div>

              <div className="flex justify-center p-4 bg-white border-2 border-gray-200 rounded-xl">
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

          {/* OTP Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
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
                  className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  autoFocus={i === 0}
                />
              ))}
            </div>
          </div>

          {/* Verify Button */}
          <button
            onClick={verify2FA}
            disabled={verifying2FA || otpCode.join('').length !== 6}
            className="w-full py-3 px-4 bg-dark text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {verifying2FA ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Vérification...
              </>
            ) : (
              'Vérifier'
            )}
          </button>

          {/* Back button */}
          <button
            onClick={() => {
              setTwoFactorStep(false);
              setTempToken('');
              setQrCode('');
              setOtpCode(['', '', '', '', '', '']);
              setError('');
            }}
            className="w-full mt-4 py-2 text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // FORMULAIRE LOGIN / REGISTER NORMAL
  // ============================================
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Targetym AI</h1>
          <p className="text-gray-500">Plateforme RH intelligente</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'login'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Connexion
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'register'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Essai gratuit
          </button>
        </div>

        {/* Avantages essai gratuit */}
        {activeTab === 'register' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-100">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 text-primary-500 mr-2" />
              Essai gratuit - 90 jours
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <Clock className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" />
                90 jours d&apos;accès complet aux fonctionnalités Premium
              </li>
              <li className="flex items-center">
                <Users className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" />
                Jusqu&apos;à 100 collaborateurs
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" />
                Frais d&apos;installation : 297 000 FCFA
              </li>
            </ul>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'register' && (
            <>
              {/* Nom de l'entreprise */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nom de l&apos;entreprise *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Nom de votre entreprise"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Nom et Prénom */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Prénom"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Nom"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Téléphone <span className="text-gray-400">(optionnel)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+221 77 123 45 67"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Poste */}
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Votre poste <span className="text-gray-400">(optionnel)</span>
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  placeholder="Ex: Directeur Général, DRH, Fondateur..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email {activeTab === 'register' && <span className="text-red-500">*</span>}
              {activeTab === 'register' && <span className="text-gray-400 text-xs ml-2">(professionnel uniquement)</span>}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => {
                  const email = e.target.value;
                  setFormData({ ...formData, email });
                  // Validation en temps réel pour inscription
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
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
                  emailError ? 'border-red-300 bg-red-50' : 'border-gray-300'
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              Mot de passe {activeTab === 'register' && <span className="text-gray-400">(min. 8 caractères)</span>}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                minLength={activeTab === 'register' ? 8 : undefined}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {activeTab === 'login' && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500" />
                <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
                Mot de passe oublié ?
              </Link>
            </div>
          )}

          {activeTab === 'register' && (
            <p className="text-xs text-gray-500">
              En créant un compte, vous acceptez nos{' '}
              <Link href="/terms" className="text-primary-600 hover:underline">conditions d&apos;utilisation</Link>
              {' '}et notre{' '}
              <Link href="/privacy" className="text-primary-600 hover:underline">politique de confidentialité</Link>.
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-dark text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Chargement...
              </>
            ) : (
              activeTab === 'login' ? 'Se connecter' : 'Démarrer mon essai gratuit'
            )}
          </button>
        </form>


        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          {activeTab === 'login' ? (
            <>
              Pas encore de compte ?{' '}
              <button onClick={() => setActiveTab('register')} className="text-primary-600 hover:text-primary-700 font-medium">
                Essai gratuit 90 jours
              </button>
            </>
          ) : (
            <>
              Déjà un compte ?{' '}
              <button onClick={() => setActiveTab('login')} className="text-primary-600 hover:text-primary-700 font-medium">
                Se connecter
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4">
      <Suspense fallback={<div className="text-center">Chargement...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
