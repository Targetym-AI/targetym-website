import Link from 'next/link';
import { FileText, ExternalLink, BookOpen, Layers, Play, GraduationCap } from 'lucide-react';
import VideoCard from '@/components/VideoCard';
import WebinarsSection from '@/components/WebinarsSection';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.targetym.ai';

interface Resource {
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

interface ResourcesData {
  categories: { id: number; name: string; description: string | null }[];
  resources: Resource[];
  total: number;
}

export const metadata = {
  title: 'Vidéos tutorielles — Targetym AI',
  description:
    'Guides, vidéos et outils pratiques pour moderniser la gestion des ressources humaines avec Targetym AI.',
};

async function fetchResources(): Promise<ResourcesData> {
  try {
    const res = await fetch(`${API_URL}/api/public/resources`, {
      cache: 'no-store',
    });
    if (!res.ok) return { categories: [], resources: [], total: 0 };
    return res.json();
  } catch {
    return { categories: [], resources: [], total: 0 };
  }
}

interface PublicWebinar {
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

async function fetchWebinars(): Promise<PublicWebinar[]> {
  try {
    const res = await fetch(`${API_URL}/api/public/webinars`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/** Préfixe les URLs relatives (/media-uploads/...) avec l'URL de l'API */
function mediaUrl(url?: string | null): string {
  if (!url) return '';
  return url.startsWith('/') ? `${API_URL}${url}` : url;
}

/** Convertit une URL vidéo en embed. Retourne { type, src } ou null. */
function getVideoEmbed(url: string): { type: 'iframe' | 'video'; src: string } | null {
  try {
    const u = new URL(url);
    // YouTube
    if (u.hostname.includes('youtube.com') && u.searchParams.get('v')) {
      return { type: 'iframe', src: `https://www.youtube.com/embed/${u.searchParams.get('v')}` };
    }
    if (u.hostname === 'youtu.be') {
      return { type: 'iframe', src: `https://www.youtube.com/embed${u.pathname}` };
    }
    if (u.pathname.includes('/embed/')) {
      return { type: 'iframe', src: url };
    }
    // Vimeo
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.replace(/^\//, '');
      if (/^\d+$/.test(id)) return { type: 'iframe', src: `https://player.vimeo.com/video/${id}` };
    }
    // Fichier vidéo direct ou URL non reconnue → lecture native (jamais de nouvel onglet)
    return { type: 'video', src: url };
  } catch {
    /* URL invalide */
    return null;
  }
}

function typeLabel(type: string) {
  if (type === 'video') return 'Vidéo';
  if (type === 'pdf') return 'PDF';
  return 'Lien';
}

function typeColor(type: string) {
  if (type === 'video') return 'bg-red-100 text-red-600';
  if (type === 'pdf') return 'bg-orange-100 text-orange-600';
  return 'bg-primary-100 text-primary-600';
}

function typeIcon(type: string) {
  if (type === 'video') return <Play className="w-4 h-4" />;
  if (type === 'pdf') return <FileText className="w-4 h-4" />;
  return <ExternalLink className="w-4 h-4" />;
}

function resourceHref(resource: Resource) {
  return resource.video_url || resource.file_url || '#';
}

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: { category?: string; tab?: string };
}) {
  const [data, webinars] = await Promise.all([fetchResources(), fetchWebinars()]);
  const { categories, resources } = data;
  const activeMainTab = searchParams.tab === 'formations' ? 'formations' : 'resources';

  const activeCategory = searchParams.category
    ? Number(searchParams.category)
    : null;

  const filtered = activeCategory
    ? resources.filter((r) => r.category_id === activeCategory)
    : resources;

  const isEmpty = resources.length === 0;

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-secondary-100 text-secondary-700 text-xs font-semibold rounded-full mb-5 uppercase tracking-wider">
            Centre de Ressources
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5">
            {activeMainTab === 'formations' ? 'Webinaires live' : 'Vidéos tutorielles'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {activeMainTab === 'formations'
              ? 'Webinaires live animés par l\u2019équipe Targetym AI pour booster vos pratiques RH.'
              : 'Vidéos, guides PDF et liens utiles pour maximiser votre usage de\u00a0Targetym\u00a0AI et rester à la pointe des pratiques RH.'}
          </p>
        </div>
      </section>

      {/* Navigation onglets principaux */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-0 overflow-x-auto scrollbar-hide">
            <Link
              href="/resources?tab=formations"
              className={`flex items-center gap-2 flex-none px-5 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeMainTab === 'formations'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Webinaires live
              {webinars.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full">{webinars.length}</span>
              )}
            </Link>
            <Link
              href="/resources"
              className={`flex items-center gap-2 flex-none px-5 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeMainTab === 'resources'
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Vidéos tutorielles
            </Link>
          </nav>
        </div>
      </div>

      {/* ─── ONGLET FORMATIONS GRATUITES ─── */}
      {activeMainTab === 'formations' && (
        <section className="py-16 bg-gray-50 min-h-[40vh]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <WebinarsSection webinars={webinars} />
          </div>
        </section>
      )}

      {/* ─── ONGLET RESSOURCES ─── */}
      {activeMainTab === 'resources' && (<>

      {/* Sous-onglets catégories */}
      {categories.length > 0 && (
        <div className="border-b border-gray-100 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <nav className="flex gap-1 overflow-x-auto scrollbar-hide py-3">
              <Link
                href="/resources"
                className={`flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  !activeCategory
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                Toutes les vidéos
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/resources?category=${cat.id}`}
                  className={`flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-16 bg-gray-50 min-h-[40vh]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {isEmpty ? (
            <div className="text-center py-20">
              <Layers className="mx-auto w-14 h-14 text-gray-300 mb-5" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                Vidéos tutorielles bientôt disponibles
              </h3>
              <p className="text-gray-400 text-sm">
                Notre équipe prépare des contenus de qualité pour vous.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="mx-auto w-14 h-14 text-gray-300 mb-5" />
              <p className="text-gray-400">Aucune vidéo dans cette catégorie.</p>
              <Link
                href="/resources"
                className="mt-4 inline-block text-sm text-primary-600 hover:underline"
              >
                Voir toutes les vidéos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((resource) => {
                const embed = resource.resource_type === 'video' && resource.video_url
                  ? getVideoEmbed(resource.video_url)
                  : null;
                const href = resourceHref(resource);
                const isExternal = href !== '#';

                // Carte vidéo avec miniature + lecture inline au clic
                if (embed) {
                  return (
                    <VideoCard
                      key={resource.id}
                      embed={embed}
                      title={resource.title}
                      description={resource.description}
                      thumbnailUrl={resource.thumbnail_url ? mediaUrl(resource.thumbnail_url) : null}
                      durationMinutes={resource.duration_minutes}
                      typeBadge={
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${typeColor(resource.resource_type)}`}>
                          {typeIcon(resource.resource_type)}
                          {typeLabel(resource.resource_type)}
                        </span>
                      }
                    />
                  );
                }

                // Carte PDF / lien
                return (
                  <a
                    key={resource.id}
                    href={isExternal ? href : undefined}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className={`group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all ${isExternal ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      {resource.thumbnail_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={mediaUrl(resource.thumbnail_url)}
                          alt={resource.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className={`p-4 rounded-full ${typeColor(resource.resource_type)}`}>
                            {typeIcon(resource.resource_type)}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${typeColor(resource.resource_type)}`}
                        >
                          {typeIcon(resource.resource_type)}
                          {typeLabel(resource.resource_type)}
                        </span>
                        {resource.duration_minutes && (
                          <span className="text-xs text-gray-400">
                            {resource.duration_minutes} min
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {resource.title}
                      </h3>
                      {resource.description && (
                        <p className="text-sm text-gray-500 line-clamp-2">{resource.description}</p>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      </>)}

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Prêt à passer à l&apos;action ?
          </h2>
          <p className="text-gray-500 mb-8">
            Rejoignez des centaines d&apos;entreprises africaines qui modernisent leurs RH
            avec Targetym AI.
          </p>
          <Link
            href="https://dashboard.targetym.ai"
            className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg"
          >
            Essai Gratuit 30 Jours
          </Link>
        </div>
      </section>
    </div>
  );
}
