import { supabase } from '../supabase'

interface CommentsProps {
  id: string
  postId: number
  userId: number
  createdAt: Date
  content: string
  parentCommentId: number | null
}

export async function FindAllComments({
  queryKey,
}: {
  queryKey: [string, string]
}): Promise<CommentsProps[]> {
  const postId = queryKey[1]

  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('postId', Number(postId))

  if (error) {
    throw new Error(error.message)
  }

  const comments = data.filter((comment) => !comment.parentCommentId)

  return comments
}
