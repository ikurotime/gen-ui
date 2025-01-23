'use client'

import ChatLayout from './ChatLayout'
import { ChatProvider } from './chat/ChatContext'

export default function ChatInterface() {
  return (
    <ChatProvider>
      <ChatLayout />
    </ChatProvider>
  )
}
