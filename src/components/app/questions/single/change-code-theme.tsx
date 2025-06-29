'use client';

import EditorIcon from '@/components/ui/icons/editor';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectItem, SelectTrigger, SelectContent } from '@/components/ui/select';
import type { UserRecord } from '@/types';

import { useState, useEffect } from 'react';
import { updateUser } from '@/actions/user/authed/update-user';

export default function ChangeCodeTheme({ user }: { user: UserRecord | null }) {
  const [selectedTheme, setSelectedTheme] = useState<string>('vs-dark');
  const [themes, setThemes] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  // BIZLEVEL: Динамическая загрузка themes для оптимизации bundle
  useEffect(() => {
    let mounted = true;
    
    import('prism-react-renderer')
      .then(({ themes }) => {
        if (mounted) {
          setThemes(themes);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          // Fallback themes если загрузка не удалась
          setThemes({
            'vs-dark': {},
            'vs-light': {},
            'github': {},
            'dracula': {},
          });
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (user?.codeEditorTheme) {
      setSelectedTheme(user.codeEditorTheme);
    }
  }, [user]);

  const handleThemeChange = async (theme: string) => {
    console.log('theme', theme);
    setSelectedTheme(theme);
    await updateUser({ userDetails: { codeEditorTheme: theme } });
  };

  if (isLoading) {
    return <EditorIcon />;
  }

  const themeOptions = Object.keys(themes).map((key) => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
  }));

  return (
    <Popover>
      <PopoverTrigger>
        <EditorIcon />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <Select value={selectedTheme} onValueChange={handleThemeChange}>
          <SelectTrigger className="w-[180px]">
            <span className="text-xs">
              {themeOptions.find((theme) => theme.value === selectedTheme)?.label || 'Select theme'}
            </span>
          </SelectTrigger>
          <SelectContent>
            {themeOptions.map((theme) => (
              <SelectItem key={theme.value} value={theme.value}>
                <span className="text-xs">{theme.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  );
}
