import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import { useChatContext } from './ChatContext'

export const ChatInput = () => {
  const { isSidebarOpen, handleSubmit } = useChatContext()

  return (
    <div className='p-4 border-t border-neutral-800'>
      <form onSubmit={handleSubmit} className='flex items-center space-x-2'>
        <div
          className={`flex-grow ${
            isSidebarOpen ? 'max-w-3xl' : 'max-w-2xl'
          } mx-auto`}
        >
          <InputBox />
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
}

function InputBox() {
  const { input, handleInputChange } = useChatContext()
  return (
    <Input
      type='text'
      value={input}
      onChange={handleInputChange}
      placeholder='Type a message...'
      className='w-full bg-neutral-800 text-white border-neutral-700 focus:ring-neutral-700 text-sm'
    />
  )
}
