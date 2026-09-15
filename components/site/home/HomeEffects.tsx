'use client';

import { useEffect, useLayoutEffect } from 'react';

type Off = () => void;

function listen<K extends keyof WindowEventMap>(target: Window, type: K, fn: (e: WindowEventMap[K]) => void, opts?: AddEventListenerOptions): Off;
function listen<K extends keyof DocumentEventMap>(target: Document, type: K, fn: (e: DocumentEventMap[K]) => void, opts?: AddEventListenerOptions): Off;
function listen<K extends keyof HTMLElementEventMap>(target: HTMLElement, type: K, fn: (e: HTMLElementEventMap[K]) => void, opts?: AddEventListenerOptions): Off;
function listen(target: EventTarget, type: string, fn: (e: Event) => void, opts?: AddEventListenerOptions): Off {
  target.addEventListener(type, fn, opts);
  return () => target.removeEventListener(type, fn, opts);
}

const docTop = (el: HTMLElement | null) => {
  let y = 0;
  while (el) { y += el.offsetTop; el = el.offsetParent as HTMLElement | null; }
  return y;
};

/* Compteurs : le chiffre monte de 0 à sa valeur. Au repos, le HTML porte la
   valeur finale (aperçus de lien, moteurs, mouvement réduit) : le compte ne
   part de 0 qu'à l'instant où il démarre. Celui de la carte verte du hero
   démarre quand la carte se pose (son animation d'entrée) ; ceux de la bande
   attendent d'entrer dans l'écran. */
function counters(): Off {
  const offs: Off[] = [];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const rafs = new Set<number>();
  const timers: number[] = [];

  const fmt = (el: Element, v: number) => (el.getAttribute('data-prefix') || '')
    + v.toFixed(+(el.getAttribute('data-dec') || 0)).replace('.', ',')
    + (el.getAttribute('data-suffix') || '');
  const zero = (el: Element) => { el.textContent = fmt(el, 0); };
  const run = (el: Element, dur: number) => {
    const to = parseFloat(el.getAttribute('data-to') || '0');
    let t0: number | null = null;
    const tick = (t: number) => {
      if (t0 === null) t0 = t;
      const k = Math.min(1, (t - t0) / dur);
      el.textContent = fmt(el, to * (1 - Math.pow(1 - k, 3)));   /* ease-out */
      if (k < 1) rafs.add(requestAnimationFrame(tick));
    };
    zero(el);
    rafs.add(requestAnimationFrame(tick));
  };

  const card = document.querySelector<HTMLElement>('.float-stat');
  const hero = card && card.querySelector('.count');
  if (card && hero) {
    let started = false;
    const go = () => { if (started) return; started = true; run(hero, 1100); };
    offs.push(listen(card, 'animationstart', (e) => { if (e.target === card) go(); }));
    timers.push(window.setTimeout(go, 2500));   /* sans animation d'entrée : quand même */
  }

  const band = document.querySelector<HTMLElement>('.figures');
  const nums = band ? Array.from(band.querySelectorAll('.count')) : [];
  if (band && nums.length) {
    const play = () => {
      band.classList.add('is-in');
      nums.forEach(zero);   /* tous à 0 au même instant, les départs sont décalés */
      nums.forEach((el, i) => { timers.push(window.setTimeout(() => run(el, 1200), i * 70)); });
    };
    band.classList.add('is-armed');
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      play();
    }, { threshold: .35 });
    io.observe(band);
    offs.push(() => io.disconnect());
  }

  return () => {
    offs.forEach((off) => off());
    timers.forEach((t) => clearTimeout(t));
    rafs.forEach((r) => cancelAnimationFrame(r));
  };
}

/* Preuve sociale du hero : au survol et au clavier, c'est le CSS qui montre la
   bulle. Au doigt il n'y a pas de survol : un tap sur un portrait l'ouvre, un
   second tap ou un tap ailleurs la ferme. */
function proof(): Off {
  const stack = document.querySelector<HTMLElement>('.hero-proof .stack');
  if (!stack) return () => {};
  const closeAll = (except?: Element) => {
    stack.querySelectorAll('li.is-open').forEach((li) => { if (li !== except) li.classList.remove('is-open'); });
  };
  const offs = [
    listen(stack, 'click', (e) => {
      const face = (e.target as Element).closest('.face');
      if (!face) return;
      const li = face.parentNode as Element;
      closeAll(li);
      li.classList.toggle('is-open');
    }),
    listen(document, 'click', (e) => { if (!stack.contains(e.target as Node)) closeAll(); }),
    listen(document, 'keydown', (e) => { if (e.key === 'Escape') closeAll(); }),
  ];
  return () => offs.forEach((off) => off());
}

