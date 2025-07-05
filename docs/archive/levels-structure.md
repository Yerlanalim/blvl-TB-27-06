# Структура уровней BizLevel

## 1. Создание уровня через теги
- Каждый уровень обозначается тегом `level-X`, где **X** — порядковый номер (1, 2, 3…).
- Теги хранятся в таблице `Tag`, связь вопрос ↔ уровень осуществляется через таблицу `QuestionTags`.
- Для добавления нового уровня достаточно создать тег и связать его со всеми вопросами уровня.

```sql
-- Создание тега уровня
INSERT INTO "Tag" (name) VALUES ('level-2');
```

## 2. Стандартная структура вопросов уровня
1. Приветствие (MULTIPLE_CHOICE)
2. 1-N блоков «Видео → Тест»
   - VIDEO-вопрос — поле `videoId` (Vimeo ID)
   - MULTIPLE_CHOICE-тест проверяет материал видео
3. Итоговый тест (MULTIPLE_CHOICE)

Минимум: **1 видео** и **1 тест** на уровень.

## 3. Навигация между уроками
- Поля `previousQuestionSlug` и `nextQuestionSlug` образуют цепочку.
- Первый вопрос: `previousQuestionSlug = NULL`.
- Последний вопрос: `nextQuestionSlug = NULL`.
- В seed-скриптах навигация формируется автоматически на основании порядка массива.

```typescript
nextQuestionSlug: nextQuestion?.slug,
previousQuestionSlug: prevQuestion?.slug
```

## 4. Видео-уроки и Vimeo
- Видео размещаются на **Vimeo**; сохраняем только числовой `videoId`.
- `videoId` хранится в колонке `videoId` таблицы `Questions`.
- Компонент `VerticalVideoPlayer` подключает `@vimeo/player` и соблюдает правила:
  - Вертикальное соотношение 9:16
  - `playsinline: true`
  - 100 % ширины на мобильных, `max-height: 80vh` на десктопе
- **YouTube не используется.**

## 5. Добавление материалов (PDF, ссылки)
- Таблица `QuestionResources` — поля `questionUid`, `title`, `resource` (URL).
- Для VIDEO-вопросов материалы выводятся компонентом `LessonMaterials` на последнем уроке уровня.

## 6. Пример SQL для создания уровня
```sql
-- 1. Тег уровня
INSERT INTO "Tag" (name) VALUES ('level-2');

-- 2. Пример видео-вопроса
INSERT INTO "Questions" (
  uid, questionType, title, question, videoId,
  slug, previousQuestionSlug, nextQuestionSlug
) VALUES (
  'marketing-basics-video',
  'VIDEO',
  'Урок 1: Основы маркетинга',
  'Посмотрите видео об основных принципах маркетинга',
  '123456789',
  'marketing-basics-video',
  NULL,
  'marketing-basics-test'
);

-- 3. Пример теста
INSERT INTO "Questions" (
  uid, questionType, title, question, correctAnswer,
  slug, previousQuestionSlug, nextQuestionSlug
) VALUES (
  'marketing-basics-test',
  'MULTIPLE_CHOICE',
  'Тест: Основы маркетинга',
  'Что такое ценностное предложение?',
  '0',
  'marketing-basics-test',
  'marketing-basics-video',
  NULL
);

-- 4. Связь вопросов с тегом уровня
INSERT INTO "QuestionTags" (questionId, tagId)
SELECT q.uid, t.uid
FROM "Questions" q, "Tag" t
WHERE q.slug IN ('marketing-basics-video','marketing-basics-test')
  AND t.name = 'level-2';
```

## 7. Шаблон Level-X
```
## Шаблон Level-X

### 1. Создать тег
INSERT INTO "Tag" (name) VALUES ('level-X');

### 2. Создать вопросы
- Приветствие (MULTIPLE_CHOICE)
- Видео-уроки (VIDEO)
- Тесты (MULTIPLE_CHOICE)
- Финальный тест

### 3. Связать с тегами
INSERT INTO "QuestionTags" ...

### 4. Добавить навигацию
Заполните previousQuestionSlug / nextQuestionSlug

### 5. Добавить материалы
INSERT INTO "QuestionResources" ...
```

## 8. Быстрая проверка целостности
Запустите `npm run validate:levels` (скрипт 8.2.3), чтобы убедиться в корректности цепочки и наличии `videoId` у всех VIDEO-вопросов. 