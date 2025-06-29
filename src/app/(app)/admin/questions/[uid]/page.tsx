import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AdminContainer from '@/components/app/admin/admin-container';
import { prisma } from '@/lib/prisma';

// BIZLEVEL: Dynamic import для оптимизации bundle size - QuestionForm загружается только при необходимости
const QuestionForm = dynamic(() => import('@/components/app/admin/questions/question-form'), {
  loading: () => <div className="h-96 bg-black-75 rounded-lg animate-pulse"></div>,
  ssr: false
});

interface QuestionEditPageProps {
  params: {
    uid: string;
  };
}

export const metadata: Metadata = {
  title: 'BizLevel | Edit Question',
  description: 'Edit an existing coding question',
};

export default async function QuestionEditPage({ params }: QuestionEditPageProps) {
  try {
    const question = await prisma.questions.findUnique({
      where: { uid: params.uid },
      include: {
        tags: true,
      },
    });

    if (!question) {
      notFound();
    }

    return (
      <AdminContainer>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Edit Question</h1>
              <p className="text-muted-foreground">Update the question details and content</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/questions/list"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Back to Questions
              </Link>
              <Link
                href={`/questions/${question.slug}`}
                className="text-sm text-muted-foreground hover:text-foreground"
                target="_blank"
              >
                View Question
              </Link>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <QuestionForm initialData={question} isEditing />
            </div>
          </div>
        </div>
      </AdminContainer>
    );
  } catch (error) {
    console.error('Error fetching question:', error);
    throw new Error('Failed to load question data');
  }
}
