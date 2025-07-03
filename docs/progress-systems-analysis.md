# Анализ систем прогресса BizLevel - Задача 8.1.1

## Обзор

Проведен полный анализ всех систем прогресса в проекте BizLevel для выполнения задачи 8.1.1. Найдены **3 основные системы** прогресса, каждая с собственной логикой и источниками данных.

---

## 🎯 СИСТЕМА 1: ГЛОБАЛЬНЫЙ ИНДИКАТОР ПРОГРЕССА

### Компоненты и файлы:
- **`src/components/app/navigation/global-progress-indicator.tsx`** - основной компонент (184 строки)
- **`src/app/api/progress/global/route.ts`** - API endpoint (28 строк)
- **`src/utils/data/progress/get-global-progress.ts`** - логика расчета (183 строки)

### Статус: ✅ ПОЛНОСТЬЮ ФУНКЦИОНАЛЬНЫЙ

### Данные и интерфейс:
```typescript
interface GlobalProgressData {
  completedLevels: number;        // Завершенные уровни
  totalLevels: number;           // Общее количество уровней
  overallProgress: number;       // Общий прогресс 0-100%
  currentLevelProgress?: number; // Прогресс текущего уровня
  userXp: number;               // Очки опыта пользователя
  weeklyXp: number;             // Недельные очки
  currentLevelName?: string;    // Название текущего уровня
  totalCompletedQuestions: number; // Всего пройденных вопросов
  totalQuestions: number;       // Всего вопросов
}
```

### Логика расчета:
1. **Анализ по тегам**: Ищет теги с префиксом `level-` в таблице `Tag`
2. **Расчет прогресса**: 
   - Для каждого уровня находит вопросы через связь `QuestionTags`
   - Считает правильные ответы из таблицы `Answers` (correctAnswer = true)
   - Уровень считается завершенным при 80%+ правильных ответов
3. **Отображение**: Адаптивный UI (desktop/mobile версии)
4. **Интеграция**: Подключен в `providers.tsx` под header

### Используемые таблицы БД:
- ✅ `Tag` - для поиска уровневых тегов (level-1, level-2, etc.)
- ✅ `Questions` - получение вопросов уровня
- ✅ `QuestionTags` - связь вопросов с тегами (многие-ко-многим)
- ✅ `Answers` - правильные ответы пользователя (correctAnswer = true)
- ✅ `Users` - данные пользователя (userXp, weeklyUserXp)

### Где отображается:
- **Все страницы приложения** - глобальный header под навигацией
- **Desktop версия**: компактная строка с прогрессом, XP и уровнями
- **Mobile версия**: ультракомпактная версия с минимальным UI

---

## ⚠️ СИСТЕМА 2: SIDEBAR ПРОГРЕСС (ЗАГЛУШКА)

### Компоненты и файлы:
- **`src/components/app/navigation/sidebar-dropdown.tsx`** - основной dropdown (150 строк)
- **`src/components/app/navigation/level-progress.tsx`** - детальный прогресс уровня
- **`src/components/app/navigation/question-navigation.tsx`** - навигация с прогрессом

### Статус: ⚠️ ЗАГЛУШКА - ТРЕБУЕТ ИНТЕГРАЦИИ

### Критическая проблема - строка 29:
```typescript
// BIZLEVEL: Заглушка для общего прогресса обучения
// TODO: Интегрировать с реальными данными пользователя
function getUserLearningProgress(user: UserRecord | null) {
  if (!user) return { completedLevels: 0, totalLevels: 5, overallProgress: 0 };
  
  // Временная заглушка - в будущем получать из БД
  return {
    completedLevels: 1,     // ❌ Хардкод
    totalLevels: 5,         // ❌ Хардкод
    overallProgress: 20,    // ❌ Хардкод
  };
}
```

### Функциональность:
- **Dropdown профиля** - показывает прогресс в выпадающем меню
- **Progress bar** - визуальная полоса прогресса
- **Уровни и достижения** - отображение завершенных уровней
- **Интеграция с навигацией** - ссылки на достижения и настройки

### Используемые таблицы БД:
- ❌ **НЕТ** - использует только хардкод значения
- 🔄 **TODO** - интеграция с реальной системой прогресса

### Где отображается:
- **Sidebar dropdown** - выпадающее меню профиля пользователя
- **Левая панель** - постоянно видимый прогресс в навигации

---

## 📊 СИСТЕМА 3: DASHBOARD ПРОГРЕСС

### Компоненты и файлы:
- **`src/components/app/dashboard/dashboard-header.tsx`** - header с метриками (25 строк)
- **`src/components/app/dashboard/next-question-bento-box.tsx`** - следующий урок (116 строк)
- **`src/components/app/dashboard/progression-bento-box.tsx`** - общий прогресс (109 строк)
- **`src/components/ui/current-streak.tsx`** - компонент серии (93 строки)
- **`src/components/ui/user-xp.tsx`** - компонент XP (27 строк)

