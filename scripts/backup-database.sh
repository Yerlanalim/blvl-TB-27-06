#!/bin/bash

# BizLevel Database Backup Script
# Создает полный бэкап базы данных перед Stage 6.1 изменениями

set -e

# Конфигурация
PROJECT_ID="${1:-sccuzcjodwipzcjiixau}"
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="bizlevel_backup_${TIMESTAMP}"

# Создаем директорию для бэкапов
mkdir -p "$BACKUP_DIR"

echo "🚀 Начинаем создание бэкапа базы данных BizLevel..."
echo "📂 Project ID: $PROJECT_ID"
echo "📅 Timestamp: $TIMESTAMP"

# Проверяем наличие supabase CLI
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI не найден. Установите его с https://supabase.com/docs/guides/cli"
    exit 1
fi

# Логинимся в Supabase (если не залогинены)
echo "🔐 Проверяем авторизацию в Supabase..."
if ! supabase auth list &> /dev/null; then
    echo "Необходимо авторизоваться в Supabase CLI:"
    supabase login
fi

# Создаем SQL дамп схемы
echo "📋 Создаем дамп схемы..."
supabase db dump --project-id "$PROJECT_ID" > "$BACKUP_DIR/${BACKUP_NAME}_schema.sql"

# Создаем SQL дамп данных
echo "💾 Создаем дамп данных..."
supabase db dump --project-id "$PROJECT_ID" --data-only > "$BACKUP_DIR/${BACKUP_NAME}_data.sql"

# Создаем полный дамп (схема + данные)
echo "🔄 Создаем полный дамп..."
supabase db dump --project-id "$PROJECT_ID" --schema public > "$BACKUP_DIR/${BACKUP_NAME}_full.sql"

# Экспортируем системную информацию
echo "🔧 Экспортируем системную информацию..."
cat > "$BACKUP_DIR/${BACKUP_NAME}_info.txt" << EOF
BizLevel Database Backup Information
====================================
Backup Date: $(date)
Project ID: $PROJECT_ID
Project Region: eu-central-1
Database Version: PostgreSQL 15.8.1.102
Backup Type: Full SQL dump with schema and data

Files Created:
- ${BACKUP_NAME}_schema.sql - Database schema only
- ${BACKUP_NAME}_data.sql - Data only
- ${BACKUP_NAME}_full.sql - Complete backup (schema + data)
- ${BACKUP_NAME}_recovery.md - Recovery instructions

Stage 6.1 Changes to be Applied:
1. Migration: codeSnippet → videoUrl for VIDEO questions
2. Table cleanup: Remove empty/unused tables
3. Field cleanup: Clear codeSnippet for VIDEO type questions

Important Tables:
- Users: $(wc -l < <(echo "SELECT COUNT(*) FROM \"Users\";" | psql "$DATABASE_URL" -t 2>/dev/null || echo "N/A")) records
- Questions: $(wc -l < <(echo "SELECT COUNT(*) FROM \"Questions\";" | psql "$DATABASE_URL" -t 2>/dev/null || echo "N/A")) records
- Subscriptions: $(wc -l < <(echo "SELECT COUNT(*) FROM \"Subscriptions\";" | psql "$DATABASE_URL" -t 2>/dev/null || echo "N/A")) records
EOF

# Создаем инструкции по восстановлению
cat > "$BACKUP_DIR/${BACKUP_NAME}_recovery.md" << 'EOF'
# BizLevel Database Recovery Instructions

## Быстрое восстановление (полный бэкап)

```bash
# 1. Подключитесь к проекту Supabase
supabase link --project-ref YOUR_PROJECT_ID

# 2. Восстановите полный бэкап
psql -h db.YOUR_PROJECT_ID.supabase.co -p 5432 -d postgres -U postgres < BACKUP_NAME_full.sql

# 3. Или используйте Supabase CLI
supabase db reset --linked
psql "$DATABASE_URL" < BACKUP_NAME_full.sql
```

## Частичное восстановление

### Только схема:
```bash
psql "$DATABASE_URL" < BACKUP_NAME_schema.sql
```

### Только данные:
```bash
psql "$DATABASE_URL" < BACKUP_NAME_data.sql
```

## Откат изменений Stage 6.1

### 1. Откат миграции codeSnippet → videoUrl:
```sql
-- Восстановить codeSnippet для VIDEO вопросов из бэкапа
UPDATE "Questions" 
SET "codeSnippet" = backup."codeSnippet"
FROM backup_questions_table backup
WHERE "Questions"."uid" = backup."uid" 
AND "Questions"."questionType" = 'VIDEO';

-- Очистить videoUrl если нужно
UPDATE "Questions" 
SET "videoUrl" = NULL 
WHERE "questionType" = 'VIDEO';
```

### 2. Восстановление удаленных таблиц:
```bash
# Извлечь создание конкретной таблицы из бэкапа
grep -A 50 "CREATE TABLE.*TableName" BACKUP_NAME_schema.sql > restore_table.sql
psql "$DATABASE_URL" < restore_table.sql
```

## Проверка целостности после восстановления

```sql
-- Проверить количество записей
SELECT 'Users' as table_name, COUNT(*) as count FROM "Users"
UNION ALL
SELECT 'Questions', COUNT(*) FROM "Questions"
UNION ALL
SELECT 'Subscriptions', COUNT(*) FROM "Subscriptions";

-- Проверить ограничения внешних ключей
SELECT conname, conrelid::regclass, confrelid::regclass 
FROM pg_constraint 
WHERE contype = 'f' AND connamespace = 'public'::regnamespace;
```

## Контакты для поддержки

- Проект: BizLevel
- Email: team@bizlevel.kz
- Бэкап создан: $(date)
EOF

# Создаем сжатый архив
echo "📦 Создаем сжатый архив..."
cd "$BACKUP_DIR"
tar -czf "${BACKUP_NAME}.tar.gz" \
    "${BACKUP_NAME}_schema.sql" \
    "${BACKUP_NAME}_data.sql" \
    "${BACKUP_NAME}_full.sql" \
    "${BACKUP_NAME}_info.txt" \
    "${BACKUP_NAME}_recovery.md"

# Удаляем отдельные файлы, оставляем только архив
rm "${BACKUP_NAME}_schema.sql" \
   "${BACKUP_NAME}_data.sql" \
   "${BACKUP_NAME}_full.sql" \
   "${BACKUP_NAME}_info.txt" \
   "${BACKUP_NAME}_recovery.md"

cd ..

# Выводим информацию о созданном бэкапе
ARCHIVE_SIZE=$(du -h "$BACKUP_DIR/${BACKUP_NAME}.tar.gz" | cut -f1)
echo ""
echo "✅ Бэкап успешно создан!"
echo "📁 Файл: $BACKUP_DIR/${BACKUP_NAME}.tar.gz"
echo "📏 Размер: $ARCHIVE_SIZE"
echo ""
echo "🔄 Для восстановления:"
echo "   tar -xzf $BACKUP_DIR/${BACKUP_NAME}.tar.gz"
echo "   Следуйте инструкциям в ${BACKUP_NAME}_recovery.md"
echo ""
echo "🚀 Можно продолжать с изменениями Stage 6.1" 