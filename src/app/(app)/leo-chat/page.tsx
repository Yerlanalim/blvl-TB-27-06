// BIZLEVEL: Страница чата с Leo - бизнес-наставником

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Plus, MessageSquare, Clock, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

// Типы
interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

// Заглушечные данные для истории чатов
const mockChatHistory: ChatSession[] = [
  {
    id: '1',
    title: 'Как начать бизнес',
    lastMessage: 'Спасибо за совет по бизнес-плану!',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 минут назад
    messageCount: 8,
  },
  {
    id: '2', 
    title: 'Маркетинговые стратегии',
    lastMessage: 'Какие ещё способы привлечения клиентов есть?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 часа назад
    messageCount: 12,
  },
  {
    id: '3',
    title: 'Финансовое планирование',
    lastMessage: 'Объясни про денежный поток подробнее',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // вчера
    messageCount: 6,
  },
];

// Заглушечные сообщения для активного чата
const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Привет! Я Leo, ваш персональный бизнес-наставник. Готов помочь вам в изучении предпринимательства. О чём хотите поговорить?',
    isUser: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: '2', 
    content: 'Привет Leo! Хочу узнать, как правильно составить бизнес-план для стартапа.',
    isUser: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 50),
  },
  {
    id: '3',
    content: 'Отличный вопрос! Бизнес-план - это фундамент успешного стартапа. Давайте разберём ключевые компоненты:\n\n1. **Краткое описание** - суть вашей идеи в 1-2 предложениях\n2. **Анализ рынка** - кто ваши клиенты и конкуренты\n3. **Продукт/услуга** - что именно вы предлагаете\n4. **Маркетинговая стратегия** - как привлекать клиентов\n5. **Финансовый план** - доходы, расходы, прибыль\n\nС какого раздела хотите начать?',
    isUser: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 48),
  },
];

// Быстрые вопросы для начала разговора
const quickStartQuestions = [
  'Как начать свой бизнес?',
  'Объясни основы маркетинга',
  'Что такое бизнес-модель?',
  'Как найти инвесторов?',
];

export default function LeoChatPage() {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chatHistory] = useState<ChatSession[]>(mockChatHistory);

  // Группировка истории по датам
  const groupedHistory = chatHistory.reduce((groups, session) => {
    const date = session.timestamp.toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(session);
    return groups;
  }, {} as Record<string, ChatSession[]>);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    // Имитация ответа Leo
    setTimeout(() => {
      const leoResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Это отличный вопрос! Я анализирую вашу ситуацию и готовлю развёрнутый ответ с практическими советами...',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, leoResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setNewMessage(question);
  };

  const handleNewChat = () => {
    setSelectedSession(null);
    setMessages([]);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Сегодня';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Вчера';
    } else {
      return date.toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  return (
    <div className="flex h-screen max-h-screen overflow-hidden">
      {/* Боковая панель с историей чатов */}
      <div className={cn(
        "transition-all duration-300 bg-background border-r",
        isSidebarOpen ? "w-80" : "w-0",
        "lg:w-80 lg:block"
      )}>
        <div className="flex flex-col h-full">
          {/* Заголовок */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Чаты с Leo</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNewChat}
                className="h-8 px-2"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* История чатов */}
          <div className="flex-1 overflow-y-auto p-2">
            {Object.entries(groupedHistory).map(([date, sessions]) => (
              <div key={date} className="mb-4">
                <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2">
                  {formatDate(new Date(date))}
                </h3>
                <div className="space-y-1">
                  {sessions.map((session) => (
                    <Card
                      key={session.id}
                      className={cn(
                        "p-3 cursor-pointer transition-all hover:bg-accent/50",
                        selectedSession === session.id && "bg-accent"
                      )}
                      onClick={() => setSelectedSession(session.id)}
                    >
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-medium truncate">
                            {session.title}
                          </h4>
                          <p className="text-xs text-muted-foreground truncate">
                            {session.lastMessage}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(session.timestamp, { 
                                locale: ru, 
                                addSuffix: true 
                              })}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              • {session.messageCount} сообщений
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Основная область чата */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Заголовок чата */}
        <div className="p-4 border-b bg-background">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Leo - Бизнес Наставник</h1>
              <p className="text-sm text-muted-foreground">
                Ваш персональный помощник в изучении предпринимательства
              </p>
            </div>
          </div>
        </div>

        {/* Область сообщений */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            /* Начальное состояние */
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Добро пожаловать в чат с Leo! 👋
                </h2>
                <p className="text-muted-foreground">
                  Я помогу вам изучить основы бизнеса и предпринимательства. 
                  Выберите вопрос ниже или задайте свой.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickStartQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="text-left justify-start h-auto p-4 whitespace-normal"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            /* Сообщения */
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.isUser ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent"
                    )}
                  >
                    <div className="whitespace-pre-wrap text-sm">
                      {message.content}
                    </div>
                    <div className={cn(
                      "text-xs mt-2 opacity-70",
                      message.isUser ? "text-right" : "text-left"
                    )}>
                      {message.timestamp.toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-accent rounded-lg p-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                      Leo печатает...
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Форма ввода */}
        <div className="p-4 border-t bg-background">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Задайте вопрос о бизнесе..."
                className="min-h-[44px] max-h-32 resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isLoading}
                className="self-end"
              >
                Отправить
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Leo может ошибаться. Проверяйте важную информацию.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 