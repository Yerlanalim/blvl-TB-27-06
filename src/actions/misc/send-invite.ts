'use server';

import { resend } from '@/lib/resend';
import { getUser } from '../user/authed/get-user';
import ReferralEmail from '@/components/emails/referral';
import { renderAsync } from '@react-email/components';
import React from 'react';
import { getUserMissionRecords } from '@/utils/data/missions/get-user-mission-record';
import { getDailyMissions } from '@/utils/data/missions/get-daily-missions';
import { prisma } from '@/lib/prisma';

export const sendInvite = async (email: string) => {
  const user = await getUser();

  const html = await renderAsync(
    React.createElement(ReferralEmail, {
      referrerUid: user?.uid || '',
      referrerEmail: user?.email || '',
    })
  );

  const dailyMissions = await getDailyMissions();
  const userMissionRecords = await getUserMissionRecords();
  const referralMission = dailyMissions.find((mission) => mission.type === 'FRIEND_INVITED');

  const userMissionRecord = userMissionRecords.find(
    (record) => record.missionUid === referralMission?.uid
  );

  if (userMissionRecord?.status !== 'COMPLETED' && userMissionRecord) {
    await prisma.userMission.update({
      where: { uid: userMissionRecord?.uid },
      data: { status: 'COMPLETED', progress: Number(userMissionRecord?.progress) + 1 || 1 },
    });
  }

  const subject = user
    ? 'Invite to BizLevel from ' + user.email
    : "You've been invited to BizLevel!";

  await resend.emails.send({
    from: 'BizLevel <team@bizlevel.kz>',
    to: email,
    subject,
    html,
  });
};
