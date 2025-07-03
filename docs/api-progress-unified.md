# API Documentation: /api/progress/unified

## Описание

Унифицированный API endpoint для получения всех данных прогресса пользователя в одном запросе. Заменяет множественные API вызовы и обеспечивает консистентность данных между компонентами.

## Endpoint

```
GET /api/progress/unified
```

## Аутентификация

Требуется аутентифицированный пользователь. Endpoint использует cookies для определения текущего пользователя.

## Кэширование

- **Server-side cache**: 5 минут (300 секунд)
- **Stale-while-revalidate**: 60 секунд
- **Cache-Control**: `public, s-maxage=300, stale-while-revalidate=60`

## Ответ

### Успешный ответ (200)

```typescript
interface UnifiedProgressData {
  // Глобальный прогресс
  completedLevels: number;           // Количество завершенных уровней
  totalLevels: number;               // Общее количество уровней
  overallProgress: number;           // Общий прогресс в процентах (0-100)
  currentLevelProgress?: number;     // Прогресс текущего уровня в процентах
  currentLevelName?: string;         // Название текущего уровня
  
  // Данные для sidebar
  userXp: number;                    // Общие очки опыта пользователя
  weeklyXp: number;                  // Недельные очки опыта
  currentStreak: number;             // Текущая серия дней
  
  // Данные для dashboard
  nextLesson: {
    slug: string | null;             // Slug следующего урока
    title?: string;                  // Название следующего урока
    type?: 'VIDEO' | 'MULTIPLE_CHOICE'; // Тип урока
    levelName?: string;              // Название уровня урока
    url: string | null;              // URL следующего урока
    isNewUser: boolean;              // Новый ли пользователь
    progress?: {                     // Прогресс в текущем уровне
      current: number;               // Текущий урок
      total: number;                 // Всего уроков в уровне
      level: string;                 // Тег уровня (level-1, level-2...)
      percentage: number;            // Процент завершения уровня
    };
  };
  totalCompletedQuestions: number;   // Всего отвеченных вопросов
  totalQuestions: number;            // Всего вопросов в курсе
  
  // Детали по каждому уровню
  levelDetails: Array<{
    levelNumber: number;             // Номер уровня (1, 2, 3...)
    name: string;                    // Название уровня
    completed: boolean;              // Завершен ли уровень (>80%)
    progress: number;                // Прогресс уровня в процентах
    totalQuestions: number;          // Всего вопросов в уровне
    completedQuestions: number;      // Отвеченных вопросов в уровне
    tagName: string;                 // Тег уровня (level-1, level-2...)
  }>;
}
```

### Пример успешного ответа

```json
{
  "completedLevels": 1,
  "totalLevels": 5,
  "overallProgress": 25,
  "currentLevelProgress": 60,
  "currentLevelName": "Маркетинг и продвижение",
  "userXp": 350,
  "weeklyXp": 120,
  "currentStreak": 5,
  "nextLesson": {
    "slug": "target-audience-video",
    "title": "Определение целевой аудитории",
    "type": "VIDEO",
    "levelName": "Маркетинг и продвижение",
    "url": "/question/target-audience-video",
    "isNewUser": false,
    "progress": {
      "current": 3,
      "total": 7,
      "level": "level-2",
      "percentage": 43
    }
  },
  "totalCompletedQuestions": 8,
  "totalQuestions": 33,
  "levelDetails": [
    {
      "levelNumber": 1,
      "name": "Основы бизнеса",
      "completed": true,
      "progress": 100,
      "totalQuestions": 5,
      "completedQuestions": 5,
      "tagName": "level-1"
    },
    {
      "levelNumber": 2,
      "name": "Маркетинг и продвижение",
      "completed": false,
      "progress": 43,
      "totalQuestions": 7,
      "completedQuestions": 3,
      "tagName": "level-2"
    }
  ]
}
```

### Ошибки

#### 401 Unauthorized
```json
{
  "error": "User not authenticated"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Failed to fetch progress data"
}
```

## Использование

### В компонентах React

```typescript
import { useEffect, useState } from 'react';
import type { UnifiedProgressData } from '@/types/Progress';

function ProgressComponent() {
  const [progress, setProgress] = useState<UnifiedProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/progress/unified')
      .then(res => res.json())
      .then(data => {
        setProgress(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching progress:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (!progress) return <div>Ошибка загрузки</div>;

  return (
    <div>
      <h2>Прогресс: {progress.overallProgress}%</h2>
      <p>Завершено уровней: {progress.completedLevels} из {progress.totalLevels}</p>
      <p>XP: {progress.userXp}</p>
      <p>Серия: {progress.currentStreak} дней</p>
      
      {progress.nextLesson.slug && (
        <a href={progress.nextLesson.url}>
          Следующий урок: {progress.nextLesson.title}
        </a>
      )}
    </div>
  );
}
```

### С SWR (рекомендуется)

```typescript
import useSWR from 'swr';
import type { UnifiedProgressData } from '@/types/Progress';

const fetcher = (url: string) => fetch(url).then(res => res.json());

function ProgressWithSWR() {
  const { data, error, isLoading } = useSWR<UnifiedProgressData>(
    '/api/progress/unified',
    fetcher,
    {
      refreshInterval: 30000, // Обновление каждые 30 секунд
      revalidateOnFocus: true,
    }
  );

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;
  if (!data) return <div>Нет данных</div>;

  return (
    <div>
      {/* Используйте data.* для доступа к данным прогресса */}
    </div>
  );
}
```

## Селекторы данных

Для удобства использования в разных компонентах, можно создать селекторы:

```typescript
import type { UnifiedProgressData, ProgressSelectors } from '@/types/Progress';

export function createProgressSelectors(data: UnifiedProgressData): ProgressSelectors {
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
  };
}
```

## Миграция от старых API

### Замена /api/progress/global

**Старый код:**
```typescript
const response = await fetch('/api/progress/global');
const globalData = await response.json();
```

**Новый код:**
```typescript
const response = await fetch('/api/progress/unified');
const unifiedData = await response.json();
const globalData = createProgressSelectors(unifiedData).globalProgress;
```

### Замена отдельных запросов dashboard

**Старый код:**
```typescript
const [userStreak, lastLesson, userXp] = await Promise.all([
  getUserDailyStats(),
  getLastLesson(),
  getUserXp(),
]);
```

**Новый код:**
```typescript
const response = await fetch('/api/progress/unified');
const data = await response.json();
// Все данные доступны в одном объекте
const { currentStreak, nextLesson, userXp } = data;
```

## Производительность

- **Оптимизация**: Использует `Promise.all()` для параллельных запросов к БД
- **Кэширование**: React `cache()` функция для server-side кэширования
- **HTTP кэширование**: 5-минутный кэш с stale-while-revalidate
- **Минимизация запросов**: Один API вызов вместо 3-5 отдельных

## Связанные файлы

- **API Route**: `src/app/api/progress/unified/route.ts`
- **Types**: `src/types/Progress.ts`
- **Tests**: `src/app/api/progress/unified/__tests__/route.test.ts`
- **Legacy API**: `src/app/api/progress/global/route.ts` (deprecated)

## Changelog

### v1.0.0 (2025-01-03)
- Создан унифицированный endpoint для прогресса
- Добавлено кэширование и оптимизация
- Создана полная TypeScript типизация
- Добавлены тесты и документация
- Помечен старый `/api/progress/global` как deprecated 