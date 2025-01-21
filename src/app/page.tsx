'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { firstMessage } from '@/lib/utils'
import { useAtom } from 'jotai'
import { useCreateChat } from './(chat)/c/[slug]/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const router = useRouter()
  const { mutate: createChat } = useCreateChat()
  const [, setMessage] = useAtom(firstMessage)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessage({ id: Date.now(), text: input, sender: 'user' })
      const chatId = crypto.randomUUID()
      createChat({ name: 'New chat', id: chatId })
      router.push(`/c/${chatId}`)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-4'>
      <h1 className='text-4xl font-bold mb-8'>Hello there</h1>
      <form onSubmit={handleSubmit} className='w-full max-w-md'>
        <div className='flex items-center space-x-2'>
          <Input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
    </div>
  )
}
