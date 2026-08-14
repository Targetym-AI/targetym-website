// api.targetym.ai est derriere Cloudflare, qui bloque les requetes serveur
// sans User-Agent de navigateur (fetch() de Node/Vercel n'en envoie pas par defaut).
export const SERVER_FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; TargetymWebsite/1.0; +https://www.targetym.ai)',
};
