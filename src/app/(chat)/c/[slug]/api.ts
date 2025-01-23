import { useMutation, useQuery } from '@tanstack/react-query'

import { CreateChatDTO } from './types'
import { post } from '@/lib/utils'

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

const getChat = async (data: { id: string }) =>
  post('/api/chat/get', {
    id: data.id
  })

export const useGetChat = (id: string) => {
  return useQuery({
    queryFn: () => getChat({ id }),
    queryKey: ['chat', id],
    staleTime: 1000 * 60 * 5
  })
}
