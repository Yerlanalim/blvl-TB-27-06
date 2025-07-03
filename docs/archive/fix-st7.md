# Fix Stage 7: Анализ систем прогресса и данных BizLevel

## Задача fix-7-1: Анализ взаимосвязей систем прогресса

**Промпт для Cursor:**
```
Проведи глубокий анализ трех систем прогресса в BizLevel:

1. АНАЛИЗ ГЛОБАЛЬНОГО ИНДИКАТОРА ПРОГРЕССА:
   ```bash
   # Найди все файлы связанные с GlobalProgressIndicator
   find src/ -name "*.tsx" -o -name "*.ts" | xargs grep -l "GlobalProgressIndicator\|global-progress"
   
   # Проверь API endpoints для прогресса
   find src/app/api -name "*.ts" | xargs grep -l "progress"
   
   # Найди все использования get-global-progress
   grep -r "get-global-progress\|getGlobalProgress" src/
   ```

2. АНАЛИЗ SIDEBAR ПРОГРЕССА:
   ```bash
   # Найди функции прогресса в sidebar
   grep -r "getUserLearningProgress\|learningProgress" src/
   
   # Проверь все компоненты sidebar
   find src/components/app/navigation -name "*sidebar*" -type f
   ```

3. АНАЛИЗ DASHBOARD ПРОГРЕССА:
   ```bash
   # Найди компоненты streak и XP
   grep -r "CurrentStreak\|UserXp\|dailyStreak\|weeklyXp" src/
   
   # Проверь dashboard компоненты
   find src/components/app/dashboard -name "*.tsx" | xargs grep -l "progress\|streak\|xp"
   ```

4. АНАЛИЗ СВЯЗИ С LEO AI:
   ```bash
   # Найди как Leo получает информацию о прогрессе
   grep -r "leo.*progress\|progress.*leo" src/ -i
   
   # Проверь AI промпты и контекст
   find src/utils/ai -name "*.ts" | xargs grep -l "progress\|level\|streak"
   
   # Найди leo-chat компоненты
   find src/app -path "*leo-chat*" -name "*.tsx"
   ```

5. АНАЛИЗ SUPABASE ТАБЛИЦ:
   ```bash
   # Проверь какие таблицы используются для прогресса
   grep -r "prisma\.\(answers\|questions\|tag\|users\)" src/utils/data/progress/
   
   # Найди все модели связанные с прогрессом
   grep -A 5 -B 5 "userXp\|dailyStreak\|correctAnswer" prisma/schema.prisma
   ```

6. Определи, где еще используются данные прогресса и с чем они связаны.

7. СОЗДАЙ ПОДРОБНЫЙ ОТЧЕТ:
   - Схему зависимостей между тремя системами
   - Какие таблицы использует каждая система
   - Как Leo получает информацию о местоположении пользователя
   - Что показывает каждый прогресс (уровни, XP, streak, проценты)
   - Есть ли дублирование данных или логики
   - Какие API endpoints задействованы

НЕ ВНОСИ ИЗМЕНЕНИЯ В КОД - ТОЛЬКО АНАЛИЗ!
```

**Проверка после выполнения:**
- [ ] Создана полная схема взаимосвязей трех систем прогресса
- [ ] Определены все таблицы Supabase участвующие в прогрессе
- [ ] Выявлена связь Leo AI с системой прогресса
- [ ] Документированы все показатели прогресса (уровни, XP, streak)
- [ ] Найдены точки дублирования логики
- [ ] НЕ внесено изменений в код

---

## Задача fix-7-2: Аудит таблиц Supabase и системы уровней

**Промпт для Cursor:**
```
Проведи полный аудит таблиц Supabase и их роли в системе уровней:

1. АНАЛИЗ ВСЕХ ТАБЛИЦ В SCHEMA:
   ```bash
   # Получи список всех моделей
   grep "^model " prisma/schema.prisma
   
   # Проверь seed данные и их структуру
   find prisma/ -name "*seed*" -type f
   cat prisma/seed-bizlevel-level1.ts | grep -E "(uid|videoId|vimeo)"
   ```

2. ТАБЛИЦЫ СИСТЕМЫ УРОВНЕЙ:
   ```bash
   # Найди все связанное с Questions
   grep -A 10 -B 2 "model Questions" prisma/schema.prisma
   
   # Проверь Tags и их связи
   grep -A 10 -B 2 "model.*Tag" prisma/schema.prisma
   
   # Найди QuestionTags связи
   grep -A 5 -B 2 "QuestionTags\|questionTags" prisma/schema.prisma
   ```

3. АНАЛИЗ ВИДЕО ДАННЫХ VIMEO:
   ```bash
   # Найди где хранятся Vimeo ID
   grep -r "vimeo\|videoId\|codeSnippet.*video" src/
   
   # Проверь компоненты видео плеера
   find src/components -name "*video*" -type f
   grep -r "VerticalVideoPlayer\|VimeoPlayer" src/
   ```

4. АНАЛИЗ РЕСУРСОВ И АРТЕФАКТОВ:
   ```bash
   # Найди QuestionResources модель
   grep -A 10 "model.*QuestionResources\|QuestionResource" prisma/schema.prisma
   
   # Проверь как используются ресурсы
   grep -r "QuestionResources\|questionResources" src/
   
   # Найди PDF ссылки и артефакты
   grep -r "\.pdf\|resource.*url\|bizlevel\.kz" src/
   ```

5. АНАЛИЗ СИСТЕМЫ ОТВЕТОВ И ТЕСТОВ:
   ```bash
   # Проверь модель Answers
   grep -A 10 "model.*Answers\|Answer" prisma/schema.prisma
   
   # Найди QuestionAnswers для MULTIPLE_CHOICE
   grep -A 5 "QuestionAnswers" prisma/schema.prisma
   
   # Проверь как обрабатываются ответы
   grep -r "correctAnswer\|questionAnswers" src/utils/
   ```

6. АНАЛИЗ СВЯЗЕЙ И НАВИГАЦИИ:
   ```bash
   # Проверь previousQuestionSlug и nextQuestionSlug
   grep -r "previousQuestion\|nextQuestion" src/
   
   # Найди логику навигации по уровням
   find src/utils/data/questions -name "*navigation*" -type f
   cat src/utils/data/questions/question-navigation.ts | grep -A 5 -B 5 "level-"
   ```

7. СОЗДАЙ ДЕТАЛЬНЫЙ ОТЧЕТ:
   - Полный список всех таблиц Supabase (с пометками важности)
   - Таблицы участвующие в системе уровней (отметить ⭐)
   - Схему хранения Vimeo данных и их использование
   - Структуру системы ресурсов (PDF, ссылки)
   - Как работает навигация между вопросами
   - Связи между Questions, Tags, Answers, Resources
   - Где и как используется каждая таблица в компонентах

НЕ ВНОСИ ИЗМЕНЕНИЯ В КОД - ТОЛЬКО АНАЛИЗ И ДОКУМЕНТИРОВАНИЕ!
```

