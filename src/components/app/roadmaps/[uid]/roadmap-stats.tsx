import dynamic from 'next/dynamic';
import type { RoadmapUserQuestions, UserRoadmapsWithAnswers } from '@/types';

// BIZLEVEL: Dynamic import для оптимизации bundle size - chart компонент загружается только при необходимости
const RoadmapStatsChart = dynamic(() => import('./roadmap-stats-chart'), {
  loading: () => <div className="h-48 bg-black-75 rounded-lg animate-pulse flex items-center justify-center"><div className="text-gray-400">Загружаем статистику...</div></div>,
  ssr: false
});

export default function RoadmapStats(opts: {
  roadmap: UserRoadmapsWithAnswers & {
    questions: RoadmapUserQuestions[];
  };
}) {
  const { roadmap } = opts;

  return (
    <div className="space-y-2.5">
      <RoadmapStatsChart roadmap={roadmap} />
    </div>
  );
}
