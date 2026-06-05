'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Play, Clock } from 'lucide-react';

interface VideoCardProps {
  embed: { type: 'iframe' | 'video'; src: string };
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  durationMinutes: number | null;
  typeBadge: React.ReactNode;
}

export default function VideoCard({
  embed,
  title,
  description,
  thumbnailUrl,
  durationMinutes,
  typeBadge,
}: VideoCardProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all">
      {/* Zone vidéo */}
      <div className="relative aspect-video bg-gray-900">
        {playing ? (
          embed.type === 'iframe' ? (
            <iframe
              src={`${embed.src}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <video
              src={embed.src}
              controls
              autoPlay
              className="absolute inset-0 w-full h-full"
              poster={thumbnailUrl ?? undefined}
            />
          )
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="relative w-full h-full focus:outline-none"
            aria-label={`Lire la vidéo : ${title}`}
          >
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={75}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <Play className="w-12 h-12 text-gray-400" />
              </div>
            )}
            {/* Overlay play button */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 rounded-full bg-white/90 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-primary-600 translate-x-0.5" fill="currentColor" />
              </span>
            </span>
            {/* Durée */}
            {durationMinutes && (
              <span className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                <Clock className="w-3 h-3" />
                {durationMinutes} min
              </span>
            )}
          </button>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          {typeBadge}
          {durationMinutes && !playing && (
            <span className="text-xs text-gray-400">{durationMinutes} min</span>
          )}
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        )}
      </div>
    </div>
  );
}
