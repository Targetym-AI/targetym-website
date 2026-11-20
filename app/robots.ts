import type { MetadataRoute } from 'next';

/* Les pages de connexion portent leur propre noindex (metadata) et /api/ un X-Robots-Tag :
   robots.txt ne les liste plus, il désignerait des routes sensibles à qui le lit. */
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === 'preview') {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.targetym.ai/sitemap.xml',
  };
}
