# Этап 8: Унификация прогресса и очистка проекта

## Цели этапа
1. Создать единую систему прогресса для всего приложения
2. Упорядочить систему уровней для простого управления контентом
3. Очистить БД Supabase и кодовую базу от legacy элементов

---

## Блок 1: Унификация системы прогресса

### Задача 8.1.1: Анализ существующих систем прогресса
**Промпт для Cursor:**
```
Проанализируй все системы прогресса в проекте и создай документ:

1. Найди ВСЕ места где рассчитывается прогресс:
   ```bash
   grep -r "progress\|Progress" src/ --include="*.ts" --include="*.tsx" | grep -E "(calculate|compute|get.*progress)"
   grep -r "completedLevels\|totalLevels\|overallProgress" src/
   grep -r "userXp\|weeklyXp\|streak" src/
   ```

2. Для каждой системы документируй в docs/progress-systems-analysis.md:
   - Компонент/хук/функция
   - Какие данные использует
   - Какие таблицы БД запрашивает
   - Где отображается результат
   - Дублирует ли логику других систем

3. Особое внимание на:
   - src/components/app/navigation/global-progress-indicator.tsx
   - src/components/app/navigation/sidebar-dropdown.tsx (строка 29 - заглушка)
   - src/components/app/dashboard/
   - src/app/api/progress/

4. Создай диаграмму связей в Mermaid формате

РЕЗУЛЬТАТ: Полная карта всех систем прогресса
```

**Проверка после выполнения:**
- [ ] Создан файл docs/progress-systems-analysis.md
- [ ] Найдены все 3+ системы прогресса
- [ ] Задокументирована заглушка в sidebar
- [ ] Создана диаграмма связей

### Задача 8.1.2: Создание единого API endpoint для прогресса
**Промпт для Cursor:**
```
Создай унифицированный API endpoint для всех данных прогресса:

1. Изучи существующий /api/progress/global/route.ts

2. Создай новый endpoint /api/progress/unified/route.ts который возвращает:
   ```typescript
   {
     // Из global progress
     completedLevels: number
     totalLevels: number
     overallProgress: number
     currentLevelProgress: number
     currentLevelName: string
     
     // Для sidebar
     userXp: number
     weeklyXp: number
     currentStreak: number
     
     // Для dashboard
     nextLesson: {
       slug: string
       title: string
       type: 'VIDEO' | 'MULTIPLE_CHOICE'
       levelName: string
     }
     totalCompletedQuestions: number
     totalQuestions: number
     
     // Детали по уровням
     levelDetails: Array<{
       levelNumber: number
       name: string
       completed: boolean
       progress: number
       totalQuestions: number
       completedQuestions: number
     }>
   }
   ```

3. Используй логику из get-global-progress.ts как основу

4. Добавь кеширование на 5 минут для оптимизации

5. НЕ УДАЛЯЙ старый endpoint пока - пометь как deprecated

РЕЗУЛЬТАТ: Единый источник данных для всего прогресса
```

**Проверка после выполнения:**
- [ ] Создан /api/progress/unified/route.ts
- [ ] Endpoint возвращает все необходимые данные
- [ ] Добавлено кеширование
- [ ] Старый endpoint помечен как deprecated

### Задача 8.1.3: Создание единого хука useUnifiedProgress
**Промпт для Cursor:**
```
Создай единый хук для использования прогресса во всех компонентах:

1. Создай файл src/hooks/use-unified-progress.ts

2. Реализуй хук который:
   - Использует SWR для кеширования
   - Вызывает /api/progress/unified
   - Возвращает типизированные данные
   - Поддерживает автообновление каждые 30 секунд
   - Имеет loading и error состояния

3. Добавь селекторы для удобства:
   ```typescript
   const {
     data,
     globalProgress,    // для GlobalProgressIndicator
     sidebarProgress,   // для Sidebar
     dashboardMetrics,  // для Dashboard
     levelDetails,      // для LevelProgress
     isLoading,
     error
   } = useUnifiedProgress()
   ```

4. Создай тесты для хука

5. Добавь JSDoc документацию

РЕЗУЛЬТАТ: Единый хук для всех компонентов прогресса
```

**Проверка после выполнения:**
- [ ] Создан use-unified-progress.ts
- [ ] Хук правильно типизирован
- [ ] Работает кеширование через SWR
- [ ] Добавлены селекторы для удобства

