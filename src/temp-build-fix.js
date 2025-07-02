// Временный фикс для быстрой сборки проекта
// Заменяет проблемные импорты Monaco на заглушки

const fs = require('fs');
const path = require('path');

const problematicFiles = [
  'src/components/app/questions/code-editor.tsx',
  'src/components/app/questions/monaco-editor-wrapper.tsx',
];

const monacoStub = `
// ВРЕМЕННАЯ ЗАГЛУШКА ДЛЯ СБОРКИ
import React from 'react';

export default function MonacoEditorStub() {
  return (
    <div className="p-4 border rounded bg-gray-50">
      <p>Monaco Editor временно отключен для решения проблем сборки</p>
    </div>
  );
}
`;

function createBackup(filePath) {
  if (fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, filePath + '.backup');
    console.log(`Создан бэкап: ${filePath}.backup`);
  }
}

function replaceWithStub(filePath) {
  if (fs.existsSync(filePath)) {
    createBackup(filePath);
    fs.writeFileSync(filePath, monacoStub);
    console.log(`Заменен на заглушку: ${filePath}`);
  }
}

function restoreFromBackup(filePath) {
  const backupPath = filePath + '.backup';
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, filePath);
    fs.unlinkSync(backupPath);
    console.log(`Восстановлен из бэкапа: ${filePath}`);
  }
}

// Экспортируем функции
module.exports = {
  createStubs: () => problematicFiles.forEach(replaceWithStub),
  restoreFiles: () => problematicFiles.forEach(restoreFromBackup)
};

// Если запущен напрямую
if (require.main === module) {
  const action = process.argv[2];
  if (action === 'create') {
    module.exports.createStubs();
  } else if (action === 'restore') {
    module.exports.restoreFiles();
  } else {
    console.log('Использование: node temp-build-fix.js [create|restore]');
  }
} 