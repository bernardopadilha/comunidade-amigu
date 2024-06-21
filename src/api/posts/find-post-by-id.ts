import { supabase } from '../supabase'

interface PostsProps {
  id: number
  type: string
  content: string
  updatedAt?: Date
  createdAt: Date
  userId: number
}

export async function FindPostsById({
  queryKey,
}: {
  queryKey: (string | number)[]
}): Promise<PostsProps> {
  const postId = queryKey[1] as number

  const { data: post, error } = await supabase
    .from('post')
    .select('*')
    .eq('id', postId)
    .single()

  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (error) {
    throw new Error(error.message)
  }

  return post
}
