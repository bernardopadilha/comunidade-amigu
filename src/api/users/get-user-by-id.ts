import { supabase } from '../supabase'

export interface UserProps {
  id: string
  name: string
  email: string
  username: string
  avatarUrl: string
  thumbnailUrl: string
  specialty: string
  updatedAt: Date
  createdAt: Date
}

export async function GetUserById({
  queryKey,
}: {
  queryKey: [string, string]
}): Promise<UserProps | undefined> {
  const userId = queryKey[1]

  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
