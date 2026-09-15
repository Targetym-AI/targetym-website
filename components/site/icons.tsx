/* Pictos du rendu des cas d'usage (use-cases.js) */
export function CheckIco() {
  return <svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
}

export function XIco() {
  return <svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 7.5l9 9M16.5 7.5l-9 9" /></svg>;
}

/* Logos des magasins d'applications, aux couleurs des marques */
export function AppleLogo({ className = 'store-logo' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 384 512" aria-hidden="true"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>;
}

export function PlayLogo({ className = 'store-logo' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#34A853" d="M4.2 2.1 15.5 8.7 12.2 12z" />
      <path fill="#FBBC04" d="M15.5 8.7l4.6 2.7c.5.3.5.9 0 1.2l-4.6 2.7-3.3-3.3z" />
      <path fill="#EA4335" d="M12.2 12l3.3 3.3L4.2 21.9z" />
      <path fill="#4285F4" d="M4.2 2.1 12.2 12l-8 9.9c-.3-.2-.5-.6-.5-1V3.1c0-.4.2-.8.5-1z" />
    </svg>
  );
}

/* Pictos au trait des pages intérieures (valeurs, avantages, étapes, confirmations) */
const LINE_PATHS = {
  bulb: <><path d="M9.5 18h5M10.5 21h3" /><path d="M12 3a6 6 0 0 0-3.6 10.8c.8.6 1.1 1.3 1.1 2.2h5c0-.9.3-1.6 1.1-2.2A6 6 0 0 0 12 3z" /></>,
  users: <><circle cx="9" cy="8.5" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 5.2a3.5 3.5 0 0 1 0 6.6M18 14.2a6.5 6.5 0 0 1 3.5 5.8" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  shield: <><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z" /><path d="M8.8 12.2l2.2 2.2 4.2-4.4" /></>,
  trend: <><path d="M3.5 17l6-6 4 4 7-7.5" /><path d="M15 7.5h5.5V13" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>,
  rocket: <><path d="M14.5 4.5c2.6-1 4.9-1 6-.9.1 1.1.1 3.4-.9 6-1.2 3.2-4 6-7.6 7.9l-3.5-3.5C10.4 10.4 13.2 5.7 14.5 4.5z" /><path d="M8.5 14l-3-.8 2.2-3.3 3.3-.4M10 15.5l.8 3 3.3-2.2.4-3.3" /><circle cx="15.5" cy="8.5" r="1.4" /><path d="M5.5 16.5c-1.2.6-2 2.2-2 4 1.8 0 3.4-.8 4-2" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" />,
  bolt: <path d="M13 2.8L5 13.5h6l-1 7.7 8-10.7h-6z" />,
  phone: <path d="M5.6 3.5h2.9l1.7 4.2-2 1.4a11 11 0 0 0 6.7 6.7l1.4-2 4.2 1.7v2.9a2 2 0 0 1-2.2 2C10.4 20 4 13.6 3.5 5.7a2 2 0 0 1 2.1-2.2z" />,
  gift: <><rect x="3.5" y="8" width="17" height="4.5" rx="1.5" /><path d="M5 12.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7.5M12 8v13M12 8c-1-2.8-3-4.5-4.8-4-1.4.4-1.4 2.6.3 3.4C8.8 8 12 8 12 8zm0 0c1-2.8 3-4.5 4.8-4 1.4.4 1.4 2.6-.3 3.4C15.2 8 12 8 12 8z" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="4" /><path d="M3.5 7.5l7.3 5a2 2 0 0 0 2.4 0l7.3-5" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="3" /><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="4" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="M8.5 12.4l2.4 2.4 4.8-5" /></>,
  lock: <><rect x="4.5" y="10.5" width="15" height="10" rx="3" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2" /></>,
} as const;

export type LineIcoName = keyof typeof LINE_PATHS;

export function LineIco({ name }: { name: LineIcoName }) {
  return <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">{LINE_PATHS[name]}</svg>;
}
