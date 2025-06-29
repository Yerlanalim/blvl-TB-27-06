import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import AdminContainer from '@/components/app/admin/admin-container';
import { prisma } from '@/lib/prisma';

// BIZLEVEL: Dynamic import для оптимизации bundle size - EditLeagueForm загружается только при необходимости
const EditLeagueForm = dynamic(() => import('@/components/app/admin/leagues/edit-league-form'), {
  loading: () => <div className="h-64 bg-black-75 rounded-lg animate-pulse"></div>,
  ssr: false
});

export const metadata: Metadata = {
  title: 'BizLevel | Edit League',
  description: 'View and modify league settings',
};

async function getLeague(uid: string) {
  const league = await prisma.individualLeagueData.findUnique({
    where: { uid },
  });

  return league;
}

export default async function LeaguePage({ params }: { params: { uid: string } }) {
  const league = await getLeague(params.uid);

  return (
    <AdminContainer>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex flex-col items-start space-y-4">
          <Link
            href="/admin/leagues/list"
            className="flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to League List
          </Link>
          <h1 className="text-2xl font-bold text-white">Edit League: {league?.name}</h1>
        </div>
      </div>

      <div className="grid gap-8">
        <EditLeagueForm league={league} />
      </div>
    </AdminContainer>
  );
}
