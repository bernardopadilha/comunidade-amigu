import { supabase } from '../supabase'

export async function filterForSaves(userId: string) {
  const { data: saveAtPost, error } = await supabase
    .from('saveAtPost')
    .select('*')
    .eq('userId', userId)

  if (error) {
    throw new Error(error.message)
  }

  const postIds = saveAtPost.map((save) => save.postId)

  const { data: posts, error: errorPosts } = await supabase
    .from('post')
    .select('*')
    .in('id', postIds)

  if (errorPosts) {
    throw new Error(errorPosts.message)
  }

  return posts
}
