# Fix Stage 8: Устранение критических ошибок после тестов ST-8
## Задача fix-8-1: Синхронизация unified-progress (view + авторизация)

**Описание:**
API `/api/progress/unified` возвращает 401 и ошибку Prisma 42P01 «relation \"user_level_progress\" does not exist». Нужно выяснить, применена ли миграция `20250703160000_add_performance_indexes_and_view.sql` в текущей базе и почему route теряет сессию.

**Промпт для Cursor:**
```bash
# 1. Проверь, существует ли view в БД
psql $DATABASE_URL -c "\dv user_level_progress"  # или через Supabase SQL редактор

# 2. Найди файлы, где вызывается prisma.$queryRaw("SELECT * FROM user_level_progress …")
grep -R "user_level_progress" src/ prisma/

# 3. Проанализируй route для unified progress и SWR fetcher
cat src/app/api/progress/unified/route.ts
cat src/hooks/use-unified-progress.ts

# 4. Найди, где создаётся Supabase клиент на сервере
grep -R "createServerSupabaseClient" src/app/api | head

# 5. Проверь RLS и JWT в запросах fetcher (добавляется ли cookie / access_token)
```

**Проверка после выполнения:**
- [ ] View `user_level_progress` существует в dev/staging БД
- [ ] `/api/progress/unified` отвечает 200 при действующей сессии
- [ ] Отсутствуют ошибки 42P01 и 401 в логах браузера и dev-сервере
- [ ] Если view отсутствовала – добавлена миграция / выполнен SQL скрипт
- [ ] Route надёжно получает сессию (getServerSession или Supabase cookie)

---

## Задача fix-8-2: Устранение hydration ошибок (`<html>` inside `<body>` и lang mismatch)

**Описание:**
В консоли Next.js предупреждения: `Prop lang did not match` и `<html> cannot be a child of <body>`. Причина – дублирование тега `<html>` во вложенном `Layout` + разные значения lang.

**Промпт для Cursor:**
```bash
# Найди все файлы layout.tsx, где возвращается <html>
find src/app -name "layout.tsx" | xargs grep -n "<html"

# Проверь RootLayout в src/app/layout.tsx
# Сравни вложенные layout файлов (marketing, app), убедись что они возвращают только <section>/<div>

# Найди установки lang="en"/"ru"
grep -R "lang=\"" src/app
```

**Проверка после выполнения:**
- [ ] Только RootLayout содержит тег `<html lang="ru">`
- [ ] Все вложенные layout компоненты возвращают фрагмент без `<html>`
- [ ] Гидратация проходит без warning-ов о lang и вложенности html

---

## Задача fix-8-3: Стабилизация Vimeo Player (onboarding + VIDEO-уроки)

**Описание:**
Ошибка `Cannot read properties of null (reading 'chapters')` и случаи, когда видео не загружается. Необходимо проверить инициализацию SDK, SSR-guard и корректность `videoId`.

**Промпт для Cursor:**
```bash
# Найди компоненты Vimeo/VerticalVideoPlayer
find src -name "*video*player*.tsx" -o -name "*Vimeo*.tsx"

# Проверь useEffect / typeof window / Player() вызовы
# Найди места, где передаётся videoId
grep -R "videoId=" src/components src/app | head -20

# Найди все VIDEO вопросы в БД и проверь их Vimeo ID
psql $DATABASE_URL -c "SELECT slug, videoId FROM \"Questions\" WHERE \"questionType\"='VIDEO'"
```

**Проверка после выполнения:**
- [ ] Onboarding видео и все VIDEO-уроки воспроизводятся без ошибок в dev и prod сборке
- [ ] Обработаны ошибки SDK (try/catch + fallback постер)
- [ ] На мобильных полноэкранный режим, на десктопе max-height 80vh согласно правилам videoRules

---

## Задача fix-8-4: Восстановление контента Roadmaps

**Описание:**
/roadmaps/business-basics показывает «No content available». Нужно выяснить, есть ли записи Questions с нужным тегом и StudyPathGoals.

