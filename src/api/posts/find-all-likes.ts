import { supabase } from '../supabase'

export async function FindAllLikes({
  queryKey,
}: {
  queryKey: [string, string, string]
}) {
  const userId = Number(queryKey[1])
  const postId = Number(queryKey[2])

  const { data: likeAtPost, error } = await supabase
    .from('likeAtPost')
    .select('*')
    .eq('userId', userId)
    .eq('postId', postId)

  if (error) {
    throw new Error(error.message)
  }

  return likeAtPost
}
