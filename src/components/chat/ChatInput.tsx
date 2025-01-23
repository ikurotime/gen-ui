import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import { memo } from 'react'

interface ChatInputProps {
  input: string
  isSidebarOpen: boolean
  onSubmit: (e: React.FormEvent) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ChatInput = memo(function ChatInput({
  input,
  isSidebarOpen,
  onSubmit,
  onChange
}: ChatInputProps) {
  return (
    <div className='p-4 border-t border-neutral-800'>
      <form onSubmit={onSubmit} className='flex items-center space-x-2'>
        <div
          className={`flex-grow ${
            isSidebarOpen ? 'max-w-3xl' : 'max-w-2xl'
          } mx-auto`}
        >
          <Input
            type='text'
            value={input}
            onChange={onChange}
            placeholder='Type a message...'
            className='w-full bg-neutral-800 text-white border-neutral-700 focus:ring-neutral-700 text-sm'
          />
        </div>
        <Button
          type='submit'
          size='icon'
          variant='outline'
          className='bg-neutral-700 text-white hover:bg-neutral-600'
        >
          <Send size={16} />
        </Button>
      </form>
    </div>
  )
})
