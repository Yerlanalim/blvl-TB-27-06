import { ArrowRight, Lock } from 'lucide-react';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { Separator } from '@/components/ui/separator';
import { Grid } from '@/components/ui/grid';
import { useUserServer } from '@/hooks/use-user-server';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Chip from '@/components/ui/chip';
import Link from 'next/link';
import { getUpgradeUrl } from '@/utils';

const items: {
  name: string;
  title: string;
}[] = [
  {
    name: 'Основы',
    title: 'Основы бизнеса',
  },
  {
    name: 'Маркетинг',
    title: 'Маркетинг и реклама',
  },
  {
    name: 'Продажи',
    title: 'Техники продаж',
  },
  {
    name: 'Финансы',
    title: 'Финансовое планирование',
  },
  {
    name: 'Управление',
    title: 'Управление командой',
  },
  {
    name: 'Стратегия',
    title: 'Бизнес-стратегия',
  },
  {
    name: 'Лидерство',
    title: 'Лидерство и мотивация',
  },
  {
    name: 'Анализ',
    title: 'Анализ рынка',
  },
  {
    name: 'Инновации',
    title: 'Инновации в бизнесе',
  },
  {
    name: 'Развитие',
    title: 'Развитие бизнеса',
  },
];

export default async function ProgressBentoBox() {
  const user = await useUserServer();

  return (
    <Link
      href={`${user?.userLevel === 'FREE' ? getUpgradeUrl() : '/roadmaps'}`}
      className="h-full flex flex-col p-4 relative group overflow-hidden"
    >
      <div className="absolute z-10">
        <Chip
          textColor="text-white"
          color="bg-primary"
          text={user?.userLevel === 'FREE' ? 'Обновите подписку для доступа к курсам' : 'Курсы'}
          border="border-black-50"
        />
      </div>
      <Grid size={20} position="top-right" />
      <div className="h-full flex items-center justify-center relative">
        <InfiniteMovingCards items={items} speed="slow" />
        <Separator className="absolute top-1/2 -translate-y-1/2 z-50 bg-black-50" />
      </div>
      <div className="flex flex-col md:flex-row gap-y-2 w-full justify-between items-end">
        <div className="space-y-1">
          <h6 className="text-xl">Персональный план развития</h6>
          <p className="hidden md:block font-satoshi text-sm">
            Ваш собственный план развития в бизнесе, который поможет вам стать успешным предпринимателем.
          </p>
        </div>
        {user?.userLevel !== 'FREE' && user?.userLevel !== 'STANDARD' && (
          <div className="items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-accent text-white shadow-sm hover:bg-accent/90 h-9 px-4 py-2 inline-flex font-ubuntu font-medium">
            Смотреть сейчас <ArrowRight className="size-3 ml-1 group-hover:ml-2 duration-300" />
          </div>
        )}
      </div>
      {user?.userLevel === 'FREE' ||
        (user?.userLevel === 'STANDARD' && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="absolute">
                <div className="flex items-center bg-accent p-2 rounded-md">
                  <Lock className="size-5" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="font-satoshi">
                Для доступа к этой функции нужна премиум подписка.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
    </Link>
  );
}