### Задача 8.1.4: Интеграция единого прогресса в компоненты
**Промпт для Cursor:**
```
Замени все системы прогресса на единый хук:

1. В GlobalProgressIndicator:
   - Замени useGlobalProgress на useUnifiedProgress
   - Используй селектор globalProgress
   - Убери дублирующие запросы

2. В sidebar-dropdown.tsx:
   - УДАЛИ заглушку getUserLearningProgress (строка 29)
   - Используй useUnifiedProgress().sidebarProgress
   - Подключи реальные данные вместо хардкода

3. В Dashboard компонентах:
   - Найди все места где запрашивается прогресс
   - Замени на useUnifiedProgress().dashboardMetrics
   - Удали дублирующие API вызовы

4. В LevelProgress:
   - Используй levelDetails из единого хука
   - Убери отдельные расчеты прогресса

5. После каждого изменения проверяй:
   ```bash
   npm run build
   npm run type-check
   ```

РЕЗУЛЬТАТ: Все компоненты используют единый источник прогресса
```

**Проверка после выполнения:**
- [ ] GlobalProgressIndicator работает с новым хуком
- [ ] Sidebar показывает реальные данные (не заглушку)
- [ ] Dashboard использует единые метрики
- [ ] Нет дублирующих API вызовов

### Задача 8.1.5: Интеграция прогресса в Leo AI контекст
**Промпт для Cursor:**
```
Добавь данные прогресса в контекст Leo AI:

1. Найди use-leo-context.ts

2. Интегрируй useUnifiedProgress в контекст:
   - Импортируй хук
   - Добавь данные прогресса в system prompt
   - Включи информацию о текущем уровне и прогрессе

3. Обнови system prompt чтобы включить:
   - На каком уровне находится пользователь
   - Сколько уроков пройдено
   - Какие темы уже изучены
   - Текущий прогресс в процентах

4. Пример контекста для Leo:
   ```
   Пользователь находится на уровне 3 "Маркетинг и продажи".
   Пройдено 2 из 5 уроков этого уровня (40%).
   Общий прогресс: 25% (пройдено 2 уровня из 8).
   Изученные темы: бизнес-модели, SMART-цели, целевая аудитория.
   ```

5. Протестируй что Leo учитывает контекст прогресса

РЕЗУЛЬТАТ: Leo знает о прогрессе пользователя
```

**Проверка после выполнения:**
- [ ] Leo получает данные о прогрессе
- [ ] System prompt обновлен
- [ ] Leo дает контекстные ответы
- [ ] Нет ошибок в чате

---

## Блок 2: Упорядочивание системы уровней

### Задача 8.2.1: Документирование структуры уровней
**Промпт для Cursor:**
```
Создай полную документацию системы уровней:

1. Проанализируй текущую структуру:
   ```bash
   # Найди все уровневые теги
   grep -r "level-[0-9]" src/ supabase/
   
   # Найди seed данные
   find . -name "*seed*" -o -name "*level*" | grep -E "\.(ts|sql)$"
   ```

2. Создай docs/levels-structure.md с разделами:
   - Как создаются уровни (через теги)
   - Структура вопросов уровня
   - Система навигации (nextQuestionSlug)
   - Где хранятся видео (Vimeo ID в codeSnippet)
   - Как добавляются ресурсы
   - Примеры SQL для создания уровня

3. Создай шаблон для нового уровня:
   ```markdown
   ## Шаблон Level-X
   
   ### 1. Создать тег
   INSERT INTO "Tag" (name) VALUES ('level-X');
   
   ### 2. Создать вопросы
   - Приветствие (MULTIPLE_CHOICE)
   - Видео уроки (VIDEO) 
   - Тесты (MULTIPLE_CHOICE)
   - Финальный тест
   
   ### 3. Связать с тегами
   ### 4. Добавить навигацию
   ### 5. Добавить ресурсы
   ```

4. Документируй Vimeo интеграцию для видео

РЕЗУЛЬТАТ: Четкая инструкция по управлению уровнями
```

**Проверка после выполнения:**
- [ ] Создан docs/levels-structure.md
- [ ] Описана полная структура уровня
- [ ] Есть SQL примеры
- [ ] Создан шаблон для новых уровней

