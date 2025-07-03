import dynamic from 'next/dynamic';
import { useUserServer } from '@/hooks/use-user-server';
import { StatsSteps } from '@/types';
import { STATISTICS } from '@/utils/constants';
import { getData } from '@/utils/data/statistics/get-stats-chart-data';
import Hero from '@/components/shared/hero';
import ComingSoon from '@/components/shared/coming-soon';

// TODO: /statistics - открыть для всех после добавления бизнес-метрик
// Сейчас доступно только администраторам

// BIZLEVEL: Dynamic imports для оптимизации bundle size - chart компоненты загружаются только при необходимости
const StatsRangePicker = dynamic(() => import('@/components/app/statistics/range-picker'), {
  loading: () => <div className="h-10 w-32 bg-black-75 rounded-lg animate-pulse"></div>,
  ssr: false
});

const QuestionChart = dynamic(() => import('@/components/app/statistics/total-question-chart'), {
  loading: () => <div className="h-96 bg-black-75 rounded-lg animate-pulse flex items-center justify-center"><div className="text-gray-400">Загружаем график...</div></div>,
  ssr: false
});

const SuggestedQuestions = dynamic(() => import('@/components/app/statistics/suggested-questions'), {
  loading: () => <div className="h-32 bg-black-75 rounded-lg animate-pulse"></div>,
  ssr: false
});

const StatisticsReport = dynamic(() => import('@/components/app/statistics/statistics-report'), {
  loading: () => <div className="h-64 bg-black-75 rounded-lg animate-pulse"></div>,
  ssr: false
});

const StatisticsOverviewMenu = dynamic(() => import('@/components/app/statistics/statistics-overview-menu'), {
  loading: () => <div className="h-10 w-10 bg-black-75 rounded-lg animate-pulse"></div>,
  ssr: false
});

const QuestionTracker = dynamic(() => import('@/components/app/statistics/question-tracker'), {
  loading: () => <div className="h-24 bg-black-75 rounded-lg animate-pulse"></div>,
  ssr: false
});

export const metadata = {
  title: 'Статистика | BizLevel',
  description: 'Просмотр статистики и прогресса обучения',
};

export default async function StatisticsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await useUserServer();
  if (!user) {
    return null;
  }

  // TODO: В v2.0 заменить на нормальную систему ролей из БД
  // Сейчас проверяем по email домену для админов
  const isAdmin = user.email?.endsWith('@bizlevel.kz');
  
  if (!isAdmin) {
    return (
      <ComingSoon
        title="Статистика обучения"
        description="Расширенная статистика появится в следующих обновлениях"
        expectedVersion="v2.0"
        redirectTo="/roadmaps"
        redirectText="Вернуться к обучению"
      />
    );
  }

  // Get and validate range param
  const range = (searchParams.range as StatsSteps) || '7d';
  const { step } = STATISTICS[range];

  // Prefetch data
  const { stats } = await getData({
    userUid: user.uid,
    from: range,
    to: new Date().toISOString(),
    step,
  });

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row w-full justify-between md:items-center">
        <Hero
          heading="Статистика обучения"
          container={false}
          subheading="Обзор вашего пути обучения бизнесу на BizLevel."
        />
        <div className="flex gap-3">
          <StatsRangePicker selectedRange={STATISTICS[range].label} />
          <StatisticsOverviewMenu user={user} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-y-4 gap-x-8 mt-8 md:mt-0">
        <div className="max-h-[28rem] col-span-12 mb-4">
          {stats && <QuestionChart questionData={stats} step={step} />}
        </div>
        {stats && <QuestionTracker className="mb-4" stats={stats} step={step} range={range} />}
        {/** suggested q's and analysis blocks TODO: CHANGE SUGGESTED QUESTIONS TO STREAK DATA (I THINK) */}
        <SuggestedQuestions />
        <StatisticsReport />
      </div>
    </div>
  );
}
