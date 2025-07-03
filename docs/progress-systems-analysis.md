# Анализ существующих систем прогресса BizLevel

## Executive Summary

В проекте BizLevel обнаружено **3 основные системы прогресса**, которые частично дублируют функциональность и используют различные источники данных. Данный анализ выполнен в рамках **Задачи 8.1.1 этапа 8** для последующей унификации в единую систему.

---

## 1. ГЛОБАЛЬНЫЙ ИНДИКАТОР ПРОГРЕССА

### 📍 Местоположение:
- **Компонент:** `src/components/app/navigation/global-progress-indicator.tsx`
- **API:** `src/app/api/progress/global/route.ts`
- **Логика:** `src/utils/data/progress/get-global-progress.ts`
- **Интеграция:** `src/app/(app)/providers.tsx` (под header)

### 🔧 Функциональность:
```typescript
interface GlobalProgressData {
  completedLevels: number;        // Завершенные уровни
  totalLevels: number;           // Общее количество уровней
  overallProgress: number;       // Общий прогресс 0-100%
  currentLevelProgress?: number; // Прогресс текущего уровня
  userXp: number;               // Очки опыта пользователя
  weeklyXp: number;             // Недельные очки
  currentLevelName?: string;    // Название текущего уровня
  totalCompletedQuestions: number;
  totalQuestions: number;
}
```

### 📊 Источники данных:
- ✅ **Tag** - поиск тегов с префиксом `level-*`
- ✅ **Questions** - вопросы уровня через связь QuestionTags
- ✅ **QuestionTags** - связь многие-ко-многим
- ✅ **Answers** - правильные ответы (`correctAnswer = true`)
- ✅ **Users** - `userXp`, `weeklyUserXp`

### 🎯 Логика расчета:
1. **Поиск уровней:** Находит теги `level-1`, `level-2`, etc.
2. **Анализ прогресса:** Для каждого уровня считает правильные ответы
3. **Завершение уровня:** 80%+ правильных ответов = уровень завершен
4. **Общий прогресс:** (всего правильных ответов / всего вопросов) * 100

### 📱 Отображение:
- **Desktop:** Компактная полоса под header
- **Mobile:** Ультракомпактная версия
- **Адаптивность:** Framer Motion анимации

### ✅ Статус: **ПОЛНОСТЬЮ ФУНКЦИОНАЛЕН**

---

## 2. СИСТЕМА ПРОГРЕССА В SIDEBAR

### 📍 Местоположение:
- **Компонент:** `src/components/app/navigation/sidebar-dropdown.tsx` (строка 29)
- **Детальный прогресс:** `src/components/app/navigation/level-progress.tsx`
- **Навигация:** `src/components/app/navigation/question-navigation.tsx`

### 🔧 Функциональность:
```typescript
// ЗАГЛУШКА в sidebar-dropdown.tsx (строка 29-37)
function getUserLearningProgress(user: UserRecord | null) {
  if (!user) return { completedLevels: 0, totalLevels: 5, overallProgress: 0 };
  
  // Временная заглушка - в будущем получать из БД
  return {
    completedLevels: 1,     // Хардкод
    totalLevels: 5,         // Хардкод
    overallProgress: 20,    // Хардкод
  };
}
```

### 📊 Источники данных:
- ⚠️ **ЗАГЛУШКА** - не использует реальные данные БД
- 🔄 **TODO** - требуется интеграция с реальной системой

### 🎯 Что показывает:
- **Общий прогресс:** Progress bar с процентами
- **Уровни:** "Уровень X/Y" с иконкой Trophy
- **Target иконка:** Визуальный индикатор прогресса

### ❌ Статус: **ЗАГЛУШКА - ТРЕБУЕТ ИНТЕГРАЦИИ**

---

## 3. DASHBOARD СИСТЕМА ПРОГРЕССА

### 📍 Местоположение:
- **Header:** `src/components/app/dashboard/dashboard-header.tsx`
- **Next Question:** `src/components/app/dashboard/next-question-bento-box.tsx`
- **Progression:** `src/components/app/dashboard/progression-bento-box.tsx`
- **Welcome:** `src/components/app/dashboard/welcome-bento-box.tsx`

