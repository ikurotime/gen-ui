'use client'

import { Loader2, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { memo } from 'react'
import { useChatAI } from '@/hooks/use-chat-ai'
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

export const ChatInput = memo(function ChatInput() {
  const isSidebarOpen = useChatStore((state) => state.isSidebarOpen)
  const { isLoading } = useChatAI()
  const { handleSubmit, input, handleInputChange } = useChatAI()

  return (
    <div className='p-4 border-t border-neutral-800'>
      <form onSubmit={handleSubmit} className='flex items-center space-x-2'>
        <div
          className={`flex-grow ${
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
        </div>
        <SubmitButton isLoading={isLoading} />
      </form>
    </div>
  )
})
