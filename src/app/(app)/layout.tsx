import '../globals.css';
import { Toaster } from '@/components/ui/sonner';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app/navigation/sidebar';
import { CSPostHogProvider } from '../providers';
import SidebarLayout from './providers';

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import NextTopLoader from 'nextjs-toploader';
import { createMetadata } from '@/utils/seo';
import { useUserServer } from '@/hooks/use-user-server';
import { getOrCreateUserProfile } from '@/utils/data/user/profile/get-user-profile';
import { getSuggestions } from '@/utils/data/questions/get-suggestions';

// onboarding
import { Onborda, OnbordaProvider } from 'onborda';
import { TourCard } from '@/components/app/shared/question/tour-card';
import { steps } from '@/lib/onborda';
import LeoChat from '@/components/app/leo-chat/leo-chat';
import PerformanceOptimizer from '@/components/app/shared/performance-optimizer';

export async function generateMetadata() {
  return createMetadata({
    title: 'bizlevel',
    description: 'Improve your code knowledge, one day at a time.',
  });
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, profile, suggestion] = await Promise.all([
    useUserServer(),
    getOrCreateUserProfile(),
    getSuggestions({ limit: 1 }),
  ]);

  return (
    <div lang="ru">
      <PerformanceOptimizer>
        <OnbordaProvider>
          <Onborda
            steps={steps()}
            showOnborda={true}
            shadowRgb="0,0,0"
            shadowOpacity="0.8"
            cardComponent={TourCard}
            cardTransition={{ duration: 0.3, type: 'tween' }}
          >
            <SidebarProvider>
              <AppSidebar user={user} profile={profile} suggestion={suggestion?.[0]} />
              <NextTopLoader color="#5b61d6" showSpinner={false} />
              <SidebarLayout>
                <CSPostHogProvider>
                  <MantineProvider>{children}</MantineProvider>
                </CSPostHogProvider>
              </SidebarLayout>
              <Toaster className="bg-black" />
              <LeoChat />
            </SidebarProvider>
          </Onborda>
        </OnbordaProvider>
      </PerformanceOptimizer>
    </div>
  );
}
