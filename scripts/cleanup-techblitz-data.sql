-- Скрипт очистки данных TechBlitz для подготовки к BizLevel
-- Выполнить ТОЛЬКО после создания бэкапа!

-- 1. Очистка технических вопросов
DELETE FROM "Questions" 
WHERE difficulty IN ('EASY', 'MEDIUM', 'HARD')
  AND slug NOT LIKE 'welcome-%'
  AND slug NOT LIKE 'business-%'
  AND slug NOT LIKE 'smart-%'
  AND slug NOT LIKE 'target-%'
  AND slug NOT LIKE 'level-1-%';

-- 2. Очистка технических тегов и связей
DELETE FROM "QuestionTags" 
WHERE "tagId" IN (
  SELECT uid FROM "Tag" 
  WHERE name IN ('javascript', 'react', 'python', 'coding', 'programming', 'frontend', 'backend', 'nodejs', 'typescript')
);

DELETE FROM "Tag"
WHERE name IN ('javascript', 'react', 'python', 'coding', 'programming', 'frontend', 'backend', 'nodejs', 'typescript');

-- 3. Очистка старых ответов на технические вопросы
DELETE FROM "QuestionAnswers"
WHERE "questionUid" NOT IN (
  SELECT uid FROM "Questions"
  WHERE EXISTS (
    SELECT 1 FROM "QuestionTags" qt 
    JOIN "Tag" t ON qt."tagId" = t.uid 
    WHERE qt."questionId" = "Questions".uid AND t.name = 'level-1'
  )
);

-- 4. Очистка пользовательских ответов на старые вопросы
DELETE FROM "Answers"
WHERE "questionUid" NOT IN (
  SELECT uid FROM "Questions"
  WHERE EXISTS (
    SELECT 1 FROM "QuestionTags" qt 
    JOIN "Tag" t ON qt."tagId" = t.uid 
    WHERE qt."questionId" = "Questions".uid AND t.name = 'level-1'
  )
);

-- 5. Очистка закладок на старые вопросы
DELETE FROM "UserBookmarks"
WHERE "questionId" NOT IN (
  SELECT uid FROM "Questions"
  WHERE EXISTS (
    SELECT 1 FROM "QuestionTags" qt 
    JOIN "Tag" t ON qt."tagId" = t.uid 
    WHERE qt."questionId" = "Questions".uid AND t.name = 'level-1'
  )
);

-- 6. НЕ ТРОГАЕМ:
-- Users (аккаунты пользователей)
-- Subscriptions (подписки)  
-- Основные системные таблицы

-- 7. Сброс прогресса пользователей (опционально)
-- UPDATE "Users" SET 
--   correctDailyStreak = 0,
--   totalDailyStreak = 0,
--   userXp = 0,
--   weeklyUserXp = 0
-- WHERE uid IS NOT NULL;

-- Проверка результатов
SELECT 
  'Questions' as table_name,
  COUNT(*) as remaining_count
FROM "Questions"
UNION ALL
SELECT 
  'QuestionAnswers',
  COUNT(*)
FROM "QuestionAnswers"
UNION ALL
SELECT 
  'Tag',
  COUNT(*)
FROM "Tag"
UNION ALL
SELECT 
  'QuestionTags',
  COUNT(*)
FROM "QuestionTags";

-- Показать оставшиеся вопросы
SELECT 
  q.slug,
  q.title,
  q."questionType",
  STRING_AGG(t.name, ', ') as tags
FROM "Questions" q
LEFT JOIN "QuestionTags" qt ON q.uid = qt."questionId"
LEFT JOIN "Tag" t ON qt."tagId" = t.uid
GROUP BY q.uid, q.slug, q.title, q."questionType"
ORDER BY q."createdAt"; 