import type { Metadata } from 'next';
import Script from 'next/script';
import { LineIco, type LineIcoName } from '@/components/site/icons';
import DoneHead from '@/components/site/trial/DoneHead';

export const metadata: Metadata = {
  title: 'Demande envoyée — Targetym AI',
  description: 'Votre demande d\'essai gratuit a bien été reçue. Notre équipe vous contactera sous 24 heures.',
  robots: {
    index: false,
    follow: false,
  },
};

const steps: { icon: LineIcoName; title: string; detail: string }[] = [
  { icon: 'phone', title: 'Présentation personnalisée', detail: '1h – 1h30' },
  { icon: 'gift', title: 'Essai gratuit 15 jours', detail: 'Sans carte bancaire' },
  { icon: 'rocket', title: 'Démarrage & intégration', detail: 'Accompagné pas à pas' },
];

export default function ConfirmationPage() {
  return (
    <>
      <Script id="ga-conversion" strategy="afterInteractive">
        {`gtag('event', 'file_download', {});`}
      </Script>
      <Script id="ads-conversion" strategy="afterInteractive">
        {`gtag('event', 'conversion', { 'send_to': 'AW-17108802870/inscription' });`}
      </Script>

      <DoneHead
        eyebrow="Essai gratuit"
        title={<>Demande envoyée&nbsp;! <span>on vous rappelle sous 24&nbsp;h</span></>}
        lead={<>Merci pour votre demande. Notre équipe vous contactera dans les <strong>24 heures</strong> pour planifier votre présentation.</>}
      />

      <section className="section sec-anim" aria-labelledby="next-title">
        <h2 className="head-duo left" id="next-title">La suite en 3 étapes <span>on vous accompagne à chacune</span></h2>
        <ol className="uc-steps trial-steps done-steps">
          {steps.map((s, i) => (
            <li key={s.title} className={i === 0 ? 'uc-step is-module' : 'uc-step'}>
              <p className="uc-step-k"><LineIco name={s.icon} />{s.detail}<b>0{i + 1}</b></p>
              <h3>{s.title}</h3>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