### 🔧 Компоненты Dashboard:

#### 3.1 Dashboard Header:
```typescript
// Импорты
const CurrentStreak = dynamic(() => import('@/components/ui/current-streak'), {
  loading: () => <LoadingSpinner />,
});
import UserXp from '@/components/ui/user-xp';
```

#### 3.2 Current Streak (`src/components/ui/current-streak.tsx`):
- **Источник:** `getUserDailyStats()` → таблица `Streaks`
- **Данные:** `currentstreakCount`, `longestStreak`, `streakStart/End`
- **UI:** Flame иконка + hover card с деталями

#### 3.3 User XP (`src/components/ui/user-xp.tsx`):
- **Источник:** `getUserXp()` → поле `Users.userXp`
- **Отображение:** Lightning bolt + XP число

#### 3.4 Next Question Bento Box:
- **Источник:** `getLastLesson()` + `getUserDailyStats()`
- **Прогресс:** Показывает "Урок X из Y" с progress bar
- **Логика:** Определяет следующий урок для изучения

### 📊 Используемые таблицы:
- ✅ **Users** - `userXp`, `weeklyUserXp`, `correctDailyStreak`
- ✅ **Streaks** - `currentstreakCount`, `longestStreak`, `streakStart/End`
- ✅ **Answers** - для расчета прогресса уроков
- ✅ **Questions + QuestionTags + Tag** - для навигации

### ✅ Статус: **ЧАСТИЧНО ФУНКЦИОНАЛЕН** (использует отдельную логику)

---

## 4. LEO AI ИНТЕГРАЦИЯ С ПРОГРЕССОМ

### 📍 Местоположение:
- **Контекст:** `src/hooks/use-leo-context.ts`
- **Chat:** `src/components/leo-ai/leo-chat.tsx`
- **История:** `src/actions/leo/get-leo-chats.ts`, `save-leo-chat.ts`

### 🔧 Текущая интеграция:
- **URL-based контекст:** Leo знает текущую страницу
- **Системный промпт:** Включает информацию о местоположении
- **Проактивные сообщения:** Через answer-hints.tsx и question-navigation.tsx

### ❌ Ограничения:
- **НЕ знает прогресс пользователя:** Нет доступа к данным БД
- **НЕ знает завершенные уровни:** Только контекст страницы
- **НЕ знает streak или XP:** Ограниченная персонализация

### 🔄 **TODO:** Интеграция данных прогресса в Leo контекст

---

## 5. ДУБЛИРОВАНИЕ И ПРОБЛЕМЫ

### 🔄 Критические проблемы дублирования:

#### 5.1 Расчет прогресса:
- **GlobalProgressIndicator:** Реальные данные через API `/api/progress/global`
- **Sidebar:** Хардкодные значения (заглушка)
- **Dashboard:** Собственные запросы через `getLastLesson()`

#### 5.2 Источники данных:
- **3 разных подхода** к получению прогресса
- **Нет централизации:** Каждый компонент делает свои запросы
- **Разные алгоритмы:** Различная логика определения завершения

#### 5.3 API endpoints:
```
✅ /api/progress/global    - для GlobalProgressIndicator
❌ /api/progress/sidebar   - ОТСУТСТВУЕТ
❌ /api/progress/dashboard - ОТСУТСТВУЕТ  
❌ /api/progress/unified   - ОТСУТСТВУЕТ
```

---

## 6. ИСПОЛЬЗУЕМЫЕ ТАБЛИЦЫ SUPABASE

### ⭐ Основные таблицы прогресса:

