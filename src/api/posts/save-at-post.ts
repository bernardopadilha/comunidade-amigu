import { supabase } from '../supabase'

interface SaveAtPostProps {
  userId: number
  postId: number
}

export async function SaveAtPost(credentials: SaveAtPostProps) {
  const { data: saveAtPost, error: errorSave } = await supabase
    .from('saveAtPost')
    .select('*')
    .eq('userId', credentials.userId)
    .eq('postId', credentials.postId)

  console.log(saveAtPost)

  if (errorSave) {
    throw new Error(errorSave.message)
  }

  if (saveAtPost && saveAtPost.length > 0) {
    const like = saveAtPost[0]

    const { error: errorDeleteSave } = await supabase
      .from('saveAtPost')
      .delete()
      .eq('id', like.id)

    if (errorDeleteSave) {
      throw new Error(errorDeleteSave.message)
    }

    console.log('deletado')
    return
  }

  const { data, error } = await supabase
    .from('saveAtPost')
    .insert([
      {
        userId: credentials.userId,
        postId: credentials.postId,
      },
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
