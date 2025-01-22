import { Message } from '@/components/ChatInterface'

export type CreateChatDTO = {
  id: string
  name: string
  messages: Message[]
}
