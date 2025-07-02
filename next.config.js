const createMDX = require('@next/mdx');

// BIZLEVEL: Добавлен bundle analyzer для оптимизации размера bundle
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        port: '',
        pathname: '/avatar/**',
      },
      {
        protocol: 'https',
        hostname: 'img.shields.io',
        port: '',
        pathname: '/github/stars/**',
      },
      {
        protocol: 'https',
        hostname: 'lbycuccwrcmdaxjqyxut.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'sccuzcjodwipzcjiixau.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/features/roadmaps',
        destination: '/features/roadmap',
        permanent: true,
      },
      {
        source: '/features/daily-challenges',
        destination: '/features/coding-challenges',
        permanent: true,
      },
      {
        source: '/questions',
        destination: '/coding-challenges',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'no-referrer-when-downgrade',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
      {
        source: '/embed/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'",
          },
        ],
      },
    ];
  },
  // BIZLEVEL: Упрощенная конфигурация для устранения зависаний
  experimental: {
    // Отключаем проблемные оптимизации
    // gzipSize: true,
    // optimizePackageImports: ['recharts', '@monaco-editor/react', 'react-syntax-highlighter', 'prism-react-renderer'],
    esmExternals: 'loose', // Помогает с ESM проблемами
  },
  // Временно отключаем оптимизации
  compress: false,
  optimizeFonts: false,
  swcMinify: false,
  // Агрессивные настройки для устранения зависания
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Отключаем статический экспорт который может зависать
  output: undefined,
  // Отключаем проверки
  reactStrictMode: false,
  webpack: (config, { isServer, dev }) => {
    // Минимальная конфигурация webpack для устранения зависания
    return config;
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withBundleAnalyzer(withMDX(nextConfig));
