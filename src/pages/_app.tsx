import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { SidebarDrawerProvider } from '../components/contexts/SidebarDrawerContext'

import { makeServer } from '../services/mirage'
import { queryClient } from '../services/queryClient'
import { theme } from '../styles/theme'

if (process.env.NODE_ENV === 'development') {
  makeServer()
}

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
