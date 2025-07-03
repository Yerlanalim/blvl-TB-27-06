import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/actions/user/authed/get-user';
import { getLastLesson } from '@/actions/user/get-last-lesson';
import { getUserDailyStats } from '@/utils/data/user/authed/get-daily-streak';
import { cache } from 'react';
import type { UnifiedProgressData } from '@/types/Progress';

/**
 * Получение унифицированных данных прогресса пользователя
 * Объединяет все системы прогресса в один endpoint
 */

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

// Кэшируем функцию, чтобы избежать двойных запросов в рамках одного SSR render
const calculateUnifiedProgress = cache(async (): Promise<UnifiedProgressData | null> => {
  const user = await getUser();
  if (!user) return null;

  try {
    const [levelTags, lastLessonData, dailyStats] = await Promise.all([
      prisma.tag.findMany({
        where: { name: { startsWith: 'level-' } },
        orderBy: { name: 'asc' },
      }),
      getLastLesson(),
      getUserDailyStats(),
    ]);

    const totalLevels = levelTags.length;
    if (totalLevels === 0) {
      return {
        completedLevels: 0,
        totalLevels: 0,
        overallProgress: 0,
        userXp: user.userXp || 0,
        weeklyXp: user.weeklyUserXp || 0,
        currentStreak: dailyStats?.streakData?.currentstreakCount || 0,
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

    let completedLevels = 0;
    let totalQuestions = 0;
    let totalCompleted = 0;
    let currentLevelName = '';
    let currentLevelProgress = 0;
    const levelDetails: UnifiedProgressData['levelDetails'] = [];

    const getDisplayName = (tagName: string) => {
      const num = tagName.match(/\d+/)?.[0] || '1';
      const names: Record<string, string> = {
        '1': 'Основы бизнеса',
        '2': 'Маркетинг и продвижение',
        '3': 'Продажи и клиенты',
        '4': 'Управление и команда',
        '5': 'Финансы и инвестиции',
      };
      return names[num] || `Уровень ${num}`;
    };

    for (const tag of levelTags) {
      const questions = await prisma.questions.findMany({
        where: { tags: { some: { tag: { name: tag.name } } } },
        select: { uid: true },
      });
      if (!questions.length) continue;

      totalQuestions += questions.length;

      const answers = await prisma.answers.findMany({
        where: { userUid: user.uid, questionUid: { in: questions.map((q) => q.uid) }, correctAnswer: true },
        select: { questionUid: true },
      });

      const completed = answers.length;
      totalCompleted += completed;

      const progress = Math.round((completed / questions.length) * 100);
      const finished = progress >= 80;
      if (finished) completedLevels += 1;

      if (!finished && !currentLevelName) {
        currentLevelName = getDisplayName(tag.name);
        currentLevelProgress = progress;
      }

      levelDetails.push({
        levelNumber: parseInt(tag.name.replace('level-', '')),
        name: getDisplayName(tag.name),
        completed: finished,
        progress,
        totalQuestions: questions.length,
        completedQuestions: completed,
        tagName: tag.name,
      });
    }

    const overallProgress = totalQuestions ? Math.round((totalCompleted / totalQuestions) * 100) : 0;

    return {
      completedLevels,
      totalLevels,
      overallProgress,
      currentLevelProgress,
      currentLevelName,
      userXp: user.userXp || 0,
      weeklyXp: user.weeklyUserXp || 0,
      currentStreak: dailyStats?.streakData?.currentstreakCount || 0,
      nextLesson: {
        slug: lastLessonData.nextLessonSlug,
        title: lastLessonData.nextLessonSlug ? undefined : undefined,
        url: lastLessonData.nextLessonUrl,
        isNewUser: lastLessonData.isNewUser,
        progress: lastLessonData.progress,
      },
      totalCompletedQuestions: totalCompleted,
      totalQuestions,
      levelDetails,
    };
  } catch (err) {
    console.error('calculateUnifiedProgress error', err);
    return null;
  }
});

/**
 * BIZLEVEL: Унифицированный API endpoint для получения всех данных прогресса
 * GET /api/progress/unified
 * 
 * Заменяет множественные API вызовы одним запросом
 * Включает кэширование на 5 минут для оптимизации
 */
export async function GET() {
  try {
    const progressData = await calculateUnifiedProgress();
    
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