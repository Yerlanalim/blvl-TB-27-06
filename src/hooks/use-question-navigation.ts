'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { studyPaths } from '@/utils/constants/study-paths';

export type NavigationType = 'question' | 'roadmap' | 'study-path';

export interface NavigationProgress {
  current: number;
  total: number;
  level: string;
  percentage: number;
}

export interface NavigationData {
  nextQuestion: string | null | undefined;
  previousQuestion: string | null | undefined;
  progress?: NavigationProgress;
}

export interface UseQuestionNavigationProps {
  questionId: string;
  pathType: NavigationType;
  nextPrevPromise?: Promise<NavigationData | null>;
  roadmapUid?: string;
}

export interface UseQuestionNavigationReturn {
  // Navigation URLs
  nextQuestion: string | null | undefined;
  previousQuestion: string | null | undefined;
  
  // Progress tracking
  progress: NavigationProgress | null;
  
  // Navigation state
  isLoading: boolean;
  canGoNext: boolean;
  canGoPrev: boolean;
  
  // Navigation actions
  navigateNext: () => void;
  navigatePrevious: () => void;
  
  // URL generation helpers
  getNextQuestionUrl: () => string | null;
  getPreviousQuestionUrl: () => string | null;
  
  // Text helpers for UI
  getNextActionText: (questionType?: string, isLevelCompleted?: boolean) => string;
}

export const useQuestionNavigation = ({
  questionId,
  pathType,
  nextPrevPromise,
  roadmapUid,
}: UseQuestionNavigationProps): UseQuestionNavigationReturn => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Navigation state
  const [nextQuestion, setNextQuestion] = useState<string | null | undefined>(null);
  const [previousQuestion, setPreviousQuestion] = useState<string | null | undefined>(null);
  const [progress, setProgress] = useState<NavigationProgress | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Extract search params
  const type = searchParams?.get('type');
  const studyPathSlug = searchParams?.get('study-path');

  // Study path navigation logic
  const handleStudyPathNavigation = useCallback(() => {
    if (type !== 'study-path' || !studyPathSlug) return;

    const studyPath = studyPaths.find((path) => path.slug === studyPathSlug);
    if (!studyPath) return;

    // Handle overviewData structure
    if ('overviewData' in studyPath && studyPath.overviewData) {
      const allSlugs = Object.values(studyPath.overviewData || {})
        .flatMap((section: any) => section.questionSlugs || [])
        .filter(Boolean);

      const currentIndex = allSlugs.indexOf(questionId);
      const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;
      const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;

      setPreviousQuestion(
        prevSlug ? `/roadmap/learn/${studyPathSlug}/main/lesson?lesson=${currentIndex}` : null
      );
      setNextQuestion(
        nextSlug ? `/roadmap/learn/${studyPathSlug}/main/lesson?lesson=${currentIndex + 1}` : null
      );
    } else {
      // Handle simple questionSlugs array
      const currentIndex = studyPath.questionSlugs.indexOf(questionId);
      const nextSlug = currentIndex < studyPath.questionSlugs.length - 1 
        ? studyPath.questionSlugs[currentIndex + 1] 
        : null;
      const prevSlug = currentIndex > 0 
        ? studyPath.questionSlugs[currentIndex - 1] 
        : null;

      setPreviousQuestion(
        prevSlug ? `/roadmap/learn/${studyPathSlug}/main/lesson?lesson=${currentIndex - 1}` : null
      );
      setNextQuestion(
        nextSlug ? `/roadmap/learn/${studyPathSlug}/main/lesson?lesson=${currentIndex + 1}` : null
      );
    }
  }, [questionId, type, studyPathSlug]);

  // Regular navigation logic (for question and roadmap types)
  const handleRegularNavigation = useCallback(async () => {
    if (!nextPrevPromise) return;

    setIsLoading(true);
    try {
      const nextPrev = await nextPrevPromise;
      if (nextPrev) {
        setNextQuestion(nextPrev.nextQuestion);
        setPreviousQuestion(nextPrev.previousQuestion);
        
        if (nextPrev.progress) {
          setProgress(nextPrev.progress);
        }
      }
    } catch (error) {
      console.error('Error fetching navigation data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [nextPrevPromise]);

  // Main navigation effect
  useEffect(() => {
    if (pathType === 'study-path' || type === 'study-path') {
      handleStudyPathNavigation();
    } else {
      handleRegularNavigation();
    }
  }, [pathType, type, handleStudyPathNavigation, handleRegularNavigation, pathname, searchParams]);

  // URL generation helpers
  const getNextQuestionUrl = useCallback((): string | null => {
    if (!nextQuestion) return null;

    // For roadmap questions
    if (pathType === 'roadmap' && roadmapUid) {
      return `/roadmap/${roadmapUid}/${nextQuestion}`;
    }

    // For study path questions
    if (pathType === 'study-path' || type === 'study-path') {
      return nextQuestion; // Already formatted URL
    }

    // For regular questions
    return `/question/${nextQuestion}`;
  }, [nextQuestion, pathType, roadmapUid, type]);

  const getPreviousQuestionUrl = useCallback((): string | null => {
    if (!previousQuestion) return null;

    // For roadmap questions
    if (pathType === 'roadmap' && roadmapUid) {
      return `/roadmap/${roadmapUid}/${previousQuestion}`;
    }

    // For study path questions
    if (pathType === 'study-path' || type === 'study-path') {
      return previousQuestion; // Already formatted URL
    }

    // For regular questions
    return `/question/${previousQuestion}`;
  }, [previousQuestion, pathType, roadmapUid, type]);

  // Navigation actions
  const navigateNext = useCallback(() => {
    const url = getNextQuestionUrl();
    if (url) {
      window.location.href = url;
    }
  }, [getNextQuestionUrl]);

  const navigatePrevious = useCallback(() => {
    const url = getPreviousQuestionUrl();
    if (url) {
      window.location.href = url;
    }
  }, [getPreviousQuestionUrl]);

  // Text helpers for UI
  const getNextActionText = useCallback((
    questionType?: string, 
    isLevelCompleted?: boolean
  ): string => {
    if (!progress) return 'Далее';
    
    if (questionType === 'VIDEO') {
      return nextQuestion ? 'Перейти к тесту' : 'Следующий урок';
    }
    
    if (questionType === 'MULTIPLE_CHOICE') {
      if (isLevelCompleted) {
        return 'Завершить уровень';
      }
      return nextQuestion ? 'Следующий урок' : 'Вернуться к карте уровней';
    }
    
    return 'Далее';
  }, [progress, nextQuestion]);

  // Computed properties
  const canGoNext = Boolean(nextQuestion) && !isLoading;
  const canGoPrev = Boolean(previousQuestion) && !isLoading;

  return {
    // Navigation URLs
    nextQuestion,
    previousQuestion,
    
    // Progress tracking
    progress,
    
    // Navigation state
    isLoading,
    canGoNext,
    canGoPrev,
    
    // Navigation actions
    navigateNext,
    navigatePrevious,
    
    // URL generation helpers
    getNextQuestionUrl,
    getPreviousQuestionUrl,
    
    // Text helpers for UI
    getNextActionText,
  };
}; 