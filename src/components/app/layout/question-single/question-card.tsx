'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';

// components
import { Separator } from '@/components/ui/separator';
import Stopwatch from '@/components/app/questions/single/stopwatch';
import QuestionAccordion from '@/components/app/questions/single/question-accordion';
import QuestionTabs from '@/components/app/questions/resources/question-tabs';
import AnswerQuestionForm from '@/components/app/questions/single/answer-question-form';
import { BarChart, BookIcon, BookOpen, FileIcon, FileText, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeDisplay from './code-snippet';
import { AnimatePresence } from 'framer-motion';
import CodeEditorQuestionSubmitted from '@/components/app/questions/code-editor/answer-submitted';
import CodeEditor from '@/components/app/questions/code-editor/editor';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExpandedCodeModal from '../../questions/single/expanded-code-modal';
import ChangeCodeTheme from '../../questions/single/change-code-theme';
import AiQuestionHelp from '../../questions/single/ai-question-help';
import NoDailyQuestion from '@/components/shared/no-daily-question';
import QuestionSubmitted from '@/components/app/layout/question-single/question-submitted';
import VerticalVideoPlayer from '@/components/business/vertical-video-player';
import { extractVimeoId } from '@/utils/video';

// types
import type { UserRecord, Question } from '@/types';

// context
import { useQuestionSingle } from '@/contexts/question-single-context';

// utils
// BIZLEVEL: Заменяем lodash на нативную JS функцию
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function QuestionCard(opts: {
  // optional as this is not required to render the card
  user: UserRecord | null;
  questionPromise: Promise<Question | null>;
  totalSubmissions?: {
    totalSubmissions: number;
    percentageCorrect: number;
  };
  nextQuestion?: string;
  isRoadmapQuestion?: boolean;
  index?: number;
  identifier: 'slug' | 'uid';
  // New props for study path lessons
  nextAndPreviousQuestion?: {
    nextQuestion: string | null;
    previousQuestion: string | null;
    progress?: {
      current: number;
      total: number;
      level: string;
      percentage: number;
    };
  };
  studyPathMetadata?: {
    studyPathSlug: string;
    subSection?: string;
    subSectionName?: string;
    lessonIndex: number;
    totalLessons: number;
  };
}) {
  const { user, questionPromise, totalSubmissions } = opts;

  // Router for navigation to next lesson
  const router = useRouter();
  // Состояние для активации кнопки «Дальше»
  const [canContinue, setCanContinue] = useState(false);

  const [activeTab, setActiveTab] = useState<'description' | 'resources' | 'stats'>('description');

  const question = use(questionPromise);

  const {
    totalSeconds,
    currentLayout,
    setCurrentLayout,
    prefilledCodeSnippet,
    answerHelp,
    showHint,
  } = useQuestionSingle();

  if (!question) {
    return <NoDailyQuestion textAlign="center" />;
  }

  const renderAnswerForm = () => <AnswerQuestionForm time={totalSeconds} />;

  // toggle layout only between questions and codeSnippet
  // the answer is after the user has submitted their answer
  const toggleLayout = () => {
    // determine what type
    setCurrentLayout(currentLayout === 'questions' ? 'codeSnippet' : 'questions');
  };

  const switcherText = () => {
    if (question.questionType === 'CODING_CHALLENGE') {
      return currentLayout === 'questions' ? '(Tap to view editor)' : '(Tap to view question)';
    }
    return currentLayout === 'questions' ? '(Tap to view code snippet)' : '(Tap to view question)';
  };
  // check if the question is premium
  const userCanAccess = question.isPremiumQuestion ? user?.userLevel !== 'FREE' : true;

  return (
    <Tabs
      id="question-card-tabs"
      defaultValue="description"
      className="h-full bg-black-75 border border-black-50 rounded-lg flex flex-col overflow-hidden"
    >
      <div className="p-4 lg:px-3 lg:py-0 w-full flex flex-col gap-3 md:flex-row justify-between bg-black-25 md:items-center">
        <div className="flex items-center gap-2 justify-between w-full">
          {/* BIZLEVEL: Скрываем вкладки для VIDEO типа */}
          {question.questionType !== 'VIDEO' && (
            <TabsList className="hidden lg:grid h-auto w-fit grid-cols-3 gap-5 text-white rounded-lg bg-transparent p-1">
              <TabsTrigger
                id="question-card-tabs-description"
                value="description"
                onClick={() => setActiveTab('description')}
                className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:underline border-0 w-fit px-0"
              >
                <div className="mr-2">
                  {activeTab === 'description' ? (
                    <FileText className="size-4" />
                  ) : (
                    <FileIcon className="size-4" />
                  )}
                </div>
                Description
              </TabsTrigger>
              <TabsTrigger
                id="question-card-tabs-resources"
                value="resources"
                onClick={() => setActiveTab('resources')}
                className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:underline w-fit border-0 px-0"
              >
                <div className="mr-2">
                  {activeTab === 'resources' ? (
                    <BookOpen className="size-4" />
                  ) : (
                    <BookIcon className="size-4" />
                  )}
                </div>
                Resources
              </TabsTrigger>
              <TabsTrigger
                id="question-card-tabs-stats"
                value="stats"
                onClick={() => setActiveTab('stats')}
                className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:underline w-fit border-0 px-0"
              >
                <div className="mr-2">
                  {activeTab === 'stats' ? (
                    <BarChart className="size-4" />
                  ) : (
                    <PieChart className="size-4" />
                  )}
                </div>
                Stats
              </TabsTrigger>
            </TabsList>
          )}
          <div className="min-w-fit">
            {/* BIZLEVEL: Скрываем таймер для VIDEO типа */}
            {user && user?.showTimeTaken && question.questionType === 'CODING_CHALLENGE' && <Stopwatch totalSeconds={totalSeconds} />}
          </div>
          <div className="flex lg:hidden text-sm w-full items-center justify-end bg-black-25 gap-x-3">
            {/** explain question ai button */}
            <AiQuestionHelp question={question} user={user} questionType="regular" />
            {/** code theme selector */}
            <ChangeCodeTheme user={user} />
            {/** code snippet */}
            {question.codeSnippet && <ExpandedCodeModal code={question.codeSnippet} />}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-between items-center">
          {question.questionType !== 'VIDEO' && (
            <Button
              variant="ghost"
              onClick={toggleLayout}
              className="text-xs block lg:hidden"
              padding="none"
            >
              {switcherText()}
            </Button>
          )}
        </div>
      </div>
      <Separator className="bg-black-50" />
      <div className="flex-1 bg-black overflow-y-auto scrollable-element relative">
        {currentLayout === 'questions' && userCanAccess && (
          <>
            {question.questionType === 'VIDEO' ? (
              <div className="p-4 lg:p-0 h-full flex flex-col items-center justify-center gap-6"> {/* Центрируем видео */}
                <VerticalVideoPlayer
                  videoId={
                    extractVimeoId(question.videoUrl ?? question.videoId ?? question.codeSnippet ?? '') || '000000'
                  }
                  title={question.title || undefined} // Добавляем заголовок урока
                  enableSwipeNavigation={true} // Включаем свайп-жесты на мобильных
                  onComplete={() => {
                    // Автоматически отмечаем видео как просмотренное
                    setCurrentLayout('answer');
                  }}
                  onPlay={() => {
                    // Отметить начало просмотра
                    console.log('Video started:', question.uid);
                    // TODO: Добавить трекинг начала просмотра видео
                    // trackVideoStart(question.uid);
                  }}
                  onNext={() => {
                    // Переход к следующему уроку
                    console.log('Next lesson requested');
                    // TODO: Реализовать навигацию к следующему уроку
                    // navigateToNextLesson();
                  }}
                  onPrevious={() => {
                    // Переход к предыдущему уроку
                    console.log('Previous lesson requested');
                    // TODO: Реализовать навигацию к предыдущему уроку
                    // navigateToPreviousLesson();
                  }}
                  // Активация кнопки «Дальше» при первом воспроизведении
                  onContinue={() => setCanContinue(true)}
                  className="vertical-video-container"
                />

                {/* Кнопка «Дальше» */}
                {opts.nextAndPreviousQuestion?.nextQuestion && (
                  <Button
                    onClick={() => router.push(opts.nextAndPreviousQuestion!.nextQuestion!)}
                    disabled={!canContinue}
                    className={`mt-4 px-6 py-3 font-semibold rounded-lg transition-all ${
                      canContinue ? 'bg-accent hover:bg-accent/90 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
                    }`}
                  >
                    Дальше
                  </Button>
                )}
              </div>
            ) : (
              <QuestionTabs
                question={question}
                renderAnswerForm={renderAnswerForm}
                totalSubmissions={totalSubmissions}
              />
            )}
          </>
        )}
        {currentLayout === 'codeSnippet' &&
          question.codeSnippet &&
          !answerHelp &&
          userCanAccess && (
            <>
              {question.questionType === 'CODING_CHALLENGE' ? (
                <CodeEditor />
              ) : (
                <CodeDisplay content={prefilledCodeSnippet || question.codeSnippet} user={user} />
              )}
            </>
          )}
        {answerHelp && currentLayout === 'codeSnippet' && userCanAccess && (
          <AnimatePresence mode="wait">
            <div className="flex flex-col gap-y-4 p-4">
              <h2 className="text-lg font-bold">Answer Help</h2>
              {Object.entries(answerHelp).map(([key, value], index) => (
                <div key={index}>
                  <h3 className="text-md font-bold underline">
                    {capitalize(key.replace(/-/g, ' '))}
                  </h3>
                  <p className="text-gray-200">{value.replace(/```/g, '')}</p>
                </div>
              ))}
            </div>
          </AnimatePresence>
        )}
        {currentLayout === 'answer' && userCanAccess && (
          <>
            {question.questionType === 'CODING_CHALLENGE' ? (
              <CodeEditorQuestionSubmitted />
            ) : (
              userCanAccess && <QuestionSubmitted />
            )}
          </>
        )}
      </div>
      <Separator className="bg-black-50" />
      <div className="w-full space-y-4 bg-black">
        {question.hint && userCanAccess && question.questionType !== 'VIDEO' && (
          <QuestionAccordion
            hint={question.hint}
            showHint={showHint}
            showRelatedQuestions={false}
          />
        )}
      </div>
    </Tabs>
  );
}
