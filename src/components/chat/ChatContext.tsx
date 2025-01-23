import { ChatState, initialChatState } from './chat-types'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from 'react'

import { chatReducer } from './chat-reducer'
import { firstMessage } from '@/lib/utils'
import { useAtom } from 'jotai'
import { useChat } from 'ai/react'

interface ChatContextType extends ChatState {
  // Actions
  createNewChat: () => void
  setCurrentChat: (id: string) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent) => void
  toggleSidebar: () => void
}

const ChatContext = createContext<ChatContextType | null>(null)

ChatContext.displayName = 'ChatContext'

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [message] = useAtom(firstMessage)
  const [state, dispatch] = useReducer(chatReducer, initialChatState)

  // AI Chat hook
  const {
    messages,
    input,
    handleInputChange: aiHandleInputChange,
    handleSubmit: handleChatSubmit
  } = useChat({
    initialInput: message?.content || ''
  })

  // Update messages when AI chat updates
  useEffect(() => {
    dispatch({ type: 'SET_MESSAGES', payload: messages })
  }, [messages])

  // Update input when AI chat updates
  useEffect(() => {
    dispatch({ type: 'SET_INPUT', payload: input })
  }, [input])

  // Actions
  const createNewChat = useCallback(() => {
    const newChat = {
      id: Date.now().toString(),
      name: `New chat ${state.chats.length + 1}`,
      messages: []
    }
    dispatch({ type: 'ADD_CHAT', payload: newChat })
    dispatch({ type: 'SET_CURRENT_CHAT', payload: newChat.id })
  }, [state.chats.length])

  const setCurrentChat = useCallback((id: string) => {
    dispatch({ type: 'SET_CURRENT_CHAT', payload: id })
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      aiHandleInputChange(e)
    },
    [aiHandleInputChange]
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      handleChatSubmit(e)
      if (state.input.trim()) {
        const userMessage = {
          id: Date.now().toString(),
          content: state.input,
          chatId: state.currentChat,
          sender: 'user' as const
        }
        dispatch({
          type: 'ADD_MESSAGE',
          payload: { chatId: state.currentChat, message: userMessage }
        })
      }
    },
    [state.currentChat, state.input, handleChatSubmit]
  )

  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
  }, [])

  const value = {
    ...state,
    createNewChat,
    setCurrentChat,
    handleInputChange,
    handleSubmit,
    toggleSidebar
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChatContext() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider')
  }
  return context
}
