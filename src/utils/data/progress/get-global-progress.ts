import { prisma } from '@/lib/prisma';
import { getUser } from '@/actions/user/authed/get-user';
import { cache } from 'react';

interface GlobalProgressData {
  completedLevels: number;
  totalLevels: number;
  overallProgress: number;
  currentLevelProgress?: number;
  userXp: number;
  weeklyXp: number;
  currentLevelName?: string;
  totalCompletedQuestions: number;
  totalQuestions: number;
}

/**
 * BIZLEVEL: Получение глобального прогресса пользователя
 * Анализирует прогресс по всем уровням курса
 */
export const getGlobalProgress = cache(async (): Promise<GlobalProgressData | null> => {
  const user = await getUser();
  
  if (!user) return null;

  try {
    // Получаем все уровневые теги (level-1, level-2, etc.)
    const levelTags = await prisma.tag.findMany({
      where: {
        name: {
          startsWith: 'level-'
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    if (levelTags.length === 0) {
      return {
        completedLevels: 0,
        totalLevels: 5, // Дефолтное количество уровней
        overallProgress: 0,
        userXp: user.userXp || 0,
        weeklyXp: user.weeklyUserXp || 0,
        totalCompletedQuestions: 0,
        totalQuestions: 0,
      };
    }

    const totalLevels = levelTags.length;
    let completedLevels = 0;
    let totalQuestionsInAllLevels = 0;
    let answeredQuestionsInAllLevels = 0;
    let currentLevelName = '';
    let currentLevelProgress = 0;

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
      const levelProgress = (answeredInLevel / levelQuestions.length) * 100;
      
      if (levelProgress >= 80) {
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

    return {
      completedLevels,
      totalLevels,
      overallProgress,
      currentLevelProgress,
      userXp: user.userXp || 0,
      weeklyXp: user.weeklyUserXp || 0,
      currentLevelName,
      totalCompletedQuestions: answeredQuestionsInAllLevels,
      totalQuestions: totalQuestionsInAllLevels,
    };

  } catch (error) {
    console.error('Error getting global progress:', error);
    return {
      completedLevels: 0,
      totalLevels: 5,
      overallProgress: 0,
      userXp: user.userXp || 0,
      weeklyXp: user.weeklyUserXp || 0,
      totalCompletedQuestions: 0,
      totalQuestions: 0,
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