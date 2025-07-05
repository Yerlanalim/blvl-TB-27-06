'use client';

import Link from 'next/link';

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutButton from '@/components/auth/logout';
import ProfilePicture from '@/components/ui/profile-picture';

import type { UserRecord, Profile } from '@/types';
import { getUserDisplayName } from '@/utils/user';
import { capitalise, getUpgradeUrl } from '@/utils';
import ReferralModal from '@/components/shared/referral-modal';

/**
 * Sidebar area component
 *
 * @param opts - The options for the sidebar area
 * @returns The sidebar area component
 */
export default function SidebarAreaComponent(opts: {
  user: UserRecord | null;
  profile: Profile | null;
}) {
  const { user } = opts;

  // Пока нет данных пользователя, возвращаем пустой сайдбар
  if (!user) {
    return (
      <SidebarContent className="bg-[#000000] w-full p-0" />
    );
  }

  return (
    <SidebarContent className="bg-[#000000] w-full p-0">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton variant="default" className="text-white h-fit flex-col items-start p-3">
                <div className="flex items-center w-full">
                  <ProfilePicture
                    src={user?.userProfilePicture}
                    alt="Profile Picture"
                    className="group-data-[collapsible=icon]:size-[18px] size-9"
                  />

                  <div className="flex flex-col ml-3 flex-1">
                    <span className="text-white font-medium text-lg line-clamp-1">
                      {user && getUserDisplayName(user)}
                    </span>
                    <span className="text-xs text-white">
                      {capitalise(user?.userLevel || 'Anonymous')}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </div>
                
                {/* Индикатор прогресса убран – отображается глобальный в хедере */}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#000] !text-white border-black-50">
              <DropdownMenuItem>
                <Link href={getUpgradeUrl()} className="w-full">
                  Улучшить подписку
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings/profile" className="w-full">
                  Настройки
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings/achievements" className="w-full">
                  Достижения
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ReferralModal>
                  <Button
                    variant="ghost"
                    padding="none"
                    className="flex items-center gap-x-2 h-auto !bg-transparent"
                  >
                    Пригласить друга
                  </Button>
                </ReferralModal>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/">Главная страница</Link>
              </DropdownMenuItem>
              {user && (
                <DropdownMenuItem>
                  <LogoutButton variant="ghost" padding="none" />
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  );
}
