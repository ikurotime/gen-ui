import { useCallback, useEffect } from 'react'

import { firstMessage } from '@/lib/utils'
import { useAtom } from 'jotai'
import { useChat } from 'ai/react'
import { useChatStore } from '@/store/chat-store'

export function useChatAI() {
  const [message] = useAtom(firstMessage)
  const setMessages = useChatStore((state) => state.setMessages)
  const setInput = useChatStore((state) => state.setInput)
  const currentChat = useChatStore((state) => state.currentChat)
  const input = useChatStore((state) => state.input)

  const {
    messages,
    input: aiInput,
    handleInputChange: aiHandleInputChange,
    handleSubmit: aiHandleSubmit,
    isLoading,
    error
  } = useChat({
    initialInput: message?.content || ''
  })

  console.log('AI input:', aiInput)
  console.log('AI messages:', messages)
  console.log('AI isLoading:', isLoading)
  console.log('AI error:', error)

  // Update store when AI chat updates
  useEffect(() => {
    setMessages(messages)
  }, [messages, setMessages])

  // Handle input changes
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInput(value)
      aiHandleInputChange(e)
    },
    [aiHandleInputChange, setInput]
  )

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (input.trim() && !isLoading) {
      const userMessage = {
        id: Date.now().toString(),
        content: input,
        chatId: currentChat,
        sender: 'user' as const
      }

      console.log('User message:', userMessage)
      console.log('Current chat:', currentChat)
      try {
        // Add user message to chat

        // Clear input before AI response
        setInput('')

        // Submit to AI
        aiHandleSubmit()
      } catch (error) {
        console.error('Error submitting message:', error)
        // Handle error here (e.g., show error message to user)
      }
    }
  }

  return {
    input: aiInput,
    handleInputChange,
    handleSubmit,
    isLoading
  }
}
