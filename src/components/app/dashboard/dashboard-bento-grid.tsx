import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

import AllQuestionsDashboardBentoBox from '@/components/app/dashboard/all-questions-bento-box';
import NextQuestionBentoBox from '@/components/app/dashboard/next-question-bento-box';
import ProgressBentoBox from '@/components/app/dashboard/progression-bento-box';
import NextRoadmapBentoBox from '@/components/app/dashboard/next-roadmap-bento-box';
import WelcomeBentoBox from '@/components/app/dashboard/welcome-bento-box';
import { getDashboardStudyPath } from '@/utils/data/study-paths/get';
import { userHasAnsweredAnyQuestion } from '@/utils/data/questions/user-has-answered-any-question';

export default async function DashboardBentoGrid() {
  const studyPath = await getDashboardStudyPath();
  
  // Проверяем отвечал ли пользователь на вопросы
  const { hasAnsweredEnoughQuestions } = await userHasAnsweredAnyQuestion({
    numberOfQuestions: 1,
  });

  const items = [
    // BIZLEVEL: Приветственный блок для новых пользователей
    {
      header: <WelcomeBentoBox hasAnsweredAnyQuestion={hasAnsweredEnoughQuestions} />,
      className:
        'h-full text-white justify-center lg:min-h-auto lg:h-[370px] col-span-2 lg:col-span-1',
      padded: false,
      gradientBg: false,
    },
    {
      header: <NextQuestionBentoBox />,
      className:
        'h-full text-white justify-center lg:min-h-auto lg:h-[370px] col-span-2 lg:col-span-1',
      padded: false,
      gradientBg: false,
    },
    {
      header: <AllQuestionsDashboardBentoBox />,
      className: 'col-span-2 text-white lg:min-h-auto lg:h-[370px]',
      // BIZLEVEL: Изменено с /coding-challenges на /roadmaps для бизнес-версии
      href: '/roadmaps',
      padded: false,
    },
    {
      header: <ProgressBentoBox />,
      className: 'col-span-2 text-white lg:h-[370px]',
      padded: false,
    },
    {
      header: <NextRoadmapBentoBox />,
      className:
        'h-full text-white justify-center min-h-[18rem] lg:h-[370px] col-span-2 lg:col-span-1',
      href: studyPath ? `/roadmaps/${studyPath.studyPath.slug}` : '/roadmaps',
      padded: false,
      gradientBg: true,
    },
  ];

  // remove any hrefs that are null
  items.forEach((item) => {
    if (!item.href || item.href === null) delete item.href;
  });

  return (
    <div className="max-w-7xl m-auto">
      <BentoGrid className="grid-rows-[auto_auto] md:grid-rows-[repeat(2,minmax(0,1fr))] h-full">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            header={item.header}
            className={item.className}
            href={item?.href}
            padded={item.padded}
            gradientBg={item.gradientBg}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
