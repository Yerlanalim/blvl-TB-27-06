# Knip Analysis Report - BizLevel Project
*Дата анализа: $(date)*  
*Команда: `pnpm run knip`*

## 📋 Executive Summary

**Общая статистика найденных проблем:**
- **157 неиспользуемых файлов**
- **12 неиспользуемых dependencies**
- **9 неиспользуемых devDependencies**
- **1 unlisted dependency**
- **2 unlisted binaries**
- **83 неиспользуемых экспорта**
- **28 неиспользуемых типов**
- **1 дублированный экспорт**

---

## 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ (приоритет запуска)**

### 1. TechBlitz артефакты в блоге (40+ файлов)
**Описание:** Все технические статьи блога остались от TechBlitz  
**Критичность:** ВЫСОКАЯ - нарушает брендинг BizLevel

#### Активные статьи блога (требуют замены/удаления):
```
src/app/(marketing)/blog/posts/250-users-on-techblitz.mdx
src/app/(marketing)/blog/posts/7-free-websites-to-learn-javascript.mdx
src/app/(marketing)/blog/posts/difference-between-const-var-and-let.mdx
src/app/(marketing)/blog/posts/how-does-javascript-work.mdx
src/app/(marketing)/blog/posts/how-to-add-or-remove-css-classes-with-javascript.mdx
src/app/(marketing)/blog/posts/how-to-approach-coding-challenges.mdx
src/app/(marketing)/blog/posts/how-to-become-a-software-engineer-2025.mdx
src/app/(marketing)/blog/posts/how-to-connect-html-to-javascript.mdx
src/app/(marketing)/blog/posts/how-to-convert-a-number-to-string-in-javascript.mdx
src/app/(marketing)/blog/posts/how-to-create-a-weather-app-in-javascript.mdx
src/app/(marketing)/blog/posts/how-to-use-filter-in-javascript.mdx
src/app/(marketing)/blog/posts/how-to-use-map-in-javascript.mdx
src/app/(marketing)/blog/posts/how-to-use-operators-in-javascript.mdx
src/app/(marketing)/blog/posts/how-to-use-reduce-in-javascript.mdx
src/app/(marketing)/blog/posts/how-to-use-some-in-javascript.mdx
src/app/(marketing)/blog/posts/how-to-use-sort-in-javascript.mdx
src/app/(marketing)/blog/posts/how-to-use-split-in-javascript.mdx
src/app/(marketing)/blog/posts/how-to-use-typeof-operator-in-javaScript.mdx
src/app/(marketing)/blog/posts/how-to-write-a-function-in-javascript.mdx
src/app/(marketing)/blog/posts/how-to-write-comments-in-javascript.mdx
src/app/(marketing)/blog/posts/how-to-write-javascript.mdx
src/app/(marketing)/blog/posts/how-to-write-loops-in-javascript.mdx
src/app/(marketing)/blog/posts/html-conditional-statement.mdx
src/app/(marketing)/blog/posts/introducing-bizlevel.mdx ✅ (единственный бизнес-пост)
src/app/(marketing)/blog/posts/introducing-techblitz.mdx ❌ (старый TechBlitz пост)
src/app/(marketing)/blog/posts/javascript-array-cheat-sheet.mdx
src/app/(marketing)/blog/posts/javascript-coding-test.mdx
src/app/(marketing)/blog/posts/javascript-conditionals.mdx
src/app/(marketing)/blog/posts/javascript-format-strings-with-variables.mdx
src/app/(marketing)/blog/posts/javascript-interview-questions-for-senior-developers.mdx
src/app/(marketing)/blog/posts/javascript-naming-conventions.mdx
src/app/(marketing)/blog/posts/javascript-nested-conditionals.mdx
src/app/(marketing)/blog/posts/javascript-string-cheat-sheet.mdx
src/app/(marketing)/blog/posts/loose-vs-strict-equality-in-javascript.mdx
src/app/(marketing)/blog/posts/primitive-types-in-javascript.mdx
src/app/(marketing)/blog/posts/programming-challenges-for-beginners.mdx
src/app/(marketing)/blog/posts/regular-expression-cheat-sheet.mdx
src/app/(marketing)/blog/posts/what-are-callback-functions.mdx
src/app/(marketing)/blog/posts/what-is-a-string-in-javascript.mdx
src/app/(marketing)/blog/posts/what-is-array-at-in-javascript.mdx
src/app/(marketing)/blog/posts/what-is-git-branch.mdx
src/app/(marketing)/blog/posts/what-is-length-in-javascript.mdx
src/app/(marketing)/blog/posts/what-is-triple-equals-in-javascript.mdx
```

