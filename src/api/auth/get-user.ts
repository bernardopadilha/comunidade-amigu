import { supabase } from '../supabase'

interface userLoggedProps {
  name: string
  email: string
  username: string
  avatarUrl: string
  thumbnailUrl: string
  specialty: string
  updatedAt: Date
  createdAt: Date
}

export async function getUser(): Promise<userLoggedProps | undefined> {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (user) {
    const userEmail = user.email

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
