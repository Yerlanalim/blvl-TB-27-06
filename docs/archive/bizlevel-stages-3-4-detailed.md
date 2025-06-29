# ЭТАПЫ 3-4: Детальные задачи для Vimeo и базы данных

## ЭТАП 3: Настройка Vimeo для вертикальных видео (1-2 дня)

### Предварительная подготовка
- Создать аккаунт Vimeo Pro/Business для приватного хостинга
- Загрузить все видео уроки в вертикальном формате (9:16)
- Получить Video ID для каждого видео

---

### Задача 3.1: Установка и настройка Vimeo Player

#### Файлы для создания/изменения:
- Установка пакета: `npm install @vimeo/player`
- `src/components/business/vertical-video-player.tsx` (новый файл)
- `src/components/business/vertical-video-player.stories.tsx` (для тестирования)

#### Промпт для Cursor:
```
Создай новый компонент src/components/business/vertical-video-player.tsx со следующими требованиями:

1. Импортируй Vimeo Player:
   import Player from '@vimeo/player'
   
2. Props компонента:
   - videoId: string (ID видео на Vimeo)
   - onComplete?: () => void (колбэк при завершении)
   - onPlay?: () => void (колбэк при начале воспроизведения)
   - title?: string (заголовок урока)

3. Стили для вертикального видео:
   - На мобильных: width: 100%, height: 100vh
   - На десктопе: max-width: 400px, max-height: 80vh, margin: 0 auto
   - Черный фон вокруг видео для эффекта TikTok
   
4. Настройки Vimeo Player:
   - autoplay: false
   - controls: true
   - playsinline: true (важно для мобильных!)
   - responsive: true
   - dnt: true (не отслеживать пользователей)
   
5. События:
   - При клике play - вызвать onPlay и показать кнопку "Далее"
   - При завершении - вызвать onComplete
   - Сохранять прогресс в localStorage (videoProgress-{videoId})
   
6. UI элементы:
   - Overlay с заголовком урока сверху
   - Кнопка "Далее" снизу (появляется после play)
   - Анимация появления через framer-motion
```

#### Проверки:
- [ ] Видео корректно отображается в вертикальном формате
- [ ] playsinline работает на iOS (не открывается полноэкранный режим)
- [ ] Кнопка "Далее" появляется после нажатия play
- [ ] Прогресс сохраняется в localStorage

---

### Задача 3.2: Создание типа VIDEO для Questions

#### Файлы для изменения:
- `src/components/questions/question-display.tsx`
- `src/components/app/layout/question-single/index.tsx`
- `src/types/Questions.ts` (если нужно добавить videoUrl)

#### Промпт для Cursor:
```
В файле src/components/questions/question-display.tsx добавь поддержку VIDEO типа:

1. Импортируй компонент:
   import VerticalVideoPlayer from '@/components/business/vertical-video-player'

2. В функции отображения вопроса добавь условие:
   if (question.type === 'VIDEO' && question.videoUrl) {
     return (
       <VerticalVideoPlayer
         videoId={question.videoUrl}
         title={question.title}
         onComplete={() => {
           // Логика разблокировки следующего вопроса
           setCanProceed(true)
         }}
         onPlay={() => {
           // Отметить начало просмотра
           trackVideoStart(question.uid)
         }}
       />
     )
   }

3. Скрой элементы для VIDEO типа:
   - Панель с вариантами ответов
   - Кнопку Submit (заменить на "Далее")
   - Hint секцию

4. Адаптируй мобильную версию:
   - Убрать padding на мобильных для VIDEO
   - Fullscreen режим для видео
```

#### База данных Supabase:
- Добавить поле `videoUrl` в таблицу Questions (если его нет)
- Можно использовать существующее поле `codeSnippet` для хранения Vimeo ID

---

### Задача 3.3: Создание тестового видео-урока

#### Действия:
1. Создать тестовый Question с типом VIDEO через Supabase
2. Заполнить поля:
   - type: 'VIDEO'  
   - title: 'Урок 1: Что такое бизнес-модель?'
   - videoUrl: 'YOUR_VIMEO_ID'
   - tags: ['level-1', 'video-1']

#### SQL для Supabase:
```sql
INSERT INTO "Questions" (
  uid,
  question,
  questionType,
  title,
  videoUrl, -- или использовать codeSnippet
  difficulty,
  slug,
  tags,
  createdAt,
  updatedAt
) VALUES (
  gen_random_uuid(),
  'Посмотрите видео о бизнес-моделях',
  'VIDEO',
  'Урок 1: Что такое бизнес-модель?',
  'VIMEO_VIDEO_ID_HERE',
  'EASY',
  'business-model-intro',
  ARRAY['level-1', 'video-1'],
  NOW(),
  NOW()
);
```

---

### Задача 3.4: Мобильная оптимизация

#### Файлы для изменения:
- `src/app/(app)/question/[slug]/page.tsx`
- Глобальные стили для видео-страниц

#### Промпт для Cursor:
```
Адаптируй страницу вопроса для VIDEO типа на мобильных:

1. Определи, что это VIDEO вопрос
2. Для VIDEO на мобильных:
   - Убери боковую панель (sidebar)
   - Убери header с навигацией
   - Сделай видео на весь экран
   - Добавь класс 'video-fullscreen-mode'
   
3. CSS классы:
   .video-fullscreen-mode {
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     z-index: 9999;
     background: black;
   }
   
4. Добавь жест свайпа для перехода к следующему видео
```

---

## ЭТАП 4: Очистка и подготовка базы данных (1 день)

### Задача 4.1: Исправление проблем с брендингом в БД