### Задача 8.2.2: Создание admin панели для управления уровнями
**Промпт для Cursor:**
```
Создай простую admin панель для просмотра структуры уровней:

1. Создай /app/(app)/admin/levels/page.tsx

2. Реализуй таблицу которая показывает:
   - Все уровни (по тегам level-*)
   - Количество вопросов в каждом
   - Типы вопросов (VIDEO, TEST)
   - Статус (активен/в разработке)
   - Количество пользователей прошедших уровень

3. Для каждого уровня покажи:
   ```
   Level 1: Основы бизнеса
   - Вопросов: 7 (3 видео, 4 теста)
   - Завершили: 145 пользователей
   - Средний прогресс: 78%
   - [Просмотреть вопросы]
   ```

4. Добавь страницу деталей уровня:
   /app/(app)/admin/levels/[levelTag]/page.tsx
   - Список всех вопросов с навигацией
   - Vimeo ID для видео
   - Ресурсы уровня

5. Используй существующие admin компоненты для UI

РЕЗУЛЬТАТ: Admin панель для управления уровнями
```

**Проверка после выполнения:**
- [ ] Создана страница /admin/levels
- [ ] Отображаются все уровни
- [ ] Работает детальный просмотр
- [ ] Видны Vimeo ID и ресурсы

### Задача 8.2.3: Скрипт валидации структуры уровней
**Промпт для Cursor:**
```
Создай скрипт для проверки целостности уровней:

1. Создай scripts/validate-levels.ts который проверяет:
   - Все вопросы уровня имеют правильную навигацию
   - Нет разрывов в цепочке nextQuestionSlug
   - Все VIDEO вопросы имеют Vimeo ID
   - Все уровни имеют приветствие и финальный тест
   - Теги правильно привязаны

2. Проверки должны включать:
   ```typescript
   // Проверка навигации
   - Первый вопрос не имеет previousQuestionSlug
   - Последний не имеет nextQuestionSlug
   - Все промежуточные связаны в цепочку
   
   // Проверка видео
   - VIDEO тип имеет codeSnippet (Vimeo ID)
   - Vimeo ID валидный (только цифры)
   
   // Проверка структуры
   - Минимум 1 видео на уровень
   - Минимум 1 тест на уровень
   ```

3. Вывод отчета:
   ```
   Level-1: ✅ OK (7 questions, navigation valid)
   Level-2: ⚠️ Warning - missing final test
   Level-3: ❌ Error - broken navigation chain
   ```

4. Добавь в package.json: "validate:levels": "tsx scripts/validate-levels.ts"

РЕЗУЛЬТАТ: Автоматическая проверка целостности уровней
```

**Проверка после выполнения:**
- [ ] Создан scripts/validate-levels.ts
- [ ] Скрипт проверяет все аспекты
- [ ] Понятный вывод с emoji статусами
- [ ] Можно запустить через npm run validate:levels

---

## Блок 3: Очистка БД и проекта

### Задача 8.3.1: Анализ использования таблиц БД
**Промпт для Cursor:**
```
Проведи полный анализ использования таблиц Supabase:

1. Создай скрипт scripts/analyze-db-usage.ts который:
   ```bash
   # Ищет использование таблиц в коде
   grep -r "from.*['\"]TableName['\"]" src/ --include="*.ts" --include="*.tsx"
   grep -r "prisma\.tableName" src/
   grep -r "supabase.*from\(" src/
   ```

2. Для КАЖДОЙ таблицы из списка найди:
   - DefaultRoadmapQuestions
   - DefaultRoadmapQuestionsAnswers  
   - RoadmapUserQuestions
   - RoadmapUserQuestionsAnswers
   - RoadmapUserQuestionsUserAnswers
   - UserRoadmaps
   - PseoPages
   - Mission
   - UserMission

3. Создай отчет docs/db-usage-analysis.md:
   ```markdown
   ## Таблица: DefaultRoadmapQuestions
   - Используется: НЕТ
   - Последнее упоминание: отсутствует
   - Связанные таблицы: DefaultRoadmapQuestionsAnswers
   - Вердикт: МОЖНО УДАЛИТЬ
   ```

4. Проверь Prisma schema на использование

5. Проверь API logs если доступны

РЕЗУЛЬТАТ: Полная карта использования таблиц
```

