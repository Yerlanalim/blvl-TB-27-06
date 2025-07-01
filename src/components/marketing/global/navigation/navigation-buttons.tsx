import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useUserServer } from '@/hooks/use-user-server';

export default async function NavigationButtons() {
  const user = await useUserServer();
  const isLoggedIn = Boolean(user?.email);

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-x-2">
        <a
          href="/dashboard"
          className="px-4 py-2 rounded-md text-sm font-medium hidden lg:block font-onest bg-secondary text-black border border-black-50"
        >
          Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="items-center gap-x-2 hidden lg:flex">
      <Button href="/login" variant="default">
        Вход
      </Button>
      <Button
        href={'/signup'}
        variant="accent"
        className="font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
      >
        Начать обучение
        <ArrowRight className="ml-2 size-4" />
      </Button>
    </div>
  );
}
