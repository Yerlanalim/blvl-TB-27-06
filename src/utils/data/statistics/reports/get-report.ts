import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';
import { transformQuestionFromDB } from '@/types';

export const getReport = async (uid: string) => {
  const user = await getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const report = await prisma.statisticsReport.findUnique({
    where: { uid, userUid: user.uid },
    include: {
      linkedReports: {
        include: {
          answers: true,
        },
      },
    },
  });

  if (!report) return null;

  // Transform the linked reports
  return {
    ...report,
    linkedReports: report.linkedReports.map(question => 
      transformQuestionFromDB(question as any)
    )
  };
};