**Проверка после выполнения:**
- [ ] Создан analyze-db-usage.ts
- [ ] Проанализированы ВСЕ таблицы
- [ ] Создан отчет db-usage-analysis.md
- [ ] Четкие вердикты по каждой таблице

### Задача 8.3.2: Безопасная маркировка таблиц для удаления
**Промпт для Cursor:**
```
Пометь неиспользуемые таблицы перед удалением:

1. На основе анализа из 8.3.1 создай SQL миграцию:
   supabase/migrations/mark_deprecated_tables.sql

2. Для каждой неиспользуемой таблицы:
   ```sql
   -- Переименовываем с префиксом _deprecated_
   ALTER TABLE "DefaultRoadmapQuestions" 
   RENAME TO "_deprecated_DefaultRoadmapQuestions";
   
   -- Добавляем комментарий
   COMMENT ON TABLE "_deprecated_DefaultRoadmapQuestions" 
   IS 'Marked for deletion on [DATE]. Legacy roadmap system.';
   ```

3. НЕ ТРОГАЙ таблицы если:
   - Есть хоть одно упоминание в коде
   - Связаны с активными таблицами
   - Есть сомнения в использовании

4. Создай rollback миграцию:
   supabase/migrations/rollback_deprecated_tables.sql

5. Примени миграцию в dev среде и протестируй

РЕЗУЛЬТАТ: Безопасная маркировка таблиц
```

**Проверка после выполнения:**
- [ ] Создана миграция маркировки
- [ ] Создана rollback миграция
- [ ] Протестировано в dev среде
- [ ] Приложение работает без ошибок

### Задача 8.3.3: Очистка legacy полей в Questions
**Промпт для Cursor:**
```
Очисти поля связанные с кодом в таблице Questions:

1. Проанализируй использование полей:
   ```bash
   grep -r "answerFullSnippet\|expectedParams\|testCases" src/
   grep -r "codeSnippet" src/ | grep -v "VIDEO"
   ```

2. Создай миграцию для очистки:
   ```sql
   -- Переименовываем codeSnippet в videoId для VIDEO типов
   ALTER TABLE "Questions" 
   ADD COLUMN "videoId" TEXT;
   
   -- Копируем данные только для VIDEO вопросов
   UPDATE "Questions" 
   SET "videoId" = "codeSnippet"
   WHERE "questionType" = 'VIDEO';
   
   -- Помечаем старые поля как deprecated
   COMMENT ON COLUMN "Questions"."codeSnippet" 
   IS 'DEPRECATED: Use videoId for VIDEO type';
   ```

3. Обнови код:
   - Замени codeSnippet на videoId для VIDEO
   - Обнови типы TypeScript
   - Поправь seed данные

4. НЕ УДАЛЯЙ поля сразу - только пометь deprecated

РЕЗУЛЬТАТ: Чистая структура для бизнес-контента
```

**Проверка после выполнения:**
- [ ] Создано поле videoId
- [ ] Данные мигрированы для VIDEO
- [ ] Код обновлен
- [ ] Старые поля помечены deprecated

### Задача 8.3.4: Удаление неиспользуемых компонентов roadmap
**Промпт для Cursor:**
```
Удали legacy компоненты системы roadmap:

1. Проверь использование компонентов:
   ```bash
   # Из Knip report
   grep -r "roadmap" src/components/ --include="*.tsx"
   find src/components -name "*roadmap*" -type f
   ```

2. Для каждого компонента проверь:
   - Импорты в других файлах
   - Lazy loading
   - Роуты в app/

3. Безопасно удали если не используется:
   - src/components/app/roadmaps/[uid]/
   - src/components/app/roadmaps/create/
   - src/actions/roadmap/
   - src/utils/data/roadmap/

4. После каждого удаления:
   ```bash
   npm run build
   npm run type-check
   ```

5. Документируй в docs/cleanup-log.md

РЕЗУЛЬТАТ: Удалены legacy roadmap компоненты
```

**Проверка после выполнения:**
- [ ] Удалены только неиспользуемые файлы
- [ ] Проект компилируется
- [ ] Нет ошибок в runtime
- [ ] Задокументированы изменения

