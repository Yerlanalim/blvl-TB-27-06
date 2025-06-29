// BIZLEVEL: Хук для мониторинга и оптимизации производительности

import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce, throttle } from '@/utils/performance/bundle-optimization';

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage?: number;
  isSlowDevice: boolean;
  connectionType: string;
}

/**
 * Хук для мониторинга производительности компонента
 */
export function usePerformanceMonitor(componentName: string) {
  const renderStartTime = useRef<number>(Date.now());
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    isSlowDevice: false,
    connectionType: 'unknown'
  });

  useEffect(() => {
    const renderTime = Date.now() - renderStartTime.current;
    
    // Определяем медленное устройство по времени рендера
    const isSlowDevice = renderTime > 100;
    
    // Получаем информацию о соединении
    const connectionType = (navigator as any)?.connection?.effectiveType || 'unknown';
    
    // Получаем информацию о памяти (если доступно)
    const memoryUsage = (performance as any)?.memory?.usedJSHeapSize;

    setMetrics({
      renderTime,
      memoryUsage,
      isSlowDevice,
      connectionType
    });

    // В development логируем метрики
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${componentName}:`, {
        renderTime: `${renderTime}ms`,
        isSlowDevice,
        connectionType,
        memoryUsage: memoryUsage ? `${Math.round(memoryUsage / 1024 / 1024)}MB` : 'N/A'
      });
    }
  }, [componentName]);

  return metrics;
}

/**
 * Хук для оптимизированного debounced поиска
 */
export function useDebouncedSearch(
  searchFn: (query: string) => void,
  delay: number = 300
) {
  const debouncedSearch = useCallback(
    debounce(searchFn, delay),
    [searchFn, delay]
  );

  return debouncedSearch;
}

/**
 * Хук для throttled скролла
 */
export function useThrottledScroll(
  scrollFn: (event: Event) => void,
  limit: number = 100
) {
  const throttledScroll = useCallback(
    throttle(scrollFn, limit),
    [scrollFn, limit]
  );

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [throttledScroll]);

  return throttledScroll;
}

/**
 * Хук для определения видимости элемента (Intersection Observer)
 */
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        
        if (visible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, hasBeenVisible, options]);

  return { isVisible, hasBeenVisible };
}

/**
 * Хук для адаптивной загрузки контента в зависимости от производительности
 */
export function useAdaptiveLoading() {
  const [shouldLoadHeavyContent, setShouldLoadHeavyContent] = useState(true);

  useEffect(() => {
    // Проверяем характеристики устройства
    const connection = (navigator as any)?.connection;
    const memory = (navigator as any)?.deviceMemory;
    const cores = navigator.hardwareConcurrency;

    // Определяем стоит ли загружать тяжелый контент
    const isSlowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === '3g';
    const isLowMemory = memory && memory < 4; // < 4GB RAM
    const isLowCore = cores && cores < 4; // < 4 cores

    if (isSlowConnection || isLowMemory || isLowCore) {
      setShouldLoadHeavyContent(false);
    }
  }, []);

  return shouldLoadHeavyContent;
}

/**
 * Хук для предзагрузки ресурсов при idle состоянии
 */
export function useIdlePreload(preloadFn: () => void, delay: number = 2000) {
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const timeoutId = setTimeout(() => {
        (window as any).requestIdleCallback(preloadFn, { timeout: 5000 });
      }, delay);

      return () => clearTimeout(timeoutId);
    } else {
      // Fallback для браузеров без requestIdleCallback
      const timeoutId = setTimeout(preloadFn, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [preloadFn, delay]);
}

/**
 * Хук для оптимизированного управления состоянием списков
 */
export function useVirtualizedList<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(visibleStart, visibleEnd);
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleStart * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll,
    visibleStart,
    visibleEnd
  };
}

/**
 * Хук для мониторинга FPS
 */
export function useFPSMonitor() {
  const [fps, setFps] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let animationId: number;

    const measureFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime.current + 1000) {
        setFps(Math.round((frameCount.current * 1000) / (currentTime - lastTime.current)));
        frameCount.current = 0;
        lastTime.current = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return fps;
} 