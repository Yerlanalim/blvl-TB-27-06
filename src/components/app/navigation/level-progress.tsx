'use client';

import { Progress } from '@/components/ui/progress';

interface LevelProgressProps {
  progress: {
    current: number;
    total: number;
    level: string;
    percentage: number;
  };
  className?: string;
}

/**
 * BIZLEVEL: Компонент для отображения прогресса прохождения уровня
 * Показывает "Урок X из Y" и прогресс-бар
 */
export default function LevelProgress({ progress, className = '' }: LevelProgressProps) {
  const levelDisplayName = progress.level.replace('level-', 'Уровень ');

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* Информация о текущем уроке */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-300">
          {levelDisplayName} • Урок {progress.current} из {progress.total}
        </span>
        <span className="text-accent font-medium">{progress.percentage}%</span>
      </div>

      {/* Прогресс-бар */}
      <Progress 
        value={progress.percentage} 
        className="h-2 bg-black-75"
        indicatorColor="bg-accent transition-all duration-300"
      />

      {/* Дополнительная информация */}
      <div className="text-xs text-gray-400">
        {progress.current === progress.total 
          ? 'Поздравляем! Уровень завершен!' 
          : `Осталось уроков: ${progress.total - progress.current}`
        }
      </div>
    </div>
  );
} 