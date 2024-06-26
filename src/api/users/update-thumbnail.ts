/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 } from 'uuid'
import { supabase } from '../supabase'

interface UpdateThumbnailProps {
  userId: number
  thumbnailFile: any
}

export async function UpdateThumbnail({
  userId,
  thumbnailFile,
}: UpdateThumbnailProps) {
  const { data: verifiedUploadThumbnail } = await supabase.storage
    .from('users')
    .list(`user-${userId}/thumbnail`)

  const idUpload = v4()

  if (verifiedUploadThumbnail) {
    let result: any = null

    if (verifiedUploadThumbnail.length > 0) {
      const { data } = await supabase.storage
        .from('users')
        .update(
          `user-${userId}/thumbnail/${verifiedUploadThumbnail[0].name}`,
          thumbnailFile,
        )

      result = data
    } else {
      const { data } = await supabase.storage
        .from('users')
        .upload(`user-${userId}/thumbnail/${idUpload}`, thumbnailFile)

      result = data
    }

    if (result) {
      return `https://mbwdmgtzpepnwxapwnhu.supabase.co/storage/v1/object/public/users/${result.path}`
    }
  }
}
