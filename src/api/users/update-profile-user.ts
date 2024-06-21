/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 } from 'uuid'
import { supabase } from '../supabase'
import { UpdateUserData } from '@/lib/zod/update-user.zod'

interface UpdateProfileUserProps {
  userId: number
  AvatarFile: any
  ThumbnailFile: any
  userData: UpdateUserData
}

export async function UpdateProfileUser({
  userId,
  AvatarFile,
  userData,
}: UpdateProfileUserProps) {
  const { data: verifiedUploadAvatar } = await supabase.storage
    .from('users')
    .list(`user-${userId}`)

  const idUpload = v4()

  if (verifiedUploadAvatar) {
    let result: any = null

    if (verifiedUploadAvatar.length > 0) {
      const { data } = await supabase.storage
        .from('users')
        .update(`user-${userId}/${verifiedUploadAvatar[0].name}`, AvatarFile)

      result = data
    } else {
      const { data } = await supabase.storage
        .from('users')
        .update(`user-${userId}/${idUpload}`, AvatarFile)

      result = data
    }

    if (result) {
      await supabase.from('users').update({
        avatarUrl: `https://mbwdmgtzpepnwxapwnhu.supabase.co/storage/v1/object/public/users/${result.path}`,
      })
    }
  }

  const { data, error } = await supabase
    .from('user')
    .update({
      name: userData.name,
      username: userData.username,
      avatarUrl: '',
      thumbnailUrl: '',
    })
    .eq('id', userId)
    .select()
}
