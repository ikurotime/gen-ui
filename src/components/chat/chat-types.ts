import { Message } from 'ai'

export type Chat = {
  id: string
  name: string
  messages: Array<{
    id: string
    content: string
    chatId: string
    sender: 'user' | 'bot'
  }>
}

export type ChatState = {
  chats: Chat[]
  currentChat: string
  messages: Message[]
  input: string
  isSidebarOpen: boolean
}

export type ChatAction =
  | { type: 'SET_CHATS'; payload: Chat[] }
  | { type: 'ADD_CHAT'; payload: Chat }
  | { type: 'SET_CURRENT_CHAT'; payload: string }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'TOGGLE_SIDEBAR' }
  | {
      type: 'ADD_MESSAGE'
      payload: { chatId: string; message: Chat['messages'][0] }
    }

export const initialChatState: ChatState = {
  chats: [
    {
      id: '1',
      name: 'New chat',
      messages: []
    }
  ],
  currentChat: '1',
  messages: [],
  input: '',
  isSidebarOpen: true
}
