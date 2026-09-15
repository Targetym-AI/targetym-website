import type { LineIcoName } from '@/components/site/icons';

/* Données du parcours d'essai gratuit (reprises telles quelles de l'ancienne page) */
export const steps: { number: string; icon: LineIcoName; title: string; duration: string; description: string }[] = [
  {
    number: '01',
    icon: 'phone',
    title: 'Demandez une présentation',
    duration: '1h – 1h30',
    description:
      'Remplissez le formulaire ci-dessous. Notre équipe vous contacte pour planifier une présentation personnalisée de la plateforme, adaptée à votre secteur et à vos défis RH.',
  },
  {
    number: '02',
    icon: 'gift',
    title: "Demandez l'essai gratuit",
    duration: '15 jours gratuits',
    description:
      "Accédez immédiatement à toutes les fonctionnalités de la plateforme. Profitez de 15 jours d'essai complet, sans carte bancaire et sans engagement.",
  },
  {
    number: '03',
    icon: 'rocket',
    title: 'Démarrez et intégrez vos données',
    duration: "Et c'est parti !",
    description:
      "Notre équipe vous accompagne pas à pas pour intégrer vos données RH existantes. En quelques heures, Targetym AI est opérationnel et vos équipes peuvent commencer à l'utiliser.",
  },
];

export const sectors = [
  'Finance & Assurance', 'Banque', 'Commerce & Distribution', 'Industrie & Manufacturing',
  'Santé & Pharmaceutique', 'Télécommunications', 'Mines & Énergie', 'BTP & Immobilier',
  'Agroalimentaire', 'Transport & Logistique', 'Services & Consulting', 'ONG & Secteur public',
  'Enseignement & Formation', 'Technologie & Startups', 'Autre',
];

export const companySizes = [
  '1 – 10 employés', '11 – 50 employés', '51 – 100 employés',
  '101 – 250 employés', '251 – 500 employés', '501 – 1 000 employés', 'Plus de 1 000 employés',
];

export const countries = [
  'Sénégal', "Côte d'Ivoire", 'Cameroun', 'Mali', 'Burkina Faso', 'Guinée',
  'Togo', 'Bénin', 'Niger', 'Gabon', 'Congo', 'RDC', 'Madagascar',
  'Maroc', 'Tunisie', 'Algérie', 'France', 'Autre',
];

export const challenges = [
  'Gestion administrative chronophage',
  'Suivi des congés et absences',
  'Recrutement difficile',
  'Évaluations de performance',
  'Gestion de la paie',
  'Formation et montée en compétences',
  'Conformité légale',
  'Reporting RH & tableau de bord',
];

export const objectives = [
  'Automatiser les tâches répétitives',
  "Améliorer l'expérience employé",
  'Réduire les coûts RH',
  'Centraliser les données RH',
  'Mieux piloter la performance',
  'Digitaliser les processus RH',
  'Gagner du temps sur les recrutements',
  'Améliorer la conformité légale',
];

export const sources = [
  'Réseaux sociaux (LinkedIn, Facebook…)',
  "Recommandation d'un collègue / partenaire",
  'Google / moteur de recherche',
  'Événement ou conférence',
  'Publicité en ligne',
  'Article de blog ou presse',
  'Autre',
];
