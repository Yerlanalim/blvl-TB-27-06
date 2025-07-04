import StudentDiscountBlock from '@/components/marketing/pricing/student-discount';
import UpgradePage from '@/components/shared/payment/upgrade-page';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { Dialog } from '@/components/ui/dialog';
import { useUserServer } from '@/hooks/use-user-server';

const paymentsEnabled = process.env.NEXT_PUBLIC_ENABLE_PAYMENTS === 'true';

export default async function UpgradeModal() {
  const user = await useUserServer();

  // we don't show this modal if the user is not a free user (they are already on the pro plan)
  if (user?.userLevel !== 'FREE' || !paymentsEnabled) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="premium" size="sm">Получить Premium</Button>
      </DialogTrigger>
      <DialogContent className="bg-black-75 max-w-6xl max-h-[80vh] border-none overflow-scroll">
        <UpgradePage gradientBackground={false} />
        <StudentDiscountBlock />
      </DialogContent>
    </Dialog>
  );
}
