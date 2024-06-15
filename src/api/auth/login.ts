import { supabase } from '../supabase'

interface LoginProps {
  email: string
  password: string
}

export async function signIn(loginData: LoginProps) {
  const { error } = await supabase.auth.signInWithPassword({
    email: loginData.email,
    password: loginData.password,
  })

  if (error) {
    throw new Error(error.message)
  }
}