```sql
-- Метрики пользователя
Users {
  userXp: Int @default(0)                    -- Общие очки опыта
  weeklyUserXp: Int @default(0)              -- Недельные очки  
  correctDailyStreak: Int @default(0)        -- Текущая серия
  totalDailyStreak: Int @default(0)          -- Общая серия
}

-- Ответы на вопросы
Answers {
  correctAnswer: Boolean @default(false)     -- Правильность ответа
  timeTaken: Int?                           -- Время выполнения
  questionUid: String                       -- Связь с вопросом
  userUid: String                          -- Связь с пользователем
}

-- Детальная информация о сериях
Streaks {
  currentstreakCount: Int @default(0)       -- Текущая серия
  longestStreak: Int @default(0)           -- Самая длинная серия
  streakStart: DateTime?                   -- Начало серии
  streakEnd: DateTime?                     -- Конец серии
}

-- Система уровней
Tag {
  name: String                             -- "level-1", "level-2", etc.
}
QuestionTags {                            -- Связь многие-ко-многим
  questionId: String
  tagId: String
}
Questions {
  questionType: QuestionType              -- VIDEO, MULTIPLE_CHOICE
}
```

### 📊 Вспомогательные таблицы:
- **StudyPath + UserStudyPath** - курсы и прогресс по ним
- **StatisticsReport** - отчеты по статистике  
- **UserLeoChats** - история чатов с Leo
- **UserBookmarks** - закладки пользователя

---

## 7. ДИАГРАММА ВЗАИМОСВЯЗЕЙ

```mermaid
graph TB
    %% Основные узлы данных
    User[Users Table<br/>userXp, weeklyUserXp<br/>correctDailyStreak]
    Answers[Answers Table<br/>correctAnswer<br/>questionUid, userUid]
    Questions[Questions Table<br/>questionType<br/>VIDEO, MULTIPLE_CHOICE]
    Tags[Tag Table<br/>level-1, level-2, etc.]
    Streaks[Streaks Table<br/>currentstreakCount<br/>longestStreak]
    
    %% Связующие таблицы
    QTags[QuestionTags<br/>связь многие-ко-многим]
    
    %% Системы прогресса
    GlobalProgress[🟢 Global Progress Indicator<br/>ПОЛНОСТЬЮ ФУНКЦИОНАЛЕН]
    SidebarProgress[🟡 Sidebar Progress<br/>ЗАГЛУШКА]
    DashboardProgress[🟠 Dashboard Progress<br/>ЧАСТИЧНО ФУНКЦИОНАЛЕН]
    
    %% API и логика
    GlobalAPI[/api/progress/global]
    GlobalLogic[get-global-progress.ts]
    
    %% UI компоненты
    CurrentStreakUI[Current Streak UI]
    UserXpUI[User XP UI]
    LevelProgressUI[Level Progress UI]
    
    %% AI система
    LeoContext[Leo AI Context<br/>ОГРАНИЧЕННЫЙ]
    
    %% Соединения данных
    User --> |userXp, streak| DashboardProgress
    User --> |userXp, weeklyXp| GlobalProgress
    Answers --> |correctAnswer| GlobalProgress
    Questions --> |через QuestionTags| Tags
    QTags --> |связывает| Questions
    QTags --> |связывает| Tags
    Tags --> |level-* теги| GlobalLogic
    Streaks --> |streak данные| CurrentStreakUI
    User --> |userXp| UserXpUI
    
    %% API потоки
    GlobalLogic --> GlobalAPI
    GlobalAPI --> GlobalProgress
    
    %% Dashboard связи
    Streaks --> DashboardProgress
    CurrentStreakUI --> DashboardProgress
    UserXpUI --> DashboardProgress
    
    %% Заглушка
    SidebarProgress -.-> |ХАРДКОД| User
    
    %% Leo AI
    LeoContext -.-> |ТОЛЬКО URL| Questions
    
    %% Стили
    classDef functional fill:#28a745,stroke:#1e7e34,stroke-width:2px,color:#fff
    classDef partial fill:#ffc107,stroke:#e0a800,stroke-width:2px,color:#000
    classDef mock fill:#dc3545,stroke:#c82333,stroke-width:2px,color:#fff
    classDef limited fill:#6c757d,stroke:#495057,stroke-width:2px,color:#fff
    
    class GlobalProgress functional
    class DashboardProgress partial
    class SidebarProgress mock
    class LeoContext limited
```

---

## 8. ДЕТАЛЬНЫЙ АНАЛИЗ ПО КОМПОНЕНТАМ

