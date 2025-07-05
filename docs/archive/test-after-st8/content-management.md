# Управление контентом BizLevel

Этот документ описывает, как администраторы добавляют и редактируют бизнес-уроки, уровни и связанные ресурсы.

## 1. Уровни (Levels)
* Уровень определяется тегом вида `level-1`, `level-2` …
* Каждый уровень состоит минимум из:
  * 1 приветственного MULTIPLE_CHOICE вопроса
  * 1+ VIDEO уроков (Vimeo ID хранится в `Questions.videoId`)
  * 1+ MULTIPLE_CHOICE тестов
  * 1 финального теста
* Навигация между вопросами задаётся полями `previousQuestionSlug` и `nextQuestionSlug`.

### Создание нового уровня
См. чеклист ниже или `docs/level-add-checklist.md`.

## 2. Добавление уроков
1. Создайте запись в таблице **Questions**:
   - `questionType` = `VIDEO` или `MULTIPLE_CHOICE`
   - `videoId` (только для VIDEO) – числовой ID Vimeo.
   - `slug` – уникальный, человеко-читаемый.
2. Привяжите теги:
   ```sql
   INSERT INTO "QuestionTags" ("questionId", "tagId")
   VALUES ('{questionUid}', (SELECT "uid" FROM "Tag" WHERE name = 'level-1'));
   ```
3. Для материалов добавьте строки в **QuestionResources** (PDF, ссылки).

## 3. Админ-панель
Пути:
* `/admin/levels` – обзор уровней, статистика.
* `/admin/levels/[levelTag]` – список вопросов уровня, Vimeo ID, ресурсы.

## 4. Скрипты валидации
* `npm run validate:levels` ― проверяет цепочки навигации, наличие видео и тестов.
* `scripts/validate-levels.ts` — логи ✅/⚠️/❌.

## 5. Обновление прогресса
После добавления новых уроков **обязательно** выполнить:
```
npm run validate:levels
npm run sv:generate  # генерация types (если используется)
```

---
Документ обновляется при каждом изменении схемы или бизнес-процесса. 