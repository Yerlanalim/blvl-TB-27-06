import { cache } from 'react';

import { prisma } from '@/lib/prisma';
import { getTagsFromQuestion } from './tags/get-tags-from-question';
import type { Question, QuestionWithoutAnswers, QuestionFromDB } from '@/types/Questions';
import { transformQuestionFromDB } from '@/types/Questions';

/**
 * Retrieve a question via its uid or slug
 *
 * @param identifier - The identifier to use to retrieve the question (uid or slug)
 * @param value - The value of the identifier
 * @returns The question object
 */
export const getQuestion = cache(async (identifier: 'slug' | 'uid' = 'slug', value: string): Promise<Question | null> => {
  if (!value) {
    console.error('Please provide a uid');
    return null;
  }

  try {
    const whereClause = identifier === 'uid' ? { uid: value } : { slug: value };
    const res = await prisma.questions.findUnique({
      where: whereClause,
      include: {
        answers: true,
        QuestionResources: true,
        tags: {
          include: {
            tag: true,
          },
        },
        bookmarks: true,
      },
    });

    if (!res) {
      return null;
    }

    // Сначала применяем getTagsFromQuestion к сырым данным
    const questionWithTags = getTagsFromQuestion(res as any);
    const singleQuestion = Array.isArray(questionWithTags) ? questionWithTags[0] : questionWithTags;
    
    // Затем преобразуем JsonValue типы, сохраняя все поля включая answers
    const dbQuestion = { ...singleQuestion, answers: res.answers } as unknown as QuestionFromDB;
    const question = transformQuestionFromDB(dbQuestion);
    
    // Возвращаем уже преобразованный вопрос
    return question;
  } catch (error) {
    console.error('Error fetching question:', error);
    return null;
  }
});
