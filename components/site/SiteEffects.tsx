'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/* Effets partagés du prototype, relancés à chaque page et pour tout bloc ajouté plus tard
   (listes chargées côté client) :
   - encoches : [data-cut] → .cut-armed, puis .is-cut à l'entrée dans l'écran ;
   - entrée des sections sans timelines de défilement (Firefox) : .sec-armed → .sec-shown.
   Le masquage initial est posé dès le premier rendu par html.js-cut (voir styles/site/runtime.css). */
export default function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!('IntersectionObserver' in window)) {
      root.classList.remove('js-cut');
      return;
    }
    const timelines = !!(window.CSS && CSS.supports && CSS.supports('animation-timeline: view()'));

    const cutIo = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-cut');
        cutIo.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -18% 0px' });

    const secIo = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('sec-shown');
        secIo.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px' });

    const seen = new WeakSet<Element>();
    const arm = () => {
      document.querySelectorAll('[data-cut]').forEach((el) => {
        if (seen.has(el) || el.classList.contains('is-cut')) return;
        seen.add(el);
        el.classList.add('cut-armed');
        cutIo.observe(el);
      });
      if (timelines) return;
      document.querySelectorAll('.sec-anim').forEach((el) => {
        if (seen.has(el) || el.classList.contains('sec-shown')) return;
        seen.add(el);
        el.classList.add('sec-armed');
        secIo.observe(el);
      });
    };

    arm();
    root.classList.add('cut-ready');

    let raf = 0;
    const mo = new MutationObserver((records) => {
      let added = false;
      records.forEach((r) => {
        if (r.type === 'childList') { added = true; return; }
        /* React a réécrit la classe d'un bloc déjà armé : on le rend dans son état final */
        const el = r.target as Element;
        if (!seen.has(el)) return;
        if (el.hasAttribute('data-cut') && !el.classList.contains('cut-armed')) el.classList.add('cut-armed', 'is-cut');
        if (!timelines && el.classList.contains('sec-anim') && !el.classList.contains('sec-armed')) el.classList.add('sec-armed', 'sec-shown');
      });
      if (!added || raf) return;
      raf = requestAnimationFrame(() => { raf = 0; arm(); });
    });
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });

    return () => {
      mo.disconnect();
      cutIo.disconnect();
      secIo.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
