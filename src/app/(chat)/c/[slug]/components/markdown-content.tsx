import { CodeBlock } from '@/components/ui/code-block'
import type { ComponentPropsWithoutRef } from 'react'
import { Components } from 'react-markdown'
import Markdown from 'react-markdown'
import { memo } from 'react'

// Shared component for inline code to avoid recreation
const InlineCode = memo(function InlineCode({
  children,
  ...props
}: ComponentPropsWithoutRef<'code'>) {
  return (
    <code className='bg-stone-700 rounded px-1' {...props}>
      {children}
    </code>
  )
})

// Shared component for paragraphs
const Paragraph = memo(function Paragraph({
  children,
  ...props
}: ComponentPropsWithoutRef<'p'>) {
  return (
    <p className='mb-4' {...props}>
      {children}
    </p>
  )
})

// Shared component for pre blocks
const PreBlock = memo(function PreBlock({
  children,
  ...props
}: ComponentPropsWithoutRef<'pre'>) {
  return (
    <pre className='mb-4 bg-transparent' {...props}>
      {children}
    </pre>
  )
})

// Memoized code component handler
const CodeComponent = memo(function CodeComponent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'code'>) {
  const language = className ? className.replace('language-', '') : undefined
  const codeContent = Array.isArray(children) ? children[0] : children

  if (className) {
    return <CodeBlock language={language} value={String(codeContent)} />
  }

  return <InlineCode {...props}>{children}</InlineCode>
})

// Create components object outside component to avoid recreation
const markdownComponents: Components = {
  code: CodeComponent,
  p: Paragraph,
  pre: PreBlock
}

interface MarkdownContentProps {
  content: string
}

export const MarkdownContent = memo(function MarkdownContent({
  content
}: MarkdownContentProps) {
  return (
    <Markdown components={markdownComponents} remarkPlugins={[]}>
      {content}
    </Markdown>
  )
})
