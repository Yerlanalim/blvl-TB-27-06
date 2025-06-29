'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

// Lazy load Vimeo Player only when needed
const loadVimeoPlayer = () => import('@vimeo/player');

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
  const playerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);

  // Мемоизированная функция для создания плеера
  const createPlayer = useCallback(async () => {
    if (!containerRef.current || !videoId || playerRef.current) return;

    try {
      // Lazy load Vimeo Player
      const { default: Player } = await loadVimeoPlayer();
      
      // Проверяем прогресс из localStorage
      const savedProgress = localStorage.getItem(`videoProgress-${videoId}`);
      if (savedProgress) {
        setHasStartedPlaying(true);
        setShowNextButton(true);
      }

      // Определяем размеры в зависимости от устройства
      const isMobile = window.innerWidth < 768;
      const playerWidth = isFullscreen 
        ? window.innerWidth 
        : isMobile ? '100%' : 320;
      const playerHeight = isFullscreen 
        ? window.innerHeight 
        : isMobile ? 'auto' : 568;

      // Создаем Vimeo player с оптимизированными настройками
      const vimeoPlayer = new Player(containerRef.current, {
        id: parseInt(videoId) || 0,
        width: playerWidth,
        height: playerHeight,
        responsive: true,
        playsinline: true, // Критично для мобильных!
        controls: true,
        autopause: false,
        dnt: true, // Не отслеживать пользователей
        autoplay: false,
        muted: false, // Позволяем звук
        background: false, // Не фоновое видео
        pip: false, // Отключаем picture-in-picture
        keyboard: true, // Включаем клавиатурные shortcuts
        transparent: false,
      });

      playerRef.current = vimeoPlayer;

      // Обработчики событий с улучшенной обработкой ошибок
      vimeoPlayer.on('loaded', () => {
        setIsLoading(false);
        setPlayerReady(true);
      });

      vimeoPlayer.on('play', () => {
        if (!hasStartedPlaying) {
          setHasStartedPlaying(true);
          setShowNextButton(true);
          onPlay?.();
          
          // Сохраняем прогресс в localStorage
          localStorage.setItem(`videoProgress-${videoId}`, 'started');
        }
        // Скрываем контролы во время воспроизведения на мобильных
        if (window.innerWidth < 768) {
          setTimeout(() => setShowControls(false), 2000);
        }
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
        // Показываем fallback UI при ошибке
      });

      // Обработка изменения размера экрана
      const handleResize = () => {
        if (vimeoPlayer && !isFullscreen) {
          const isMobile = window.innerWidth < 768;
          vimeoPlayer.setWidth(isMobile ? '100%' : 320);
          vimeoPlayer.setHeight(isMobile ? 'auto' : 568);
        }
      };

      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };

    } catch (error) {
      console.error('Failed to load Vimeo player:', error);
      setIsLoading(false);
    }
  }, [videoId, onComplete, onPlay, hasStartedPlaying, isFullscreen]);

  // Инициализация плеера
  useEffect(() => {
    createPlayer();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [createPlayer]);

  // Обработчик свайп-жестов с улучшенной производительностью
  const handlePan = useCallback((event: any, info: PanInfo) => {
    if (!enableSwipeNavigation || !playerReady) return;

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
  }, [enableSwipeNavigation, playerReady, onNext, onPrevious, isFullscreen, onExitFullscreen]);

  const handleNextClick = useCallback(() => {
    onNext ? onNext() : onComplete?.();
  }, [onNext, onComplete]);

  const handlePreviousClick = useCallback(() => {
    onPrevious?.();
  }, [onPrevious]);

  const toggleControls = useCallback(() => {
    setShowControls(!showControls);
  }, [showControls]);

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 bg-black flex items-center justify-center'
    : `relative ${className}`;

  // Показываем превью пока загружается
  const VideoPreview = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black-75 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-2"></div>
        <p className="text-gray-400 text-sm">Загрузка видео...</p>
      </div>
    </div>
  );

  return (
    <motion.div 
      className={containerClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onPan={handlePan}
      onTap={toggleControls}
    >
      {/* Кнопка выхода из полноэкранного режима */}
      {isFullscreen && (
        <motion.button
          onClick={onExitFullscreen}
          className="absolute top-4 right-4 z-20 bg-black/70 backdrop-blur-sm rounded-full p-2 text-white safe-area-top"
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
          className="absolute top-4 left-4 right-16 z-10 bg-black/70 backdrop-blur-sm rounded-lg p-3 safe-area-top"
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
        {/* Loader с превью */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              className="absolute inset-0 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <VideoPreview />
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
            minHeight: isFullscreen ? '100vh' : '300px', // Минимальная высота для мобильных
          }}
        />
      </div>

      {/* Навигационные кнопки снизу */}
      <AnimatePresence>
        {showNextButton && showControls && (
          <motion.div 
            className={`absolute z-10 safe-area-bottom ${
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
                  className="flex-1 bg-black/70 hover:bg-black/90 text-white border-white/20 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg backdrop-blur-sm touch-manipulation"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Назад
                </Button>
              )}

              {/* Кнопка "Далее" */}
              <Button 
                onClick={handleNextClick}
                className="flex-1 bg-accent hover:bg-accent/90 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg touch-manipulation"
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
          className="absolute bottom-20 left-4 right-4 z-10 bg-black/70 backdrop-blur-sm rounded-lg p-3 lg:hidden safe-area-bottom"
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