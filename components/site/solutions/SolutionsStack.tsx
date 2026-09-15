'use client';

import { useEffect } from 'react';

/* Solutions : la pile des familles (port de pages.js). Dans une carte, les onglets
   montrent un sous-module. Au défilement, on mesure de combien la carte suivante
   recouvre chacune (--p, de 0 à 1) : la carte recule et s'assombrit (voir .sk-card).
   Rien de tout cela en mouvement réduit. Le balisage est rendu par le serveur. */
export default function SolutionsStack() {
  useEffect(() => {
    const stack = document.querySelector<HTMLElement>('.sk-stack');
    if (!stack) return;
    const cards = Array.from(stack.querySelectorAll<HTMLElement>('.sk-card'));
    const offs: Array<() => void> = [];

    cards.forEach((card) => {
      const tags = Array.from(card.querySelectorAll<HTMLButtonElement>('.sk-tag'));
      const subs = Array.from(card.querySelectorAll<HTMLElement>('.sk-sub'));
      if (tags.length < 2) return;
      tags.forEach((t, i) => {
        const click = () => {
          tags.forEach((x, k) => { x.classList.toggle('is-on', k === i); x.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
          subs.forEach((s, k) => { s.hidden = k !== i; });
        };
        t.addEventListener('click', click);
        offs.push(() => t.removeEventListener('click', click));
      });
    });

    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    let ticking = false;
    let st = 14;
    const tops: number[] = [];
    const heights: number[] = [];
    const sticks: number[] = [];

    /* Les positions viennent de la mise en page, pas des rectangles rendus : la
       section entre et sort de l'écran avec une transformation 3D (.sec-anim)
       qui fausserait la mesure. Et pas de l'offsetTop des cartes : une carte
       collée le déclare à sa position collée. On part du haut de la pile (elle,
       ne colle pas) et on empile hauteurs et intervalle. */
    const docTop = (el: HTMLElement | null) => {
      let y = 0;
      while (el) { y += el.offsetTop; el = el.offsetParent as HTMLElement | null; }
      return y;
    };
    const measure = () => {
      const cs = getComputedStyle(stack);
      st = parseFloat(cs.getPropertyValue('--sk-step')) || 14;
      const top0 = parseFloat(cs.getPropertyValue('--sk-top')) || 24;
      const gap = parseFloat(cs.rowGap) || 0;
      let y = docTop(stack) + (parseFloat(cs.paddingTop) || 0);
      cards.forEach((c, i) => { tops[i] = y; heights[i] = c.offsetHeight; sticks[i] = top0 + i * st; y += heights[i] + gap; });
    };
    const shown = (i: number, y: number) => Math.max(tops[i] - y, sticks[i]);   /* haut visible de la carte : en flux, ou collée */
    const update = () => {
      ticking = false;
      const live = !still.matches;
      const y = window.pageYOffset;
      for (let i = 0; i < cards.length; i++) {
        let p = 0;
        if (live && i < cards.length - 1) p = Math.max(0, Math.min(1, (shown(i, y) + heights[i] - shown(i + 1, y)) / (heights[i] - st)));
        cards[i].style.setProperty('--p', p.toFixed(3));
      }
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    const onResize = () => { measure(); onScroll(); };

    /* Un #hash qui vise un sous-module (m-administration-1, depuis Cas d'usage)
       ou une carte (m-paie) : on ouvre l'onglet et on amène la carte à sa place
       dans la pile. Le navigateur ne saurait pas y aller seul, le panneau visé
       est caché tant que son onglet n'est pas ouvert. */
    const openHash = () => {
      const h = window.location.hash.slice(1);
      if (!/^[\w-]+$/.test(h)) return;
      const el = document.getElementById(h);
      const card = el && el.closest<HTMLElement>('.sk-card');
      if (!el || !card) return;
      if (el.classList.contains('sk-sub')) card.querySelector<HTMLButtonElement>(`.sk-tag[aria-controls="${h}"]`)?.click();
      measure();
      const i = cards.indexOf(card);
      window.scrollTo(0, tops[i] - sticks[i]);
    };
    const onLoad = () => { onResize(); requestAnimationFrame(openHash); };

    let ro: ResizeObserver | undefined;
    if (cards.length >= 2) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);
      if (window.ResizeObserver) { ro = new ResizeObserver(onResize); ro.observe(stack); }   /* sur mobile, les écrans chargés en différé changent la hauteur des cartes */
      onResize();
    }
    window.addEventListener('hashchange', openHash);
    if (document.readyState === 'complete') requestAnimationFrame(openHash);
    else window.addEventListener('load', onLoad);
    openHash();

    return () => {
      offs.forEach((off) => off());
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('hashchange', openHash);
      window.removeEventListener('load', onLoad);
      ro?.disconnect();
    };
  }, []);

  return null;
}
