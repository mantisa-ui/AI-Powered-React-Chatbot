import { useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { ContentCopy, Check } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useThemeStore } from '../hooks/useTheme';

interface CodeBlockProps {
  language: string;
  code: string;
}

export default function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { mode } = useThemeStore();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        my: 1.5,
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: mode === 'dark' ? '#1e293b' : '#f5f5f5',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Header with language and copy button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 0.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: 11,
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          {language || 'code'}
        </Typography>
        <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
          <IconButton size="small" onClick={handleCopy} sx={{ color: 'text.secondary', p: 0.5 }}>
            {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Code content */}
      <SyntaxHighlighter
        language={language || 'text'}
        style={mode === 'dark' ? oneDark : oneLight}
        customStyle={{
          margin: 0,
          padding: '12px 16px',
          fontSize: 13,
          background: 'transparent',
        }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  );
}