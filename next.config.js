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
    // Отключаем optimizeCss так как critters deprecated и удален
    // optimizeCss: process.env.NODE_ENV === 'production',
    // Включаем gzipSize анализ
    gzipSize: true,
  },
  // Компрессия
  compress: true,
  // Оптимизация шрифтов
  optimizeFonts: true,
  webpack: (config, { isServer, dev }) => {
    // Увеличиваем лимиты производительности
    config.performance = {
      ...config.performance,
      maxAssetSize: 1000000,
      maxEntrypointSize: 1000000,
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
          cacheGroups: {
            // Отдельный chunk для vendor библиотек
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            // Отдельный chunk для UI компонентов
            ui: {
              test: /[\\/]src[\\/]components[\\/]ui[\\/]/,
              name: 'ui-components',
              chunks: 'all',
              priority: 5,
            },
            // Отдельный chunk для admin компонентов
            admin: {
              test: /[\\/]src[\\/]components[\\/]app[\\/]admin[\\/]/,
              name: 'admin-components',
              chunks: 'all',
              priority: 5,
            },
            // Отдельный chunk для chart библиотек
            charts: {
              test: /[\\/]node_modules[\\/](recharts|chart\.js|d3)[\\/]/,
              name: 'chart-libs',
              chunks: 'all',
              priority: 8,
            },
            // Отдельный chunk для code editor
            editor: {
              test: /[\\/]node_modules[\\/](monaco-editor|prism)[\\/]/,
              name: 'code-editor',
              chunks: 'all',
              priority: 8,
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

    // Алиасы для лучшего tree shaking (исправлено для recharts совместимости)
    config.resolve.alias = {
      ...config.resolve.alias,
      // Убираем lodash алиас - он ломает recharts, который использует lodash/isFunction
      // 'lodash': 'lodash-es',
    };

    return config;
  },
};

// BIZLEVEL: Объединяем MDX и Bundle Analyzer конфигурации
module.exports = withBundleAnalyzer(createMDX()(nextConfig));
