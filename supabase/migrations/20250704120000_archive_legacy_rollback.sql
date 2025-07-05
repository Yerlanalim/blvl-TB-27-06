-- Rollback migration: move legacy tables back to public schema
BEGIN;

ALTER TABLE archive."UserRoadmaps"                      SET SCHEMA public;
ALTER TABLE archive."RoadmapUserQuestions"              SET SCHEMA public;
ALTER TABLE archive."RoadmapUserQuestionsAnswers"       SET SCHEMA public;
ALTER TABLE archive."RoadmapUserQuestionsUserAnswers"   SET SCHEMA public;
ALTER TABLE archive."DefaultRoadmapQuestions"           SET SCHEMA public;
ALTER TABLE archive."DefaultRoadmapQuestionsAnswers"    SET SCHEMA public;
ALTER TABLE archive."DefaultRoadmapQuestionsUsersAnswers" SET SCHEMA public;
ALTER TABLE archive."RoadmapGenerationProgress"         SET SCHEMA public;
ALTER TABLE archive."PseoPages"                         SET SCHEMA public;

-- Optionally drop archive schema if empty
-- DROP SCHEMA IF EXISTS archive CASCADE;

COMMIT; 