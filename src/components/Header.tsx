import { AppBar, Toolbar, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { Menu as MenuIcon, SmartToy, DarkMode, LightMode } from '@mui/icons-material';
import { useThemeStore } from '../hooks/useTheme';

interface HeaderProps {
  onMenuClick: () => void;
  chatTitle?: string;
}

export default function Header({ onMenuClick, chatTitle }: HeaderProps) {
  const { mode, toggleTheme } = useThemeStore();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
      }}
    >
      <Toolbar>
        <Tooltip title="Open chats">
          <IconButton
            onClick={onMenuClick}
            sx={{
              color: 'white',
              mr: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
          <SmartToy sx={{ color: 'white', display: { xs: 'none', md: 'block' } }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {chatTitle || 'AI Chatbot'}
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Powered by Groq · Llama 3.1
            </Typography>
          </Box>
        </Box>

        {/* Dark Mode Toggle */}
        <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              transition: 'transform 0.3s',
              '&:active': { transform: 'rotate(180deg)' },
            }}
          >
            {mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}