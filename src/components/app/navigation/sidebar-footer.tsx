import type { UserRecord } from '@/types';
import SidebarFooterPremium from './sidebar-footer-premium';
import { SidebarMenuItem } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import ReferralModal from '@/components/shared/referral-modal';
import { Users2 } from 'lucide-react';

interface SidebarFooterProps {
  user: UserRecord | null;
}

export default function SidebarFooter({ user }: SidebarFooterProps) {
  const pathname = usePathname();

  return (
    <div className="p-4 flex flex-col gap-4">
      {!user && (
        <SidebarMenuItem className="group-data-[collapsible=icon]:hidden flex flex-col gap-2">
          <Button variant="default" fullWidth className="" href={`/login?redirectUrl=${pathname}`}>
            Вход
          </Button>
          <Button variant="accent" fullWidth className="" href={`/signup?redirectUrl=${pathname}`}>
            Регистрация
          </Button>
        </SidebarMenuItem>
      )}
      {user?.userLevel === 'FREE' && <SidebarFooterPremium user={user} />}
      <SidebarMenuItem className="group-data-[collapsible=icon]:hidden list-none">
        <ul>
          <ReferralModal>
            <Button variant="default" fullWidth aria-label="Пригласить друга">
              Пригласить друга
            </Button>
          </ReferralModal>
        </ul>
      </SidebarMenuItem>
      <SidebarMenuItem className="hidden group-data-[collapsible=icon]:block">
        <ReferralModal>
          <Button variant="ghost" size="icon" className="size-5" title="Пригласить друга">
            <Users2 className="size-4" />
          </Button>
        </ReferralModal>
      </SidebarMenuItem>
    </div>
  );
}
