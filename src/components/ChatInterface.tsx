'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Plus, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Message from '@/app/(chat)/c/[slug]/components/message'
import { ScrollArea } from '@/components/ui/scroll-area'
import { firstMessage } from '@/lib/utils'
import { useAtom } from 'jotai'
import { useChat } from 'ai/react'

export type Message = {
  id: string
  content: string
  chatId: string
  sender: 'user' | 'bot'
}

type Chat = {
  id: string
  name: string
  messages: Message[]
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
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [chats])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleChatSubmit()
    if (input.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: input,
        chatId: currentChat,
        sender: 'user'
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className='flex h-screen bg-neutral-900'>
      <AnimatePresence>
        {isSidebarOpen && (
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
        )}
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
        <ScrollArea className='flex-1 px-4'>
          <AnimatePresence mode='popLayout'>
            <div className='max-w-3xl mx-auto'>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={
                    index === messages.length - 1
                      ? { opacity: 0, y: 20 }
                      : false
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  } mb-4`}
                >
                  <Message content={message.content} role={message.role} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </ScrollArea>
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
      </div>
    </div>
  )
}
