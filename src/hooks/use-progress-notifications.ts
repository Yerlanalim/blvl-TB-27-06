import { useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { Trophy, CheckCircle, Flame, Target } from 'lucide-react';

// BIZLEVEL: Система уведомлений о прогрессе обучения
interface ProgressNotificationOptions {
  debounceMs?: number;
  showOnlyOnce?: boolean;
}

interface NotificationState {
  lastShown: number;
  count: number;
}

const DEFAULT_DEBOUNCE_MS = 1000;
const STORAGE_KEY_PREFIX = 'bizlevel_notification_';

/**
 * Хук для отображения уведомлений о прогрессе обучения
 * Включает дебаунс и контроль повторных показов
 */
export function useProgressNotifications(options: ProgressNotificationOptions = {}) {
  const { debounceMs = DEFAULT_DEBOUNCE_MS, showOnlyOnce = false } = options;
  const notificationStates = useRef<Map<string, NotificationState>>(new Map());

  // Проверка и обновление состояния уведомления
  const checkAndUpdateNotificationState = useCallback((key: string): boolean => {
    const now = Date.now();
    const state = notificationStates.current.get(key) || { lastShown: 0, count: 0 };
    
    // Проверка дебаунса
    if (now - state.lastShown < debounceMs) {
      return false;
    }

    // Проверка показа только один раз
    if (showOnlyOnce && state.count > 0) {
      return false;
    }

    // Обновление состояния
    notificationStates.current.set(key, {
      lastShown: now,
      count: state.count + 1,
    });

    // Сохранение в localStorage для персистентности
    if (showOnlyOnce) {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify(state));
    }

    return true;
  }, [debounceMs, showOnlyOnce]);

  // Загрузка состояния из localStorage
  const loadNotificationState = useCallback((key: string) => {
    if (showOnlyOnce) {
      try {
        const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`);
        if (saved) {
          const state = JSON.parse(saved);
          notificationStates.current.set(key, state);
        }
      } catch (error) {
        console.warn('Failed to load notification state:', error);
      }
    }
  }, [showOnlyOnce]);

  /**
   * Показать уведомление о завершении урока
   */
  const showLessonComplete = useCallback((lessonName: string, lessonType: 'video' | 'test' = 'test') => {
    const key = `lesson_complete_${lessonName}`;
    loadNotificationState(key);
    
    if (!checkAndUpdateNotificationState(key)) return;

    const icon = lessonType === 'video' ? '📹' : '📝';
    const message = lessonType === 'video' 
      ? `Видео-урок "${lessonName}" просмотрен!` 
      : `Тест "${lessonName}" завершен!`;

    toast.success(message, {
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
      description: `${icon} Отличная работа! Продолжайте обучение.`,
      duration: 4000,
      className: 'bg-black-75 border-green-500/20',
    });
  }, [checkAndUpdateNotificationState, loadNotificationState]);

  /**
   * Показать уведомление о завершении уровня
   */
  const showLevelComplete = useCallback((levelName: string) => {
    const key = `level_complete_${levelName}`;
    loadNotificationState(key);
    
    if (!checkAndUpdateNotificationState(key)) return;

    toast.success(`Уровень "${levelName}" завершен! 🎉`, {
      icon: <Trophy className="w-4 h-4 text-yellow-500" />,
      description: '🏆 Поздравляем! Вы достигли нового уровня мастерства.',
      duration: 6000,
      className: 'bg-black-75 border-yellow-500/20',
      action: {
        label: 'Следующий уровень',
        onClick: () => {
          // TODO: Навигация к следующему уровню
          console.log('Navigate to next level');
        },
      },
    });
  }, [checkAndUpdateNotificationState, loadNotificationState]);

  /**
   * Показать уведомление о новом достижении
   */
  const showAchievement = useCallback((achievementName: string, rarity: 'common' | 'rare' | 'epic' | 'legendary' = 'common') => {
    const key = `achievement_${achievementName}`;
    loadNotificationState(key);
    
    if (!checkAndUpdateNotificationState(key)) return;

    const rarityEmoji = {
      common: '🥉',
      rare: '🥈', 
      epic: '🥇',
      legendary: '💎'
    };

    const rarityColor = {
      common: 'text-gray-500',
      rare: 'text-blue-500',
      epic: 'text-purple-500',
      legendary: 'text-yellow-500'
    };

    toast.success(`Новое достижение: ${achievementName}! 🏆`, {
      icon: <Trophy className={`w-4 h-4 ${rarityColor[rarity]}`} />,
      description: `${rarityEmoji[rarity]} Вы получили достижение уровня "${rarity}".`,
      duration: 8000,
      className: 'bg-black-75 border-accent/20',
      action: {
        label: 'Посмотреть',
        onClick: () => {
          // TODO: Открыть страницу достижений
          console.log('Navigate to achievements');
        },
      },
    });
  }, [checkAndUpdateNotificationState, loadNotificationState]);

  /**
   * Показать приветственное уведомление при возвращении
   */
  const showWelcomeBack = useCallback((daysAway: number) => {
    const key = `welcome_back_${new Date().toDateString()}`;
    loadNotificationState(key);
    
    if (!checkAndUpdateNotificationState(key)) return;

    let message = 'С возвращением! Продолжим обучение? 💪';
    let description = 'Давайте продолжим изучать бизнес вместе!';

    if (daysAway > 1) {
      message = `С возвращением! Вас не было ${daysAway} дней.`;
      description = 'Время наверстать упущенное и продолжить обучение!';
    }

    toast(message, {
      icon: <Target className="w-4 h-4 text-accent" />,
      description,
      duration: 5000,
      className: 'bg-black-75 border-accent/20',
      action: {
        label: 'Продолжить',
        onClick: () => {
          // TODO: Навигация к текущему уроку
          console.log('Navigate to current lesson');
        },
      },
    });
  }, [checkAndUpdateNotificationState, loadNotificationState]);

  /**
   * Показать уведомление о серии дней
   */
  const showStreakNotification = useCallback((streakDays: number) => {
    const key = `streak_${streakDays}`;
    loadNotificationState(key);
    
    if (!checkAndUpdateNotificationState(key)) return;

    let message = `Серия ${streakDays} дней! 🔥`;
    let description = 'Отличная последовательность! Продолжайте в том же духе.';

    if (streakDays >= 7) {
      message = `Невероятная серия ${streakDays} дней! 🔥🔥`;
      description = 'Вы настоящий чемпион постоянства!';
    }

    toast.success(message, {
      icon: <Flame className="w-4 h-4 text-orange-500" />,
      description,
      duration: 5000,
      className: 'bg-black-75 border-orange-500/20',
    });
  }, [checkAndUpdateNotificationState, loadNotificationState]);

  /**
   * Показать мотивационное уведомление
   */
  const showMotivationalMessage = useCallback((type: 'encouragement' | 'tip' | 'reminder' = 'encouragement') => {
    const key = `motivational_${type}_${new Date().toDateString()}`;
    loadNotificationState(key);
    
    if (!checkAndUpdateNotificationState(key)) return;

    const messages = {
      encouragement: [
        'Каждый урок приближает вас к успеху! 🚀',
        'Вы делаете отличные успехи! 💪',
        'Знания - это инвестиция в ваше будущее! 📈',
      ],
      tip: [
        'Совет: Делайте заметки во время изучения видео-уроков! 📝',
        'Совет: Применяйте полученные знания на практике! 🎯',
        'Совет: Обсуждайте изученное с другими предпринимателями! 💬',
      ],
      reminder: [
        'Не забывайте повторять пройденный материал! 🔄',
        'Регулярное обучение - ключ к успеху! ⏰',
        'Практика - лучший способ закрепить знания! 🛠️',
      ],
    };

    const messageList = messages[type];
    const randomMessage = messageList[Math.floor(Math.random() * messageList.length)];

    toast(randomMessage, {
      icon: <Target className="w-4 h-4 text-accent" />,
      duration: 4000,
      className: 'bg-black-75 border-accent/20',
    });
  }, [checkAndUpdateNotificationState, loadNotificationState]);

  /**
   * Очистить все сохраненные состояния уведомлений
   */
  const clearNotificationStates = useCallback(() => {
    notificationStates.current.clear();
    
    // Очистка localStorage
    const keys = Object.keys(localStorage).filter(key => key.startsWith(STORAGE_KEY_PREFIX));
    keys.forEach(key => localStorage.removeItem(key));
  }, []);

  return {
    showLessonComplete,
    showLevelComplete,
    showAchievement,
    showWelcomeBack,
    showStreakNotification,
    showMotivationalMessage,
    clearNotificationStates,
  };
} 