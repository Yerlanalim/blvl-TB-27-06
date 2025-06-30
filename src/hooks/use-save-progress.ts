'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from 'sonner';

type ProgressAction = 
  | 'lesson_complete' 
  | 'level_complete' 
  | 'video_watched' 
  | 'test_passed' 
  | 'bookmark_added'
  | 'chat_saved';

type ProgressData = {
  questionUid?: string;
  lessonSlug?: string;
  levelSlug?: string;
  userAnswer?: any;
  timeTaken?: number;
  metadata?: Record<string, any>;
};

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error' | 'offline';

interface OfflineAction {
  id: string;
  action: ProgressAction;
  data: ProgressData;
  timestamp: number;
  retries: number;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds
const OFFLINE_STORAGE_KEY = 'bizlevel_offline_actions';

/**
 * Хук для надежного сохранения прогресса пользователя
 * Поддерживает двойное сохранение (localStorage + Supabase) с retry механизмом
 */
export function useSaveProgress() {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [isOnline, setIsOnline] = useState(true);
  const offlineQueue = useRef<OfflineAction[]>([]);
  const retryTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Загрузка оффлайн очереди из localStorage при инициализации
  useEffect(() => {
    const savedQueue = localStorage.getItem(OFFLINE_STORAGE_KEY);
    if (savedQueue) {
      try {
        offlineQueue.current = JSON.parse(savedQueue);
      } catch (error) {
        console.error('Error loading offline queue:', error);
        localStorage.removeItem(OFFLINE_STORAGE_KEY);
      }
    }
  }, []);

  // Сохранение очереди в localStorage
  const saveOfflineQueue = useCallback(() => {
    try {
      localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(offlineQueue.current));
    } catch (error) {
      console.error('Error saving offline queue:', error);
    }
  }, []);

  // Генерация уникального ID для действия
  const generateActionId = useCallback(() => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Сохранение в localStorage (мгновенно)
  const saveToLocalStorage = useCallback((action: ProgressAction, data: ProgressData) => {
    try {
      const key = `bizlevel_progress_${action}_${data.questionUid || data.lessonSlug || Date.now()}`;
      const progressData = {
        action,
        data,
        timestamp: Date.now(),
        synced: false,
      };
      localStorage.setItem(key, JSON.stringify(progressData));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }, []);

  // Сохранение в Supabase с retry
  const saveToSupabase = useCallback(async (action: ProgressAction, data: ProgressData): Promise<boolean> => {
    try {
      // Здесь будет вызов соответствующего API в зависимости от действия
      let response;
      
      switch (action) {
        case 'lesson_complete':
        case 'video_watched':
        case 'test_passed':
          // Используем существующий API для ответов на вопросы
          const { answerQuestion } = await import('@/actions/answers/answer');
          response = await answerQuestion({
            questionUid: data.questionUid!,
            answerUid: data.userAnswer?.uid,
            timeTaken: data.timeTaken,
            allPassed: true,
          });
          break;
          
        case 'chat_saved':
          // Используем API для сохранения чатов Leo
          const { saveLeoChat } = await import('@/utils/data/leo-chats/save-leo-chat');
          response = await saveLeoChat({
            message: data.metadata?.message || '',
            response: data.metadata?.response || '',
            context: data.metadata?.context,
          });
          break;
          
        case 'bookmark_added':
          // Здесь будет API для закладок
          console.log('Bookmark API not implemented yet');
          response = { success: true };
          break;
          
        default:
          console.warn('Unknown action type:', action);
          return false;
      }

      return !!response;
    } catch (error) {
      console.error('Error saving to Supabase:', error);
      return false;
    }
  }, []);

  // Добавление действия в оффлайн очередь
  const addToOfflineQueue = useCallback((action: ProgressAction, data: ProgressData) => {
    const actionId = generateActionId();
    const offlineAction: OfflineAction = {
      id: actionId,
      action,
      data,
      timestamp: Date.now(),
      retries: 0,
    };

    offlineQueue.current.push(offlineAction);
    saveOfflineQueue();
    
    return actionId;
  }, [generateActionId, saveOfflineQueue]);

  // Retry функция для неудачных сохранений
  const retryAction = useCallback(async (actionId: string) => {
    const actionIndex = offlineQueue.current.findIndex(item => item.id === actionId);
    if (actionIndex === -1) return;

    const action = offlineQueue.current[actionIndex];
    if (action.retries >= MAX_RETRIES) {
      // Удаляем из очереди после превышения лимита попыток
      offlineQueue.current.splice(actionIndex, 1);
      saveOfflineQueue();
      
      toast.error('Не удалось сохранить данные', {
        description: 'Превышено количество попыток. Попробуйте позже.',
        icon: '⚠️',
      });
      return;
    }

    action.retries++;
    const success = await saveToSupabase(action.action, action.data);
    
    if (success) {
      // Удаляем из очереди при успешном сохранении
      offlineQueue.current.splice(actionIndex, 1);
      saveOfflineQueue();
      
      // Отмечаем как синхронизированное в localStorage
      const key = `bizlevel_progress_${action.action}_${action.data.questionUid || action.data.lessonSlug || action.timestamp}`;
      const savedData = localStorage.getItem(key);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          parsed.synced = true;
          localStorage.setItem(key, JSON.stringify(parsed));
        } catch (error) {
          console.error('Error updating localStorage sync status:', error);
        }
      }
    } else {
      // Планируем следующую попытку
      const timeout = setTimeout(() => {
        retryAction(actionId);
      }, RETRY_DELAY * (action.retries + 1)); // Увеличиваем задержку с каждой попыткой
      
      retryTimeouts.current.set(actionId, timeout);
    }
  }, [saveToSupabase, saveOfflineQueue]);

