import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';
import { cache } from 'react';

// BIZLEVEL: Новая функция для навигации по уровням
export const getLevelBasedNavigation = cache(async (uid: string) => {
  const user = await getUser();
  
  // Получить текущий вопрос с тегами
  const currentQuestion = await prisma.questions.findUnique({
    where: { uid },
    select: {
      uid: true,
      slug: true,
      createdAt: true,
      questionType: true,
      tags: {
        select: {
          tag: {
            select: {
              name: true
            }
          }
        }
      }
    },
  });

  if (!currentQuestion) return null;

  // Найти теги уровня (level-1, level-2, etc.)
  const levelTags = currentQuestion.tags
    .map(t => t.tag.name)
    .filter(name => name.startsWith('level-'));

  if (levelTags.length === 0) {
    // Если нет тегов уровня, использовать старую логику
    return getNextAndPreviousQuestion(uid);
  }

  const levelTag = levelTags[0]; // Берем первый тег уровня

  // Получить все вопросы этого уровня, отсортированные по createdAt
  const levelQuestions = await prisma.questions.findMany({
    where: {
      tags: {
        some: {
          tag: {
            name: levelTag
          }
        }
      },
      isPremiumQuestion: user?.userLevel === 'FREE' ? false : true,
      customQuestion: user?.userLevel === 'FREE' ? false : true,
    },
    select: {
      uid: true,
      slug: true,
      createdAt: true,
      questionType: true,
      title: true,
      tags: {
        select: {
          tag: {
            select: {
              name: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  // Найти индекс текущего вопроса
  const currentIndex = levelQuestions.findIndex(q => q.uid === uid);
  if (currentIndex === -1) return null;

  // Логика последовательного прохождения
  const nextQuestion = getNextQuestionInSequence(levelQuestions, currentIndex);
  const previousQuestion = getPreviousQuestionInSequence(levelQuestions, currentIndex);

  // Подсчитать прогресс
  const progress = {
    current: currentIndex + 1,
    total: levelQuestions.length,
    level: levelTag,
    percentage: Math.round(((currentIndex + 1) / levelQuestions.length) * 100)
  };

  return {
    nextQuestion: nextQuestion?.slug || null,
    previousQuestion: previousQuestion?.slug || null,
    progress
  };
});

// Вспомогательная функция для определения следующего вопроса в последовательности
function getNextQuestionInSequence(
  questions: Array<{
    uid: string;
    slug: string | null;
    questionType: any;
    tags: Array<{ tag: { name: string } }>;
  }>,
  currentIndex: number
) {
  if (currentIndex >= questions.length - 1) return null;

  const currentQuestion = questions[currentIndex];
  const isVideo = currentQuestion.questionType === 'VIDEO';

  // Если текущий вопрос - видео, следующий должен быть тест (если есть)
  if (isVideo) {
    // Ищем следующий тест в том же уровне
    for (let i = currentIndex + 1; i < questions.length; i++) {
      const nextQ = questions[i];
      const isNextTest = nextQ.tags.some(t => t.tag.name.includes('test'));
      if (isNextTest) {
        return nextQ;
      }
    }
  }

  // Для всех остальных случаев - просто следующий вопрос
  return questions[currentIndex + 1];
}

// Вспомогательная функция для определения предыдущего вопроса
function getPreviousQuestionInSequence(
  questions: Array<{
    uid: string;
    slug: string | null;
    questionType: any;
  }>,
  currentIndex: number
) {
  if (currentIndex <= 0) return null;
  return questions[currentIndex - 1];
}

export const getNextAndPreviousQuestion = cache(async (uid: string) => {
  const user = await getUser();

  // Get the current question with next/prev questions
  const currentQuestion = await prisma.questions.findUnique({
    where: { uid },
    select: {
      createdAt: true,
      nextQuestionSlug: true,
      previousQuestionSlug: true,
    },
  });

  if (!currentQuestion) return null;

  // If next/prev questions are stored, fetch them
  if (currentQuestion.nextQuestionSlug || currentQuestion.previousQuestionSlug) {
    const [nextQuestion, previousQuestion] = await Promise.all([
      currentQuestion.nextQuestionSlug
        ? prisma.questions.findUnique({
            where: { slug: currentQuestion.nextQuestionSlug },
          })
        : null,
      currentQuestion.previousQuestionSlug
        ? prisma.questions.findUnique({
            where: { slug: currentQuestion.previousQuestionSlug },
          })
        : null,
    ]);

    // If one exists but not the other, get a random question for the missing one
    if (nextQuestion && !previousQuestion) {
      const randomPrevious = await prisma.questions.findFirst({
        where: {
          uid: { not: uid },
          isPremiumQuestion: user?.userLevel === 'FREE' ? false : true,
          customQuestion: user?.userLevel === 'FREE' ? false : true,
        },
        orderBy: { createdAt: 'desc' },
      });

      return {
        nextQuestion: nextQuestion.slug,
        previousQuestion: randomPrevious?.slug || null,
      };
    }

    if (!nextQuestion && previousQuestion) {
      const randomNext = await prisma.questions.findFirst({
        where: {
          uid: { not: uid },
          isPremiumQuestion: user?.userLevel === 'FREE' ? false : true,
          customQuestion: user?.userLevel === 'FREE' ? false : true,
        },
        orderBy: { createdAt: 'desc' },
      });

      return {
        nextQuestion: randomNext?.slug || null,
        previousQuestion: previousQuestion.slug,
      };
    }

    if (nextQuestion && previousQuestion) {
      return {
        nextQuestion: nextQuestion.slug,
        previousQuestion: previousQuestion.slug,
      };
    }
  }

  // If no stored next/prev, fall back to createdAt based logic
  const [nextQuestion, previousQuestion] = await Promise.all([
    prisma.questions.findFirst({
      where: {
        createdAt: {
          gt: currentQuestion.createdAt,
        },
        isPremiumQuestion: user?.userLevel === 'FREE' ? false : true,
        customQuestion: user?.userLevel === 'FREE' ? false : true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    }),
    prisma.questions.findFirst({
      where: {
        createdAt: {
          lt: currentQuestion.createdAt,
        },
        isPremiumQuestion: user?.userLevel === 'FREE' ? false : true,
        customQuestion: user?.userLevel === 'FREE' ? false : true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
  ]);

  // If no next/prev found, get random questions
  const randomQuestion =
    !nextQuestion || !previousQuestion
      ? await prisma.questions
          .findMany({
            where: {
              uid: {
                not: uid,
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 2,
          })
          // take two for previous and next
          .then((questions) => questions.slice(0, 2))
      : null;

  return {
    nextQuestion: nextQuestion?.slug || randomQuestion?.[1]?.slug || null,
    previousQuestion: previousQuestion?.slug || randomQuestion?.[0]?.slug || null,
  };
});
