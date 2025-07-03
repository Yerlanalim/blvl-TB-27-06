-- 20250703153000_add_videoid_to_questions.sql
-- Добавляет колонку videoId и копирует данные из codeSnippet для VIDEO вопросов
-- Task: Stage-8 8.3.3 (2025-07-03)

-- 1. Добавляем колонку videoId
ALTER TABLE "Questions"
ADD COLUMN IF NOT EXISTS "videoId" TEXT;

-- 2. Копируем значение из codeSnippet, но только для VIDEO вопросов
UPDATE "Questions"
SET "videoId" = "codeSnippet"
WHERE "questionType" = 'VIDEO'
  AND "videoId" IS NULL;

-- 3. Помечаем колонку codeSnippet как deprecated (оставляем для CODING_CHALLENGE)
COMMENT ON COLUMN "Questions"."codeSnippet" IS 'DEPRECATED: Use videoId for VIDEO questions. Retained for coding challenges.'; 