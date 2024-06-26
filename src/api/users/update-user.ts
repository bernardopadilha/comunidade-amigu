/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '../supabase'
import { UpdateUserData } from '@/lib/zod/update-user.zod'

interface UpdateUserProps {
  userId: number
  avatarUrl: any
  thumbnailUrl: any
  userData: UpdateUserData
}

export async function UpdateUser({
  userId,
  userData,
  avatarUrl,
  thumbnailUrl,
}: UpdateUserProps) {
  const { data, error } = await supabase
    .from('user')
    .update({
      avatarUrl,
      thumbnailUrl,
      name: userData.name,
      username: userData.username,
    })
    .eq('id', userId)
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
