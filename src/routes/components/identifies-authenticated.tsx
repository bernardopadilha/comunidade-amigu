import { GetSession } from '@/api/getSessions/get-session'
import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface IdentifiesAuthenticatedProps {
  element: ReactNode
}

export function IdentifiesAuthenticated({
  element,
}: IdentifiesAuthenticatedProps) {
  const { data: getSession } = useQuery({
    queryKey: ['users'],
    queryFn: GetSession,
  })

  if (getSession) {
    return <Navigate to="/feed" />
  } else {
    return element
  }
}
