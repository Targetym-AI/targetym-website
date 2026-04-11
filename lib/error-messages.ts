/**
 * Transforme les erreurs brutes (réseau, serveur, etc.) en messages
 * lisibles en français pour les pages d'authentification.
 */
export function getAuthErrorMessage(err: unknown, responseStatus?: number): string {
  // Erreur réseau (API inaccessible, CORS, timeout)
  if (err instanceof TypeError && err.message === 'Failed to fetch') {
    return 'Impossible de contacter le serveur. Vérifiez votre connexion internet.';
  }

  // Erreur serveur 500
  if (responseStatus && responseStatus >= 500) {
    return 'Une erreur est survenue. Veuillez réessayer dans quelques instants.';
  }

  // Message d'erreur venant du backend (401, 403, etc.)
  if (err instanceof Error && err.message) {
    return err.message;
  }

  return 'Une erreur est survenue. Veuillez réessayer.';
}
