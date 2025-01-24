import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { memo } from 'react'
import { motion } from 'framer-motion'
import { useChatStore } from '@/store/chat-store'

export const Sidebar = memo(function Sidebar() {
  const chats = useChatStore((state) => state.chats)
  const currentChat = useChatStore((state) => state.currentChat)
  const createNewChat = useChatStore((state) => state.createNewChat)
  const setCurrentChat = useChatStore((state) => state.setCurrentChat)

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 256 }}
      exit={{ width: 0 }}
      className='h-screen bg-neutral-950 overflow-hidden'
    >
      <div className='p-4'>
        <Button
          onClick={createNewChat}
          variant='default'
          className='w-full mb-4'
        >
          <Plus className='mr-2 h-4 w-4' /> New Chat
        </Button>
        <ScrollArea className='h-[calc(100vh-80px)]'>
          {chats.map((chat) => (
            <Button
              key={chat.id}
              onClick={() => setCurrentChat(chat.id)}
              variant={currentChat === chat.id ? 'default' : 'ghost'}
              className='w-full justify-start mb-2 text-sm'
            >
              {chat.name}
            </Button>
          ))}
        </ScrollArea>
      </div>
    </motion.div>
  )
})