  // Синхронизация оффлайн прогресса при восстановлении связи
  const syncOfflineProgress = useCallback(async () => {
    if (!isOnline || offlineQueue.current.length === 0) return;

    setSaveStatus('saving');
    
    const actionsToSync = [...offlineQueue.current];
    let syncedCount = 0;
    
    for (const action of actionsToSync) {
      const success = await saveToSupabase(action.action, action.data);
      if (success) {
        syncedCount++;
        // Удаляем из очереди
        const index = offlineQueue.current.findIndex(item => item.id === action.id);
        if (index !== -1) {
          offlineQueue.current.splice(index, 1);
        }
      }
    }
    
    saveOfflineQueue();
    setSaveStatus('saved');
    
    if (syncedCount > 0) {
      toast.success(`Синхронизировано ${syncedCount} действий`, {
        icon: '✅',
      });
    }
    
    setTimeout(() => setSaveStatus('idle'), 2000);
  }, [isOnline, saveToSupabase, saveOfflineQueue]);

  // Отслеживание состояния сети
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineProgress();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Проверяем начальное состояние
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncOfflineProgress]);

  // Основная функция сохранения прогресса
  const saveProgress = useCallback(async (action: ProgressAction, data: ProgressData) => {
    setSaveStatus('saving');
    
    // 1. Сохраняем в localStorage мгновенно
    const localSaved = saveToLocalStorage(action, data);
    if (!localSaved) {
      setSaveStatus('error');
      toast.error('Ошибка локального сохранения');
      return false;
    }

    // 2. Пытаемся сохранить в Supabase
    if (isOnline) {
      const remoteSaved = await saveToSupabase(action, data);
      if (remoteSaved) {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
        return true;
      } else {
        // Добавляем в очередь для retry
        const actionId = addToOfflineQueue(action, data);
        setSaveStatus('error');
        
        // Показываем toast с кнопкой retry
        toast.error('Ошибка сохранения в облаке', {
          description: 'Данные сохранены локально. Попробуем снова.',
          icon: '⚠️',
          action: {
            label: 'Повторить',
            onClick: () => retryAction(actionId),
          },
        });
        
        // Автоматически пытаемся снова через некоторое время
        setTimeout(() => retryAction(actionId), RETRY_DELAY);
        return false;
      }
    } else {
      // Оффлайн режим - добавляем в очередь
      addToOfflineQueue(action, data);
      setSaveStatus('offline');
      
      toast('Данные сохранены локально', {
        description: 'Будут синхронизированы при восстановлении связи',
        icon: '📱',
      });
      
      setTimeout(() => setSaveStatus('idle'), 2000);
      return true;
    }
  }, [isOnline, saveToLocalStorage, saveToSupabase, addToOfflineQueue, retryAction]);

  // Получение статуса последнего сохранения
  const getProgressStatus = useCallback(() => {
    const pendingActions = offlineQueue.current.length;
    
    return {
      status: saveStatus,
      isOnline,
      pendingActions,
      hasErrors: offlineQueue.current.some(action => action.retries > 0),
    };
  }, [saveStatus, isOnline]);

  // Очистка оффлайн очереди (для тестирования)
  const clearOfflineQueue = useCallback(() => {
    offlineQueue.current = [];
    saveOfflineQueue();
    
    // Очищаем все таймауты retry
    retryTimeouts.current.forEach(timeout => clearTimeout(timeout));
    retryTimeouts.current.clear();
  }, [saveOfflineQueue]);

  // Cleanup при размонтировании
  useEffect(() => {
    return () => {
      const currentTimeouts = retryTimeouts.current;
      currentTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return {
    saveProgress,
    syncOfflineProgress,
    getProgressStatus,
    clearOfflineQueue, // Для тестирования
    isOnline,
    saveStatus,
  };
} 