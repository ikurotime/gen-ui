'use client'

import { useEffect, useState } from 'react'

import { AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChatInput } from './chat/ChatInput'
import { ChatMessages } from './chat/ChatMessages'
import { Menu } from 'lucide-react'
import { Sidebar } from './chat/Sidebar'
import { firstMessage } from '@/lib/utils'
import { useAtom } from 'jotai'
import { useChat } from 'ai/react'

type Chat = {
  id: string
  name: string
  messages: Array<{
    id: string
    content: string
    chatId: string
    sender: 'user' | 'bot'
  }>
}

export default function ChatInterface() {
  const [message] = useAtom(firstMessage)
  const {
    input,
    handleInputChange,
    handleSubmit: handleChatSubmit,
    messages
  } = useChat({
    initialInput: message?.content || ''
  })

  const initialChat: Chat[] = [
    {
      id: '1',
      name: 'New chat',
      messages: []
    }
  ]

  useEffect(() => {
    if (message) {
      handleChatSubmit()
    }
  }, [message])

  const [chats, setChats] = useState<Chat[]>(initialChat)
  const [currentChat, setCurrentChat] = useState<string>('1')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleChatSubmit()
    if (input.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        content: input,
        chatId: currentChat,
        sender: 'user' as const
      }
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChat
            ? { ...chat, messages: [...chat.messages, userMessage] }
            : chat
        )
      )
    }
  }

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: `New chat ${chats.length + 1}`,
      messages: []
    }
    setChats([...chats, newChat])
    setCurrentChat(newChat.id)
  }

  return (
    <div className='flex h-screen bg-neutral-900'>
      <AnimatePresence>
        <Sidebar
          isOpen={isSidebarOpen}
          chats={chats}
          currentChat={currentChat}
          onNewChat={createNewChat}
          onSelectChat={setCurrentChat}
        />
      </AnimatePresence>
      <div className='flex-1 flex flex-col'>
        <div className='p-4'>
          <Button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            variant='default'
            size='icon'
            className='mb-4'
          >
            <Menu className='h-4 w-4' />
          </Button>
        </div>
        <ChatMessages messages={messages} />
        <ChatInput
          input={input}
          isSidebarOpen={isSidebarOpen}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}
