import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { atom } from 'jotai'
import { Message } from '@/components/ChatInterface'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const firstMessage = atom<Message>()

export const get = (url: string) => fetch(url).then((res) => res.json())

export const post = (url: string, data: Record<string, unknown>) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((res) => res.json())
