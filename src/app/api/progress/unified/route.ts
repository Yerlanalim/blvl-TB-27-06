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

    const levelProgressRows = await prisma.$queryRaw<{level_tag:string,total_questions:number,completed_questions:number,progress_percent:number}[]>`
      SELECT level_tag, total_questions, completed_questions, progress_percent
      FROM user_level_progress
      WHERE user_id = ${user.uid}
      ORDER BY level_tag;`;

    const totalLevels = levelProgressRows.length;
    if (totalLevels === 0) {
      return {
        completedLevels: 0,
        totalLevels: 0,
        overallProgress: 0,
        userXp: user.userXp || 0,
        weeklyXp: user.weeklyUserXp || 0,
        currentStreak: dailyStats?.streakData?.currentstreakCount || 0,
        nextLesson: {
          slug: lastLessonData.nextLessonSlug,
          title: undefined,
          url: lastLessonData.nextLessonUrl,
          isNewUser: lastLessonData.isNewUser,
          progress: lastLessonData.progress,
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

    for (const row of levelProgressRows) {
      const progressPercent = Number(row.progress_percent);
      const totalQ = Number(row.total_questions);
      const completedQ = Number(row.completed_questions);

      const finished = progressPercent >= 80;
      if (finished) completedLevels += 1;

      totalQuestions += totalQ;
      totalCompleted += completedQ;

      const displayName = getLevelDisplayName(row.level_tag);

      if (!finished && !currentLevelName) {
        currentLevelName = displayName;
        currentLevelProgress = Math.round(progressPercent);
      }

      levelDetails.push({
        levelNumber: parseInt(row.level_tag.replace('level-', '')),
        name: displayName,
        completed: finished,
        progress: Math.round(progressPercent),
        totalQuestions: totalQ,
        completedQuestions: completedQ,
        tagName: row.level_tag,
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

// Значения по умолчанию для неаутентифицированного пользователя (гостя)
const DEFAULT_PROGRESS_DATA: UnifiedProgressData = {
  completedLevels: 0,
  totalLevels: 0,
  overallProgress: 0,
  currentLevelProgress: 0,
  currentLevelName: '',
  userXp: 0,
  weeklyXp: 0,
  currentStreak: 0,
  nextLesson: {
    slug: null,
    title: undefined,
    url: null,
    isNewUser: false,
    progress: 0,
  },
  totalCompletedQuestions: 0,
  totalQuestions: 0,
  levelDetails: [],
};

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
    
    // Если пользователь не аутентифицирован, возвращаем пустой прогресс вместо 401
    if (!progressData) {
      return NextResponse.json(DEFAULT_PROGRESS_DATA, { status: 200 });
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