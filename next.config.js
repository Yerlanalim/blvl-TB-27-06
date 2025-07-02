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
  // BIZLEVEL: Улучшенная конфигурация для оптимизации производительности
  experimental: {
    // Включаем gzipSize анализ
    gzipSize: true,
    // Включаем оптимизацию пакетов
    optimizePackageImports: ['recharts', '@monaco-editor/react', 'react-syntax-highlighter', 'prism-react-renderer'],
  },
  // Компрессия
  compress: true,
  // Оптимизация шрифтов
  optimizeFonts: true,
  // Включаем SWC minifier для лучшей производительности
  swcMinify: true,
  webpack: (config, { isServer, dev }) => {
    // Увеличиваем лимиты производительности
    config.performance = {
      ...config.performance,
      maxAssetSize: 500000, // Уменьшено с 1MB до 500KB
      maxEntrypointSize: 500000, // Уменьшено с 1MB до 500KB
    };

    // Оптимизация для production
    if (!dev && !isServer) {
      // Включаем tree shaking для лучшего удаления неиспользуемого кода
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        // Улучшенное разделение кода
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 250000, // Максимальный размер chunk 250KB
          cacheGroups: {
            // Отдельный chunk для vendor библиотек
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
              maxSize: 250000,
            },
            // Отдельный chunk для Monaco Editor (тяжелый)
            monaco: {
              test: /[\\/]node_modules[\\/](@monaco-editor|monaco-editor)[\\/]/,
              name: 'monaco-editor',
              chunks: 'all',
              priority: 15,
              maxSize: 300000,
            },
            // Отдельный chunk для chart библиотек
            charts: {
              test: /[\\/]node_modules[\\/](recharts|chart\.js|d3)[\\/]/,
              name: 'chart-libs',
              chunks: 'all',
              priority: 12,
              maxSize: 200000,
            },
            // Отдельный chunk для syntax highlighters
            highlighters: {
              test: /[\\/]node_modules[\\/](react-syntax-highlighter|prism-react-renderer)[\\/]/,
              name: 'syntax-highlighters',
              chunks: 'all',
              priority: 11,
              maxSize: 150000,
            },
            // Отдельный chunk для UI компонентов
            ui: {
              test: /[\\/]src[\\/]components[\\/]ui[\\/]/,
              name: 'ui-components',
              chunks: 'all',
              priority: 5,
              maxSize: 100000,
            },
            // Отдельный chunk для admin компонентов (загружаются редко)
            admin: {
              test: /[\\/]src[\\/]components[\\/]app[\\/]admin[\\/]/,
              name: 'admin-components',
              chunks: 'all',
              priority: 5,
              maxSize: 150000,
            },
            // Общий chunk для остальных компонентов
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 1,
              maxSize: 100000,
            },
          },
        },
      };
    }

    // Warnings фильтр для development
    if (!isServer && dev) {
      config.stats = {
        ...config.stats,
        warningsFilter: [
          'Serializing big strings',
          /Serializing big strings/,
        ],
      };
    }

    // Алиасы для лучшего tree shaking
    config.resolve.alias = {
      ...config.resolve.alias,
      // Убираем lodash алиас - recharts использует обычный lodash
      // 'lodash': 'lodash-es',
    };

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
