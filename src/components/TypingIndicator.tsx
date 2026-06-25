import { Box, Avatar, Paper } from '@mui/material';
import { SmartToy } from '@mui/icons-material';

export default function TypingIndicator() {
  return (
    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', mb: 2 }}>
      <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36 }}>
        <SmartToy fontSize="small" />
      </Avatar>
      <Paper
        elevation={1}
        sx={{
          px: 2,
          py: 1.5,
          bgcolor: 'background.paper',
          borderRadius: 2,
          borderTopLeftRadius: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: 'text.secondary',
              animation: 'bounce 1.4s infinite ease-in-out',
              animationDelay: `${i * 0.2}s`,
              '@keyframes bounce': {
                '0%, 60%, 100%': { transform: 'translateY(0)', opacity: 0.4 },
                '30%': { transform: 'translateY(-8px)', opacity: 1 },
              },
            }}
          />
        ))}
      </Paper>
    </Box>
  );
}