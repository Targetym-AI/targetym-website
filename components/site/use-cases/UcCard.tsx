import Image from 'next/image';
import Link from 'next/link';
import { fr, roles, type UseCase } from '@/lib/site/use-cases';

/* Une carte : l'écran, le module et le rôle, le titre, la situation en une
   ligne, puis l'avant → après. Tout le reste est sur la page de détail. */
export default function UcCard({ c, i, hidden }: { c: UseCase; i: number; hidden?: boolean }) {
  const href = `/use-cases/${c.id}`;
  return (
    <li className="post uc" id={`uc-${c.id}`} data-cat={c.fam} data-role={c.role} data-order={i} hidden={hidden}>
      <Link className="bl-media" href={href} tabIndex={-1} aria-hidden="true" data-cut>
        <Image src={c.img} alt="" width={1100} height={600} />
        <span className="dock dock-br"><span className="round">↗</span></span>
      </Link>
      <span className="tags"><span className="tag">{fr(c.short)}</span><span className="tag role">{fr(roles[c.role].tag)}</span></span>
      <h3><Link href={href}>{fr(c.title)}</Link></h3>
      <p className="uc-sit">{fr(c.situation)}</p>
      <p className="uc-delta">
        <span><i>Avant</i><b>{fr(c.before)}</b></span>
        <span className="uc-arrow" aria-hidden="true">→</span>
        <span><i>{c.fam === 'agent' ? 'Avec l\'agent' : 'Avec le module'}</i><b>{fr(c.after)}</b></span>
      </p>
    </li>
  );
}

/** Le texte de la carte tel que le lit la recherche (textContent du prototype) */
export function cardText(c: UseCase): string {
  return ['↗', c.short, roles[c.role].tag, c.title, c.situation, 'Avant', c.before, '→', c.fam === 'agent' ? 'Avec l\'agent' : 'Avec le module', c.after]
    .map(fr)
    .join('');
}
