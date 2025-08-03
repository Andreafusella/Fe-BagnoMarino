import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { MenuProvider } from './context/MenuContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './lib/rect-query/queryClient.ts'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <>
    <Toaster position="bottom-right" />
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <MenuProvider>
              <App />
            </MenuProvider>
          </AuthProvider>
        </BrowserRouter>
      </StrictMode>
    </QueryClientProvider>
  </>
)
