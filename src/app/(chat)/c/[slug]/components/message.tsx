'use client'

import BotIcon from './BotIcon'
import { MarkdownContent } from './markdown-content'
import { memo } from 'react'

const UserMessage = memo(function UserMessage({
  content
}: {
  content: string
}) {
  return (
    <div className='bg-stone-700 text-white rounded-lg p-2 px-3 prose-p:m-0'>
      <MarkdownContent content={content} />
    </div>
  )
})

const BotMessage = memo(function BotMessage({ content }: { content: string }) {
  return (
    <div className='flex mr-auto gap-2 relative'>
      <div className='border absolute -left-14 rounded-full size-10 p-1 border-stone-300 flex justify-center items-center'>
        <BotIcon />
      </div>
      <div className='flex flex-col prose prose-invert'>
        <MarkdownContent content={content} />
      </div>
    </div>
  )
})

export default memo(function Message({
  content = 'No text',
  role
}: {
  content: string
  role: string
}) {
  if (role === 'user') {
    return <UserMessage content={content} />
  }
  return <BotMessage content={content} />
})
