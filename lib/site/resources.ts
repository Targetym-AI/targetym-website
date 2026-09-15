import { SERVER_FETCH_HEADERS } from '@/lib/http';
import { API_URL } from '@/lib/site/blog';

/* Vidéos tutorielles et webinaires : l'API publique de Targetym (reprise de l'ancienne page Ressources) */
export interface Resource {
  id: number;
  title: string;
  description: string | null;
  video_url: string | null;
  file_url: string | null;
  thumbnail_url: string | null;
  resource_type: 'video' | 'pdf' | 'link' | string;
  duration_minutes: number | null;
  category_id: number;
  category_name: string;
}

export interface ResourcesData {
  categories: { id: number; name: string; description: string | null }[];
  resources: Resource[];
  total: number;
}

export interface PublicWebinar {
  id: number;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  presenter_name: string | null;
  webinar_date: string | null;
  duration_minutes: number | null;
  replay_url: string | null;
  registration_url: string | null;
  max_attendees: number | null;
  status: string;
}

export async function fetchResources(): Promise<ResourcesData> {
  try {
    const res = await fetch(`${API_URL}/api/public/resources`, { cache: 'no-store', headers: SERVER_FETCH_HEADERS });
    if (!res.ok) return { categories: [], resources: [], total: 0 };
    return res.json();
  } catch {
    return { categories: [], resources: [], total: 0 };
  }
}

export async function fetchWebinars(): Promise<PublicWebinar[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/webinars`, { cache: 'no-store', headers: SERVER_FETCH_HEADERS });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export type VideoEmbed = { type: 'iframe' | 'video'; src: string };

/** Convertit une URL vidéo en lecteur intégré. Retourne { type, src } ou null. */
export function getVideoEmbed(url: string): VideoEmbed | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com') && u.searchParams.get('v')) {
      return { type: 'iframe', src: `https://www.youtube.com/embed/${u.searchParams.get('v')}` };
    }
    if (u.hostname === 'youtu.be') {
      return { type: 'iframe', src: `https://www.youtube.com/embed${u.pathname}` };
    }
    if (u.pathname.includes('/embed/')) {
      return { type: 'iframe', src: url };
    }
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.replace(/^\//, '');
      if (/^\d+$/.test(id)) return { type: 'iframe', src: `https://player.vimeo.com/video/${id}` };
    }
    // Fichier vidéo direct ou URL non reconnue → lecture native (jamais de nouvel onglet)
    return { type: 'video', src: url };
  } catch {
    return null;
  }
}

/* Les titres de la chaîne portent un suffixe de référencement (« … - SIRH ») : on le retire */
export function cleanTitle(t: string) {
  return t.replace(/^SIRH\s*[-–—]\s*/i, '').replace(/\s*[-–—]\s*SIRH$/i, '').trim();
}

/* Le titre en gros de la vignette : sans « dans Targetym AI », déjà écrit par le logo */
export function thumbTitle(t: string) {
  return cleanTitle(t).replace(/\s+(dans|sur|avec)\s+Targetym\s+AI\b.*$/i, '').trim();
}

/* Les noms saisis en capitales (CAKPO, TARGETYM) reprennent une casse normale ; les sigles restent */
export function fixCaps(s: string) {
  return s.replace(/[A-ZÀ-ÖØ-Þ]{4,}/g, (w) => w.charAt(0) + w.slice(1).toLowerCase());
}

const DAKAR = 'Africa/Dakar';

export function webinarDay(iso: string) {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString('fr-FR', { day: 'numeric', timeZone: DAKAR }),
    month: d.toLocaleDateString('fr-FR', { month: 'short', timeZone: DAKAR }).replace(/\.$/, ''),
  };
}

/* « Vendredi 8 mai 2026 · 11h00 » */
export function webinarWhen(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: DAKAR });
  const time = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: DAKAR }).replace(':', 'h');
  return `${date.charAt(0).toUpperCase()}${date.slice(1)} · ${time}`;
}
