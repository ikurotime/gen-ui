import { Copy } from 'lucide-react'
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
      <div className='relative rounded-md bg-[#2d2d2d] flex flex-col'>
        <div className='p-2 px-4 flex items-center justify-between w-full border-b border-[#3d3d3d]'>
          <span>{match?.[1]} </span>
          <div>
            <button className='flex gap-2 items-center p-1 px-2 hover:bg-[#3d3d3d] rounded focus:outline-none'>
              <Copy className='size-4' />
              Copy
            </button>
          </div>
        </div>
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
