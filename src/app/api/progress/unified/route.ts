import { NextResponse } from 'next/server';
import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';
import { getLastLesson } from '@/actions/user/get-last-lesson';
import { getUserDailyStats } from '@/utils/data/user/authed/get-daily-streak';
import { cache } from 'react';
import type { UnifiedProgressData } from '@/types/Progress';

/**
 * Получение унифицированных данных прогресса пользователя
 * Объединяет все системы прогресса в один endpoint
 */
const getUnifiedProgress = cache(async (): Promise<UnifiedProgressData | null> => {
  const user = await getUser();
  
  if (!user) return null;

  try {
    // Получаем все данные параллельно для оптимизации
    const [levelTags, lastLessonData, dailyStats] = await Promise.all([
      // Получаем все уровневые теги
      prisma.tag.findMany({
        where: {
          name: {
            startsWith: 'level-'
          }
        },
        orderBy: {
          name: 'asc'
        }
      }),
      // Получаем данные о следующем уроке
      getLastLesson(),
      // Получаем статистику streak
      getUserDailyStats()
    ]);

    if (levelTags.length === 0) {
      return {
        completedLevels: 0,
        totalLevels: 5,
        overallProgress: 0,
        userXp: user.userXp || 0,
        weeklyXp: user.weeklyUserXp || 0,
        currentStreak: user.correctDailyStreak || 0,
        nextLesson: {
          slug: lastLessonData.nextLessonSlug,
          url: lastLessonData.nextLessonUrl,
          isNewUser: lastLessonData.isNewUser,
          progress: lastLessonData.progress,
        },
        totalCompletedQuestions: 0,
        totalQuestions: 0,
        levelDetails: [],
      };
    }

    const totalLevels = levelTags.length;
    let completedLevels = 0;
    let totalQuestionsInAllLevels = 0;
    let answeredQuestionsInAllLevels = 0;
    let currentLevelName = '';
    let currentLevelProgress = 0;
    const levelDetails: UnifiedProgressData['levelDetails'] = [];

    // Анализируем каждый уровень
    for (const levelTag of levelTags) {
      // Получаем все вопросы уровня
      const levelQuestions = await prisma.questions.findMany({
        where: {
          tags: {
            some: {
              tag: {
                name: levelTag.name
              }
            }
          },
          isPremiumQuestion: user.userLevel === 'FREE' ? false : undefined,
          customQuestion: user.userLevel === 'FREE' ? false : undefined,
        },
        select: {
          uid: true,
          title: true,
          questionType: true,
        }
      });

      if (levelQuestions.length === 0) continue;

      totalQuestionsInAllLevels += levelQuestions.length;

      // Получаем ответы пользователя на вопросы этого уровня
      const userAnswers = await prisma.answers.findMany({
        where: {
          userUid: user.uid,
          questionUid: {
            in: levelQuestions.map(q => q.uid)
          },
          correctAnswer: true // Только правильные ответы
        },
        select: {
          questionUid: true
        }
      });

      const answeredInLevel = userAnswers.length;
      answeredQuestionsInAllLevels += answeredInLevel;

      // Считаем уровень завершенным, если пройдено 80% или больше
      const levelProgress = levelQuestions.length > 0 
        ? (answeredInLevel / levelQuestions.length) * 100
        : 0;
      
      const isLevelCompleted = levelProgress >= 80;
      
      if (isLevelCompleted) {
        completedLevels++;
      } else {
        // Извлекаем номер уровня из названия тега 
        const levelNumber = levelTag.name.match(/\d+/)?.[0];
        const currentLevelIndex = levelNumber ? parseInt(levelNumber) - 1 : 0;
        
        // Если это следующий уровень для изучения
        if (completedLevels === currentLevelIndex) {
          currentLevelName = getLevelDisplayName(levelTag.name);
          currentLevelProgress = Math.round(levelProgress);
        }
      }

      // Добавляем детали уровня
      const levelNumber = parseInt(levelTag.name.replace('level-', ''));
      levelDetails.push({
        levelNumber,
        name: getLevelDisplayName(levelTag.name),
        completed: isLevelCompleted,
        progress: Math.round(levelProgress),
        totalQuestions: levelQuestions.length,
        completedQuestions: answeredInLevel,
        tagName: levelTag.name,
      });
    }

    // Если нет текущего уровня, но есть завершенные - показать следующий
    if (!currentLevelName && completedLevels < totalLevels) {
      const nextLevelIndex = completedLevels;
      if (levelTags[nextLevelIndex]) {
        currentLevelName = getLevelDisplayName(levelTags[nextLevelIndex].name);
        currentLevelProgress = 0;
      }
    }

    // Если все уровни завершены
    if (completedLevels >= totalLevels) {
      currentLevelName = 'Курс завершен!';
      currentLevelProgress = 100;
    }

    // Если не найден текущий уровень, показать первый
    if (!currentLevelName) {
      currentLevelName = 'Основы бизнеса';
    }

    const overallProgress = totalQuestionsInAllLevels > 0 
      ? Math.round((answeredQuestionsInAllLevels / totalQuestionsInAllLevels) * 100)
      : 0;

    // Получаем данные следующего урока с дополнительной информацией
    let nextLessonTitle = '';
    let nextLessonType: 'VIDEO' | 'MULTIPLE_CHOICE' | undefined;

    if (lastLessonData.nextLessonSlug) {
      const nextQuestion = await prisma.questions.findUnique({
        where: { slug: lastLessonData.nextLessonSlug },
        select: {
          title: true,
          questionType: true,
        }
      });
      
      nextLessonTitle = nextQuestion?.title || '';
      nextLessonType = nextQuestion?.questionType as 'VIDEO' | 'MULTIPLE_CHOICE' | undefined;
    }

    return {
      completedLevels,
      totalLevels,
      overallProgress,
      currentLevelProgress,
      userXp: user.userXp || 0,
      weeklyXp: user.weeklyUserXp || 0,
      currentStreak: dailyStats?.streakData?.currentstreakCount || user.correctDailyStreak || 0,
      currentLevelName,
      nextLesson: {
        slug: lastLessonData.nextLessonSlug,
        title: nextLessonTitle,
        type: nextLessonType,
        levelName: lastLessonData.currentLevel ? getLevelDisplayName(lastLessonData.currentLevel) : undefined,
        url: lastLessonData.nextLessonUrl,
        isNewUser: lastLessonData.isNewUser,
        progress: lastLessonData.progress,
      },
      totalCompletedQuestions: answeredQuestionsInAllLevels,
      totalQuestions: totalQuestionsInAllLevels,
      levelDetails: levelDetails.sort((a, b) => a.levelNumber - b.levelNumber),
    };

  } catch (error) {
    console.error('Error getting unified progress:', error);
    return {
      completedLevels: 0,
      totalLevels: 5,
      overallProgress: 0,
      userXp: user.userXp || 0,
      weeklyXp: user.weeklyUserXp || 0,
      currentStreak: user.correctDailyStreak || 0,
      nextLesson: {
        slug: null,
        url: null,
        isNewUser: true,
      },
      totalCompletedQuestions: 0,
      totalQuestions: 0,
      levelDetails: [],
    };
  }
});

/**
 * Преобразует имя тега в читаемое название уровня
 */
function getLevelDisplayName(tagName: string): string {
  const levelNumber = tagName.match(/\d+/)?.[0];
  
  const levelNames: Record<string, string> = {
    '1': 'Основы бизнеса',
    '2': 'Маркетинг и продвижение',
    '3': 'Продажи и клиенты',
    '4': 'Управление и команда',
    '5': 'Финансы и инвестиции',
  };

  return levelNames[levelNumber || '1'] || `Уровень ${levelNumber}`;
}

/**
 * BIZLEVEL: Унифицированный API endpoint для получения всех данных прогресса
 * GET /api/progress/unified
 * 
 * Заменяет множественные API вызовы одним запросом
 * Включает кэширование на 5 минут для оптимизации
 */
export async function GET() {
  try {
    const progressData = await getUnifiedProgress();
    
    if (!progressData) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    // Добавляем заголовки для кэширования на 5 минут
    const response = NextResponse.json(progressData);
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');
    
    return response;
    
  } catch (error) {
    console.error('Error fetching unified progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress data' },
      { status: 500 }
    );
  }
} 