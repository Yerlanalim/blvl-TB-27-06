import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BizLevel - Обучение бизнесу',
    short_name: 'BizLevel',
    description: 'Платформа для обучения бизнесу и предпринимательству. Изучайте основы бизнеса, развивайте навыки и достигайте успеха.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#22c55e',
    lang: 'ru',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64',
        type: 'image/png',
      },
    ],
  };
}
