import React from 'react';

export default function PlaygroundPage() {
  // BIZLEVEL: Заглушка для Code Playground - раздел отключен для бизнес-версии
  return (
    <div className="flex items-center justify-center min-h-screen bg-black-75">
      <div className="text-center p-8 border border-black-50 rounded-lg bg-black-100 max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">
          Раздел в разработке
        </h2>
        <p className="text-gray-400">
          Эта функция появится в следующих обновлениях
        </p>
      </div>
    </div>
  );
} 