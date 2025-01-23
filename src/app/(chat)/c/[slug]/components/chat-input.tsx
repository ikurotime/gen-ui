import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import { useChat } from 'ai/react'

export default function ChatInput({
  isSidebarOpen
}: {
  isSidebarOpen: boolean
}) {
  const { handleInputChange, handleSubmit } = useChat()
  return (
    <form onSubmit={handleSubmit} className='flex items-center space-x-2'>
      <div
        className={`flex-grow ${
          isSidebarOpen ? 'max-w-3xl' : 'max-w-2xl'
        } mx-auto`}
      >
        <Input
          type='text'
          onChange={handleInputChange}
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
  )
}
