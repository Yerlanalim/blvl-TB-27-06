// BIZLEVEL: Оптимизированный компонент изображения с lazy loading

'use client';

import { useState, useRef, useEffect, forwardRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useIntersectionObserver, useAdaptiveLoading } from '@/hooks/use-performance';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  loading?: 'lazy' | 'eager';
  lowQualitySrc?: string; // Для медленных соединений
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({
    src,
    alt,
    width,
    height,
    className,
    priority = false,
    quality = 75,
    placeholder = 'empty',
    blurDataURL,
    sizes,
    fill = false,
    loading = 'lazy',
    lowQualitySrc,
    onLoad,
    onError,
    ...props
  }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [imageSrc, setImageSrc] = useState(src);
    const imageRef = useRef<HTMLImageElement | null>(null);
    
    const shouldLoadHeavyContent = useAdaptiveLoading();
    const { hasBeenVisible } = useIntersectionObserver(imageRef as React.RefObject<Element>, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    // Определяем какое изображение загружать в зависимости от производительности
    useEffect(() => {
      if (!shouldLoadHeavyContent && lowQualitySrc) {
        setImageSrc(lowQualitySrc);
      } else {
        setImageSrc(src);
      }
    }, [src, lowQualitySrc, shouldLoadHeavyContent]);

    const handleLoad = () => {
      setIsLoaded(true);
      onLoad?.();
    };

    const handleError = () => {
      setHasError(true);
      onError?.();
    };

    // Не загружаем изображение пока оно не станет видимым (если не priority)
    const shouldLoad = priority || hasBeenVisible;

    if (hasError) {
      return (
        <div 
          ref={imageRef}
          className={cn(
            'flex items-center justify-center bg-gray-100 text-gray-400',
            className
          )}
          style={{ width, height }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      );
    }

    if (!shouldLoad) {
      return (
        <div
          ref={imageRef}
          className={cn(
            'animate-pulse bg-gray-200 flex items-center justify-center',
            className
          )}
          style={{ width, height }}
        >
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      );
    }

    return (
      <div
        ref={imageRef}
        className={cn('relative overflow-hidden', className)}
        style={!fill ? { width, height } : undefined}
      >
        <Image
          ref={ref}
          src={imageSrc}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          quality={shouldLoadHeavyContent ? quality : Math.min(quality, 50)}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          sizes={sizes}
          loading={loading}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            fill ? 'object-cover' : ''
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
        
        {/* Loading placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage; 