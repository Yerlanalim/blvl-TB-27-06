import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';
import { transformQuestionFromDB } from '@/types';

export const getUserReports = async (take: number = 5) => {
  // validate that we have a user before grabbing their user level
  const user = await getUser();
  if (!user) return [];

  // the user must have premium access to have reports.
  if (!['PREMIUM', 'ADMIN'].includes(user.userLevel)) {
    return [];
  }

  // get the user's reports
  const reports = await prisma.statisticsReport.findMany({
    where: {
      userUid: user.uid,
    },
    include: {
      linkedReports: {
        include: {
          answers: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take,
  });

  // Transform the linked reports
  return reports.map(report => ({
    ...report,
    linkedReports: report.linkedReports.map(question => 
      transformQuestionFromDB(question as any)
    )
  }));
};
