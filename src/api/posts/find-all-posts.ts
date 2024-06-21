import { supabase } from '../supabase'

interface PostsProps {
  id: number
  type: string
  content: string
  updatedAt?: Date
  createdAt: Date
  userId: number
}

export async function FindAllPosts(): Promise<PostsProps[]> {
  const { data: post, error } = await supabase
    .from('post')
    .select('*')
    .order('createdAt', {
      ascending: false,
    })

  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (error) {
    throw new Error(error.message)
  }

  return post
}
