import { Feed } from '@/pages/feed'
import { Login } from '@/pages/login'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './components/protected-route'
import { IdentifiesAuthenticated } from './components/identifies-authenticated'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <IdentifiesAuthenticated element={<Login />} />,
  },
  {
    path: '/feed/',
    element: <ProtectedRoute element={<Feed />} />,
  },
])
