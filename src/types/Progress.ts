/**
 * BIZLEVEL: Типы для унифицированной системы прогресса
 * Используется в /api/progress/unified и useUnifiedProgress хуке
 */

export interface UnifiedProgressData {
  // Из global progress
  completedLevels: number;
  totalLevels: number;
  overallProgress: number;
  currentLevelProgress?: number;
  currentLevelName?: string;
  
  // Для sidebar
  userXp: number;
  weeklyXp: number;
  currentStreak: number;
  
  // Для dashboard
  nextLesson: {
    slug: string | null;
    title?: string;
    type?: 'VIDEO' | 'MULTIPLE_CHOICE';
    levelName?: string;
    url: string | null;
    isNewUser: boolean;
    progress?: {
      current: number;
      total: number;
      level: string;
      percentage: number;
    };
  };
  totalCompletedQuestions: number;
  totalQuestions: number;
  
  // Детали по уровням
  levelDetails: Array<{
    levelNumber: number;
    name: string;
    completed: boolean;
    progress: number;
    totalQuestions: number;
    completedQuestions: number;
    tagName: string;
  }>;
}

/**
 * Селекторы для удобного доступа к данным прогресса
 */
export interface ProgressSelectors {
  globalProgress: {
    completedLevels: number;
    totalLevels: number;
    overallProgress: number;
    currentLevelProgress?: number;
    currentLevelName?: string;
    totalCompletedQuestions: number;
    totalQuestions: number;
  };
  
  sidebarProgress: {
    completedLevels: number;
    totalLevels: number;
    overallProgress: number;
    userXp: number;
    weeklyXp: number;
    currentStreak: number;
  };
  
  dashboardMetrics: {
    nextLesson: UnifiedProgressData['nextLesson'];
    userXp: number;
    weeklyXp: number;
    currentStreak: number;
    totalCompletedQuestions: number;
    totalQuestions: number;
  };
  
  levelDetails: UnifiedProgressData['levelDetails'];
}

/**
 * Ответ API для унифицированного прогресса
 */
export interface UnifiedProgressResponse {
  data?: UnifiedProgressData;
  error?: string;
}

/**
 * Состояние хука useUnifiedProgress
 */
export interface UseUnifiedProgressReturn extends ProgressSelectors {
  data: UnifiedProgressData | undefined;
  isLoading: boolean;
  error: Error | null;
  mutate: () => Promise<UnifiedProgressData | undefined>;
} 