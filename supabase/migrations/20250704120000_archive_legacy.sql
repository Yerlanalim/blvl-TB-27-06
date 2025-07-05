-- Archive legacy roadmap- and SEO-related tables into separate schema
BEGIN;

-- Ensure archive schema exists
CREATE SCHEMA IF NOT EXISTS archive;

-- Move tables
ALTER TABLE "UserRoadmaps"                      SET SCHEMA archive;
ALTER TABLE "RoadmapUserQuestions"              SET SCHEMA archive;
ALTER TABLE "RoadmapUserQuestionsAnswers"       SET SCHEMA archive;
ALTER TABLE "RoadmapUserQuestionsUserAnswers"   SET SCHEMA archive;
ALTER TABLE "DefaultRoadmapQuestions"           SET SCHEMA archive;
ALTER TABLE "DefaultRoadmapQuestionsAnswers"    SET SCHEMA archive;
ALTER TABLE "DefaultRoadmapQuestionsUsersAnswers" SET SCHEMA archive;
ALTER TABLE "RoadmapGenerationProgress"         SET SCHEMA archive;
ALTER TABLE "PseoPages"                         SET SCHEMA archive;

COMMIT; 