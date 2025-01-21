import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { atom } from 'jotai'
import { Message } from '@/components/ChatInterface'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const firstMessage = atom<Message>()
