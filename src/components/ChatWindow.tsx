import { useEffect, useRef, useState } from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';
import Message from './Messages';
import InputBox from './InputBox';
import TypingIndicator from './TypingIndicator';
import WelcomeScreen from './WelcomeScreen';
import ErrorMessage from './ErrorMessage';
import Sidebar from './Sidebar';
import { useChat } from '../hooks/useChat';

export default function ChatWindow() {
  const {
    chats,
    activeChat,
    activeChatId,
    messages,
    isLoading,
    error,
    sendMessage,
    cancelRequest,
    retryLastMessage,
    createNewChat,
    setActiveChat,
    deleteChat,
    renameChat,
  } = useChat();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Close mobile sidebar when chat is selected
  const handleSelectChat = (chatId: string) => {
    setActiveChat(chatId);
    setIsMobileSidebarOpen(false);
  };

  const handleNewChat = () => {
    createNewChat();
    setIsMobileSidebarOpen(false);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onRenameChat={renameChat}
        onDeleteChat={deleteChat}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Chat Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header
          onMenuClick={() => setIsMobileSidebarOpen(true)}
          chatTitle={activeChat?.title}
        />

        <Container
          maxWidth="md"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            py: 3,
            overflow: 'hidden',
          }}
        >
          {/* Messages Area */}
          <Box sx={{ flex: 1, overflowY: 'auto', pr: 1, mb: 2 }}>
            {messages.length === 0 ? (
              <WelcomeScreen onPromptClick={sendMessage} />
            ) : (
              <>
                {messages.map((msg) => (
                  <Message key={msg.id} message={msg} />
                ))}
                {isLoading && <TypingIndicator />}
                {error && <ErrorMessage message={error} onRetry={retryLastMessage} />}
                <div ref={messagesEndRef} />
              </>
            )}
          </Box>

          {/* Input Box */}
          <InputBox
            onSend={sendMessage}
            onCancel={cancelRequest}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </Container>
      </Box>
    </Box>
  );
}