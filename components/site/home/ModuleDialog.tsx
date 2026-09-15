'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Module = {
  kicker: string;
  title: string;
  lead: string;
  checks: string[];
  subs: Array<[string, string, string]>;
  stats: Array<[string, string]>;
};

const MODULES: Record<string, Module> = {
  personnel: {
    kicker: 'Administration RH',
    title: 'Administration du personnel',
    lead: "Dossiers, contrats, documents officiels et procédures sensibles au même endroit. L'agent surveille les échéances, génère les attestations et vérifie la conformité de chaque procédure.",
    checks: ['Dossiers collaborateurs complets, organigramme dynamique et multi-sites', 'Contrats, périodes d’essai et échéances suivis et relancés', 'Attestations et certificats générés en quelques secondes, signés en ligne', 'Contentieux et départs gérés dans le respect du droit du travail'],
    subs: [['personnel', 'Gestion du personnel', "détecte les échéances critiques et alerte avant qu'elles ne tombent."],
      ['documents', 'Documents RH', 'génère chaque document à partir des données du collaborateur, sans saisie.'],
      ['contentieux', 'Contentieux', 'vérifie la conformité légale de chaque procédure disciplinaire.'],
      ['departs', 'Départs', 'identifie les tendances de départ pour anticiper le turnover.']],
    stats: [['30 s', 'pour générer une attestation, contre 48 h par e-mail'], ['0', "échéance de contrat ou de période d'essai oubliée"]],
  },
  recrutement: {
    kicker: 'Recrutement & onboarding',
    title: 'Recrutement & onboarding',
    lead: "Attirez et intégrez les meilleurs talents avec un processus intelligent, de l'offre à l'arrivée. L'agent trie les candidatures, évalue les profils et prépare chaque intégration.",
    checks: ['Offres diffusées sur plusieurs canaux en un clic', 'Scoring IA des CV et pipeline visuel des candidats', 'Grilles d’entretien collaboratives', 'Onboarding structuré : contrat, matériel et parcours des premiers jours'],
    subs: [['recrutement', 'Recrutement', 'analyse automatiquement les CV et classe les meilleurs profils.']],
    stats: [['−60 %', 'de temps passé au tri des candidatures'], ['J+1', "contrat, matériel et parcours d'accueil prêts dès la signature"]],
  },
  performance: {
    kicker: 'Performance & OKR',
    title: 'Performance & OKR',
    lead: "Alignez toute l'organisation sur des objectifs clairs et pilotez la performance avec des évaluations structurées et un feedback continu. L'agent prépare les entretiens et repère les objectifs à risque.",
    checks: ['OKR en cascade, résultats clés suivis en temps réel', 'Évaluations 360° et campagnes automatisées', 'Entretiens one-on-one préparés par l’agent', 'Calibrage des notes et alertes sur les écarts'],
    subs: [['performance', 'Performance & feedback', 'analyse les tendances et recommande un développement personnalisé.'],
      ['okr', 'OKR & objectifs', 'repère les objectifs à risque et suggère des actions correctives.']],
    stats: [['360°', 'évaluations, feedback continu et calibrage des notes'], ['100 %', "des OKR suivis en temps réel, avec alerte dès qu'un écart apparaît"]],
  },
  talents: {
    kicker: 'Talents & carrière',
    title: 'Talents & carrière',
    lead: "Cartographiez vos talents et construisez des plans de succession solides. L'agent détecte les hauts potentiels et prédit les risques de départ.",
    checks: ['Matrice 9-Box à jour en continu', 'Plans de succession prêts avant qu’un poste ne se libère', 'Parcours de carrière et mobilité interne', 'Analyse des compétences et des potentiels'],
    subs: [['talents', 'Talents & carrière', 'détecte les hauts potentiels et prédit les risques de départ.']],
    stats: [['9-Box', 'matrice toujours à jour, sans campagne de saisie'], ['×2', "de mobilités internes identifiées par l'agent"]],
  },
  formation: {
    kicker: 'Formation & compétences',
    title: 'Formation & compétences',
    lead: "Développez les compétences avec des parcours intelligents et adaptatifs. L'agent repère les écarts et propose à chacun le bon parcours, avant la prise de poste.",
    checks: ['Catalogue personnalisable et parcours adaptatifs', 'Suivi des certifications et des plans individuels', 'Budget et retour sur investissement formation', 'Recommandations à partir des écarts de compétences'],
    subs: [['formation', 'Formation', 'recommande des formations à partir des écarts de compétences.']],
    stats: [['+40 %', "de formations suivies grâce aux parcours proposés par l'agent"], ['1', 'plan individuel par collaborateur, mis à jour à chaque évaluation']],
  },
  paie: {
    kicker: 'Paie & rémunération',
    title: 'Paie & congés',
    lead: "Bulletins officiels, cotisations légales calculées automatiquement, congés validés d'un geste et budget RH suivi en temps réel. L'agent réconcilie tout avant la clôture.",
    checks: ['Runs de paie mensuels et bulletins PDF officiels', 'IPRES, CSS, IPM, CFCE et impôt sur le revenu calculés automatiquement', 'Congés validés à plusieurs niveaux, soldes en temps réel', 'Pesées IPE, conventions collectives et budget RH vs réalisé'],
    subs: [['paie', 'Module paie', 'calcule les cotisations légales sénégalaises à chaque run.'],
      ['conges', 'Congés & absences', 'anticipe les périodes de forte absence.'],
      ['compensation', 'Compensation & benefits', 'réconcilie les pesées IPE et la convention collective.'],
      ['budget-rh', 'Budget RH', 'compare le budget prévisionnel au réalisé issu de la paie.']],
    stats: [['100 %', 'des cotisations légales sénégalaises calculées à chaque run'], ['1 clic', 'pour demander, valider et solder un congé, depuis le mobile']],
  },
  pilotage: {
    kicker: 'Pilotage RH',
    title: 'Pilotage & analytics',
    lead: "Exploitez vos données RH pour décider avec des faits : tableaux de bord en temps réel, turnover prédit, missions et déplacements suivis. L'agent produit les rapports à votre place.",
    checks: ['Tableaux de bord interactifs, par équipe et par pays', 'Turnover, rétention et tendances prédits par l’IA', 'Rapports automatisés, prêts pour le comité de direction', 'Ordres de mission, frais et validation hiérarchique'],
    subs: [['analytics', 'People analytics', 'prédit le turnover, la rétention et les tendances RH.'],
      ['missions', 'Gestion des missions', 'optimise les plannings et suit les budgets de mission.']],
    stats: [['6,1 %', "de turnover prédit par équipe, avant qu'il n'arrive"], ['0', 'tableur : rapports et ordres de mission générés automatiquement']],
  },
};

