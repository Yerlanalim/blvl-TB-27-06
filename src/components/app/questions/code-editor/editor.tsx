'use client';

import React, { useState, memo, useEffect, Suspense, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/ui/loading';
import { useQuestionSingle } from '@/contexts/question-single-context';
// BIZLEVEL: Заменяем lodash на нативную JS функцию
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
import { AnimatePresence, motion } from 'framer-motion';
import { BUSINESS_FACTS } from '@/utils/constants/business-facts';
import { useLocalStorage } from '@/hooks/use-local-storage';

// Динамическая загрузка Monaco Editor только когда нужен
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react').then(mod => ({ default: mod.Editor })),
  {
    ssr: false,
    loading: () => <LoadingState />
  }
);

// BIZLEVEL: Улучшенный lazy loading с предзагрузкой
const LazyMonacoWrapper = memo(function LazyMonacoWrapper({
  onMount,
  children,
  ...props
}: {
  onMount?: () => void;
  children?: React.ReactNode;
  [key: string]: any;
}) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Предзагрузка Monaco при наведении или фокусе
  const handlePreload = useCallback(() => {
    if (!isPreloaded) {
      setIsPreloaded(true);
      // Предзагружаем Monaco Editor без рендера
      import('@monaco-editor/react').then(() => {
        console.log('Monaco Editor предзагружен');
      }).catch(() => {
        // Игнорируем ошибки предзагрузки
        console.warn('Не удалось предзагрузить Monaco Editor');
      });
    }
  }, [isPreloaded]);

  // Активация загрузки при взаимодействии
  const handleActivate = useCallback(() => {
    setShouldLoad(true);
    onMount?.();
  }, [onMount]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Предзагрузка при наведении
    container.addEventListener('mouseenter', handlePreload);
    container.addEventListener('focus', handlePreload);
    
    // Активация при клике
    container.addEventListener('click', handleActivate);

    return () => {
      container.removeEventListener('mouseenter', handlePreload);
      container.removeEventListener('focus', handlePreload);
      container.removeEventListener('click', handleActivate);
    };
  }, [handlePreload, handleActivate]);

  return (
    <div ref={containerRef} className="w-full relative">
      {shouldLoad ? (
        <Suspense fallback={<LoadingState />}>
          <MonacoEditor {...props} />
        </Suspense>
      ) : (
        <div 
          className="w-full h-[90vh] bg-black-75 border border-black-50 rounded-xl flex items-center justify-center cursor-pointer hover:bg-black-50 transition-colors"
          onClick={handleActivate}
        >
          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Редактор кода</h3>
            <p className="text-gray-400 text-sm mb-4">Нажмите для загрузки интерактивного редактора</p>
            <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors">
              Загрузить редактор
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

// memo the LoadingState component to prevent re-renders
const LoadingState = memo(function LoadingState() {
  // Use useState instead of useMemo to persist the random fact between re-renders
  const [randomFact] = useState(
    () => BUSINESS_FACTS[Math.floor(Math.random() * BUSINESS_FACTS.length)]
  );

  return (
    <div className="w-full relative flex flex-col items-center justify-center max-w-xl px-10">
      <LoadingSpinner />
      {/** a random coding fact */}
      <div className="flex flex-col items-center justify-center">
        <h6 className="text-gray-200 text-center">Did you know?</h6>
        <p className="text-gray-200 text-center">{randomFact}</p>
      </div>
    </div>
  );
});

export default function CodeEditor() {
  const { code, setCode, answerHelp, user, question } = useQuestionSingle();
  const [parsedAnswerHelp, setParsedAnswerHelp] = useState<Record<string, any>>({});
  const [monaco, setMonaco] = useState<any>(null);
  const { value: savedLocalStorageCode, setValue: setSavedLocalStorageCode } = useLocalStorage({
    key: question.slug ? `challenge-${question.slug}` : '',
    defaultValue: '',
  });

  const userCanAccess = question.isPremiumQuestion ? user?.userLevel !== 'FREE' : true;

  // Динамическая загрузка Monaco API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@monaco-editor/react').then(({ useMonaco }) => {
        const monacoInstance = useMonaco();
        setMonaco(monacoInstance);
      });
    }
  }, []);

  // if the user has code in local storage, set it on init
  useEffect(() => {
    if (savedLocalStorageCode) {
      setCode(savedLocalStorageCode);
    }
  }, [savedLocalStorageCode, setCode]);

  // Parse answer help when available
  useEffect(() => {
    if (!answerHelp) return;

    try {
      const parsed = JSON.parse(answerHelp);
      setParsedAnswerHelp(parsed);
    } catch (error) {
      console.error('Failed to parse answer help:', error);
      setParsedAnswerHelp({ error: 'Failed to parse answer help' });
    }
  }, [answerHelp]);

  // Настройка темы Monaco
  useEffect(() => {
    if (monaco?.editor) {
      monaco.editor.defineTheme('vs-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        encodedTokensColors: [],
        colors: {
          'editor.background': '#0e0e0e',
        },
      });
    }
  }, [monaco]);

  if (answerHelp) {
    return (
      <AnimatePresence mode="wait">
        <div className="flex flex-col gap-y-4 p-4">
          <h2 className="text-lg font-bold">Answer Help</h2>
          {Object.entries(parsedAnswerHelp).map(([key, value], idx) => (
            <motion.div
              key={idx}
              className="mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {Object.keys(parsedAnswerHelp).length > 1 && (
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

  return (
    <div className="w-full relative">
      <LazyMonacoWrapper
        onMount={() => {
          // This function is called when the Monaco Editor is mounted
        }}
        height="90vh"
        defaultLanguage="javascript"
        value={userCanAccess ? code : ''}
        onChange={(value: string | undefined) => {
          // update the code in the editor
          setCode(value || '');
          // update the code in local storage
          setSavedLocalStorageCode(value || '');
        }}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          guides: {
            indentation: true,
            bracketPairs: true,
            bracketPairsHorizontal: true,
            highlightActiveBracketPair: true,
            highlightActiveIndentation: true,
          },
        }}
      />
    </div>
  );
}