#### Действия в Supabase:
1. **Переименовать поля в таблице Users:**
   ```sql
   -- Создать новое поле
   ALTER TABLE "Users" 
   ADD COLUMN "howDidYouHearAboutBizLevel" TEXT;
   
   -- Скопировать данные
   UPDATE "Users" 
   SET "howDidYouHearAboutBizLevel" = "howDidYouHearAboutTechBlitz";
   
   -- Позже можно удалить старое поле (после тестирования)
   ```

2. **Обновить email в таблицах:**
   ```sql
   -- Обновить email отправителя если он хранится в БД
   UPDATE "EmailTemplates" 
   SET sender = 'team@bizlevel.kz'
   WHERE sender = 'team@techblitz.dev';
   ```

#### Обновление кода:
- `src/types/User.ts` - обновить название поля
- Все места использования `howDidYouHearAboutTechBlitz`

---

### Задача 4.2: Создание seed данных для первого уровня

#### Файл для создания:
- `prisma/seed-bizlevel-level1.ts`

#### Структура первого уровня:
```typescript
const level1Questions = [
  // 1. Введение
  {
    type: 'MULTIPLE_CHOICE',
    title: 'Добро пожаловать в мир бизнеса!',
    question: 'Готовы ли вы начать свой путь предпринимателя?',
    answers: ['Да, начнем!', 'Хочу узнать больше'],
    correctAnswer: 0,
    tags: ['level-1', 'intro'],
  },
  
  // 2. Видео 1
  {
    type: 'VIDEO',
    title: 'Урок 1: Что такое бизнес-модель?',
    question: 'Посмотрите видео о типах бизнес-моделей',
    videoUrl: 'VIMEO_ID_1',
    tags: ['level-1', 'video-1'],
  },
  
  // 3. Тест после видео 1
  {
    type: 'MULTIPLE_CHOICE',
    title: 'Проверка знаний: Бизнес-модели',
    question: 'Какая бизнес-модель подразумевает регулярные платежи?',
    answers: [
      'Разовая продажа',
      'Подписка',
      'Фриланс',
      'Аукцион'
    ],
    correctAnswer: 1,
    hint: 'Подумайте о Netflix или Spotify',
    tags: ['level-1', 'test-1'],
  },
  
  // ... остальные видео и тесты
]
```

#### SQL скрипт для загрузки:
```sql
-- Очистить тестовые технические вопросы
DELETE FROM "Questions" 
WHERE slug LIKE 'test-%' 
OR tags && ARRAY['javascript', 'react', 'coding'];

-- Вставить вопросы первого уровня
-- (использовать скрипт выше)
```

---

### Задача 4.3: Настройка прогресса и навигации

#### Файлы для изменения:
- `src/utils/data/questions/get-next-previous.ts`
- `src/components/app/navigation/question-navigation.tsx`

#### Промпт для Cursor:
```
Адаптируй навигацию для последовательного прохождения уровня:

1. Для вопросов с тегом level-X:
   - Следующий вопрос = следующий по порядку в том же уровне
   - Используй сортировку по createdAt или добавь поле orderIndex
   
2. Логика перехода:
   - После видео → обязательный тест
   - После теста → следующее видео или завершение уровня
   - Нельзя пропускать видео
   
3. Показывай прогресс:
   - "Урок 3 из 10"
   - Прогресс-бар для уровня
```

---

### Задача 4.4: Миграция существующих пользователей

#### SQL скрипты:
```sql
-- 1. Обновить userLevel для всех на FREE
UPDATE "Users" 
SET "userLevel" = 'FREE'
WHERE "userLevel" = 'STANDARD';

-- 2. Очистить технические достижения
DELETE FROM "Achievement"
WHERE "badgeUid" IN (
  SELECT uid FROM "Badge" 
  WHERE name LIKE '%JavaScript%' 
  OR name LIKE '%Code%'
);

-- 3. Сбросить прогресс
UPDATE "Users" SET
  "correctDailyStreak" = 0,
  "totalDailyStreak" = 0,
  "userXp" = 0,
  "weeklyUserXp" = 0;

-- 4. Очистить ответы на старые вопросы
DELETE FROM "Answers"
WHERE "questionUid" IN (
  SELECT uid FROM "Questions"
  WHERE tags && ARRAY['javascript', 'react', 'python']
);
```

---

## Чек-лист готовности после этапов 3-4

### Vimeo интеграция:
- [ ] Компонент VerticalVideoPlayer работает
- [ ] Видео проигрываются inline на мобильных
- [ ] Кнопка "Далее" появляется после play
- [ ] Вертикальный формат корректно отображается

### База данных:
- [ ] Все упоминания TechBlitz заменены в БД
- [ ] Загружен первый уровень (10+ вопросов)
- [ ] Видео уроки связаны с вопросами
- [ ] Старые технические данные очищены

### Навигация:
- [ ] Последовательное прохождение уровня работает
- [ ] Нельзя пропустить видео
- [ ] Прогресс сохраняется
- [ ] Переход между уроками плавный

### Проблемы из status.md:
- [ ] README.md обновлен на BizLevel
- [ ] CONTRIBUTING.md обновлен
- [ ] Supabase функции обновлены
- [ ] Поле howDidYouHearAboutBizLevel переименовано

---

## Важные замечания

1. **Vimeo аккаунт**: Нужен Pro план для приватного хостинга
2. **Мобильные браузеры**: Тестировать playsinline на iOS Safari
3. **Прогресс видео**: Сохранять локально, синхронизировать с БД
4. **Безопасность**: Не показывать прямые ссылки на Vimeo видео

## Команды для проверки
```bash
# Проверить, что все VIDEO вопросы имеют videoUrl
npm run db:check-video-questions

# Проверить последовательность уровня 1
npm run db:validate-level-sequence level-1
```