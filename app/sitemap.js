export default function sitemap() {
  const base = 'https://knowan.net';
  const pages = [
    '/',
    '/explorar',
    '/eventos',
    '/mapa',
    '/mapa-turistico',
    '/chat',
    '/viajar-a-argentina',
    '/viajar-patagonia',
    '/viajar-solo-argentina',
    '/conocer-gente-buenos-aires',
    '/viajar-mendoza',
    '/viajar-bariloche',
    '/viajar-salta',
    '/viajar-cordoba',
    '/viajar-rosario',
    '/viajar-ushuaia',
    '/travel-argentina',
    '/travel-patagonia',
    '/solo-travel-argentina',
    '/meet-people-buenos-aires',
    '/travel-mendoza',
    '/travel-bariloche',
    '/travel-salta',
    '/travel-cordoba',
    '/travel-rosario',
    '/travel-ushuaia',
  ];
  return pages.map(page => ({
    url: `${base}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '/' ? 'daily' : 'monthly',
    priority: page === '/' ? 1 : 0.9,
  }));
}
