import { memo, useMemo } from 'react'

import { CodeBlock } from '@/components/ui/code-block'
import ReactMarkdown from 'react-markdown'
import { marked } from 'marked'

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown)
  return tokens.map((token) => token.raw)
}

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return (
      <ReactMarkdown components={{ code: CodeBlock }}>{content}</ReactMarkdown>
    )
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false
    return true
  }
)

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock'

interface MarkdownContentProps {
  content: string
  id?: string
}

export const MarkdownContent = memo(function MarkdownContent({
  content,
  id = 'default'
}: MarkdownContentProps) {
  const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content])
  return blocks.map((block, index) => (
    <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
  ))
})
