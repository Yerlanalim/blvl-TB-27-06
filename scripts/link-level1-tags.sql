-- Связывание тегов с вопросами level-1
-- BIZLEVEL: Скрипт для добавления связей между вопросами и тегами

-- Получить ID тегов
WITH tag_ids AS (
  SELECT 
    uid as tag_uid,
    name as tag_name
  FROM "Tag" 
  WHERE name IN ('level-1', 'business-basics', 'goal-setting', 'video-lesson', 'test')
)

-- Связать вопросы с тегами
INSERT INTO "QuestionTags" ("questionId", "tagId")
SELECT DISTINCT q.uid as "questionId", t.tag_uid as "tagId"
FROM "Questions" q
CROSS JOIN tag_ids t
WHERE 
  -- Все вопросы получают тег level-1
  (q.slug IN ('welcome-to-business', 'business-model-intro', 'business-models-test-1', 
              'smart-goals-video', 'smart-goals-test', 'target-audience-video', 'level-1-final-test')
   AND t.tag_name = 'level-1')
  
  -- Вопросы по основам бизнеса
  OR (q.slug IN ('welcome-to-business', 'business-model-intro', 'business-models-test-1', 
                 'target-audience-video', 'level-1-final-test')
      AND t.tag_name = 'business-basics')
  
  -- Вопросы по целеполаганию
  OR (q.slug IN ('smart-goals-video', 'smart-goals-test')
      AND t.tag_name = 'goal-setting')
  
  -- Видео уроки
  OR (q.slug IN ('business-model-intro', 'smart-goals-video', 'target-audience-video')
      AND t.tag_name = 'video-lesson')
  
  -- Тесты
  OR (q.slug IN ('business-models-test-1', 'smart-goals-test', 'level-1-final-test')
      AND t.tag_name = 'test')

-- Избегаем дублирования
ON CONFLICT ("questionId", "tagId") DO NOTHING;

-- Проверим результат
SELECT 
  q.slug,
  q.title,
  q."questionType",
  array_agg(t.name ORDER BY t.name) as tags
FROM "Questions" q
LEFT JOIN "QuestionTags" qt ON q.uid = qt."questionId"
LEFT JOIN "Tag" t ON qt."tagId" = t.uid
WHERE q.slug IN ('welcome-to-business', 'business-model-intro', 'business-models-test-1', 
                 'smart-goals-video', 'smart-goals-test', 'target-audience-video', 'level-1-final-test')
GROUP BY q.uid, q.slug, q.title, q."questionType"
ORDER BY q."createdAt"; 