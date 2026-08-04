# Targetym Website

## Description
Site public Targetym et porte d'entrée d'authentification vers le dashboard.

## Stack
- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS
- Nodemailer / Resend pour les formulaires publics
- Déploiement Vercel

## Base de données
Ce dépôt ne possède pas de schéma de base de données. Les données et l'authentification passent par `targetym-api` via `NEXT_PUBLIC_API_URL`.

## Endpoints internes
- `POST /api/contact` : envoi du formulaire de contact
- `POST /api/essai-gratuit` : envoi de la demande d'essai

## Pages principales
- `/` : accueil
- `/login` : connexion, inscription et 2FA
- `/forgot-password`, `/reset-password`, `/pending-activation`
- `/solutions`, `/pricing`, `/about`, `/contact`, `/careers`
- `/blog`, `/resources`, `/case-studies`
- `/privacy`, `/terms`, `/cgv`

## Décisions techniques
- Les JWT ne doivent jamais transiter dans l'URL ni être persistés dans le stockage JavaScript.
- Le refresh token reste dans le cookie HTTP-only de l'API ; les appels d'authentification utilisent `credentials: 'include'`.
- Après connexion, le site redirige vers le dashboard configuré sans paramètre sensible.

## Fait
- 2026-08-04 : diagnostic d'une incompatibilité entre `website/staging` (ancien transfert `?token=...`) et le dashboard sécurisé fusionné depuis `main`.
- 2026-08-04 : fusion locale de `origin/main` dans `staging` sans conflit ; conservation de `NEXT_PUBLIC_DASHBOARD_URL` pour l'environnement staging.
- 2026-08-04 : suppression du transfert de JWT dans l'URL ; login et vérification 2FA avec cookie HTTP-only et `credentials: 'include'`.
- 2026-08-04 : `npx tsc --noEmit`, `npm run lint` et `npm run build` réussis ; 23 pages générées.
- 2026-08-04 : déploiement staging validé dans le navigateur ; connexion
  administrateur, redirection vers le dashboard et impersonation RH stables,
  sans jeton dans l'URL.
- 2026-08-04 : nouvelle gate locale avant production réussie, avec 23 pages.

## À faire
- Promouvoir `staging` vers `main` après l'API et le dashboard, puis revalider
  le pont de session sur les domaines de production.

## Problèmes résolus
- Contrat d'authentification localement réaligné avec le dashboard sécurisé, sans réintroduire de JWT dans l'URL ou le stockage JavaScript.

## Dernière session
2026-08-04 : intégration, gates, déploiement staging et validation navigateur
terminés. Prochaine étape : PR `staging` vers `main`, déploiement Vercel
production et contrôle final du pont d'authentification.
