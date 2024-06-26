import { supabase } from '../supabase'

interface signUpProps {
  name: string
  email: string
  password: string
}

export async function signUp(signUpData: signUpProps) {
  // Dividir a string em palavras
  const name = signUpData.name.split(' ')

  // Pegar a primeira e a última palavra
  const firstName = name[0]
  const lastName = name[name.length - 1]

  const username = `@${firstName}${lastName}`

  const { data: userData, error: userError } = await supabase
    .from('user')
    .insert([
      {
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
        username: username.toLowerCase(),
        active: true,
      },
    ])
    .select()

  if (userError) {
    throw new Error(userError.message)
  }

  const { error } = await supabase.auth.signUp({
    email: signUpData.email,
    password: signUpData.password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return userData
}
