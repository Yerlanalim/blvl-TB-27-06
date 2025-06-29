'use server';
import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

/**
 * Получает последние чаты пользователя с Leo AI assistant
 * 
 * @param opts - Опции запроса
 * @param opts.limit - Количество сообщений для загрузки (по умолчанию 20)
 * @returns - Массив чатов или пустой массив
 */
export const getRecentLeoChats = async (opts?: { limit?: number }) => {
  const { limit = 20 } = opts ?? {};

  const user = await getUser();

  if (!user) {
    return [];
  }

  try {
    const chats = await prisma.userLeoChats.findMany({
      where: {
        userUid: user.uid,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      select: {
        uid: true,
        message: true,
        response: true,
        context: true,
        createdAt: true,
      },
    });

    // Возвращаем в правильном порядке (старые сообщения сначала)
    return chats.reverse();
  } catch (error) {
    console.error('Error fetching Leo chats:', error);
    return [];
  }
};

/**
 * Тип для истории чата Leo
 */
export type LeoChat = {
  uid: string;
  message: string;
  response: string;
  context: string | null;
  createdAt: Date;
}; 