import { getDashboardStudyPath } from '@/utils/data/study-paths/get';
import NextRoadmapGraphic from './next-roadmap-graphic';

export default async function StreakBentoBox() {
  const studyPath = await getDashboardStudyPath();

  return (
    <div className="space-y-4 group relative overflow-hidden p-4 h-full">
      <div className="space-y-1">
        <h6 className="text-xl">
          {studyPath ? (
            <>
              Продолжить изучение <span className="font-medium">{studyPath.studyPath.title}</span>
            </>
          ) : (
            'Начать обучение'
          )}
        </h6>
        <p className="text-sm text-gray-400">
          Не останавливайтесь в развитии - потратьте 3 минуты на следующий урок из вашего курса.
        </p>
      </div>
      <div className="w-full h-fit flex items-center justify-center">
        <NextRoadmapGraphic
          studyPathSlug={studyPath?.studyPath.slug || 'javascript-fundamentals'}
          studyPathClassName="flex flex-col gap-6"
        />
      </div>
    </div>
  );
}
