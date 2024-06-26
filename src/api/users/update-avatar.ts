/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 } from 'uuid'
import { supabase } from '../supabase'

interface UpdateAvatarProps {
  userId: number
  avatarFile: any
}

export async function UpdateAvatar({ userId, avatarFile }: UpdateAvatarProps) {
  const { data: verifiedUploadAvatar } = await supabase.storage
    .from('users')
    .list(`user-${userId}/avatar`)

  const idUpload = v4()

  if (verifiedUploadAvatar) {
    let result: any = null

    if (verifiedUploadAvatar.length > 0) {
      const { data } = await supabase.storage
        .from('users')
        .update(
          `user-${userId}/avatar/${verifiedUploadAvatar[0].name}`,
          avatarFile,
        )

      result = data
    } else {
      const { data, error } = await supabase.storage
        .from('users')
        .upload(`user-${userId}/avatar/${idUpload}`, avatarFile)

      if (error) {
        throw new Error(error.message)
      }

      result = data
    }

    if (result) {
      return `https://mbwdmgtzpepnwxapwnhu.supabase.co/storage/v1/object/public/users/${result.path}`
    }
  }
}