#### Архивные статьи (_archive папка - 40+ файлов):
**Статус:** Уже перенесены в архив, но Knip все равно их видит как неиспользуемые

### 2. Устаревшие константы TechBlitz
```
src/utils/constants/coding-facts.ts ❌ (должен быть business-facts.ts)
```

### 3. GitHub интеграция (должна быть удалена)
```
src/components/ui/icons/github.tsx ❌
```

---

## ⚠️ **ВАЖНЫЕ ПРОБЛЕМЫ (технический долг)**

### 1. Неиспользуемые компоненты после этапов 1-6

#### Фильтрация и поиск (старая система):
```
src/components/app/filters/chips.tsx
src/components/app/filters/filter-dropdown.tsx
src/components/app/filters/filter.tsx
src/components/app/filters/filters-loading.tsx
src/components/app/filters/search/tag-search.tsx
src/components/app/filters/sort/sort-dropdown.tsx
src/components/app/filters/tags-carousel.tsx
```

#### Старая система вопросов:
```
src/components/app/layout/questions/clear-filters.tsx
src/components/app/layout/questions/question-page-sidebar-loading.tsx
src/components/app/layout/questions/question-page-sidebar.tsx
src/components/app/layout/questions/questions-list.tsx
src/components/app/admin/questions/question-picker.tsx
```

#### Onboarding компоненты:
```
src/components/app/onboarding/onboarding-first-question-selection.tsx
```

#### Roadmap компоненты (старые):
```
src/components/app/roadmaps/[uid]/roadmap-card-menu.tsx
src/components/app/roadmaps/[uid]/roadmaps-card-loading.tsx
src/components/app/roadmaps/[uid]/roadmaps-card.tsx
src/components/app/roadmaps/animated-status-text.tsx
src/components/app/roadmaps/create-roadmap-button.tsx
src/components/app/roadmaps/creating-roadmap-modal.tsx
src/components/app/roadmaps/empty/onboarding-modal.tsx
src/components/app/roadmaps/empty/onboarding.tsx
```

### 2. Неиспользуемые скрипты и утилиты
```
prisma/seed-bizlevel-level1.ts
scripts/link-tags.ts
scripts/seed-level1.ts
scripts/test-level-navigation.ts
scripts/test-performance-optimizations.ts
src/scripts/update-code-snippets.ts
```

### 3. Неиспользуемые dependencies (12 пакетов)
```
@ai-sdk/react
@radix-ui/react-avatar
@stripe/react-stripe-js
@stripe/stripe-js
@tabler/icons-react
@types/canvas-confetti
canvas-confetti
cookie
glob
lodash
react-intersection-observer
unist-util-visit
```

### 4. Неиспользуемые devDependencies (9 пакетов)
```
@storybook/addon-interactions
@storybook/addon-links
@storybook/blocks
@storybook/builder-vite
@storybook/cli
@types/lodash
@vitest/coverage-v8
autoprefixer
playwright
```

---

## 💡 **РЕКОМЕНДАЦИИ (можно после запуска)**

### 1. Системы которые не используются

#### Переводы:
```
src/utils/translations/ru.ts (не используется - система переводов не активна)
```

#### Полнотекстовый поиск:
```
src/utils/search-params.ts
src/hooks/use-get-query-params.ts
```

