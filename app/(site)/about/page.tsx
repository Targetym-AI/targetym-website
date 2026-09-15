import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Cta from '@/components/site/Cta';
import { CheckIco, LineIco, type LineIcoName } from '@/components/site/icons';
import { publicPageMetadata } from '@/lib/seo';

export const metadata: Metadata = publicPageMetadata({
  title: 'À Propos — Targetym AI, le Logiciel RH n°1 en Afrique',
  description: "Découvrez Targetym AI, la suite SIRH intelligente conçue pour les entreprises du Sénégal, de la Côte d'Ivoire, du Bénin, du Cameroun et du Mali. Notre mission, notre vision et notre équipe.",
  keywords: [
    'Targetym AI',
    'logiciel RH Afrique',
    'SIRH Afrique',
    'SIRH Sénégal',
    "SIRH Côte d'Ivoire",
    'SIRH Bénin',
    'SIRH Cameroun',
    'SIRH Mali',
    'plateforme RH Afrique francophone',
    'à propos Targetym AI',
  ],
  path: '/about',
});

const values: { icon: LineIcoName; title: string; desc: string }[] = [
  {
    icon: 'bulb',
    title: 'Innovation',
    desc: "Nous intégrons les dernières avancées de l'IA pour résoudre des problèmes RH concrets et mesurables.",
  },
  {
    icon: 'users',
    title: "Centré sur l'humain",
    desc: "La technologie est au service des collaborateurs. Chaque fonctionnalité est pensée pour améliorer l'expérience employé.",
  },
  {
    icon: 'globe',
    title: 'Ancré en Afrique',
    desc: "Conçu pour les réalités africaines : devise locale (FCFA/XOF), droit du travail du Sénégal, de la Côte d'Ivoire, du Bénin, du Cameroun et du Mali, langues et support en français.",
  },
  {
    icon: 'shield',
    title: 'Confiance & Sécurité',
    desc: 'Vos données RH sont sensibles. Nous appliquons les standards les plus élevés de sécurité et de confidentialité.',
  },
  {
    icon: 'trend',
    title: 'Performance',
    desc: "Nous mesurons notre succès à travers la croissance de nos clients et l'impact mesurable sur leur ROI RH.",
  },
  {
    icon: 'target',
    title: 'Précision',
    desc: 'Des analyses data-driven et des recommandations IA pour des décisions RH basées sur les faits, pas les intuitions.',
  },
];

const pad = (n: number) => String(n).padStart(2, '0');

export default function AboutPage() {
  return (
    <>
      <section className="page-head split">
        <div>
          <p className="eyebrow">À propos</p>
          <h1>À Propos <span>de Targetym AI</span></h1>
          <p className="lead">Nous construisons la suite SIRH la plus intelligente pour les entreprises d&apos;Afrique francophone — Sénégal, Côte d&apos;Ivoire, Bénin, Cameroun, Mali — combinant analytique people, IA et automatisation dans une plateforme unifiée.</p>
          <div className="actions"><Link className="btn btn-mint" href="/essai-gratuit">Essayer gratuitement</Link> <Link className="btn btn-plain" href="/contact">Nous contacter</Link></div>
        </div>
        <figure className="ph-visual" data-cut>
          <Image src="/img/mod-5a.jpg" alt="Deux collègues devant un ordinateur portable, dans un bureau lumineux" width={900} height={720} sizes="(max-width: 860px) 100vw, 42vw" priority />
          <figcaption className="dock dock-bl"><span className="v-live"><i aria-hidden="true"></i>Sénégal · Côte d&apos;Ivoire · Bénin · Cameroun · Mali</span></figcaption>
        </figure>
      </section>

      {/* La mission, et ses chiffres sur la carte sombre */}
      <section className="section sec-anim" aria-labelledby="mission-title">
        <div className="mission">
          <div className="mission-copy">
            <h2 className="head-duo left" id="mission-title">Notre Mission <span>libérer les équipes RH</span></h2>
            <p>Targetym AI est né d&apos;un constat simple&nbsp;: les équipes RH passent trop de temps sur des tâches administratives répétitives et pas assez sur ce qui compte vraiment — les collaborateurs.</p>
            <p>Notre mission est de libérer les professionnels RH de ces charges en leur fournissant une plateforme dotée de <strong>30+ agents IA</strong> capables d&apos;automatiser la génération de documents, le suivi des congés, les évaluations, les rapports et bien plus encore.</p>
            <p><strong>Résultat&nbsp;:</strong> vos équipes RH se concentrent enfin sur l&apos;essentiel — le développement humain et la performance collective.</p>
          </div>
          <aside className="uc-result about-stats" data-cut aria-label="Targetym AI en chiffres">
            <span className="dock dock-tr" aria-hidden="true"><span className="hub-num"><b>5</b><i>pays</i></span></span>
            <p className="uc-kicker"><span className="live-dot" aria-hidden="true"></span>En chiffres</p>
            <p className="uc-r-after">30+<span>Agents IA RH intégrés</span></p>
            <div className="uc-r-foot">
              <p className="uc-r-before"><i>Tâches automatisées</i>50&nbsp;%</p>
              <p className="uc-r-gain"><CheckIco />3x plus de productivité RH</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section sec-anim" aria-labelledby="values-title">
        <div className="sec-top">
          <h2 className="head-duo left" id="values-title">Nos Valeurs <span>six principes, au quotidien</span></h2>
          <p>Ces principes guident chaque décision produit et chaque interaction avec nos clients.</p>
        </div>
        <ul className="pcards">
          {values.map((v, i) => (
            <li key={v.title} className={v.icon === 'globe' ? 'pcard is-hi' : 'pcard'}>
              <div className="pcard-top"><span className="c-ico"><LineIco name={v.icon} /></span><span className="pcard-n">{pad(i + 1)}</span></div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <Cta
        image="/img/blog-1.jpg"
        title={<>Prêt à transformer<br />votre gestion RH&nbsp;?</>}
        text="Rejoignez les entreprises qui font confiance à Targetym AI pour gérer leurs talents."
        secondLabel="Nous contacter"
        secondHref="/contact"
      />
    </>
  );
}
