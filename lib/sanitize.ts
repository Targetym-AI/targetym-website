// Neutralise toute injection HTML dans les emails générés côté serveur.
// Aucun champ de formulaire ne doit contenir de HTML : on convertit en entités
// (l'échappement traite aussi les guillemets, donc pas de breakout d'attribut).
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
