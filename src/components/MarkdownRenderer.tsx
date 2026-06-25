/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography, Link } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
  isUser?: boolean;
}

export default function MarkdownRenderer({ content, isUser }: MarkdownRendererProps) {
  // For user messages, just show plain text
  if (isUser) {
    return (
      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {content}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        '& p': { my: 0.5, lineHeight: 1.6 },
        '& p:first-of-type': { mt: 0 },
        '& p:last-of-type': { mb: 0 },
        '& ul, & ol': { pl: 3, my: 1 },
        '& li': { my: 0.3 },
        '& h1, & h2, & h3, & h4': { mt: 1.5, mb: 1, fontWeight: 600 },
        '& h1': { fontSize: '1.4rem' },
        '& h2': { fontSize: '1.25rem' },
        '& h3': { fontSize: '1.1rem' },
        '& blockquote': {
          borderLeft: '3px solid',
          borderColor: 'primary.main',
          pl: 2,
          ml: 0,
          my: 1,
          fontStyle: 'italic',
          color: 'text.secondary',
        },
        '& table': {
          borderCollapse: 'collapse',
          my: 1,
          width: '100%',
          fontSize: 13,
        },
        '& th, & td': {
          border: '1px solid',
          borderColor: 'divider',
          p: 1,
          textAlign: 'left',
        },
        '& th': {
          bgcolor: 'action.hover',
          fontWeight: 600,
        },
        '& code:not(pre code)': {
          bgcolor: 'action.selected',
          px: 0.6,
          py: 0.2,
          borderRadius: 0.5,
          fontSize: '0.875em',
          fontFamily: 'monospace',
        },
        '& hr': {
          border: 'none',
          borderTop: '1px solid',
          borderColor: 'divider',
          my: 2,
        },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const code = String(children).replace(/\n$/, '');

            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }

            return <CodeBlock language={language} code={code} />;
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          a({ href, children }: any) {
            return (
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'primary.main', textDecoration: 'underline' }}
              >
                {children}
              </Link>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}