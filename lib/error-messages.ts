/**
 * Transforme les erreurs brutes (réseau, serveur, etc.) en messages
 * lisibles en français pour les pages d'authentification.
 */
export function getAuthErrorMessage(err: unknown, responseStatus?: number): string {
  const rawMessage = err instanceof Error ? err.message : '';
  const normalized = rawMessage.trim().toLowerCase();

  // Erreur réseau (API inaccessible, CORS, timeout)
  if (
    (err instanceof TypeError && err.message === 'Failed to fetch') ||
    normalized.includes('failed to fetch') ||
    normalized.includes('network error') ||
    normalized.includes('fetch failed')
  ) {
    return 'Impossible de finaliser la demande pour le moment. Vérifiez votre connexion ou réessayez dans quelques instants.';
  }

  // Erreur serveur 500
  if (
    (responseStatus && responseStatus >= 500) ||
    normalized.includes('internal database error') ||
    normalized.includes('database error') ||
    normalized.includes('internal server error') ||
    normalized.includes('server error') ||
    normalized.includes('please try again later')
  ) {
    return 'Une erreur est survenue. Veuillez réessayer dans quelques instants.';
  }

  // Message d'erreur venant du backend (401, 403, etc.)
  if (rawMessage) {
    return rawMessage;
  }

  return 'Une erreur est survenue. Veuillez réessayer.';
}
