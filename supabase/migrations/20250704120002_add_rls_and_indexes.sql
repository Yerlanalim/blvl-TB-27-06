-- Enable RLS on Answers and add useful indexes
BEGIN;

-- Row Level Security
ALTER TABLE "Answers" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "answers_owner" ON "Answers";
CREATE POLICY "answers_owner" ON "Answers"
    FOR SELECT, INSERT, UPDATE
    USING ("userUid" = auth.uid())
    WITH CHECK ("userUid" = auth.uid());

-- Indexes
CREATE UNIQUE INDEX IF NOT EXISTS questions_slug_idx ON "Questions" ("slug");
CREATE INDEX IF NOT EXISTS answers_user_question_idx ON "Answers" ("userUid", "questionUid");

COMMIT; 