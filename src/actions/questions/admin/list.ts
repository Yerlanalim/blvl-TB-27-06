import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';
import { getTagsFromQuestion } from '@/utils/data/questions/tags/get-tags-from-question';
import { transformQuestionFromDB } from '@/types';

type GetQuestionsOpts = { questionSlugs: string[] };

export const getQuestions = async (opts: GetQuestionsOpts) => {
  const user = await getUser();
  const { questionSlugs } = opts;

  const res = await prisma.questions.findMany({
    where: {
      slug: {
        in: questionSlugs,
      },
    },
    include: {
      answers: true,
      tags: {
        include: {
          tag: true,
        },
      },
      userAnswers: {
        where: {
          userUid: user?.uid,
        },
      },
    },
  });

  // Transform the questions
  const questionsWithTags = getTagsFromQuestion(res as any);
  const questionsArray = Array.isArray(questionsWithTags) ? questionsWithTags : [questionsWithTags];
  return questionsArray.map((q: any) => transformQuestionFromDB(q));
};
