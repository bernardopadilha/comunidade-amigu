import { supabase } from '../supabase'

interface SaveAtPostProps {
  userId: number
  postId: number
}

export async function SavePost({ userId, postId }: SaveAtPostProps) {
  const { data: saveAtPost, error: errorSave } = await supabase
    .from('saveAtPost')
    .select('*')
    .eq('userId', userId)
    .eq('postId', postId)

  if (errorSave) {
    throw new Error(errorSave.message)
  }

  console.log(userId)

  if (saveAtPost && saveAtPost.length > 0) {
    const save = saveAtPost[0]

    const { error: errorDeleteSave } = await supabase
      .from('saveAtPost')
      .delete()
      .eq('id', save.id)

    if (errorDeleteSave) {
      throw new Error(errorDeleteSave.message)
    }
    return
  }

  const { data, error } = await supabase
    .from('saveAtPost')
    .insert([
      {
        userId,
        postId,
      },
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