**Проверка после выполнения:**
- [ ] Создан полный список всех таблиц Supabase
- [ ] Выделены таблицы системы уровней (⭐ маркировка)
- [ ] Документировано хранение и использование Vimeo данных
- [ ] Описана система ресурсов и артефактов
- [ ] Проанализирована навигация между вопросами
- [ ] Создана схема связей между ключевыми таблицами
- [ ] НЕ внесено изменений в код

---

## Задача fix-7-3: Анализ архитектуры компонентов уровней

**Промпт для Cursor:**
```
Проведи архитектурный анализ компонентов отвечающих за систему уровней:

1. АНАЛИЗ КОМПОНЕНТОВ ВОПРОСОВ:
   ```bash
   # Найди все компоненты для отображения вопросов
   find src/components -name "*question*" -type f
   find src/app -path "*question*" -name "*.tsx"
   
   # Проверь типы вопросов VIDEO vs MULTIPLE_CHOICE
   grep -r "questionType.*VIDEO\|QuestionType.*VIDEO" src/
   grep -r "MULTIPLE_CHOICE" src/
   ```

2. АНАЛИЗ ВИДЕО КОМПОНЕНТОВ:
   ```bash
   # Найди все видео плееры
   find src/components -name "*video*" -type f
   grep -r "@vimeo/player\|VimeoPlayer" src/
   
   # Проверь вертикальный видео плеер
   find src/ -name "*vertical*video*" -type f
   cat src/components/ui/vertical-video-player.tsx | head -20
   ```

3. АНАЛИЗ КОМПОНЕНТОВ НАВИГАЦИИ:
   ```bash
   # Найди навигацию между вопросами
   find src/components/app/navigation -name "*question*" -type f
   grep -r "nextQuestion\|previousQuestion" src/components/
   
   # Проверь continue-journey компонент
   find src/components -name "*continue*" -type f
   ```

4. АНАЛИЗ КАРТЫ УРОВНЕЙ:
   ```bash
   # Найди компоненты roadmaps
   find src/app -path "*roadmaps*" -name "*.tsx"
   find src/components -name "*roadmap*" -o -name "*study-path*" -type f
   
   # Проверь как отображаются уровни
   grep -r "StudyPathCard\|study-path-card" src/
   ```

5. АНАЛИЗ PROGRESS КОМПОНЕНТОВ:
   ```bash
   # Найди все компоненты прогресса
   find src/components -name "*progress*" -type f
   grep -r "LevelProgress\|level-progress" src/
   
   # Проверь индикаторы завершения
   grep -r "completed\|percentage\|confetti" src/components/
   ```

6. АНАЛИЗ HOOKS И UTILITIES:
   ```bash
   # Найди хуки связанные с уровнями
   find src/hooks -name "*.ts" | xargs grep -l "level\|progress\|question"
   
   # Проверь утилиты для бизнес уроков
   find src/utils -name "*business*" -o -name "*lesson*" -type f
   cat src/utils/business-lesson-helpers.ts
   ```

7. СОЗДАЙ АРХИТЕКТУРНУЮ СХЕМУ:
   - Иерархию компонентов от /roadmaps до отдельного вопроса
   - Маршруты и их связи (roadmaps → level → question)
   - Компоненты для разных типов вопросов (VIDEO, MULTIPLE_CHOICE)
   - Система навигации и прогресса
   - Hooks и utilities поддерживающие уровни
   - Точки интеграции с Supabase
   - Потоки данных от БД до UI

НЕ ВНОСИ ИЗМЕНЕНИЯ В КОД - ТОЛЬКО АНАЛИЗ АРХИТЕКТУРЫ!
```

**Проверка после выполнения:**
- [ ] Создана иерархическая схема компонентов уровней
- [ ] Документированы маршруты и их взаимосвязи
- [ ] Проанализированы компоненты для разных типов вопросов
- [ ] Описана система навигации и прогресса
- [ ] Выявлены supporting hooks и utilities
- [ ] Определены точки интеграции с базой данных
- [ ] Создана схема потоков данных
- [ ] НЕ внесено изменений в код
