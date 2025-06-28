'use client';

import { Button } from '@/components/ui/button';
import { ArrowUpRight, BookOpen, Target, Users } from 'lucide-react';
import Link from 'next/link';

interface WelcomeBentoBoxProps {
  hasAnsweredAnyQuestion: boolean;
}

export default function WelcomeBentoBox({ hasAnsweredAnyQuestion }: WelcomeBentoBoxProps) {
  const title = hasAnsweredAnyQuestion ? 'Продолжить обучение' : 'Добро пожаловать в BizLevel!';
  const description = hasAnsweredAnyQuestion 
    ? 'Вернитесь к изучению бизнеса и продолжите свой путь к успеху!'
    : 'Начните свой путь в мире предпринимательства с нашей пошаговой системой обучения бизнесу.';
  
  const buttonText = hasAnsweredAnyQuestion ? 'Продолжить' : 'Начать обучение';

  return (
    <Link
      href="/levels"
      className="flex flex-col p-4 h-full group relative"
    >
      <div className="flex w-full justify-between mb-4 gap-4">
        <div className="space-y-1">
          <h6 className="text-xl font-semibold">{title}</h6>
          <p className="text-xs font-onest text-gray-400">
            {description}
          </p>
        </div>
        <Button variant="accent" className="size-10" padding="none">
          <ArrowUpRight className="size-5 group-hover:rotate-45 duration-300" />
        </Button>
      </div>

      {!hasAnsweredAnyQuestion && (
        <div className="flex flex-col space-y-3 mt-2">
          <h6 className="text-sm font-medium">Что вас ждет:</h6>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <BookOpen className="size-4 text-accent" />
              <span>5 уровней обучения от основ до экспертизы</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <Target className="size-4 text-accent" />
              <span>Практические задания и видео-уроки</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <Users className="size-4 text-accent" />
              <span>Персональный AI-наставник Leo</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-auto pt-4">
        <Button 
          variant="accent" 
          className="w-full group-hover:bg-accent/90 transition-colors"
        >
          {buttonText}
        </Button>
      </div>
    </Link>
  );
} 