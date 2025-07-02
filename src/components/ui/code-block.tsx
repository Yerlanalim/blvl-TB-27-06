'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { Check, Copy, File } from 'lucide-react';
import JavascriptIcon from './icons/javascript';
import TypescriptIcon from './icons/typescript';
import CssIcon from './icons/css';
import HtmlIcon from './icons/html';

const Icons = {
  check: Check,
  copy: Copy,
  file: File,
  javascript: JavascriptIcon,
  typescript: TypescriptIcon,
  css: CssIcon,
  html: HtmlIcon,
};

interface FileBlock {
  title: string;
  code: string;
  language?: string;
}

interface CodeBlockProps {
  files: FileBlock[];
  defaultTitle?: string;
  className?: string;
}

// BIZLEVEL: Динамическая загрузка SyntaxHighlighter для оптимизации bundle
function DynamicSyntaxHighlighter({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const [SyntaxHighlighter, setSyntaxHighlighter] = useState<any>(null);
  const [nightOwl, setNightOwl] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    Promise.all([
      import('react-syntax-highlighter').then(module => module.Prism),
      import('react-syntax-highlighter/dist/esm/styles/prism').then(module => module.nightOwl)
    ])
      .then(([SyntaxHighlighterComponent, nightOwlTheme]) => {
        if (mounted) {
          setSyntaxHighlighter(() => SyntaxHighlighterComponent);
          setNightOwl(nightOwlTheme);
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
  if (isLoading || !SyntaxHighlighter || !nightOwl) {
    return (
      <div className="h-full overflow-auto p-4">
        <pre
          style={{
            margin: 0,
            background: 'transparent',
            fontSize: '0.9rem',
            color: 'hsl(var(--foreground))',
          }}
        >
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  const lightTheme = {
    ...nightOwl,
    'pre[class*="language-"]': {
      ...nightOwl['pre[class*="language-"]'],
      background: 'transparent',
    },
    'code[class*="language-"]': {
      ...nightOwl['code[class*="language-"]'],
      color: 'hsl(var(--foreground))',
    },
    comment: {
      color: 'hsl(var(--muted-foreground))',
      fontStyle: 'italic',
    },
    punctuation: {
      color: 'hsl(var(--foreground))',
    },
    property: {
      color: '#0550FF',
    },
    string: {
      color: '#14532D',
    },
    keyword: {
      color: '#9333EA',
    },
    function: {
      color: '#E45C3A',
    },
    boolean: {
      color: '#9333EA',
    },
    number: {
      color: '#9333EA',
    },
    operator: {
      color: 'hsl(var(--foreground))',
    },
  };

  const darkTheme = {
    ...nightOwl,
    'pre[class*="language-"]': {
      ...nightOwl['pre[class*="language-"]'],
      background: 'transparent',
    },
  };

  return (
    <div className="h-full overflow-auto">
      <SyntaxHighlighter
        language={language}
        style={document.documentElement.classList.contains('dark') ? darkTheme : lightTheme}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          fontSize: '0.9rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export function CodeBlock({ files, defaultTitle, className }: CodeBlockProps) {
  const [activeTitle, setActiveTitle] = useState(defaultTitle || files[0]?.title);
  const [copied, setCopied] = useState(false);

  const activeFile = files.find((file) => file.title === activeTitle);
  const code = activeFile?.code || '';
  const language = activeFile?.language || getLanguageFromFileName(activeTitle || '');

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      className={cn(
        'relative rounded-lg border border-black-50 bg-card text-card-foreground',
        'backdrop-blur-md',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-black-50 px-4 py-2">
        <div className="flex gap-2 bg-black">
          {files.map(({ title }) => (
            <Button
              key={title}
              variant={title === activeTitle ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTitle(title)}
              className="gap-2"
            >
              <FileIcon fileName={title} />
              <span className="text-white">{title}</span>
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => copyToClipboard(code)}
          className="h-8 w-8 text-zinc-400 hover:text-white"
        >
          <motion.div
            animate={{ rotate: copied ? 360 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {copied ? <Icons.check className="h-4 w-4" /> : <Icons.copy className="h-4 w-4" />}
          </motion.div>
        </Button>
      </div>
      <div className="max-h-[400px] overflow-auto">
        <DynamicSyntaxHighlighter code={code} language={language} />
      </div>
    </div>
  );
}

function getLanguageFromFileName(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'css':
      return 'css';
    case 'html':
      return 'html';
    case 'json':
      return 'json';
    case 'md':
      return 'markdown';
    case 'txt':
    case 'text':
      return 'text';
    // BIZLEVEL: По умолчанию текстовый контент вместо JavaScript
    default:
      return 'text';
  }
}

function FileIcon({ fileName }: { fileName: string }) {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'js':
    case 'jsx':
      return <Icons.javascript className="h-4 w-4" />;
    case 'ts':
    case 'tsx':
      return <Icons.typescript className="h-4 w-4" />;
    case 'css':
      return <Icons.css className="h-4 w-4" />;
    case 'html':
      return <Icons.html className="h-4 w-4" />;
    case 'txt':
    case 'text':
    case 'md':
    case 'json':
      // BIZLEVEL: Для бизнес-контента используем файловую иконку
      return <Icons.file className="h-4 w-4" />;
    default:
      return <Icons.file className="h-4 w-4" />;
  }
}
