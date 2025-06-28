'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Trophy, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { RoadmapUserQuestions } from '@prisma/client';

import { studyPaths } from '@/utils/constants/study-paths';
import LevelProgress from './level-progress';

import { useQuestionSingle } from '@/contexts/question-single-context';

/**
 * Component for navigation between different questions from within the
 * app.
 * BIZLEVEL: Обновлен для поддержки навигации по уровням с улучшенными состояниями завершения
 */
export default function QuestionNavigation(opts: {
  nextPrevPromise: Promise<{
    nextQuestion: string | null | undefined;
    previousQuestion: string | null | undefined;
    progress?: {
      current: number;
      total: number;
      level: string;
      percentage: number;
    };
  } | null>;
  navigationType: 'question' | 'roadmap';
  slug: string;
  randomQuestionComponent: React.ReactNode;
}) {
  const { nextPrevPromise, navigationType = 'question', slug, randomQuestionComponent } = opts;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const type = searchParams?.get('type');
  const studyPathSlug = searchParams?.get('study-path');

  // TEMP FIX. the whole structure of study path questions are changing
  if (type === 'study-path') {
    return null;
  }

  const { 
    previousQuestion, 
    setPreviousQuestion, 
    nextQuestion, 
    setNextQuestion, 
    progress, 
    setProgress,
    question,
    correctAnswer,
    currentLayout
  } = useQuestionSingle();

  // BIZLEVEL: Состояния для улучшенной навигации
  const [showCompletionState, setShowCompletionState] = useState(false);
  const [isLevelCompleted, setIsLevelCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // BIZLEVEL: Определение состояния завершения
  useEffect(() => {
    // Сброс состояний при смене вопроса
    setShowCompletionState(false);
    setIsLevelCompleted(false);
    setShowConfetti(false);
  }, [question.uid]);

  useEffect(() => {
    // Показать состояние завершения для VIDEO типа когда layout = 'answer'
    if (question.questionType === 'VIDEO' && currentLayout === 'answer') {
      setShowCompletionState(true);
    }
    
    // Показать состояние завершения для MULTIPLE_CHOICE когда ответ правильный
    if (question.questionType === 'MULTIPLE_CHOICE' && correctAnswer === 'correct') {
      setShowCompletionState(true);
    }

    // Проверить завершение уровня
    if (progress && progress.current === progress.total && correctAnswer === 'correct') {
      setIsLevelCompleted(true);
      setShowConfetti(true);
      // Убрать конфетти через 3 секунды
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [question.questionType, currentLayout, correctAnswer, progress]);

  useEffect(() => {
    // if this is a study-path, get the next/prev questions from the study-path object
    const studyPath =
      type === 'study-path' && studyPathSlug
        ? studyPaths.find((path) => path.slug === studyPathSlug)
        : null;

    if (studyPath) {
      // Check if we're using overviewData
      if ('overviewData' in studyPath && studyPath.overviewData) {
        // Get all question slugs from the overviewData structure
        const allSlugs = Object.values(studyPath.overviewData || {})
          .flatMap((section: any) => section.questionSlugs || [])
          .filter(Boolean);

        // Find the current question's index in the flattened structure
        const currentIndex = allSlugs.indexOf(slug);

        // Get next and previous questions based on index
        const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;
        const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;

        // Set the full URLs in context - using 'main' as the section slug for direct questions
        setPreviousQuestion(
          prevSlug ? `/roadmap/learn/${studyPathSlug}/main/lesson?lesson=${currentIndex}` : null
        );
        setNextQuestion(
          nextSlug ? `/roadmap/learn/${studyPathSlug}/main/lesson?lesson=${currentIndex + 1}` : null
        );
      } else {
        // Find the current question's index in the study path's questionSlugs
        const currentIndex = studyPath.questionSlugs.indexOf(slug);

        // Get next and previous questions based on index
        const nextSlug =
          currentIndex < studyPath.questionSlugs.length - 1
            ? studyPath.questionSlugs[currentIndex + 1]
            : null;
        const prevSlug = currentIndex > 0 ? studyPath.questionSlugs[currentIndex - 1] : null;

        // Set the full URLs in context
        setPreviousQuestion(
          prevSlug ? `/roadmap/learn/${studyPathSlug}/main/lesson?lesson=${currentIndex - 1}` : null
        );
        setNextQuestion(
          nextSlug ? `/roadmap/learn/${studyPathSlug}/main/lesson?lesson=${currentIndex + 1}` : null
        );
      }
    } else {
      // Use the provided promise for non-study-path questions
      // BIZLEVEL: Обновлено для поддержки прогресса уровня
      nextPrevPromise.then((nextPrev) => {
        setNextQuestion(nextPrev?.nextQuestion);
        setPreviousQuestion(nextPrev?.previousQuestion);
        
        // Устанавливаем прогресс если он есть
        if (nextPrev?.progress && setProgress) {
          setProgress(nextPrev.progress);
        }
      });
    }
  }, [pathname, searchParams, slug, type, nextPrevPromise, studyPathSlug, setNextQuestion, setPreviousQuestion, setProgress]);

  // BIZLEVEL: Функция для определения текста следующего действия
  const getNextActionText = () => {
    if (!progress) return 'Далее';
    
    if (question.questionType === 'VIDEO') {
      // Для видео всегда показываем "Перейти к тесту" если есть следующий вопрос
      return nextQuestion ? 'Перейти к тесту' : 'Следующий урок';
    }
    
    if (question.questionType === 'MULTIPLE_CHOICE') {
      if (isLevelCompleted) {
        return 'Завершить уровень';
      }
      return nextQuestion ? 'Следующий урок' : 'Вернуться к карте уровней';
    }
    
    return 'Далее';
  };

  // BIZLEVEL: Функция для обработки клика на следующее действие
  const handleNextAction = () => {
    if (isLevelCompleted && !nextQuestion) {
      // Перейти к карте уровней или следующему уровню
      window.location.href = '/levels';
      return;
    }
    
    if (nextQuestion) {
      window.location.href = `/question/${nextQuestion}`;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* BIZLEVEL: Анимация конфетти при завершении уровня */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Простая анимация конфетти */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-accent rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  rotate: 0,
                }}
                animate={{
                  y: window.innerHeight + 10,
                  rotate: 360,
                  x: Math.random() * window.innerWidth,
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* BIZLEVEL: Прогресс уровня */}
      {progress && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LevelProgress progress={progress} className="px-2" />
        </motion.div>
      )}

      {/* BIZLEVEL: Улучшенное состояние завершения */}
      <AnimatePresence>
        {showCompletionState && (
          <motion.div
            className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {isLevelCompleted ? (
                  <Trophy className="w-6 h-6 text-yellow-500" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                )}
              </motion.div>
              
              <div className="flex-1">
                <motion.h3
                  className="font-semibold text-green-800"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {isLevelCompleted ? 'Уровень завершен! 🎉' : 'Отлично! Задание выполнено'}
                </motion.h3>
                
                <motion.p
                  className="text-sm text-green-600 mt-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  {isLevelCompleted 
                    ? `Вы успешно прошли ${progress?.level}! Переходите к следующему уровню.`
                    : question.questionType === 'VIDEO' 
                      ? 'Видео-урок просмотрен. Готовы к тестированию?'
                      : 'Правильный ответ! Продолжайте обучение.'
                  }
                </motion.p>
              </div>

              {/* Кнопка следующего действия */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <Button
                  onClick={handleNextAction}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2"
                >
                  {getNextActionText()}
                  {isLevelCompleted ? (
                    <Star className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        className="flex items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center">
        {/* Previous Question */}
        <TooltipProvider delayDuration={0} skipDelayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  href={previousQuestion || '#'}
                  className={`p-2 rounded-l-md relative group duration-200 size-8 flex items-center justify-center border-r-0 lesson-nav-btn ${
                    !previousQuestion ? 'opacity-50 pointer-events-none' : ''
                  }`}
                  variant="ghost"
                >
                  <ChevronLeft className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
                  <ArrowLeft className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-white font-inter">
              {previousQuestion
                ? previousQuestion.includes('/roadmaps/')
                  ? 'Back to roadmap'
                  : `Previous ${navigationType}`
                : `No previous ${navigationType}`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Next Question */}
        <TooltipProvider delayDuration={0} skipDelayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  href={nextQuestion || '#'}
                  className={`p-2 rounded-r-md relative group duration-200 size-8 flex items-center justify-center lesson-nav-btn ${
                    !nextQuestion ? 'opacity-50 pointer-events-none' : ''
                  }`}
                  variant="ghost"
                >
                  <ChevronRight className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
                  <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {nextQuestion
                ? nextQuestion.includes('/roadmaps/')
                  ? 'Back to roadmap'
                  : `Next ${navigationType}`
                : `No next ${navigationType}`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

          {randomQuestionComponent}
        </div>
      </motion.div>
    </div>
  );
}

export function RoadmapQuestionNavigation(opts: {
  nextRoadmapQuestion: RoadmapUserQuestions | null | undefined;
  prevRoadmapQuestion: RoadmapUserQuestions | null | undefined;
  roadmap: {
    title: string;
    uid: string;
  };
}) {
  const { nextRoadmapQuestion, prevRoadmapQuestion, roadmap } = opts;

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-x-2">
        <TooltipProvider delayDuration={0} skipDelayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="default"
                className="z-30 flex items-center gap-x-2 mr-2"
                href={`/roadmap/${roadmap?.uid}`}
              >
                <ArrowLeft className="size-4" />
                <span className="text-sm hidden sm:block">Back</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Back to {roadmap?.title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center">
        {/* Previous Question */}
        <TooltipProvider delayDuration={0} skipDelayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={`/roadmap/${prevRoadmapQuestion?.roadmapUid}/${prevRoadmapQuestion?.uid}`}
                className={`bg-primary border border-black-50 p-2 rounded-l-md relative group duration-200 size-9 flex items-center justify-center border-r-0 ${
                  !prevRoadmapQuestion ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <ChevronLeft className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
                <ArrowLeft className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-white font-inter">
              {prevRoadmapQuestion ? `Previous Roadmap Question` : `No previous Roadmap Question`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Next Question */}
        <TooltipProvider delayDuration={0} skipDelayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={`/roadmap/${nextRoadmapQuestion?.roadmapUid}/${nextRoadmapQuestion?.uid}`}
                className={`bg-primary border border-black-50 p-2 rounded-r-md relative group duration-200 size-9 flex items-center justify-center ${
                  !nextRoadmapQuestion ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <ChevronRight className="size-4 opacity-100 group-hover:opacity-0 absolute duration-100" />
                <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 absolute duration-100" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {nextRoadmapQuestion ? `Next Roadmap Question` : `No next Roadmap Question`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
