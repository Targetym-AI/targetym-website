'use client';

import { useEffect, useState } from 'react';

/* L'heure de Dakar, mise à jour chaque demi-minute (posée après le montage : pas d'écart d'hydratation) */
export default function FooterClock({ tz = 'Africa/Dakar' }: { tz?: string }) {
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    let f: Intl.DateTimeFormat;
    try {
      f = new Intl.DateTimeFormat('fr-FR', { timeZone: tz, hour: '2-digit', minute: '2-digit' });
    } catch {
      return;
    }
    const tick = () => setTime(f.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, [tz]);

  return <time className="footer-clock" data-tz={tz}>{time}</time>;
}
