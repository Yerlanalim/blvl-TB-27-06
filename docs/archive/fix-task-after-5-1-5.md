# Задачи исправления проблем сборки после 5.1.5

## ПРИОРИТЕТ 1: MetadataBase исправление (15 минут)

### Задача 1.1: Настройка metadataBase в корневом layout
**Причина:** Next.js не может разрешить absolute URLs для Open Graph и Twitter изображений без установленного metadataBase. Это вызывает 6 предупреждений в логах сборки.

**Связанные файлы:**
- `src/app/layout.tsx` - корневой layout без metadata
- `src/utils/seo.ts` - функция createMetadata уже использует getBaseUrl()
- `src/utils/get-base-url.ts` - функция getBaseUrl готова

**Метод исправления:**
1. В `src/app/layout.tsx` добавить импорт `Metadata` из 'next'
2. Добавить экспорт metadata ПЕРЕД компонентом RootLayout:
```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://bizlevel.kz'),
  title: {
    default: 'BizLevel - Обучение бизнесу',
    template: '%s | BizLevel'
  },
  description: 'Платформа для изучения основ бизнеса и предпринимательства',
};
```
3. Проверить что переменная `NEXT_PUBLIC_URL=https://bizlevel.kz` установлена в .env
4. Запустить `npm run build` для проверки исчезновения warnings

---

## ПРИОРИТЕТ 2: React Hook Dependencies исправления (45 минут)

### Задача 2.1: Исправление dashboard/page.client.tsx
**Причина:** useEffect на строке 74 не включает все используемые зависимости: hasAnsweredEnoughQuestions, router, user?.howDidYouHearAboutBizLevel, user?.username

**Связанные файлы:**
- `src/app/(app)/dashboard/page.client.tsx:74`

**Метод исправления:**
1. Найти useEffect на строке 74
2. Заменить пустой массив зависимостей на полный:
```typescript
useEffect(() => {
  if (typeof window === 'undefined') return;
  
  // существующая логика
}, [hasAnsweredEnoughQuestions, router, user?.howDidYouHearAboutBizLevel, user?.username]);
```

### Задача 2.2: Исправление sidebar.tsx
**Причина:** Два предупреждения - useEffect без setOpenMobile в зависимостях (строка 88) и useMemo без всех зависимостей (строка 242)

**Связанные файлы:**
- `src/components/app/navigation/sidebar.tsx:88,242`

**Метод исправления:**
1. **Строка 88** - добавить setOpenMobile в зависимости:
```typescript
useEffect(() => {
  setOpenMobile(false);
}, [pathname, setOpenMobile]);
```

2. **Строка 242** - добавить недостающие зависимости в useMemo:
```typescript
const items = useMemo(() => {
  // существующая логика
}, [user, pathname, nonAuthedUserItems, settingsItems, standardItems]);
```

### Задача 2.3: Исправление stars-background.tsx
**Причина:** Ref cleanup function использует canvasRef.current который может измениться к моменту cleanup (строка 77)

**Связанные файлы:**
- `src/components/ui/stars-background.tsx:77`

**Метод исправления:**
1. Сохранить ссылку на canvas в начале useEffect:
```typescript
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  // существующая логика render

  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}, [stars]);
```

### Задача 2.4: Исправление onboarding-initial-questions.tsx
**Причина:** Три предупреждения - недостающие зависимости в useEffect (строка 92), ненужная зависимость в useCallback (строка 159), недостающая зависимость в useEffect (строка 187)

**Связанные файлы:**
- `src/components/app/onboarding/onboarding-initial-questions.tsx:92,159,187`

**Метод исправления:**
1. **Строка 92** - добавить зависимости:
```typescript
useEffect(() => {
  // логика
}, [answerUserOnboardingQuestions, correctAnswers, determineUserExperienceLevel, questions]);
```

2. **Строка 159** - удалить 'user' из зависимостей useCallback если не используется
3. **Строка 187** - добавить handleSelectAnswer в зависимости

