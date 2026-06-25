import { Box, Typography, Paper, Stack } from '@mui/material';
import { SmartToy, AutoAwesome, Code, Lightbulb, QuestionAnswer } from '@mui/icons-material';

interface WelcomeScreenProps {
  onPromptClick: (prompt: string) => void;
}

const EXAMPLE_PROMPTS = [
  {
    icon: <Code fontSize="small" />,
    title: 'Code Help',
    prompt: 'Explain React useEffect hook with a simple example',
  },
  {
    icon: <Lightbulb fontSize="small" />,
    title: 'Ideas',
    prompt: 'Give me 5 ideas for a side project as a React developer',
  },
  {
    icon: <QuestionAnswer fontSize="small" />,
    title: 'Interview Prep',
    prompt: 'What are the most important JavaScript closure interview questions?',
  },
  {
    icon: <AutoAwesome fontSize="small" />,
    title: 'Learn',
    prompt: 'Explain the difference between var, let, and const in JavaScript',
  },
];

export default function WelcomeScreen({ onPromptClick }: WelcomeScreenProps) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <SmartToy sx={{ fontSize: 64, mb: 2, color: 'primary.main', opacity: 0.8 }} />
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
        Welcome to AI Chatbot! 👋
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{ maxWidth: 500, mb: 4, color: 'text.secondary' }}
      >
        I'm here to help with coding, learning, ideas, and more. Try one of these examples or ask me anything!
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ flexWrap: 'wrap', justifyContent: 'center', maxWidth: 700 }}
      >
        {EXAMPLE_PROMPTS.map((item) => (
          <Paper
            key={item.title}
            onClick={() => onPromptClick(item.prompt)}
            elevation={1}
            sx={{
              p: 2,
              cursor: 'pointer',
              minWidth: 200,
              maxWidth: 240,
              borderRadius: 2,
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4,
                borderColor: 'primary.main',
              },
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'primary.main' }}>
              {item.icon}
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {item.title}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
              {item.prompt}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}