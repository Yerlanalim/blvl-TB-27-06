import { describe, it, expect } from 'vitest';
import { createProgressSelectors } from '../use-unified-progress';
import type { UnifiedProgressData } from '@/types/Progress';

// Упрощённый набор данных для теста
const mockData: UnifiedProgressData = {
  completedLevels: 2,
  totalLevels: 5,
  overallProgress: 40,
  currentLevelProgress: 60,
  currentLevelName: 'Маркетинг',
  userXp: 500,
  weeklyXp: 150,
  currentStreak: 3,
  nextLesson: {
    slug: 'marketing-intro',
    title: 'Введение в маркетинг',
    type: 'VIDEO',
    levelName: 'Маркетинг',
    url: '/question/marketing-intro',
    isNewUser: false,
    progress: {
      current: 2,
      total: 7,
      level: 'level-2',
      percentage: 28,
    },
  },
  totalCompletedQuestions: 10,
  totalQuestions: 25,
  levelDetails: [
    {
      levelNumber: 1,
      name: 'Основы бизнеса',
      completed: true,
      progress: 100,
      totalQuestions: 5,
      completedQuestions: 5,
      tagName: 'level-1',
    },
    {
      levelNumber: 2,
      name: 'Маркетинг',
      completed: false,
      progress: 28,
      totalQuestions: 7,
      completedQuestions: 2,
      tagName: 'level-2',
    },
  ],
};

describe('createProgressSelectors', () => {
  it('should correctly map global, sidebar and dashboard selectors', () => {
    const selectors = createProgressSelectors(mockData);

    // Глобальный прогресс
    expect(selectors.globalProgress.completedLevels).toBe(2);
    expect(selectors.globalProgress.totalLevels).toBe(5);
    expect(selectors.globalProgress.overallProgress).toBe(40);

    // Sidebar
    expect(selectors.sidebarProgress.userXp).toBe(500);
    expect(selectors.sidebarProgress.currentStreak).toBe(3);

    // Dashboard
    expect(selectors.dashboardMetrics.nextLesson.slug).toBe('marketing-intro');
    expect(selectors.dashboardMetrics.totalQuestions).toBe(25);
  });
}); 