#### Прогресс и уведомления:
```
src/hooks/use-progress-notifications.ts
src/hooks/use-save-progress.ts
```

#### Старые UI компоненты:
```
src/components/ui/avatar.tsx
src/components/ui/difficulty-stars.tsx
src/components/ui/optimized-image.tsx
src/components/ui/tour.tsx
src/components/shared/Card.tsx
```

#### Иконки (неиспользуемые):
```
src/components/ui/icons/book-bookmark.tsx
src/components/ui/icons/challenge-flag.tsx
src/components/ui/icons/challenge.tsx
src/components/ui/icons/sort.tsx
src/components/ui/icons/spaceship.tsx
src/components/ui/icons/star.tsx
src/components/ui/icons/stats.tsx
src/components/ui/icons/treasure-chest.tsx
src/components/ui/icons/xp-star.tsx
```

### 2. Supabase Functions (Edge Functions)
```
supabase/functions/_shared/cors.ts
supabase/functions/_shared/supabase-admin.ts
supabase/functions/hello-world/index.ts
supabase/functions/send-auth-emails/_templates/email-change.tsx
supabase/functions/send-auth-emails/_templates/magic-link.tsx
supabase/functions/send-auth-emails/_templates/reset-password.tsx
supabase/functions/send-auth-emails/_templates/sign-up.tsx
supabase/functions/send-auth-emails/index.ts
supabase/functions/sync-user-streak/index.ts
```

### 3. Storybook компоненты:
```
src/stories/Configure.mdx
```

---

## 🔧 **ТЕХНИЧЕСКИЕ ПРОБЛЕМЫ**

### 1. Unlisted dependencies
```
postcss-load-config - используется в postcss.config.mjs, но не в package.json
```

### 2. Unlisted binaries
```
stripe - используется в package.json scripts
prettier - используется в package.json scripts
```

### 3. Дублированные экспорты
```
SuggestedChallengeEmailTemplate|default в src/components/emails/daily-challenge.tsx
```

---

## 📊 **АНАЛИЗ ПО КАТЕГОРИЯМ**

### TechBlitz Артефакты (КРИТИЧНО):
- **42 файла блога** с техническим контентом
- **1 файл констант** coding-facts.ts
- **1 иконка GitHub**
- **Приоритет:** Удалить до запуска

### Неиспользуемые компоненты (ВАЖНО):
- **37 React компонентов** (фильтры, старые roadmaps, UI)
- **11 иконок** 
- **Приоритет:** Очистить для уменьшения bundle

### Неиспользуемые зависимости (ОПТИМИЗАЦИЯ):
- **12 dependencies** (Stripe, иконки, утилиты)
- **9 devDependencies** (Storybook, тестирование)
- **Приоритет:** Удалить для уменьшения node_modules

### Суммарные метрики очистки:
- **~80 файлов** к удалению
- **~21 npm пакет** к удалению  
- **Экономия bundle:** ~500KB (примерно)
- **Экономия node_modules:** ~200MB (примерно)

---

## 🎯 **ПЛАН ДЕЙСТВИЙ**

### Phase 1: Критические исправления (до запуска)
1. **Удалить все JavaScript/TechBlitz статьи блога**
2. **Заменить coding-facts.ts на business-facts.ts** 
3. **Удалить GitHub иконку**
4. **Проверить что introducing-bizlevel.mdx используется**

### Phase 2: Техническая очистка (после запуска)
1. **Удалить неиспользуемые filter компоненты**
2. **Удалить старые roadmap компоненты**
3. **Удалить неиспользуемые dependencies**
4. **Исправить unlisted dependencies**

### Phase 3: Оптимизация (v2.0)
1. **Удалить неиспользуемые UI компоненты**
2. **Очистить Supabase functions**
3. **Удалить неиспользуемые скрипты**
4. **Оптимизировать bundle size**

**Итого потенциальная экономия:** ~500KB bundle + ~200MB node_modules
