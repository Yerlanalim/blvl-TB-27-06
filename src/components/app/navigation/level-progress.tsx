'use client';

import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PlayCircle, FileQuestion, Trophy } from 'lucide-react';

interface LevelProgressProps {
  progress: {
    current: number;
    total: number;
    level: string;
    percentage: number;
    videosCompleted?: number;
    totalVideos?: number;
    testsCompleted?: number;
    totalTests?: number;
    estimatedTimeRemaining?: number; // в минутах
  };
  className?: string;
}

/**
 * BIZLEVEL: Компонент для отображения прогресса прохождения уровня
 * Показывает детализированный прогресс: видео/тесты, время, анимации
 */
export default function LevelProgress({ progress, className = '' }: LevelProgressProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  const levelDisplayName = progress.level.replace('level-', 'Уровень ');
  const isCompleted = progress.percentage >= 100;

  // Анимация процента при изменении
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(progress.percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress.percentage]);

  // Показать конфетти при завершении уровня
  useEffect(() => {
    if (isCompleted && progress.percentage === 100) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isCompleted, progress.percentage]);

  // Конфетти анимация
  const confettiParticles = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-accent rounded-full"
      initial={{ 
        x: 0, 
        y: 0, 
        opacity: 1,
        scale: 1 
      }}
      animate={{
        x: (Math.random() - 0.5) * 200,
        y: Math.random() * -100 - 50,
        opacity: 0,
        scale: 0,
        rotate: Math.random() * 360
      }}
      transition={{
        duration: 2,
        delay: i * 0.1,
        ease: "easeOut"
      }}
    />
  ));

  return (
    <div className={`flex flex-col gap-2 relative ${className}`}>
      {/* Конфетти при завершении */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confettiParticles}
        </div>
      )}

      {/* Заголовок уровня */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-300 font-medium">
          {levelDisplayName}
        </span>
        <motion.span 
          className="text-accent font-bold"
          animate={{ scale: animatedPercentage !== progress.percentage ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          {Math.round(animatedPercentage)}%
        </motion.span>
      </div>

      {/* Детализированный прогресс */}
      <div className="flex items-center justify-between text-xs md:text-sm">
        <div className="flex items-center gap-3 md:gap-4">
          {/* Видео прогресс */}
          {progress.totalVideos && (
            <div className="flex items-center gap-1">
              <PlayCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
              <span className="text-gray-300">
                Видео: {progress.videosCompleted || 0}/{progress.totalVideos}
              </span>
            </div>
          )}
          
          {/* Тесты прогресс */}
          {progress.totalTests && (
            <div className="flex items-center gap-1">
              <FileQuestion className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
              <span className="text-gray-300">
                Тесты: {progress.testsCompleted || 0}/{progress.totalTests}
              </span>
            </div>
          )}
        </div>

        {/* Примерное время */}
        {progress.estimatedTimeRemaining && progress.estimatedTimeRemaining > 0 && (
          <span className="text-gray-400 text-xs">
            ~{progress.estimatedTimeRemaining} мин
          </span>
        )}
      </div>

      {/* Прогресс-бар с анимацией */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Progress 
          value={animatedPercentage} 
          className="h-2 md:h-3 bg-black-75"
          indicatorColor="bg-accent transition-all duration-500 ease-out"
        />
      </motion.div>

      {/* Сообщение о статусе */}
      <motion.div 
        className="text-xs md:text-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {isCompleted ? (
          <div className="flex items-center gap-2 text-accent font-medium">
            <Trophy className="w-4 h-4" />
            <span>Уровень завершен! 🎉</span>
          </div>
        ) : (
          <span className="text-gray-400">
            Урок {progress.current} из {progress.total} • Осталось: {progress.total - progress.current}
          </span>
        )}
      </motion.div>
    </div>
  );
} 