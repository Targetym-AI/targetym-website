'use client';

import { useEffect } from 'react';

/* Onglets : chaque .tab de [data-tabs] pilote le panneau nommé par aria-controls.
   Un #hash qui vise un panneau l'ouvre au chargement. Le balisage (et l'onglet
   ouvert par défaut) est rendu par le serveur. */
export default function ResourceTabs() {
  useEffect(() => {
    const offs: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((list) => {
      const tabs = Array.from(list.querySelectorAll<HTMLElement>('.tab'));
      if (!tabs.length) return;
      const on = (t: HTMLElement) => {
        tabs.forEach((x) => {
          const is = x === t;
          x.classList.toggle('is-on', is);
          x.setAttribute('aria-selected', is ? 'true' : 'false');
          const p = document.getElementById(x.getAttribute('aria-controls') || '');
          if (p) p.hidden = !is;
        });
      };
      tabs.forEach((t) => {
        const click = () => on(t);
        t.addEventListener('click', click);
        offs.push(() => t.removeEventListener('click', click));
      });
      const fromHash = () => {
        const h = window.location.hash.slice(1);
        const t = tabs.find((x) => x.getAttribute('aria-controls') === h);
        if (t) on(t);
      };
      fromHash();
      window.addEventListener('hashchange', fromHash);
      offs.push(() => window.removeEventListener('hashchange', fromHash));
    });
    return () => offs.forEach((off) => off());
  }, []);

  return null;
}
