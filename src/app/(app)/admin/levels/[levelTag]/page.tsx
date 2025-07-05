import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: { levelTag: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `BizLevel | Admin Level ${params.levelTag}`,
  };
}

export default async function LevelDetailPage({ params }: Props) {
  const { levelTag } = params;

  const tag = await prisma.tag.findUnique({ where: { name: levelTag } });
  if (!tag) notFound();

  const questions = await prisma.questions.findMany({
    where: {
      tags: {
        some: { tagId: tag.uid },
      },
    },
    orderBy: { previousQuestionSlug: 'asc' },
    select: {
      uid: true,
      slug: true,
      title: true,
      questionType: true,
      videoId: true,
      QuestionResources: {
        select: { title: true, resource: true },
      },
      previousQuestionSlug: true,
      nextQuestionSlug: true,
      codeSnippet: true,
    },
  });

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">Level: {levelTag}</h1>

      <table className="min-w-full bg-[#000000] border border-black-50 text-sm">
        <thead>
          <tr className="text-left text-gray-300">
            <th className="px-4 py-2 border-b border-black-50">Slug</th>
            <th className="px-4 py-2 border-b border-black-50">Title</th>
            <th className="px-4 py-2 border-b border-black-50">Type</th>
            <th className="px-4 py-2 border-b border-black-50">Video ID</th>
            <th className="px-4 py-2 border-b border-black-50">Resources</th>
            <th className="px-4 py-2 border-b border-black-50">Navigation</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.uid} className="text-gray-200 hover:bg-black-75">
              <td className="px-4 py-3">
                <Link href={`/${q.slug}`} className="text-primary hover:text-primary/90" target="_blank">
                  {q.slug}
                </Link>
              </td>
              <td className="px-4 py-3">{q.title}</td>
              <td className="px-4 py-3">{q.questionType}</td>
              <td className="px-4 py-3">{q.questionType === 'VIDEO' ? q.videoId ?? '—' : '—'}</td>
              <td className="px-4 py-3">
                {q.QuestionResources.length ? (
                  <ul className="list-disc list-inside">
                    {q.QuestionResources.map((r) => (
                      <li key={r.resource}>
                        <a href={r.resource} target="_blank" rel="noopener" className="text-primary hover:underline">
                          {r.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  '—'
                )}
              </td>
              <td className="px-4 py-3 text-xs">
                <div>
                  Prev: {q.previousQuestionSlug ?? '—'}
                </div>
                <div>
                  Next: {q.nextQuestionSlug ?? '—'}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link
        href="/admin/levels"
        className="inline-block mt-6 text-primary hover:text-primary/90"
      >
        ← Back to Levels
      </Link>
    </div>
  );
} 