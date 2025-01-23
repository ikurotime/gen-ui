'use client'

import BotIcon from './BotIcon'
import { CodeBlock } from '@/components/ui/code-block'
import { Components } from 'react-markdown'
import Markdown from 'react-markdown'

export default function Message({
  content = 'No text',
  role
}: {
  content: string
  role: string
}) {
  // Parse the markdown content
  // const tokens = marked.lexer(content)

  const components: Components = {
    // Handle code blocks and inline code
    code({ className, children }) {
      const language = className
        ? className.replace('language-', '')
        : undefined
      const codeContent = Array.isArray(children) ? children[0] : children

      // For fenced code blocks
      if (className) {
        return <CodeBlock language={language} value={String(codeContent)} />
      }

      // For inline code
      return <code className='bg-stone-700 rounded px-1'>{children}</code>
    },
    // Ensure paragraphs are rendered properly
    p({ children }) {
      return <p className='mb-4'>{children}</p>
    },
    pre({ children }) {
      return <pre className='mb-4 bg-transparent'>{children}</pre>
    }
  }

  const messageContent = (
    <Markdown components={components} remarkPlugins={[]}>
      {content}
    </Markdown>
  )

  if (role === 'user') {
    return (
      <div className='bg-stone-700 text-white rounded-lg p-2 px-3 prose-p:m-0'>
        {messageContent}
      </div>
    )
  }

  return (
    <div className='flex mr-auto gap-2 relative'>
      <div className='border absolute -left-14 rounded-full  size-10 p-1 border-stone-300 flex justify-center items-center'>
        <BotIcon />
      </div>
      <div className='flex flex-col prose prose-invert'>{messageContent}</div>
    </div>
  )
}
