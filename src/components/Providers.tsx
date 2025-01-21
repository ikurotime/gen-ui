// ./components/providers.js
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Provider } from 'jotai'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider>{children}</Provider>
    </QueryClientProvider>
  )
}
