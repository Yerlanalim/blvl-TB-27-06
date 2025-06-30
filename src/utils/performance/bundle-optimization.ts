// BIZLEVEL: Утилиты для оптимизации производительности bundle

import { ComponentType, lazy, LazyExoticComponent } from 'react';
import dynamic from 'next/dynamic';

/**
 * Создает lazy-loaded компонент с fallback UI
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: ComponentType
): LazyExoticComponent<T> {
  const LazyComponent = lazy(importFn);
  
  if (fallback) {
    return LazyComponent;
  }
  
  return LazyComponent;
}

/**
 * Создает динамически загружаемый компонент с оптимизированными настройками
 */
export function createDynamicComponent<T = any>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: {
    loading?: React.ComponentType;
    ssr?: boolean;
    loadingText?: string;
  } = {}
) {
  const { loading, ssr = false, loadingText = 'Загружаем...' } = options;

  return dynamic(importFn, {
    loading: loading || (() => {
      const React = require('react');
      return React.createElement('div', 
        { className: "flex items-center justify-center p-4" },
        React.createElement('div', 
          { className: "animate-pulse text-gray-400" },
          loadingText
        )
      );
    }) as React.ComponentType,
    ssr,
  });
}

/**
 * Предзагрузка критических ресурсов (исправлено для уменьшения webpack warnings)
 */
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Предзагружаем критические компоненты с динамической загрузкой
  // Убираем прямые импорты chart компонентов для уменьшения bundle size warnings
  const criticalImports = [
    () => import('@/components/app/questions/code-editor/editor'),
    () => import('@/components/app/leo-chat/leo-chat'),
    // Убираем total-question-chart из предзагрузки - он теперь загружается динамически
  ];

  // Предзагружаем с задержкой, чтобы не блокировать основную загрузку
  setTimeout(() => {
    criticalImports.forEach(importFn => {
      importFn().catch(() => {
        // Игнорируем ошибки предзагрузки
      });
    });
  }, 2000);
}

/**
 * Оптимизированный debounce для производительности
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle функция для ограничения частоты вызовов
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Проверка поддержки Intersection Observer для lazy loading
 */
export function supportsIntersectionObserver(): boolean {
  return typeof window !== 'undefined' && 'IntersectionObserver' in window;
}

/**
 * Оптимизированный lazy loading для изображений
 */
export function createImageLazyLoader() {
  if (!supportsIntersectionObserver()) {
    return null;
  }

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  return imageObserver;
}

/**
 * Мемоизация для дорогих вычислений
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    
    return result;
  }) as T;
}

/**
 * Очистка кэша при превышении лимита
 */
export function createLRUCache<K, V>(maxSize: number) {
  const cache = new Map<K, V>();
  
  return {
    get(key: K): V | undefined {
      if (cache.has(key)) {
        const value = cache.get(key)!;
        // Перемещаем в конец (most recently used)
        cache.delete(key);
        cache.set(key, value);
        return value;
      }
      return undefined;
    },
    
    set(key: K, value: V): void {
      if (cache.has(key)) {
        cache.delete(key);
      } else if (cache.size >= maxSize) {
        // Удаляем oldest item
        const firstKey = cache.keys().next().value;
        if (firstKey !== undefined) {
          cache.delete(firstKey);
        }
      }
      cache.set(key, value);
    },
    
    clear(): void {
      cache.clear();
    }
  };
} 