import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUser } from '@/actions/user/authed/get-user';

export async function GET(
  req: Request,
  context: { params: { tag: string } },
) {
  const { tag } = context.params;
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const tagRecord = await prisma.tag.findUnique({ where: { name: tag } });
    if (!tagRecord) {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 });
    }

    const questions = await prisma.questions.findMany({
      where: {
        questionTags: {
          some: { tagId: tagRecord.uid },
        },
      },
      select: {
        uid: true,
        slug: true,
        previousQuestionSlug: true,
      },
    });

    // Сортируем: сначала первый вопрос (previousQuestionSlug === null), затем по цепочке
    questions.sort((a, b) => {
      if (a.previousQuestionSlug === null && b.previousQuestionSlug !== null) return -1;
      if (b.previousQuestionSlug === null && a.previousQuestionSlug !== null) return 1;
      return 0;
    });

    for (const q of questions) {
      const answered = await prisma.answers.findFirst({
        where: {
          userUid: user.uid,
          questionUid: q.uid,
          correctAnswer: true,
        },
        select: { uid: true },
      });
      if (!answered) {
        return NextResponse.json({ slug: q.slug });
      }
    }

    // Если все вопросы пройдены, возвращаем первый вопрос уровня
    return NextResponse.json({ slug: questions[0]?.slug ?? null });
  } catch (e) {
    console.error('first-uncompleted error', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
} 