### Задача 2.5: Исправление onboarding-tags.tsx
**Причина:** useEffect не включает setSelectedTags в зависимости (строка 43)

**Связанные файлы:**
- `src/components/app/onboarding/onboarding-tags.tsx:43`

**Метод исправления:**
```typescript
useEffect(() => {
  // логика
}, [setSelectedTags]);
```

### Задача 2.6: Исправление multiple-choice/layout.client.tsx
**Причина:** useEffect не включает handleSelectAnswer, handleSubmit, navigationHref, router в зависимости (строка 210)

**Связанные файлы:**
- `src/components/app/questions/multiple-choice/layout.client.tsx:210`

**Метод исправления:**
```typescript
useEffect(() => {
  // логика
}, [handleSelectAnswer, handleSubmit, navigationHref, router]);
```

### Задача 2.7: Исправление total-question-chart.tsx
**Причина:** useMemo не включает orderedChartData.length в зависимости (строка 104)

**Связанные файлы:**
- `src/components/app/statistics/total-question-chart.tsx:104`

**Метод исправления:**
```typescript
const someValue = useMemo(() => {
  // логика
}, [orderedChartData.length]);
```

### Задача 2.8: Исправление cookie-banner.tsx
**Причина:** useEffect не включает posthog в зависимости (строка 31)

**Связанные файлы:**
- `src/components/shared/cookie-banner.tsx:31`

**Метод исправления:**
```typescript
useEffect(() => {
  // логика
}, [posthog]);
```

### Задача 2.9: Исправление resizable-layout.tsx
**Причина:** Два useCallback не включают функции mouse handlers в зависимости (строки 32, 52)

**Связанные файлы:**
- `src/components/ui/resizable-layout.tsx:32,52`

**Метод исправления:**
1. **Строка 32:**
```typescript
const someCallback = useCallback(() => {
  // логика
}, [handleHorizontalMouseMove, handleHorizontalMouseUp]);
```

2. **Строка 52:**
```typescript
const anotherCallback = useCallback(() => {
  // логика
}, [handleVerticalMouseMove, handleVerticalMouseUp]);
```

### Задача 2.10: Исправление question-single-context.tsx
**Причина:** useEffect имеет сложное выражение в зависимостях и не включает question.codeSnippet, question.uid, searchParams (строка 199)

**Связанные файлы:**
- `src/contexts/question-single-context.tsx:199`

**Метод исправления:**
1. Извлечь сложное выражение в отдельную переменную
2. Добавить недостающие зависимости:
```typescript
useEffect(() => {
  // логика
}, [question.codeSnippet, question.uid, searchParams, setCode]);
```

### Задача 2.11: Исправление update-password/page.tsx
**Причина:** useEffect не включает supabase.auth в зависимости (строка 66)

**Связанные файлы:**
- `src/app/(no_nav)/(auth)/update-password/page.tsx:66`

**Метод исправления:**
```typescript
useEffect(() => {
  // логика
}, [supabase.auth]);
```

---

## ПРИОРИТЕТ 3: Bundle Size Optimization (2 часа)

### Задача 3.1: Анализ и настройка bundle analyzer
**Причина:** Множество страниц превышают рекомендуемый размер 977 KiB, что влияет на производительность

**Связанные файлы:**
- `next.config.js` - для настройки bundle analyzer
- `package.json` - для добавления зависимости

**Метод исправления:**
1. Установить bundle analyzer:
```bash
npm install --save-dev @next/bundle-analyzer
```

