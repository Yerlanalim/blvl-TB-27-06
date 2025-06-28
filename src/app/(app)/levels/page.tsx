import { Metadata } from 'next';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { businessLevels, getBusinessLevelBySlug } from '@/utils/constants/business-levels';
import { Lock, CheckCircle, Clock, PlayCircle, FileQuestion } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Карта уровней - BizLevel',
  description: 'Изучайте бизнес пошагово с нашей системой уровней. От основ до продвинутых тем предпринимательства.',
  keywords: ['обучение бизнесу', 'уровни обучения', 'предпринимательство', 'бизнес-курсы'],
};

// TODO: В будущем получать прогресс пользователя из базы данных
const getUserProgress = async (levelSlug: string): Promise<number> => {
  // BIZLEVEL: Заглушка для прогресса пользователя
  // В будущем здесь будет запрос к базе данных
  if (levelSlug === 'level-1') {
    return 42; // Пример: 42% прогресса первого уровня
  }
  return 0;
};

const isLevelUnlocked = async (levelSlug: string): Promise<boolean> => {
  // BIZLEVEL: Логика разблокировки уровней
  // В будущем здесь будет проверка завершения предыдущих уровней
  const level = getBusinessLevelBySlug(levelSlug);
  if (!level) return false;
  
  // Первый уровень всегда разблокирован
  if (level.level === 1) return true;
  
  // TODO: Проверить завершение предыдущего уровня
  return false;
};

interface LevelCardProps {
  level: typeof businessLevels[0];
  progress: number;
  isUnlocked: boolean;
}

function LevelCard({ level, progress, isUnlocked }: LevelCardProps) {
  const isCompleted = progress === 100;
  
  return (
    <Card className={cn(
      'h-fit w-full overflow-hidden transition-all duration-300 bg-[#090909] hover:border-black border border-black-50 group',
      !isUnlocked && 'opacity-75'
    )}>
      <CardHeader className="relative p-0">
        <div className="relative p-6 text-primary-foreground group-hover:opacity-80 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                {level.level}
              </div>
              <h3 className="text-xl font-bold">{level.title}</h3>
            </div>
            {!isUnlocked && <Lock className="size-5 text-gray-400" />}
            {isCompleted && <CheckCircle className="size-5 text-green-500" />}
          </div>
          <p className="text-sm text-gray-400 line-clamp-3">{level.description}</p>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 pt-3 relative">
        <div className="flex flex-col gap-y-3 w-full">
          {/* Статистика уроков */}
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <PlayCircle className="size-4" />
              <span>{level.videoLessons} видео</span>
            </div>
            <div className="flex items-center gap-1">
              <FileQuestion className="size-4" />
              <span>{level.testLessons} тестов</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="size-4" />
              <span>{level.estimatedTime} мин</span>
            </div>
          </div>
          
          {/* Прогресс */}
          <div className="text-sm text-gray-400 font-onest">
            {isCompleted ? (
              <div className="flex items-center gap-x-2">
                <CheckCircle className="size-4 text-green-500" />
                <p className="text-sm text-gray-400 font-onest">Завершен</p>
              </div>
            ) : progress > 0 ? (
              `${Math.round(progress)}% завершено`
            ) : (
              !isUnlocked ? level.unlockCondition : 'Готов к изучению'
            )}
          </div>
          
          {isUnlocked && (
            <Progress
              className="border border-black-50 bg-black-50 relative z-10"
              value={progress}
            />
          )}
        </div>
        
        {/* Декоративная иконка */}
        <div className="absolute -bottom-16 -right-4 group-hover:-bottom-14 group-hover:-right-2 transition-all duration-300 opacity-10 group-hover:opacity-20">
          <div className="text-8xl font-bold text-accent">
            {level.level}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        {isUnlocked ? (
          <Link href={`/level/${level.slug}`} className="w-full">
            <Button
              className="w-full"
              variant={progress > 0 ? 'default' : 'secondary'}
            >
              {isCompleted 
                ? 'Повторить' 
                : progress > 0 
                  ? 'Продолжить' 
                  : 'Начать изучение'
              }
            </Button>
          </Link>
        ) : (
          <Button className="w-full" variant="secondary" disabled>
            <Lock className="size-4 mr-2" />
            Заблокировано
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default async function LevelsPage() {
  // Получаем прогресс для каждого уровня
  const levelsWithProgress = await Promise.all(
    businessLevels.map(async (level) => ({
      ...level,
      progress: await getUserProgress(level.slug),
      isUnlocked: await isLevelUnlocked(level.slug),
    }))
  );

  const totalProgress = levelsWithProgress.reduce((acc, level) => acc + level.progress, 0) / levelsWithProgress.length;
  const completedLevels = levelsWithProgress.filter(level => level.progress === 100).length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Заголовок страницы */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">
          Карта уровней BizLevel
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
          Изучайте бизнес пошагово. Каждый уровень содержит видео-уроки и практические тесты 
          для закрепления знаний.
        </p>
        
        {/* Общая статистика */}
        <div className="flex justify-center gap-8 text-sm text-gray-400">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{Math.round(totalProgress)}%</div>
            <div>Общий прогресс</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{completedLevels}</div>
            <div>Завершено уровней</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{businessLevels.length}</div>
            <div>Всего уровней</div>
          </div>
        </div>
      </div>

      {/* Сетка уровней */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levelsWithProgress.map((level) => (
          <LevelCard
            key={level.slug}
            level={level}
            progress={level.progress}
            isUnlocked={level.isUnlocked}
          />
        ))}
      </div>

      {/* Информационный блок */}
      <div className="mt-12 text-center">
        <div className="bg-black-75 border border-black-50 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-2">Как работает система уровней?</h3>
          <p className="text-sm text-gray-400">
            Каждый уровень разблокируется после завершения предыдущего. 
            Изучайте видео-уроки и проходите тесты для закрепления знаний. 
            Ваш прогресс сохраняется автоматически.
          </p>
        </div>
      </div>
    </div>
  );
} 