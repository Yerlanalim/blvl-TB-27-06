import { Question } from '@/types';

/**
 * Определяет является ли вопрос последним уроком в уровне
 */
export function isLastLessonInLevel(question: Question): boolean {
  // Проверяем есть ли следующий вопрос
  // Если nextQuestionSlug === null, значит это последний урок в последовательности
  return question.nextQuestionSlug === null;
}

/**
 * Получает название уровня по тегам вопроса
 */
export function getLevelTitle(question: Question): string | undefined {
  const levelTag = question.tags?.find(tag => tag.tag.name.startsWith('level-'));
  
  if (!levelTag) return undefined;
  
  const levelMap: Record<string, string> = {
    'level-1': 'Основы бизнеса',
    'level-2': 'Маркетинг', 
    'level-3': 'Продажи',
    'level-4': 'Управление',
    'level-5': 'Финансы'
  };
  
  return levelMap[levelTag.tag.name];
}

/**
 * Проверяет нужно ли показывать материалы для скачивания
 * Показываем только на последнем уроке каждого уровня
 */
export function shouldShowLessonMaterials(question: Question): boolean {
  return isLastLessonInLevel(question) && !!getLevelTitle(question);
} 