import { supabase } from '../supabase'

interface PostProps {
  content: string
  userId: number
}

export async function createNewPost({ content, userId }: PostProps) {
  const { data, error } = await supabase
    .from('post')
    .insert([
      {
        userId,
        content,
        type: 'text',
        updatedAt: null,
      },
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
