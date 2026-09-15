'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type Drop = 'uc' | 'res' | null;

/* Barre de nav du prototype : burger en mobile (sous 860 px), menus « Cas d'usage »
   et « Ressources » ouverts au survol et au focus (CSS) comme au clic ; Échap ou
   un clic ailleurs les referment. Sur l'accueil, la barre loge dans l'encoche de la
   photo ; ailleurs elle prend toute la largeur (.nav-full). */
export default function SiteNav() {
  const pathname = usePathname() || '/';
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<Drop>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const nav = navRef.current;
      if (!nav || !(e.target instanceof Node)) return;
      if (!nav.contains(e.target)) setOpen(false);
      const inDrop = (e.target instanceof Element && e.target.closest('.nav-drop')) || null;
      if (!inDrop || !nav.contains(inDrop)) setDrop(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      setDrop(null);
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  /* Changement de page : tout se referme, et le focus quitte le menu (sinon :focus-within le garde ouvert) */
  useEffect(() => {
    setOpen(false);
    setDrop(null);
    const active = document.activeElement;
    if (active instanceof HTMLElement && navRef.current?.contains(active)) active.blur();
  }, [pathname]);

  const toggleDrop = (d: Exclude<Drop, null>) => setDrop((cur) => (cur === d ? null : d));
  const is = (href: string) => pathname === href;
  const active = (href: string) => (is(href) ? { className: 'is-active', 'aria-current': 'page' as const } : {});
  const ucActive = pathname === '/use-cases' || pathname.startsWith('/use-cases/');
  const resActive = is('/blog') || is('/resources');
  const dropClass = (base: string, d: Exclude<Drop, null>, on: boolean) =>
    [base, on && 'is-active', drop === d && 'is-open'].filter(Boolean).join(' ');

  return (
    <header ref={navRef} className={['nav', pathname !== '/' && 'nav-full', open && 'is-open'].filter(Boolean).join(' ')}>
      <div className="nav-bar">
        <Link className="brand" href="/"><Image src="/img/logo-targetym-dark.avif" alt="Targetym AI" width={384} height={58} priority /></Link>
        <nav className="nav-links" id="nav-menu" aria-label="Navigation principale">
          <Link href="/solutions" {...active('/solutions')}>Solutions</Link>
          <div className={dropClass('nav-drop nav-drop-uc', 'uc', ucActive)}>
            <button className="nav-drop-btn" type="button" aria-expanded={drop === 'uc'} aria-haspopup="true" aria-controls="nav-uc" onClick={() => toggleDrop('uc')}>Cas d&apos;usage <svg className="nav-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg></button>
            <div className="nav-drop-menu is-mega" id="nav-uc">
              <div className="nav-mega-group"><b>01 · Recrutement &amp; onboarding</b><Link href="/use-cases/recrutement">Recrutement</Link><Link href="/use-cases/onboarding">Onboarding</Link></div>
              <div className="nav-mega-group"><b>02 · Administration RH</b><Link href="/use-cases/personnel">Gestion du personnel</Link><Link href="/use-cases/conges">Congés &amp; absences</Link><Link href="/use-cases/documents">Documents RH</Link><Link href="/use-cases/budget">Budget RH</Link></div>
              <div className="nav-mega-group"><b>03 · Performance &amp; OKR</b><Link href="/use-cases/performance">Performance &amp; feedback</Link><Link href="/use-cases/okr">OKR &amp; objectifs</Link></div>
              <div className="nav-mega-group"><b>04 · Talents &amp; formation</b><Link href="/use-cases/talents">Gestion des talents</Link><Link href="/use-cases/formation">Formation</Link></div>
              <div className="nav-mega-group"><b>05 · Paie &amp; rémunération</b><Link href="/use-cases/paie">Module paie</Link><Link href="/use-cases/compensation">Compensation &amp; benefits</Link></div>
              <div className="nav-mega-group"><b>06 · Pilotage RH</b><Link href="/use-cases/analytics">People analytics</Link><Link href="/use-cases/missions">Gestion des missions</Link></div>
              <div className="nav-mega-group"><b>07 · Conformité &amp; départs</b><Link href="/use-cases/contentieux">Gestion des contentieux</Link><Link href="/use-cases/departs">Gestion des départs</Link></div>
              <div className="nav-mega-group nav-mega-agent"><b>Transversal</b><Link href="/use-cases/agent">Le super-agent IA</Link></div>
              <Link className="nav-mega-all" href="/use-cases">Tous les cas d&apos;usage <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <Link href="/pricing" {...active('/pricing')}>Tarifs</Link>
          <div className={dropClass('nav-drop', 'res', resActive)}>
            <button className="nav-drop-btn" type="button" aria-expanded={drop === 'res'} aria-haspopup="true" aria-controls="nav-res" onClick={() => toggleDrop('res')}>Ressources <svg className="nav-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg></button>
            <div className="nav-drop-menu" id="nav-res"><Link href="/blog" {...active('/blog')}><b>Blog</b><i>Conseils, tendances et retours d&apos;expérience</i></Link> <Link href="/resources" {...active('/resources')}><b>Vidéos</b><i>Tutoriels et webinaires live</i></Link></div>
          </div>
          <Link href="/contact" {...active('/contact')}>Contact</Link>
          {' '}
          <Link className="nav-login" href="/login">Connexion</Link>
        </nav>
        <div className="nav-actions"><button className="lang" type="button" aria-label="Changer de langue">FR <span aria-hidden="true">◐</span></button> <Link className="btn btn-outline" href="/login">Connexion <span aria-hidden="true">→</span></Link> <button className="nav-burger" type="button" aria-label="Menu" aria-expanded={open} aria-controls="nav-menu" onClick={() => setOpen((o) => !o)}><i></i></button></div>
      </div>
    </header>
  );
}
