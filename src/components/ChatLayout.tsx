import { AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChatInput } from './chat/ChatInput'
import { ChatMessages } from './chat/ChatMessages'
import { Menu } from 'lucide-react'
import { Sidebar } from './chat/Sidebar'
import { useChatContext } from './chat/ChatContext'
export default function ChatLayout() {
  'use memo'

  const { toggleSidebar } = useChatContext()

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
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  )
}
