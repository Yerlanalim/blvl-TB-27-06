import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, FileQuestion, CheckCircle, Clock, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { getBusinessLevelBySlug } from '@/utils/constants/business-levels';
import { getQuestionsByTag } from '@/utils/data/questions/get-questions-by-tag';
import { cn } from '@/lib/utils';

interface PageProps {
  params: {
    slug: string;
  };
}

// Генерация метаданных для SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const level = getBusinessLevelBySlug(params.slug);
  
  if (!level) {
    return {
      title: 'Уровень не найден - BizLevel',
    };
  }

  return {
    title: `${level.title} - BizLevel`,
    description: level.description,
    keywords: ['обучение бизнесу', level.title.toLowerCase(), 'предпринимательство', 'бизнес-курсы'],
  };
}

// TODO: В будущем получать прогресс пользователя из базы данных
const getUserLevelProgress = async (levelSlug: string): Promise<{
  completedLessons: number;
  currentLessonIndex: number;
}> => {
  // BIZLEVEL: Заглушка для прогресса пользователя
  // В будущем здесь будет запрос к базе данных
  if (levelSlug === 'level-1') {
    return {
      completedLessons: 3, // Пример: 3 урока завершено
      currentLessonIndex: 3, // Текущий урок - 4-й (индекс 3)
    };
  }
  return {
    completedLessons: 0,
    currentLessonIndex: 0,
  };
};

// Компонент карточки урока
interface LessonCardProps {
  lesson: any; // Используем any для данных из getQuestionsByTag
  lessonNumber: number;
  status: 'completed' | 'current' | 'locked';
  estimatedTime: number;
}

function LessonCard({ lesson, lessonNumber, status, estimatedTime }: LessonCardProps) {
  const isAccessible = status !== 'locked';
  
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="size-5 text-green-500" />;
      case 'current':
        return <Clock className="size-5 text-blue-500" />;
      case 'locked':
        return <Lock className="size-5 text-gray-400" />;
    }
  };

  const getTypeIcon = () => {
    return lesson.questionType === 'VIDEO' 
      ? <PlayCircle className="size-5 text-purple-500" />
      : <FileQuestion className="size-5 text-orange-500" />;
  };

  const getTypeLabel = () => {
    return lesson.questionType === 'VIDEO' ? 'Видео-урок' : 'Тест';
  };

  const cardContent = (
    <Card className={cn(
      'transition-all duration-300 border border-black-50 bg-black-75',
      isAccessible ? 'hover:border-accent cursor-pointer' : 'opacity-60 cursor-not-allowed',
      status === 'current' && 'border-blue-500 bg-blue-500/5',
      status === 'completed' && 'border-green-500/50 bg-green-500/5'
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
              {lessonNumber}
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-base">{lesson.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                {getTypeIcon()}
                <span>{getTypeLabel()}</span>
              </div>
            </div>
          </div>
          {getStatusIcon()}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="size-4" />
            <span>~{estimatedTime} мин</span>
          </div>
          {status === 'completed' && (
            <Badge variant="secondary" className="text-green-500 border-green-500/20">
              Завершено
            </Badge>
          )}
          {status === 'current' && (
            <Badge variant="secondary" className="text-blue-500 border-blue-500/20">
              Текущий
            </Badge>
          )}
          {status === 'locked' && (
            <Badge variant="secondary" className="text-gray-400 border-gray-400/20">
              Заблокировано
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (!isAccessible) {
    return cardContent;
  }

  return (
    <Link href={`/question/${lesson.slug}`} className="block">
      {cardContent}
    </Link>
  );
}

export default async function LevelPage({ params }: PageProps) {
  const level = getBusinessLevelBySlug(params.slug);
  
  if (!level) {
    notFound();
  }

  // Получаем вопросы для этого уровня
  const levelQuestionsData = await getQuestionsByTag(params.slug);
  
  // BIZLEVEL: Отладочная информация для проверки данных
  console.log('🔍 Отладка данных уровня:', {
    slug: params.slug,
    questionsDataLength: levelQuestionsData.length,
    questionsData: levelQuestionsData.map(tag => ({
      tagName: tag.name,
      questionsCount: tag.questions?.length || 0
    }))
  });
  
  const levelQuestions = levelQuestionsData
    .flatMap(tag => tag.questions.map(q => q.question))
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  // Получаем прогресс пользователя
  const { completedLessons, currentLessonIndex } = await getUserLevelProgress(params.slug);
  
  // Вычисляем прогресс в процентах
  const progressPercentage = levelQuestions.length > 0 
    ? Math.round((completedLessons / levelQuestions.length) * 100)
    : 0;

  // Определяем статус каждого урока
  const lessonsWithStatus = levelQuestions.map((lesson, index) => {
    let status: 'completed' | 'current' | 'locked';
    
    if (index < completedLessons) {
      status = 'completed';
    } else if (index === currentLessonIndex) {
      status = 'current';
    } else {
      status = 'locked';
    }

    return {
      ...lesson,
      status,
      estimatedTime: lesson.questionType === 'VIDEO' ? 10 : 5, // Примерное время
    };
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Навигация назад */}
      <div className="mb-6">
        <Link 
          href="/levels" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="size-4" />
          Вернуться к уровням
        </Link>
      </div>

      {/* Заголовок уровня */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg">
            {level.level}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{level.title}</h1>
            <p className="text-gray-400">{level.description}</p>
          </div>
        </div>

        {/* Прогресс уровня */}
        <div className="bg-black-75 border border-black-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-400">
              Прогресс уровня: {completedLessons} из {levelQuestions.length} уроков
            </div>
            <div className="text-sm font-semibold text-accent">
              {progressPercentage}%
            </div>
          </div>
          <Progress value={progressPercentage} className="border border-black-50 bg-black-50" />
        </div>
      </div>

      {/* Список уроков */}
      {levelQuestions.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Уроки уровня</h2>
          {lessonsWithStatus.map((lesson, index) => (
            <LessonCard
              key={lesson.uid}
              lesson={lesson}
              lessonNumber={index + 1}
              status={lesson.status}
              estimatedTime={lesson.estimatedTime}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-black-75 border border-black-50 rounded-lg p-8">
            <h3 className="text-lg font-semibold mb-2">Уроки готовятся</h3>
            <p className="text-gray-400 mb-4">
              Материалы для этого уровня находятся в разработке
            </p>
            <Link href="/levels">
              <Button variant="secondary">
                Вернуться к уровням
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Информационный блок */}
      <div className="mt-12">
        <div className="bg-black-75 border border-black-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">💡 Как проходить уроки?</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>• Изучайте материалы последовательно - каждый урок открывается после завершения предыдущего</p>
            <p>• Видео-уроки содержат теоретические знания и практические примеры</p>
            <p>• Тесты помогают закрепить изученный материал и проверить понимание</p>
            <p>• Используйте дополнительные ресурсы для углубленного изучения тем</p>
          </div>
        </div>
      </div>
    </div>
  );
} 