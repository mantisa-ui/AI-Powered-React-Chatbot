import { useMemo } from 'react';
import {
  Box,
  Button,
  Typography,
  Divider,
  Drawer,
} from '@mui/material';
import { Add, SmartToy } from '@mui/icons-material';
import ChatItem from './ChatItem';
import type { Chat } from '../types/chat';

interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onRenameChat: (chatId: string, newTitle: string) => void;
  onDeleteChat: (chatId: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const SIDEBAR_WIDTH = 280;

// Group chats by date
function groupChatsByDate(chats: Chat[]) {
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const SEVEN_DAYS = 7 * ONE_DAY;

  const groups: { [key: string]: Chat[] } = {
    Today: [],
    Yesterday: [],
    'Last 7 days': [],
    Older: [],
  };

  chats.forEach((chat) => {
    const diff = now - chat.updatedAt;
    if (diff < ONE_DAY) groups['Today'].push(chat);
    else if (diff < 2 * ONE_DAY) groups['Yesterday'].push(chat);
    else if (diff < SEVEN_DAYS) groups['Last 7 days'].push(chat);
    else groups['Older'].push(chat);
  });

  return groups;
}

function SidebarContent({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onRenameChat,
  onDeleteChat,
}: Omit<SidebarProps, 'isMobileOpen' | 'onMobileClose'>) {
  const groupedChats = useMemo(() => {
    const sorted = [...chats].sort((a, b) => b.updatedAt - a.updatedAt);
    return groupChatsByDate(sorted);
  }, [chats]);

  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Logo/Brand */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <SmartToy sx={{ color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          AI Chatbot
        </Typography>
      </Box>

      {/* New Chat Button */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Add />}
          onClick={onNewChat}
          sx={{
            background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
            color: 'white',
            py: 1,
            borderRadius: 2,
            fontWeight: 600,
            '&:hover': {
              background: 'linear-gradient(135deg, #4F46E5 0%, #DB2777 100%)',
            },
          }}
        >
          New Chat
        </Button>
      </Box>

      <Divider />

      {/* Chat List */}
      <Box sx={{ flex: 1, overflowY: 'auto', py: 1 }}>
        {chats.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No chats yet. Start a new conversation!
            </Typography>
          </Box>
        ) : (
          Object.entries(groupedChats).map(([groupName, groupChats]) => {
            if (groupChats.length === 0) return null;
            return (
              <Box key={groupName} sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  sx={{
                    px: 2,
                    py: 0.5,
                    display: 'block',
                    color: 'text.secondary',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: 11,
                  }}
                >
                  {groupName}
                </Typography>
                {groupChats.map((chat) => (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    isActive={chat.id === activeChatId}
                    onSelect={() => onSelectChat(chat.id)}
                    onRename={(newTitle) => onRenameChat(chat.id, newTitle)}
                    onDelete={() => onDeleteChat(chat.id)}
                  />
                ))}
              </Box>
            );
          })
        )}
      </Box>

      {/* Footer */}
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 11 }}>
          {chats.length} {chats.length === 1 ? 'chat' : 'chats'} · Powered by Groq
        </Typography>
      </Box>
    </Box>
  );
}

export default function Sidebar(props: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar - Always visible on large screens */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, flexShrink: 0 }}>
        <SidebarContent {...props} />
      </Box>

      {/* Mobile Drawer - Slides in on small screens */}
      <Drawer
        variant="temporary"
        open={props.isMobileOpen}
        onClose={props.onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: SIDEBAR_WIDTH },
        }}
      >
        <SidebarContent {...props} />
      </Drawer>
    </>
  );
}