/* « Ce que ça change » : accordéon piloté par le scroll.
   Au-dessus de 1080px la rangée est épinglée le temps de trois créneaux de
   défilement : la progression p (0 → 1) désigne la carte ouverte, sans clic.
   En dessous les cartes sont empilées, et c'est celle qui passe au centre de
   l'écran qui s'ouvre. Le clic reste branché sur les cartes fermées — clavier,
   ou visée directe — mais il fait défiler jusqu'au créneau au lieu d'ouvrir de
   force : le scroll garde la main. Sans JS, le HTML laisse la première ouverte. */
function values(): Off {
  const sec = document.querySelector<HTMLElement>('.values');
  const pin = sec?.querySelector<HTMLElement>('.values-pin');
  const row = sec?.querySelector<HTMLElement>('.value-row');
  if (!sec || !pin || !row) return () => {};
  const items = Array.from(row.querySelectorAll<HTMLElement>('.v-item'));
  const N = items.length;
  if (N < 2) return () => {};
  const offs: Off[] = [];

  let active = -1;
  const show = (i: number) => {
    if (i === active) return;
    active = i;
    items.forEach((it, k) => {
      const on = k === i;
      it.classList.toggle('is-open', on);
      it.querySelector('.v-hit')?.setAttribute('aria-expanded', on ? 'true' : 'false');
    });
  };

  /* On referme tout avant le premier rendu, sans jouer la transition. */
  row.classList.add('is-init');
  items.forEach((it) => it.classList.remove('is-open'));
  let r1 = 0;
  let r2 = 0;
  r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => row.classList.remove('is-init')); });

  const wide = window.matchMedia('(min-width: 1081px)');
  const SLOT = .9;              /* un créneau = 90 % de la fenêtre : ~2 gestes de trackpad par carte */
  let top = 0;
  let range = 0;
  let ticking = false;

  /* Même centrage que la visite guidée : le bloc épinglé fait la hauteur de son
     contenu, c'est son `top` qui le pose au milieu de la fenêtre. La hauteur de
     défilement, elle, se calcule ici plutôt qu'en CSS : à hauteur fixe en vh, le
     créneau se serait resserré à chaque carte ajoutée ou à chaque bloc plus haut. */
  const measure = () => {
    const h = pin.offsetHeight;
    const lead = Math.max(0, Math.round((window.innerHeight - h) / 2));
    pin.style.top = lead + 'px';
    sec.style.height = Math.round(h + N * SLOT * window.innerHeight) + 'px';
    top = sec.getBoundingClientRect().top + window.pageYOffset - lead;
    range = Math.max(1, sec.offsetHeight - h);
  };
  const update = () => {
    ticking = false;
    if (sec.classList.contains('is-live')) {
      const p = Math.max(0, Math.min(1, (window.pageYOffset - top) / range));
      show(Math.min(N - 1, Math.floor(p * N)));
      return;
    }
    const mid = window.innerHeight / 2;
    let best = 0;
    let near = Infinity;
    items.forEach((it, k) => {
      const r = it.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < near) { near = d; best = k; }
    });
    show(best);
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };

  const setMode = () => {
    if (wide.matches) {
      sec.classList.add('is-live');
      measure();
    } else {
      sec.classList.remove('is-live');
      pin.style.top = '';
      sec.style.height = '';
    }
    update();
  };

  items.forEach((it, k) => {
    const hit = it.querySelector<HTMLElement>('.v-hit');
    if (!hit) return;
    offs.push(listen(hit, 'click', () => {
      if (sec.classList.contains('is-live')) {
        measure();
        window.scrollTo({ top: Math.round(top + range * ((k + .5) / N)), behavior: 'smooth' });
      } else {
        it.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }));
  });

  offs.push(listen(window, 'scroll', onScroll, { passive: true }));
  offs.push(listen(window, 'resize', setMode));
  wide.addEventListener('change', setMode);
  offs.push(() => wide.removeEventListener('change', setMode));

  /* La hauteur de la rangée bouge d'une carte à l'autre : on resuit le bloc,
     sinon le centrage se fige sur la mesure de la première. */
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => {
      if (sec.classList.contains('is-live')) { measure(); update(); }
    });
    ro.observe(pin);
    offs.push(() => ro.disconnect());
  }

  setMode();
  return () => {
    offs.forEach((off) => off());
    cancelAnimationFrame(r1);
    cancelAnimationFrame(r2);
    sec.style.height = '';
    pin.style.top = '';
  };
}

