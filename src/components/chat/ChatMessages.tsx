'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

import Message from '@/app/(chat)/c/[slug]/components/message'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useChatStore } from '@/store/chat-store'

export const ChatMessages = () => {
  const messages = useChatStore((state) => state.messages)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  return (
    <ScrollArea className='flex-1 px-4'>
      <AnimatePresence mode='popLayout'>
        <div className='max-w-3xl mx-auto'>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={
                index === messages.length - 1 ? { opacity: 0, y: 20 } : false
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
  )
}
