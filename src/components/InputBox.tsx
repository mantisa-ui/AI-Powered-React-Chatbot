import { useState, type KeyboardEvent } from 'react';
import { TextField, IconButton, Paper } from '@mui/material';
import { Send, Stop } from '@mui/icons-material';

interface InputBoxProps {
  onSend: (message: string) => void;
  onCancel?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function InputBox({ onSend, onCancel, disabled, isLoading }: InputBoxProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 1.5,
        display: 'flex',
        gap: 1,
        alignItems: 'flex-end',
        borderRadius: 3,
        bgcolor: 'background.paper',
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder={isLoading ? 'AI is thinking...' : 'Type your message... (Shift+Enter for new line)'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        variant="standard"
        slotProps={{ input: { disableUnderline: true, sx: { fontSize: 15 } } }}
        sx={{ '& .MuiInputBase-root': { px: 1 } }}
      />
      {isLoading && onCancel ? (
        <IconButton
          onClick={onCancel}
          sx={{
            bgcolor: 'error.main',
            color: 'white',
            '&:hover': { bgcolor: 'error.dark' },
          }}
        >
          <Stop fontSize="small" />
        </IconButton>
      ) : (
        <IconButton
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': { bgcolor: 'primary.dark' },
            '&:disabled': { bgcolor: 'grey.300', color: 'grey.500' },
            transition: 'all 0.2s',
          }}
        >
          <Send fontSize="small" />
        </IconButton>
      )}
    </Paper>
  );
}