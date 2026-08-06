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
- 2026-08-05 : PR #5 fusionnée sur `main` au commit `326b6065`; déploiement
  Vercel production `Ready` sur `targetym.ai` et `www.targetym.ai`.
- 2026-08-05 : connexion production validée de bout en bout vers le dashboard,
  sans jeton dans l'URL, avec accès au Copilote du tenant pilote.
- 2026-08-06 : refonte locale de `/login` en direction Brume/liquid glass :
  carte d'authentification flottante, scène RH 3D avec parallaxe, indicateurs,
  activité, sécurité et Copilote intégré. Les parcours connexion, inscription,
  2FA et redirection sécurisée restent inchangés.
- 2026-08-06 : ajout en arrière-plan de douze avatars de modules RH, répartis
  sur trois profondeurs et animés par des trajectoires désynchronisées. La
  densité est réduite sur mobile et les mouvements respectent la préférence
  système de réduction des animations.

## À faire
- Aucun blocage de livraison connu ; conserver les tests du pont de session
  lors des prochaines évolutions d'authentification.
- Faire valider la nouvelle connexion localement puis sur `staging` avant toute
  promotion en production.

## Problèmes résolus
- Contrat d'authentification localement réaligné avec le dashboard sécurisé, sans réintroduire de JWT dans l'URL ou le stockage JavaScript.

## Dernière session
2026-08-05 : la PR #5 a été fusionnée sur `main`, Vercel sert la nouvelle
version sur les deux domaines de production et la connexion vers le dashboard
a été validée avec le compte pilote, sans exposition de jeton.

2026-08-06 : la page de connexion a été recomposée localement autour d'un fond
continu et d'une carte liquid glass détachée. La scène 3D présente la plateforme
RH complète — tableau de bord, équipe, congés, tâches, activité et sécurité —
avec le Copilote visible dans l'orbe et la génération de rapport. Une
constellation liquid glass des modules flotte désormais sur trois plans en
arrière-plan. TypeScript, ESLint ciblé, `git diff --check` et le build des 23
routes passent ; aucun commit ni push n'a été effectué.
