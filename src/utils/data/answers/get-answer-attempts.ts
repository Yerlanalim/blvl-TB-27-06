'use server';

import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

/**
 * Получает количество попыток ответа пользователя на конкретный вопрос
 * 
 * @param questionUid - UID вопроса
 * @returns количество попыток
 */
export async function getAnswerAttempts(questionUid: string): Promise<number> {
  try {
    const user = await getUser();
    if (!user) {
      return 0;
    }

    const attemptsCount = await prisma.answers.count({
      where: {
        userUid: user.uid,
        questionUid: questionUid,
      },
    });

    return attemptsCount;
  } catch (error) {
    console.error('Error getting answer attempts:', error);
    return 0;
  }
}

/**
 * Получает последнюю попытку пользователя на вопрос с информацией о подсказке
 * 
 * @param questionUid - UID вопроса
 * @returns данные о последней попытке и подсказке
 */
export async function getLastAttempt(questionUid: string) {
  try {
    const user = await getUser();
    if (!user) {
      return null;
    }

    const lastAttempt = await prisma.answers.findFirst({
      where: {
        userUid: user.uid,
        questionUid: questionUid,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        question: {
          select: {
            hint: true,
            question: true,
            title: true,
          },
        },
      },
    });

    return lastAttempt;
  } catch (error) {
    console.error('Error getting last attempt:', error);
    return null;
  }
} 