'use client';

import { useEffect, useRef } from 'react';
import { TURNSTILE_SCRIPT_ORIGIN, TURNSTILE_SITE_KEY } from '../../lib/site/turnstileKeys';

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_URL = `${TURNSTILE_SCRIPT_ORIGIN}/turnstile/v0/api.js?render=explicit`;
let scriptLoading: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptLoading) {
    scriptLoading = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = SCRIPT_URL;
      script.async = true;
      script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile')));
      script.onerror = () => {
        scriptLoading = null;
        reject(new Error('turnstile'));
      };
      document.head.appendChild(script);
    });
  }
  return scriptLoading;
}

type Props = {
  /** Jeton délivré par Cloudflare, ou '' quand il expire ou échoue. */
  onToken: (token: string) => void;
  /** Changer cette valeur redemande un jeton : chaque jeton ne sert qu'une fois. */
  resetSignal: number;
};

/* Preuve anti-robot (W-01 / TAR-41). Invisible tant que Cloudflare ne demande rien au visiteur. */
export default function TurnstileWidget({ onToken, resetSignal }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const tokenHandler = useRef(onToken);
  tokenHandler.current = onToken;

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !container.current) return;
        widgetId.current = turnstile.render(container.current, {
          sitekey: TURNSTILE_SITE_KEY,
          appearance: 'interaction-only',
          language: 'fr',
          callback: (token: string) => tokenHandler.current(token),
          'expired-callback': () => tokenHandler.current(''),
          'error-callback': () => tokenHandler.current(''),
        });
      })
      .catch(() => tokenHandler.current(''));
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, []);

  useEffect(() => {
    if (resetSignal === 0 || !widgetId.current || !window.turnstile) return;
    tokenHandler.current('');
    window.turnstile.reset(widgetId.current);
  }, [resetSignal]);

  return <div ref={container} className="f-turnstile" />;
}
