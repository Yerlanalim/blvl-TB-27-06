'use client';

import { cn } from '@/lib/utils';
import type { Question } from '@/types';
// BIZLEVEL: Заменяем lodash uniqueId на нативную JS функцию
const uniqueId = (prefix = '') => `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export default function QuestionCardClient({
  children,
  questionData,
  offset,
}: {
  children: React.ReactNode;
  questionData: Question | null;
  offset: number;
}) {
  const key = questionData?.slug || uniqueId('study-path-question-card-skeleton-');

  return (
    <div
      key={key}
      className={cn('relative w-full flex justify-center transition-all duration-300')}
      style={{
        transform: `translateX(${offset}%)`,
      }}
    >
      {children}
    </div>
  );
}
