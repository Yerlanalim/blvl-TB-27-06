'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import useUnifiedProgress from '@/hooks/use-unified-progress';

interface LeoContext {
  context: string;
  systemPrompt: string;
  isLessonPage: boolean;
  pageType: 'question' | 'level' | 'dashboard' | 'general';
}

export function useLeoContext(): LeoContext {
  const pathname = usePathname();
  const { globalProgress, levelDetails } = useUnifiedProgress();

  return useMemo(() => {
    // Определяем тип страницы
    let pageType: LeoContext['pageType'] = 'general';
    let context = '';
    let isLessonPage = false;

    if (pathname.startsWith('/question/')) {
      pageType = 'question';
      isLessonPage = true;
      const questionSlug = pathname.split('/question/')[1];
      context = `Пользователь изучает урок: ${questionSlug}. Это может быть видео-урок или тест по бизнесу.`;
    } else if (pathname.startsWith('/level/')) {
      pageType = 'level';
      const levelSlug = pathname.split('/level/')[1];
      context = `Пользователь просматривает уровень обучения: ${levelSlug}. Он видит список уроков этого уровня.`;
    } else if (pathname === '/dashboard') {
      pageType = 'dashboard';
      context = 'Пользователь на главной странице (dashboard). Он видит свой общий прогресс обучения.';
    } else if (pathname.startsWith('/roadmaps')) {
      pageType = 'general';
      context = 'Пользователь просматривает карту всех уровней обучения бизнесу.';
    } else if (pathname.startsWith('/statistics')) {
      pageType = 'general';
      context = 'Пользователь просматривает свою статистику обучения.';
    } else if (pathname.startsWith('/settings')) {
      pageType = 'general';
      context = 'Пользователь в настройках профиля.';
    } else {
      context = 'Пользователь на странице платформы BizLevel.';
    }

    // Подготовка сводки прогресса пользователя
    let progressSummary = '';
    if (globalProgress) {
      const {
        currentLevelName,
        currentLevelProgress,
        completedLevels,
        totalLevels,
        overallProgress,
      } = globalProgress;

      // Определяем текущий уровень по levelDetails
      const currentLevel = levelDetails?.find((l) => !l.completed) ?? null;

      progressSummary = `\n\nПРОГРЕСС: Пользователь сейчас на уровне "${currentLevelName ?? currentLevel?.name ?? 'Неизвестно'}". ` +
        (currentLevel ? `Пройдено ${currentLevel.completedQuestions} из ${currentLevel.totalQuestions} уроков этого уровня (${currentLevel.progress}%). ` : '') +
        `Общий прогресс: ${overallProgress}% (завершено ${completedLevels} из ${totalLevels} уровней).`;
    }

    // Формируем системный промпт для Leo
    const systemPrompt = `Ты Leo - персональный бизнес-наставник платформы BizLevel.${progressSummary}

КОНТЕКСТ: ${context}

ТВОЯ РОЛЬ:
- Помогаешь изучать основы бизнеса и предпринимательства
- Отвечаешь кратко, понятно и с практическими примерами
- Мотивируешь и поддерживаешь в обучении
- Используешь примеры из реального бизнеса

СТРОГО ЗАПРЕЩЕНО:
- Обсуждать программирование, код, разработку
- Использовать технические термины IT
- Помогать с кодом или техническими задачами
- Упоминать GitHub, programming, coding

СТИЛЬ ОБЩЕНИЯ:
- Дружелюбный и мотивирующий тон
- Короткие ответы (2-4 предложения)
- Простой язык без сложных терминов
- Всегда на русском языке
- Используй эмодзи для дружелюбности

Если пользователь спрашивает что-то не связанное с бизнесом - вежливо перенаправь на бизнес-темы.`;

    return {
      context,
      systemPrompt,
      isLessonPage,
      pageType,
    };
  }, [pathname, globalProgress, levelDetails]);
} 