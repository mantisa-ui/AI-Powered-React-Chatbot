import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ChatWindow />
    </ThemeProvider>
  );
}

export default App;