import { cn } from '@/lib/utils';
import { getUnifiedProgress } from '@/utils/data/progress/get-unified-progress';
import { Suspense } from 'react';
import LoadingSpinner from './loading';
import BoltLightning from './icons/bolt-lightning';

interface UserXpProps {
  className?: string;
}

async function UserXpData() {
  const progress = await getUnifiedProgress();
  const userXp = progress?.userXp ?? 0;

  return <p className="font-onest font-medium">{userXp} XP</p>;
}

export default async function UserXp({ className }: UserXpProps) {
  return (
    <div className={cn('flex items-center gap-x-1', className)}>
      <BoltLightning className="size-6" />
      <Suspense fallback={<LoadingSpinner />}>
        <UserXpData />
      </Suspense>
    </div>
  );
}
