-- RLS политики для таблицы UserLeoChats
-- Эта миграция добавляет недостающие политики безопасности

-- Включение RLS для UserLeoChats
ALTER TABLE "UserLeoChats" ENABLE ROW LEVEL SECURITY;

-- Политика для просмотра собственных чатов
CREATE POLICY "Users can view own chats" ON "UserLeoChats"
  FOR SELECT USING (auth.uid() = "userUid");

-- Политика для создания собственных чатов
CREATE POLICY "Users can create own chats" ON "UserLeoChats"
  FOR INSERT WITH CHECK (auth.uid() = "userUid");

-- Политика для обновления собственных чатов (если понадобится)
CREATE POLICY "Users can update own chats" ON "UserLeoChats"
  FOR UPDATE USING (auth.uid() = "userUid");

-- Политика для удаления собственных чатов (если понадобится)
CREATE POLICY "Users can delete own chats" ON "UserLeoChats"
  FOR DELETE USING (auth.uid() = "userUid");

-- Комментарии для документации
COMMENT ON TABLE "UserLeoChats" IS 'История чатов пользователей с Leo AI assistant';
COMMENT ON POLICY "Users can view own chats" ON "UserLeoChats" IS 'Пользователи могут просматривать только свои чаты';
COMMENT ON POLICY "Users can create own chats" ON "UserLeoChats" IS 'Пользователи могут создавать только свои чаты';
COMMENT ON POLICY "Users can update own chats" ON "UserLeoChats" IS 'Пользователи могут обновлять только свои чаты';
COMMENT ON POLICY "Users can delete own chats" ON "UserLeoChats" IS 'Пользователи могут удалять только свои чаты'; 