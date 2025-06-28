'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Player from '@vimeo/player';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

interface VerticalVideoPlayerProps {
  videoId: string;
  onComplete?: () => void;
  onPlay?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  title?: string;
  className?: string;
  // Мобильные свайп-жесты
  enableSwipeNavigation?: boolean;
  isFullscreen?: boolean;
  onExitFullscreen?: () => void;
}

export default function VerticalVideoPlayer({
  videoId,
  onComplete,
  onPlay,
  onNext,
  onPrevious,
  title,
  className = '',
  enableSwipeNavigation = true,
  isFullscreen = false,
  onExitFullscreen,
}: VerticalVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !videoId) return;

    // Проверяем прогресс из localStorage
    const savedProgress = localStorage.getItem(`videoProgress-${videoId}`);
    if (savedProgress) {
      setHasStartedPlaying(true);
      setShowNextButton(true);
    }

    // Создаем Vimeo player
    const vimeoPlayer = new Player(containerRef.current, {
      id: parseInt(videoId) || 0,
      width: isFullscreen ? window.innerWidth : 320,
      height: isFullscreen ? window.innerHeight : 568,
      responsive: true,
      playsinline: true, // Важно для мобильных!
      controls: true,
      autopause: false,
      dnt: true, // Не отслеживать пользователей
      autoplay: false,
    });

    // Обработчики событий
    vimeoPlayer.on('loaded', () => {
      setIsLoading(false);
    });

    vimeoPlayer.on('play', () => {
      if (!hasStartedPlaying) {
        setHasStartedPlaying(true);
        setShowNextButton(true);
        onPlay?.();
        
        // Сохраняем прогресс в localStorage
        localStorage.setItem(`videoProgress-${videoId}`, 'started');
      }
      // Скрываем контролы во время воспроизведения
      setTimeout(() => setShowControls(false), 3000);
    });

    vimeoPlayer.on('pause', () => {
      setShowControls(true);
    });

    vimeoPlayer.on('ended', () => {
      // Сохраняем завершение в localStorage
      localStorage.setItem(`videoProgress-${videoId}`, 'completed');
      setShowControls(true);
      onComplete?.();
    });

    vimeoPlayer.on('error', (error) => {
      console.error('Vimeo player error:', error);
      setIsLoading(false);
    });

    return () => {
      vimeoPlayer.destroy();
    };
  }, [videoId, onComplete, onPlay, hasStartedPlaying, isFullscreen]);

  // Обработчик свайп-жестов
  const handlePan = (event: any, info: PanInfo) => {
    if (!enableSwipeNavigation) return;

    const threshold = 50; // Минимальное расстояние для срабатывания свайпа
    const velocity = 0.3; // Минимальная скорость

    // Горизонтальные свайпы для навигации
    if (Math.abs(info.offset.x) > threshold && Math.abs(info.velocity.x) > velocity) {
      if (info.offset.x > 0 && onPrevious) {
        // Свайп вправо - предыдущий урок
        onPrevious();
      } else if (info.offset.x < 0 && onNext) {
        // Свайп влево - следующий урок
        onNext();
      }
    }

    // Вертикальный свайп вниз для выхода из полноэкранного режима
    if (isFullscreen && info.offset.y > threshold && Math.abs(info.velocity.y) > velocity) {
      onExitFullscreen?.();
    }
  };

  const handleNextClick = () => {
    onNext ? onNext() : onComplete?.();
  };

  const handlePreviousClick = () => {
    onPrevious?.();
  };

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 bg-black flex items-center justify-center'
    : `relative ${className}`;

  return (
    <motion.div 
      className={containerClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onPan={handlePan}
      onTap={() => setShowControls(!showControls)}
    >
      {/* Кнопка выхода из полноэкранного режима */}
      {isFullscreen && (
        <motion.button
          onClick={onExitFullscreen}
          className="absolute top-4 right-4 z-20 bg-black/70 backdrop-blur-sm rounded-full p-2 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <X className="w-6 h-6" />
        </motion.button>
      )}

      {/* Overlay с заголовком урока сверху */}
      {title && (
        <motion.div 
          className="absolute top-4 left-4 right-16 z-10 bg-black/70 backdrop-blur-sm rounded-lg p-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showControls ? 1 : 0, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h2 className="text-white font-semibold text-sm md:text-base font-onest">
            {title}
          </h2>
        </motion.div>
      )}

      {/* Индикаторы свайпа (только на мобильных) */}
      {enableSwipeNavigation && !isFullscreen && (
        <>
          {/* Левый индикатор - предыдущий урок */}
          {onPrevious && (
            <motion.div
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 0.6 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                <ChevronLeft className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          )}

          {/* Правый индикатор - следующий урок */}
          {onNext && (
            <motion.div
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 0.6 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* Контейнер для видео */}
      <div className={`relative ${isFullscreen ? 'w-full h-full' : 'mx-auto max-w-sm'}`}>
        {/* Loader */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-black-75 rounded-lg z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Vimeo Player Container */}
        <div
          ref={containerRef}
          className={`w-full ${
            isFullscreen 
              ? 'h-full' 
              : 'aspect-[9/16] rounded-lg overflow-hidden bg-black-75'
          }`}
          style={{
            maxHeight: isFullscreen ? '100vh' : '80vh',
          }}
        />
      </div>

      {/* Навигационные кнопки снизу */}
      <AnimatePresence>
        {showNextButton && showControls && (
          <motion.div 
            className={`absolute z-10 ${
              isFullscreen 
                ? 'bottom-8 left-8 right-8' 
                : 'bottom-4 left-4 right-4'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex gap-3">
              {/* Кнопка "Назад" */}
              {onPrevious && (
                <Button 
                  onClick={handlePreviousClick}
                  variant="outline"
                  className="flex-1 bg-black/70 hover:bg-black/90 text-white border-white/20 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg backdrop-blur-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Назад
                </Button>
              )}

              {/* Кнопка "Далее" */}
              <Button 
                onClick={handleNextClick}
                className="flex-1 bg-accent hover:bg-accent/90 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg"
              >
                Далее
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Подсказка о свайп-жестах (показывается только при первом просмотре) */}
      {enableSwipeNavigation && !hasStartedPlaying && !isFullscreen && (
        <motion.div
          className="absolute bottom-20 left-4 right-4 z-10 bg-black/70 backdrop-blur-sm rounded-lg p-3 lg:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 2, duration: 0.4 }}
        >
          <p className="text-white text-xs text-center">
            💡 Свайпайте влево/вправо для навигации между уроками
          </p>
        </motion.div>
      )}
    </motion.div>
  );
} 