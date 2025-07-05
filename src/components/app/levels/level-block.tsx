'use client';
import { CheckCircle, Circle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LevelBlockProps {
  levelNumber: number;
  title: string;
  description: string;
  completed?: boolean;
  current?: boolean;
  locked?: boolean;
  onClick?: () => void;
}

/**
 * Компонент вертикального списка уровней BizLevel.
 * Отображает номер, название, описание и статус (✅ / 🟡 / 🔒).
 */
export default function LevelBlock({
  levelNumber,
  title,
  description,
  completed = false,
  current = false,
  locked = false,
  onClick,
}: LevelBlockProps) {
  let Icon = Lock;
  let iconColor = 'text-gray-500';
  if (completed) {
    Icon = CheckCircle;
    iconColor = 'text-green-400';
  } else if (current) {
    Icon = Circle;
    iconColor = 'text-yellow-400';
  }

  return (
    <li
      onClick={locked ? undefined : onClick}
      className={cn(
        'flex flex-col gap-2 p-4 border border-black-50 rounded-lg transition-transform hover:scale-105',
        locked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className={cn('w-5 h-5 flex-shrink-0', iconColor)} />
        <h3 className="text-lg text-white font-medium">
          Уровень {levelNumber}: {title}
        </h3>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed ml-8">
        {description}
      </p>
    </li>
  );
} 