**Промпт для Cursor:**
```bash
# 1. Проверь наличие тегов level-1, level-2 …
psql $DATABASE_URL -c "SELECT name, uid FROM \"Tag\" WHERE name LIKE 'level-%';"

# 2. Найди вопросы с этими тегами
psql $DATABASE_URL -c "SELECT slug FROM \"Questions\" q JOIN \"QuestionTags\" qt ON q.id=qt.\"questionId\" JOIN \"Tag\" t ON t.id=qt.\"tagId\" WHERE t.name='level-1';"

# 3. Проверь StudyPath и StudyPathGoal записи
psql $DATABASE_URL -c "SELECT slug, title FROM \"StudyPath\";"
psql $DATABASE_URL -c "SELECT * FROM \"StudyPathGoal\" WHERE \"studyPathId\" IN (SELECT id FROM \"StudyPath\" WHERE slug='business-basics');"
```

**Проверка после выполнения:**
- [ ] У каждого уровня есть минимум 1 VIDEO и 1 MULTIPLE_CHOICE вопрос
- [ ] Страница /roadmaps/[slug] отображает контент и навигацию
- [ ] validate:levels проходит без ❌

---

## Задача fix-8-5: Починка Leo AI (история + контекст прогресса)

**Описание:**
Leo-чат не загружается (401) и не получает unified-progress. После решения fix-8-1 нужно проверить RLS + API.

**Промпт для Cursor:**
```bash
# 1. Проверь route для /api/leo-chats и RLS политики Supabase (table "UserLeoChats")
find src/app/api -path "*leo*" -type f
psql $DATABASE_URL -c "\d+ \"UserLeoChats\""

# 2. Проверь use-leo-context.ts и useUnifiedProgress
cat src/hooks/use-leo-context.ts | grep progress

# 3. Найди fetch в leo-chat.tsx и убедись, что передаётся access_token
```

**Проверка после выполнения:**
- [ ] Лео чат загружает историю без спиннера/401
- [ ] Контекст прогресса (уровень, % завершения) попадает в systemPrompt

---

## Задача fix-8-6: Финальная локализация и UI-полировка

**Описание:**
Остались англоязычные строки ("That was incorrect, try again!", Pricing modal). Таймер и кнопки Reset/Play/Submit отображаются на VIDEO/MULTIPLE_CHOICE, что нарушает UX.

**Промпт для Cursor:**
```bash
# Найди остаточные англ. фразы
grep -R "incorrect, try again\|Unlock a personalized" src/

# Найди рендер таймера
grep -R "Reset/Play/Submit" src/components | head

# Проверь conditional rendering в question-card / question-tabs
```

**Проверка после выполнения:**
- [ ] Все публичные строки на русском
- [ ] Таймер и кнопки скрыты для VIDEO и MULTIPLE_CHOICE

---

## Задача fix-8-7: Безопасная блокировка платежей Stripe

**Описание:**
Checkout-страница доступна всем пользователям. Добавить feature-flag и заглушку до полной интеграции.

**Промпт для Cursor:**
```bash
# Найди все redirectToCheckout вызовы
grep -R "redirectToCheckout(" src/ | head

# Добавь проверку process.env.NEXT_PUBLIC_ENABLE_PAYMENTS === 'true'
```

**Проверка после выполнения:**
- [ ] При `ENABLE_PAYMENTS=false` кнопка Get Premium либо скрыта, либо показывает ComingSoon
- [ ] redirectToCheckout не выполняется

---

## Задача fix-8-8: Исправление обновления аватара после загрузки

**Описание:**
Файл загружается в Storage, но UI не обновляет картинку.

**Промпт для Cursor:**
```bash
# Найти компонент загрузки аватара (ProfilePictureUploader?)
grep -R "uploadAvatar\|avatarUrl" src/components | head

# Проверить, вызывает ли он после upload: updateUser() + invalidateQueries()
```

**Проверка после выполнения:**
- [ ] После загрузки файла аватар немедленно меняется без reload
- [ ] Обработаны ошибки Storage

---

> После выполнения всех задач ST-8 проект должен запускаться без 401/42P01, видео и чат должны работать стабильно, а интерфейс быть полностью русифицированным.
