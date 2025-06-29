'use server';

import { getUser } from '@/actions/user/authed/get-user';

// ai
import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import { z } from 'zod';

// Schema for Leo responses
const leoResponseSchema = z.object({
  content: z.string().describe('Ответ Leo на вопрос пользователя о бизнесе'),
  suggestions: z.array(z.string()).optional().describe('Предложения для продолжения диалога'),
});

// Define the message interface
interface LeoMessage {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

/**
 * Generate Leo AI response for business questions
 * 
 * @param userMessage - The user's message
 * @param systemPrompt - Context-aware system prompt
 * @param previousMessages - Previous chat messages for context
 * @returns Streamable AI response
 */
export const generateLeoResponse = async (
  userMessage: string,
  systemPrompt: string,
  previousMessages: LeoMessage[] = []
) => {
  'use server';

  // Get the current user
  const user = await getUser();
  if (!user) {
    console.error('User not found for Leo chat');
    return {
      object: null,
      content: null,
    };
  }

  // Create a streamable value
  const stream = createStreamableValue();

  // Build the conversation history
  const messages: LeoMessage[] = [
    {
      role: 'system',
      content: systemPrompt,
    },
  ];

  // Add previous conversation context if available (last 6 messages)
  if (previousMessages.length > 0) {
    messages.push(...previousMessages.slice(-6));
  }

  // Add the current user message
  messages.push({
    role: 'user',
    content: userMessage,
  });

  // Start the stream generation in the background
  (async () => {
    try {
      // Generate the Leo response
      const { partialObjectStream } = streamObject({
        model: openai('gpt-4o-mini-2024-07-18'),
        temperature: 0.7, // Slightly higher for more creative business advice
        messages: messages,
        schema: leoResponseSchema,
      });

      // Loop through the streamed response and update the state
      for await (const partialObject of partialObjectStream) {
        stream.update(partialObject);
      }

      // Mark the stream as completed
      stream.done();
    } catch (error) {
      console.error('Error generating Leo response:', error);
      stream.update({ 
        content: 'Извини, у меня возникли технические проблемы. Попробуй задать вопрос ещё раз! 🤖',
        suggestions: ['Как начать свой бизнес?', 'Что такое бизнес-модель?']
      });
      stream.done();
    }
  })();

  return {
    object: stream.value,
    content: null,
  };
}; 