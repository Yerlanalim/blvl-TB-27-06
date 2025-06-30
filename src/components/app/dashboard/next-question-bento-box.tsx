import { Button } from '@/components/ui/button';
import TagDisplay from '@/components/app/questions/tag-display';
import { ArrowUpRight } from 'lucide-react';

import Link from 'next/link';
import { DatePicker } from '@mantine/dates';
import { getUserDailyStats } from '@/utils/data/user/authed/get-daily-streak';
import { getLastLesson } from '@/actions/user/get-last-lesson';

export default async function NextQuestionBentoBox() {
  // get the user streak and last lesson in one go
  const [userStreak, lastLessonData] = await Promise.all([
    getUserDailyStats(),
    getLastLesson(),
  ]);

  // get the streak start date and streak end date
  const startDate = userStreak?.streakData?.streakStart as Date;
  const endDate = userStreak?.streakData?.streakEnd as Date;

  // create an array of dates between the start and end date
  const dateArray: [Date, Date] = [startDate, endDate];

  // Если нет следующего урока, показываем что обучение завершено
  if (!lastLessonData.nextLessonUrl) {
    return (
      <div className="p-4">
        <div className="flex flex-col gap-y-4 p-4 border border-green-500/20 bg-green-500/10 rounded-lg">
          <h6 className="text-lg text-green-400">🎉 Поздравляем!</h6>
          <p className="text-sm text-gray-300">
            Вы завершили все доступные уроки. Скоро появятся новые материалы!
          </p>
          <Button href="/levels" variant="secondary" className="w-fit">
            Посмотреть все уровни
          </Button>
        </div>
      </div>
    );
  }

  // Определяем теги для отображения (заглушка для бизнес-тем)
  const businessTags = [
    { tag: { name: 'Бизнес-модели', uid: 'business-models' }, questionId: 'q1', tagId: 't1', uid: 'bt1' },
    { tag: { name: 'SMART-цели', uid: 'smart-goals' }, questionId: 'q2', tagId: 't2', uid: 'bt2' },
    { tag: { name: 'Целевая аудитория', uid: 'target-audience' }, questionId: 'q3', tagId: 't3', uid: 'bt3' },
    { tag: { name: 'Маркетинг', uid: 'marketing' }, questionId: 'q4', tagId: 't4', uid: 'bt4' },
    { tag: { name: 'Продажи', uid: 'sales' }, questionId: 'q5', tagId: 't5', uid: 'bt5' },
  ];

  return (
    <Link
      href={lastLessonData.nextLessonUrl}
      className="flex flex-col p-4 h-full group relative"
    >
      <>
        <div className="flex w-full justify-between mb-4 gap-4">
          <div className="space-y-1">
            <h6 className="text-xl">
              {lastLessonData.isNewUser ? 'Начните изучение бизнеса' : 'Ваш следующий урок готов'}
            </h6>
            <p className="text-xs font-onest text-gray-400">
              {lastLessonData.isNewUser 
                ? 'Добро пожаловать! Начните свой путь в мире бизнеса с первого урока.'
                : 'Потратьте всего 5-10 минут на следующий урок и продолжите изучение бизнеса!'
              }
            </p>
          </div>
          <Button variant="accent" className="size-10" padding="none">
            <ArrowUpRight className="size-5 group-hover:rotate-45 duration-300" />
          </Button>
        </div>
        
        {/* Показываем прогресс если есть */}
        {lastLessonData.progress && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">
                Урок {lastLessonData.progress.current} из {lastLessonData.progress.total}
              </span>
              <span className="text-xs text-gray-400">
                {lastLessonData.progress.percentage}%
              </span>
            </div>
            <div className="w-full bg-black-50 rounded-full h-1.5">
              <div 
                className="bg-accent h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${lastLessonData.progress.percentage}%` }}
              />
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap space-y-2 w-full items-end justify-between">
          <div className="space-y-1">
            <h6>Темы для изучения:</h6>
            <div className="flex gap-x-2 mt-2">
              <TagDisplay tags={businessTags} numberOfTags={2} variant="default" />
            </div>
          </div>
        </div>

        <div className="w-fit flex self-center relative -bottom-8 sm:-bottom-20 md:-bottom-8 lg:-bottom-20 group-hover:lg:-bottom-14 duration-300">
          <DatePicker
            className="z-30 text-white bg-black-100 border border-black-50 p-2 rounded-md hover:cursor-default xs:scale-100 sm:scale-125 md:scale-105 xl:scale-[1.2] group-hover:lg:scale-[1.07] group-hover:xl:scale-[1.22] duration-300"
            color="white"
            type="range"
            value={dateArray}
            c="gray"
            inputMode="none"
          />
        </div>
      </>
    </Link>
  );
}
