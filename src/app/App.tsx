import { RouterProvider } from 'react-router-dom'
import { AppProviders } from './providers'
import { AuthBootstrap } from '@/components/auth/AuthBootstrap'
import { router } from '@/routes'

export function App() {
  return (
    <AppProviders>
      <AuthBootstrap>
        <RouterProvider router={router} />
      </AuthBootstrap>
    </AppProviders>
  )
}
