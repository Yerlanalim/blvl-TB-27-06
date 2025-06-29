import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

// BIZLEVEL: Оптимизированные dynamic imports
const QuestionCard = dynamic(
  () => import('@/components/app/layout/question-single/question-card'),
  {
    ssr: false,
    loading: () => <QuestionCardLoading />,
  }
);

// BIZLEVEL: Условная загрузка Monaco Editor только для CODING_CHALLENGE
const CodeEditor = dynamic(
  () => import('@/components/app/questions/code-editor/editor'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[90vh]">
        <LoadingSpinner />
      </div>
    ),
  }
);

// BIZLEVEL: Условная загрузка UI элементов только для CODING_CHALLENGE
const AiQuestionHelp = dynamic(() => import('@/components/app/questions/single/ai-question-help'), {
  ssr: false,
  loading: () => <StarsIcon className="size-4 text-yellow-400 fill-yellow-500" />,
});

const ChangeCodeTheme = dynamic(
  () => import('@/components/app/questions/single/change-code-theme'),
  {
    ssr: false,
    loading: () => <EditorIcon />,
  }
);

const ExpandedCodeModal = dynamic(
  () => import('@/components/app/questions/single/expanded-code-modal'),
  {
    ssr: false,
    loading: () => <Expand className="size-4 text-gray-500" />,
  }
);

const ResizableLayout = dynamic(() => import('@/components/ui/resizable-layout'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

import { Separator } from '@/components/ui/separator';
import { getQuestion } from '@/utils/data/questions/get';
import { useUserServer } from '@/hooks/use-user-server';
import LoadingSpinner from '@/components/ui/loading';
// BIZLEVEL: Оптимизированные именованные импорты
import { Expand, StarsIcon } from 'lucide-react';
import EditorIcon from '@/components/ui/icons/editor';
import QuestionCardLoading from '@/components/app/layout/question-single/question-card-loading';
import CodeDisplay from '@/components/app/layout/question-single/code-snippet';

export default async function TodaysQuestionPage({ params }: { params: { uid: string } }) {
  const { uid } = params;

  const [user, question] = await Promise.all([useUserServer(), getQuestion('uid', uid)]);

  if (!question) {
    return redirect('/dashboard');
  }

  const leftContent = (
    <div className="flex flex-col gap-y-4 p-3 lg:pr-1.5 h-full">
      <Suspense fallback={<LoadingSpinner />}>
        <QuestionCard
          questionPromise={getQuestion('uid', uid)}
          totalSubmissions={undefined}
          user={user}
          nextQuestion={undefined}
          identifier="uid"
        />
      </Suspense>
    </div>
  );

  // BIZLEVEL: Условное отображение только для CODING_CHALLENGE
  const isCodingChallenge = question?.questionType === 'CODING_CHALLENGE';

  const rightTopContent = (
    <div className="hidden lg:flex flex-col gap-4 p-3 lg:p-6 lg:pl-3 h-full">
      <div
        id="code-snippet"
        className="bg-black-75 border border-black-50 rounded-xl relative overflow-hidden h-full"
      >
        {/* BIZLEVEL: Условное отображение контролов только для CODING_CHALLENGE */}
        {isCodingChallenge && (
          <>
            <div className="p-4 text-sm flex w-full items-center justify-end bg-black-25 gap-x-3">
              {/** explain question ai button */}
              <AiQuestionHelp question={question} user={user} questionType="regular" />
              {/** code theme selector */}
              <ChangeCodeTheme user={user} />
              {/** code snippet */}
              {question.codeSnippet && <ExpandedCodeModal code={question.codeSnippet} />}
            </div>
            <Separator className="bg-black-50" />
          </>
        )}
        {/* BIZLEVEL: Условная загрузка Monaco Editor для CODING_CHALLENGE или обычный display */}
        {isCodingChallenge ? (
          <CodeEditor />
        ) : (
          question?.codeSnippet && (
            <CodeDisplay content={question.codeSnippet} backgroundColor="#111111" user={user} />
          )
        )}
      </div>
    </div>
  );

  return (
    <ResizableLayout
      leftContent={leftContent}
      rightTopContent={rightTopContent}
      initialLeftWidth={50}
      rightBottomContent={null}
    />
  );
}
