// BIZLEVEL: Компонент для оптимизации производительности приложения

'use client';

import { useEffect } from 'react';
import { preloadCriticalResources } from '@/utils/performance/bundle-optimization';
import { useIdlePreload, usePerformanceMonitor } from '@/hooks/use-performance';

interface PerformanceOptimizerProps {
  enablePreload?: boolean;
  enableMonitoring?: boolean;
  children?: React.ReactNode;
}

export default function PerformanceOptimizer({
  enablePreload = true,
  enableMonitoring = process.env.NODE_ENV === 'development',
  children
}: PerformanceOptimizerProps) {
  // Мониторинг производительности
  const metrics = usePerformanceMonitor('PerformanceOptimizer');

  // Предзагрузка критических ресурсов при idle
  useIdlePreload(() => {
    if (enablePreload) {
      preloadCriticalResources();
    }
  }, 1000);

  useEffect(() => {
    // Оптимизация для мобильных устройств
    if (typeof window !== 'undefined') {
      // Отключаем hover эффекты на touch устройствах
      if ('ontouchstart' in window) {
        document.documentElement.classList.add('touch-device');
      }

      // Оптимизация прокрутки
      const style = document.createElement('style');
      style.textContent = `
        * {
          -webkit-overflow-scrolling: touch;
        }
        
        .touch-device *:hover {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Оптимизация анимаций для слабых устройств */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Оптимизация для медленных соединений */
        @media (prefers-reduced-data: reduce) {
          .lazy-load-image {
            background-image: none !important;
          }
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  // Предзагрузка DNS для внешних ресурсов
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const preloadDomains = [
        'fonts.googleapis.com',
        'fonts.gstatic.com',
        'player.vimeo.com',
        'lbycuccwrcmdaxjqyxut.supabase.co'
      ];

      preloadDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = `//${domain}`;
        document.head.appendChild(link);
      });
    }
  }, []);

  // Логирование метрик в development
  useEffect(() => {
    if (enableMonitoring && metrics.renderTime > 0) {
      console.log('[Performance] App metrics:', {
        renderTime: `${metrics.renderTime}ms`,
        isSlowDevice: metrics.isSlowDevice,
        connectionType: metrics.connectionType,
        memoryUsage: metrics.memoryUsage ? `${Math.round(metrics.memoryUsage / 1024 / 1024)}MB` : 'N/A'
      });
    }
  }, [metrics, enableMonitoring]);

  return <>{children}</>;
} 