/* Modale des modules : une seule boîte <dialog>, remplie d'après la carte
   cliquée. Le bouton du titre couvre toute la carte ; Échap, la croix et un
   clic sur le fond la ferment, et le focus revient à la carte. */
export default function ModuleDialog() {
  const dlg = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [key, setKey] = useState<string | null>(null);
  const [tab, setTab] = useState(0);
  const [openSeq, setOpenSeq] = useState(0);

  /* Les cartes sont rendues par le serveur : on branche leur bouton ici */
  useEffect(() => {
    const d = dlg.current;
    if (!d || typeof d.showModal !== 'function') return;
    const offs: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>('.mod[data-module]').forEach((card) => {
      const btn = card.querySelector<HTMLElement>('.mod-open');
      const k = card.getAttribute('data-module');
      if (!btn || !k || !MODULES[k]) return;
      const click = () => {
        opener.current = btn;
        setKey(k);
        setTab(0);
        setOpenSeq((n) => n + 1);
      };
      btn.addEventListener('click', click);
      offs.push(() => btn.removeEventListener('click', click));
    });
    const onClose = () => {
      document.documentElement.classList.remove('has-modal');
      opener.current?.focus();
    };
    d.addEventListener('close', onClose);
    offs.push(() => d.removeEventListener('close', onClose));
    return () => {
      offs.forEach((off) => off());
      document.documentElement.classList.remove('has-modal');
    };
  }, []);

  /* Ouverture une fois la boîte remplie */
  useEffect(() => {
    const d = dlg.current;
    if (!openSeq || !d) return;
    if (!d.open) d.showModal();
    document.documentElement.classList.add('has-modal');
    if (panel.current) panel.current.scrollTop = 0;
    close.current?.focus();
  }, [openSeq]);

  const cur = key ? MODULES[key] : null;
  const sub = cur ? cur.subs[tab] : null;

  return (
    <dialog className="mm" id="module-dialog" aria-labelledby="mm-title" ref={dlg} onClick={(e) => { if (e.target === dlg.current) dlg.current?.close(); }}>
      <div className="mm-panel" ref={panel}>
        <div className="mm-top"><button className="mm-close" type="button" aria-label="Fermer" ref={close} onClick={() => dlg.current?.close()}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg></button></div>
        <div className="mm-head">
          <div className="mm-copy">
            <p className="eyebrow left mm-kicker">{cur?.kicker}</p>
            <h2 id="mm-title">{cur?.title}</h2>
            <p className="mm-lead">{cur?.lead}</p>
            <div className="mm-actions">
              <Link className="btn btn-mint" href="/essai-gratuit">Démarrer l&apos;essai gratuit</Link>
              <Link className="btn btn-plain" href="/pricing">Voir les tarifs <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <ul className="mm-checks">
            {cur?.checks.map((c) => (
              <li key={c}><i aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></i>{c}</li>
            ))}
          </ul>
        </div>
        <div className="mm-demo">
          <div className="mm-tabs" role="tablist" aria-label="Sous-modules" hidden={!cur || cur.subs.length < 2}>
            {cur?.subs.map((s, i) => (
              <button key={s[0]} type="button" className={i === tab ? 'mm-tab is-on' : 'mm-tab'} role="tab" data-i={i} aria-selected={i === tab} onClick={() => setTab(i)}>{s[1]}</button>
            ))}
          </div>
          <div className="mm-stage">
            <figure className="mm-browser">
              <span className="mm-bar" aria-hidden="true"><i></i><i></i><i></i><span className="mm-url">{sub ? `app.targetym.ai/${sub[0]}` : ''}</span></span>
              <span className="mm-screen">{sub && <Image className="mm-shot" src={`/img/modules/${sub[0]}.jpg`} alt={`Écran ${sub[1]}`} width={1100} height={600} sizes="(max-width: 860px) 100vw, 760px" loading="eager" />}</span>
            </figure>
            <div className="mm-side">
              <div className="mm-stat"><b>{cur?.stats[0][0]}</b><span>{cur?.stats[0][1]}</span></div>
              <div className="mm-stat"><b>{cur?.stats[1][0]}</b><span>{cur?.stats[1][1]}</span></div>
              <p className="mm-agent"><span className="live-dot" aria-hidden="true"></span><span><b>L&apos;agent&nbsp;:</b> <em className="mm-agent-txt">{sub?.[2]}</em></span></p>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
