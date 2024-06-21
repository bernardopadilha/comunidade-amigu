import { supabase } from '../supabase'

export interface userLoggedProps {
  id: number
  name: string
  email: string
  username: string
  avatarUrl: string
  thumbnailUrl: string
  specialty: string
  active: boolean
  updatedAt: Date
  createdAt: Date
}

export async function getUserLogged(): Promise<userLoggedProps | undefined> {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    const userEmail = session.user.email

    const { data: profile, error } = await supabase
      .from('user')
      .select('*')
      .eq('email', userEmail)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return profile
  }
}
