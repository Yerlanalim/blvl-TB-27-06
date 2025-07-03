-- adds performance indexes and view for user level progress (Task 8.3.5)

-- 1. Indexes for frequent queries
CREATE INDEX IF NOT EXISTS idx_answers_user_question
  ON "Answers" ("userUid", "questionUid");

CREATE INDEX IF NOT EXISTS idx_question_tags_tag
  ON "QuestionTags" ("tagId");

CREATE INDEX IF NOT EXISTS idx_questions_slug
  ON "Questions" ("slug");

-- partial index for level tags pattern
CREATE INDEX IF NOT EXISTS idx_tags_name_level_pattern
  ON "Tag" ("name")
  WHERE "name" LIKE 'level-%';

-- 2. View aggregating user progress per level
CREATE OR REPLACE VIEW user_level_progress AS
SELECT 
  u."uid"            AS user_id,
  t."name"           AS level_tag,
  COUNT(DISTINCT q."uid")                                           AS total_questions,
  COUNT(DISTINCT CASE WHEN a."correctAnswer" THEN q."uid" END)    AS completed_questions,
  ROUND(
    COUNT(DISTINCT CASE WHEN a."correctAnswer" THEN q."uid" END)::numeric
    / NULLIF(COUNT(DISTINCT q."uid"),0) * 100, 2
  )                                                                  AS progress_percent
FROM "Users" u
CROSS JOIN "Tag" t
LEFT JOIN "QuestionTags" qt ON t."uid" = qt."tagId"
LEFT JOIN "Questions" q      ON qt."questionId" = q."uid"
LEFT JOIN "Answers" a        ON q."uid" = a."questionUid" AND u."uid" = a."userUid"
WHERE t."name" LIKE 'level-%'
GROUP BY u."uid", t."name"; 