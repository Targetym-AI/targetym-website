'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import UcCard, { cardText } from './UcCard';
import { groups, modCases } from '@/lib/site/use-cases';

type View = 'grid' | 'list' | 'compact';

const ROLES: Array<[string, string]> = [['*', 'Tous'], ['drh', 'DRH'], ['manager', 'Manager'], ['collab', 'Collaborateur'], ['direction', 'Direction']];

function norm(s: string) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/* Cas d'usage : famille de modules, rôle et recherche se combinent sur la même
   liste. Un #hash qui vise une famille la sélectionne ; un #hash qui vise une
   carte (uc-conges) sélectionne sa famille, la fait défiler et la met en
   évidence : c'est ce qu'envoient les « En savoir plus » de Solutions. */
export default function UseCasesExplorer() {
  const [cat, setCat] = useState('*');
  const [role, setRole] = useState('*');
  const [query, setQuery] = useState('');
  const [view, setView] = useState<View>('grid');
  const rootRef = useRef<HTMLElement>(null);

  const texts = useMemo(() => modCases.map((c) => norm(cardText(c))), []);
  const q = norm(query.trim());
  const shown = modCases.map((c, i) =>
    (cat === '*' || c.fam === cat) && (role === '*' || c.role === role) && (!q || texts[i].indexOf(q) >= 0));
  const n = shown.filter(Boolean).length;

  const fromHash = useCallback(() => {
    const h = window.location.hash.slice(1);
    if (!/^[\w-]+$/.test(h)) return;
    const el = document.getElementById(h) || document.getElementById(`uc-${h}`);
    const flash = (target: HTMLElement) => {
      target.classList.remove('is-hl');
      void target.offsetWidth;                          /* relance l'animation si la carte était déjà visée */
      target.classList.add('is-hl');
      target.scrollIntoView({ block: 'center' });
    };
    if (el && !el.classList.contains('post')) {   /* la une (uc-agent) : pas de filtre, juste la mise en évidence */
      if (el.classList.contains('uc-feature')) flash(el);
      return;
    }
    const fam = el ? el.getAttribute('data-cat') : h;
    if (!groups.some((g) => g.key === fam)) return;
    flushSync(() => {
      setCat(fam!);
      if (el) {                                     /* une carte visée doit être visible : rôle et recherche remis à zéro */
        setRole('*');
        setQuery('');
      }
    });
    if (el) flash(el);
    else rootRef.current?.scrollIntoView();
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', fromHash);
    const raf = requestAnimationFrame(fromHash);
    return () => {
      window.removeEventListener('hashchange', fromHash);
      cancelAnimationFrame(raf);
    };
  }, [fromHash]);

  const tab = (on: boolean) => (on ? 'tab is-on' : 'tab');

  return (
    <section className="section sec-anim" aria-labelledby="all-title" data-uc ref={rootRef}>
      <div className="blog-top">
        <p className="eyebrow left" id="all-title">Un cas d&apos;usage par module</p>
        <span className="count" aria-live="polite">{n} cas d&apos;usage</span>
      </div>
      <div className="toolbar">
        <label className="search"><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg><input type="search" placeholder="Rechercher une situation, un module…" aria-label="Rechercher un cas d'usage" autoComplete="off" value={query} onChange={(e) => setQuery(e.target.value)} /></label>
        <div className="seg" role="group" aria-label="Filtrer par rôle">
          {ROLES.map(([key, label]) => (
            <button key={key} className={tab(role === key)} type="button" data-role={key} onClick={() => setRole(key)}>{label}</button>
          ))}
        </div>
        <div className="seg views" role="group" aria-label="Affichage">
          <button className={tab(view === 'grid')} type="button" data-view="grid" aria-label="Grille" aria-pressed={view === 'grid'} onClick={() => setView('grid')}><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="2" /><rect x="13.5" y="3.5" width="7" height="7" rx="2" /><rect x="3.5" y="13.5" width="7" height="7" rx="2" /><rect x="13.5" y="13.5" width="7" height="7" rx="2" /></svg></button>
          <button className={tab(view === 'list')} type="button" data-view="list" aria-label="Liste" aria-pressed={view === 'list'} onClick={() => setView('list')}><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="6" height="5" rx="1.5" /><path d="M12.5 6.5H20M12.5 9h5" /><rect x="3.5" y="14" width="6" height="5" rx="1.5" /><path d="M12.5 15.5H20M12.5 18h5" /></svg></button>
          <button className={tab(view === 'compact')} type="button" data-view="compact" aria-label="Compact" aria-pressed={view === 'compact'} onClick={() => setView('compact')}><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg></button>
        </div>
      </div>
      <div className="filters" role="group" aria-label="Filtrer par famille de modules">
        <button className={tab(cat === '*')} type="button" data-filter="*" onClick={() => setCat('*')}>Tous les modules</button>
        {groups.map((g) => (
          <button key={g.key} className={tab(cat === g.key)} type="button" data-filter={g.key} onClick={() => setCat(g.key)}>{g.name} <span className="n">{modCases.filter((c) => c.fam === g.key).length}</span></button>
        ))}
      </div>
      <ul className={`post-grid uc-grid is-${view}`} data-uc-grid>
        {modCases.map((c, i) => <UcCard key={c.id} c={c} i={i} hidden={!shown[i]} />)}
      </ul>
      <p className="post-empty" hidden={n > 0}>Aucun cas d&apos;usage ne correspond à cette recherche. Essayez un autre mot, un autre module ou un autre rôle.</p>
    </section>
  );
}
