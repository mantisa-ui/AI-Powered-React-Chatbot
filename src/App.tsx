import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme/theme';
import { useThemeStore } from './hooks/useTheme';
import ChatWindow from './components/ChatWindow';

function App() {
  const { mode } = useThemeStore();
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ChatWindow />
    </ThemeProvider>
  );
}

export default App;