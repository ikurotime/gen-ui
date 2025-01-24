import { Message } from '@/lib/utils'

export type CreateChatDTO = {
  id: string
  name: string
  messages: Message[]
}
