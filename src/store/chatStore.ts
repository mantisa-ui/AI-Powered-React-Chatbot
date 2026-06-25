import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Chat, Message } from '../types/chat';

interface ChatStore {
  // State
  chats: Chat[];
  activeChatId: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  createNewChat: () => string;
  setActiveChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
  renameChat: (chatId: string, newTitle: string) => void;
  addMessage: (chatId: string, message: Message) => void;
  updateChatTitle: (chatId: string, title: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearAllChats: () => void;

  // Computed/Helpers
  getActiveChat: () => Chat | null;
  getActiveMessages: () => Message[];
}

const generateChatId = () => `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      activeChatId: null,
      isLoading: false,
      error: null,

      createNewChat: () => {
        const newChat: Chat = {
          id: generateChatId(),
          title: 'New Chat',
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        
        set((state) => ({
          chats: [newChat, ...state.chats],
          activeChatId: newChat.id,
          error: null,
        }));
        
        return newChat.id;
      },

      setActiveChat: (chatId) => {
        set({ activeChatId: chatId, error: null });
      },

      deleteChat: (chatId) => {
        set((state) => {
          const filteredChats = state.chats.filter((c) => c.id !== chatId);
          let newActiveId = state.activeChatId;
          
          // If deleting active chat, switch to first remaining or null
          if (state.activeChatId === chatId) {
            newActiveId = filteredChats[0]?.id || null;
          }
          
          return {
            chats: filteredChats,
            activeChatId: newActiveId,
          };
        });
      },

      renameChat: (chatId, newTitle) => {
        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === chatId ? { ...c, title: newTitle.trim() || 'Untitled', updatedAt: Date.now() } : c
          ),
        }));
      },

      addMessage: (chatId, message) => {
        set((state) => ({
          chats: state.chats.map((c) => {
            if (c.id !== chatId) return c;
            
            const updatedMessages = [...c.messages, message];
            
            // Auto-generate title from first user message
            let title = c.title;
            if (title === 'New Chat' && message.role === 'user') {
              title = message.content.slice(0, 40) + (message.content.length > 40 ? '...' : '');
            }
            
            return {
              ...c,
              title,
              messages: updatedMessages,
              updatedAt: Date.now(),
            };
          }),
        }));
      },

      updateChatTitle: (chatId, title) => {
        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === chatId ? { ...c, title } : c
          ),
        }));
      },

      setLoading: (loading) => set({ isLoading: loading }),
      
      setError: (error) => set({ error }),
      
      clearAllChats: () => set({ chats: [], activeChatId: null, error: null }),

      getActiveChat: () => {
        const state = get();
        return state.chats.find((c) => c.id === state.activeChatId) || null;
      },

      getActiveMessages: () => {
        const state = get();
        const activeChat = state.chats.find((c) => c.id === state.activeChatId);
        return activeChat?.messages || [];
      },
    }),
    {
      name: 'ai-chatbot-storage', // localStorage key
      partialize: (state) => ({
        // Only persist chats and activeChatId, not loading/error states
        chats: state.chats,
        activeChatId: state.activeChatId,
      }),
    }
  )
);