import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Tooltip,
} from '@mui/material';
import { ChatBubbleOutlined, Delete, Edit, Check, Close } from '@mui/icons-material';
import type { Chat } from '../types/chat';

interface ChatItemProps {
  chat: Chat;
  isActive: boolean;
  onSelect: () => void;
  onRename: (newTitle: string) => void;
  onDelete: () => void;
}

export default function ChatItem({ chat, isActive, onSelect, onRename, onDelete }: ChatItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(chat.title);
  const [showActions, setShowActions] = useState(false);

  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditTitle(chat.title);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onRename(editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(chat.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') handleSaveEdit();
    if (e.key === 'Escape') handleCancelEdit();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this chat?')) {
      onDelete();
    }
  };

  return (
    <Box
      onClick={!isEditing ? onSelect : undefined}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 1.2,
        mx: 1,
        mb: 0.5,
        borderRadius: 1.5,
        cursor: isEditing ? 'default' : 'pointer',
        bgcolor: isActive ? 'primary.light' : 'transparent',
        color: isActive ? 'white' : 'text.primary',
        transition: 'all 0.2s',
        '&:hover': {
          bgcolor: isActive ? 'primary.light' : 'action.hover',
        },
      }}
    >
      <ChatBubbleOutlined fontSize="small" sx={{ flexShrink: 0, opacity: 0.8 }} />

      {isEditing ? (
        <Box sx={{ display: 'flex', flex: 1, gap: 0.5, alignItems: 'center' }}>
          <TextField
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            size="small"
            variant="standard"
            fullWidth
            sx={{
              '& input': {
                fontSize: 14,
                color: isActive ? 'white' : 'text.primary',
                p: 0,
              },
            }}
          />
          <IconButton size="small" onClick={handleSaveEdit} sx={{ color: 'inherit', p: 0.3 }}>
            <Check fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={handleCancelEdit} sx={{ color: 'inherit', p: 0.3 }}>
            <Close fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <>
          <Typography
            variant="body2"
            sx={{
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: 14,
              fontWeight: isActive ? 600 : 400,
            }}
          >
            {chat.title}
          </Typography>

          {showActions && (
            <Box sx={{ display: 'flex', gap: 0.3, opacity: 0.8 }}>
              <Tooltip title="Rename">
                <IconButton size="small" onClick={handleStartEdit} sx={{ color: 'inherit', p: 0.3 }}>
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton size="small" onClick={handleDelete} sx={{ color: 'inherit', p: 0.3 }}>
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}