### Статус: 🔄 ЧАСТИЧНО ФУНКЦИОНАЛЬНЫЙ

### Показатели Dashboard:
1. **CurrentStreak** - ежедневная серия (иконка огня)
2. **UserXp** - очки опыта пользователя (иконка молнии)
3. **Next Question** - следующий урок с прогрессом
4. **Progression Box** - общий прогресс обучения

### Отдельные функции получения данных:
- **`src/utils/data/user/authed/get-daily-streak.ts`** - получение streak данных
- **`src/utils/data/user/authed/get-user-xp.ts`** - получение XP пользователя
- **`src/actions/user/get-last-lesson.ts`** - логика следующего урока (189 строк)

### Используемые таблицы БД:
- ✅ `Users` - userXp, weeklyUserXp, correctDailyStreak, totalDailyStreak
- ✅ `Streaks` - currentstreakCount, longestStreak, streakStart/End
- ✅ `Answers` - для расчета прогресса уроков
- ✅ `Questions` + `QuestionTags` - для навигации по урокам

### Где отображается:
- **Dashboard header** - CurrentStreak и UserXp в правом углу
- **Bento grid** - карточки с различными метриками прогресса
- **Next lesson card** - следующий урок с прогрессом

---

## 🤖 СИСТЕМА 4: LEO AI КОНТЕКСТ

### Компоненты и файлы:
- **`src/hooks/use-leo-context.ts`** - определение контекста страницы (80 строк)
- **`src/actions/ai/leo/leo-chat.ts`** - генерация ответов Leo
- **`src/utils/data/leo-chats/get-leo-chats.ts`** - получение истории чатов
- **`src/utils/data/leo-chats/save-leo-chat.ts`** - сохранение чатов

### Статус: 🔄 ОГРАНИЧЕННАЯ ИНТЕГРАЦИЯ

### Как Leo получает контекст:
```typescript
// Пример контекста для Leo
if (pathname.startsWith('/question/')) {
  context = `Пользователь изучает урок: ${questionSlug}. Это может быть видео-урок или тест по бизнесу.`;
} else if (pathname === '/dashboard') {
  context = 'Пользователь на главной странице (dashboard). Он видит свой общий прогресс обучения.';
}
```

### Ограничения текущей интеграции:
- ❌ **НЕТ доступа к данным прогресса** - Leo не знает сколько уровней завершено
- ❌ **НЕТ информации о XP и streak** - Leo не видит достижения пользователя
- ❌ **Только URL-based контекст** - определяется только по адресу страницы
- ✅ **Сохранение в БД** - история чатов сохраняется в `UserLeoChats`

### Используемые таблицы БД:
- ✅ `UserLeoChats` - история чатов с Leo
- ❌ **НЕТ связи с прогрессом** - Leo не обращается к Answers, Streaks, etc.

---

## 📋 ТАБЛИЦЫ SUPABASE ДЛЯ ПРОГРЕССА

### ⭐ Ключевые таблицы системы прогресса:

#### **Users** - основные метрики пользователя:
```sql
userXp: Int @default(0)                    -- Общие очки опыта
weeklyUserXp: Int @default(0)              -- Недельные очки
correctDailyStreak: Int @default(0)        -- Текущая серия
totalDailyStreak: Int @default(0)          -- Общая серия
```

#### **Answers** - ответы на вопросы:
```sql
correctAnswer: Boolean @default(false)     -- Правильность ответа
timeTaken: Int?                           -- Время выполнения
questionUid: String                       -- Связь с вопросом
userUid: String                          -- Связь с пользователем
```

#### **Streaks** - детальная информация о сериях:
```sql
currentstreakCount: Int @default(0)       -- Текущая серия
longestStreak: Int @default(0)           -- Самая длинная серия
streakStart: DateTime?                   -- Начало серии
streakEnd: DateTime?                     -- Конец серии
```

#### **Questions + QuestionTags + Tag** - система уровней:
```sql
Tag.name: String                         -- "level-1", "level-2", etc.
QuestionTags                            -- Связь многие-ко-многим
Questions.questionType                  -- VIDEO, MULTIPLE_CHOICE
```

### 📊 Вспомогательные таблицы:
- **StudyPath + UserStudyPath** - курсы и прогресс по ним
- **StatisticsReport** - отчеты по статистике
- **UserLeoChats** - история чатов с Leo
- **UserBookmarks** - закладки пользователя

---

## 🔍 АНАЛИЗ ДУБЛИРОВАНИЯ

### Проблемы дублирования:

