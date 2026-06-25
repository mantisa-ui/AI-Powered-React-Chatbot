import { AppBar, Toolbar, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { Menu as MenuIcon, SmartToy } from '@mui/icons-material';

interface HeaderProps {
  onMenuClick: () => void;
  chatTitle?: string;
}

export default function Header({ onMenuClick, chatTitle }: HeaderProps) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
      }}
    >
      <Toolbar>
        {/* Mobile menu button - hidden on desktop */}
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
      </Toolbar>
    </AppBar>
  );
}