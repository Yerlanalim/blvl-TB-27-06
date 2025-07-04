'use server';

import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

/**
 * Получает последний урок пользователя и следующий в последовательности
 * @returns объект с информацией о следующем уроке для продолжения обучения
 */
export const getLastLesson = async (): Promise<{
  nextLessonSlug: string | null;
  nextLessonUrl: string | null;
  isNewUser: boolean;
  currentLevel?: string;
  progress?: {
    current: number;
    total: number;
    level: string;
    percentage: number;
  };
}> => {
  const user = await getUser();

  if (!user) {
    return {
      nextLessonSlug: null,
      nextLessonUrl: null,
      isNewUser: true,
    };
  }

  try {
    // Получаем все ответы пользователя, отсортированные по дате создания
    const userAnswers = await prisma.answers.findMany({
      where: {
        userUid: user.uid,
        correctAnswer: true, // Учитываем только правильные ответы
      },
      include: {
        question: {
          include: {
            tags: {
              include: {
                tag: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Если нет ответов - новый пользователь, направляем на первый урок
    if (userAnswers.length === 0) {
      return {
        nextLessonSlug: 'welcome-to-business',
        nextLessonUrl: '/question/welcome-to-business',
        isNewUser: true,
      };
    }

    // Получаем последний отвеченный вопрос
    const lastAnsweredQuestion = userAnswers[0].question;
    
    // Определяем уровень последнего вопроса по тегам
    const levelTag = lastAnsweredQuestion.tags
      .map(t => t.tag.name)
      .find(tagName => tagName.startsWith('level-'));

    if (!levelTag) {
      // Если не можем определить уровень, направляем на первый урок
      return {
        nextLessonSlug: 'welcome-to-business',
        nextLessonUrl: '/question/welcome-to-business',
        isNewUser: false,
      };
    }

    // Получаем все вопросы текущего уровня
    const currentLevelQuestions = await prisma.questions.findMany({
      where: {
        tags: {
          some: {
            tag: {
              name: levelTag,
            },
          },
        },
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc', // Сортируем по порядку создания
      },
    });

    // Находим индекс последнего отвеченного вопроса в уровне
    const lastQuestionIndex = currentLevelQuestions.findIndex(
      q => q.uid === lastAnsweredQuestion.uid
    );

    if (lastQuestionIndex === -1) {
      // Если не можем найти вопрос в текущем уровне
      return {
        nextLessonSlug: 'welcome-to-business',
        nextLessonUrl: '/question/welcome-to-business',
        isNewUser: false,
      };
    }

    // Проверяем есть ли следующий вопрос в текущем уровне
    const nextQuestionInLevel = currentLevelQuestions[lastQuestionIndex + 1];
    
    if (nextQuestionInLevel && nextQuestionInLevel.slug) {
      // Есть следующий урок в текущем уровне
      return {
        nextLessonSlug: nextQuestionInLevel.slug,
        nextLessonUrl: `/question/${nextQuestionInLevel.slug}`,
        isNewUser: false,
        currentLevel: levelTag,
        progress: {
          current: lastQuestionIndex + 2, // Следующий урок
          total: currentLevelQuestions.length,
          level: levelTag,
          percentage: Math.round(((lastQuestionIndex + 2) / currentLevelQuestions.length) * 100),
        },
      };
    }

    // Текущий уровень завершен, ищем следующий уровень
    // Извлекаем номер уровня из тега (например, "level-1" -> 1)
    const currentLevelNumber = parseInt(levelTag.replace('level-', ''));
    const nextLevelTag = `level-${currentLevelNumber + 1}`;
    
    // Проверяем есть ли следующий уровень
    const nextLevelQuestions = await prisma.questions.findMany({
      where: {
        tags: {
          some: {
            tag: {
              name: nextLevelTag,
            },
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (nextLevelQuestions.length > 0) {
      // Есть следующий уровень - берем первый вопрос
      const nextLevelFirstQuestion = nextLevelQuestions[0];

      if (nextLevelFirstQuestion && nextLevelFirstQuestion.slug) {
        return {
          nextLessonSlug: nextLevelFirstQuestion.slug,
          nextLessonUrl: `/question/${nextLevelFirstQuestion.slug}`,
          isNewUser: false,
          currentLevel: nextLevelTag,
        };
      }
    }

    // Все уровни завершены
    return {
      nextLessonSlug: null,
      nextLessonUrl: null,
      isNewUser: false,
    };

  } catch (error) {
    console.error('Error in getLastLesson:', error);
    
    // В случае ошибки возвращаем ссылку на первый урок
    return {
      nextLessonSlug: 'welcome-to-business',
      nextLessonUrl: '/question/welcome-to-business',
      isNewUser: false,
    };
  }
}; 