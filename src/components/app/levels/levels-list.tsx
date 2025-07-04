'use client';

import { useRouter } from 'next/navigation';
import useUnifiedProgress from '@/hooks/use-unified-progress';
import LevelBlock from '@/components/app/levels/level-block';
import { getFirstUncompletedQuestion } from '@/hooks/use-question-navigation';

interface LevelInfo {
  number: number;
  title: string;
  description: string;
}

export default function LevelsList({ levels }: { levels: LevelInfo[] }) {
  const { levelDetails, isLoading } = useUnifiedProgress();
  const router = useRouter();

  const currentIndex = levelDetails.findIndex((l) => !l.completed);

  const handleClick = async (levelNumber: number, locked: boolean) => {
    if (locked) return;
    const tag = `level-${levelNumber}`;
    const slug = await getFirstUncompletedQuestion(tag);
    if (slug) router.push(`/question/${slug}`);
  };

  return (
    <ul className="flex flex-col gap-4">
      {levels.map((level, idx) => {
        const detail = levelDetails.find((d) => d.levelNumber === level.number);
        const completed = detail?.completed ?? false;
        const current = idx === currentIndex;
        const locked = idx > currentIndex && !completed;

        return (
          <LevelBlock
            key={level.number}
            levelNumber={level.number}
            title={level.title}
            description={level.description}
            completed={completed}
            current={!completed && current}
            locked={locked}
            onClick={() => handleClick(level.number, locked)}
          />
        );
      })}
      {isLoading && <p className="text-gray-400 text-sm">Загружаем прогресс…</p>}
    </ul>
  );
} 