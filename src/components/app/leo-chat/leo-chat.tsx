'use client';

import { useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ChatBot from '@/components/ui/icons/chat-bot';
import { Send, X, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeoContext } from '@/hooks/use-leo-context';
import { generateLeoResponse } from '@/actions/ai/leo/leo-chat';
import { readStreamableValue } from 'ai/rsc';
import { getRecentLeoChats, saveLeoChat, type LeoChat } from '@/utils/data/leo-chats';

// Define message types for Leo chat
interface LeoMessage {
  type: 'user' | 'leo';
  content: string | any;
  timestamp: Date;
}

export default function LeoChat() {
  // Chat window state
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Chat state with AI integration
  const [messages, setMessages] = useState<LeoMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const [isTyping, setIsTyping] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  
  // Get context for Leo AI
  const { systemPrompt, context } = useLeoContext();

  // Load chat state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('leo-chat-open');
    if (savedState === 'true') {
      setIsOpen(true);
    }
  }, []);

  // Load chat history when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0 && !isLoadingHistory) {
      loadChatHistory();
    }
  }, [isOpen]);

  const loadChatHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const chatHistory = await getRecentLeoChats({ limit: 20 });
      
      // Convert database chats to LeoMessage format
      const convertedMessages: LeoMessage[] = [];
      chatHistory.forEach((chat) => {
        // Add user message
        convertedMessages.push({
          type: 'user',
          content: chat.message,
          timestamp: chat.createdAt,
        });
        
        // Add Leo response
        convertedMessages.push({
          type: 'leo',
          content: { content: chat.response },
          timestamp: chat.createdAt,
        });
      });
      
      setMessages(convertedMessages);
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Save chat state to localStorage
  useEffect(() => {
    localStorage.setItem('leo-chat-open', isOpen.toString());
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const restoreChat = () => {
    setIsMinimized(false);
  };

  // AI-powered message handler
  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isPending) return;

    const userMessage: LeoMessage = {
      type: 'user',
      content: currentMessage,
      timestamp: new Date(),
    };

    // Add user message
    setMessages((prev) => [...prev, userMessage]);
    
    // Clear input and show typing indicator
    const messageToSend = currentMessage;
    setCurrentMessage('');
    setIsTyping(true);

    startTransition(async () => {
      try {
        // Prepare previous messages for context
        const previousMessages = messages.slice(-4).map(msg => ({
          role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
          content: typeof msg.content === 'string' ? msg.content : msg.content.content || '',
        }));

        // Call Leo AI
        const { object } = await generateLeoResponse(messageToSend, systemPrompt, previousMessages);

        if (!object) {
          throw new Error('No response from Leo AI');
        }

        // Add placeholder message for streaming
        const placeholderMessage: LeoMessage = {
          type: 'leo',
          content: { content: '', isLoading: true },
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, placeholderMessage]);
        setIsTyping(false);

        // Process streamed response
        let finalResponse = '';
        for await (const partialObject of readStreamableValue(object)) {
          if (partialObject) {
            finalResponse = partialObject.content || '';
            setMessages((prev) =>
              prev.map((msg, idx) =>
                idx === prev.length - 1 
                  ? { ...msg, content: partialObject }
                  : msg
              )
            );
          }
        }

        // Save chat to database after streaming is complete
        if (finalResponse) {
          try {
            await saveLeoChat({
              message: messageToSend,
              response: finalResponse,
              context: context,
            });
          } catch (error) {
            console.error('Error saving chat to database:', error);
            // Don't show error to user, just log it
          }
        }
      } catch (error) {
        console.error('Error getting Leo response:', error);
        setIsTyping(false);
        
        // Add error message
        const errorMessage: LeoMessage = {
          type: 'leo',
          content: {
            content: 'Извини, у меня возникли проблемы 😅 Попробуй задать вопрос ещё раз!',
          },
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    });
  };

  const clearChat = () => {
    setMessages([]);
    // Note: This only clears the UI, saved history in database remains intact
    // To load history again, user can close and reopen the chat
  };

  return (
    <>
      {/* Floating chat button */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-accent hover:bg-accent/90 shadow-lg"
          size="icon"
        >
          <ChatBot className="w-6 h-6" fill="white" secondaryfill="white" />
        </Button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? '60px' : 'auto'
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`fixed z-40 bg-black-100 border border-black-50 rounded-lg shadow-xl
              ${isMinimized 
                ? 'bottom-20 right-4 w-80' 
                : 'bottom-20 right-4 w-96 h-[600px] md:w-96 md:h-[600px] sm:w-screen sm:h-screen sm:bottom-0 sm:right-0 sm:rounded-none'
              }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-black-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <h3 className="text-white font-semibold">Leo - твой бизнес-наставник</h3>
              </div>
              
              <div className="flex items-center gap-2">
                {!isMinimized && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={minimizeChat}
                    className="text-gray-400 hover:text-white h-8 w-8 p-0"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChat}
                  className="text-gray-400 hover:text-white h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat content - hidden when minimized */}
            {!isMinimized && (
              <>
                {/* Messages area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px]">
                  {isLoadingHistory ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                        <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <p className="text-gray-400 text-sm">Загружаю историю чата...</p>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                        <span className="text-accent font-bold text-xl">L</span>
                      </div>
                      <h4 className="text-white font-semibold mb-2">Привет! Я Leo 👋</h4>
                      <p className="text-gray-400 text-sm max-w-xs">
                        Твой персональный бизнес-наставник. Задай мне любой вопрос о предпринимательстве!
                      </p>
                      
                      {/* Quick start buttons */}
                      <div className="flex flex-wrap gap-2 mt-4 max-w-xs">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentMessage("Как начать свой бизнес?")}
                          className="text-xs border-black-50 text-gray-300 hover:bg-black-75"
                        >
                          Как начать бизнес?
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentMessage("Что такое бизнес-модель?")}
                          className="text-xs border-black-50 text-gray-300 hover:bg-black-75"
                        >
                          Что такое бизнес-модель?
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentMessage("Как найти инвесторов?")}
                          className="text-xs border-black-50 text-gray-300 hover:bg-black-75"
                        >
                          Как найти инвесторов?
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className="flex items-start gap-2 max-w-[80%]">
                            {message.type === 'leo' && (
                              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-white font-bold text-xs">L</span>
                              </div>
                            )}
                            <div
                              className={`rounded-lg p-3 ${
                                message.type === 'user' 
                                  ? 'bg-accent text-white' 
                                  : 'bg-black-75 text-white'
                              }`}
                            >
                              {message.type === 'user' ? (
                                <p className="text-sm">{message.content}</p>
                              ) : (
                                <div className="text-sm">
                                  {typeof message.content === 'string' ? (
                                    <p>{message.content}</p>
                                  ) : message.content.isLoading ? (
                                    <div className="flex items-center gap-2">
                                      <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                      </div>
                                      <span className="text-gray-400">Leo печатает...</span>
                                    </div>
                                  ) : message.content.error ? (
                                    <p className="text-red-400">{message.content.error}</p>
                                  ) : (
                                    <div>
                                      <p>{message.content.content}</p>
                                      {message.content.suggestions && message.content.suggestions.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                          {message.content.suggestions.map((suggestion: string, idx: number) => (
                                            <Button
                                              key={idx}
                                              variant="outline"
                                              size="sm"
                                              onClick={() => setCurrentMessage(suggestion)}
                                              className="text-xs border-black-50 text-gray-300 hover:bg-black-75"
                                            >
                                              {suggestion}
                                            </Button>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                              <p className="text-xs opacity-70 mt-1">
                                {message.timestamp.toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Clear chat button */}
                      {messages.length > 0 && (
                        <div className="flex justify-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearChat}
                            className="text-gray-400 hover:text-white text-xs"
                          >
                            Очистить чат
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Input area */}
                <div className="p-4 border-t border-black-50">
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex items-center gap-2 mb-2 text-gray-400 text-sm">
                      <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">L</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Leo печатает</span>
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-end gap-2">
                    <Textarea
                      placeholder={isPending ? "Leo отвечает..." : "Задай вопрос о бизнесе..."}
                      className="min-h-10 h-10 text-white border border-black-50 resize-none bg-black-75"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      disabled={isPending}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button
                      size="icon"
                      variant="secondary"
                      disabled={!currentMessage.trim() || isPending}
                      onClick={handleSendMessage}
                      className="h-10 w-10 flex-shrink-0 bg-accent hover:bg-accent/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Minimized state click handler */}
            {isMinimized && (
              <div 
                className="cursor-pointer h-full flex items-center"
                onClick={restoreChat}
              >
                <div className="flex items-center gap-3 px-4">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-white font-bold text-sm">L</span>
                  </div>
                  <span className="text-white font-medium">Leo</span>
                  {messages.length > 0 && (
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 