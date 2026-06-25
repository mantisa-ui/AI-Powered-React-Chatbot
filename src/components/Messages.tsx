import { Box, Avatar, Paper, Typography } from '@mui/material';
import { Person, SmartToy } from '@mui/icons-material';
import MarkdownRenderer from './MarkdownRenderer';
import type { Message as MessageType } from '../types/chat';

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        mb: 2,
        animation: 'fadeIn 0.3s ease-in',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <Avatar
        sx={{
          bgcolor: isUser ? 'primary.main' : 'secondary.main',
          width: 36,
          height: 36,
        }}
      >
        {isUser ? <Person fontSize="small" /> : <SmartToy fontSize="small" />}
      </Avatar>

      <Box
        sx={{
          maxWidth: '75%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isUser ? 'flex-end' : 'flex-start',
        }}
      >
        <Paper
          elevation={1}
          sx={{
            px: 2,
            py: 1.5,
            bgcolor: isUser ? 'primary.main' : 'background.paper',
            color: isUser ? 'white' : 'text.primary',
            borderRadius: 2,
            borderTopRightRadius: isUser ? 0 : 2,
            borderTopLeftRadius: isUser ? 2 : 0,
          }}
        >
          <MarkdownRenderer content={message.content} isUser={isUser} />
        </Paper>
        <Typography
          variant="caption"
          sx={{ mt: 0.5, color: 'text.secondary', fontSize: '11px' }}
        >
          {formatTime(message.timestamp)}
        </Typography>
      </Box>
    </Box>
  );
}