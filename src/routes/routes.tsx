import { Feed } from '@/pages/feed'
import { Login } from '@/pages/login'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/feed/',
    element: <Feed />,
  },
])