/* Visite guidée de l'interface. La section est épinglée sur ~1,6 écran de
   défilement ; la progression p (0 → 1) choisit l'étape active, remplit le rail
   jusqu'à elle et fait glisser l'écran correspondant. Le bloc épinglé fait la
   hauteur de son contenu : c'est son `top` qui le centre dans la fenêtre, pour
   que la section démarre sur son titre et garde le pas des autres. En dessous
   de 860px, c'est la scène qui se colle en haut de l'écran et les étapes qui
   défilent dessous : l'active est la dernière passée sous la ligne de
   mi-fenêtre, le rail avance entre elle et la suivante. */
function tour(): Off {
  const tourEl = document.querySelector<HTMLElement>('.tour');
  if (!tourEl) return () => {};
  const steps = Array.from(tourEl.querySelectorAll<HTMLElement>('.tour-step'));
  const shots = Array.from(tourEl.querySelectorAll<HTMLElement>('.shot'));
  const pin = tourEl.querySelector<HTMLElement>('.tour-pin');
  const list = tourEl.querySelector<HTMLElement>('.tour-list');
  const rail = tourEl.querySelector<HTMLElement>('.tour-rail i');
  const stage = tourEl.querySelector<HTMLElement>('.tour-stage');
  const grid = tourEl.querySelector<HTMLElement>('.tour-grid');
  const copy = tourEl.querySelector<HTMLElement>('.tour-copy');
  const N = steps.length;
  if (!pin || N < 2 || shots.length !== N) return () => {};
  const offs: Off[] = [];

  const pinned = window.matchMedia('(min-width: 861px)');

  /* Sous 860px, pas de colonne de droite : la scène vient entre le titre et la
     liste, où elle se colle en haut de l'écran (voir styles.css). Au-dessus,
     elle retrouve sa place dans la grille. */
  const place = () => {
    if (!stage) return;
    if (pinned.matches) {
      if (grid && stage.parentNode !== grid) grid.appendChild(stage);
      return;
    }
    if (copy && list && !(stage.parentNode === copy && stage.nextSibling === list)) copy.insertBefore(stage, list);
  };

  /* La carte verte en encoche du device suit l'étape : ses deux lignes se
     fondent, changent, reviennent. */
  const stat = tourEl.querySelector<HTMLElement>('.device-stat');
  let swapT = 0;
  const setStat = (i: number) => {
    if (!stat) return;
    const st = steps[i];
    const b = stat.querySelector('b');
    const l = stat.querySelector('i');
    if (!st.hasAttribute('data-stat')) return;      /* pas de chiffre : la carte s'efface avec le sien */
    clearTimeout(swapT);
    stat.classList.add('is-swap');
    swapT = window.setTimeout(() => {
      if (b) b.textContent = st.getAttribute('data-stat') || '';
      if (l) l.textContent = st.getAttribute('data-stat-label') || '';
      stat.classList.remove('is-swap');
    }, 180);
  };

  let active = -1;
  const show = (i: number) => {
    if (i === active) return;
    active = i;
    steps.forEach((s, k) => {
      s.classList.toggle('is-on', k === i);
      const b = s.querySelector('.ts-hit');
      if (b) {
        if (pinned.matches) b.setAttribute('aria-expanded', k === i ? 'true' : 'false'); else b.removeAttribute('aria-expanded');   /* en flux, tout est déplié */
        if (k === i) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
      }
    });
    place();
    shots.forEach((s, k) => {
      s.classList.toggle('is-on', k === i);
      s.classList.toggle('is-past', k < i);
    });
    /* L'étape « téléphone » : le cadre devient le téléphone (voir .is-phone) */
    if (stage) stage.classList.toggle('is-phone', steps[i].getAttribute('data-view') === 'phone');
    setStat(i);
  };

  /* Le rail se remplit jusqu'au centre de l'étape active, puis glisse vers la suivante. */
  const center = (k: number) => steps[k].offsetTop + steps[k].offsetHeight / 2;
  const fill = (p: number) => {
    if (!rail || !list) return;
    const x = p * N;
    const i = Math.min(N - 1, Math.floor(x));
    const f = x - i;
    const from = center(i);
    const to = i < N - 1 ? center(i + 1) : list.offsetHeight;
    rail.style.height = Math.round(from + (to - from) * f) + 'px';
  };

  let top = 0;
  let range = 0;
  let ticking = false;

  /* `lead` : l'air au-dessus du bloc une fois collé, soit de quoi le centrer.
     L'épinglage démarre donc `lead` px avant le haut de la section, et dure le
     temps que le bloc parcoure ce qu'il reste de sa hauteur. La hauteur de
     référence est celle du bloc avec son étape la plus haute dépliée (les
     corps rendus sont retranchés, le plus grand ajouté) : le bloc est posé une
     fois pour toutes, il ne se recentre pas à chaque étape. */
  const refHeight = () => {
    const h = pin.offsetHeight;
    if (!copy) return h;
    let rendered = 0;
    let biggest = 0;
    steps.forEach((s) => {
      const b = s.querySelector<HTMLElement>('.ts-body');
      const d = b && b.firstElementChild;
      if (!b) return;
      rendered += b.offsetHeight;
      biggest = Math.max(biggest, d ? d.scrollHeight : 0);
    });
    return Math.max(copy.offsetHeight - rendered + biggest, stage ? stage.offsetHeight : 0);
  };
  const measure = () => {
    const h = refHeight();
    const lead = Math.max(0, Math.round((window.innerHeight - h) / 2));
    pin.style.top = lead + 'px';
    top = tourEl.getBoundingClientRect().top + window.pageYOffset - lead;
    range = Math.max(1, tourEl.offsetHeight - h);
  };
  /* En flux (sous 860px) : la ligne d'activation est à mi-fenêtre. L'étape
     active est la dernière dont le haut est passé dessous ; le rail avance
     entre son centre et celui de la suivante. Les positions viennent de la
     mise en page (offsetTop), pas des rectangles : le bloc entre et sort de
     l'écran avec une transformation (.sec-anim). */
  let line = 0;
  const measureFlow = () => { line = Math.round(window.innerHeight * .5); };
  const updateFlow = () => {
    const y = window.pageYOffset + line;
    const tops = steps.map(docTop);
    let k = 0;
    for (let j = 1; j < N; j++) if (tops[j] <= y) k = j;
    const a = tops[k];
    const b = k < N - 1 ? tops[k + 1] : a + steps[k].offsetHeight;
    const f = Math.max(0, Math.min(1, (y - a) / Math.max(1, b - a)));
    show(k);
    fill((k + f) / N);
  };
  const stepY = (k: number) => Math.round(docTop(steps[k]) - line + 2);   /* le défilement qui amène l'étape k sur la ligne */

  const update = () => {
    ticking = false;
    if (tourEl.classList.contains('is-flow')) { updateFlow(); return; }
    if (!tourEl.classList.contains('is-live')) return;
    const p = Math.max(0, Math.min(1, (window.pageYOffset - top) / range));
    show(Math.min(N - 1, Math.floor(p * N)));
    fill(p);
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };

  const setMode = () => {
    if (pinned.matches) {
      tourEl.classList.remove('is-flow');
      tourEl.classList.add('is-live');
      place();
      measure(); update();
    } else {
      tourEl.classList.remove('is-live');
      tourEl.classList.add('is-flow');
      pin.style.top = '';
      place();
      measureFlow(); update();
    }
  };

  steps.forEach((s, k) => {
    const b = s.querySelector<HTMLElement>('.ts-hit');
    if (!b) return;
    offs.push(listen(b, 'click', () => {
      if (tourEl.classList.contains('is-live')) {
        measure();
        window.scrollTo({ top: Math.round(top + range * ((k + .5) / N)), behavior: 'smooth' });
      } else {
        window.scrollTo({ top: stepY(k), behavior: 'smooth' });   /* l'étape vient sous la scène */
      }
    }));
  });

  offs.push(listen(window, 'scroll', onScroll, { passive: true }));
  offs.push(listen(window, 'resize', setMode));
  pinned.addEventListener('change', setMode);
  offs.push(() => pinned.removeEventListener('change', setMode));

  /* Le centrage dépend de la hauteur du bloc : on la resuit, sinon une mesure
     prise pendant le repli des étapes (retour du mobile au desktop, chargement
     des polices) fige un `top` trop court. */
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => {
      if (tourEl.classList.contains('is-live')) { measure(); update(); }
      else if (tourEl.classList.contains('is-flow')) update();
    });
    ro.observe(pin);
    offs.push(() => ro.disconnect());
  }

  setMode();
  return () => {
    offs.forEach((off) => off());
    clearTimeout(swapT);
    pin.style.top = '';
  };
}

/* Accueil : les scripts de la page du prototype, branchés sur le balisage rendu par le serveur */
export default function HomeEffects() {
  useEffect(() => {
    const offs = [counters(), proof(), values()];
    return () => offs.forEach((off) => off());
  }, []);

  /* La visite déplace la scène dans le DOM en mobile : son nettoyage la remet à sa
     place avant que React ne retire la page (effet de mise en page, joué avant). */
  useLayoutEffect(() => {
    const off = tour();
    const grid = document.querySelector('.tour-grid');
    const stage = document.querySelector('.tour-stage');
    return () => {
      off();
      if (grid && stage && stage.parentNode !== grid) grid.appendChild(stage);
    };
  }, []);

  return null;
}
