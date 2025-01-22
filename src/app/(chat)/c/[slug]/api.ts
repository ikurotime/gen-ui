import { CreateChatDTO } from './types'
import { post } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'

const createChat = async (data: CreateChatDTO) =>
  post('/api/chat/create', {
    id: data.id,
    name: data.name,
    messages: data.messages
  })

export const useCreateChat = () => {
  return useMutation({
    mutationFn: createChat
  })
}
