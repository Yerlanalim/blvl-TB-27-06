/**
 * BizLevel: useUnifiedProgress
 * -----------------------------------------------
 * Единый React-хук для получения прогресса пользователя из API
 * `/api/progress/unified`. Хук кэширует данные с помощью SWR,
 * автоматически обновляется каждые 30 секунд и предоставляет
 * удобные селекторы для различных стоек UI (Global, Sidebar, Dashboard).
 *
 * Правила проекта:
 * – Используем бизнес-терминологию, без технических ссылок
 * – Соблюдаем branding BizLevel во всех комментариях
 * – Не добавляем программистский обучающий контент
 */

import useSWR from 'swr';
import type {
  UnifiedProgressData,
  ProgressSelectors,
  UseUnifiedProgressReturn,
} from '@/types/Progress';

/**
 * Базовый fetcher для SWR.
 * Бросает ошибку, если HTTP ответ ≠ 2xx.
 */
const fetcher = async (url: string): Promise<UnifiedProgressData> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch unified progress. Status: ${response.status}`,
    );
  }

  return (await response.json()) as UnifiedProgressData;
};

/**
 * Генерирует селекторы для разных областей приложения
 * на основе полученных данных прогресса.
 */
export function createProgressSelectors(
  data: UnifiedProgressData,
): ProgressSelectors {
  return {
    globalProgress: {
      completedLevels: data.completedLevels,
      totalLevels: data.totalLevels,
      overallProgress: data.overallProgress,
      currentLevelProgress: data.currentLevelProgress,
      currentLevelName: data.currentLevelName,
      totalCompletedQuestions: data.totalCompletedQuestions,
      totalQuestions: data.totalQuestions,
    },

    sidebarProgress: {
      completedLevels: data.completedLevels,
      totalLevels: data.totalLevels,
      overallProgress: data.overallProgress,
      userXp: data.userXp,
      weeklyXp: data.weeklyXp,
      currentStreak: data.currentStreak,
    },

    dashboardMetrics: {
      nextLesson: data.nextLesson,
      userXp: data.userXp,
      weeklyXp: data.weeklyXp,
      currentStreak: data.currentStreak,
      totalCompletedQuestions: data.totalCompletedQuestions,
      totalQuestions: data.totalQuestions,
    },

    levelDetails: data.levelDetails,
  } satisfies ProgressSelectors;
}

/**
 * Основной хук.
 *
 * @example
 * const {
 *   globalProgress,
 *   sidebarProgress,
 *   dashboardMetrics,
 *   levelDetails,
 *   isLoading,
 *   error,
 * } = useUnifiedProgress();
 */
export default function useUnifiedProgress(): UseUnifiedProgressReturn {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR<UnifiedProgressData>('/api/progress/unified', fetcher, {
    refreshInterval: 30_000, // 30 секунд
    revalidateOnFocus: true,
  });

  const selectors = data ? createProgressSelectors(data) : undefined;

  return {
    data,
    globalProgress: selectors?.globalProgress as ProgressSelectors['globalProgress'],
    sidebarProgress: selectors?.sidebarProgress as ProgressSelectors['sidebarProgress'],
    dashboardMetrics: selectors?.dashboardMetrics as ProgressSelectors['dashboardMetrics'],
    levelDetails: selectors?.levelDetails ?? [],
    isLoading: isLoading ?? (!error && !data),
    error: error ?? null,
    mutate: () => mutate(),
  };
} 