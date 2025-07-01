/*
  Warnings:

  - You are about to drop the column `answerUid` on the `RoadmapUserQuestionsUserAnswers` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `RoadmapUserQuestionsUserAnswers` table. All the data in the column will be lost.
  - The `progress` column on the `UserMission` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `howDidYouHearAboutTechBlitz` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `AIPrompts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Achievement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Badge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DefaultRoadmapQuestionsUsersAnswers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DemoAnswers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IndividualLeagueData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LeagueAchievement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LeagueHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Leagues` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoadmapGenerationProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StatisticsReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserLeague` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Waitlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SharedQuestions` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `requirements` on the `Mission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `questionId` on table `UserBookmarks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "QuestionType" ADD VALUE 'VIDEO';

-- DropForeignKey
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_badgeUid_fkey";

-- DropForeignKey
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_userUid_fkey";

-- DropForeignKey
ALTER TABLE "DefaultRoadmapQuestionsUsersAnswers" DROP CONSTRAINT "DefaultRoadmapQuestionsUsersAnswers_questionUid_fkey";

-- DropForeignKey
ALTER TABLE "DefaultRoadmapQuestionsUsersAnswers" DROP CONSTRAINT "DefaultRoadmapQuestionsUsersAnswers_roadmapUid_fkey";

-- DropForeignKey
ALTER TABLE "DemoAnswers" DROP CONSTRAINT "DemoAnswers_questionUid_fkey";

-- DropForeignKey
ALTER TABLE "LeagueAchievement" DROP CONSTRAINT "LeagueAchievement_leagueDataUid_fkey";

-- DropForeignKey
ALTER TABLE "LeagueAchievement" DROP CONSTRAINT "LeagueAchievement_userUid_fkey";

-- DropForeignKey
ALTER TABLE "LeagueHistory" DROP CONSTRAINT "LeagueHistory_leagueDataUid_fkey";

-- DropForeignKey
ALTER TABLE "LeagueHistory" DROP CONSTRAINT "LeagueHistory_userUid_fkey";

-- DropForeignKey
ALTER TABLE "Leagues" DROP CONSTRAINT "Leagues_leagueDataUid_fkey";

-- DropForeignKey
ALTER TABLE "StatisticsReport" DROP CONSTRAINT "StatisticsReport_userUid_fkey";

-- DropForeignKey
ALTER TABLE "UserLeague" DROP CONSTRAINT "UserLeague_leagueUid_fkey";

-- DropForeignKey
ALTER TABLE "UserLeague" DROP CONSTRAINT "UserLeague_userUid_fkey";

-- DropForeignKey
ALTER TABLE "_SharedQuestions" DROP CONSTRAINT "_SharedQuestions_A_fkey";

-- DropForeignKey
ALTER TABLE "_SharedQuestions" DROP CONSTRAINT "_SharedQuestions_B_fkey";

-- AlterTable
ALTER TABLE "DefaultRoadmapQuestions" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "defaultroadmapquestions_order_seq";

-- AlterTable
ALTER TABLE "Mission" DROP COLUMN "requirements",
ADD COLUMN     "requirements" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "videoUrl" TEXT;

-- AlterTable
ALTER TABLE "RoadmapUserQuestionsAnswers" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "RoadmapUserQuestionsUserAnswers" DROP COLUMN "answerUid",
DROP COLUMN "difficulty";

-- AlterTable
ALTER TABLE "UserBookmarks" ALTER COLUMN "questionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserMission" DROP COLUMN "progress",
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "howDidYouHearAboutTechBlitz",
ADD COLUMN     "howDidYouHearAboutBizLevel" TEXT;

-- DropTable
DROP TABLE "AIPrompts";

-- DropTable
DROP TABLE "Achievement";

-- DropTable
DROP TABLE "Badge";

-- DropTable
DROP TABLE "DefaultRoadmapQuestionsUsersAnswers";

-- DropTable
DROP TABLE "DemoAnswers";

-- DropTable
DROP TABLE "IndividualLeagueData";

-- DropTable
DROP TABLE "LeagueAchievement";

-- DropTable
DROP TABLE "LeagueHistory";

-- DropTable
DROP TABLE "Leagues";

-- DropTable
DROP TABLE "RoadmapGenerationProgress";

-- DropTable
DROP TABLE "StatisticsReport";

-- DropTable
DROP TABLE "UserLeague";

-- DropTable
DROP TABLE "Waitlist";

-- DropTable
DROP TABLE "_SharedQuestions";

-- CreateIndex
CREATE INDEX "Mission_isActive_idx" ON "Mission"("isActive");

-- CreateIndex
CREATE INDEX "RoadmapUserQuestions_roadmapUid_idx" ON "RoadmapUserQuestions"("roadmapUid");

-- CreateIndex
CREATE INDEX "RoadmapUserQuestions_completed_idx" ON "RoadmapUserQuestions"("completed");

-- CreateIndex
CREATE INDEX "UserMission_missionUid_idx" ON "UserMission"("missionUid");

-- CreateIndex
CREATE INDEX "UserMission_status_idx" ON "UserMission"("status");

-- CreateIndex
CREATE INDEX "UserMission_userUid_idx" ON "UserMission"("userUid");
