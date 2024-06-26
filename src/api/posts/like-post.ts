import { supabase } from '../supabase'

interface LikeAtPostProps {
  userId: number
  postId: number
}

export async function LikePost(credentials: LikeAtPostProps) {
  const { data: likeAtPost, error: errorLike } = await supabase
    .from('likeAtPost')
    .select('*')
    .eq('userId', credentials.userId)
    .eq('postId', credentials.postId)

  if (errorLike) {
    throw new Error(errorLike.message)
  }

  if (likeAtPost && likeAtPost.length > 0) {
    const like = likeAtPost[0]

    const { error: errorDeleteLike } = await supabase
      .from('likeAtPost')
      .delete()
      .eq('id', like.id)

    if (errorDeleteLike) {
      throw new Error(errorDeleteLike.message)
    }
    return
  }

  const { data, error } = await supabase
    .from('likeAtPost')
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
