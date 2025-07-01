# BizLevel Fix 3: Исправление критических проблем после Этапа 6

## Обзор проблем
После агрессивной очистки БД в этапе 6.1.3 возникли критические ошибки, блокирующие дальнейшую разработку. Таблицы были удалены без полной проверки зависимостей в коде, что привело к нарушению целостности Prisma схемы.

**Статус:** КРИТИЧНО - блокирует `npx prisma generate` и весь функционал БД.

---

## БЛОК 1: КРИТИЧЕСКИЕ ИСПРАВЛЕНИЯ БД (ПРИОРИТЕТ 1)

### fix-task-6-1: Восстановление модели RoadmapUserQuestions
**Промпт для Cursor:**
```
КРИТИЧЕСКАЯ ОШИБКА: Type "RoadmapUserQuestions" is neither a built-in type в users.prisma:118

Восстанови модель RoadmapUserQuestions в Prisma схеме:

1. Найди подходящий файл схемы (возможно prisma/schema/roadmap.prisma или создай новый)
2. Добавь полную модель на основе существующей миграции 20241119222138_adds_roadmap_schema:

model RoadmapUserQuestions {
  uid              String    @id @default(cuid())
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
  question         String
  codeSnippet      String?
  hint             String?
  difficulty       QuestionDifficulty @default(EASY)
  completed        Boolean   @default(false)
  completedAt      DateTime?
  roadmapUid       String
  correctAnswerUid String
  
  // Relations
  roadmap         UserRoadmaps                         @relation(fields: [roadmapUid], references: [uid], onDelete: Cascade)
  answers         RoadmapUserQuestionsAnswers[]
  userAnswers     RoadmapUserQuestionsUserAnswers[]
  bookmarks       UserBookmarks[]
  
  @@index([roadmapUid])
  @@index([completed])
}

3. Добавь связанные модели если отсутствуют:
   - RoadmapUserQuestionsAnswers
   - RoadmapUserQuestionsUserAnswers

4. Проверь что все импорты типов в коде работают

ВАЖНО: Не меняй существующий код - только добавляй недостающие схемы.
```

**Проверка после выполнения:**
- [ ] npx prisma generate проходит без ошибок
- [ ] TypeScript компиляция успешна
- [ ] Все импорты RoadmapUserQuestions работают

### fix-task-6-2: Добавление связи bookmarks в модель Questions
**Промпт для Cursor:**
```
КРИТИЧЕСКАЯ ОШИБКА: Unknown field `bookmarks` в Questions запросах

Добавь обратную связь с UserBookmarks в модель Questions:

1. В prisma/schema/questions.prisma добавь поле в модель Questions:
```
model Questions {
  // ... existing fields ...
  userAnswers          Answers[]
  answers              QuestionAnswers[]
  QuestionResources    QuestionResources[]
  tags                 QuestionTags[]
  bookmarks            UserBookmarks[]  // <- ДОБАВИТЬ ЭТО
}
```

2. Убедись что UserBookmarks модель определена в users.prisma:
   - Поле questionId с правильной связью
   - Индексы настроены
   - Каскадное удаление включено

3. Тестируй запросы:
   - src/utils/data/questions/get.ts:29 (include: { bookmarks: true })
   - src/utils/data/questions/list.ts:183 (include: { bookmarks: {...} })

ВАЖНО: Это обратная связь для существующих миграций UserBookmarks.
```

**Проверка после выполнения:**
- [ ] Prisma схема валидна
- [ ] Запросы с bookmarks работают без ошибок
- [ ] TypeScript типы генерируются корректно

### fix-task-6-3: Восстановление UserLeoChats функционала
**Промпт для Cursor:**
```
КРИТИЧЕСКАЯ ОШИБКА: Cannot read properties of undefined (reading 'findMany') в leo-chats

Восстанови функционал Leo chats:

ВАРИАНТ А - Восстановление таблицы (рекомендуется):
1. В prisma/schema/leo-chats.prisma добавь модель:
```
model UserLeoChats {
  uid       String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  userUid   String
  message   String
  response  String
  context   String?
  
  user      Users    @relation(fields: [userUid], references: [uid], onDelete: Cascade)
  
  @@index([userUid])
  @@index([createdAt])
}
```

2. Добавь связь в Users модель:
```
model Users {
  // ... existing fields ...
  leoChats UserLeoChats[]
}
```

3. Примени миграцию восстановления таблицы

**Проверка после выполнения:**
- [ ] Leo chat не выдает ошибок в консоли
- [ ] Функции get/save работают (или отключены корректно)
- [ ] UI Leo чата стабилен

---
## БЛОК 2: ИСПРАВЛЕНИЕ ЗАПРОСОВ И КОДА (ПРИОРИТЕТ 2)

### fix-task-6-4: Обновление зависимостей и очистка
**Промпт для Cursor:**
```
Исправь сопутствующие проблемы разработки:

