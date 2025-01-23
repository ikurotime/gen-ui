import { memo, useMemo } from 'react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface CodeBlockProps {
  language?: string
  value: string
}

// Memoize the custom style object to prevent recreation
const customStyle = {
  margin: 0,
  borderRadius: '0.375rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem'
} as const

export const CodeBlock = memo(function CodeBlock({
  language,
  value
}: CodeBlockProps) {
  // Memoize the language to prevent unnecessary re-renders
  const codeLanguage = useMemo(() => language || 'text', [language])

  return (
    <div className='relative rounded-md'>
      <SyntaxHighlighter
        language={codeLanguage}
        style={oneDark}
        showLineNumbers
        customStyle={customStyle}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
})