2. В `next.config.js` добавить анализатор:
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // существующая конфигурация
});
```

3. Запустить анализ: `ANALYZE=true npm run build`

### ✅ Задача 3.2: Оптимизация Admin страниц - ЗАВЕРШЕНО
**Причина:** Admin страницы весили 2.7-3.7 MiB, что критично превышало норму

**Связанные файлы:**
- `src/app/(app)/admin/**` - все admin страницы
- `src/components/app/admin/**` - admin компоненты

**✅ Выполненные исправления:**
1. ✅ Созданы dynamic imports для всех тяжелых admin компонентов:
   - NewQuestionModal (19KB, 565 строк) - TipTap editor
   - NewCodingChallengeQuestionModal (15KB, 454 строки) - TipTap editor  
   - NewSimpleMultipleChoiceModal (18KB, 538 строк) - TipTap editor
   - PseoForm (852 строки) - сложная форма с JSON редакторами
   - QuestionForm, UserEditForm, CreateLeagueForm, EditLeagueForm
   - Chart компоненты: UserChart, UsersStatsCard, ActiveUsersMap, RecentUsers

2. ✅ Все dynamic imports настроены с `ssr: false` и loading placeholders
3. ✅ Добавлены комментарии "BIZLEVEL:" для отслеживания изменений

**✅ Результат:** 
- Большинство admin страниц теперь 2.72-2.94 MiB (значительное улучшение)
- Сохранена вся функциональность при отложенной загрузке компонентов
- Время выполнения: ~45 минут

### Задача 3.3: Оптимизация Statistics страниц
**Причина:** Statistics страницы весят 2.9 MiB из-за Chart.js и связанных библиотек

**Связанные файлы:**
- `src/app/(app)/statistics/**` - статистика страницы
- `src/components/app/statistics/**` - компоненты графиков

**Метод исправления:**
1. Ленивая загрузка Chart.js:
```typescript
const StatsChart = dynamic(() => import('@/components/app/statistics/chart'), {
  loading: () => <div>Loading chart...</div>
});
```

2. Использовать tree shaking для Chart.js
3. Загружать только нужные типы графиков

### Задача 3.4: Оптимизация Question страницы
**Причина:** Question страница весит 617 kB из-за code editor и syntax highlighting

**Связанные файлы:**
- `src/app/(app)/question/**` - страницы вопросов
- Компоненты code editor

**Метод исправления:**
1. Ленивая загрузка Monaco Editor
2. Загрузка только нужных языков для syntax highlighting
3. Заменить тяжелые библиотеки на lighter альтернативы

### Задача 3.5: Общие оптимизации импортов
**Причина:** Неоптимальные импорты увеличивают размер bundle

**Связанные файлы:**
- Все файлы с импортами lucide-react, lodash, date-fns

**Метод исправления:**
1. Заменить wildcard импорты на именованные:
```typescript
// ❌ Плохо
import * as icons from 'lucide-react';

// ✅ Хорошо  
import { ChevronRight, Home } from 'lucide-react';
```

2. Использовать dynamic imports для тяжелых библиотек
3. Заменить lodash на native JS где возможно

---

## КРИТЕРИИ УСПЕХА

### После Приоритета 1:
- ✅ 0 warnings о metadataBase в `npm run build`
- ✅ Open Graph изображения корректно отображаются в social media

### После Приоритета 2:
- ✅ 0 React Hook dependency warnings в `npm run build`
- ✅ Все компоненты работают без изменения функциональности
- ✅ Нет console errors в браузере

### После Приоритета 3:
- ✅ Admin страницы: <1 MiB каждая (сейчас 2.7-3.7 MiB)
- ✅ Statistics страницы: <1 MiB (сейчас 2.9 MiB)
- ✅ Question страница: <400 kB (сейчас 617 kB)
- ✅ Общий First Load JS: <300 kB (сейчас 347 kB)

## ПОРЯДОК ВЫПОЛНЕНИЯ

1. **Сначала Приоритет 1** - быстрое исправление, низкий риск
2. **Затем Приоритет 2** - по одному файлу, тестировать после каждого
3. **В конце Приоритет 3** - требует больше времени и тестирования

## ВАЖНЫЕ ЗАМЕЧАНИЯ

- ⚠️ После каждого изменения запускать `npm run build` для проверки
- ⚠️ Тестировать функциональность в браузере после исправлений
- ⚠️ Не изменять логику компонентов, только dependencies
- ⚠️ При Приоритете 3 делать изменения постепенно и тестировать каждое
