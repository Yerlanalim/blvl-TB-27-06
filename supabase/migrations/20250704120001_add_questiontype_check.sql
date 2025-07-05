-- Restrict Questions.questionType to business-only types and archive coding challenges
BEGIN;

-- Create legacy table for coding challenge questions if not exists
CREATE TABLE IF NOT EXISTS "LegacyCodingQuestions" (LIKE "Questions" INCLUDING ALL);

-- Move existing coding challenge rows
INSERT INTO "LegacyCodingQuestions" SELECT * FROM "Questions" WHERE "questionType" = 'CODING_CHALLENGE';
DELETE FROM "Questions" WHERE "questionType" = 'CODING_CHALLENGE';

-- Add check constraint on main Questions table (ignore if already exists)
DO $$
BEGIN
    ALTER TABLE "Questions" ADD CONSTRAINT question_type_core CHECK ("questionType" IN ('VIDEO','MULTIPLE_CHOICE'));
EXCEPTION WHEN duplicate_object THEN NULL;
END$$;

-- Mark deprecated columns for clarity
COMMENT ON COLUMN "Questions"."codeSnippet" IS 'deprecated – retained only for legacy compatibility';
COMMENT ON COLUMN "Questions"."functionName" IS 'deprecated – retained only for legacy compatibility';
COMMENT ON COLUMN "LegacyCodingQuestions"."codeSnippet" IS 'deprecated';
COMMENT ON COLUMN "LegacyCodingQuestions"."functionName" IS 'deprecated';

COMMIT; 