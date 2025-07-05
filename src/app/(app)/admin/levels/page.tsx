import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BizLevel | Admin Levels',
  description: 'Управление уровнями обучения',
};

interface LevelStats {
  tagName: string;
  questions: number;
  videoQuestions: number;
  testQuestions: number;
  usersCompleted: number;
  status: 'active' | 'draft';
}

async function getLevels(): Promise<LevelStats[]> {
  const levelTags = await prisma.tag.findMany({
    where: { name: { startsWith: 'level-' } },
    select: { uid: true, name: true },
  });

  const stats: LevelStats[] = [];

  for (const tag of levelTags) {
    // все вопросы уровня
    const questions = await prisma.questions.findMany({
      where: {
        tags: {
          some: { tagId: tag.uid },
        },
      },
      select: { questionType: true },
    });

    const questionsTotal = questions.length;
    const videoCount = questions.filter((q) => q.questionType === 'VIDEO').length;
    const testCount = questions.filter((q) => q.questionType === 'MULTIPLE_CHOICE').length;

    // usersCompleted — быстр. приближение: пользователи, у которых количество правильных ответов = кол-ву вопросов уровня
    // Используем сырое SQL, чтобы не грозить длинным Prisma запросом.
    const usersCompletedRes: Array<{ count: bigint }> = await prisma.$queryRawUnsafe(
      `SELECT COUNT(DISTINCT a."userUid") AS count
       FROM "Answers" a
       JOIN "Questions" q ON q."uid" = a."questionUid" AND a."correctAnswer" = true
       JOIN "QuestionTags" qt ON qt."questionId" = q."uid"
       WHERE qt."tagId" = $1
       GROUP BY a."userUid"
       HAVING COUNT(a."questionUid") = $2`,
      tag.uid,
      questionsTotal,
    );
    const usersCompleted = usersCompletedRes.length > 0 ? Number(usersCompletedRes.length) : 0;

    stats.push({
      tagName: tag.name,
      questions: questionsTotal,
      videoQuestions: videoCount,
      testQuestions: testCount,
      usersCompleted,
      status: questionsTotal > 0 && videoCount > 0 && testCount > 0 ? 'active' : 'draft',
    });
  }

  // Сортировка по номеру уровня
  stats.sort((a, b) => {
    const num = (s: string) => Number(s.replace('level-', ''));
    return num(a.tagName) - num(b.tagName);
  });

  return stats;
}

export default async function AdminLevelsPage() {
  const levels = await getLevels();

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">Levels Overview</h1>
      <table className="min-w-full bg-[#000000] border border-black-50 text-sm">
        <thead>
          <tr className="text-left text-gray-300">
            <th className="px-4 py-2 border-b border-black-50">Level</th>
            <th className="px-4 py-2 border-b border-black-50">Questions</th>
            <th className="px-4 py-2 border-b border-black-50">Video</th>
            <th className="px-4 py-2 border-b border-black-50">Tests</th>
            <th className="px-4 py-2 border-b border-black-50">Users Completed</th>
            <th className="px-4 py-2 border-b border-black-50">Status</th>
            <th className="px-4 py-2 border-b border-black-50">Actions</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level) => (
            <tr key={level.tagName} className="text-gray-200 hover:bg-black-75">
              <td className="px-4 py-3">{level.tagName}</td>
              <td className="px-4 py-3">{level.questions}</td>
              <td className="px-4 py-3">{level.videoQuestions}</td>
              <td className="px-4 py-3">{level.testQuestions}</td>
              <td className="px-4 py-3">{level.usersCompleted}</td>
              <td className="px-4 py-3">
                {level.status === 'active' ? (
                  <span className="text-green-400">Активен</span>
                ) : (
                  <span className="text-yellow-400">В разработке</span>
                )}
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/admin/levels/${level.tagName}`}
                  className="text-primary hover:text-primary/90"
                >
                  Просмотреть вопросы
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 