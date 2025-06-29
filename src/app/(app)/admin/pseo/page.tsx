import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import AdminContainer from '@/components/app/admin/admin-container';
import Link from 'next/link';

// BIZLEVEL: Dynamic import для оптимизации bundle size - PseoForm загружается только при необходимости
const PseoForm = dynamic(() => import('@/components/app/admin/pseo/pseo-form'), {
  loading: () => <div className="h-96 bg-black-75 rounded-lg animate-pulse"></div>,
  ssr: false
});

export const metadata: Metadata = {
  title: 'BizLevel | PSEO Page Management',
  description: 'Create and manage PSEO pages for SEO optimization',
};

export default function PseoAdminPage() {
  return (
    <AdminContainer>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">PSEO Page Management</h1>
          <Link
            href="/admin"
            className="text-sm px-4 py-2 bg-black-75 hover:bg-black-50 text-white rounded-md transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8">
          <p className="text-gray-300">
            Create search engine optimized pages by filling out the form below. All fields marked
            with * are required.
          </p>
        </div>

        <div className="bg-black-75 border border-black-50 rounded-lg p-6">
          <PseoForm />
        </div>
      </div>
    </AdminContainer>
  );
}
