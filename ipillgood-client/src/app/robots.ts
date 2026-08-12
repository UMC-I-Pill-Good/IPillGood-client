import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ipillgood.store';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/callback/',
        '/login/',
        '/signup/',
        '/survey/',
        '/cabinet/',
        '/condition/',
        '/home/',
        '/ingredient/',
        '/my/',
        '/product/',
        '/ranking/',
        '/reviews/',
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