### Задача 8.3.5: Создание индексов и views для оптимизации
**Промпт для Cursor:**
```
Создай индексы и views для оптимизации БД:

1. Создай миграцию supabase/migrations/add_performance_indexes.sql:
   ```sql
   -- Индексы для частых запросов
   CREATE INDEX idx_answers_user_question 
   ON "Answers"("userUid", "questionUid");
   
   CREATE INDEX idx_question_tags_tag 
   ON "QuestionTags"("tagId");
   
   CREATE INDEX idx_questions_slug 
   ON "Questions"("slug");
   
   CREATE INDEX idx_tags_name_pattern 
   ON "Tag"("name") 
   WHERE "name" LIKE 'level-%';
   ```

2. Создай view для прогресса по уровням:
   ```sql
   CREATE VIEW user_level_progress AS
   SELECT 
     u."uid" as user_id,
     t."name" as level_tag,
     COUNT(DISTINCT q."uid") as total_questions,
     COUNT(DISTINCT CASE WHEN a."correctAnswer" THEN q."uid" END) as completed_questions,
     ROUND(COUNT(DISTINCT CASE WHEN a."correctAnswer" THEN q."uid" END)::numeric / 
           COUNT(DISTINCT q."uid") * 100, 2) as progress_percent
   FROM "Users" u
   CROSS JOIN "Tag" t
   LEFT JOIN "QuestionTags" qt ON t."uid" = qt."tagId"
   LEFT JOIN "Questions" q ON qt."questionId" = q."uid"
   LEFT JOIN "Answers" a ON q."uid" = a."questionUid" AND u."uid" = a."userUid"
   WHERE t."name" LIKE 'level-%'
   GROUP BY u."uid", t."name";
   ```

3. Протестируй производительность:
   - Замерь скорость до индексов
   - Примени миграцию
   - Замерь после

4. Обнови API чтобы использовать view где возможно

РЕЗУЛЬТАТ: Оптимизированные запросы к БД
```

**Проверка после выполнения:**
- [ ] Созданы все индексы
- [ ] Создан view для прогресса
- [ ] Улучшилась производительность
- [ ] API использует оптимизации

### Задача 8.3.6: Финальная очистка и документация
**Промпт для Cursor:**
```
Завершающая очистка и создание документации:

1. Через неделю после маркировки (8.3.2):
   - Проверь логи на ошибки
   - Если ошибок нет - удали _deprecated_ таблицы
   - Создай финальную миграцию удаления

2. Обнови документацию:
   - README.md - актуальная структура БД
   - docs/database-schema.md - все таблицы и связи
   - docs/content-management.md - как управлять уровнями

3. Создай чеклист для добавления нового уровня:
   ```markdown
   ## Чеклист: Добавление Level-X
   - [ ] Создать тег 'level-X' в БД
   - [ ] Создать вопросы с правильными slug
   - [ ] Настроить навигацию (next/previous)
   - [ ] Добавить Vimeo ID для видео
   - [ ] Связать с тегами через QuestionTags
   - [ ] Добавить ресурсы в QuestionResources
   - [ ] Проверить через npm run validate:levels
   ```

4. Финальная проверка:
   ```bash
   npm run build
   npm run test
   npm run validate:levels
   ```

РЕЗУЛЬТАТ: Чистый, документированный проект
```

**Проверка после выполнения:**
- [ ] Удалены deprecated таблицы
- [ ] Обновлена вся документация
- [ ] Создан чеклист для контента
- [ ] Все тесты проходят

---

## Итоговые метрики этапа 8

### Ожидаемые результаты:
- **1 унифицированная система прогресса** (вместо 3)
- **~10-12 таблиц удалено** из БД
- **Четкая документация** по управлению уровнями
- **Admin панель** для просмотра структуры
- **Оптимизация запросов** через индексы и views
- **Leo AI знает** о прогрессе пользователя

### Время выполнения:
- Блок 1 (Прогресс): 3-4 дня
- Блок 2 (Уровни): 2-3 дня
- Блок 3 (Очистка): 4-5 дней
- **Итого: ~10 рабочих дней**

### Риски:
- Удаление нужной таблицы - митигация через префикс _deprecated_
- Поломка прогресса - митигация через постепенную миграцию
- Потеря данных - митигация через бэкапы

### Определение готовности:
- [ ] Все компоненты используют единый прогресс
- [ ] Sidebar показывает реальные данные
- [ ] Admin панель работает
- [ ] БД очищена от legacy
- [ ] Документация актуальна
- [ ] Все тесты проходят