import { Alert, Button, Box } from '@mui/material';
import { Refresh } from '@mui/icons-material';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export default function ErrorMessage({ message, onRetry, onDismiss }: ErrorMessageProps) {
  return (
    <Box sx={{ mb: 2, animation: 'fadeIn 0.3s ease-in' }}>
      <Alert
        severity="error"
        onClose={onDismiss}
        action={
          onRetry && (
            <Button
              color="inherit"
              size="small"
              startIcon={<Refresh />}
              onClick={onRetry}
            >
              Retry
            </Button>
          )
        }
        sx={{ borderRadius: 2 }}
      >
        {message}
      </Alert>
    </Box>
  );
}