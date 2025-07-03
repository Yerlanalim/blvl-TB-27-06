// scripts/analyze-db-usage.ts
// Скрипт для анализа использования таблиц Supabase/Prisma в кодовой базе BizLevel
// Использование: `tsx scripts/analyze-db-usage.ts`
// Он выводит отчёт в консоль с количеством совпадений для каждой таблицы
// и сохраняет JSON-отчёт в scripts/db-usage-report.json

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import path from 'path';

// Таблицы, которые необходимо проанализировать (из Stage-8 задачи 8.3.1)
const TABLES = [
  'DefaultRoadmapQuestions',
  'DefaultRoadmapQuestionsAnswers',
  'RoadmapUserQuestions',
  'RoadmapUserQuestionsAnswers',
  'RoadmapUserQuestionsUserAnswers',
  'UserRoadmaps',
  'PseoPages',
  'Mission',
  'UserMission',
];

// Каталоги, в которых ищем упоминания (можно расширить при необходимости)
const SEARCH_DIRS = ['src', 'prisma', 'supabase'];

interface TableReport {
  table: string;
  occurrences: number;
  files: string[];
}

function runRg(pattern: string): string {
  // ripgrep с поиском по указанным каталогам, выводит только названия файлов (уникальные)
  const rgCommand = `rg --files-with-matches --no-messages -e "${pattern}" ${SEARCH_DIRS.join(' ')}`;
  try {
    return execSync(rgCommand, { encoding: 'utf-8' });
  } catch {
    // Если совпадений нет, ripgrep возвращает код 1
    return '';
  }
}

function analyse(): TableReport[] {
  const results: TableReport[] = [];
  for (const table of TABLES) {
    const output = runRg(table);
    const files = output.split('\n').filter(Boolean);
    results.push({ table, occurrences: files.length, files });
  }
  return results;
}

function main() {
  const report = analyse();
  // Сохранить JSON-отчёт
  const targetPath = path.join(__dirname, 'db-usage-report.json');
  writeFileSync(targetPath, JSON.stringify(report, null, 2), 'utf8');

  // Вывести краткий отчёт в консоль
  console.log('\nDB Usage Analysis Report');
  console.log('========================');
  report.forEach((r) => {
    console.log(`${r.table}: ${r.occurrences > 0 ? 'USED' : 'NOT USED'} (${r.occurrences} files)`);
  });
  console.log(`\nПолный отчёт сохранён в ${targetPath}`);
}

main(); 