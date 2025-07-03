'use client';

import React, { useState, useEffect, memo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
// BIZLEVEL: Заменяем lodash на нативную JS функцию
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
import type { z } from 'zod';
import type { answerHelpSchema } from '@/lib/zod/schemas/ai/answer-help';
import type { Question, RoadmapUserQuestions, UserRecord, RoadmapQuestionWithAnswers } from '@/types';
import CodeDisplay from '@/components/app/layout/question-single/code-snippet';
import LoadingSpinner from '@/components/ui/loading';
import { DefaultRoadmapQuestions } from '@prisma/client';
import TestCaseSection from '../../questions/code-editor/test-case-section';

// Динамическая загрузка Monaco Editor только когда нужен
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react').then(mod => ({ default: mod.Editor })),
  {
    ssr: false,
    loading: () => <LoadingSpinner />
  }
);

// BIZLEVEL: Компонент для условного рендера Monaco Editor с оптимизацией
const ConditionalMonacoEditor = memo(function ConditionalMonacoEditor({
  isEditable,
  codeSnippet,
  onCodeChange,
  user
}: {
  isEditable: boolean;
  codeSnippet: string;
  onCodeChange: (value: string) => void;
  user: UserRecord | null;
}) {
  // Если не редактируемый, используем обычный CodeDisplay
  if (!isEditable) {
    return <CodeDisplay content={codeSnippet} user={user} backgroundColor="#111111" />;
  }

  // Для редактируемого кода загружаем Monaco только при необходимости
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MonacoEditor
        height="83vh"
        language="javascript"
        value={codeSnippet}
        onChange={(value: string | undefined) => onCodeChange(value || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          guides: {
            indentation: true,
            bracketPairs: true,
            bracketPairsHorizontal: true,
            highlightActiveBracketPair: true,
            highlightActiveIndentation: true,
          },
          // Оптимизации для производительности
          wordWrap: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          renderLineHighlight: 'line',
          contextmenu: false, // Отключаем контекстное меню для упрощения
        }}
        className="bg-black-50 !overflow-y-auto !scrollable-element"
      />
    </Suspense>
  );
});

type QuestionCodeDisplayProps = {
  user: UserRecord | null;
  answerHelp?: z.infer<typeof answerHelpSchema> | null;
  question: Question | RoadmapUserQuestions | DefaultRoadmapQuestions | RoadmapQuestionWithAnswers;
  prefilledCodeSnippet?: string | null;
  isEditable?: boolean;
  onCodeChange?: (code: string) => void;
  currentLayout?: 'question' | 'answer';
};

const QuestionCodeDisplay = memo(function QuestionCodeDisplay({
  user,
  answerHelp,
  question,
  prefilledCodeSnippet,
  isEditable = false,
  onCodeChange,
  currentLayout = 'question',
}: QuestionCodeDisplayProps) {
  const [codeSnippet, setCodeSnippet] = useState<string | null>(
    prefilledCodeSnippet || question?.codeSnippet || ''
  );

  useEffect(() => {
    if (prefilledCodeSnippet) {
      setCodeSnippet(prefilledCodeSnippet);
    } else {
      setCodeSnippet(question?.codeSnippet || '');
    }
  }, [prefilledCodeSnippet, question?.codeSnippet]);

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || '';
    setCodeSnippet(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  if (answerHelp) {
    return (
      <AnimatePresence mode="wait">
        <div className="flex flex-col gap-y-4 p-4">
          <h2 className="text-lg font-bold">Answer Help</h2>
          {Object.entries(answerHelp).map(([key, value], idx) => (
            <motion.div
              key={idx}
              className="mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {Object.keys(answerHelp).length > 1 && (
                <h3 className="text-xs font-bold">{capitalize(key.replace(/-/g, ' '))}</h3>
              )}
              {typeof value === 'string' ? (
                <p>{value.replace(/```/g, '')}</p>
              ) : (
                <pre className="text-xs overflow-x-auto">{JSON.stringify(value, null, 2)}</pre>
              )}
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    );
  }

  if (currentLayout === 'answer') {
    return (
      <div className="w-full relative">
        <TestCaseSection />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto scrollable-element">
      <AnimatePresence mode="wait">
        {codeSnippet && (
          <motion.div
            key={codeSnippet}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <ConditionalMonacoEditor
              isEditable={isEditable}
              codeSnippet={codeSnippet}
              onCodeChange={handleCodeChange}
              user={user}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default QuestionCodeDisplay;
