import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'

// Create a QueryClient instance
// This is like setting up a smart data management center for your entire app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // How long to wait before considering a network request failed
      staleTime: 1000 * 60 * 5, // 5 minutes
      // How long to keep unused data in cache
      gcTime: 1000 * 60 * 10, // 10 minutes
      // Retry failed requests 3 times before giving up
      retry: 3,
      // Don't refetch when window regains focus (can be annoying during development)
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* QueryClientProvider makes React Query available to your entire app */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)