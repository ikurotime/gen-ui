import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface CodeBlockProps {
  inline?: boolean
  className?: string
  children?: React.ReactNode
}

// Memoize the custom style object to prevent recreation
const customStyle = {
  margin: 0,
  borderRadius: '0.375rem',
  fontSize: '0.875rem',
  lineHeight: '1.25rem'
} as const

export const CodeBlock = ({
  className,
  children,
  inline,
  ...props
}: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className || '')

  if (!inline && match) {
    return (
      <div className='relative rounded-md'>
        <span>{match?.[1]}</span>
        <SyntaxHighlighter
          language={match?.[1]}
          style={oneDark}
          showLineNumbers
          customStyle={customStyle}
        >
          {String(children)}
        </SyntaxHighlighter>
      </div>
    )
  }
  return (
    <code {...props} className='bg-stone-700 rounded px-1'>
      {children}
    </code>
  )
}
