#!/bin/bash

echo "🔧 BizLevel Build Diagnostics"
echo "=============================="

# Тест 1: Проверка версий
echo "📦 Версии пакетов:"
npm list react react-dom @types/react @types/react-dom --depth=0

# Тест 2: Запуск только TypeScript проверки
echo -e "\n🔍 TypeScript проверка:"
timeout 30s npx tsc --noEmit || echo "TypeScript зависло или завершилось с ошибкой"

# Тест 3: Запуск только ESLint
echo -e "\n🔍 ESLint проверка:"
timeout 30s npx next lint || echo "ESLint зависло или завершилось с ошибкой"

# Тест 4: Статический анализ Next.js
echo -e "\n🔍 Next.js анализ:"
timeout 60s npx next build --debug 2>&1 | head -20 || echo "Next.js build зависло"

echo -e "\n✅ Диагностика завершена" 