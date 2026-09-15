'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { VideoEmbed } from '@/lib/site/resources';

type Props = {
  embed: VideoEmbed | null;
  href: string | null;
  thumb: string;
  title: string;
  text: string;
  tag: string;
};

/* Carte vidéo : la vignette dessinée du prototype (le logo, le titre en gros, le
   bouton lecture). Au clic, la vidéo se lit dans la vignette, sans quitter la
   page ; sans script, le lien mène à la vidéo. Un PDF ou un lien s'ouvre à côté. */
export default function VideoCard({ embed, href, thumb, title, text, tag }: Props) {
  const [playing, setPlaying] = useState(false);
  const body = <div className="vid-body"><span className="tag">{tag}</span><h3>{title}</h3>{text && <p>{text}</p>}</div>;

  if (playing && embed) {
    return (
      <li className="vid">
        <div>
          <div className="vid-thumb is-playing">
            {embed.type === 'iframe'
              ? <iframe src={`${embed.src}?autoplay=1`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
              : <video src={embed.src} controls autoPlay />}
          </div>
          {body}
        </div>
      </li>
    );
  }

  const external = !embed && href ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <li className="vid">
      <a href={href || undefined} {...external} onClick={(e) => { if (embed) { e.preventDefault(); setPlaying(true); } }}>
        <div className="vid-thumb" aria-hidden="true"><span className="brand"><Image src="/img/logo-targetym-dark.avif" alt="" width={384} height={58} /></span><strong>{thumb}</strong><span className="vid-play">{embed ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg> : '↗'}</span></div>
        {body}
      </a>
    </li>
  );
}
