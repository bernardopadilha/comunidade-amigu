import { GetSession } from '@/api/getSessions/get-session'
import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  element: ReactNode
}

export function ProtectedRoute({ element }: ProtectedRouteProps) {
  const { data: getSession } = useQuery({
    queryKey: ['users'],
    queryFn: GetSession,
  })

  if (!getSession) {
    return <Navigate to="/" />
  } else {
    return element
  }
}
