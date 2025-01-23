import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface CodeBlockProps {
  language?: string
  value: string
}

export function CodeBlock({ language, value }: CodeBlockProps) {
  return (
    <div className='relative rounded-md'>
      <SyntaxHighlighter
        language={language || 'text'}
        style={oneDark}
        showLineNumbers
        customStyle={{
          margin: 0,
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          lineHeight: '1.25rem'
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
}
