import { CreateChatDTO } from './types'
import { post } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'

const createChat = async (data: CreateChatDTO) =>
  post('/api/chat/create', { name: data.name, id: data.id })

export const useCreateChat = () => {
  return useMutation({
    mutationFn: createChat
  })
}
