import React from 'react';
import { themes } from 'prism-react-renderer';

interface CodeEditorPreviewProps {
  theme: keyof typeof themes;
}

// BIZLEVEL: Заглушка для code preview - редактор кода скрыт для бизнес-версии
export default function CodeEditorPreview({ theme }: CodeEditorPreviewProps) {
  return (
    <div className="w-full max-w-md rounded-md overflow-hidden bg-black-75 border border-black-50 p-4">
      <div className="text-center text-gray-400">
        <h3 className="text-sm font-medium mb-2">Настройка темы оформления</h3>
        <p className="text-xs">Выбранная тема: {theme}</p>
      </div>
    </div>
  );
}
