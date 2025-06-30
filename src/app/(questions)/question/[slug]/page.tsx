import { lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';

const QuestionCard = dynamic(
  () => import('@/components/app/layout/question-single/question-card'),
  {
    ssr: false,
    loading: () => <QuestionCardLoading />,
  }
);

const CodeDisplayWrapper = dynamic(
  () => import('@/components/app/layout/question-single/code-display-wrapper'),
  {
    ssr: false,
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

// BIZLEVEL: Условная загрузка TestCase только для CODING_CHALLENGE с test cases
const TestCaseSection = dynamic(
  () => import('@/components/app/questions/code-editor/test-case-section'),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

const TourStartModal = lazy(() => import('@/components/app/shared/question/tour-start-modal'));
const PremiumContentWrapper = lazy(
  () => import('@/components/app/shared/question/premium-content-wrapper')
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
import NoDailyQuestion from '@/components/shared/no-daily-question';

import { getQuestion } from '@/utils/data/questions/get';
import { getQuestionStats } from '@/utils/data/questions/get-question-stats';
import { getRandomQuestion } from '@/utils/data/questions/get-random';

import { useUserServer } from '@/hooks/use-user-server';
import LoadingSpinner from '@/components/ui/loading';
// BIZLEVEL: Оптимизированные именованные импорты вместо wildcard
import { Expand, StarsIcon } from 'lucide-react';
import EditorIcon from '@/components/ui/icons/editor';
import WindowCode2 from '@/components/ui/icons/window-code';
import QuestionCardLoading from '@/components/app/layout/question-single/question-card-loading';
import MultipleChoiceLayout from '@/components/app/questions/multiple-choice/layout';
import { getNextAndPreviousQuestion, getLevelBasedNavigation } from '@/utils/data/questions/question-navigation';

export default async function TodaysQuestionPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const [user, question, totalSubmissions, nextQuestion] = await Promise.all([
    useUserServer(),
    getQuestion('slug', slug),
    getQuestionStats('slug', slug),
    getRandomQuestion({
      identifier: 'slug',
      currentQuestionSlug: slug,
    }),
  ]);

  if (!question) {
    return <NoDailyQuestion textAlign="center" />;
  }

  const questionPromise = getQuestion('slug', slug);
  
  // BIZLEVEL: Используем новую логику навигации по уровням
  let nextAndPreviousQuestion = await getLevelBasedNavigation(question.uid);
  
  // Если нет данных по уровням, используем старую логику
  if (!nextAndPreviousQuestion) {
    nextAndPreviousQuestion = await getNextAndPreviousQuestion(question.uid);
  }

  if (question.questionType === 'SIMPLE_MULTIPLE_CHOICE') {
    return (
      <PremiumContentWrapper>
        <MultipleChoiceLayout
          question={question}
          nextAndPreviousQuestion={nextAndPreviousQuestion}
        />
      </PremiumContentWrapper>
    );
  }

  // BIZLEVEL: Условное отображение элементов только для CODING_CHALLENGE
  const isCodingChallenge = question?.questionType === 'CODING_CHALLENGE';

  // BIZLEVEL: Задача 6.4.1 - Упрощенный layout для бизнес-уроков
  // Для VIDEO и MULTIPLE_CHOICE делаем полноширинный контент без правого сайдбара
  if (question.questionType === 'VIDEO' || question.questionType === 'MULTIPLE_CHOICE') {
    return (
      <PremiumContentWrapper>
        <TourStartModal user={user} />
        <div className="w-full">
          {/* BIZLEVEL: Полноширинный контент для бизнес-уроков */}
          <div className="flex flex-col gap-y-4 p-3 lg:p-6 min-h-[calc(100vh-4rem)]">
            <Suspense fallback={<LoadingSpinner />}>
              <QuestionCard
                questionPromise={questionPromise}
                totalSubmissions={totalSubmissions}
                user={user}
                nextQuestion={nextQuestion}
                identifier="slug"
                nextAndPreviousQuestion={nextAndPreviousQuestion || undefined}
              />
            </Suspense>
          </div>
        </div>
      </PremiumContentWrapper>
    );
  }

  // BIZLEVEL: Оставляем ResizableLayout только для CODING_CHALLENGE
  const leftContent = (
    <div className="flex flex-col gap-y-4 p-3 lg:pr-1.5 h-full">
      <Suspense fallback={<LoadingSpinner />}>
        <QuestionCard
          questionPromise={questionPromise}
          totalSubmissions={totalSubmissions}
          user={user}
          nextQuestion={nextQuestion}
          identifier="slug"
        />
      </Suspense>
    </div>
  );

  const rightContent = (
    <div
      className={`hidden lg:flex flex-col gap-4 p-3 lg:pl-1.5 h-full ${
        question?.testCases?.length ? 'lg:pb-1.5' : 'lg:pb-3'
      }`}
    >
      <div
        id="code-snippet"
        className="bg-black-75 border border-black-50 rounded-xl relative h-full overflow-y-auto scrollable-element"
      >
        {/* BIZLEVEL: Условное отображение заголовка и контролов только для CODING_CHALLENGE */}
        {isCodingChallenge && (
          <>
            <div className="px-4 py-2.5 text-sm flex w-full justify-between items-center bg-black-25">
              <span className="text-xs font-medium flex items-center gap-x-2">
                <WindowCode2 width="1.25em" height="1.25em" />
                Code
              </span>
              <div className="flex items-center gap-x-3">
                <AiQuestionHelp question={question} user={user} questionType="regular" />
                <ChangeCodeTheme user={user} />
                {question.codeSnippet && <ExpandedCodeModal code={question.codeSnippet} />}
              </div>
            </div>
            <Separator className="bg-black-50" />
          </>
        )}
        {/* BIZLEVEL: Условная загрузка Monaco Editor только для CODING_CHALLENGE */}
        {isCodingChallenge ? <CodeEditor /> : <CodeDisplayWrapper />}
      </div>
    </div>
  );

  // BIZLEVEL: TestCase только для CODING_CHALLENGE с test cases
  const rightBottomContent = isCodingChallenge && question?.testCases?.length 
    ? <TestCaseSection /> 
    : null;

  // BIZLEVEL: ResizableLayout только для CODING_CHALLENGE
  return (
    <PremiumContentWrapper>
      <TourStartModal user={user} />
      <ResizableLayout
        leftContent={leftContent}
        rightTopContent={rightContent}
        rightBottomContent={rightBottomContent}
        initialLeftWidth={50}
        initialRightTopHeight={question?.testCases?.length ? 70 : 100}
      />
    </PremiumContentWrapper>
  );
}
