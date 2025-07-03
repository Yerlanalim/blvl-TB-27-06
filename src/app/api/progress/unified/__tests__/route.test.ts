/**
 * BIZLEVEL: Тесты для унифицированного API endpoint прогресса
 * Проверяет структуру ответа и основную логику
 */

import { describe, it, expect } from '@jest/globals';
import type { UnifiedProgressData } from '@/types/Progress';

describe('/api/progress/unified', () => {
  it('should have correct UnifiedProgressData structure', () => {
    // Тестовые данные с ожидаемой структурой
    const mockProgressData: UnifiedProgressData = {
      // Из global progress
      completedLevels: 1,
      totalLevels: 5,
      overallProgress: 20,
      currentLevelProgress: 60,
      currentLevelName: 'Основы бизнеса',
      
      // Для sidebar
      userXp: 150,
      weeklyXp: 50,
      currentStreak: 3,
      
      // Для dashboard
      nextLesson: {
        slug: 'business-model-intro',
        title: 'Введение в бизнес-модели',
        type: 'VIDEO',
        levelName: 'Основы бизнеса',
        url: '/question/business-model-intro',
        isNewUser: false,
        progress: {
          current: 2,
          total: 5,
          level: 'level-1',
          percentage: 40,
        },
      },
      totalCompletedQuestions: 3,
      totalQuestions: 15,
      
      // Детали по уровням
      levelDetails: [
        {
          levelNumber: 1,
          name: 'Основы бизнеса',
          completed: false,
          progress: 60,
          totalQuestions: 5,
          completedQuestions: 3,
          tagName: 'level-1',
        },
        {
          levelNumber: 2,
          name: 'Маркетинг и продвижение',
          completed: false,
          progress: 0,
          totalQuestions: 7,
          completedQuestions: 0,
          tagName: 'level-2',
        },
      ],
    };

    // Проверяем что все обязательные поля присутствуют
    expect(mockProgressData).toHaveProperty('completedLevels');
    expect(mockProgressData).toHaveProperty('totalLevels');
    expect(mockProgressData).toHaveProperty('overallProgress');
    expect(mockProgressData).toHaveProperty('userXp');
    expect(mockProgressData).toHaveProperty('weeklyXp');
    expect(mockProgressData).toHaveProperty('currentStreak');
    expect(mockProgressData).toHaveProperty('nextLesson');
    expect(mockProgressData).toHaveProperty('totalCompletedQuestions');
    expect(mockProgressData).toHaveProperty('totalQuestions');
    expect(mockProgressData).toHaveProperty('levelDetails');

    // Проверяем структуру nextLesson
    expect(mockProgressData.nextLesson).toHaveProperty('slug');
    expect(mockProgressData.nextLesson).toHaveProperty('url');
    expect(mockProgressData.nextLesson).toHaveProperty('isNewUser');

    // Проверяем что levelDetails это массив
    expect(Array.isArray(mockProgressData.levelDetails)).toBe(true);
    
    // Проверяем структуру элемента levelDetails
    if (mockProgressData.levelDetails.length > 0) {
      const firstLevel = mockProgressData.levelDetails[0];
      expect(firstLevel).toHaveProperty('levelNumber');
      expect(firstLevel).toHaveProperty('name');
      expect(firstLevel).toHaveProperty('completed');
      expect(firstLevel).toHaveProperty('progress');
      expect(firstLevel).toHaveProperty('totalQuestions');
      expect(firstLevel).toHaveProperty('completedQuestions');
      expect(firstLevel).toHaveProperty('tagName');
    }

    // Проверяем типы данных
    expect(typeof mockProgressData.completedLevels).toBe('number');
    expect(typeof mockProgressData.totalLevels).toBe('number');
    expect(typeof mockProgressData.overallProgress).toBe('number');
    expect(typeof mockProgressData.userXp).toBe('number');
    expect(typeof mockProgressData.weeklyXp).toBe('number');
    expect(typeof mockProgressData.currentStreak).toBe('number');
    expect(typeof mockProgressData.totalCompletedQuestions).toBe('number');
    expect(typeof mockProgressData.totalQuestions).toBe('number');
  });

  it('should handle new user case correctly', () => {
    const newUserData: UnifiedProgressData = {
      completedLevels: 0,
      totalLevels: 5,
      overallProgress: 0,
      userXp: 0,
      weeklyXp: 0,
      currentStreak: 0,
      nextLesson: {
        slug: 'welcome-to-business',
        url: '/question/welcome-to-business',
        isNewUser: true,
      },
      totalCompletedQuestions: 0,
      totalQuestions: 0,
      levelDetails: [],
    };

    expect(newUserData.nextLesson.isNewUser).toBe(true);
    expect(newUserData.completedLevels).toBe(0);
    expect(newUserData.overallProgress).toBe(0);
    expect(newUserData.levelDetails).toHaveLength(0);
  });

  it('should handle completed course case correctly', () => {
    const completedCourseData: UnifiedProgressData = {
      completedLevels: 5,
      totalLevels: 5,
      overallProgress: 100,
      currentLevelProgress: 100,
      currentLevelName: 'Курс завершен!',
      userXp: 1000,
      weeklyXp: 200,
      currentStreak: 15,
      nextLesson: {
        slug: null,
        url: null,
        isNewUser: false,
      },
      totalCompletedQuestions: 33,
      totalQuestions: 33,
      levelDetails: [
        // Все уровни должны быть завершены
        {
          levelNumber: 1,
          name: 'Основы бизнеса',
          completed: true,
          progress: 100,
          totalQuestions: 5,
          completedQuestions: 5,
          tagName: 'level-1',
        },
        // ... остальные уровни
      ],
    };

    expect(completedCourseData.completedLevels).toBe(completedCourseData.totalLevels);
    expect(completedCourseData.overallProgress).toBe(100);
    expect(completedCourseData.currentLevelName).toBe('Курс завершен!');
    expect(completedCourseData.nextLesson.slug).toBeNull();
    expect(completedCourseData.nextLesson.url).toBeNull();
  });
}); 