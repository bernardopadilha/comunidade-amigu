import { supabase } from '../supabase'

export async function filterForLikes(userId: string) {
  const { data: likeAtPost, error } = await supabase
    .from('likeAtPost')
    .select('*')
    .eq('userId', userId)

  console.log(likeAtPost)

  if (error) {
    throw new Error(error.message)
  }

  const postIds = likeAtPost.map((like) => like.postId)

  const { data: posts, error: errorPosts } = await supabase
    .from('post')
    .select('*')
    .in('id', postIds)
    .order('createdAt', {
      ascending: false,
    })

  if (errorPosts) {
    throw new Error(errorPosts.message)
  }

  return posts
}
