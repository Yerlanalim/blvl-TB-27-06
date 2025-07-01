import { Button } from '@/components/ui/button';
import { UserIcon } from 'lucide-react';
import NumberFlow from '@number-flow/react';

import type { Question } from '@/types';
import { cn } from '@/lib/utils';

export default function SocialProof({
  userCount,
  dailyQuestion,
  padding = 'py-16 md:py-24 md:pt-40',
  showDescription = true,
}: {
  userCount: number;
  dailyQuestion: Question | null;
  padding?: string;
  showDescription?: boolean;
}) {
  return (
    <section className={cn('relative', padding)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl !font-onest !leading-[normal] text-gradient from-white to-white/55 mb-3">
              Развиваем предпринимателей по всему миру
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-x-2">
                <UserIcon className="size-6 text-white" />
                <span className="text-base text-white font-onest">
                  <NumberFlow value={userCount} />+ Предпринимателей
                </span>
              </div>
            </div>
            {showDescription && (
              <p className="text-gray-400 mb-8">
                Присоединяйтесь к процветающему сообществу предпринимателей, которые развивают свои бизнес-навыки
                и ускоряют рост своего дела с помощью нашей современной платформы.
              </p>
            )}
          </div>

          {dailyQuestion && (
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button
                variant="secondary"
                size="lg"
                href={`/question/${dailyQuestion?.slug}`}
                aria-label="Перейти к демо уроку"
              >
                Попробовать демо
              </Button>
              <Button
                variant="default"
                size="lg"
                href="/roadmaps"
                aria-label="Перейти к обучению"
              >
                Начать обучение
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
