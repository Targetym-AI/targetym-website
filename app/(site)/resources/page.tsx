import type { ReactNode } from 'react';
import Cta from '@/components/site/Cta';
import ResourceTabs from '@/components/site/resources/ResourceTabs';
import VideoCard from '@/components/site/resources/VideoCard';
import { publicPageMetadata } from '@/lib/seo';
import { mediaUrl, teaser } from '@/lib/site/blog';
import { cleanTitle, fetchResources, fetchWebinars, fixCaps, getVideoEmbed, thumbTitle, webinarDay, webinarWhen, type PublicWebinar } from '@/lib/site/resources';

export const metadata = publicPageMetadata({
  title: 'Vidéos tutorielles — Targetym AI, logiciel RH en Afrique',
  description:
    "Guides, vidéos et outils pratiques pour moderniser la gestion des ressources humaines avec Targetym AI, le SIRH IA n°1 en Afrique (Sénégal, Côte d'Ivoire, Bénin, Cameroun, Mali).",
  keywords: [
    'tutoriel SIRH Afrique',
    'guide logiciel RH Afrique',
    'formation SIRH Sénégal',
    'Targetym AI',
  ],
  path: '/resources',
});

const IcoPerson = () => <svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.8" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0" /></svg>;
const IcoDate = () => <svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="4" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>;
const IcoTime = () => <svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;

function typeLabel(type: string) {
  if (type === 'video') return 'Vidéo';
  if (type === 'pdf') return 'PDF';
  return 'Lien';
}

/* L'état d'un webinaire : replay, terminé, inscription ouverte (à venir) ou simple session live */
function webinarFoot(w: PublicWebinar, now: number): ReactNode {
  const done = w.status === 'completed';
  const upcoming = !!w.webinar_date && new Date(w.webinar_date).getTime() > now;
  if (done && w.replay_url) {
    return <><span className="tag ok">Replay disponible</span><a className="btn btn-mint" href={w.replay_url} target="_blank" rel="noopener">Regarder le replay</a></>;
  }
  if (done) return <span className="tag">Terminé</span>;
  const tag = upcoming && w.registration_url ? <span className="tag ok">Inscription ouverte</span> : <span className="tag">Webinaire live</span>;
  return <>{tag}{w.registration_url && <a className="btn btn-mint" href={w.registration_url} target="_blank" rel="noopener">Je m&apos;inscris</a>}</>;
}

export default async function ResourcesPage({ searchParams }: { searchParams: { tab?: string } }) {
  const [{ resources }, webinars] = await Promise.all([fetchResources(), fetchWebinars()]);
  const webFirst = searchParams.tab === 'formations' || searchParams.tab === 'webinaires';
  const now = Date.now();

  return (
    <>
      <section className="page-head">
        <p className="eyebrow">Centre de ressources</p>
        <h1>Vidéos tutorielles <span>et webinaires live de l&apos;équipe</span></h1>
        <p className="lead">Vidéos, guides et sessions en direct pour tirer le meilleur de Targetym AI et rester à la pointe des pratiques RH.</p>
        <div className="tabbar actions" role="tablist" aria-label="Type de ressource" data-tabs>
          <button className={webFirst ? 'tab' : 'tab is-on'} type="button" role="tab" aria-controls="videos" aria-selected={!webFirst}><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg> Vidéos tutorielles <span className="n">{resources.length}</span></button>
          <button className={webFirst ? 'tab is-on' : 'tab'} type="button" role="tab" aria-controls="webinaires" aria-selected={webFirst}><svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="4" /><path d="M3 10h18M8 3v4M16 3v4" /></svg> Webinaires live <span className="n">{webinars.length}</span></button>
        </div>
      </section>

      <section className="section sec-anim" aria-label="Ressources">
        <div className="tab-panel" id="videos" role="tabpanel" hidden={webFirst}>
          {resources.length ? (
            <ul className="vids">
              {resources.map((r) => {
                const embed = r.resource_type === 'video' && r.video_url ? getVideoEmbed(r.video_url) : null;
                return (
                  <VideoCard
                    key={r.id}
                    embed={embed}
                    href={r.video_url || (r.file_url ? mediaUrl(r.file_url) : null)}
                    thumb={fixCaps(thumbTitle(r.title))}
                    title={fixCaps(cleanTitle(r.title))}
                    text={teaser(r.description, 110)}
                    tag={typeLabel(r.resource_type)}
                  />
                );
              })}
            </ul>
          ) : (
            <p className="post-empty">Vidéos tutorielles bientôt disponibles&nbsp;: notre équipe prépare de nouveaux contenus.</p>
          )}
        </div>
        <div className="tab-panel" id="webinaires" role="tabpanel" hidden={!webFirst}>
          {webinars.length ? (
            <ul className="webs">
              {webinars.map((w) => {
                const d = w.webinar_date ? webinarDay(w.webinar_date) : null;
                return (
                  <li key={w.id} className="web">
                    <span className="web-date" aria-hidden="true">{d && <><b>{d.day}</b><i>{d.month}</i></>}</span>
                    <div>
                      <h3>{fixCaps(w.title)}</h3>
                      {w.description && <p>{w.description}</p>}
                      <div className="web-meta">
                        {w.presenter_name && <span><IcoPerson /> {fixCaps(w.presenter_name)}</span>}
                        {w.webinar_date && <span><IcoDate /> {webinarWhen(w.webinar_date)}</span>}
                        {w.duration_minutes ? <span><IcoTime /> {w.duration_minutes} min</span> : null}
                      </div>
                      <div className="web-foot">{webinarFoot(w, now)}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="post-empty">Webinaires bientôt disponibles&nbsp;: nos prochaines sessions seront annoncées ici.</p>
          )}
        </div>
      </section>

      <ResourceTabs />

      <Cta
        image="/img/mod-4b.jpg"
        title={<>Prêt à passer<br />à l&apos;action&nbsp;?</>}
        text="Rejoignez les entreprises africaines qui modernisent leurs RH avec Targetym AI. Essai gratuit de 15 jours, sans carte bancaire."
        secondLabel="Voir les solutions"
        secondHref="/solutions"
      />
    </>
  );
}
