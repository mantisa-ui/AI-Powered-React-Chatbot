/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable preserve-caught-error */
import OpenAI from 'openai';
import type { Message } from '../types/chat';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: import.meta.env.VITE_API_BASE_URL,
  dangerouslyAllowBrowser: true,
});

// System prompt - gives AI its personality
const SYSTEM_PROMPT = `You are a friendly, helpful AI assistant. 
You provide concise, accurate, and engaging responses. 
Use emojis occasionally to make conversations more friendly.
If you don't know something, say so honestly.
Format code with markdown code blocks when sharing code.`;

/**
 * Send a chat message and get AI response
 * @param messages - Full conversation history
 * @param signal - AbortSignal for cancellation
 */
export async function sendChatMessage(
  messages: Message[],
  signal?: AbortSignal
): Promise<string> {
  try {
    // Convert our Message format to OpenAI format
    const apiMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    const response = await openai.chat.completions.create(
      {
        model: import.meta.env.VITE_MODEL,
        messages: apiMessages,
        temperature: 0.7, // 0 = deterministic, 1 = creative
        max_tokens: 1024,
      },
      { signal } // Pass abort signal for cancellation
    );

    const reply = response.choices[0]?.message?.content;
    
    if (!reply) {
      throw new Error('No response from AI. Please try again.');
    }

    return reply;
  } catch (error: any) {
    // Handle specific error types
    if (error.name === 'AbortError') {
      throw new Error('Request cancelled by user.');
    }
    
    if (error.status === 401) {
      throw new Error('Invalid API key. Please check your .env file.');
    }
    
    if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment and try again.');
    }
    
    if (error.status === 500 || error.status === 503) {
      throw new Error('AI service is temporarily unavailable. Please try again.');
    }
    
    if (error.message?.includes('network') || error.message?.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }

    throw new Error(error.message || 'Something went wrong. Please try again.');
  }
}

// Keep the test function for reference
export async function testAPI() {
  const response = await openai.chat.completions.create({
    model: import.meta.env.VITE_MODEL,
    messages: [{ role: 'user', content: 'Say hello in 1 line!' }],
  });
  return response.choices[0]?.message?.content || '';
}