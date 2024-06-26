import { supabase } from '../supabase'

interface CreateCommentProps {
  id?: string
  comment: string
  userId: number
  postId: number
  commentId: string | null
}

export async function CreateComment({
  id,
  userId,
  postId,
  comment,
  commentId,
}: CreateCommentProps) {
  if (id) {
    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          id,
          postId,
          userId,
          parentCommentId: commentId,
          content: comment,
        },
      ])
      .select()

    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  const { data, error } = await supabase
    .from('comments')
    .insert([
      {
        postId,
        userId,
        parentCommentId: null,
        content: comment,
      },
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
