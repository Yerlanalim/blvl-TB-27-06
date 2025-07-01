'use client';

import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Target, Trophy, Book, Zap } from 'lucide-react';
import { useUser } from '@/hooks/use-user';

interface GlobalProgressData {
  completedLevels: number;
  totalLevels: number;
  overallProgress: number;
  currentLevelProgress?: number;
  userXp: number;
  weeklyXp: number;
  currentLevelName?: string;
  totalCompletedQuestions: number;
  totalQuestions: number;
}

/**
 * BIZLEVEL: Глобальный индикатор прогресса для отображения на всех страницах
 * Показывает общий прогресс, текущий уровень, XP и адаптируется под размер экрана
 */
export default function GlobalProgressIndicator() {
  const { user } = useUser();
  const [progressData, setProgressData] = useState<GlobalProgressData | null>(null);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Получение данных прогресса пользователя
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        // Получаем прогресс через API route
        const response = await fetch('/api/progress/global');
        if (response.ok) {
          const data = await response.json();
          setProgressData(data);
        } else {
          // Fallback на заглушку при ошибке
          const mockData: GlobalProgressData = {
            completedLevels: 1,
            totalLevels: 5,
            overallProgress: 20,
            currentLevelProgress: 85,
            userXp: user.userXp || 0,
            weeklyXp: user.weeklyUserXp || 0,
            currentLevelName: 'Основы бизнеса',
            totalCompletedQuestions: 5,
            totalQuestions: 25,
          };
          setProgressData(mockData);
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
        // Fallback на заглушку при ошибке
        const mockData: GlobalProgressData = {
          completedLevels: 1,
          totalLevels: 5,
          overallProgress: 20,
          currentLevelProgress: 85,
          userXp: user.userXp || 0,
          weeklyXp: user.weeklyUserXp || 0,
          currentLevelName: 'Основы бизнеса',
          totalCompletedQuestions: 5,
          totalQuestions: 25,
        };
        setProgressData(mockData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [user]);

  // Анимация прогресса
  useEffect(() => {
    if (progressData && !isLoading) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progressData.overallProgress);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progressData, isLoading]);

  if (!user || isLoading) return null;
  if (!progressData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-black-75/80 to-black-50/80 backdrop-blur-sm border-b border-gray-800"
    >
      {/* Desktop версия */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Левая секция - общий прогресс */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-accent" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-white">
                      Общий прогресс курса
                    </span>
                    <motion.span 
                      className="text-accent font-bold text-sm"
                      animate={{ scale: animatedProgress !== progressData.overallProgress ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {Math.round(animatedProgress)}%
                    </motion.span>
                  </div>
                  <Progress 
                    value={animatedProgress} 
                    className="h-2 w-48 bg-black-75"
                    indicatorColor="bg-accent transition-all duration-500 ease-out"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    {progressData.totalCompletedQuestions} из {progressData.totalQuestions} уроков
                  </div>
                </div>
              </div>
              
              {/* Текущий уровень */}
              <div className="flex items-center gap-2">
                <Book className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">
                  {progressData.currentLevelName}
                </span>
                {progressData.currentLevelProgress !== undefined && (
                  <span className="text-xs text-gray-400">
                    ({progressData.currentLevelProgress}%)
                  </span>
                )}
              </div>
            </div>

            {/* Правая секция - достижения и XP */}
            <div className="flex items-center gap-4">
              {/* Завершенные уровни */}
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-300">
                  {progressData.completedLevels}/{progressData.totalLevels} уровней
                </span>
              </div>
              
              {/* XP */}
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <div className="text-right">
                  <div className="text-xs text-gray-400">XP</div>
                  <div className="text-sm font-medium text-white">{progressData.userXp}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile версия - компактная */}
      <div className="lg:hidden">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Основной прогресс */}
            <div className="flex items-center gap-3 flex-1">
              <Target className="w-4 h-4 text-accent flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-300 truncate">
                    {progressData.currentLevelName}
                  </span>
                  <span className="text-xs text-accent font-medium">
                    {Math.round(animatedProgress)}%
                  </span>
                </div>
                <Progress 
                  value={animatedProgress} 
                  className="h-1.5 bg-black-75"
                  indicatorColor="bg-accent transition-all duration-500 ease-out"
                />
                <div className="text-xs text-gray-500 mt-0.5">
                  {progressData.totalCompletedQuestions}/{progressData.totalQuestions} уроков
                </div>
              </div>
            </div>
            
            {/* Достижения */}
            <div className="flex items-center gap-3 ml-4 flex-shrink-0">
              <div className="flex items-center gap-1">
                <Trophy className="w-3 h-3 text-yellow-500" />
                <span className="text-xs text-gray-300">
                  {progressData.completedLevels}/{progressData.totalLevels}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-purple-400" />
                <span className="text-xs text-gray-300">{progressData.userXp}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 