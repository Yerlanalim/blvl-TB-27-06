'use client';
import { lazy } from 'react';

import { ReactNode, use, useState } from 'react';
import { Question } from '@/types';

import { TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs';

import QuestionResourceTab from '@/components/app/questions/resources/question-resource-tab';
import QuestionStatsTab from './question-stats-tab';
import LessonMaterials from '@/components/app/questions/resources/lesson-materials';
import { shouldShowLessonMaterials, getLevelTitle } from '@/utils/business-lesson-helpers';

const CodingChallengeDescription = lazy(
  () => import('@/components/app/questions/code-editor/description-tab')
);
const QuestionHintTrigger = lazy(() => import('@/components/app/questions/question-hint-trigger'));
const ShareQuestion = lazy(() => import('@/components/app/shared/question/share-question'));
const HasAnswered = lazy(() => import('@/components/app/questions/single/has-answered'));
import { useQuestionSingle } from '@/contexts/question-single-context';
import BookmarkQuestion from '@/components/app/questions/single/bookmark';
import { capitalise } from '@/utils';
import Chip from '@/components/ui/chip';
import { getQuestionDifficultyColor } from '@/utils';
import { BarChart, BookIcon, PieChart } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { FileIcon, FileText } from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading';

interface QuestionTabsProps {
  question: Question;
  renderAnswerForm: () => ReactNode;
  totalSubmissions?: {
    totalSubmissions: number;
    percentageCorrect: number;
  };
}

export default function QuestionTabs({
  question,
  renderAnswerForm,
  totalSubmissions,
}: QuestionTabsProps) {
  const { userAnswered, showHint, setShowHint, isSubmitting, currentLayout } = useQuestionSingle();

  const [activeTab, setActiveTab] = useState<'description' | 'resources' | 'stats'>('description');

  // Only show previous answer indicator in non-answer modes for regular questions
  // For roadmap questions (when currentLayout is 'questions'), don't resolve userAnswered
  const showPreviousAnswerIndicator = currentLayout !== 'answer';

  // Only resolve userAnswered when needed
  const hasUserAnswered = showPreviousAnswerIndicator ? use(userAnswered || false) : null;

  // BIZLEVEL: Определяем нужно ли показывать материалы
  const showMaterials = shouldShowLessonMaterials(question);
  const levelTitle = getLevelTitle(question);

  if (isSubmitting) {
    return (
      <div className="h-[25rem] absolute flex justify-center items-center w-full z-50">
        <div className="gap-y-3 flex flex-col items-center">
          <LoadingSpinner />
          <p className="text-sm">Submitting</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* BIZLEVEL: Скрываем мобильные вкладки для VIDEO типа */}
      {question.questionType !== 'VIDEO' && (
        <TabsList className="p-4 grid lg:hidden h-auto w-full place-items-center grid-cols-3 gap-5 text-white rounded-lg bg-transparent">
          <TabsTrigger
            value="description"
            onClick={() => setActiveTab('description')}
            className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:underline border-0 w-fit px-0"
          >
            <div className="mr-2 hidden md:block">
              {activeTab === 'description' ? (
                <FileText className="size-4" />
              ) : (
                <FileIcon className="size-4" />
              )}
            </div>
            Description
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            onClick={() => setActiveTab('resources')}
            className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:underline border-0 w-fit px-0"
          >
            <div className="mr-2 hidden md:block">
              {activeTab === 'resources' ? (
                <BookOpen className="size-4" />
              ) : (
                <BookIcon className="size-4" />
              )}
            </div>
            Resources
          </TabsTrigger>
          <TabsTrigger
            value="stats"
            onClick={() => setActiveTab('stats')}
            className="flex items-center justify-center text-sm font-medium transition-colors rounded-md text-gray-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:underline border-0 w-fit px-0"
          >
            <div className="mr-2 hidden md:block">
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
      <TabsContent value="description" className="pt-2 lg:pt-4">
        {question.questionType === 'CODING_CHALLENGE' ? (
          <CodingChallengeDescription question={question} />
        ) : question.questionType === 'VIDEO' ? (
          // BIZLEVEL: Для VIDEO типа показываем описание урока
          <div className="flex flex-col gap-4 p-4 pt-0">
            {question?.title && (
              <h1 className="font-onest font-light text-lg md:text-3xl">{question.title}</h1>
            )}
            <div className="flex w-full gap-2 items-center">
              <Chip
                color={getQuestionDifficultyColor(question.difficulty).bg}
                text={capitalise(question.difficulty)}
                textColor={getQuestionDifficultyColor(question.difficulty).text}
                border={getQuestionDifficultyColor(question.difficulty).border}
              />
              <Chip
                color="#22c55e33"
                text="Видео урок"
                textColor="#22c55e"
                border="#22c55e"
              />
            </div>
            <p className="text-sm text-gray-400 font-light font-onest mt-3">{question.question}</p>
            
            {/* BIZLEVEL: Показываем материалы только на последнем уроке уровня */}
            {showMaterials && (
              <LessonMaterials 
                resources={question.QuestionResources} 
                levelTitle={levelTitle}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4 pt-0">
            {question?.title && (
              <div className="flex w-full gap-10 justify-between">
                <h1 className="font-onest font-light text-lg md:text-3xl">{question.title}</h1>
                <div className="flex items-center gap-2">
                  <QuestionHintTrigger showHint={showHint} setShowHint={setShowHint} />
                  <ShareQuestion />
                  <BookmarkQuestion question={question} />
                </div>
              </div>
            )}
            <div className="flex flex-wrap md:flex-nowrap w-full justify-between gap-5">
              <div className="flex w-full gap-2 items-center">
                <Chip
                  color={getQuestionDifficultyColor(question.difficulty).bg}
                  text={capitalise(question.difficulty)}
                  textColor={getQuestionDifficultyColor(question.difficulty).text}
                  border={getQuestionDifficultyColor(question.difficulty).border}
                />
                {showPreviousAnswerIndicator && <HasAnswered userAnswered={hasUserAnswered} />}
              </div>
            </div>
            <p className="text-sm text-gray-400 font-light font-onest mt-3">{question.question}</p>
            {renderAnswerForm()}
            
            {/* BIZLEVEL: Показываем материалы только на последнем уроке уровня */}
            {showMaterials && (
              <LessonMaterials 
                resources={question.QuestionResources} 
                levelTitle={levelTitle}
              />
            )}
          </div>
        )}
      </TabsContent>
      <TabsContent value="resources" className="p-4">
        <h3 className="font-inter font-light text-lg md:text-2xl">
          Дополнительные ресурсы для изучения
        </h3>
        <QuestionResourceTab
          resources={question.QuestionResources}
          reference={question.slug || undefined}
        />
      </TabsContent>
      <TabsContent value="stats" className="p-4">
        <QuestionStatsTab totalSubmissions={totalSubmissions} />
      </TabsContent>
    </>
  );
}
