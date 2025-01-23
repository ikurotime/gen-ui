'use client'

import { SetStateAction, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreateChat } from '@/app/(chat)/c/[slug]/api'
import { useRouter } from 'next/navigation'

export default function MainInput() {
  const [input, setInput] = useState('')
  const router = useRouter()
  const { mutate: createChat } = useCreateChat()

  const handleChange = (e: { target: { value: SetStateAction<string> } }) =>
    setInput(e.target.value)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      const chatId = crypto.randomUUID()
      localStorage.setItem(
        'firstMessage',
        JSON.stringify({
          id: Date.now().toString(),
          content: input,
          chatId,
          sender: 'user'
        })
      )
      createChat({
        name: 'New chat',
        id: chatId,
        messages: [
          {
            id: Date.now().toString(),
            content: input,
            chatId,
            sender: 'user'
          }
        ]
      })
      router.push(`/c/${chatId}`)
    }
  }
  return (
    <form onSubmit={handleSubmit} className='w-full max-w-md'>
      <div className='flex items-center space-x-2'>
        <Input
          type='text'
          value={input}
          onChange={handleChange}
          placeholder='Ask me anything...'
          className='flex-grow bg-neutral-800 text-white border-neutral-700 focus:ring-neutral-700'
        />
        <Button
          type='submit'
          className='bg-neutral-700 text-white hover:bg-neutral-600'
        >
          Send
        </Button>
      </div>
    </form>
  )
}
