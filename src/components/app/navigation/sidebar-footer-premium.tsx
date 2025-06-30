import { Button } from '@/components/ui/button';
import { SidebarMenuItem } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Stars } from 'lucide-react';
import { SIDEBAR_FOOTER_DESCRIPTION } from '@/utils/constants/sidebar';
import { usePathname } from 'next/navigation';
import type { UserRecord } from '@/types';
import { getUserDisplayName } from '@/utils/user';
import { getUpgradeUrl } from '@/utils';

interface SidebarFooterPremiumProps {
  user: UserRecord | null;
}

export default function SidebarFooterPremium({ user }: SidebarFooterPremiumProps) {
  const pathname = usePathname();

  const overrideDynamicTitleAndDescription = true;

  // check if the user has a custom coupon and the expiring date is in the future
  const hasCustomCoupon =
    user?.userCustomCoupon &&
    user?.userCustomCouponExpiresAt &&
    user?.userCustomCouponExpiresAt > new Date();

  return (
    <>
      {/* Show when sidebar is expanded */}
      <SidebarMenuItem
        className="p-2 pt-4 font-semibold font-inter text-center flex flex-col gap-y-1 items-center justify-center rounded-lg border border-black-50 group-data-[collapsible=icon]:hidden"
        style={{
          background:
            'radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)',
        }}
      >
        <p className="font-onest">
          {/** overrideDynamicTitleAndDescription
            ? `${getUserDisplayName(user)}, don't miss out!`
            : SIDEBAR_FOOTER_TITLE[pathname as keyof typeof SIDEBAR_FOOTER_TITLE] */}
          {hasCustomCoupon ? `${getUserDisplayName(user)}, не упустите возможность!` : 'Ограниченное предложение!'}
        </p>
        <p className="text-xs font-light font-onest">
          {hasCustomCoupon ? (
            <>
              Получите скидку 60% на первые три месяца с кодом{' '}
              <span className="font-bold">{user?.userCustomCoupon}</span>. Предложение действует до{' '}
              {user?.userCustomCouponExpiresAt?.toLocaleDateString('ru-RU')}.
            </>
          ) : (
            <>
              {overrideDynamicTitleAndDescription
                ? 'Скидка 30% на пожизненный план. Один платеж навсегда!'
                : SIDEBAR_FOOTER_DESCRIPTION[pathname as keyof typeof SIDEBAR_FOOTER_DESCRIPTION]
                ? SIDEBAR_FOOTER_DESCRIPTION[pathname as keyof typeof SIDEBAR_FOOTER_DESCRIPTION]
                : 'Персональная практика, премиум уроки и многое другое'}
            </>
          )}
        </p>
        <Button variant="premium" fullWidth className="mt-4" href={getUpgradeUrl()}>
          Улучшить до Премиум
        </Button>
      </SidebarMenuItem>

      {/* Show when sidebar is collapsed */}
      <SidebarMenuItem className="hidden group-data-[collapsible=icon]:block">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-5"
                href={getUpgradeUrl()}
                title="Улучшить до Премиум"
              >
                <Stars className="size-4 text-yellow-400 fill-yellow-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Улучшить до Премиум</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarMenuItem>
    </>
  );
}
