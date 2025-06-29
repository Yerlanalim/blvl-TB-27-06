'use server';
import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

/**
 * Сохраняет сообщение и ответ Leo в базу данных
 * 
 * @param opts - Данные для сохранения
 * @param opts.message - Сообщение пользователя
 * @param opts.response - Ответ Leo
 * @param opts.context - Контекст страницы (опционально)
 * @returns - Сохраненный чат или null при ошибке
 */
export const saveLeoChat = async (opts: {
  message: string;
  response: string;
  context?: string;
}) => {
  const { message, response, context } = opts;

  const user = await getUser();

  if (!user) {
    console.error('No user found for saving Leo chat');
    return null;
  }

  try {
    const savedChat = await prisma.userLeoChats.create({
      data: {
        userUid: user.uid,
        message,
        response,
        context: context || null,
      },
      select: {
        uid: true,
        message: true,
        response: true,
        context: true,
        createdAt: true,
      },
    });

    return savedChat;
  } catch (error) {
    console.error('Error saving Leo chat:', error);
    return null;
  }
};

/**
 * Тип для сохранения чата Leo
 */
export type SaveLeoChatData = {
  message: string;
  response: string;
  context?: string;
}; 