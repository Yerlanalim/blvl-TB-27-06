import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { getLastLesson } from '@/actions/user/get-last-lesson';

export default async function ContinueJourney(opts: {
  text?: string;
  variant?: 'accent' | 'secondary' | 'default' | 'ghost';
}) {
  const lastLessonData = await getLastLesson();

  // Определяем URL и текст кнопки
  const buttonUrl = lastLessonData.nextLessonUrl || '/roadmaps';
  const defaultText = lastLessonData.isNewUser 
    ? 'Начать обучение'
    : lastLessonData.nextLessonUrl 
      ? 'Продолжить обучение' 
      : 'Карта уровней';

  return (
    <Button
      href={buttonUrl}
      variant={opts.variant || 'accent'}
      className="flex items-center gap-2"
    >
      <span className="hidden md:block">{opts.text || defaultText}</span>
      <span className="block md:hidden">
        {lastLessonData.isNewUser ? 'Начать' : 'Продолжить'}
      </span>
      <ArrowRightIcon className="w-4 h-4" />
    </Button>
  );
}