#### 1. **Множественные запросы к БД**:
- GlobalProgressIndicator делает свои запросы к Tag, Questions, Answers
- Dashboard компоненты делают отдельные запросы к Users, Streaks
- Sidebar заглушка не делает запросы вообще

#### 2. **Разные алгоритмы расчета**:
- GlobalProgress: анализ по тегам level-*, 80% для завершения уровня
- Dashboard: отдельные функции для streak, XP, следующего урока
- Sidebar: хардкод значений

#### 3. **Отсутствие единого API**:
- Есть только `/api/progress/global` для одной системы
- Dashboard компоненты используют отдельные функции
- Нет унифицированного endpoint для всех метрик

#### 4. **Разные интерфейсы данных**:
- GlobalProgressData (9 полей)
- Sidebar использует свой интерфейс (3 поля)
- Dashboard компоненты используют разные типы

---

## 🎯 СХЕМА ВЗАИМОСВЯЗЕЙ

```mermaid
graph TB
    User[Users Table] --> |userXp, weeklyXp| DashboardHeader[Dashboard Header]
    User --> |correctDailyStreak| DashboardHeader
    User --> |userUid| Answers[Answers Table]
    
    Questions[Questions Table] --> |questionUid| Answers
    Questions --> |tags| QTags[QuestionTags]
    QTags --> |tagId| Tags[Tag Table]
    
    Tags --> |level-* tags| GlobalAPI[/api/progress/global]
    Answers --> |correctAnswer = true| GlobalAPI
    GlobalAPI --> |HTTP request| GlobalIndicator[Global Progress Indicator]
    
    User --> |userUid| Streaks[Streaks Table]
    Streaks --> |currentstreakCount| CurrentStreak[Current Streak Component]
    Streaks --> |longestStreak| CurrentStreak
    
    User --> |userXp| UserXpComponent[User XP Component]
    
    Answers --> |last answers| GetLastLesson[getLastLesson function]
    GetLastLesson --> |next lesson| NextQuestionBox[Next Question Bento Box]
    
    SidebarDropdown[Sidebar Dropdown] -.-> |HARDCODED STUB| StubData["{completedLevels: 1, totalLevels: 5, overallProgress: 20}"]
    
    LeoContext[Leo Context Hook] --> |URL pathname| LeoSystemPrompt[Leo System Prompt]
    LeoSystemPrompt --> |context only| LeoAI[Leo AI Chat]
    LeoAI --> |save history| LeoChats[UserLeoChats Table]
    
    %% Styling
    classDef functional fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    classDef stub fill:#fff3e0,stroke:#f57c00,stroke-width:2px,stroke-dasharray: 5 5
    classDef partial fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef limited fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    
    class GlobalIndicator,GlobalAPI,CurrentStreak,UserXpComponent,NextQuestionBox functional
    class SidebarDropdown,StubData stub
    class DashboardHeader,GetLastLesson partial
    class LeoContext,LeoAI limited
```

---

## 📝 ВЫВОДЫ И РЕКОМЕНДАЦИИ

### Найденные системы прогресса:

1. **✅ Глобальный индикатор** - полностью функциональный, реальные данные БД
2. **⚠️ Sidebar прогресс** - заглушка с хардкод значениями (КРИТИЧЕСКАЯ ПРОБЛЕМА)
3. **🔄 Dashboard прогресс** - частично функциональный, разрозненные компоненты
4. **🔄 Leo AI контекст** - ограниченная интеграция, только URL-based контекст

### Критические проблемы:
- **Sidebar dropdown** содержит заглушку на строке 29 (getUserLearningProgress)
- **Нет единого API** для всех метрик прогресса
- **Дублирование запросов** к БД в разных компонентах
- **Leo AI не знает** о прогрессе пользователя

### Для задач 8.1.2-8.1.5:
- Создать единый API `/api/progress/unified`
- Создать хук `useUnifiedProgress` для всех компонентов
- Заменить заглушку в sidebar на реальные данные
- Интегрировать прогресс в Leo AI контекст

### Готовность к унификации:
- **База данных** - все необходимые таблицы существуют
- **Логика расчета** - алгоритмы уже написаны в GlobalProgress
- **UI компоненты** - готовы к интеграции нового хука
- **TypeScript типы** - интерфейсы определены

---

## 🏁 ЗАКЛЮЧЕНИЕ

Анализ выявил **3 основные системы прогресса** с различным уровнем функциональности. Основная проблема - отсутствие унификации и наличие заглушки в критическом компоненте (sidebar). Все данные для унификации доступны в БД, необходимо создать единый API endpoint и хук для замены всех существующих систем.

**Задача 8.1.1 выполнена** - создана полная карта всех систем прогресса с документацией компонентов, источников данных, таблиц БД и диаграммой связей.