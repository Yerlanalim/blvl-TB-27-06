'use client';
import React, { memo, useState, useEffect } from 'react';
import type { UserRecord } from '@/types';
import LoadingSpinner from '@/components/ui/loading';

interface CodeDisplayProps {
  content: string;
  language?: string;
  backgroundColor?: string;
  hideIndex?: boolean;
  user?: UserRecord | null;
}

// BIZLEVEL: Динамическая загрузка Highlight компонента для оптимизации bundle
const DynamicHighlight = memo(function DynamicHighlight({
  content,
  language,
  backgroundColor,
  hideIndex,
  user,
}: CodeDisplayProps) {
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

  // Clean the content by removing pre and code tags
  const cleanContent = content
    ?.replace(/<pre><code[^>]*>/g, '')
    ?.replace(/<\/code><\/pre>/g, '')
    ?.replace(/=&gt;/g, '=>')
    ?.replace(/&lt;/g, '<')
    ?.replace(/&gt;/g, '>')
    ?.trim();

  if (!cleanContent) {
    return null;
  }

  // Показываем простой код блок пока загружается syntax highlighter
  if (isLoading || !HighlightComponent || !themes) {
    return (
      <div className="relative">
        <pre
          className="overflow-x-auto p-4 h-full text-wrap text-sm"
          style={{ background: backgroundColor || '#111111' }}
        >
          <code className="text-gray-300 font-mono">
            {cleanContent.split('\n').map((line, lineIndex) => (
              <div key={lineIndex} className="table-row">
                {!hideIndex && (
                  <span className="table-cell text-gray-500 pr-4 select-none text-right text-xs">
                    {lineIndex + 1}
                  </span>
                )}
                <span className="table-cell text-sm">{line}</span>
              </div>
            ))}
          </code>
        </pre>
        {isLoading && (
          <div className="absolute top-2 right-2">
            <LoadingSpinner />
          </div>
        )}
      </div>
    );
  }

  return (
    <HighlightComponent
      theme={themes[user?.codeEditorTheme as keyof typeof themes] || themes.vsDark}
      code={cleanContent}
      language={language || 'javascript'}
    >
      {({ style, tokens, getLineProps, getTokenProps }: any) => (
        <pre
          className="overflow-x-auto p-4 h-full text-wrap"
          style={{ ...style, background: backgroundColor }}
        >
          {tokens.map((line: any, lineIndex: number) => (
            <div key={lineIndex} {...getLineProps({ line })} className="table-row">
              {!hideIndex && (
                <span className="table-cell text-gray-500 pr-4 select-none text-right text-sm">
                  {lineIndex + 1}
                </span>
              )}
              <span className="table-cell text-sm">
                {line.map((token: any, tokenIndex: number) => (
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </HighlightComponent>
  );
});

const CodeDisplay = memo(function CodeDisplay(props: CodeDisplayProps) {
  return <DynamicHighlight {...props} />;
});

export default CodeDisplay;
