# Seed данные BizLevel

Этот документ описывает структуру и использование seed данных для платформы BizLevel.

## Структура уровня 1

Первый уровень содержит **7 вопросов** с полным циклом обучения:

### 📚 Последовательность обучения:

1. **Введение** (`welcome-to-business`)
   - Тип: MULTIPLE_CHOICE
   - Приветствие и мотивация

2. **Видео урок 1** (`business-model-intro`)
   - Тип: VIDEO
   - Vimeo ID: 123456789
   - Тема: Бизнес-модели
   - Ресурс: Гид по бизнес-моделям

3. **Тест 1** (`business-models-test-1`)
   - Тип: MULTIPLE_CHOICE
   - Проверка знаний о бизнес-моделях
   - 4 варианта ответа

4. **Видео урок 2** (`smart-goals-video`)
   - Тип: VIDEO
   - Vimeo ID: 987654321
   - Тема: SMART-цели
   - Ресурс: Шаблон целей

5. **Тест 2** (`smart-goals-test`)
   - Тип: MULTIPLE_CHOICE
   - Проверка знаний о целеполагании
   - 4 варианта ответа

6. **Видео урок 3** (`target-audience-video`)
   - Тип: VIDEO
   - Vimeo ID: 456789123
   - Тема: Целевая аудитория
   - Ресурс: Чек-лист исследования

7. **Итоговый тест** (`level-1-final-test`)
   - Тип: MULTIPLE_CHOICE
   - Проверка всех знаний уровня
   - 4 варианта ответа

## Теги

Все вопросы помечены тегами для группировки:

- `level-1` - принадлежность к первому уровню
- `business-basics` - основы бизнеса
- `goal-setting` - целеполагание
- `video-lesson` - видео уроки
- `test` - тесты

## Навигация

Настроена последовательная навигация:
- `previousQuestionSlug` - ссылка на предыдущий вопрос
- `nextQuestionSlug` - ссылка на следующий вопрос

## Использование

### Запуск seed данных:

```bash
# Через TypeScript скрипт
npx tsx scripts/seed-level1.ts

# Или через Prisma (если настроено)
npx prisma db seed
```

### Очистка старых данных:

```bash
# Выполнить SQL скрипт в Supabase
cat scripts/cleanup-techblitz-data.sql | psql $DATABASE_URL
```

## Проверка данных

После выполнения seed должно быть создано:

- ✅ 7 вопросов с типами VIDEO и MULTIPLE_CHOICE
- ✅ 5 тегов для группировки
- ✅ 14 ответов для MULTIPLE_CHOICE вопросов (по 2-4 на вопрос)
- ✅ 3 ресурса для VIDEO уроков
- ✅ Навигация между всеми вопросами
- ✅ Правильные связи QuestionTags

## Важные заметки

1. **Vimeo ID**: В поле `codeSnippet` хранятся ID видео с Vimeo
2. **Ответы**: Правильный ответ указан в `correctAnswer` как индекс (0-3)
3. **Ресурсы**: Ссылки на PDF материалы для скачивания
4. **Безопасность**: Старые технические данные очищаются автоматически

## Расширение

Для добавления новых уровней:

1. Создайте файл `seed-bizlevel-level2.ts`
2. Добавьте теги `level-2`
3. Настройте навигацию от последнего вопроса уровня 1
4. Обновите этот README

## Статистика

- **Общее время прохождения**: ~45-60 минут
- **Видео уроки**: 3 шт. (~15-20 минут)
- **Тесты**: 4 шт. (~15-20 минут)
- **Изучение ресурсов**: ~10-15 минут 