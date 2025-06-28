'use client';

import { useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';

interface VerticalVideoPlayerProps {
  videoId: string;
  onComplete?: () => void;
  className?: string;
}

export default function VerticalVideoPlayer({
  videoId,
  onComplete,
  className = '',
}: VerticalVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !videoId) return;

    // Создаем Vimeo player
    const vimeoPlayer = new Player(containerRef.current, {
      id: parseInt(videoId) || 0, // Конвертируем в число
      width: 320,
      height: 568, // 9:16 aspect ratio
      responsive: true,
      playsinline: true,
      controls: true,
      autopause: false,
    });

    // Сохраняем ссылку на плеер для очистки

    // Обработчики событий
    vimeoPlayer.on('loaded', () => {
      setIsLoading(false);
    });

    vimeoPlayer.on('ended', () => {
      onComplete?.();
    });

    vimeoPlayer.on('error', (error) => {
      console.error('Vimeo player error:', error);
      setIsLoading(false);
    });

    return () => {
      vimeoPlayer.destroy();
    };
  }, [videoId, onComplete]);

  return (
    <div className={`relative ${className}`}>
      {/* Контейнер для видео */}
      <div className="relative mx-auto max-w-sm">
        {/* Loader */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black-75 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          </div>
        )}
        
        {/* Vimeo Player Container */}
        <div
          ref={containerRef}
          className="w-full aspect-[9/16] rounded-lg overflow-hidden bg-black-75"
          style={{
            maxHeight: '80vh',
          }}
        />
      </div>

      {/* Мобильные стили для полноэкранного режима */}
      <style jsx>{`
        @media (max-width: 768px) {
          .vimeo-player {
            width: 100vw !important;
            height: 100vh !important;
            max-height: none !important;
          }
        }
      `}</style>
    </div>
  );
} 