import { CalendarDays, Clock, Mic, Play, ExternalLink } from 'lucide-react';

interface Webinar {
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

function formatDate(dateStr: string | null) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

function formatTime(dateStr: string | null) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export default function WebinarsSection({ webinars }: { webinars: Webinar[] }) {
  if (webinars.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-5">
          <CalendarDays className="w-8 h-8 text-primary-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-500 mb-2">Webinaires bientôt disponibles</h3>
        <p className="text-gray-400 text-sm">Nos prochains webinaires RH seront annoncés ici.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {webinars.map((w) => {
        const isCompleted = w.status === 'completed';
        const hasRegistrationLink = !isCompleted && !!w.registration_url;
        const hasReplay = isCompleted && !!w.replay_url;

        return (
          <div
            key={w.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col"
          >
            {/* Cover */}
            <div className="relative aspect-video bg-gradient-to-br from-primary-50 to-indigo-50 overflow-hidden">
              {w.cover_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={w.cover_image_url}
                  alt={w.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <CalendarDays className="w-12 h-12 text-primary-200" />
                </div>
              )}
              <div className="absolute top-3 left-3">
                {hasReplay ? (
                  <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    <Play className="w-3 h-3" /> Replay disponible
                  </span>
                ) : isCompleted ? (
                  <span className="px-2.5 py-1 bg-gray-400 text-white text-xs font-semibold rounded-full">
                    Terminé
                  </span>
                ) : hasRegistrationLink ? (
                  <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                    Inscription ouverte
                  </span>
                ) : null}
              </div>
            </div>

            {/* Corps */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-base">{w.title}</h3>
              {w.description && (
                <p className="text-sm text-gray-500 mb-3 leading-relaxed">{w.description}</p>
              )}

              <div className="flex flex-col gap-1.5 text-xs text-gray-500 mt-auto mb-4">
                {w.presenter_name && (
                  <span className="flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-primary-400" />
                    {w.presenter_name}
                  </span>
                )}
                {w.webinar_date && (
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-primary-400" />
                    {formatDate(w.webinar_date)} · {formatTime(w.webinar_date)}
                  </span>
                )}
                {w.duration_minutes && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary-400" />
                    {w.duration_minutes} minutes
                  </span>
                )}
              </div>

              {hasReplay ? (
                <a
                  href={w.replay_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Play className="w-4 h-4" /> Regarder le replay
                </a>
              ) : hasRegistrationLink ? (
                <a
                  href={w.registration_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                >
                  Je m&apos;inscris - Gratuit <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
