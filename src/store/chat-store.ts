import { Message } from 'ai'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

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

interface ChatState {
  // State
  chats: Chat[]
  currentChat: string
  messages: Message[]
  input: string
  isSidebarOpen: boolean

  // Actions
  createNewChat: () => void
  setCurrentChat: (id: string) => void
  setMessages: (messages: Message[]) => void
  setInput: (input: string) => void
  toggleSidebar: () => void
  addMessage: (chatId: string, message: Chat['messages'][0]) => void
}

export const useChatStore = create<ChatState>()(
  devtools(
    (set) => ({
      // Initial state
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
      isSidebarOpen: true,

      // Actions
      createNewChat: () =>
        set((state) => {
          const newChat = {
            id: Date.now().toString(),
            name: `New chat ${state.chats.length + 1}`,
            messages: []
          }
          return {
            chats: [...state.chats, newChat],
            currentChat: newChat.id
          }
        }),

      setCurrentChat: (id) =>
        set(() => ({
          currentChat: id
        })),

      setMessages: (messages) =>
        set(() => ({
          messages
        })),

      setInput: (input) =>
        set(() => ({
          input
        })),

      toggleSidebar: () =>
        set((state) => ({
          isSidebarOpen: !state.isSidebarOpen
        })),

      addMessage: (chatId, message) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? { ...chat, messages: [...chat.messages, message] }
              : chat
          )
        }))
    }),
    {
      name: 'chat-store'
    }
  )
)
