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
  const { data: userInfo, error: errorUser } = await supabase
    .from('user')
    .select('*')
    .eq('id', userId)
    .single()

  if (errorUser) {
    throw new Error(errorUser.message)
  }

  const { data, error } = await supabase
    .from('user')
    .update({
      avatarUrl: avatarUrl === null ? userInfo.avatarUrl : avatarUrl,
      thumbnailUrl:
        thumbnailUrl === null ? userInfo.thumbnailUrl : thumbnailUrl,
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
