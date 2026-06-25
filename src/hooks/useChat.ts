import { useCallback, useRef } from 'react';
import { sendChatMessage } from '../services/openai';
import { useChatStore } from '../store/chatStore';
import type { Message } from '../types/chat';

export function useChat() {
  const {
    chats,
    activeChatId,
    isLoading,
    error,
    createNewChat,
    setActiveChat,
    deleteChat,
    renameChat,
    addMessage,
    setLoading,
    setError,
    clearAllChats,
    getActiveChat,
    getActiveMessages,
  } = useChatStore();

  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    // Ensure there's an active chat
    let chatId = activeChatId;
    if (!chatId) {
      chatId = createNewChat();
    }

    // Create user message
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    // Add user message immediately
    addMessage(chatId, userMessage);
    setLoading(true);
    setError(null);

    abortControllerRef.current = new AbortController();

    try {
      // Get current messages including the new user message
      const currentMessages = [...getActiveMessages(), userMessage];

      const aiReply = await sendChatMessage(
        currentMessages,
        abortControllerRef.current.signal
      );

      const aiMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: aiReply,
        timestamp: Date.now(),
      };

      addMessage(chatId, aiMessage);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Failed to get response');
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [activeChatId, createNewChat, addMessage, setLoading, setError, getActiveMessages]);

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
    }
  }, [setLoading]);

  const retryLastMessage = useCallback(() => {
    const messages = getActiveMessages();
    if (messages.length === 0) return;

    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUserMsg) return;

    sendMessage(lastUserMsg.content);
  }, [getActiveMessages, sendMessage]);

  const activeChat = getActiveChat();
  const messages = getActiveMessages();

  return {
    // Active chat data
    chats,
    activeChat,
    activeChatId,
    messages,
    isLoading,
    error,
    
    // Actions
    sendMessage,
    cancelRequest,
    retryLastMessage,
    createNewChat,
    setActiveChat,
    deleteChat,
    renameChat,
    clearAllChats,
  };
}