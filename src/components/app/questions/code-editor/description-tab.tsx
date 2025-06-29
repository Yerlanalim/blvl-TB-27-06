'use client';
import type { Question } from '@/types';
import { useState, useEffect, memo } from 'react';

// markdown to render the question description
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useQuestionSingle } from '@/contexts/question-single-context';
import { use } from 'react';
import HasAnswered from '@/components/app/questions/single/has-answered';
import BookmarkQuestion from '@/components/app/questions/single/bookmark';
import Chip from '@/components/ui/chip';
import { capitalise, getQuestionDifficultyColor } from '@/utils';
import QuestionHintTrigger from '@/components/app/questions/question-hint-trigger';
import ShareQuestion from '@/components/app/shared/question/share-question';

// BIZLEVEL: Динамическая загрузка Highlight компонента для оптимизации bundle
const DynamicCodeHighlight = memo(function DynamicCodeHighlight({
  children,
}: {
  children: string;
}) {
  const [HighlightComponent, setHighlightComponent] = useState<any>(null);
  const [themes, setThemes] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Динамическая загрузка prism-react-renderer только при необходимости
    let mounted = true;
    
    import('prism-react-renderer')
      .then(({ Highlight, themes }) => {
        if (mounted) {
          setHighlightComponent(() => Highlight);
          setThemes(themes);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Показываем простой код блок пока загружается syntax highlighter
  if (isLoading || !HighlightComponent || !themes) {
    return (
      <pre
        style={{
          padding: '1rem',
          fontSize: '0.875rem',
          overflow: 'auto',
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          borderRadius: '0.375rem',
        }}
      >
        <code>{children}</code>
      </pre>
    );
  }

  return (
    <HighlightComponent
      theme={themes.vsDark}
      code={children}
      language="javascript"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
        <pre
          className={className}
          style={{
            ...style,
            padding: '1rem',
            fontSize: '0.875rem',
            overflow: 'auto',
          }}
        >
          {tokens.map((line: any, i: number) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token: any, key: number) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </HighlightComponent>
  );
});

export default function CodingChallengeDescription(opts: { question: Question }) {
  const { question } = opts;

  const { userAnswered, showHint, setShowHint, currentLayout } = useQuestionSingle();

  // Only show previous answer indicator in non-answer modes for regular questions
  const showPreviousAnswerIndicator = currentLayout !== 'answer';

  // Only resolve userAnswered when needed
  const hasUserAnswered = showPreviousAnswerIndicator ? use(userAnswered) : null;

  return (
    <div className="p-4 pt-0 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        {question?.title && (
          <div className="flex flex-col md:flex-row w-full gap-5 md:gap-10 justify-between">
            <h1 className="font-onest font-light text-lg md:text-3xl">{question.title}</h1>
            <div className="flex items-center gap-2 order-first md:order-last">
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
      </div>
      <div className="prose prose-sm prose-invert [&>p+h1]:mt-6 [&>p+h2]:mt-6 [&>p+h3]:mt-6 [&>p+h4]:mt-6 [&>p+h5]:mt-6 [&>p+h6]:mt-6">
        <Markdown
          remarkPlugins={[remarkGfm]}
          className="flex flex-col gap-4"
          components={{
            code: ({ ...props }) => {
              const codeContent = typeof props.children === 'string' ? props.children : '';
              return <DynamicCodeHighlight>{codeContent}</DynamicCodeHighlight>;
            },
            ul: ({ children }) => {
              return <ul className="list-disc px-4 flex flex-col gap-3">{children}</ul>;
            },
            ol: ({ children }) => {
              return <ol className="list-decimal px-4 flex flex-col gap-3">{children}</ol>;
            },
            h1: ({ children }) => {
              return <h1 className="text-2xl font-bold underline">{children}</h1>;
            },
            h2: ({ children }) => {
              return <h2 className="text-xl font-bold underline">{children}</h2>;
            },
            h3: ({ children }) => {
              return <h3 className="text-lg font-bold underline">{children}</h3>;
            },
            h4: ({ children }) => {
              return <h4 className="text-base font-bold underline">{children}</h4>;
            },
            h5: ({ children }) => {
              return <h5 className="text-sm font-bold underline">{children}</h5>;
            },
            h6: ({ children }) => {
              return <h6 className="text-xs font-bold underline">{children}</h6>;
            },
            hr: () => {
              return <hr className="border-b border-black-50 my-4" />;
            },
          }}
        >
          {question.description}
        </Markdown>
      </div>
    </div>
  );
}