### 8.1 Global Progress Indicator

**Файл:** `src/components/app/navigation/global-progress-indicator.tsx`

**Логика расчета:**
```typescript
// Для каждого уровня
const levelProgress = (answeredInLevel / levelQuestions.length) * 100;
if (levelProgress >= 80) {
  completedLevels++;  // Уровень считается завершенным
}

// Общий прогресс
const overallProgress = totalQuestionsInAllLevels > 0 
  ? Math.round((answeredQuestionsInAllLevels / totalQuestionsInAllLevels) * 100)
  : 0;
```

**Используемые запросы БД:**
1. `prisma.tag.findMany()` - поиск level-* тегов
2. `prisma.questions.findMany()` - вопросы уровня с фильтрацией по премиум
3. `prisma.answers.findMany()` - правильные ответы пользователя

**Кеширование:** React `cache()` wrapper

### 8.2 Sidebar Progress (ЗАГЛУШКА)

**Файл:** `src/components/app/navigation/sidebar-dropdown.tsx` (строки 29-37)

**Проблема:** Хардкодные значения вместо реальных данных
```typescript
return {
  completedLevels: 1,     // ❌ Хардкод
  totalLevels: 5,         // ❌ Хардкод  
  overallProgress: 20,    // ❌ Хардкод
};
```

**TODO:** Интеграция с GlobalProgressIndicator данными

### 8.3 Dashboard Components

**Current Streak:**
- **Источник:** `getUserDailyStats()` → `prisma.streaks.findUnique()`
- **Логика:** Прямой запрос к таблице Streaks
- **UI:** Flame иконка + hover card

**User XP:**
- **Источник:** `getUserXp()` → `Users.userXp`
- **Логика:** Простое отображение значения
- **UI:** Lightning bolt + число

**Next Question Bento:**
- **Источник:** `getLastLesson()` - собственная логика навигации
- **Прогресс:** Вычисляет "Урок X из Y" независимо

---

## 9. РЕКОМЕНДАЦИИ ДЛЯ УНИФИКАЦИИ

### 🎯 Немедленные действия (Задача 8.1.2):

1. **Создать единый API `/api/progress/unified`**
   - Объединить логику get-global-progress.ts
   - Добавить данные для sidebar и dashboard
   - Добавить кеширование на 5 минут

2. **Убрать заглушку в sidebar** (Задача 8.1.4)
   - Заменить getUserLearningProgress на реальные данные
   - Использовать единый источник данных

3. **Создать хук useUnifiedProgress** (Задача 8.1.3)
   - SWR для кеширования
   - Селекторы для разных компонентов
   - Автообновление каждые 30 секунд

### 🔄 Долгосрочные улучшения:

1. **Leo AI интеграция** (Задача 8.1.5)
   - Передача данных прогресса в system prompt
   - Контекстные ответы на основе текущего уровня

2. **Real-time updates**
   - WebSocket или Server-Sent Events
   - Обновление прогресса в реальном времени

3. **Progress Context Provider**
   - React Context для состояния прогресса
   - Избежание duplicate API calls

---

## 10. ЗАКЛЮЧЕНИЕ

### 📊 Текущее состояние:
- **✅ 1 система полностью функциональна** (GlobalProgressIndicator)
- **⚠️ 1 система - заглушка** (Sidebar)  
- **🟠 1 система частично функциональна** (Dashboard)
- **❌ Leo AI не интегрирован** с данными прогресса

### 🎯 Цель унификации:
Создать **единую систему прогресса** которая:
- Использует один источник данных
- Обслуживает все компоненты
- Интегрируется с Leo AI
- Поддерживает кеширование
- Предоставляет real-time updates

### 📋 Готовность к задаче 8.1.2:
Все необходимые данные проанализированы, архитектура понятна, можно приступать к созданию `/api/progress/unified`.

---

**Дата анализа:** $(date)  
**Задача:** 8.1.1 - Анализ существующих систем прогресса  
**Следующий шаг:** Задача 8.1.2 - Создание единого API endpoint 