1. Обнови Prisma до последней версии:
   npm install prisma@latest @prisma/client@latest
   
2. Исправь конфликт портов:
   - В package.json dev script добавь: "dev": "next dev -p 3001"
   - Или найди процесс на порту 3000: lsof -ti:3000 | xargs kill -9

3. Исправь missing lockfile dependencies:
   rm package-lock.json node_modules -rf
   npm install

4. CSS warnings (если есть):
   - Проверь что все CSS modules существуют
   - Удали неиспользуемые импорты стилей

5. Консольные ошибки:
   - Убрать все console.log в production коде
   - Заменить на console.warn/error где нужно
   - Добавить проверки if (process.env.NODE_ENV === 'development')

ЦЕЛЬ: Чистая консоль разработки без warnings.
```

**Проверка после выполнения:**
- [ ] npm run dev запускается без ошибок
- [ ] Prisma Client обновлен
- [ ] Консоль разработки чистая
- [ ] Все зависимости синхронизированы

---

## БЛОК 3: ФИНАЛЬНАЯ ПРОВЕРКА И ДОКУМЕНТАЦИЯ (ПРИОРИТЕТ 3)

### fix-task-6-5: Валидация и тестирование схемы БД
**Промпт для Cursor:**
```
Убедись в целостности всей БД архитектуры:

1. Полная проверка Prisma схемы:
   npx prisma validate
   npx prisma format
   npx prisma generate

2. Проверь все модели на связи:
   - Users → UserBookmarks ✓
   - Questions → UserBookmarks ✓  
   - UserBookmarks → RoadmapUserQuestions ✓
   - Users → UserLeoChats ✓
   - И т.д.

3. Протестируй критические запросы:
   - getQuestion() с includes
   - listQuestions() с фильтрами
   - Leo chats get/save
   - Bookmark create/delete

4. Создай файл docs/database-schema-status.md:
   # Статус БД схемы после исправлений
   
   ## ✅ Исправлено
   - RoadmapUserQuestions модель восстановлена
   - UserBookmarks связи работают
   - UserLeoChats функционал активен
   
   ## ⚠️ Временно отключено
   - [если что-то отключили]
   
   ## 📋 TODO для v2.0
   - [планы развития]

Это финальная проверка перед возвратом к разработке.
```

**Проверка после выполнения:**
- [ ] Вся схема БД валидна
- [ ] Все критические функции работают
- [ ] Документация обновлена
- [ ] Готов к продолжению разработки

### fix-task-6-7: Профилактика будущих проблем
**Промпт для Cursor:**
```
Создай систему предотвращения подобных проблем:

1. Создай файл scripts/check-db-dependencies.sh:
   ```bash
   #!/bin/bash
   echo "Checking database dependencies before cleanup..."
   
   # Поиск использования моделей в коде
   for model in "$@"; do
     echo "Checking usage of $model:"
     grep -r "prisma\.$model" src/ --include="*.ts" --include="*.tsx"
   done
   ```

2. В docs/DEVELOPMENT_RULES.md добавь:
   # Правила безопасности БД
   
   ## Перед удалением таблицы:
   1. Запустить: ./scripts/check-db-dependencies.sh modelName
   2. Найти ВСЕ использования в коде
   3. Либо рефакторить код, либо оставить таблицу
   4. НИКОГДА не удалять таблицы с активными связями
   
   ## Перед изменением схемы:
   1. Сделать бэкап
   2. Проверить npx prisma validate
   3. Тестировать генерацию типов
   4. Проверить критические запросы

3. Добавь pre-commit hook для проверки Prisma схемы

ЦЕЛЬ: Больше никогда не ломать БД схему.
```

**Проверка после выполнения:**
- [ ] Скрипт проверки зависимостей создан
- [ ] Правила разработки документированы
- [ ] Pre-commit hooks настроены
- [ ] Команда знает как избежать подобных проблем

---

## Критические напоминания:

1. **Тестируй каждый шаг** - npx prisma generate после каждого изменения
2. **Коммить часто** - не накапливай исправления
3. **Выбирай простые решения** - цель восстановить работоспособность, не идеальность
4. **Документируй временные решения** - что потом улучшать
5. **НЕ УДАЛЯЙ больше ничего** - только добавляй или исправляй
