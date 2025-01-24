'use client'

import { Loader2, Menu, Send } from 'lucide-react'
import { memo, useRef } from 'react'

import { AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MarkdownContent } from './components/markdown-content'
import { Sidebar } from '@/components/chat/Sidebar'
import { useChat } from 'ai/react'
import { useChatStore } from '@/store/chat-store'

const SubmitButton = memo(function SubmitButton({
  isLoading
}: {
  isLoading: boolean
}) {
  return (
    <Button
      type='submit'
      size='icon'
      variant='outline'
      className='bg-neutral-700 text-white hover:bg-neutral-600'
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 size={16} className='animate-spin' />
      ) : (
        <Send size={16} />
      )}
    </Button>
  )
})

const MessageInput = () => {
  const { handleSubmit, handleInputChange, isLoading, input } = useChat({
    id: 'chat'
  })

  const isSidebarOpen = useChatStore((state) => state.isSidebarOpen)

  return (
    <div className='p-4 border-t border-neutral-800'>
      <form onSubmit={handleSubmit} className='flex items-center space-x-2'>
        <div
          className={`flex gap-2 flex-grow ${
            isSidebarOpen ? 'max-w-3xl' : 'max-w-2xl'
          } mx-auto`}
        >
          <Input
            type='text'
            value={input}
            onChange={handleInputChange}
            placeholder='Type a message...'
            className='w-full bg-neutral-800 text-white border-neutral-700 focus:ring-neutral-700 text-sm'
            disabled={isLoading}
          />
          <SubmitButton isLoading={isLoading} />
        </div>
      </form>
    </div>
  )
}

export default function ChatPage() {
  'use memo'
  const { messages } = useChat({
    id: 'chat',
    experimental_throttle: 50
  })
  const toggleSidebar = useChatStore((state) => state.toggleSidebar)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  // }

  // useEffect(scrollToBottom, [messages])

  return (
    <div className='flex h-screen bg-neutral-900'>
      <AnimatePresence>
        <Sidebar />
      </AnimatePresence>
      <div className='flex-1 flex flex-col'>
        <div className='p-4'>
          <Button
            onClick={toggleSidebar}
            variant='default'
            size='icon'
            className='mb-4'
          >
            <Menu className='h-4 w-4' />
          </Button>
        </div>
        <div className='flex-1 overflow-y-auto px-4'>
          <div className='max-w-3xl mx-auto space-y-8 py-8'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`${
                    message.role === 'user'
                      ? 'bg-stone-700 text-white rounded-lg p-2 px-3'
                      : 'flex flex-col prose prose-invert w-full max-w-[90ch]'
                  }`}
                >
                  <MarkdownContent id={message.id} content={message.content} />
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <MessageInput />
      </div>
    </div>
  )
}
