'use client';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import GlobalProgressIndicator from '@/components/app/navigation/global-progress-indicator';

export default function RootProvider({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();

  return (
    <>
      {/* Глобальный индикатор прогресса - показывается на всех страницах */}
      <GlobalProgressIndicator />
      
      <main
        className={cn('w-full transition-[width] duration-200 ease-in-out', 'py-4 lg:pb-5', {
          'lg:w-[calc(100%-15rem)]': state === 'expanded',
          'lg:w-[calc(100%-3rem)]': state === 'collapsed',
        })}
      >
        {children}
      </main>
    </>
  );
}
