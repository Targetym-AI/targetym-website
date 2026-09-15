'use client';

import { useEffect, useRef, useState } from 'react';

export type TocItem = { id: string; k?: string; label: string };

/* Sommaire des pages légales : suit la lecture et garde l'article en cours visible */
export default function LegalToc({ items }: { items: TocItem[] }) {
  const [current, setCurrent] = useState(items[0]?.id);
  const box = useRef<HTMLElement>(null);

  useEffect(() => {
    const heads = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => !!el);
    let frame = 0;
    const update = () => {
      frame = 0;
      let id = heads[0]?.id;
      for (const head of heads) {
        if (head.getBoundingClientRect().top > window.innerHeight * 0.3) break;
        id = head.id;
      }
      setCurrent(id);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  useEffect(() => {
    const el = box.current;
    const link = el?.querySelector<HTMLElement>('a.is-on');
    if (!el || !link) return;
    const top = link.offsetTop - el.offsetTop;
    if (top < el.scrollTop || top + link.offsetHeight > el.scrollTop + el.clientHeight) el.scrollTop = top - el.clientHeight / 3;
  }, [current]);

  return (
    <nav className="legal-toc" aria-label="Sommaire" ref={box}>
      <p className="eyebrow">Sommaire</p>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a className={[item.k ? '' : 'is-plain', item.id === current ? 'is-on' : ''].join(' ').trim() || undefined} href={`#${item.id}`} aria-current={item.id === current ? 'location' : undefined}>
              {item.k && <b>{item.k}</b>}<span>{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
